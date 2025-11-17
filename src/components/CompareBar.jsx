function CompareBar({ selected, onCompare }) {
  const canCompare = selected.length === 2
  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
        <div className="text-blue-200/80 text-sm">
          Selected: <span className="font-semibold text-white">{selected.length}</span> / 2
        </div>
        <button
          onClick={onCompare}
          disabled={!canCompare}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${canCompare ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-white/10 text-blue-200/60'}`}
        >
          Compare
        </button>
      </div>
    </div>
  )
}

export default CompareBar
