## 범용 데이터 플랫폼

연구에 활용할 수 있는 공개 데이터셋을 찾을 때 가장 먼저 확인할 플랫폼 4곳이다. 대부분 무료이며 다양한 분야의 데이터를 제공한다.

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🏆</span>
    <div class="card-title">Kaggle</div>
    <div class="card-desc">데이터 과학 대회 플랫폼이자 커뮤니티. 수만 개의 데이터셋이 공개되어 있고, 노트북 환경에서 바로 분석을 시작할 수 있다. 다른 사람의 분석 코드를 참고하기에도 좋다.</div>
    <span class="card-tag tag-green">무료</span>
    <span class="card-tag tag-blue">대회/커뮤니티</span>
  </div>
  <div class="card">
    <span class="card-icon">🗃️</span>
    <div class="card-title">UCI ML Repository</div>
    <div class="card-desc">머신러닝 연구의 클래식 벤치마크 데이터셋 모음. Iris, Wine, Boston Housing 등 논문에서 자주 인용되는 표준 데이터셋을 제공한다.</div>
    <span class="card-tag tag-green">무료</span>
  </div>
  <div class="card">
    <span class="card-icon">🔍</span>
    <div class="card-title">Google Dataset Search</div>
    <div class="card-desc">구글의 데이터셋 전용 검색 엔진. 키워드를 입력하면 전 세계 기관과 연구소에서 공개한 데이터셋을 찾아준다.</div>
    <span class="card-tag tag-green">무료</span>
  </div>
  <div class="card">
    <span class="card-icon">🤗</span>
    <div class="card-title">Hugging Face</div>
    <div class="card-desc">NLP, 컴퓨터 비전 등 AI 분야의 데이터셋과 사전학습 모델을 함께 제공한다. datasets 라이브러리로 Python에서 한 줄로 로드 가능하다.</div>
    <span class="card-tag tag-green">무료</span>
    <span class="card-tag tag-blue">모델 포함</span>
  </div>
</div>

---

## 공학 분야별 데이터

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s53-struct">구조/건축</button>
    <button class="tab-btn" data-tab="tab-s53-mat">재료/화학</button>
    <button class="tab-btn" data-tab="tab-s53-mech">기계/제조</button>
    <button class="tab-btn" data-tab="tab-s53-env">환경/에너지</button>
  </div>
  <div class="tab-content active" id="tab-s53-struct">
    <ul>
      <li><strong>PEER Ground Motion Database</strong> — 전 세계 지진 가속도 기록 데이터베이스. 내진 해석 연구의 표준 입력 데이터로 활용된다.</li>
      <li><strong>CESMD (Center for Engineering Strong Motion Data)</strong> — 미국 내 구조물 계측 지진 응답 데이터. 실제 건물의 거동 분석에 유용하다.</li>
      <li><strong>인프라 이미지 데이터셋</strong> — 균열 탐지, 교량 손상 분류 등 구조물 상태 평가용 이미지 데이터가 Kaggle과 SDNET2018 등에서 공개되어 있다.</li>
    </ul>
  </div>
  <div class="tab-content" id="tab-s53-mat">
    <ul>
      <li><strong>Materials Project</strong> — 10만 개 이상의 무기 재료 물성(밴드갭, 탄성계수 등) 데이터. API로 프로그래밍 접근이 가능하다.</li>
      <li><strong>AFLOW</strong> — 자동화된 제일원리 계산 결과 데이터베이스. 합금, 결정 구조 탐색 연구에 활용된다.</li>
      <li><strong>Open Catalyst Project</strong> — Meta AI와 CMU의 촉매 반응 시뮬레이션 데이터. GNN 기반 촉매 설계 연구에 사용된다.</li>
    </ul>
  </div>
  <div class="tab-content" id="tab-s53-mech">
    <ul>
      <li><strong>NASA Prognostics Data Repository</strong> — 베어링, 배터리, 터보팬 엔진 등의 열화 데이터. 고장 예지(PHM) 연구의 벤치마크로 널리 활용된다.</li>
      <li><strong>PHM Society Data Challenge</strong> — 매년 진단/예지 대회와 함께 제조 설비 데이터를 공개한다.</li>
      <li><strong>CWRU Bearing Dataset</strong> — Case Western Reserve 대학의 베어링 결함 진동 데이터. 회전체 진단 연구의 사실상 표준이다.</li>
    </ul>
  </div>
  <div class="tab-content" id="tab-s53-env">
    <ul>
      <li><strong>NOAA Climate Data</strong> — 미국 해양대기청의 기상/기후 관측 데이터. 수십 년간의 시계열 데이터를 무료로 제공한다.</li>
      <li><strong>ERA5 (ECMWF)</strong> — 유럽 중기예보센터의 전 지구 재분석 기후 데이터. 시간별 해상도로 1979년부터 제공된다.</li>
      <li><strong>공공데이터포털 (data.go.kr)</strong> — 한국 정부 공공데이터. 대기질, 에너지 소비, 교통, 건축물 등 국내 연구에 필수적인 데이터를 API로 제공한다.</li>
    </ul>
  </div>
</div>

---

## 데이터 사용 시 주의

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>공개 데이터를 연구에 활용할 때 반드시 확인할 사항</strong></p>
    <p>1. <strong>라이선스를 확인한다.</strong> CC-BY, CC-BY-SA, CC0 등 라이선스에 따라 상업적 이용이나 재배포 조건이 달라진다. 논문에 사용하기 전에 반드시 확인한다.</p>
    <p>2. <strong>올바른 인용 방법을 따른다.</strong> 대부분의 데이터셋은 인용 논문이나 DOI를 지정하고 있다. 논문의 참고문헌에 데이터 출처를 명시한다.</p>
    <p>3. <strong>전처리 과정을 문서화한다.</strong> 결측치 처리, 정규화, 이상치 제거 등 모든 전처리 단계를 기록해두어야 결과의 재현성을 보장할 수 있다.</p>
  </div>
</div>
