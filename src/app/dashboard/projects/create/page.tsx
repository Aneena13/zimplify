import { Center, Stack, Title } from "@mantine/core";
import { CreateProjectForm } from "../components/AddProject";

export default function CreateProjectPage() {
  return (
    <Stack>
      <Title
        order={2}
      >
        Create a new project
      </Title>
      <Center>
        <Stack
          maw={900}
          w="100%"
        >
          <CreateProjectForm />
        </Stack>
      </Center>
    </Stack>
  )
}
