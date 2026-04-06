## 실험 데이터 수집 도구

시뮬레이션 결과를 검증하거나 현상을 직접 관측하려면 실험이 필요하다. 데이터 수집의 품질이 연구의 신뢰성을 결정한다.

<div class="card-grid">
  <div class="card">
    <span class="card-icon">📟</span>
    <div class="card-title">DAQ 시스템</div>
    <div class="card-desc"><strong>NI DAQ (National Instruments)</strong> — 산업/학술 표준 데이터 수집 장비. LabVIEW와 연동되며 고정밀 측정이 가능하다. <strong>Arduino/Raspberry Pi</strong> — 저비용 프로토타이핑. 간단한 계측에 적합하지만 정밀도에 한계가 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📡</span>
    <div class="card-title">센서 및 계측</div>
    <div class="card-desc"><strong>가속도계</strong> — 진동, 충격 측정. <strong>변위계(LVDT)</strong> — 미소 변위 계측. <strong>로드셀</strong> — 하중 및 힘 측정. <strong>열전대/RTD</strong> — 온도 측정. 센서 사양(범위, 분해능, 응답속도)을 실험 전에 반드시 확인한다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📸</span>
    <div class="card-title">이미지/영상 계측</div>
    <div class="card-desc"><strong>고속 카메라</strong> — 고속 현상(충돌, 파괴, 유동) 촬영. 프레임 레이트와 해상도의 트레이드오프를 이해한다. <strong>DIC (Digital Image Correlation)</strong> — 비접촉 전역 변형률 측정. 스페클 패턴 품질이 정확도를 좌우한다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🌐</span>
    <div class="card-title">환경 모니터링</div>
    <div class="card-desc"><strong>IoT 센서 네트워크</strong> — 장기간 현장 모니터링에 활용. 무선 통신(LoRa/WiFi)으로 원격 데이터 수집이 가능하다. 배터리 수명과 데이터 전송 안정성을 사전에 검증한다.</div>
  </div>
</div>

---

## 데이터 수집 흐름

실험 데이터는 센서에서 최종 분석까지 일관된 파이프라인을 거친다.

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📡</div>
    <div class="pipeline-step-title">계측</div>
    <div class="pipeline-step-desc">센서로 물리량을 전기 신호로 변환</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📟</div>
    <div class="pipeline-step-title">수집 (DAQ)</div>
    <div class="pipeline-step-desc">아날로그 신호를 디지털로 변환하여 기록</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">💾</div>
    <div class="pipeline-step-title">저장</div>
    <div class="pipeline-step-desc">CSV, HDF5, DB 등 구조화된 형식으로 저장</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔧</div>
    <div class="pipeline-step-title">전처리</div>
    <div class="pipeline-step-desc">노이즈 제거, 필터링, 이상치 처리</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📊</div>
    <div class="pipeline-step-title">분석</div>
    <div class="pipeline-step-desc">통계, FFT, 상관분석 등 목적에 맞는 처리</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📈</div>
    <div class="pipeline-step-title">시각화</div>
    <div class="pipeline-step-desc">그래프, 컨투어, 애니메이션으로 표현</div>
  </div>
</div>

---

## 데이터 관리 원칙

실험 데이터는 한 번 잃으면 복구가 불가능하다. 처음부터 원칙을 세운다.

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>Raw 데이터는 절대 수정하지 않고 원본 그대로 보존한다</li>
      <li>실험 일시, 조건, 장비 설정 등 메타데이터를 함께 기록한다</li>
      <li>폴더 구조를 표준화한다: <code>YYYYMMDD_실험명/raw/</code>, <code>processed/</code>, <code>figures/</code></li>
      <li>클라우드 또는 NAS에 자동 백업을 설정하고, 처리 과정은 스크립트로 기록한다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>원본 파일을 직접 수정하거나 덮어쓰지 않는다</li>
      <li>파일명을 "최종", "최종_수정", "진짜최종"으로 관리하지 않는다</li>
      <li>로컬 PC 한 곳에만 저장하지 않고, 실험 노트 없이 데이터만 남기지 않는다</li>
    </ul>
  </div>
</div>