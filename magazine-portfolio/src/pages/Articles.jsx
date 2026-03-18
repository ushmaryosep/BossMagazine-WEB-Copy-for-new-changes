import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import ArticleCard from '../components/ArticleCard'
import './Articles.css'

const PAGE_SIZE = 9

export default function Articles() {
  const [articles, setArticles]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]     = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [search, setSearch]       = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [page, setPage]           = useState(0)
  const [hasMore, setHasMore]     = useState(true)

  // Fetch distinct categories once
  useEffect(() => {
    supabase
      .from('articles')
      .select('category')
      .then(({ data }) => {
        if (!data) return
        const cats = [...new Set(data.map(a => a.category).filter(Boolean))].sort()
        setCategories(cats)
      })
  }, [])

  // Re-fetch from scratch when filters change
  const fetchArticles = useCallback(async (pageNum, reset = false) => {
    if (reset) setLoading(true)
    else setLoadingMore(true)

    let query = supabase
      .from('articles')
      .select('id, title, excerpt, cover_image, category, author, published_at')
      .order('published_at', { ascending: false })
      .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)

    if (search.trim())   query = query.ilike('title', `%${search.trim()}%`)
    if (activeCategory)  query = query.eq('category', activeCategory)

    const { data } = await query
    const results = data || []

    setArticles(prev => reset ? results : [...prev, ...results])
    setHasMore(results.length === PAGE_SIZE)
    setLoading(false)
    setLoadingMore(false)
  }, [search, activeCategory])

  useEffect(() => {
    setPage(0)
    setHasMore(true)
    fetchArticles(0, true)
  }, [fetchArticles])

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchArticles(next, false)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleCategory = (cat) => {
    setActiveCategory(prev => prev === cat ? '' : cat)
  }

  return (
    <main className="articles-page">

      {/* Hero */}
      <div className="articles-page__hero">
        <span className="section-label">Archive</span>
        <h1 className="articles-page__title">All Articles</h1>
        <p className="articles-page__sub">
          Every story, feature, and interview from Boss Magazine Ph.
        </p>
      </div>

      {/* Controls */}
      <div className="articles-page__controls">
        <div className="articles-page__search-wrap">
          <span className="articles-page__search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={handleSearch}
            className="articles-page__search"
          />
          {search && (
            <button
              className="articles-page__search-clear"
              onClick={() => setSearch('')}
            >✕</button>
          )}
        </div>

        {categories.length > 0 && (
          <div className="articles-page__filters">
            <button
              className={`filter-pill ${activeCategory === '' ? 'filter-pill--active' : ''}`}
              onClick={() => setActiveCategory('')}
            >All</button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'filter-pill--active' : ''}`}
                onClick={() => handleCategory(cat)}
              >{cat}</button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      {!loading && (
        <div className="articles-page__count">
          {articles.length} article{articles.length !== 1 ? 's' : ''}
          {activeCategory ? ` in "${activeCategory}"` : ''}
          {search ? ` matching "${search}"` : ''}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="loading">
          <span className="loading__dot"/><span className="loading__dot"/><span className="loading__dot"/>
        </div>
      ) : articles.length === 0 ? (
        <p className="empty-state">No articles found. Try a different search or category.</p>
      ) : (
        <div className="articles-page__grid">
          {articles.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}

      {/* Load more */}
      {!loading && hasMore && (
        <div className="articles-page__more">
          <button
            className="btn-outline"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

    </main>
  )
}
