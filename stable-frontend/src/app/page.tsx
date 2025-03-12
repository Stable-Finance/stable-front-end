/* eslint-disable @next/next/no-img-element */
"use client"

// #ffd577 c89116 f9da79 b79132 e6e6e6

import LoginButton from "@/components/LoginButton";
import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { XCircleIcon } from '@heroicons/react/24/outline'
import { InputNumber, Modal } from "antd";
import { Suspense, useEffect, useState } from "react";
import { createWalletClient, custom, Hex, WalletClient } from "viem";
import { monadTestnet } from "wagmi/chains";

import nft_abi from "@/nft_abi.json"
import usdx_abi from "@/usdx_abi.json"
import { NFT_ADDR, USDX_ADDR } from "@/constants";
import { get_properties } from "@/utils";
import { useReadContract, useReadContracts } from "wagmi";
import { readContract } from "wagmi/actions";

export default function Home() {
  const { user } = usePrivy();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#e6e6e6] ">
      <div className="text-black border-4 rounded-xl border-[#c89116] max-w-xl w-full p-4 flex flex-col gap-4">
        <div className="flex items-center">
          <h2 className="font-extrabold text-2xl">Stable Protocol</h2>
          <div className="ml-auto">{
            user ?
              <LoggedInUser /> :
              <LoginButton />
          }</div>
        </div>
        <WithWallet />
      </div>
    </div>
  );
}

function WithWallet() {
  const { wallets } = useWallets()
  
  if (wallets.length == 0) {
    return <div className="flex flex-row items-center justify-center py-4">
      <p className="">You Must be Logged In</p>
    </div>
  }

  return <WithViemClient wallet={wallets[0]} user_addr={wallets[0].address} />
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

  console.log(data, user_addr)

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
      nft_id={0n}
      uri={r}
      user_addr={user_addr}
      viemClient={viemClient}
      key={idx}
    />)}
  </div>
}

function PropertyManager({ viemClient, user_addr, latest_hash, nft_id, uri }: { viemClient: WalletClient, user_addr: string, latest_hash: string, uri: string, nft_id: bigint }) {
  const [is_open, set_is_open] = useState(false)
  const b64data = uri.split(",")[1]
  const decoded = atob(b64data)
  const jsonData = JSON.parse(decoded)
  const attrs = jsonData.attributes
  
  console.log(jsonData)
  return <>
    <Modal footer={null} title={jsonData.name} open={is_open} onOk={() => set_is_open(false)} onCancel={() => set_is_open(false)}>
      <div className="flex flex-col gap-2">
        <p>Property Value: {attrs[0].value}</p>
        <p>Liens: {attrs[1].value}</p>
        <div className="flex w-full gap-2">
          <BorrowModal jsonData={jsonData}/>
          <button className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer w-full">
            Make Payment
          </button>
          <button className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer w-full">
            Repay
          </button>
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

function BorrowModal({ jsonData }: {jsonData: any}) {
  const [is_open, set_is_open] = useState(false)
  const value = BigInt(jsonData.attributes[0].value)
  const liens = BigInt(jsonData.attributes[1].value)
  const debt = BigInt(jsonData.attributes[2].value)
  const max_ltv = BigInt(jsonData.attributes[3].value)

  let max_borrow: bigint | string = 0n
  if (value > liens) {
    const borrowable = (value - liens) * max_ltv / 1_000_000_000n;
    if (debt < borrowable) {
      max_borrow = borrowable - debt;
    } else {
      max_borrow = "There is too much debt on the property"
    }
  } else {
    max_borrow = "There are too many liens on the property"
  }

  return <>
    <button
      className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer w-full"
      onClick={() => set_is_open(true)}
    >
      Borrow
    </button>
    <Modal footer={null} title={"Borrow From " + jsonData.name} open={is_open} onOk={() => set_is_open(false)} onCancel={() => set_is_open(false)}>
      {typeof max_borrow === "bigint" ? <>
        <p>You can borrow up to: {max_borrow}</p>
      </> : <>
      </>}
    </Modal>
  </>
}

function MintSection({ viemClient, user_addr, on_trx }: { viemClient: WalletClient, user_addr: string, on_trx: (hash: string) => void }) {
  const [value, setValue] = useState("1000000")
  const [ltv, setLtv] = useState("800000000")
  const [lien, setLien] = useState("0")

  return <div className="flex flex-col gap-4">
    <p className="font-bold">Deposit Property</p>
    <div className="flex gap-4 items-center">
      <p className="">Property Value</p>
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
    </div>
    <div className="flex gap-4 items-center">
      <p className="">Max LTV</p>
      <select value={ltv} onChange={e => setLtv(e.target.value)} className="border border-gray-300 p-1 rounded-sm bg-white">
        <option value={"800000000"}>Residential - 80%</option>
        <option value={"650000000"}>Agricultural - 65%</option>
        <option value={"600000000"}>Commerial - 60%</option>
        <option value={"500000000"}>Industrial - 50%</option>
      </select>
    </div>
    <div className="flex gap-4 items-center">
      <p className="">Lien</p>
      <select value={lien} onChange={e => setLien(e.target.value)} className="border border-gray-300 p-1 rounded-sm bg-white">
        <option value={"0"}>None - 0%</option>
        <option value={"10"}>Low - 10%</option>
        <option value={"30"}>Medium - 30%</option>
        <option value={"60"}>High - 60%</option>
      </select>
    </div>
    <button
      onClick={async () => {
        const propertyValue = BigInt(value + "000000");
        const trx_hash = await viemClient.writeContract({
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
        })
        on_trx(trx_hash)
      }}
      className="bg-[#c89116] rounded-md py-1 font-bold cursor-pointer"
    >
      Deposit & Borrow
    </button>
  </div>
}

function LoggedInUser() {
  const { user, logout } = usePrivy();
  const email = user?.email?.address
  const wallet = user?.wallet?.address
  if (!wallet) {
    return <p>Error!</p>
  }

  return <div className="flex gap-2 items-center">
    <USDXDisplay addr={wallet} />
    <div className="bg-[#c89116] rounded-md p-2 gap-2 flex">
      <p className="font-bold">{wallet ? `${wallet.slice(0, 6)}...${wallet.slice(38)}` : ""}</p>
      <button onClick={() => logout()}><XCircleIcon className="w-6 h-6 cursor-pointer" /></button>
    </div>
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
    return <></>
  }

  return <p><b>USDX:</b> ${(data as bigint) / 1000000n}</p>
}