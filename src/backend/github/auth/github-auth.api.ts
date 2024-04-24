import { axiosClient } from "@/backend/axio"

const base = `/github/auth`

export async function exchangeCode(code: string) {
    const res = await axiosClient.post(`${base}/exchange-code`, { code })
    return res.data
}
