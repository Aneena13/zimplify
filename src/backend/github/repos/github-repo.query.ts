import { useQuery } from "@tanstack/react-query";
import { getGithubRepos } from "./github-repo.api";

export const useGithubRepos = () => useQuery({
    queryFn: getGithubRepos,
    queryKey: ['github', 'repos'],
})
