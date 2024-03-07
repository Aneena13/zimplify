'use client'
import { useProject } from "@/backend/project/project.query";
import { ActionIcon, Button, Collapse, Divider, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { CreateProjectForm } from "../components/AddDeployment";
import { ProjectStatusBadge } from "../components/ProjectStatusBadge";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectStatus } from "../../../../../types/enums";

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
      <Group mt={'sm'}>
        <Text>
          Details
        </Text>
        <Divider
          style={{
            flex: 1
          }}
        />
        <ActionIcon
          onClick={toggle}
          variant={'subtle'}
          color={'gray'}
        >
          {openDetails ? (
            <IconChevronUp />
          ) : (
            <IconChevronDown />
          )}
        </ActionIcon>
      </Group>
      <Collapse in={openDetails}>
        <CreateProjectForm
          initialValues={project}
        />
      </Collapse>
    </Stack>
  )
}
