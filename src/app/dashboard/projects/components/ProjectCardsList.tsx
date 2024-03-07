'use client'
import { useProjects } from "@/backend/project/project.query";
import { ProjectCard } from "./DeploymentCard";

export function ProjectCardsList() {

  const { data: projects } = useProjects()
  if (!projects) return
  return (
    <>
      {projects.map(p => (
        <ProjectCard
          key={p.id}
          project={p}
        />))}
    </>
  )

}
