'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandNextjs, IconBrandReact, IconPlus } from "@tabler/icons-react";
import { Button, Chip, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { useCreateProjectMutation } from "@/backend/project/project.query";

export function AddProject() {

  const [isOpened, { open, close }] = useDisclosure(false)

  const [source, setSource] = useState("")

  return (
    <Group>
      <TextInput
        placeholder={`Enter github url`}
        style={{
          flex: 1
        }}
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <Button
        leftSection={<IconPlus />}
        onClick={open}
      >
        Create Deployment
      </Button>
      <Modal
        opened={isOpened}
        onClose={close}
        title={"Create Project"}
      >
        <Stack>
          <CreateProjectForm
            initialValues={{ source }}
            onCancel={close}
          />
        </Stack>
      </Modal>
    </Group>
  )
}

const subDomains = [
  "one",
  "two",
  "three",
  "four",
  "five"
];

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

interface CreateProjectFormProps {
  initialValues: any,
  onCancel?: () => void,
  onSubmit?: () => void
}
export function CreateProjectForm({ initialValues, onCancel, onSubmit }: CreateProjectFormProps) {

  if (!initialValues) initialValues = {}

  const form = useForm({
    initialValues: {
      name: initialValues.name || "",
      source: initialValues.source || "",
      buildDir: initialValues.buildDir || "/build",
      rootDir: initialValues.rootDir || "/",
      buildCommand: initialValues.buildCommand || "npm run build",
      subDomain: initialValues.subDomain || "one",
      template: initialValues.template || templates[0].label
    }
  })

  const createMutation = useCreateProjectMutation()

  function handleClose() {
    onCancel?.()
  }
  function handleSubmit() {
    createMutation.mutate(form.values, {
      onSuccess: handleClose
    })
    onSubmit?.()
  }

  return (
    <>
      <Stack>
        <TextInput
          label={'Name'}
          {...form.getInputProps('name')}
        />
        <TextInput
          label={'Source URL'}
          {...form.getInputProps('source')}
        />
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
                  <Icon
                    stroke={1.5}
                  />
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
        <Select
          data={subDomains}
          label={'SubDomain'}
          {...form.getInputProps('subDomain')}
        />

      </Stack>
      <Group
        justify={'space-between'}
      >
        <Button
          variant={'outline'}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Group>
    </>
  )
}
