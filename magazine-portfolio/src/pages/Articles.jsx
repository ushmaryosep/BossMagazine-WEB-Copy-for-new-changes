import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ArticleCard from '../components/ArticleCard'
import './Articles.css'

const PAGE_SIZE = 9

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    supabase
      .from('articles')
      .select('category')
      .then(({ data }) => {
        if (!data) return
        const cats = [...new Set(data.map(a => a.category).filter(Boolean))]
        setAllTags(cats)
      })
  }, [])

  useEffect(() => {
    setArticles([])
    setPage(0)
    setHasMore(true)
    fetchArticles(0, true)
  }, [search, activeTag])

  const fetchArticles = async (pageNum, reset = false) => {
    setLoading(true)
    let query = supabase
      .from('articles')
      .select('id, title, excerpt, cover_image, category, author, published_at, created_at')
      .order('created_at', { ascending: false })
      .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)

    if (search) query = query.ilike('title', `%${search}%`)
    if (activeTag) query = query.eq('category', activeTag)

    const { data } = await query
    const results = data || []
    setArticles(prev => reset ? results : [...prev, ...results])
    setHasMore(results.length === PAGE_SIZE)
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
        <div className="loading"><span className="loading__dot"/><span className="loading__dot"/><span className="loading__dot"/></div>
      ) : articles.length === 0 ? (
        <p className="empty-state">No articles found.</p>
      ) : (
        <div className="articles-page__grid">
          {articles.map(a => <ArticleCard key={a.id} article={a} />)}
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