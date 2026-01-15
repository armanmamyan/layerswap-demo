"use client";
import { LayerswapProvider, Swap, LayerSwapSettings } from '@layerswap/widget';
import { getDefaultProviders } from "@layerswap/wallets";

const walletConnect = {
  projectId: "cb7baa2704e14c4a0e73a07f2f132010",
  name: 'Layerswap Example',
  description: 'Layerswap Example',
  url: 'https://layerswap.io/app/',
  icons: ['https://layerswap.io/app/symbol.png']
}

export function LayerswapWidget({ settings }: { settings?: LayerSwapSettings }) {
  const walletProviders = getDefaultProviders({
    walletConnect,
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h1 className="text-2xl font-bold text-white">
        Layerswap Widget App Router Example
      </h1>
      <p className="mb-4 text-center text-gray-400 max-w-lg px-4">
        This example demonstrates the Layerswap widget integration using Next.js App Router. For information on all available widget configurations, please refer to{' '}
        <a
          href="https://docs.layerswap.io/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:no-underline underline"
        >
          our documentation
        </a>.
      </p>
      <div className="w-full max-w-lg mx-auto h-full rounded-xl">
        <LayerswapProvider
          config={{
            settings,
            apiKey: "F80nT0JfHw8BnYnZfFzDQdZaW94l/vU7Eex6ZNQdUXHmUASt/JBf5S47JQoyyMc/wEyFi1HXQmYkX/lEeBmH3A",
            version: 'mainnet',
          }}
          walletProviders={walletProviders}
        >
          <Swap />
        </LayerswapProvider>
      </div>
    </div>
  );
}