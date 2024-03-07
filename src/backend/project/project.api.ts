import { axiosClient } from "../axio";

const base = `/project`;

export async function createProject(data) {
    return await axiosClient.post(base, data);
}

export async function getProjectById(projectId: string) {
    return (await axiosClient.get(`${base}/${projectId}`)).data
}

export async function getProjects() {
    return (await axiosClient.get(base)).data
}
