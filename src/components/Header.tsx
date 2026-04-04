'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>핀</span>
          <span className={styles.logoText}>인포</span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          <Link href="/posts" className={styles.navLink} onClick={() => setOpen(false)}>전체글</Link>
          <Link href="/posts?cat=청년지원" className={styles.navLink} onClick={() => setOpen(false)}>청년지원</Link>
          <Link href="/posts?cat=세금절약" className={styles.navLink} onClick={() => setOpen(false)}>세금절약</Link>
          <Link href="/posts?cat=부동산" className={styles.navLink} onClick={() => setOpen(false)}>부동산</Link>
          <Link href="/posts?cat=보험" className={styles.navLink} onClick={() => setOpen(false)}>보험</Link>
        </nav>

        <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="메뉴">
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
