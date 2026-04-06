## 대리 모델이 필요한 이유

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>고충실도 시뮬레이션의 한계</strong></p>
    <p>FEM 해석 1회에 수 시간, CFD 해석 1회에 수십 시간이 소요될 수 있다. 설계 최적화에 수천~수만 회의 반복 평가가 필요하다면, 원래 시뮬레이션을 직접 호출하는 것은 현실적으로 불가능하다. 대리 모델(Surrogate Model)은 소수의 시뮬레이션 결과로 입출력 관계를 근사하여, 실시간에 가까운 예측을 가능하게 한다.</p>
  </div>
</div>

---

## 대리 모델링 기법

<div class="card-grid">
  <div class="card accent-blue">
    <span class="card-icon">📈</span>
    <div class="card-title">RSM (Response Surface Method)</div>
    <div class="card-desc">저차 다항식으로 응답면을 근사한다. 변수가 5개 이하인 저차원 문제에서 해석적이고 투명한 모델을 제공한다.</div>
  </div>
  <div class="card accent-purple">
    <span class="card-icon">📊</span>
    <div class="card-title">Kriging / Gaussian Process</div>
    <div class="card-desc">예측값과 함께 불확실성(분산)을 제공한다. 베이지안 최적화의 핵심 대리 모델이며, 소규모 데이터에서 강력하다.</div>
  </div>
  <div class="card accent-cyan">
    <span class="card-icon">🔵</span>
    <div class="card-title">RBF (Radial Basis Function)</div>
    <div class="card-desc">방사 기저 함수의 선형 결합으로 근사한다. 고차원에서도 유연하게 적용 가능하며, 보간 특성이 우수하다.</div>
  </div>
  <div class="card accent-green">
    <span class="card-icon">🧠</span>
    <div class="card-title">신경망 기반</div>
    <div class="card-desc">MLP, CNN 등으로 복잡한 비선형 관계를 학습한다. 데이터가 충분할 때(수백 이상) 높은 정확도를 달성한다.</div>
  </div>
</div>

---

## 최적화와의 결합

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🎲</div>
    <div class="pipeline-step-title">초기 샘플링</div>
    <div class="pipeline-step-desc">LHS, Sobol 등으로 설계 공간을 효율적으로 탐색</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🏗️</div>
    <div class="pipeline-step-title">대리 모델 구축</div>
    <div class="pipeline-step-desc">샘플 데이터로 Kriging/RBF/NN 학습</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🎯</div>
    <div class="pipeline-step-title">최적점 탐색</div>
    <div class="pipeline-step-desc">대리 모델 위에서 GA, PSO 등 실행</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">✅</div>
    <div class="pipeline-step-title">실제 시뮬 검증</div>
    <div class="pipeline-step-desc">후보 최적점을 원래 시뮬레이션으로 확인</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔄</div>
    <div class="pipeline-step-title">모델 갱신</div>
    <div class="pipeline-step-desc">새 데이터를 추가하여 모델 정확도 향상 (반복)</div>
  </div>
</div>

---

## 적응적 샘플링

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>어디에 다음 샘플을 추가할 것인가</strong></p>
    <p>적응적 샘플링(Adaptive Sampling)은 대리 모델의 불확실성이 높거나, 최적해에 가까운 영역에 전략적으로 새 샘플을 배치하는 기법이다.</p>
    <p><strong>Expected Improvement (EI)</strong> — 현재 최적값을 개선할 기대치가 가장 큰 지점을 선택한다. 베이지안 최적화의 표준 acquisition function이다.</p>
    <p><strong>Lower Confidence Bound (LCB)</strong> — 예측 평균에서 불확실성을 빼서, 탐색(exploration)과 활용(exploitation)의 균형을 조절한다.</p>
    <p><strong>실전 조언</strong> — 초기 샘플 수는 최소 10d개(d=설계 변수 수) 이상 확보하고, 적응적 추가는 수렴할 때까지 반복한다.</p>
  </div>
</div>
