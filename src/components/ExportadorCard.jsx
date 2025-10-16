import React, { useState } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { createDocumentNFT } from '../lib/mimicClient'

export default function ExportadorCard({ tx, setTx }) {
  const [docLink, setDocLink] = useState('')
  const [amount, setAmount] = useState('')
  const { address } = useAccount()
  const { data: signer } = useWalletClient()

  const handleCreate = async () => {
    if (!docLink || !amount) return alert('Completa los campos')
    setTx({ ...tx, status: 'creating' })

    const res = await createDocumentNFT({ signer, docLink, amount })
    setTx({ nftId: res.nftId, docLink: res.docLink, amount: res.amount, status: 'created', owner: res.owner })
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">Exportador (addr1)</h3>
      <input className="w-full p-2 border rounded mb-2" value={docLink} onChange={(e)=>setDocLink(e.target.value)} placeholder="Link del documento"/>
      <input className="w-full p-2 border rounded mb-2" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Monto USDC"/>
      <button onClick={handleCreate} className="w-full bg-blue-600 text-white py-2 rounded">Crear NFT (Firma)</button>
      <div className="mt-3 text-sm text-gray-600">
        <div><b>Estado:</b> {tx.status}</div>
        <div><b>NFT ID:</b> {tx.nftId ?? '-'}</div>
        <div><b>Owner provisional:</b> {tx.owner ?? '-'}</div>
      </div>
    </div>
  )
}
