'use client'
import { exchangeCode } from "@/backend/github/auth/github-auth.api";
import { Loader } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GithubSignInSuccessPage() {

  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  useEffect(() => {
    if (!code) return

    exchangeCode(code)
      .then(res => {
        router.push('/dashboard/projects/create/github')
      })
      .catch(err => {
        console.error(err);
      })
  }, [code])

  return (
    <div>
      <h1>Sign in with Github Success</h1>
      <Loader />
      <p>Code: {code}</p>
    </div>
  )
}
