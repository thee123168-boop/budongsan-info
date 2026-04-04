import styles from './page.module.css'

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>개인정보처리방침</h1>
        <div className={styles.content}>
          <p>핀인포(이하 "본 사이트")는 이용자의 개인정보를 중요하게 생각하며, 개인정보 보호법에 따라 이용자의 개인정보를 보호하고 있습니다.</p>

          <h2>1. 수집하는 개인정보 항목</h2>
          <p>본 사이트는 별도의 회원가입 없이 이용할 수 있으며, 다음과 같은 정보를 자동으로 수집할 수 있습니다.</p>
          <ul>
            <li>방문 기록, IP 주소, 쿠키, 브라우저 정보</li>
            <li>Google Analytics를 통한 방문자 통계 (익명 처리)</li>
          </ul>

          <h2>2. 광고 서비스</h2>
          <p>본 사이트는 Google AdSense를 통해 광고를 게재합니다. Google은 광고 맞춤화를 위해 쿠키를 사용할 수 있습니다. Google의 광고 개인정보 정책은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 개인정보처리방침</a>을 참고하세요.</p>

          <h2>3. 개인정보의 보유 및 이용기간</h2>
          <p>수집된 개인정보는 서비스 제공 목적이 달성되면 지체 없이 파기합니다.</p>

          <h2>4. 쿠키 사용</h2>
          <p>본 사이트는 서비스 개선 및 광고 최적화를 위해 쿠키를 사용합니다. 브라우저 설정에서 쿠키를 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.</p>

          <h2>5. 문의</h2>
          <p>개인정보 관련 문의사항이 있으시면 아래로 연락해 주세요.</p>
          <p>이메일: admin@fininfo.kr</p>

          <p className={styles.updated}>최종 업데이트: 2026년 4월</p>
        </div>
      </div>
    </div>
  )
}
