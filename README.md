# 핀인포 (FinInfo)
> 청년·직장인 금융 & 지원금 정보 사이트

Next.js 14 + Cloudflare Pages로 구축된 정적 사이트입니다.

---

## 📁 프로젝트 구조

```
fininfo/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # 전체 레이아웃 (Header + Footer)
│   │   ├── globals.css             # 전역 스타일
│   │   ├── page.tsx                # 메인 홈페이지
│   │   ├── page.module.css
│   │   ├── posts/
│   │   │   ├── page.tsx            # 글 목록 페이지
│   │   │   ├── page.module.css
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # 글 상세 페이지
│   │   │       └── page.module.css
│   │   └── privacy/
│   │       ├── page.tsx            # 개인정보처리방침 (애드센스 필수)
│   │       └── page.module.css
│   ├── components/
│   │   ├── Header.tsx              # 상단 내비게이션
│   │   ├── Header.module.css
│   │   ├── Footer.tsx              # 하단 푸터
│   │   ├── Footer.module.css
│   │   ├── PostCard.tsx            # 글 카드 컴포넌트
│   │   └── PostCard.module.css
│   └── data/
│       └── posts.ts                # 모든 글 데이터 (여기에 글 추가)
├── next.config.js                  # Cloudflare Pages용 정적 내보내기 설정
├── package.json
└── tsconfig.json
```

---

## 🚀 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:3000
```

---

## ✍️ 글 추가하는 방법

`src/data/posts.ts` 파일을 열고 `posts` 배열에 아래 형식으로 추가하면 됩니다.

```typescript
{
  slug: "unique-slug-here",          // URL에 사용됨 (영문, 하이픈만)
  title: "글 제목",
  description: "글 요약 (카드에 표시됨)",
  category: "청년지원",               // 청년지원 | 세금절약 | 부동산 | 보험 | 재테크 | 노후준비
  date: "2026-04-10",
  readTime: "5분",
  content: `
## 소제목

본문 내용을 마크다운으로 작성하세요.

- 리스트 항목
- **굵은 글씨**

| 헤더1 | 헤더2 |
|-------|-------|
| 내용  | 내용  |
  `
}
```

---

## ☁️ Cloudflare Pages 배포 방법

### 1단계: GitHub에 코드 올리기
```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/본인계정/fininfo.git
git push -u origin main
```

### 2단계: Cloudflare Pages 연결
1. [Cloudflare Dashboard](https://dash.cloudflare.com) 접속
2. **Pages** → **Create a project** → **Connect to Git**
3. GitHub 저장소 선택
4. 빌드 설정:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. **Save and Deploy** 클릭

### 3단계: 커스텀 도메인 연결 (선택)
- Cloudflare Pages 프로젝트 → **Custom domains** → 도메인 입력

---

## 💰 Google AdSense 적용 방법

글 상세 페이지(`src/app/posts/[slug]/page.tsx`)에 광고 슬롯이 3곳 준비되어 있습니다.

```tsx
{/* 이 부분을 실제 AdSense 코드로 교체 */}
<div className={styles.adBox}>
  <span>광고 영역</span>
</div>
```

애드센스 승인 후 아래처럼 교체하세요:

```tsx
<div className={styles.adBox}>
  <ins className="adsbygoogle"
    style={{ display: 'block' }}
    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
    data-ad-slot="XXXXXXXXXX"
    data-ad-format="auto"
    data-full-width-responsive="true" />
</div>
```

그리고 `src/app/layout.tsx`의 `<head>`에 AdSense 스크립트를 추가하세요.

---

## 📈 애드센스 승인 체크리스트

- [ ] 글 20개 이상 발행
- [ ] 개인정보처리방침 페이지 존재 (`/privacy`)
- [ ] 사이트 운영 1개월 이상
- [ ] 모바일 반응형 확인
- [ ] Google Search Console 등록

---

## 🛠️ 다음 단계 (확장 아이디어)

- `src/data/posts.ts` → Notion API 또는 MDX 파일로 마이그레이션
- 검색 기능 추가 (Fuse.js 사용)
- 뉴스레터 구독 폼 추가 (Mailchimp)
- 조회수 카운터 (Cloudflare KV 활용)
