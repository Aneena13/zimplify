'use client'
import { ProjectSourceType } from "../../../../../types/enums";
import { ZCard } from "@/app/components/ZCard";
import { IconBrandBitbucket, IconBrandGithub, IconBrandGitlab, IconEdit, IconSettings } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function ProjectSourceSelector() {
  return (
    <>
      {Object.values(ProjectSourceType).map(st => (
        <SourceTypeCard
          sourceType={st}
        />
      ))}
    </>
  )
}

interface SourceTypeCardProps {
  sourceType: ProjectSourceType
}
function SourceTypeCard({ sourceType }: SourceTypeCardProps) {
  const Icon = sourceIconMap[sourceType];
  const router = useRouter();
  return (
    <ZCard
      p={'md'}
      style={{
        display: 'flex',
        gap: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => {
        router.push(`create/${sourceType.toLocaleLowerCase()}`)
      }}
    >
      <Icon
        size={42}
      />
      {sourceType}
    </ZCard>
  )
}

const sourceIconMap = {
  [ProjectSourceType.GITHUB]: IconBrandGithub,
  [ProjectSourceType.MANUAL]: IconEdit,
  [ProjectSourceType.BITBUCKET]: IconBrandBitbucket,
  [ProjectSourceType.GITLAB]: IconBrandGitlab
}
