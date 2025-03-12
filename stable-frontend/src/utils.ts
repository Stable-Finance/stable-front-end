import { NFT_ADDR } from "./constants"

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
