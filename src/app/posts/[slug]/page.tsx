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

            {/* 재테크 계산기 사이드바 링크 */}
            <div style={{
              marginTop: '16px',
              padding: '20px 16px',
              background: '#ebf4ff',
              borderRadius: '12px',
              border: '1px solid #bee3f8',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e40af', marginBottom: '8px' }}>
                🧮 직접 계산해보세요
              </p>
              <p style={{ fontSize: '12px', color: '#4a5568', marginBottom: '12px', lineHeight: '1.5' }}>
                연봉 실수령액, 퇴직금, 적금 만기금액을 계산기로 바로 확인하세요.
              </p>
              <a
                href="https://reteck-calculator.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: '#2563eb',
                  color: 'white',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                재테크 계산기 →
              </a>
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

      {/* ── 재테크 계산기 본문 하단 배너 ── */}
      <div style={{ padding: '0 16px', marginBottom: '8px' }}>
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '24px',
          background: '#ebf4ff',
          borderRadius: '12px',
          border: '1px solid #bee3f8',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#1e40af', marginBottom: '8px' }}>
            🧮 읽은 내용을 직접 계산해보고 싶으신가요?
          </p>
          <p style={{ fontSize: '13px', color: '#4a5568', marginBottom: '16px' }}>
            연봉 실수령액 · 퇴직금 · 적금 · 대출 이자를 한 번에 계산할 수 있어요.
          </p>
          <a
            href="https://reteck-calculator.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#2563eb',
              color: 'white',
              padding: '11px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '15px'
            }}
          >
            🧮 재테크 계산기 바로가기 →
          </a>
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
