import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signin, whoami,signup, SignIn, CreateUser } from "./user.api";

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

