import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signin, whoami, signup, SignIn, CreateUser, getInegration } from "./user.api";
import { IntegrationPlatform, ProjectSourceType } from "../../../types/enums";

export const useWhoAmI = () =>
    useQuery({
        queryKey: ['user'],
        queryFn: whoami,
        retry: false
    })

export const useSignInMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: SignIn) => signin(data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}
export const useSignUpMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateUser) => signup(data),
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}

export const useIntegration = (platform: ProjectSourceType) => useQuery({
    queryKey: ['integration', platform],
    queryFn: () => getInegration(platform)
})
