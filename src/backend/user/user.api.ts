import { IntegrationPlatform, ProjectSourceType } from "../../../types/enums";
import { axiosClient } from "../axio";

const base = '/user';

export type CreateUser = {
    name: string;
    email: string;
    password: string;
}
export async function signup(data: CreateUser) {
    const res = await axiosClient.post(`${base}/sign-up`, data)
    return res.data;
}
export type SignIn = {
    email: string;
    password: string;
}
export async function signin(data: SignIn) {
    const res = await axiosClient.post(`${base}/sign-in`, data)
    return res.data;
}
export async function whoami() {
    const res = await axiosClient.get(`${base}/whoami`)
    return res.data;
}

export async function getInegration(platform: ProjectSourceType) {
    const res = await axiosClient.get(`/integration/${platform}`)
    return res.data;
}