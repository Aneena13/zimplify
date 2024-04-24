'use client'
import { useProject, useProjectLogs } from "@/backend/project/project.query";
import { Accordion, ActionIcon, Button, Center, Code, Collapse, Divider, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { CreateProjectForm } from "../components/AddProject";
import { ProjectStatusBadge } from "../components/ProjectStatusBadge";
import { useDisclosure, useListState } from "@mantine/hooks";
import { IconArticle, IconChevronDown, IconChevronUp, IconPencil } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectStatus } from "../../../../../types/enums";
import { useParams } from "next/navigation";
import dayjs from 'dayjs'
import { CpuUsageCard, MemoryUsageCard, NonInteractiveCard } from "../../page";
async function getStatus() {
  return (await axios.get('https://go.zimplify.tech/project/status')).data
}
type ResourceUsage = {
  cpu: string
  memory: string
  time: string
}
async function getResourceUsage(projectId: string) {
  return (await axios.get('https://go.zimplify.tech/project/resource/' + projectId)).data as Omit<ResourceUsage, 'time'>
}



export default function ProjectPage({ params }) {
  const { data: project } = useProject(params.projectId)
  const [openDetails, { toggle }] = useDisclosure(false);
  const [status, setStatus] = useState(ProjectStatus.deploying);
  const [memoryMax, setMemoryMax] = useState(512)

  const [resourceUsage, handlers] = useListState()
  const [currentResource, setCurrentResource] = useState();


  useEffect(() => {
    const timerId = setInterval(async () => {
      const data = await getStatus()
      setStatus(data.status)

    }, 1500)

    const resourceTimerId = setInterval(async () => {
      const data = await getResourceUsage(params.projectId)
      setCurrentResource(data)
      console.log('resource', data);
      if (data['memory-limit']) {
        const limit = data['memory-limit'].slice(0, -3);
        if (limit !== memoryMax) setMemoryMax(limit)
      }
      const currentTime = dayjs().format('HH:mm:ss');
      handlers.append({
        time: currentTime,
        cpu: Number.parseInt((data.cpu.slice(-1) === '%') ? data.cpu.slice(0, -1) : data.cpu),
        memory: data['memory-used'].slice(0, -3)
      })

    }, 3000)

    return function cleanup() {
      clearInterval(resourceTimerId)
      clearInterval(timerId)
    }
  }, [])


  useEffect(() => {
    if (resourceUsage.length > 10) {
      handlers.remove(0)
    }

  }, [resourceUsage])

  if (!project) return
  const deploymentLink = `https://${project.subDomain}.zimplify.tech`
  return (
    <Stack>
      <Title>
        {project.name}
      </Title>
      <ProjectStatusBadge
        status={status || project.status}
      />

      <Group
        align={'stretch'}
      >
        <CpuUsageCard
          data={resourceUsage.map((item) => ({
            x: item.time,
            y: item.cpu
          }))}
        />
        <MemoryUsageCard
          data={resourceUsage.map((item) => ({
            x: item.time,
            y: item.memory,
          }))}
          yMax={memoryMax}
        />
        <Stack
          w={240}
        >
          <LiveTextOnlyCard
            label={'NET IN'}
            value={currentResource?.['network-in']}
          />

          <LiveTextOnlyCard
            label={'NET OUT'}
            value={currentResource?.['network-out']}
          />

        </Stack>
        <Stack
          w={240}
        >
          <LiveTextOnlyCard
            label={'DISK READ'}
            value={currentResource?.['disk-read']}
          />

          <LiveTextOnlyCard
            label={'DISK WRITE'}
            value={currentResource?.['disk-write']}
          />

        </Stack>

      </Group>
      <Group
        align={'end'}
      >
        <TextInput
          style={{
            flex: 1
          }}
          label={'Deployment link'}
          value={deploymentLink}
        />
        <Button
          component={"a"}
          href={deploymentLink}
          target={'_blank'}
        >
          Visit Site
        </Button>
      </Group>
      <ProjectAccordions />
    </Stack>
  )
}

function LiveTextOnlyCard({ value, label }) {
  return (
    <NonInteractiveCard
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Text
        style={{
          position: 'absolute',
        }}
      >
        {label}
      </Text>
      <Center
        style={{
          flex: 1
        }}
      >
        <Text
          style={{
            fontSize: '2rem'
          }}
        >
          {value}
        </Text>
      </Center>

    </NonInteractiveCard>
  )
}


export function ProjectAccordions() {
  const { projectId } = useParams<{ projectId: string }>()
  const { data: project } = useProject(projectId)
  const { data: logs } = useProjectLogs(projectId)

  return (
    <Accordion
      variant={'contained'}
    >
      <AccItem
        Icon={IconPencil}
        label={'Details'}
      >
        <CreateProjectForm
          initialValues={project}
        />
      </AccItem>

      <AccItem
        Icon={IconArticle}
        label={'Logs'}
      >
        <Code
          block
          bg={'black'}
        >
          {logs}
        </Code>
      </AccItem>

    </Accordion>
  )
}

function AccItem({
  Icon,
  label,
  children
}) {

  return (
    <Accordion.Item
      value={label}
    >
      <Accordion.Control
        icon={<Icon />}
      >
        {label}
      </Accordion.Control>
      <Accordion.Panel>
        {children}
      </Accordion.Panel>
    </Accordion.Item>
  )
}
