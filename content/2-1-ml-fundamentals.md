## ML이란 무엇인가

머신러닝(Machine Learning)은 명시적으로 프로그래밍하지 않아도 데이터에서 패턴을 학습하여 예측하는 시스템이다. 공학 분야에서는 시뮬레이션 결과 예측, 실험 데이터 분석, 설계 최적화 등 다양한 영역에서 활용된다. 핵심은 "데이터로부터 일반화 가능한 규칙을 추출하는 것"이다.

---

## 핵심 학습 패러다임

<div class="card-grid">
  <div class="card accent-blue">
    <span class="card-icon">🎯</span>
    <div class="card-title">지도학습 (Supervised)</div>
    <div class="card-desc">입력-출력 쌍으로 학습한다. 회귀(연속값 예측)와 분류(범주 예측)로 나뉜다. 공학에서 가장 많이 사용하는 패러다임이다.</div>
  </div>
  <div class="card accent-purple">
    <span class="card-icon">🔍</span>
    <div class="card-title">비지도학습 (Unsupervised)</div>
    <div class="card-desc">라벨 없이 데이터 내재 구조를 탐색한다. 클러스터링(K-means, DBSCAN)과 차원축소(PCA, t-SNE)가 대표적이다.</div>
  </div>
  <div class="card accent-green">
    <span class="card-icon">🎮</span>
    <div class="card-title">강화학습 (Reinforcement)</div>
    <div class="card-desc">환경과 상호작용하며 보상을 최대화하는 정책을 학습한다. 로봇 제어, 공정 최적화 등에 활용된다.</div>
  </div>
</div>

---

## 공학에서 자주 쓰는 알고리즘

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s21-regression">회귀 모델</button>
    <button class="tab-btn" data-tab="tab-s21-tree">트리 기반</button>
    <button class="tab-btn" data-tab="tab-s21-svm">SVM / KNN</button>
    <button class="tab-btn" data-tab="tab-s21-gp">Gaussian Process</button>
  </div>
  <div class="tab-content active" id="tab-s21-regression">
    <p><strong>Linear Regression</strong> — 가장 기본적인 모델. 변수 간 선형 관계를 가정하며 해석이 용이하다.</p>
    <p><strong>Ridge (L2)</strong> — 계수 크기에 페널티를 부여하여 과적합을 방지한다. 다중공선성이 있을 때 효과적이다.</p>
    <p><strong>Lasso (L1)</strong> — 불필요한 변수의 계수를 0으로 만들어 자동 특성 선택 효과가 있다.</p>
  </div>
  <div class="tab-content" id="tab-s21-tree">
    <p><strong>Random Forest</strong> — 다수의 결정 트리를 앙상블하여 안정적인 예측을 제공한다. 특성 중요도 파악에 유용하다.</p>
    <p><strong>XGBoost</strong> — Gradient Boosting 기반으로, 정형 데이터에서 높은 성능을 보인다. Kaggle 대회 단골 우승 모델이다.</p>
    <p><strong>LightGBM</strong> — XGBoost 대비 학습 속도가 빠르고, 대규모 데이터에서 효율적이다.</p>
  </div>
  <div class="tab-content" id="tab-s21-svm">
    <p><strong>SVM (Support Vector Machine)</strong> — 고차원 공간에서 최적 분리 경계를 찾는다. 커널 함수를 통해 비선형 문제도 처리 가능하다. 소규모 데이터에서 강점이 있다.</p>
    <p><strong>KNN (K-Nearest Neighbors)</strong> — 가장 가까운 K개 이웃의 정보로 예측한다. 직관적이지만 고차원에서 성능이 저하된다.</p>
  </div>
  <div class="tab-content" id="tab-s21-gp">
    <p><strong>Gaussian Process Regression</strong> — 예측값과 함께 불확실성(신뢰구간)을 제공한다. 공학 최적화에서 대리 모델로 널리 사용된다.</p>
    <p>데이터가 적을 때 강력하지만, 데이터 수가 수천 개를 넘으면 계산 비용이 급격히 증가한다. 커널 함수 선택이 성능에 큰 영향을 미친다.</p>
  </div>
</div>

---

## 첫 ML 프로젝트 흐름

<div class="pipeline">
  <div class="pipeline-step"><div class="pipeline-step-icon">🎯</div><div class="pipeline-step-title">문제 정의</div><div class="pipeline-step-desc">무엇을 예측할 것인가</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">📊</div><div class="pipeline-step-title">데이터 수집</div><div class="pipeline-step-desc">실험/시뮬/공개 데이터</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">🔧</div><div class="pipeline-step-title">전처리</div><div class="pipeline-step-desc">결측치, 정규화, 특성추출</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">🤖</div><div class="pipeline-step-title">모델 선택</div><div class="pipeline-step-desc">문제 유형에 맞는 알고리즘</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">⚡</div><div class="pipeline-step-title">학습</div><div class="pipeline-step-desc">하이퍼파라미터 튜닝 포함</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">📈</div><div class="pipeline-step-title">평가</div><div class="pipeline-step-desc">테스트셋 성능 검증</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">💡</div><div class="pipeline-step-title">해석</div><div class="pipeline-step-desc">물리적 의미 확인</div></div>
</div>

---

## 주의사항

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>ML은 도구이지, 목적이 아니다</strong></p>
    <p>문제에 대한 물리적 이해 없이 모델부터 돌리면, 결과가 나와도 해석할 수 없고 논문 리뷰어를 설득할 수도 없다. 반드시 도메인 지식을 먼저 확보하고, ML은 이를 보완하는 수단으로 활용해야 한다. "왜 이 모델인가", "왜 이 특성인가"에 답할 수 있어야 한다.</p>
  </div>
</div>
