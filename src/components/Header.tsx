import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>🏠 부동산 인포</Link>
        <nav className={styles.nav}>
          <Link href="/posts" className={styles.navLink}>전체글</Link>
          <Link href="/posts?cat=청약" className={styles.navLink}>청약</Link>
          <Link href="/posts?cat=전월세" className={styles.navLink}>전월세</Link>
          <Link href="/posts?cat=매매" className={styles.navLink}>매매</Link>
          <Link href="/calculator" className={styles.navLink}>계산기</Link>
        </nav>
      </div>
    </header>
  )
}
