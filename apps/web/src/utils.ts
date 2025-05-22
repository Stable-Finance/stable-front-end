import { getPublicClient } from "wagmi/actions"
import { config } from "./config"
import { Hex, WalletClient } from "viem"
import toast from "react-hot-toast"

import erc20_abi from "./erc20_abi.json"
import { NFT_ADDR } from "./constants";
import { monadTestnet } from "viem/chains";

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

export async function ensure_tokens_approved(
    wallet: WalletClient,
    token_addr: Hex,
    amount: bigint,
    cb: () => Promise<void>
) {
    const addr = wallet.account?.address
    if (!addr) return

    const client = getPublicClient(config)
    const value = await toast.promise(
        client.readContract({
            address: token_addr,
            abi: erc20_abi,
            functionName: "allowance",
            args: [addr, NFT_ADDR]
        }),
        {
            loading: "Checking for Allowance",
            error: "Failed to get Allowance"
        }
    )
    console.log(value)
    if ((value as bigint) < amount) {
        const trx_hash = await toast.promise(
            wallet.writeContract({
                abi: erc20_abi,
                account: addr,
                address: token_addr,
                chain: monadTestnet,
                functionName: "approve",
                args: [NFT_ADDR, amount]
            }),
            {
                loading: "Requesting Approval Signature",
                error: "Failed to Approve",
                success: "Signed Transaction"
            }
        )
        await toast.promise(
            client.waitForTransactionReceipt({
                hash: trx_hash as Hex
            }),
            {
                loading: "Waiting for Transaction...",
                error: "Failed to Include Transaction",
                success: "Transaction Found"
            }
        )
        await cb()
    }
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

export const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    trailingZeroDisplay: "stripIfInteger"
}).format
