import { useState, useEffect } from 'react'

function Filters({ onChange }) {
  const [q, setQ] = useState('')
  const [chip, setChip] = useState('')
  const [minDisplay, setMinDisplay] = useState('')
  const [maxDisplay, setMaxDisplay] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ q, chip: chip || undefined, min_display: minDisplay || undefined, max_display: maxDisplay || undefined })
    }, 250)
    return () => clearTimeout(t)
  }, [q, chip, minDisplay, maxDisplay])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <input
        placeholder="Search name…"
        value={q}
        onChange={e => setQ(e.target.value)}
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-blue-200/50 focus:outline-none"
      />
      <select
        value={chip}
        onChange={e => setChip(e.target.value)}
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none"
      >
        <option value="">Any chip</option>
        {['M4','M3','M2','M1','A15','A14'].map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="number"
        step="0.1"
        placeholder="Min display (in)"
        value={minDisplay}
        onChange={e => setMinDisplay(e.target.value)}
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-blue-200/50 focus:outline-none"
      />
      <input
        type="number"
        step="0.1"
        placeholder="Max display (in)"
        value={maxDisplay}
        onChange={e => setMaxDisplay(e.target.value)}
        className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-blue-200/50 focus:outline-none"
      />
    </div>
  )
}

export default Filters
