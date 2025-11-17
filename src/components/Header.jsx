import { useState } from 'react'

function Header({ onSeed, seeding }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
            <span className="text-blue-300 font-bold"></span>
          </div>
          <div>
            <h1 className="text-white text-xl font-semibold tracking-tight">iPad Catalog</h1>
            <p className="text-blue-200/70 text-xs">Browse, filter and compare models</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSeed}
            disabled={seeding}
            className="px-3 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60"
          >
            {seeding ? 'Seeding…' : 'Load Demo Data'}
          </button>
          <button
            onClick={() => setOpen(v => !v)}
            className="px-3 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            About
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 p-4 rounded-xl bg-slate-800/70 border border-white/10 text-blue-100 text-sm leading-relaxed">
          This mini app lets you explore iPad models with search and filters. Select two cards to compare specs side-by-side.
        </div>
      )}
    </header>
  )
}

export default Header
