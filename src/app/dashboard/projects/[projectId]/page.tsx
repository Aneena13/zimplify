'use client'
import { useProject } from "@/backend/project/project.query";
import { ActionIcon, Button, Collapse, Divider, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { CreateProjectForm } from "../components/AddDeployment";
import { ProjectStatusBadge } from "../components/ProjectStatusBadge";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ProjectPage({ params }) {
  const { data: project } = useProject(params.projectId)
  const [openDetails, { toggle }] = useDisclosure(false);
    const router = useRouter()
  if (!project) return


  const deploymentLink = `https://${project.subDomain}.zimplify.tech`
  return (
    <Stack>
      <Title>
        {project.name}
      </Title>
      <ProjectStatusBadge
        status={project.status}
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
