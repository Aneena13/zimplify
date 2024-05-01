import { axiosClient } from "@/backend/axio"

const base = '/github/repos'

export type GithubRepo = {
    name: string,
    visibility: "public" | "private",
    owner: string,
    id: number,
    language: string,
}
export async function getGithubRepos() {
    const res = await axiosClient.get(base);
    return res.data as GithubRepo[];
}

export type GH_Branch = {
    name: string
}

export async function getGithubRepoBranches(repoId: number) {
    const res = await axiosClient.get(`${base}/${repoId}/branches`);
    return res.data as GH_Branch[];
}