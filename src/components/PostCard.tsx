import Link from 'next/link'
import type { Post } from '@/data/posts'
import styles from './PostCard.module.css'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.category}>{post.category}</span>
        <span className={styles.readTime}>{post.readTime} 읽기</span>
      </div>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.desc}>{post.description}</p>
      <div className={styles.bottom}>
        <span className={styles.date}>{post.date}</span>
        <span className={styles.arrow}>읽기 →</span>
      </div>
    </Link>
  )
}
