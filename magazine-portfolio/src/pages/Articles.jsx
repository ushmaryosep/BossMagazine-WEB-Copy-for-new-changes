import { useEffect, useState } from 'react'
import { supabase, supabaseOwn } from '../lib/supabase'
import ArticleCard from '../components/ArticleCard'
import './Articles.css'

const PAGE_SIZE = 9

export default function Articles() {
  const [articles, setArticles]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [activeTag, setActiveTag] = useState('')
  const [page, setPage]           = useState(0)
  const [hasMore, setHasMore]     = useState(true)
  const [allTags, setAllTags]     = useState([])

  // Load all tags from both databases
  useEffect(() => {
    const loadTags = async () => {
      const [{ data: d1 }, { data: d2 }] = await Promise.all([
        supabaseOwn.from('articles').select('category'),
        supabase.from('articles').select('category'),
      ])
      const all = [...(d1 || []), ...(d2 || [])]
      const seen = new Set()
      const cats = all
        .map(a => a.category)
        .filter(Boolean)
        .filter(cat => {
          const key = cat.toLowerCase().trim()
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })
      setAllTags(cats)
    }
    loadTags()
  }, [])

  useEffect(() => {
    setArticles([])
    setPage(0)
    setHasMore(true)
    fetchArticles(0, true)
  }, [search, activeTag])

  const fetchArticles = async (pageNum, reset = false) => {
    setLoading(true)

    // Build query for own Supabase
    let ownQuery = supabaseOwn
      .from('articles')
      .select('id, title, excerpt, cover_image, category, author, published_at, created_at')
      .order('published_at', { ascending: false })

    if (search)    ownQuery = ownQuery.ilike('title', `%${search}%`)
    if (activeTag) ownQuery = ownQuery.eq('category', activeTag)

    // Build query for original Supabase
    let origQuery = supabase
      .from('articles')
      .select('id, title, excerpt, cover_image, category, author, published_at, created_at')
      .order('created_at', { ascending: false })

    if (search)    origQuery = origQuery.ilike('title', `%${search}%`)
    if (activeTag) origQuery = origQuery.eq('category', activeTag)

    // Fetch both in parallel — get more than PAGE_SIZE to allow merging
    const [{ data: ownData }, { data: origData }] = await Promise.all([
      ownQuery,
      origQuery,
    ])

    const own  = (ownData  || []).map(a => ({ ...a, _source: 'own'  }))
    const orig = (origData || []).map(a => ({ ...a, _source: 'orig' }))

    // Merge: yours first, then original — deduplicate by title just in case
    const seen = new Set()
    const merged = [...own, ...orig].filter(a => {
      if (seen.has(a.title)) return false
      seen.add(a.title)
      return true
    })

    // Paginate the merged result
    const start   = pageNum * PAGE_SIZE
    const pageSlice = merged.slice(start, start + PAGE_SIZE)

    setArticles(prev => reset ? pageSlice : [...prev, ...pageSlice])
    setHasMore(pageSlice.length === PAGE_SIZE)
    setLoading(false)
  }

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchArticles(next)
  }

  return (
    <main className="articles-page">
      <div className="articles-page__hero">
        <p className="section-label">Archive</p>
        <h1 className="articles-page__title">All Articles</h1>
        <p className="articles-page__sub">Every story, feature, and interview from Boss Magazine Ph.</p>
      </div>

      <div className="articles-page__controls">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="articles-page__search"
        />

        {allTags.length > 0 && (
          <div className="articles-page__tags">
            <button
              className={`tag-pill ${activeTag === '' ? 'tag-pill--active' : ''}`}
              onClick={() => setActiveTag('')}
            >All</button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-pill ${activeTag === tag ? 'tag-pill--active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >{tag}</button>
            ))}
          </div>
        )}
      </div>

      {loading && articles.length === 0 ? (
        <div className="loading">
          <span className="loading__dot"/>
          <span className="loading__dot"/>
          <span className="loading__dot"/>
        </div>
      ) : articles.length === 0 ? (
        <p className="empty-state">No articles found.</p>
      ) : (
        <div className="articles-page__grid">
          {articles.map(a => <ArticleCard key={`${a._source}-${a.id}`} article={a} />)}
        </div>
      )}

      {hasMore && !loading && (
        <div className="articles-page__more">
          <button className="btn-load-more" onClick={loadMore}>Load More</button>
        </div>
      )}
    </main>
  )
}