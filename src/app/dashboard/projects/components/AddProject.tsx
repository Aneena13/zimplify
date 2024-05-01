'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandCss3, IconBrandKotlin, IconBrandNextjs, IconBrandPython, IconBrandReact, IconBrandTypescript, IconLock, IconPlus, IconTerminal2 } from "@tabler/icons-react";
import { Anchor, Button, Chip, Group, Modal, Select, SelectProps, Skeleton, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCreateProjectMutation } from "@/backend/project/project.query";
import { useGithubRepos } from "@/backend/github/repos/github-repo.query";
import { GithubRepo } from "@/backend/github/repos/github-repo.api";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateProjectInput } from "@/backend/project/project.api";
import { ProjectSourceType } from "../../../../../types/enums";
import { useIntegration } from "@/backend/user/user.query";
import { githubAuthUrl } from "../create/github/page";


export function AddProject() {
  const router = useRouter();
  return (
    <Button
      leftSection={<IconPlus />}
      onClick={() => router.push('projects/create')}
    >
      Create Deployment
    </Button>
  )
}

const templates = [
  {
    label: 'ReactJS',
    Icon: IconBrandReact,
  },
  {
    label: 'NextJS',
    Icon: IconBrandNextjs
  }
];

export const github_auth_repo_url = `https://github.com/apps/zimplify/installations/select_target`;
interface CreateProjectFormProps {
  onSubmit?: () => void
}
export function CreateProjectForm({ onSubmit }: CreateProjectFormProps) {
  const params = useSearchParams();
  const source = params.get('source') as ProjectSourceType

  let initialValues: any = {};
  const form = useForm<CreateProjectInput>({
    initialValues: {
      name: initialValues.name || "",
      source: {
        type: initialValues?.source?.type || source,
        github: {
          repo: initialValues?.source?.github?.repo || ""
        }
      },
      buildDir: initialValues.buildDir || "/build",
      rootDir: initialValues.rootDir || "/",
      buildCommand: initialValues.buildCommand || "npm run build",
      subDomain: initialValues.subDomain || "",
      template: initialValues.template || templates[0].label,
      env: initialValues.env || "NODE_ENV=production\nCI=true\n"
    }
  })

  useEffect(() => {
    if (source) {
      form.setFieldValue('source.type', source)
    }
  }, [source])

  const createMutation = useCreateProjectMutation()
  const { data: integration } = useIntegration(form.values.source.type)

  function handleSubmit() {
    createMutation.mutate(form.values)
    onSubmit?.()
  }

  return (
    <Stack>
      <TextInput
        label={'Name'}
        {...form.getInputProps('name')}
      />
      <Group
        w={'100%'}
      >
        <Select
          label={'Source'}
          data={Object.values(ProjectSourceType).map(value => ({ value, label: value }))}
          {...form.getInputProps('source.type')}
          disabled={true}
          w={120}
        />
        {form.values.source.type === ProjectSourceType.GITHUB ? (
          <ListRepos
            {...form.getInputProps('source.github.repo')}
          />
        ) : (
          <TextInput
            style={{ flex: 1 }}
            label={'Source URL'}
            {...form.getInputProps('source.custom')}
          />
        )}
      </Group>
      {form.values.source.type === ProjectSourceType.GITHUB && (
        integration ? (
          <Anchor
            href={github_auth_repo_url}
          >
            Can't find your repo? Give access to zimplify on github
          </Anchor>

        ) : (
          <Anchor
            href={githubAuthUrl}
          >
            Sign in with Github
          </Anchor>
        )
      )}

      <Chip.Group
        {...form.getInputProps('template')}
      >
        <Group>
          {templates.map(({ label, Icon }) => (
            <Chip
              value={label}
              key={label}
            >
              <Group>
                {label}
              </Group>
            </Chip>
          ))}
        </Group>
      </Chip.Group>
      <TextInput
        label={'Build Command'}
        {...form.getInputProps('buildCommand')}
      />
      <Group>
        <TextInput
          label={'Build Directory'}
          {...form.getInputProps('buildDir')}
        />
        <TextInput
          label={'Root Directory'}
          {...form.getInputProps('rootDir')}
        />
      </Group>
      <TextInput
        label={'SubDomain'}
        rightSection={'.zimplify.tech'}
        rightSectionWidth={120}
        {...form.getInputProps('subDomain')}
      />

      <Textarea
        label={'Environment Variables'}
        {...form.getInputProps('env')}
        resize="vertical"
        spellCheck={false}
      />

      <Group
        justify={'space-between'}
      >
        <Button
          variant={'outline'}
          onClick={() => { }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Group>
    </Stack >
  )
}

export function ListRepos(props: SelectProps) {
  const { data: repos, isLoading } = useGithubRepos()

  if (isLoading || !repos) {
    return (
      <Skeleton
        style={{ flex: 1 }}
        mt={15}
        h={'40'}
      />
    )
  }

  return (
    <>
      <Select
        style={{ flex: 1 }}
        searchable
        data={repos.map(r => ({ value: r.id.toString(), label: r.name, language: r.language, visibility: r.visibility }))}
        label={'Select a repo'}
        //@ts-ignore
        renderOption={ProjectRenderer}
        {...props}
      />
    </>
  )
}


interface ProjectRendererProps {
  option: GithubRepo & { label: string },
  checked: boolean
}
function ProjectRenderer({ option, checked }: ProjectRendererProps) {
  return (
    <Group
      justify={'space-between'}
      w={'100%'}
    >
      <Group>
        <LanguageIcon
          language={option.language}
        />
        <Text>
          {option.label}
        </Text>
      </Group>
      {option.visibility === 'private' && (
        <IconLock
          stroke={1}
          color={'#ffbf00'}
        />
      )}
    </Group>
  )
}

const languageIconMap: any = {
  "JavaScript": IconBrandReact,
  "TypeScript": IconBrandTypescript,
  'CSS': IconBrandCss3,
  "Python": IconBrandPython,
  "Kotlin": IconBrandKotlin,
}

function LanguageIcon({ language }: any) {
  const Icon = languageIconMap[language]
  if (!Icon) return <IconTerminal2 stroke={1} />
  return (
    <Icon
      stroke={1}
    />
  )
}
