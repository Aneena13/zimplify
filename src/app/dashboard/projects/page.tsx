import { Button, Flex, Group, Modal, Space, Stack, TextInput, Title } from "@mantine/core";
import { AddProject } from "./components/AddProject";
import { ProjectCardsList } from "./components/ProjectCardsList";


export default function DeploymentsPage() {

  return (
    <Stack>
      <Title>
        Projects
      </Title>
      <AddProject />
      <Space h={20} />
      <Flex
          gap={'sm'}
          wrap={'wrap'}
      >
          <ProjectCardsList />
      </Flex>
    </Stack>
  )
}
