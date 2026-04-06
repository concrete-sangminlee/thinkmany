## 계산/시뮬레이션 기반 연구란

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🖥️</span>
    <div class="card-title">FEM/CFD 시뮬레이션</div>
    <div class="card-desc">물리 현상을 컴퓨터로 재현한다. 구조물의 응력 분포, 유체의 유동 패턴, 열전달 과정 등을 편미분방정식을 수치적으로 풀어 예측한다. ANSYS, ABAQUS, OpenFOAM 등의 소프트웨어를 사용한다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🤖</span>
    <div class="card-title">데이터 기반 ML/AI</div>
    <div class="card-desc">기존의 실험 데이터나 시뮬레이션 데이터에서 패턴을 학습한다. 물성 예측, 결함 탐지, 설계 최적화 등에 활용된다. 직접 실험하지 않아도 공개 데이터셋이나 기존 논문의 데이터를 활용할 수 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📐</span>
    <div class="card-title">이론/해석적 연구</div>
    <div class="card-desc">수학적 모델을 개발하거나 기존 이론을 확장한다. 해석해(analytical solution)를 유도하거나, 차원 분석, 스케일링 법칙 등을 통해 물리 현상의 본질적인 관계를 밝힌다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📊</span>
    <div class="card-title">기존 데이터 재분석</div>
    <div class="card-desc">공개 데이터베이스(UCI, Kaggle, NASA, NIST 등)의 데이터를 새로운 관점에서 분석한다. 새로운 분석 방법을 적용하거나, 기존에 간과된 변수의 영향을 밝히는 것도 유의미한 기여가 된다.</div>
  </div>
</div>

---

## 실험 없이 졸업할 수 있는가?

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>분야에 따라 완전히 가능하다</strong></p>
    <p>계산역학, 전산유체역학, AI/ML 응용, 이론 역학, 최적설계 등의 분야에서는 실험 없이 시뮬레이션과 계산만으로 석사와 박사 모두 졸업할 수 있다. 단, 검증(validation)은 반드시 필요하다. 직접 실험을 하지 않더라도, 기존에 출판된 실험 데이터나 해석해(analytical solution)와 비교하여 자신의 모델이 타당함을 보여야 한다. "실험을 안 했다"는 것이 약점이 아니라, "검증을 안 했다"는 것이 약점이다.</p>
  </div>
</div>

---

## 시뮬레이션 연구의 장단점

<div class="do-dont">
  <div class="do-box">
    <h4>✅ 장점</h4>
    <ul>
      <li>재현성이 높다 — 같은 입력이면 같은 결과가 나온다</li>
      <li>파라미터를 자유롭게 변경하며 수백 개의 케이스를 돌릴 수 있다</li>
      <li>극한 조건(초고온, 초고압, 폭발 등) 등 현실에서 위험한 실험을 대체할 수 있다</li>
      <li>장비 구매/유지 비용이 들지 않아 연구 비용이 상대적으로 낮다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ 주의할 점</h4>
    <ul>
      <li>실험 검증 없이는 현실과 괴리된 결과를 낼 수 있다</li>
      <li>검증 데이터가 반드시 필요하다 — 없으면 결과의 신뢰도를 주장할 수 없다</li>
      <li>모델에 내재된 가정과 한계를 정확히 이해해야 한다</li>
      <li>과도한 이상화(idealization)에 주의해야 한다 — 실제와 동떨어진 조건이면 의미가 없다</li>
    </ul>
  </div>
</div>

---

## 시뮬레이션 결과 신뢰도 확보

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔢</div>
    <div class="pipeline-step-title">메쉬 수렴성 확인</div>
    <div class="pipeline-step-desc">메쉬를 점점 세밀하게 만들어가며 결과가 수렴하는지 확인한다. 결과가 메쉬에 따라 크게 변하면 신뢰할 수 없다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📏</div>
    <div class="pipeline-step-title">해석해와 비교</div>
    <div class="pipeline-step-desc">단순한 케이스에 대해 해석해가 존재하면 이를 기준으로 모델의 정확도를 검증한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔬</div>
    <div class="pipeline-step-title">기존 실험 데이터와 비교</div>
    <div class="pipeline-step-desc">출판된 논문의 실험 결과와 비교한다. 정량적 오차(RMSE, 상대 오차 등)를 명시한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📈</div>
    <div class="pipeline-step-title">민감도 분석</div>
    <div class="pipeline-step-desc">주요 파라미터를 변화시키며 결과가 어떻게 달라지는지 분석한다. 결과가 특정 파라미터에 지나치게 민감하면 해당 파라미터의 불확실성이 결론에 미치는 영향을 논의해야 한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📝</div>
    <div class="pipeline-step-title">한계점 명시</div>
    <div class="pipeline-step-desc">모델이 적용 가능한 범위와 조건을 명확히 밝힌다. 한계점을 숨기는 것보다 솔직히 밝히는 것이 논문의 신뢰도를 높인다.</div>
  </div>
</div>

---

## 계산 연구자의 필수 역량

<div class="card-grid">
  <div class="card">
    <span class="card-icon">💻</span>
    <div class="card-title">프로그래밍</div>
    <div class="card-desc">Python과 MATLAB은 필수다. 데이터 처리, 후처리, 시각화에 매일 사용한다. C/C++이나 Fortran을 다룰 수 있으면 자체 솔버 개발이나 상용 소프트웨어의 사용자 서브루틴 작성이 가능해진다. 최근에는 Julia도 과학 계산 분야에서 빠르게 성장하고 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🔢</span>
    <div class="card-title">수치해석 이해</div>
    <div class="card-desc">수렴(convergence), 안정성(stability), 정확도(accuracy)의 개념을 이해해야 한다. 메쉬를 어떻게 나누는지, 시간 스텝을 어떻게 설정하는지, 반복 계산이 왜 수렴하지 않는지를 판단할 수 있어야 한다. 블랙박스로 소프트웨어를 쓰면 잘못된 결과를 모르고 넘어간다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🧲</span>
    <div class="card-title">물리 직관</div>
    <div class="card-desc">시뮬레이션 결과가 물리적으로 말이 되는지 판단하는 능력이다. 응력이 음수인데 인장 상태라면 뭔가 잘못된 것이다. 유속이 음속을 넘었는데 충격파가 없다면 모델을 다시 확인해야 한다. 숫자만 보지 말고, 그 숫자가 의미하는 물리를 항상 생각해야 한다.</div>
  </div>
</div>
