import React, { useState } from 'react'
import { useWalletClient } from 'wagmi'
import { validatorApproveAndFund } from '../lib/mimicClient'

export default function ValidadorCard({ tx, setTx }) {
  const [nftInput, setNftInput] = useState('')
  const { data: signer } = useWalletClient()

  const handleValidate = async () => {
    const nftId = nftInput || tx.nftId
    if (!nftId) return alert('No hay NFT para validar')
    setTx({ ...tx, status: 'validating' })

    const res = await validatorApproveAndFund({ signer, nftId, amount: tx.amount, exportador: process.env.VITE_EXPORTADOR_ADDRESS || '0xEXPORTADOR_ADDR', validator: process.env.VITE_VALIDATOR_ADDRESS || '0xVALIDADOR_ADDR' })

    if (res.success) {
      setTx({ ...tx, status: 'validated', owner: res.newOwner })
    } else {
      setTx({ ...tx, status: 'validation_failed' })
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-2">Validador (addr2)</h3>
      <input className="w-full p-2 border rounded mb-2" value={nftInput} onChange={(e)=>setNftInput(e.target.value)} placeholder="NFT ID (opcional)"/>
      <button onClick={handleValidate} className="w-full bg-green-600 text-white py-2 rounded">Validar y Fondear</button>
      <div className="mt-3 text-sm text-gray-600">
        <div><b>Estado:</b> {tx.status}</div>
        <div><b>Owner:</b> {tx.owner ?? '-'}</div>
      </div>
    </div>
  )
}
