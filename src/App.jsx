import React, { useState } from 'react'
import RolesPanel from './components/RolesPanel'
import TxStatus from './components/TxStatus'
import { WagmiConfig, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { optimismGoerli, polygonMumbai } from 'wagmi/chains'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { connectors } = getDefaultWallets({ 
  appName: 'MimicHackaton', 
  projectId: 'dc4a670ce6c4c009cdbb5cb1f712f7cd', // Demo project ID
  chains: [optimismGoerli]
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicProvider(),
})

export default function AppWrapper() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={[polygonMumbai]}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

function App() {
  const [tx, setTx] = useState({ nftId: null, docLink: null, amount: null, status: 'idle', owner: null })
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-center text-3xl font-bold mb-6">ZonaFranca — Mimic Demo (Vite)</h1>
      <RolesPanel tx={tx} setTx={setTx} />
      <div className="mt-8 max-w-3xl mx-auto">
        <TxStatus tx={tx} />
      </div>
    </div>
  )
}
