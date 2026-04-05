'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { posts, categories } from '@/data/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import styles from './page.module.css'

function PostsContent() {
  const searchParams = useSearchParams()
  const cat = searchParams.get('cat')

  const filtered = cat ? posts.filter(p => p.category === cat) : posts

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{cat ? cat : '전체 글'}</h1>
          <p className={styles.sub}>{filtered.length}개의 글</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Category filter */}
        <div className={styles.filters}>
          <Link href="/posts" className={`${styles.filterBtn} ${!cat ? styles.active : ''}`}>
            전체
          </Link>
          {categories.map(c => (
            <Link
              key={c}
              href={`/posts?cat=${c}`}
              className={`${styles.filterBtn} ${cat === c ? styles.active : ''}`}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PostsPage() {
  return (
    <Suspense fallback={<div style={{padding:'80px 24px', textAlign:'center'}}>로딩 중...</div>}>
      <PostsContent />
    </Suspense>
  )
}