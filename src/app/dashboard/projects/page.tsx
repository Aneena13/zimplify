import { Button, Flex, Group, Modal, Space, Stack, TextInput, Title } from "@mantine/core";
import { AddDeployment } from "./components/AddDeployment";
import { ProjectCardsList } from "./components/ProjectCardsList";


export default function DeploymentsPage() {

  return (
    <Stack>
      <Title>
        Projects
      </Title>
      <AddDeployment />
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
