import { getPublicClient } from "wagmi/actions"
import { config } from "./config"
import { Hex } from "viem"
import toast from "react-hot-toast"

export async function get_properties(address: string) {
    const url = new URL("https://api.blockvision.org/v2/monad/account/nfts")
    url.searchParams.set("address", address)
    const res = await fetch(
        url,
        {
            headers: {
                "Accept": "application/json",
                "X-Api-Key": "2uDur6i5hwYl57Eu5tFLWwIQzc7"
            }
        }
    )
    const response = await res.json()
    console.log(response)
}

export async function refresh_after_trx(cb: () => Promise<string>) {
    try {
        const trx_hash = await toast.promise(
            cb(),
            {
                loading: "Signing Transaction...",
                error: "Failed to Sign Transaction",
                success: "Signed Transaction"
            }
        )
        const client = getPublicClient(config)
        try {
            await toast.promise(
                client.waitForTransactionReceipt({
                    hash: trx_hash as Hex
                }),
                {
                    loading: "Waiting for Transaction...",
                    error: "Failed to Include Transaction",
                    success: "Success! Reload page to update"
                }
            )
        } catch (_) {
            window.location.reload(true)
        }
    } catch (_) {}
}
