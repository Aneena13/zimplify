'use client'
import { Center, Group, Stack, Title } from "@mantine/core";
import { CreateProjectForm } from "../components/AddProject";
import { useSearchParams } from "next/navigation";
import { ProjectSourceSelector } from "../components/ProjectSourceSelector";

export default function CreateProjectPage() {
  const params = useSearchParams();
  const isSourceConfigured = !!params.get('source')
  return (
    <Stack>
      <Title
        order={2}
      >
        Create a new project
      </Title>
      <Center>
        <Stack
          maw={600}
          w="100%"
        >
          {isSourceConfigured ? (
            <CreateProjectForm />
          ) : (
            <Group>
              <ProjectSourceSelector />
            </Group>
          )}
        </Stack>
      </Center>
    </Stack>
  )
}
