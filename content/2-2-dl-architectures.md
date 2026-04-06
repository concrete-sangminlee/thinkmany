## 딥러닝 vs 머신러닝

딥러닝은 머신러닝의 한 분야로, 다층 신경망을 사용하여 데이터에서 자동으로 특성(feature)을 추출한다. 전통적 ML이 사람이 설계한 특성에 의존하는 반면, 딥러닝은 원시 데이터로부터 계층적 표현을 스스로 학습한다. 이미지, 시계열, 텍스트처럼 고차원 비정형 데이터에서 특히 강력하다.

---

## 핵심 아키텍처

<div class="card-grid">
  <div class="card accent-blue">
    <span class="card-icon">🔢</span>
    <div class="card-title">MLP (Multi-Layer Perceptron)</div>
    <div class="card-desc">가장 기본적인 신경망 구조. 정형(tabular) 데이터에 적합하다. 입력층-은닉층-출력층의 완전연결 구조로 구성된다.</div>
  </div>
  <div class="card accent-purple">
    <span class="card-icon">🖼️</span>
    <div class="card-title">CNN (Convolutional NN)</div>
    <div class="card-desc">합성곱 연산으로 공간적 패턴을 포착한다. 이미지, 2D/3D 공간 데이터에 강력하다. 결함 탐지, 미세구조 분석에 활용된다.</div>
  </div>
  <div class="card accent-cyan">
    <span class="card-icon">📈</span>
    <div class="card-title">RNN / LSTM</div>
    <div class="card-desc">순차적 데이터의 시간적 의존성을 학습한다. 센서 시계열, 구조 모니터링, 진동 데이터 분석에 사용된다.</div>
  </div>
  <div class="card accent-green">
    <span class="card-icon">🔄</span>
    <div class="card-title">Transformer</div>
    <div class="card-desc">Self-Attention 기반으로 긴 시퀀스의 의존성을 효과적으로 포착한다. NLP에서 시작했으나 비전, 시계열 등 전 분야로 확산 중이다.</div>
  </div>
</div>

---

## 학습의 핵심 개념

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s22-loss">손실함수</button>
    <button class="tab-btn" data-tab="tab-s22-optim">옵티마이저</button>
    <button class="tab-btn" data-tab="tab-s22-reg">정규화</button>
  </div>
  <div class="tab-content active" id="tab-s22-loss">
    <p><strong>MSE (Mean Squared Error)</strong> — 회귀 문제의 기본 손실함수. 이상치에 민감하다.</p>
    <p><strong>Cross-Entropy</strong> — 분류 문제의 표준 손실함수. 확률 분포 간 차이를 측정한다.</p>
    <p><strong>물리 기반 손실</strong> — 지배 방정식(PDE)의 잔차를 손실에 추가하여, 물리 법칙을 만족하도록 유도한다. PINN 등에서 핵심적으로 사용된다.</p>
  </div>
  <div class="tab-content" id="tab-s22-optim">
    <p><strong>SGD</strong> — 가장 기본적인 경사하강법. 모멘텀을 추가하면 수렴이 안정된다.</p>
    <p><strong>Adam</strong> — 적응적 학습률을 사용하며, 대부분의 경우 좋은 시작점이다. 공학 연구에서 가장 널리 사용된다.</p>
    <p><strong>학습률 스케줄링</strong> — Cosine Annealing, ReduceLROnPlateau 등으로 학습 후반부 학습률을 감소시켜 수렴을 안정화한다.</p>
  </div>
  <div class="tab-content" id="tab-s22-reg">
    <p><strong>Dropout</strong> — 학습 중 무작위로 뉴런을 비활성화하여 과적합을 방지한다. 일반적으로 0.1~0.5 비율을 사용한다.</p>
    <p><strong>Batch Normalization</strong> — 각 층의 입력을 정규화하여 학습을 안정화하고 속도를 높인다.</p>
    <p><strong>Early Stopping</strong> — 검증 손실이 더 이상 감소하지 않으면 학습을 중단한다. 가장 실용적인 과적합 방지 기법이다.</p>
  </div>
</div>

---

## 공학 연구 실전 팁

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>간단한 모델(MLP, 얕은 CNN)부터 시작하고 점진적으로 복잡도를 높인다</li>
      <li>예측 결과가 물리적으로 타당한지 항상 확인한다 (음수 응력, 비현실적 온도 등)</li>
      <li>데이터 품질 확보에 전체 프로젝트 시간의 50% 이상을 투자한다</li>
      <li>학습/검증/테스트 곡선을 반드시 시각화하고 분석한다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>무조건 가장 복잡한 최신 모델을 사용한다 (Transformer가 항상 최선은 아니다)</li>
      <li>모델을 블랙박스로 방치한다 — 해석 가능성 없이는 논문 게재가 어렵다</li>
      <li>학습 곡선을 무시하고 최종 성능 수치만 본다</li>
      <li>GPU 자원이 부족한데 무리하게 대형 모델을 학습한다</li>
    </ul>
  </div>
</div>
