'use client'
import { Badge, Box, Button, ButtonProps, Group, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { github_auth_repo_url } from "../../components/AddProject";
import { useIntegration } from "@/backend/user/user.query";
import { ProjectSourceType } from "../../../../../../types/enums";
import { IconCheck, IconCircleCheck } from "@tabler/icons-react";

const github_client_id = process.env.NEXT_PUBLIC_client_id;
if (!github_client_id) {
  throw new Error(
    'Missing NEXT_PUBLIC_client_id environment variable. Please set it in .env.local'
  )
}
export const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${github_client_id}`

export default function GithubSignInPage() {

  const { data: githubIntergration, isLoading: isIntegrationFetchLoading } = useIntegration(ProjectSourceType.GITHUB);

  function handleClick() {
    window.location.href = githubAuthUrl;
  }
  function handleRepositoryAccessClick() {
    window.location.href = github_auth_repo_url;
  }
  return (
    <Stack>
      <Title>
        Github Auth Flow
      </Title>
      <Stack
        px={'md'}
      >
        <Step
          number={1}
          title={'Sign in with Github'}
        />
        <Box
          ml={'60px'}
        >
          {
            githubIntergration ? (
              <Done />
            ) : (
              <AuthActionButton
                loading={isIntegrationFetchLoading}
                onClick={handleClick}
              >
                Click here to sign in
              </AuthActionButton>
            )}
        </Box>
        <Step
          number={2}
          title={'Authorize Zimplify to access your repositories'}
        />
        <Box
          ml={'60px'}
        >
          <AuthActionButton
            loading={isIntegrationFetchLoading}
            disabled={!githubIntergration}
            onClick={handleRepositoryAccessClick}
          >
            Authorize
          </AuthActionButton>
        </Box>
        <Step
          number={3}
          title={'You are all set!'}
        />
        <Box
          ml={'60px'}
        >
          <Text>
            You can now create a new project with your Github repositories
          </Text>
          <AuthActionButton
            loading={isIntegrationFetchLoading}
            mt={'sm'}
            onClick={() => {
              window.location.href = '/dashboard/projects/create?source=' + ProjectSourceType.GITHUB
            }}
            disabled={!githubIntergration}
          >
            Lets Go!
          </AuthActionButton>
        </Box>
      </Stack>
    </Stack>
  )
}

interface StepProps {
  number: number;
  title: string;
}
function Step({ number, title }: StepProps) {
  return (
    <Group
      mt={'md'}
    >
      <Badge
        size={'xl'}
      >
        {number}
      </Badge>
      <Title order={2}>
        {title}
      </Title>
    </Group>
  )
}

function Done() {
  return (
    <Group>
      <IconCircleCheck
        size={42}
        color={'var(--mantine-primary-color-filled)'}
      />
      <Text
        fs={'italic'}
        fz={'xl'}
      >
        Done!
      </Text>
    </Group>
  )
}

function AuthActionButton({ onClick, children, ...props }: ButtonProps & { onClick: any }) {
  return (
    <Button
      size="lg"
      w={'fit-content'}
      onClick={onClick}
      variant={'outline'}
      radius={'md'}
      {...props}
    >
      {children}
    </Button>
  )
}