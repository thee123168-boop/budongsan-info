import { posts, getPostBySlug } from '@/data/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | 핀인포`,
    description: post.description,
  }
}

function renderMarkdown(content: string): string {
  return content
    .trim()
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, (m) => `<ul>${m}</ul>`)
    .replace(/^\| (.+) \|$/gm, (_, row) => {
      const cells = row.split(' | ').map((c: string) => `<td>${c.trim()}</td>`).join('')
      return `<tr>${cells}</tr>`
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, (m) => `<table>${m}</table>`)
    .replace(/^(?!<[hult])(.*\S.*)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = posts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.postHeader}>
        <div className={styles.container}>
          <Link href="/posts" className={styles.back}>← 목록으로</Link>
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.date}>{post.date}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.readTime}>{post.readTime} 읽기</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.desc}>{post.description}</p>
        </div>
      </div>

      {/* ADSENSE PLACEHOLDER - TOP */}
      <div className={styles.adSlot}>
        <div className={styles.container}>
          <div className={styles.adBox}>
            {/* Google AdSense 코드를 여기에 삽입하세요 */}
            <span>광고 영역</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.container}>
        <div className={styles.layout}>
          <article
            className={styles.article}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>같은 카테고리 글</div>
              {related.length > 0 ? related.map(p => (
                <Link key={p.slug} href={`/posts/${p.slug}`} className={styles.sideLink}>
                  <span className={styles.sideLinkCat}>{p.category}</span>
                  <span className={styles.sideLinkTitle}>{p.title}</span>
                </Link>
              )) : (
                <p style={{fontSize:'0.82rem', color:'var(--ink-muted)'}}>관련 글이 없습니다.</p>
              )}
            </div>

            {/* SIDEBAR AD */}
            <div className={styles.adBoxSide}>
              <span>광고 영역</span>
            </div>
          </aside>
        </div>
      </div>

      {/* ADSENSE PLACEHOLDER - BOTTOM */}
      <div className={styles.adSlot}>
        <div className={styles.container}>
          <div className={styles.adBox}>
            <span>광고 영역</span>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className={styles.related}>
          <div className={styles.container}>
            <div className={styles.relatedTitle}>관련 글</div>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <Link key={p.slug} href={`/posts/${p.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedCat}>{p.category}</span>
                  <span className={styles.relatedPostTitle}>{p.title}</span>
                  <span className={styles.relatedArrow}>읽기 →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
