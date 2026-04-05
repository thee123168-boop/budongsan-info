'use client'
import { useState } from 'react'
import styles from './page.module.css'

const fmt = (n: number) => Math.round(n).toLocaleString('ko-KR')

// ────────────────────────────────
// 1. 전월세 전환율 계산기
// ────────────────────────────────
function JeonseConverter() {
  const [mode, setMode] = useState<'toMonthly' | 'toJeonse'>('toMonthly')
  const [jeonse, setJeonse] = useState('')
  const [monthly, setMonthly] = useState('')
  const [deposit, setDeposit] = useState('')
  const [rate, setRate] = useState('6')

  const calc = (): { monthlyRent: number; yearlyCost: number } | { jeonseVal: number } | null => {
    const r = parseFloat(rate) / 100
    if (mode === 'toMonthly') {
      const j = parseFloat(jeonse.replace(/,/g, '')) * 10000
      const d = parseFloat(deposit.replace(/,/g, '')) * 10000 || 0
      if (!j) return null
      const monthlyRent = ((j - d) * r) / 12
      return { monthlyRent, yearlyCost: monthlyRent * 12 }
    } else {
      const m = parseFloat(monthly.replace(/,/g, ''))
      const d = parseFloat(deposit.replace(/,/g, '')) * 10000 || 0
      if (!m) return null
      const jeonseVal = (m * 12) / r + d
      return { jeonseVal }
    }
  }

  const result = calc()

  return (
    <div className={styles.calcCard}>
      <h2>🔄 전월세 전환 계산기</h2>
      <p className={styles.desc}>전세를 월세로, 월세를 전세로 쉽게 변환해드려요.</p>
      <div className={styles.inputGroup}>
        <label>변환 방향</label>
        <select value={mode} onChange={e => setMode(e.target.value as 'toMonthly' | 'toJeonse')}>
          <option value="toMonthly">전세 → 월세 변환</option>
          <option value="toJeonse">월세 → 전세 변환</option>
        </select>
      </div>
      {mode === 'toMonthly' ? (
        <div className={styles.inputGroup}>
          <label>전세 보증금 (만원)</label>
          <input type="text" placeholder="예: 30000" value={jeonse}
            onChange={e => setJeonse(e.target.value.replace(/[^0-9]/g, ''))} />
        </div>
      ) : (
        <div className={styles.inputGroup}>
          <label>월세 (원)</label>
          <input type="text" placeholder="예: 80만원이면 800000" value={monthly}
            onChange={e => setMonthly(e.target.value.replace(/[^0-9]/g, ''))} />
        </div>
      )}
      <div className={styles.inputGroup}>
        <label>보증금 (만원)</label>
        <input type="text" placeholder="예: 1000" value={deposit}
          onChange={e => setDeposit(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className={styles.inputGroup}>
        <label>전월세 전환율 (%)</label>
        <input type="text" placeholder="예: 6" value={rate}
          onChange={e => setRate(e.target.value)} />
      </div>
      {result && (
        <>
          <div className={styles.resultBox}>
            {'monthlyRent' in result ? (
              <>
                <div className={styles.resultLabel}>월세</div>
                <div className={styles.resultValue}>{fmt(result.monthlyRent)}원/월</div>
                <div className={styles.resultSub}>연간 임대료: {fmt(result.yearlyCost)}원</div>
              </>
            ) : (
              <>
                <div className={styles.resultLabel}>전세 환산금액</div>
                <div className={styles.resultValue}>{fmt(result.jeonseVal / 10000)}만원</div>
              </>
            )}
          </div>
          <div className={styles.resultNote}>
            💡 법정 전월세 전환율은 연 6% (2024년 기준). 실제 계약 시 확인하세요.
          </div>
        </>
      )}
    </div>
  )
}

// ────────────────────────────────
// 2. 취득세 계산기
// ────────────────────────────────
function AcquisitionTaxCalc() {
  const [price, setPrice] = useState('')
  const [houseCount, setHouseCount] = useState('0')

  const calc = () => {
    const p = parseFloat(price.replace(/,/g, '')) * 10000
    if (!p) return null
    let rate = 0
    const count = parseInt(houseCount)
    if (count === 0) {
      if (p <= 60000 * 10000) rate = 0.01
      else if (p <= 90000 * 10000) rate = 0.02
      else rate = 0.03
    } else if (count === 1) {
      rate = 0.08
    } else {
      rate = 0.12
    }
    const acquisitionTax = p * rate
    const localTax = acquisitionTax * 0.1
    const educationTax = acquisitionTax * 0.2
    const total = acquisitionTax + localTax + educationTax
    return { rate: rate * 100, acquisitionTax, localTax, educationTax, total }
  }

  const result = calc()

  return (
    <div className={styles.calcCard}>
      <h2>🏛️ 취득세 계산기</h2>
      <p className={styles.desc}>주택 매매 시 납부해야 할 취득세를 미리 계산해보세요.</p>
      <div className={styles.inputGroup}>
        <label>매매가 (만원)</label>
        <input type="text" placeholder="예: 50000" value={price}
          onChange={e => setPrice(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className={styles.inputGroup}>
        <label>현재 보유 주택 수</label>
        <select value={houseCount} onChange={e => setHouseCount(e.target.value)}>
          <option value="0">무주택 (첫 구매)</option>
          <option value="1">1주택 (2번째 구매)</option>
          <option value="2">2주택 이상 (3번째+)</option>
        </select>
      </div>
      {result && (
        <>
          <div className={styles.resultBox}>
            <div className={styles.resultLabel}>총 납부세액</div>
            <div className={styles.resultValue}>{fmt(result.total)}원</div>
            <div className={styles.resultSub}>취득세율: {result.rate}%</div>
          </div>
          <div className={styles.resultDetail}>
            <div className={styles.detailRow}><span>취득세</span><span>{fmt(result.acquisitionTax)}원</span></div>
            <div className={styles.detailRow}><span>지방교육세 (20%)</span><span>{fmt(result.educationTax)}원</span></div>
            <div className={styles.detailRow}><span>농어촌특별세 (10%)</span><span>{fmt(result.localTax)}원</span></div>
            <div className={styles.detailRow}><span>합계</span><span>{fmt(result.total)}원</span></div>
          </div>
          <div className={styles.resultNote}>
            ⚠️ 실제 세율은 조정대상지역, 법인 여부 등에 따라 다를 수 있어요.
          </div>
        </>
      )}
    </div>
  )
}

// ────────────────────────────────
// 3. 청약 가점 계산기
// ────────────────────────────────
function ChungyakScore() {
  const [houseless, setHouseless] = useState('0')
  const [dependents, setDependents] = useState('0')
  const [accountYears, setAccountYears] = useState('0')

  const houselessScores: Record<string, number> = { '0':0,'1':2,'2':4,'3':6,'4':8,'5':10,'6':12,'7':14,'8':16,'9':18,'10':20,'11':22,'12':24,'13':26,'14':28,'15':30,'16':32 }
  const dependentScores: Record<string, number> = { '0':5,'1':10,'2':15,'3':20,'4':25,'5':30,'6':35 }
  const accountScores: Record<string, number> = { '0':1,'1':2,'2':3,'3':4,'4':5,'5':6,'6':7,'7':8,'8':9,'9':10,'10':11,'11':12,'12':13,'13':14,'14':15 }

  const h = houselessScores[houseless] || 0
  const d = dependentScores[dependents] || 0
  const a = accountScores[Math.min(parseInt(accountYears), 14).toString()] || 0
  const total = h + d + a

  const getRating = (score: number) => {
    if (score >= 60) return { label: '🏆 당첨 가능성 높음', color: '#22543d' }
    if (score >= 45) return { label: '👍 중간 수준', color: '#276749' }
    if (score >= 30) return { label: '⚠️ 낮은 편', color: '#744210' }
    return { label: '🚨 가점 쌓기 필요', color: '#742a2a' }
  }

  const rating = getRating(total)

  return (
    <div className={styles.calcCard}>
      <h2>🎫 청약 가점 계산기</h2>
      <p className={styles.desc}>무주택 기간, 부양가족 수, 청약통장 가입 기간으로 청약 가점을 계산해드려요.</p>
      <div className={styles.inputGroup}>
        <label>무주택 기간 (년)</label>
        <select value={houseless} onChange={e => setHouseless(e.target.value)}>
          {Array.from({length: 17}, (_, i) => (
            <option key={i} value={i.toString()}>{i === 0 ? '1년 미만' : i === 16 ? '15년 이상' : `${i}년`}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label>부양가족 수 (본인 제외)</label>
        <select value={dependents} onChange={e => setDependents(e.target.value)}>
          {Array.from({length: 7}, (_, i) => (
            <option key={i} value={i.toString()}>{i === 6 ? '6명 이상' : `${i}명`}</option>
          ))}
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label>청약통장 가입 기간 (년)</label>
        <select value={accountYears} onChange={e => setAccountYears(e.target.value)}>
          {Array.from({length: 15}, (_, i) => (
            <option key={i} value={i.toString()}>{i === 0 ? '1년 미만' : i === 14 ? '14년 이상' : `${i}년`}</option>
          ))}
        </select>
      </div>
      <div className={styles.resultBox}>
        <div className={styles.resultLabel}>총 청약 가점</div>
        <div className={styles.resultValue}>{total}점 <span style={{fontSize:'1rem'}}>/84점</span></div>
        <div className={styles.resultSub} style={{color: rating.color, fontWeight: 600}}>{rating.label}</div>
      </div>
      <div className={styles.resultDetail}>
        <div className={styles.detailRow}><span>무주택 기간 점수</span><span>{h}점</span></div>
        <div className={styles.detailRow}><span>부양가족 점수</span><span>{d}점</span></div>
        <div className={styles.detailRow}><span>청약통장 점수</span><span>{a}점</span></div>
        <div className={styles.detailRow}><span>합계</span><span>{total}점</span></div>
      </div>
    </div>
  )
}

// ────────────────────────────────
// 4. 대출 한도 계산기
// ────────────────────────────────
function LoanLimitCalc() {
  const [income, setIncome] = useState('')
  const [rate, setRate] = useState('4.5')
  const [years, setYears] = useState('30')
  const [existingLoan, setExistingLoan] = useState('')

  const calc = (): { error: string } | { loanLimit: number; monthlyPayment: number; dsrLimit: number; existing: number } | null => {
    const i = parseFloat(income.replace(/,/g, '')) * 10000
    const r = parseFloat(rate) / 100 / 12
    const n = parseInt(years) * 12
    const existing = parseFloat(existingLoan.replace(/,/g, '')) * 10000 || 0
    if (!i || !r || !n) return null
    const dsrLimit = i * 0.4 / 12
    const availablePayment = dsrLimit - existing
    if (availablePayment <= 0) return { error: 'DSR 한도 초과: 기존 대출 상환액이 너무 높습니다.' }
    const loanLimit = availablePayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
    return { loanLimit, monthlyPayment: availablePayment, dsrLimit, existing }
  }

  const result = calc()

  return (
    <div className={styles.calcCard}>
      <h2>💳 대출 한도 계산기</h2>
      <p className={styles.desc}>연 소득 기준 DSR 40%를 적용한 최대 대출 가능 금액을 계산해드려요.</p>
      <div className={styles.inputGroup}>
        <label>연 소득 (만원)</label>
        <input type="text" placeholder="예: 5000" value={income}
          onChange={e => setIncome(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className={styles.inputGroup}>
        <label>예상 금리 (%)</label>
        <input type="text" placeholder="예: 4.5" value={rate}
          onChange={e => setRate(e.target.value)} />
      </div>
      <div className={styles.inputGroup}>
        <label>대출 기간</label>
        <select value={years} onChange={e => setYears(e.target.value)}>
          <option value="10">10년</option>
          <option value="20">20년</option>
          <option value="30">30년</option>
          <option value="40">40년</option>
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label>기존 대출 월 상환액 (만원)</label>
        <input type="text" placeholder="예: 30 (없으면 0)" value={existingLoan}
          onChange={e => setExistingLoan(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        'error' in result ? (
          <div className={styles.resultBox} style={{background:'#fff5f5', borderColor:'#feb2b2'}}>
            <div className={styles.resultValue} style={{fontSize:'1rem', color:'#e53e3e'}}>{result.error}</div>
          </div>
        ) : (
          <>
            <div className={styles.resultBox}>
              <div className={styles.resultLabel}>최대 대출 가능 금액</div>
              <div className={styles.resultValue}>{fmt(result.loanLimit / 10000)}만원</div>
            </div>
            <div className={styles.resultDetail}>
              <div className={styles.detailRow}><span>월 소득 DSR 한도 (40%)</span><span>{fmt(result.dsrLimit)}원</span></div>
              <div className={styles.detailRow}><span>기존 대출 월 상환</span><span>{fmt(result.existing)}원</span></div>
              <div className={styles.detailRow}><span>사용 가능 월 상환액</span><span>{fmt(result.monthlyPayment)}원</span></div>
            </div>
            <div className={styles.resultNote}>
              ⚠️ 실제 대출 한도는 금융기관, 신용도, 담보가치에 따라 다릅니다.
            </div>
          </>
        )
      )}
    </div>
  )
}

// ────────────────────────────────
// 5. 부동산 수익률 계산기
// ────────────────────────────────
function RealEstateYield() {
  const [buyPrice, setBuyPrice] = useState('')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [deposit, setDeposit] = useState('')
  const [costs, setCosts] = useState('')

  const calc = () => {
    const p = parseFloat(buyPrice.replace(/,/g, '')) * 10000
    const r = parseFloat(monthlyRent.replace(/,/g, ''))
    const d = parseFloat(deposit.replace(/,/g, '')) * 10000 || 0
    const c = parseFloat(costs.replace(/,/g, '')) * 10000 || 0
    if (!p || !r) return null
    const yearlyRent = r * 12
    const grossYield = (yearlyRent / p) * 100
    const netInvestment = p - d + c
    const netYield = (yearlyRent / netInvestment) * 100
    return { yearlyRent, grossYield, netYield, netInvestment }
  }

  const result = calc()

  return (
    <div className={styles.calcCard}>
      <h2>📈 부동산 수익률 계산기</h2>
      <p className={styles.desc}>매매가와 월 임대료로 투자 수익률을 계산해드려요.</p>
      <div className={styles.inputGroup}>
        <label>매매가 (만원)</label>
        <input type="text" placeholder="예: 30000" value={buyPrice}
          onChange={e => setBuyPrice(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className={styles.inputGroup}>
        <label>월 임대료 (원)</label>
        <input type="text" placeholder="예: 800000" value={monthlyRent}
          onChange={e => setMonthlyRent(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className={styles.inputGroup}>
        <label>임차인 보증금 (만원)</label>
        <input type="text" placeholder="예: 5000" value={deposit}
          onChange={e => setDeposit(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className={styles.inputGroup}>
        <label>취득 부대비용 (만원)</label>
        <input type="text" placeholder="예: 500" value={costs}
          onChange={e => setCosts(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className={styles.resultBox}>
            <div className={styles.resultLabel}>순 투자 수익률</div>
            <div className={styles.resultValue}>{result.netYield.toFixed(2)}%</div>
            <div className={styles.resultSub}>총 수익률 (매매가 기준): {result.grossYield.toFixed(2)}%</div>
          </div>
          <div className={styles.resultDetail}>
            <div className={styles.detailRow}><span>연간 임대수입</span><span>{fmt(result.yearlyRent)}원</span></div>
            <div className={styles.detailRow}><span>실투자금</span><span>{fmt(result.netInvestment)}원</span></div>
            <div className={styles.detailRow}><span>총 수익률</span><span>{result.grossYield.toFixed(2)}%</span></div>
            <div className={styles.detailRow}><span>순 수익률</span><span>{result.netYield.toFixed(2)}%</span></div>
          </div>
        </>
      )}
    </div>
  )
}

// ────────────────────────────────
// 6. 등기비용 계산기
// ────────────────────────────────
function RegistrationCostCalc() {
  const [price, setPrice] = useState('')
  const [loanAmount, setLoanAmount] = useState('')

  const calc = () => {
    const p = parseFloat(price.replace(/,/g, '')) * 10000
    const l = parseFloat(loanAmount.replace(/,/g, '')) * 10000 || 0
    if (!p) return null
    const registrationTax = p * 0.002
    const educationTax = registrationTax * 0.2
    const stampDuty = 150000
    const agencyFee = Math.min(Math.max(p * 0.005, 200000), 9000000)
    const loanRegistration = l * 0.002
    const total = registrationTax + educationTax + stampDuty + agencyFee + loanRegistration
    return { registrationTax, educationTax, stampDuty, agencyFee, loanRegistration, total }
  }

  const result = calc()

  return (
    <div className={styles.calcCard}>
      <h2>📋 등기비용 계산기</h2>
      <p className={styles.desc}>주택 구매 시 발생하는 등기 관련 비용을 계산해드려요.</p>
      <div className={styles.inputGroup}>
        <label>매매가 (만원)</label>
        <input type="text" placeholder="예: 50000" value={price}
          onChange={e => setPrice(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className={styles.inputGroup}>
        <label>대출금액 (만원, 없으면 0)</label>
        <input type="text" placeholder="예: 30000" value={loanAmount}
          onChange={e => setLoanAmount(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className={styles.resultBox}>
            <div className={styles.resultLabel}>총 등기 비용</div>
            <div className={styles.resultValue}>{fmt(result.total)}원</div>
          </div>
          <div className={styles.resultDetail}>
            <div className={styles.detailRow}><span>소유권 이전 등록세</span><span>{fmt(result.registrationTax)}원</span></div>
            <div className={styles.detailRow}><span>지방교육세</span><span>{fmt(result.educationTax)}원</span></div>
            <div className={styles.detailRow}><span>인지세</span><span>{fmt(result.stampDuty)}원</span></div>
            <div className={styles.detailRow}><span>법무사 수수료 (추정)</span><span>{fmt(result.agencyFee)}원</span></div>
            {result.loanRegistration > 0 && (
              <div className={styles.detailRow}><span>근저당 설정 등록세</span><span>{fmt(result.loanRegistration)}원</span></div>
            )}
          </div>
          <div className={styles.resultNote}>
            ⚠️ 법무사 수수료는 사무소마다 다를 수 있으며, 실제 비용과 차이가 있을 수 있어요.
          </div>
        </>
      )}
    </div>
  )
}

// ────────────────────────────────
// 탭 목록
// ────────────────────────────────
const TABS = [
  { id: 'jeonse', label: '🔄 전월세 전환' },
  { id: 'tax', label: '🏛️ 취득세' },
  { id: 'chungyak', label: '🎫 청약 가점' },
  { id: 'loan', label: '💳 대출 한도' },
  { id: 'yield', label: '📈 수익률' },
  { id: 'register', label: '📋 등기비용' },
]

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState('jeonse')

  return (
    <div className={styles.calcPage}>
      <div className={styles.calcHeader}>
        <h1>🏠 부동산 계산기</h1>
        <p>전월세, 취득세, 청약 가점까지 한 번에</p>
      </div>
      <div className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'jeonse' && <JeonseConverter />}
      {activeTab === 'tax' && <AcquisitionTaxCalc />}
      {activeTab === 'chungyak' && <ChungyakScore />}
      {activeTab === 'loan' && <LoanLimitCalc />}
      {activeTab === 'yield' && <RealEstateYield />}
      {activeTab === 'register' && <RegistrationCostCalc />}
    </div>
  )
}
