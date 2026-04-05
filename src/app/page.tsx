import Link from 'next/link'
import { posts } from '@/data/posts'
import styles from './page.module.css'

export default function Home() {
  const featured = posts.slice(0, 3)
  const latest = posts.slice(0, 5)

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            부동산, <em>쉽게 이해하세요</em>
          </h1>
          <p className={styles.heroDesc}>
            청약 가점 계산, 취득세 계산, 전월세 전환까지.<br />
            복잡한 부동산 정보를 누구나 이해할 수 있게 정리합니다.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/calculator" className={styles.heroBtnPrimary}>🏠 계산기 바로가기</Link>
            <Link href="/posts" className={styles.heroBtnSecondary}>전체 글 보기 →</Link>
          </div>
        </div>
      </section>

      {/* 계산기 빠른 링크 */}
      <section className={styles.calcQuick}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>⚡ 자주 쓰는 계산기</h2>
          <div className={styles.calcGrid}>
            {[
              { icon: '🔄', label: '전월세 전환', href: '/calculator#jeonse' },
              { icon: '🏛️', label: '취득세 계산', href: '/calculator#tax' },
              { icon: '🎫', label: '청약 가점', href: '/calculator#chungyak' },
              { icon: '💳', label: '대출 한도', href: '/calculator#loan' },
              { icon: '📈', label: '수익률 계산', href: '/calculator#yield' },
              { icon: '📋', label: '등기비용', href: '/calculator#register' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className={styles.calcItem}>
                <span className={styles.calcIcon}>{item.icon}</span>
                <span className={styles.calcLabel}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 글 */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>추천 글</h2>
          <div className={styles.postGrid}>
            {featured.map(post => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className={styles.postCard}>
                <span className={styles.postCat}>{post.category}</span>
                <span className={styles.postTitle}>{post.title}</span>
                <span className={styles.postDesc}>{post.description}</span>
                <span className={styles.postMeta}>{post.date} · {post.readTime} 읽기</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 글 */}
      <section className={styles.latest}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>최신 글</h2>
          {latest.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className={styles.latestCard}>
              <div>
                <span className={styles.latestCat}>{post.category}</span>
                <span className={styles.latestTitle}>{post.title}</span>
              </div>
              <span className={styles.latestArrow}>→</span>
            </Link>
          ))}
          <Link href="/posts" className={styles.viewAll}>글 전체 보기</Link>
        </div>
      </section>

      {/* 전세사기 주의 배너 */}
      <section className={styles.warningBanner}>
        <div className={styles.container}>
          <p>⚠️ 전세 계약 전, 등기부등본과 전세보증보험을 꼭 확인하세요.</p>
          <Link href="/posts/jeonse-fraud-prevention">전세사기 예방 가이드 →</Link>
        </div>
      </section>
    </div>
  )
}
