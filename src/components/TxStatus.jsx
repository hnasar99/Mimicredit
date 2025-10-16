export default function TxStatus({ tx }) {
  return (
    <div className="p-4 rounded bg-white shadow">
      <h4 className="font-semibold mb-2">Resumen de la transacción</h4>
      <p><b>NFT ID:</b> {tx.nftId ?? '-'}</p>
      <p><b>Documento:</b> {tx.docLink ?? '-'}</p>
      <p><b>Monto:</b> {tx.amount ?? '-'}</p>
      <p className="mt-2"><b>Estado:</b> {tx.status}</p>
      <p><b>Propietario actual:</b> {tx.owner ?? '-'}</p>
    </div>
  )
}
