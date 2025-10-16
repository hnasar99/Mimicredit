import React from 'react'
import ExportadorCard from './ExportadorCard'
import ValidadorCard from './ValidadorCard'
import ImportadorCard from './ImportadorCard'

export default function RolesPanel({ tx, setTx }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ExportadorCard tx={tx} setTx={setTx} />
      <ValidadorCard tx={tx} setTx={setTx} />
      <ImportadorCard tx={tx} setTx={setTx} />
    </div>
  )
}
