'use client'
import { Button, Stack } from "@mantine/core";

const github_client_id = process.env.NEXT_PUBLIC_client_id;
if (!github_client_id) {
  throw new Error(
    'Missing NEXT_PUBLIC_client_id environment variable. Please set it in .env.local'
  )
}
export const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${github_client_id}`
export default function GithubSignIn() {
  function handleClick() {
    window.location.href = githubAuthUrl;
  }
  return (
    <Stack>
      <Button
        onClick={handleClick}
      >
        Sign in with Github
      </Button>
    </Stack>
  )
}
