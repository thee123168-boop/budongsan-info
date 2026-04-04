import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.name}>핀인포</span>
          <p className={styles.desc}>청년·직장인을 위한 금융 & 지원금 정보</p>
        </div>
        <div className={styles.links}>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/about">소개</a>
        </div>
        <p className={styles.copy}>
          © 2026 핀인포. 본 사이트의 정보는 참고용이며 실제 신청 전 공식 기관을 통해 확인하시기 바랍니다.
        </p>
      </div>
    </footer>
  )
}
