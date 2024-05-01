import { useQuery } from "@tanstack/react-query";
import { getGithubRepoBranches, getGithubRepos } from "./github-repo.api";

export const useGithubRepos = () => useQuery({
    queryFn: getGithubRepos,
    queryKey: ['github', 'repos'],
})

export const useGithubRepoBranches = (repoId: number) => useQuery({
    enabled: !!repoId,
    queryFn: () => getGithubRepoBranches(repoId),
    queryKey: ['github', 'repos', repoId, 'branches']
})