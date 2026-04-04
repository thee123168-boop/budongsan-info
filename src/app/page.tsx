import Link from 'next/link'
import { posts, categories } from '@/data/posts'
import PostCard from '@/components/PostCard'
import styles from './page.module.css'

export default function Home() {
  const featured = posts.slice(0, 3)
  const rest = posts.slice(3, 7)

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTag}>청년·직장인 금융 가이드</div>
          <h1 className={styles.heroTitle}>
            복잡한 금융 정보,<br />
            <em>쉽게 정리해드립니다</em>
          </h1>
          <p className={styles.heroSub}>
            청년도약계좌, 연말정산 환급, 전세자금대출까지.<br />
            모르면 손해인 금융 정보를 누구나 이해할 수 있게 씁니다.
          </p>
          <div className={styles.heroActions}>
            <Link href="/posts" className={styles.btnPrimary}>전체 글 보기</Link>
            <Link href="/posts?cat=청년지원" className={styles.btnSecondary}>청년 지원금 →</Link>
          </div>
        </div>
        <div className={styles.heroBadges}>
          {categories.map(cat => (
            <Link key={cat} href={`/posts?cat=${cat}`} className={styles.heroBadge}>{cat}</Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionLabel}>추천 글</span>
            <Link href="/posts" className={styles.sectionMore}>전체 보기 →</Link>
          </div>
          <div className={styles.featuredGrid}>
            {featured.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* NOTICE BANNER */}
      <div className={styles.banner}>
        <div className={styles.container}>
          <span className={styles.bannerIcon}>💡</span>
          <p>정부지원금은 신청한 사람만 받습니다. 자격이 되는데 모르고 지나치지 마세요.</p>
          <Link href="/posts?cat=정부지원" className={styles.bannerLink}>확인하기 →</Link>
        </div>
      </div>

      {/* MORE POSTS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionLabel}>최신 글</span>
          </div>
          <div className={styles.moreGrid}>
            {rest.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/posts" className={styles.btnPrimary}>글 전체 보기</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
