## 분야별 대표 시뮬레이션 도구

공학 연구에서 시뮬레이션은 실험 전 예측, 설계 최적화, 현상 규명에 핵심적인 역할을 한다. 분야마다 업계 표준으로 자리잡은 도구가 다르므로, 자신의 연구 영역에 맞는 소프트웨어를 파악하는 것이 첫 단계다.

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s41-struct">구조/건축</button>
    <button class="tab-btn" data-tab="tab-s41-mech">기계/제조</button>
    <button class="tab-btn" data-tab="tab-s41-elec">전기/전자</button>
    <button class="tab-btn" data-tab="tab-s41-chem">화학/재료</button>
    <button class="tab-btn" data-tab="tab-s41-civil">토목/환경</button>
  </div>
  <div class="tab-content active" id="tab-s41-struct">
    <p><strong>SAP2000</strong> — 프레임 구조 해석의 산업 표준. 교량, 건축 골조 모델링에 널리 사용된다.</p>
    <p><strong>ETABS</strong> — 고층 건물 특화. 내진 설계, 풍하중 해석에 최적화되어 있다.</p>
    <p><strong>MIDAS Gen/Civil</strong> — 국내 설계 실무에서 점유율이 높다. 한국어 지원과 국내 기준 반영이 강점이다.</p>
  </div>
  <div class="tab-content" id="tab-s41-mech">
    <p><strong>SolidWorks Simulation</strong> — 3D CAD와 통합된 해석 환경. 부품 설계 단계에서 빠른 검증이 가능하다.</p>
    <p><strong>ANSYS Mechanical</strong> — 열, 구조, 피로 해석을 모두 지원하는 범용 도구. 산업계 표준이다.</p>
    <p><strong>LS-DYNA</strong> — 충돌, 폭발 등 고속 동적 해석에 특화되어 있다.</p>
  </div>
  <div class="tab-content" id="tab-s41-elec">
    <p><strong>SPICE (LTspice/PSpice)</strong> — 회로 시뮬레이션의 기본. 아날로그/디지털 회로 검증에 사용된다.</p>
    <p><strong>Cadence Virtuoso</strong> — IC 설계 및 레이아웃. 반도체 연구실에서 필수적인 도구다.</p>
    <p><strong>HFSS (Ansys)</strong> — 고주파 전자기장 시뮬레이션. 안테나, RF 소자 설계에 활용된다.</p>
  </div>
  <div class="tab-content" id="tab-s41-chem">
    <p><strong>VASP</strong> — 밀도범함수이론(DFT) 기반 제일원리 계산. 재료 물성 예측의 표준 도구다.</p>
    <p><strong>Gaussian</strong> — 분자 수준 양자화학 계산. 반응 경로, 에너지 계산에 사용된다.</p>
    <p><strong>LAMMPS</strong> — 분자동역학(MD) 시뮬레이션. 오픈소스이며 대규모 원자 시스템을 다룬다.</p>
  </div>
  <div class="tab-content" id="tab-s41-civil">
    <p><strong>PLAXIS</strong> — 지반 공학 해석 전문. 굴착, 사면 안정, 지하수 문제에 활용된다.</p>
    <p><strong>MODFLOW</strong> — 지하수 흐름 모델링. 미국 지질조사국(USGS)에서 개발한 오픈소스 도구다.</p>
    <p><strong>HEC-RAS</strong> — 하천 수리 해석. 홍수 범람 시뮬레이션과 수자원 관리에 사용된다.</p>
  </div>
</div>

---

## 선택 기준

도구의 기능만 보고 선택하면 안 된다. 실제 연구 환경에서 지속적으로 사용할 수 있는지를 함께 고려해야 한다.

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🏫</span>
    <div class="card-title">연구실 표준</div>
    <div class="card-desc">지도교수와 선배 연구원이 사용하는 도구를 우선 선택한다. 기존 코드와 모델을 물려받을 수 있고, 문제 발생 시 즉시 도움을 받을 수 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🔑</span>
    <div class="card-title">라이선스 확보</div>
    <div class="card-desc">학교 또는 연구실에서 제공하는 라이선스를 확인한다. 상용 소프트웨어는 개인 구매가 어렵다. 학생용 무료 라이선스도 검토한다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📚</span>
    <div class="card-title">커뮤니티와 문서</div>
    <div class="card-desc">공식 문서, 포럼, YouTube 튜토리얼이 풍부한 도구일수록 학습이 빠르다. 사용자 커뮤니티가 활발한지 확인한다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🔗</span>
    <div class="card-title">코딩 연동성</div>
    <div class="card-desc">Python/MATLAB 스크립팅을 지원하는지 확인한다. 파라미터 스터디, 후처리 자동화에 스크립팅 연동은 필수적이다.</div>
  </div>
</div>

---

## 처음 시작할 때

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>시뮬레이션 도구 입문 3단계</strong></p>
    <p>1. <strong>공식 튜토리얼을 따라한다.</strong> 소프트웨어 제작사가 제공하는 Getting Started 예제를 처음부터 끝까지 수행한다. 단축키와 워크플로우를 몸에 익히는 것이 목적이다.</p>
    <p>2. <strong>벤치마크 문제를 검증한다.</strong> 교과서나 논문에 해석 결과가 공개된 표준 문제를 직접 풀어본다. 메시 크기, 경계 조건 설정에 따른 결과 차이를 확인한다.</p>
    <p>3. <strong>해석해와 비교한다.</strong> 단순 형상의 해석적 풀이(closed-form solution)와 시뮬레이션 결과를 비교하여, 모델링 오류를 조기에 발견하는 습관을 기른다.</p>
  </div>
</div>
