import { useEffect, useState } from 'react'
import { supabase, supabaseOwn } from './supabase'
import staticMagazines from '../data/magazines'

const ARTICLE_COLS = 'id, title, excerpt, cover_image, category, author, published_at, created_at'

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december']

// Best-effort timestamp: created_at → issue_date → published_at text → "November 2026"
export function toTime(item) {
  for (const v of [item?.created_at, item?.issue_date, item?.published_at]) {
    const t = v ? Date.parse(v) : NaN
    if (!Number.isNaN(t)) return t
  }
  const m = String(item?.date || item?.published_at || '').toLowerCase().match(/([a-z]+)\s+(\d{4})/)
  if (m && MONTHS.includes(m[1])) return new Date(Number(m[2]), MONTHS.indexOf(m[1]), 1).getTime()
  return 0
}

// Newest first; same timestamp → higher id first
export const newestFirst = (a, b) => (toTime(b) - toTime(a)) || ((Number(b.id) || 0) - (Number(a.id) || 0))

export const isFeatureStory = a => /feature\s*story/i.test(a?.category || '')

function dedupe(list, key = 'title') {
  const seen = new Set()
  return list.filter(x => {
    const k = String(x[key] || '').toLowerCase().trim()
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// ─── Articles ────────────────────────────────────────────────────────────────
async function queryBoth(build) {
  const [own, orig] = await Promise.all([build(supabaseOwn), build(supabase)])
  return dedupe([
    ...(own.data || []).map(a => ({ ...a, _source: 'own' })),
    ...(orig.data || []).map(a => ({ ...a, _source: 'orig' })),
  ]).sort(newestFirst)
}

export function fetchLatestArticles(limit = 8) {
  return queryBoth(db =>
    db.from('articles').select(ARTICLE_COLS).order('created_at', { ascending: false }).order('id', { ascending: false }).limit(limit)
  ).then(list => list.slice(0, limit))
}

export function fetchLatestFeatureStory() {
  return queryBoth(db =>
    db.from('articles').select(ARTICLE_COLS)
      .ilike('category', '%feature story%')
      .order('created_at', { ascending: false }).order('id', { ascending: false }).limit(1)
  ).then(list => list[0] || null)
}

// ─── Magazines ───────────────────────────────────────────────────────────────
function normalizeMagazine(m) {
  let pages = m.pages
  if (typeof pages === 'string') {
    try { pages = JSON.parse(pages) } catch { pages = pages.split(',').map(s => s.trim()) }
  }
  pages = Array.isArray(pages) ? pages.filter(Boolean) : []
  const cover = m.cover_image || pages[0] || null
  if (cover && pages[0] !== cover) pages = [cover, ...pages]
  return {
    ...m,
    id: `db-${m.id}`,
    issue: m.issue || '',
    date: m.date || m.title,
    cover_image: cover,
    pages,
  }
}

export async function fetchMagazines() {
  const { data, error } = await supabaseOwn
    .from('magazines')
    .select('*')
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })

  const fromDb = error ? [] : (data || []).map(normalizeMagazine)
  // Supabase issues win over static ones with the same title
  return dedupe([...fromDb, ...staticMagazines]).sort(newestFirst)
}

// ─── Hooks (auto-refresh when Supabase rows change) ──────────────────────────
function useLiveData(loader, tables, initial) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const key = tables.join('-')

  useEffect(() => {
    let alive = true
    const load = () =>
      loader()
        .then(d => { if (alive) { setData(d); setLoading(false) } })
        .catch(() => { if (alive) setLoading(false) })

    load()
    const channel = supabaseOwn.channel(`live-${key}-${Math.random().toString(36).slice(2)}`)
    key.split('-').forEach(table =>
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, load)
    )
    channel.subscribe()
    window.addEventListener('focus', load)
    return () => {
      alive = false
      supabaseOwn.removeChannel(channel)
      window.removeEventListener('focus', load)
    }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return [data, loading]
}

export function useMagazines() {
  return useLiveData(fetchMagazines, ['magazines'], staticMagazines)
}

export function useHomeArticles(limit = 8) {
  return useLiveData(
    async () => {
      const [latest, feature] = await Promise.all([fetchLatestArticles(limit + 1), fetchLatestFeatureStory()])
      const rest = latest.filter(a => !feature || a.id !== feature.id || a._source !== feature._source)
      return { feature, latest: rest.slice(0, limit) }
    },
    ['articles'],
    { feature: null, latest: [] }
  )
}