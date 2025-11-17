import { useEffect } from 'react'

function Row({ label, a, b }) {
  const same = a === b
  return (
    <div className="grid grid-cols-3 items-center gap-3 py-2 border-b border-white/10 text-sm">
      <div className="text-blue-200/70">{label}</div>
      <div className={`px-2 py-1 rounded ${same ? 'bg-white/5 text-blue-100' : 'bg-green-500/10 text-green-200'}`}>{String(a ?? '—')}</div>
      <div className={`px-2 py-1 rounded ${same ? 'bg-white/5 text-blue-100' : 'bg-green-500/10 text-green-200'}`}>{String(b ?? '—')}</div>
    </div>
  )
}

function CompareModal({ open, onClose, data }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', onKey)
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open || !data) return null

  const { a, b, scores, recommended } = data

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-slate-900/95 border border-white/10 rounded-2xl w-[min(96vw,900px)] p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h3 className="text-white text-xl font-semibold">Comparison</h3>
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20">Close</button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-blue-200/70">Model</div>
          <div className="text-white font-medium">{a.name}</div>
          <div className="text-white font-medium">{b.name}</div>
        </div>

        <div className="mt-3 space-y-1">
          <Row label="Generation" a={a.generation} b={b.generation} />
          <Row label="Chip" a={a.chip} b={b.chip} />
          <Row label="Display" a={`${a.display_size}"`} b={`${b.display_size}"`} />
          <Row label="Base Price" a={`$${a.base_price}`} b={`$${b.base_price}`} />
          <Row label="Cellular" a={a.cellular ? 'Yes' : 'No'} b={b.cellular ? 'Yes' : 'No'} />
          <Row label="Pencil" a={a.supports_pencil} b={b.supports_pencil} />
          <Row label="Storage Options" a={a.storage_options?.join(', ')} b={b.storage_options?.join(', ')} />
        </div>

        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-blue-100">
          <div className="flex items-center gap-3">
            <div>Scores — A: <span className="font-semibold text-white">{scores.a.toFixed(2)}</span> | B: <span className="font-semibold text-white">{scores.b.toFixed(2)}</span></div>
            <div className="px-2 py-1 rounded bg-blue-500 text-white text-sm">Recommended: {recommended}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareModal
