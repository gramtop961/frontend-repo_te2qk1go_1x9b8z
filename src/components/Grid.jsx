import { useMemo } from 'react'

function Card({ item, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`group relative rounded-2xl overflow-hidden border transition-all ${selected ? 'border-blue-400/70 ring-2 ring-blue-400/40' : 'border-white/10 hover:border-white/20'}`}
    >
      <div className="aspect-[4/3] bg-slate-900/60 flex items-center justify-center">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="max-h-full object-contain" />
        ) : (
          <div className="text-blue-200/60">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold leading-tight">{item.name}</h3>
          <span className="text-blue-200/80 text-sm">${item.base_price}</span>
        </div>
        <p className="text-blue-200/70 text-xs mt-1">{item.generation}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-blue-200/80">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{item.chip}</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{item.display_size}"</span>
          {item.cellular && <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Cellular</span>}
        </div>
      </div>
      <div className={`absolute top-3 left-3 rounded-full w-6 h-6 border ${selected ? 'bg-blue-500 border-blue-400' : 'bg-black/40 border-white/40'} transition-colors`}></div>
    </button>
  )
}

function Grid({ items, selectedIds, toggleSelect }) {
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => a.base_price - b.base_price)
  }, [items])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {sorted.map(it => (
        <Card
          key={it.id}
          item={it}
          selected={selectedIds.includes(it.id)}
          onSelect={() => toggleSelect(it.id)}
        />)
      )}
    </div>
  )}

export default Grid
