'use client';
import '@layerswap/widget/index.css';
import { LayerswapProvider, Swap } from '@layerswap/widget';
import { getDefaultProviders } from '@layerswap/wallets';
import Image from "next/image";


const walletProviders = getDefaultProviders({
    walletConnect: {
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
      name: "Your App Name",
      description: "Your app description",
      url: "https://yourapp.com",
      icons: ["https://yourapp.com/icon.png"]
    },
  })

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <LayerswapProvider
      config={{
        apiKey: process.env.NEXT_PUBLIC_LAYERSWAP_API_KEY!,
        version: 'mainnet', //'mainnet' or 'testnet'
      }}
      walletProviders={walletProviders}
    >
      <Swap />
    </LayerswapProvider>
    </div>
  );
}
