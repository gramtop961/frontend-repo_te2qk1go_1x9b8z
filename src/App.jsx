import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import Grid from './components/Grid'
import CompareBar from './components/CompareBar'
import CompareModal from './components/CompareModal'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const [selected, setSelected] = useState([])
  const [compareData, setCompareData] = useState(null)
  const [openCompare, setOpenCompare] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    if (filters.q) params.set('q', filters.q)
    if (filters.chip) params.set('chip', filters.chip)
    if (filters.min_display) params.set('min_display', filters.min_display)
    if (filters.max_display) params.set('max_display', filters.max_display)
    const s = params.toString()
    return s ? `?${s}` : ''
  }, [filters])

  const loadItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/ipads${queryString}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [queryString])

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const has = prev.includes(id)
      if (has) return prev.filter(x => x !== id)
      if (prev.length >= 2) return [prev[1], id]
      return [...prev, id]
    })
  }

  const compare = async () => {
    if (selected.length !== 2) return
    const [a, b] = selected
    try {
      const res = await fetch(`${baseUrl}/api/ipads/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a, b })
      })
      const data = await res.json()
      setCompareData(data)
      setOpenCompare(true)
    } catch (e) {
      console.error(e)
    }
  }

  const seed = async () => {
    setSeeding(true)
    try {
      await fetch(`${baseUrl}/api/ipads/seed`, { method: 'POST' })
      await loadItems()
    } catch (e) {
      console.error(e)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <Header onSeed={seed} seeding={seeding} />

        <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-5">
          <Filters onChange={setFilters} />
        </div>

        {loading ? (
          <div className="text-center text-blue-200/70">Loading models…</div>
        ) : items.length === 0 ? (
          <div className="text-center text-blue-200/70">
            No models found. Try seeding demo data.
            <div className="mt-3">
              <button onClick={seed} disabled={seeding} className="px-3 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60">
                {seeding ? 'Seeding…' : 'Load Demo Data'}
              </button>
            </div>
          </div>
        ) : (
          <Grid items={items} selectedIds={selected} toggleSelect={toggleSelect} />
        )}
      </div>

      <CompareBar selected={selected} onCompare={compare} />
      <CompareModal open={openCompare} onClose={() => setOpenCompare(false)} data={compareData} />
    </div>
  )
}

export default App
