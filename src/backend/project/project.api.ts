import { ProjectSource } from "../../../types/types";
import { axiosClient } from "../axio";

const base = `/project`;

export type CreateProjectInput = {
    name: string;
    source: ProjectSource
    buildDir: string;
    buildCommand: string;
    rootDir: string;
    subDomain: string;
    template: string;
    env: string;
}
export async function createProject(data: CreateProjectInput) {
    return await axiosClient.post(base, data);
}

export async function getProjectById(projectId: string) {
    return (await axiosClient.get(`${base}/${projectId}`)).data
}

export async function getProjects() {
    return (await axiosClient.get(base)).data
}
export async function deleteProject(projectId: string) {
    return (await axiosClient.delete(`${base}/${projectId}`)).data
}
