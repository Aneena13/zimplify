'use client'
import { useProject } from "@/backend/project/project.query";
import { Accordion, ActionIcon, Button, Code, Collapse, Divider, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { CreateProjectForm } from "../components/AddProject";
import { ProjectStatusBadge } from "../components/ProjectStatusBadge";
import { useDisclosure } from "@mantine/hooks";
import { IconArticle, IconChevronDown, IconChevronUp, IconPencil } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectStatus } from "../../../../../types/enums";
import { useParams } from "next/navigation";

async function getStatus() {
  return (await axios.get('https://go.zimplify.tech/status')).data
}

export default function ProjectPage({ params }) {
  const { data: project } = useProject(params.projectId)
  const [openDetails, { toggle }] = useDisclosure(false);
  const [status, setStatus] = useState(ProjectStatus.deploying);



  useEffect(() => {
    const timerId = setInterval(async () => {
      const data = await getStatus()
      setStatus(data.status)
      console.log('res', data);
    }, 1500)

    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

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

function ProjectAccordions() {
  const { projectId } = useParams<{ projectId: string }>()
  const { data: project } = useProject(projectId)

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
          {`

          `}
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
