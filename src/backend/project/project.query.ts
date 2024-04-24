import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, deleteProject, getLogs, getProjectById, getProjects } from "./project.api";

export const useProject = (projectId: string) => useQuery({
  enabled: !!projectId,
  queryFn: () => getProjectById(projectId),
  queryKey: ['project', projectId]
})

export const useProjects = () => useQuery({
  queryFn: getProjects,
  queryKey: ['project']
})

export const useCreateProjectMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['project']
      })
    }
  })
}

export const useDeleteProjectMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['project']
      })
    }
  })
}

export const useProjectLogs = (projectId: string) => useQuery({
  enabled: !!projectId,
  queryFn: () => getLogs(projectId),
  queryKey: ['project', 'logs', projectId]
})