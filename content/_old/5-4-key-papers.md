## ML/AI 기초 필독

머신러닝과 딥러닝 연구에서 가장 높은 인용 수를 기록하며, 후속 논문의 기반이 되는 핵심 논문 4편이다. 분야를 불문하고 AI를 활용하는 대학원생이라면 반드시 읽어야 한다.

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🔄</span>
    <div class="card-title">Attention Is All You Need</div>
    <div class="card-desc">Vaswani et al., 2017. Transformer 아키텍처를 제안한 논문. RNN 없이 셀프 어텐션만으로 시퀀스 모델링이 가능함을 보여주었다. 이후 BERT, GPT 등 모든 대형 언어 모델의 기반이 되었으며, 비전(ViT), 음성, 과학 분야까지 파급 효과가 확장되었다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📈</span>
    <div class="card-title">Deep Residual Learning (ResNet)</div>
    <div class="card-desc">He et al., 2015. Skip connection을 도입하여 수백 층 깊이의 네트워크 학습을 가능하게 한 논문. 이전까지 깊은 네트워크는 성능이 오히려 하락하는 문제가 있었는데, 잔차 학습으로 이를 해결했다. 컴퓨터 비전의 사실상 표준 백본이 되었고, 공학 분야 이미지 분류에서도 가장 많이 사용된다.</div>
  </div>
  <div class="card">
    <span class="card-icon">⚡</span>
    <div class="card-title">Adam Optimizer</div>
    <div class="card-desc">Kingma & Ba, 2014. Momentum과 RMSProp을 결합하여 adaptive learning rate를 사용하는 최적화 알고리즘. 하이퍼파라미터 튜닝에 덜 민감하여 딥러닝 학습의 사실상 기본 옵티마이저로 자리잡았다. 왜 잘 작동하는지를 이해하면 학습률 스케줄링 전략을 세울 때 도움이 된다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🎯</span>
    <div class="card-title">Dropout</div>
    <div class="card-desc">Srivastava et al., 2014. 학습 시 뉴런을 무작위로 비활성화하는 정규화 기법. 앙상블 효과를 단일 모델에서 근사하는 아이디어로, 과적합을 방지하는 가장 직관적이고 효과적인 방법이다. Batch Normalization, Weight Decay와 함께 정규화 3대 기법으로 거의 모든 딥러닝 모델에 사용된다.</div>
  </div>
</div>

---

## 공학+AI 융합 핵심

전통 공학 분야에 AI/ML을 접목한 연구의 출발점이 되는 논문들이다. 리뷰 논문과 방법론 원조 논문을 함께 읽으면 분야의 전체 그림을 파악할 수 있다.

<div class="card-grid">
  <div class="card accent-purple">
    <span class="card-icon">🧮</span>
    <div class="card-title">Physics-Informed Neural Networks</div>
    <div class="card-desc">Raissi, Perdikaris & Karniadakis, 2019. 물리 법칙(PDE)을 신경망 손실 함수에 포함시키는 PINN을 제안한 원조 논문. 데이터가 부족한 공학 문제에서 물리 법칙을 제약 조건으로 활용할 수 있음을 보여주었다. 구조, 유체, 열전달 등 공학 AI 융합 연구의 핵심 레퍼런스다.</div>
  </div>
  <div class="card accent-blue">
    <span class="card-icon">🌐</span>
    <div class="card-title">Deep Learning — Nature Review</div>
    <div class="card-desc">LeCun, Bengio & Hinton, 2015. 딥러닝의 3대 거장이 Nature에 발표한 리뷰 논문. 딥러닝의 역사, 핵심 개념, 응용 가능성을 간결하게 조망한다. 새로운 분야에 진입할 때 전체 그림을 잡는 출발점으로 최적이며, 비전공자도 읽을 수 있는 수준으로 쓰여 있다.</div>
  </div>
  <div class="card accent-cyan">
    <span class="card-icon">📊</span>
    <div class="card-title">Data-Driven Discovery of Dynamics</div>
    <div class="card-desc">Brunton & Kutz, 2019. SINDy 등 데이터 기반 동역학 모델링 방법론을 체계적으로 정리한 논문. 실험 데이터로부터 지배 방정식을 자동 추출하는 아이디어를 제시했다. 기계, 토목, 화공 등 물리 시스템 연구에 직접 적용 가능하며, 데이터 기반 모델링의 이론적 토대를 제공한다.</div>
  </div>
  <div class="card accent-green">
    <span class="card-icon">🔬</span>
    <div class="card-title">Machine Learning: Trends and Perspectives</div>
    <div class="card-desc">Jordan & Mitchell, 2015. Science에 발표된 ML 리뷰. 머신러닝의 핵심 개념, 한계, 미래 방향을 비전공자도 이해할 수 있도록 정리했다. ML을 처음 접하는 공학 연구자가 전체 분야를 조망하기에 가장 좋은 논문이며, 어떤 문제에 어떤 방법론이 적합한지 판단하는 틀을 제공한다.</div>
  </div>
</div>

---

## 논문 찾는 법

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>필독 논문을 체계적으로 찾아 읽는 전략</strong></p>
    <p>1. <strong>검색 도구를 활용한다.</strong> Google Scholar는 범용 검색에, Semantic Scholar는 AI 기반 관련 논문 추천에, Connected Papers는 논문 간 관계를 시각적으로 파악하는 데 유용하다.</p>
    <p>2. <strong>리뷰 논문에서 시작한다.</strong> 새로운 분야에 진입할 때는 최신 리뷰/서베이 논문을 먼저 읽는다. 분야의 핵심 논문 목록과 연구 흐름을 한눈에 파악할 수 있다.</p>
    <p>3. <strong>인용을 역추적한 뒤 최신순으로 확장한다.</strong> 핵심 논문의 참고문헌(과거)을 추적하고, 해당 논문을 인용한 후속 논문(미래)을 Google Scholar의 "Cited by"로 최신순 정렬하여 읽는다.</p>
    <p>4. <strong>주요 학회의 Best Paper를 확인한다.</strong> NeurIPS, ICML, CVPR 등 탑 학회의 수상 논문 목록은 해당 해의 가장 중요한 연구 방향을 반영한다.</p>
  </div>
</div>

---

## 읽는 순서 가이드

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🗺️</div>
    <div class="pipeline-step-title">분야 리뷰 논문</div>
    <div class="pipeline-step-desc">전체 그림을 파악한다. 어떤 문제가 있고, 어떤 방법론들이 시도되었는지 조감도를 그린다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🧱</div>
    <div class="pipeline-step-title">기초 논문</div>
    <div class="pipeline-step-desc">ResNet, Transformer, Adam 등 핵심 방법론의 원리를 이해한다. 왜 이 방법이 작동하는지를 파악하는 것이 핵심이다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔧</div>
    <div class="pipeline-step-title">응용 논문</div>
    <div class="pipeline-step-desc">PINN, SINDy 등 내 분야에 AI를 적용한 사례를 읽는다. 기초 방법론이 실제 공학 문제에 어떻게 변형되는지 확인한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🚀</div>
    <div class="pipeline-step-title">최신 논문</div>
    <div class="pipeline-step-desc">올해 나온 SOTA 논문을 읽는다. 기초와 응용을 먼저 읽었기 때문에 최신 논문의 기여점이 명확하게 보인다.</div>
  </div>
</div>

---

## Connected Papers 활용법

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>Seed 논문 1개로 분야 핵심 논문을 빠르게 파악할 수 있다</strong></p>
    <p><a href="https://www.connectedpapers.com" target="_blank">Connected Papers</a>에 seed 논문 1개를 입력하면 관련 논문들의 인용 관계를 그래프로 보여준다. 노드 크기가 큰 논문이 인용 수가 많은 핵심 논문이다.</p>
    <p>여기서 가장 많이 인용된 논문 5편을 골라 읽으면 분야의 핵심을 빠르게 파악할 수 있다. "Prior Works" 탭은 seed 논문이 참고한 과거 논문을, "Derivative Works" 탭은 seed 논문 이후의 후속 연구를 보여준다.</p>
    <p>무료이며 별도 가입이 필요 없다. 새로운 분야에 진입할 때 리뷰 논문과 함께 가장 먼저 활용할 도구다.</p>
  </div>
</div>
