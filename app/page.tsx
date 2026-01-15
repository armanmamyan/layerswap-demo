import "@layerswap/widget/index.css";
import { getSettings } from "@layerswap/widget";
import { LayerswapWidget } from "@/src/LayerswapWidget";

export default async function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const settings = apiKey ? await getSettings(apiKey) : undefined;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <LayerswapWidget settings={settings || undefined} />;
    </div>
  );
}
