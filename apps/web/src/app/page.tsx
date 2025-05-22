/* eslint-disable @next/next/no-img-element */
"use client"

// #ffd577 c89116 f9da79 b79132 e6e6e6

import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { ClipboardDocumentCheckIcon, ClipboardIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, Hex, WalletClient } from "viem";
import { monadTestnet } from "wagmi/chains";

import nft_abi from "@/nft_abi.json"
import usdx_abi from "@/usdx_abi.json"
import waifu_abi from "@/waifu_abi.json"

import { NFT_ADDR, USDC_ADDR, USDT_ADDR, USDX_ADDR, WAIFU_ADDR } from "@/constants";
import { ensure_tokens_approved, formatCurrency, refresh_after_trx } from "@/utils";
import { useReadContract, useReadContracts } from "wagmi";
import { create } from 'zustand'
import toast from "react-hot-toast";

interface WalletStore {
  current_addr: string | null
  current_wallet: ConnectedWallet | null
  wallets: ConnectedWallet[]

  owns_property: boolean,
  set_owns_property: () => void,

  set_wallets: (wallets: ConnectedWallet[]) => void
  set_current_wallet: (idx: number) => void
}
const useWalletStore = create<WalletStore>(set => ({
  current_addr: null,
  current_wallet: null,

  owns_property: false,
  set_owns_property: () => set({ owns_property: true }),

  wallets: [],
  set_wallets: wallets => set({ wallets }),
  set_current_wallet: idx => set(state => ({
    current_addr: state.wallets[idx].address,
    current_wallet: state.wallets[idx]
  }))
}))

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#e6e6e6] ">
      <div className="grid grid-cols-[2fr_1fr] border-4 rounded-xl max-w-5xl w-full border-[#c89116]">
        <div className="text-black border-r-4 border-[#c89116] p-4 flex flex-col gap-4">
          <div className="flex items-center">
            <h2 className="font-extrabold text-2xl mr-2">Stable Protocol</h2>
            <ContractAddressesPopup />
            <div className="ml-auto">
              <LoggedInUser />
            </div>
          </div>
          <WithWallet />
        </div>
        <WaifuRealtorsMint />
      </div>
    </div>
  );
}

function WaifuRealtorsMint() {
  const store = useWalletStore()
  const [ids, set_ids] = useState<bigint[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const wallet = store.current_wallet!
        await wallet.switchChain(monadTestnet.id)
        const provider = await wallet.getEthereumProvider()
        const viem_client = createWalletClient({
          account: wallet.address as Hex,
          chain: monadTestnet,
          transport: custom(provider)
        })
        const public_client = createPublicClient({
          chain: monadTestnet,
          transport: custom(provider)
        })
        const n_owned: bigint = await public_client.readContract({
          abi: waifu_abi,
          address: WAIFU_ADDR,
          functionName: "balanceOf",
          args: [wallet.address]
        })
        const ids: bigint[] = await Promise.all(Array.from({ length: Number(n_owned) }).map((_, i) => {
          return public_client.readContract({
            abi: waifu_abi,
            address: WAIFU_ADDR,
            functionName: "tokenOfOwnerByIndex",
            args: [wallet.address, BigInt(i)]
          })
        }))
        set_ids(ids)
      } catch (_) {}
    })()
  }, [store.current_wallet])

  return <div className="flex flex-col gap-2 p-4 items-center w-full text-center">
    <h2 className="text-nowrap text-black font-bold text-xl text-center">Waifu Realtors Mint</h2>
    <a
      className="text-blue-600 underline"
      href={`https://magiceden.us/collections/monad-testnet/${WAIFU_ADDR}`}
      target="_blank"
    >
      Magic Eden Collection
    </a>
    <div>
      {
        store.owns_property ?
          <div>
            <button
              onClick={async () => {
                const wallet = store.current_wallet!
                await wallet.switchChain(monadTestnet.id)
                const provider = await wallet.getEthereumProvider()
                const viem_client = createWalletClient({
                  account: wallet.address as Hex,
                  chain: monadTestnet,
                  transport: custom(provider)
                })
                const public_client = createPublicClient({
                  chain: monadTestnet,
                  transport: custom(provider)
                })
                refresh_after_trx(async () => {
                  const is_whitelisted = await public_client.readContract({
                    abi: waifu_abi,
                    address: WAIFU_ADDR,
                    functionName: "isWhitelisted",
                    args: [wallet.address],
                  })
                  const whitelist_val = 1_000_000_000_000_000_000n / 10n
                  const regular_val = 3n * 1_000_000_000_000_000_000n / 10n
                  return viem_client.writeContract({
                    abi: waifu_abi,
                    address: WAIFU_ADDR,
                    account: wallet.address as Hex,
                    functionName: "mint",
                    value: is_whitelisted ? whitelist_val : regular_val,
                    args: []
                  })
                })
              }}
              className="text-black font-bold bg-[#c89133] px-2 py-1 rounded-sm cursor-pointer mt-4"
            >
              Mint
            </button>
          </div> :
          <>
          <p className="text-black">Deposit a Property to Access the Mint</p>
          {
            ids.map(id => <button
              key={Number(id)}
              onClick={async () => {
                const wallet = store.current_wallet!
                await wallet.switchChain(monadTestnet.id)
                const provider = await wallet.getEthereumProvider()
                const viem_client = createWalletClient({
                  account: wallet.address as Hex,
                  chain: monadTestnet,
                  transport: custom(provider)
                })
                ensure_tokens_approved(
                  viem_client,
                  USDX_ADDR,
                  1_000_000n,
                  async () => {
                    await viem_client.writeContract({
                      abi: waifu_abi,
                      address: WAIFU_ADDR,
                      functionName: "unblur",
                      args: [id]
                    })
                  }
                )
              }}
            >
              Unblur #{Number(id)}
            </button>)
          }
          </>
      }
    </div>
  </div>
}


function ContractAddressesPopup() {
  const [is_open, set_is_open] = useState(false)
  return <div>
    <button className="cursor-pointer" onClick={() => set_is_open(true)}>
      <QuestionMarkCircleIcon className="h-6 w-6" strokeWidth={2}/>
    </button>
    <Modal title="Contract Addresses" onCancel={() => set_is_open(false)} open={is_open} footer={null}>
      <div className="grid grid-cols-[1fr_2fr]">
        <p className="font-bold">USDX</p>
        <a href={`https://testnet.monadexplorer.com/token/${USDX_ADDR}`} className="font-mono" target="_blank">{USDX_ADDR}</a>
        <p className="font-bold">Property NFT</p>
        <a href={`https://testnet.monadexplorer.com/token/${NFT_ADDR}`} className="font-mono" target="_blank">{NFT_ADDR}</a>
      </div>
    </Modal>
  </div>
}

function WithWallet() {
  const { wallets, current_addr, current_wallet } = useWalletStore()
  
  if (wallets.length == 0 || !current_addr || !current_wallet) {
    return <div className="flex flex-row items-center justify-center py-4">
      <p className="">You Must be Logged In</p>
    </div>
  }

  return <WithViemClient wallet={current_wallet} user_addr={current_addr} />
}

function WithViemClient({ wallet, user_addr }: { wallet: ConnectedWallet, user_addr: string }) {
  const [viemClient, setViemClient] = useState<null | WalletClient>(null)
  const [latest_hash, set_latest_hash] = useState("")
  useEffect(() => {
    wallet.switchChain(monadTestnet.id)
    wallet.getEthereumProvider()
      .then(provider => {
        setViemClient(createWalletClient({
          account: wallet.address as Hex,
          chain: monadTestnet,
          transport: custom(provider)
        }))
      })
  }, [wallet])

  if (!viemClient) {
    return <p>Loading...</p>
  }

  return <div>
    <MintSection viemClient={viemClient} user_addr={user_addr} on_trx={set_latest_hash} />
    <BorrowSection viemClient={viemClient} user_addr={user_addr} latest_hash={latest_hash} />
  </div>
}

function BorrowSection({ viemClient, user_addr, latest_hash }: { viemClient: WalletClient, user_addr: string, latest_hash: string }) {
  const { data, isLoading, isError, refetch } = useReadContract({
    abi: nft_abi,
    address: NFT_ADDR,
    functionName: "balanceOf",
    args: [user_addr]
  })
  useEffect(() => {
    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latest_hash])


  if (isLoading) {
    return <div className="flex flex-col gap-4 p-4 justify-center">
      <p>Loading...</p>
    </div>
  }
  if (isError) {
    return <div className="flex flex-col gap-4 p-4 justify-center">
      <p>Error!</p>
    </div>
  }
  if (data == 0n) {
    return <></>
  }
  return <HasNFTSection latest_hash={latest_hash} user_addr={user_addr} viemClient={viemClient} n_nfts={Number(data)} />
}

function HasNFTSection({ viemClient, user_addr, latest_hash, n_nfts }: { viemClient: WalletClient, user_addr: string, latest_hash: string, n_nfts: number }) {
  const store = useWalletStore()
  if (!store.owns_property) {
    store.set_owns_property()
  }
  const { data, isLoading, isError } = useReadContracts({
    contracts: Array.from({ length: n_nfts }).map((_, i) => ({
      abi: nft_abi,
      address: NFT_ADDR,
      functionName: "tokenOfOwnerByIndex",
      args: [user_addr, BigInt(i)]
    }))
  })
  if (isLoading || !data) {
    return <div className="flex flex-col gap-4 p-4 justify-center">
      <p>Loading...</p>
    </div>
  }
  if (isError) {
    return <div className="flex flex-col gap-4 p-4 justify-center">
      <p>Error!</p>
    </div>
  }
  return <WithBorrowSection viemClient={viemClient} user_addr={user_addr} latest_hash={latest_hash} nft_ids={data.map(r => r.result as bigint)} />

}

function WithBorrowSection({ viemClient, user_addr, latest_hash, nft_ids }: { viemClient: WalletClient, user_addr: string, latest_hash: string, nft_ids: bigint[] }) {
  const { data, isLoading, isError } = useReadContracts({
    contracts: nft_ids.map((nft_id) => ({
      abi: nft_abi,
      address: NFT_ADDR as Hex,
      functionName: "tokenURI",
      args: [nft_id],
    }))
  })
  if (isLoading || !data) {
    return <div className="flex flex-col gap-4 p-4 justify-center">
      <p>Loading...</p>
    </div>
  }
  if (isError) {
    return <div className="flex flex-col gap-4 p-4 justify-center">
      <p>Error!</p>
    </div>
  }
  return <div className="grid grid-cols-2 gap-4 pt-8">
    {data.map(r => r.result as string | undefined).filter(r => r !== undefined).map((r, idx) => <PropertyManager
      latest_hash={latest_hash}
      uri={r}
      user_addr={user_addr}
      viemClient={viemClient}
      key={idx}
    />)}
  </div>
}

function PropertyManager({ viemClient, user_addr, latest_hash, uri }: { viemClient: WalletClient, user_addr: string, latest_hash: string, uri: string }) {
  const [is_open, set_is_open] = useState(false)
  const b64data = uri.split(",")[1]
  const decoded = atob(b64data)
  const jsonData = JSON.parse(decoded)
  const attrs = jsonData.attributes
  const nft_id = BigInt(jsonData.name.split("#")[1])
  
  console.log(attrs)
  return <>
    <Modal footer={null} title={jsonData.name} open={is_open} onOk={() => set_is_open(false)} onCancel={() => set_is_open(false)}>
      <div className="flex flex-col gap-4">
        <img src={jsonData.image} alt={jsonData.name} className="" />
        <p><b>Deposited:</b> <span className="font-mono">{new Date(attrs[7].value).toTimeString()}</span></p>
        <p><b>Prepaid Interest:</b> <span className="font-mono">{formatCurrency(attrs[8].value)}</span></p>
        <p><b>Unpaid Interest:</b> <span className="font-mono">{formatCurrency(attrs[9].value)}</span></p>
        <p><b>Missed Payments:</b> <span className="font-mono">{formatCurrency(attrs[10].value)}</span></p>
        <div className="flex w-full gap-4">
          <BorrowModal nft_id={nft_id} jsonData={jsonData} viemClient={viemClient} user_addr={user_addr} />
          <InterestModal nft_id={nft_id} jsonData={jsonData} viemClient={viemClient} user_addr={user_addr} />
          <RepayModal nft_id={nft_id} jsonData={jsonData} viemClient={viemClient} user_addr={user_addr} />
        </div>
      </div>
    </Modal>
    <img
      onClick={() => set_is_open(true)}
      className="cursor-pointer"
      src={jsonData.image}
      alt={jsonData.name}
    />
  </>
}

function InterestModal({ jsonData, viemClient, user_addr, nft_id }: {jsonData: any, viemClient: WalletClient, user_addr: string, nft_id: bigint}) {
  const [is_open, set_is_open] = useState(false)
  const [repay, set_repay] = useState("0")
  const [token, set_token] = useState(USDX_ADDR)
  const prepaid_interest = BigInt(jsonData.attributes[8].value)
  const unpaid_interest = BigInt(jsonData.attributes[9].value)

  return <>
    <button
      className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer w-full"
      onClick={() => set_is_open(true)}
    >
      Make Payment
    </button>
    <Modal footer={null} title={"Make Interest Payment on" + jsonData.name} open={is_open} onOk={() => set_is_open(false)} onCancel={() => set_is_open(false)}>
      <p className="mb-2">This property has <b className="font-mono">{formatCurrency(unpaid_interest)}</b> worth of unpaid interest.</p>
      <p className="mb-2">This property has <b className="font-mono">{formatCurrency(prepaid_interest)}</b> worth of prepaid interest.</p>
      <p className="mb-2">
        In the current implementation, interest works seperately than principal.
        It is the borrower&apos;s responsibility that sufficient interest is deposited in
        in the prepaid interest account to cover the interest payments that are calculated
        at the end of the month.
      </p>
      <p className="mb-2">
        Interest payments are automatically deducted at the end of the month. If there is not sufficient
        prepaid interest, the property will be hit with a missed payment. Three missed payments results
        in borrowers being unable to borrow against the property.
      </p>
      <p className="mb-2">
        If a property already has unpaid interest, interest payments will pay that off first
        before it goes into the prepaid interest.
      </p>
      <div className="grid gap-2 grid-cols-2">
        <p className="font-bold">Payment Amount:</p>
        <InputNumber
          stringMode
          min="0"
          max={String(100_000_000n)}
          defaultValue={"0"}
          onChange={v => set_repay(v || "0")}
          style={{
            width: "8rem"
          }}
        />
        <p className="font-bold">Token:</p>
        <select value={token} onChange={e => set_token(e.target.value)} className="border border-gray-300 p-1 rounded-sm bg-white font-mono">
          <option value={USDX_ADDR}>USDX</option>
          <option value={USDT_ADDR}>USDT</option>
          <option value={USDC_ADDR}>USDC</option>
        </select>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-[#c89116] rounded-md py-2 font-bold cursor-pointer w-full"
          onClick={async () => {
            console.log(nft_id, BigInt(repay) * 1_000_000n)
            ensure_tokens_approved(
              viemClient,
              token as Hex,
              BigInt(repay) * 1_000_000n,
              () => refresh_after_trx(() => viemClient.writeContract({
                account: user_addr as Hex,
                chain: monadTestnet,
                abi: nft_abi,
                address: NFT_ADDR,
                args: [nft_id, token, BigInt(repay) * 1_000_000n],
                functionName: "makePayment"
              }))
            )
          }}
        >
          Confirm
        </button>
      </div>
    </Modal>
  </>
}

function BorrowModal({ jsonData, viemClient, user_addr, nft_id }: {jsonData: any, viemClient: WalletClient, user_addr: string, nft_id: bigint}) {
  const [is_open, set_is_open] = useState(false)
  const value = BigInt(jsonData.attributes[0].value)
  const liens = BigInt(jsonData.attributes[1].value)
  const debt = BigInt(jsonData.attributes[2].value)
  const max_ltv = BigInt(jsonData.attributes[3].value)

  let max_borrow: bigint | string = 0n
  if (value > liens) {
    const borrowable = (value - liens) * max_ltv / 100n;
    console.log(borrowable)
    if (debt > borrowable) {
      max_borrow = "There is too much debt on the property"
    } else {
      max_borrow = borrowable - debt;
    }
  } else {
    max_borrow = "There are too many liens on the property"
  }
  console.log(max_borrow)
  const [borrow, set_borrow] = useState(typeof max_borrow === "string" ? "0" : String(max_borrow))

  return <>
    <button
      className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer w-full"
      onClick={() => set_is_open(true)}
    >
      Borrow USDX
    </button>
    <Modal footer={null} title={"Borrow From " + jsonData.name} open={is_open} onOk={() => set_is_open(false)} onCancel={() => set_is_open(false)}>
      {typeof max_borrow === "bigint" ? <div className="flex flex-col gap-4">
        <p>You can borrow up to: {max_borrow} USDX</p>
        <InputNumber
          stringMode
          min="0"
          max={String(max_borrow)}
          defaultValue={String(max_borrow)}
          onChange={v => set_borrow(v || "0")}
          style={{
            width: "8rem"
          }}
        />
        <button
          className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer w-full"
          onClick={async () => {
            console.log(nft_id, BigInt(borrow) * 1_000_000n)
            refresh_after_trx(() => viemClient.writeContract({
              account: user_addr as Hex,
              chain: monadTestnet,
              abi: nft_abi,
              address: NFT_ADDR,
              args: [nft_id, BigInt(borrow) * 1_000_000n],
              functionName: "borrow"
            }))
          }}
        >
          Confirm
        </button>
      </div> : <>
        <p>Unable to Borrow: {max_borrow}</p>
      </>}
    </Modal>
  </>
}
function RepayModal({ jsonData, viemClient, user_addr, nft_id }: {jsonData: any, viemClient: WalletClient, user_addr: string, nft_id: bigint}) {
  const [is_open, set_is_open] = useState(false)
  const [repay, set_repay] = useState("0")
  const [token, set_token] = useState(USDX_ADDR)
  const debt = BigInt(jsonData.attributes[2].value)

  return <>
    <button
      className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer w-full"
      onClick={() => set_is_open(true)}
    >
      Repay Debt
    </button>
    <Modal footer={null} title={"Repay Debt of " + jsonData.name} open={is_open} onOk={() => set_is_open(false)} onCancel={() => set_is_open(false)}>
      <p className="mb-2">This property has a debt of <b className="font-mono">{formatCurrency(debt)}</b></p>
      <div className="grid gap-2 grid-cols-2">
        <p className="font-bold">Repay Amount:</p>
        <InputNumber
          stringMode
          min="0"
          max={String(debt)}
          defaultValue={"0"}
          onChange={v => set_repay(v || "0")}
          style={{
            width: "8rem"
          }}
        />
        <p className="font-bold">Token:</p>
        <select value={token} onChange={e => set_token(e.target.value)} className="border border-gray-300 p-1 rounded-sm bg-white font-mono">
          <option value={USDX_ADDR}>USDX</option>
          <option value={USDT_ADDR}>USDT</option>
          <option value={USDC_ADDR}>USDC</option>
        </select>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-[#c89116] rounded-md py-2 font-bold cursor-pointer w-full"
          onClick={async () => {
            console.log(nft_id, BigInt(repay) * 1_000_000n)
            ensure_tokens_approved(
              viemClient,
              token as Hex,
              BigInt(repay) * 1_000_000n,
              () => refresh_after_trx(() => viemClient.writeContract({
                account: user_addr as Hex,
                chain: monadTestnet,
                abi: nft_abi,
                address: NFT_ADDR,
                args: [nft_id, token, BigInt(repay) * 1_000_000n],
                functionName: "repayBorrow"
              }))
            )
          }}
        >
          Confirm
        </button>
      </div>
    </Modal>
  </>
}

function MintSection({ viemClient, user_addr, on_trx }: { viemClient: WalletClient, user_addr: string, on_trx: (hash: string) => void }) {
  const [value, setValue] = useState("1000000")
  const [ltv, setLtv] = useState("800000000")
  const [lien, setLien] = useState("0")

  return <div className="flex flex-col gap-4">
    <div className="grid grid-cols-2 gap-2">
      <p className="font-bold">Property Value</p>
      <InputNumber
        stringMode
        min="0"
        max="100000000"
        defaultValue="1000000"
        onChange={v => setValue(v || "0")}
        style={{
          width: "8rem"
        }}
      />
      <p className="font-bold">Max LTV</p>
      <select value={ltv} onChange={e => setLtv(e.target.value)} className="border border-gray-300 p-1 rounded-sm bg-white font-mono">
        <option value={"800000000"}>Residential - 80%</option>
        <option value={"650000000"}>Agricultural - 65%</option>
        <option value={"600000000"}>Commercial - 60%</option>
        <option value={"500000000"}>Industrial - 50%</option>
      </select>
      <p className="font-bold">Lien</p>
      <select value={lien} onChange={e => setLien(e.target.value)} className="border border-gray-300 p-1 rounded-sm bg-white font-mono">
        <option value={"0"}>None - 0%</option>
        <option value={"10"}>Low - 10%</option>
        <option value={"30"}>Medium - 30%</option>
        <option value={"60"}>High - 60%</option>
      </select>
    </div>
    <button
      onClick={async () => {
        const propertyValue = BigInt(value + "000000");
        refresh_after_trx(() => viemClient.writeContract({
          abi: nft_abi,
          address: NFT_ADDR,
          functionName: "depositProperty",
          args: [
            propertyValue,
            propertyValue * BigInt(lien) / 100n,
            ltv,
            "0",
            user_addr
          ],
          account: user_addr as Hex,
          chain: monadTestnet
        }))
      }}
      className="bg-[#c89116] rounded-md py-2 font-bold cursor-pointer"
    >
      Deposit Property
    </button>
  </div>
}

function LoggedInUser() {
  const store = useWalletStore()
  const { login, linkWallet, user } = usePrivy()
  const { ready, wallets } = useWallets()
  const [is_open, set_is_open] = useState(false)

  useEffect(() => {
    if (store.wallets.length == 0 && wallets.length > 0) {
      store.set_wallets(wallets)
      store.set_current_wallet(0)
    } else {
      for (const w of wallets) {
        if (store.wallets.every(w2 => w2.address !== w.address)) {
          store.set_wallets(wallets)
        }
      }
    }
  }, [wallets, store])

  const [copied, set_copied] = useState(false)
  if (!ready) {
    return <p className="font-mono">Loading...</p>
  }
  if (store.current_addr == null) {
    return <button className="bg-[#c89116] cursor-pointer rounded-sm p-1 px-2 font-bold" onClick={() => login()}>Login</button>
  }

  const addr = store.current_addr
  return <div className="flex gap-2 items-center">
    <USDXDisplay addr={addr} />
    <Modal onCancel={() => set_is_open(false)} open={is_open} footer={false}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        {store.wallets.map((w, i) =>
          <button
            key={i}
            className="p-1 px-2 hover:bg-[#e9e9e9] rounded-sm font-mono hover:font-bold cursor-pointer"
            onClick={() => {
              store.set_current_wallet(i)
              set_is_open(false)
            }}
          >
            {w.address}
          </button>)}
          <div>
            <button
              className="bg-[#c89116] rounded-sm p-2 cursor-pointer font-bold"
              onClick={() => {
                if (user) {
                  linkWallet()
                } else {
                  login()
                }
              }}
            >
              Connect Another Wallet
            </button>
          </div>
      </div>
    </Modal>
    <div
      className="bg-[#c89116] rounded-md p-2 gap-2 flex items-center cursor-pointer"
      onClick={() => set_is_open(true)}
    >
      <p className="leading-none font-mono">{`${addr.slice(0, 6)}...${addr.slice(38)}`}</p>
    </div>
    <button onClick={() => navigator.clipboard.writeText(addr)}>
      {copied ?
        <ClipboardDocumentCheckIcon
          strokeWidth={2}
          className="w-4 h-4 cursor-pointer"
          onClick={() => {
            set_copied(true)
            toast.success("Copied Wallet Address")
          }}
        /> :
        <ClipboardIcon onClick={() => {
          set_copied(true)
          toast.success("Copied Wallet Address")
        }} strokeWidth="2" className="w-4 h-4 cursor-pointer" />
      }
    </button>
  </div>
}

function USDXDisplay({ addr }: { addr: string }) {
  const { data, isError, isLoading } = useReadContract({
    abi: usdx_abi,
    address: USDX_ADDR,
    functionName: "balanceOf",
    args: [addr]
  })

  if (isError || isLoading || !data) {
    return <p><b>USDX:</b> <span className="font-mono">$0</span></p>
  }

  return <p><b>USDX:</b> <span className="font-mono">{formatCurrency((data as bigint) / 1000000n)}</span></p>
}
