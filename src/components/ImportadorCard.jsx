import React, { useState } from 'react'
import { useWalletClient } from 'wagmi'
import { importerPayAndReceive } from '../lib/mimicClient'

export default function ImportadorCard({ tx, setTx }) {
  const [nftInput, setNftInput] = useState('')
  const { data: signer } = useWalletClient()

  const handleBuy = async () => {
    const nftId = nftInput || tx.nftId
    if (!nftId) return alert('No hay NFT a comprar')
    if (tx.status !== 'validated') return alert('NFT no validado todavía')

    setTx({ ...tx, status: 'transferring' })

    const res = await importerPayAndReceive({ signer, nftId, importador: process.env.VITE_IMPORTADOR_ADDRESS || '0xIMPORTADOR_ADDR', validator: tx.owner, amount: tx.amount })

    if (res.success) {
      setTx({ ...tx, status: 'settled', owner: res.newOwner })
    } else {
      setTx({ ...tx, status: 'transfer_failed' })
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">Importador (addr3)</h3>
      <input className="w-full p-2 border rounded mb-2" value={nftInput} onChange={(e)=>setNftInput(e.target.value)} placeholder="NFT ID (opcional)"/>
      <button onClick={handleBuy} className="w-full bg-purple-600 text-white py-2 rounded">Pagar y recibir NFT</button>
      <div className="mt-3 text-sm text-gray-600">
        <div><b>Estado:</b> {tx.status}</div>
        <div><b>Owner:</b> {tx.owner ?? '-'}</div>
      </div>
    </div>
  )
}
