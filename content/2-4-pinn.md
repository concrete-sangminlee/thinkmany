## PINN이란

Physics-Informed Neural Networks(PINN)은 물리 법칙을 신경망의 학습 과정에 직접 통합하는 방법론이다. 지배 방정식(PDE)의 잔차를 손실함수에 포함시켜, 데이터가 부족하더라도 물리적으로 타당한 해를 예측할 수 있다. 기존 수치 해석(FEM, FDM)의 메시 의존성 없이 연속적인 해를 얻는 것이 가능하다.

---

## 작동 원리

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📐</div>
    <div class="pipeline-step-title">지배방정식 정의</div>
    <div class="pipeline-step-desc">열전도, Navier-Stokes 등 PDE 설정</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🧠</div>
    <div class="pipeline-step-title">신경망 구성</div>
    <div class="pipeline-step-desc">좌표(x,y,t) 입력, 물리량(u,v,p) 출력</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">⚖️</div>
    <div class="pipeline-step-title">복합 손실 설계</div>
    <div class="pipeline-step-desc">물리 손실 + 데이터 손실 + 경계조건 손실</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">⚡</div>
    <div class="pipeline-step-title">학습</div>
    <div class="pipeline-step-desc">자동미분으로 PDE 잔차 계산</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📊</div>
    <div class="pipeline-step-title">해 예측</div>
    <div class="pipeline-step-desc">임의 좌표에서 연속적 물리량 출력</div>
  </div>
</div>

---

## 적용 분야

<div class="card-grid">
  <div class="card accent-blue">
    <span class="card-icon">🌡️</span>
    <div class="card-title">열전달</div>
    <div class="card-desc">열전도 방정식 기반 온도장 예측. 센서 데이터가 희소한 영역의 온도 분포를 추정할 수 있다.</div>
  </div>
  <div class="card accent-purple">
    <span class="card-icon">🌊</span>
    <div class="card-title">유체역학</div>
    <div class="card-desc">Navier-Stokes 방정식 기반 유동장 재구성. 실험 데이터(PIV)와 결합하여 압력장을 복원할 수 있다.</div>
  </div>
  <div class="card accent-cyan">
    <span class="card-icon">🏗️</span>
    <div class="card-title">고체역학</div>
    <div class="card-desc">탄성/소성 변형, 응력 분포 예측. 복잡한 하중 조건에서 변위장과 응력장을 동시에 학습한다.</div>
  </div>
  <div class="card accent-green">
    <span class="card-icon">🔄</span>
    <div class="card-title">역문제 (Inverse Problem)</div>
    <div class="card-desc">관측 데이터로부터 미지의 물성치(열전도율, 영률 등)를 추정한다. PINN의 가장 강력한 응용 분야이다.</div>
  </div>
</div>

---

## 한계와 주의점

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>PINN의 현실적 한계</strong></p>
    <p><strong>복잡한 지오메트리</strong> — 불규칙한 형상이나 다중 도메인에서 수렴이 어렵다. 도메인 분할(Domain Decomposition) 기법이 필요할 수 있다.</p>
    <p><strong>비선형/다중스케일</strong> — 강한 비선형성이나 급격한 변화(충격파, 경계층)가 있으면 학습이 불안정하다. 적응적 가중치, 커리큘럼 학습 등이 연구되고 있다.</p>
    <p><strong>학습 비용</strong> — 단일 문제에 대해 FEM보다 오래 걸릴 수 있다. PINN의 진가는 파라미터 변화에 대한 빠른 재예측과 역문제에서 발휘된다.</p>
  </div>
</div>

---

## 시작하기

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>PINN 입문 도구</strong></p>
    <p><strong>DeepXDE</strong> — Python 기반 PINN 전용 라이브러리. 다양한 PDE 예제가 내장되어 있어 학습에 적합하다.</p>
    <p><strong>NVIDIA Modulus</strong> — GPU 최적화된 산업용 PINN 프레임워크. 대규모 문제와 3D 지오메트리를 지원한다.</p>
    <p><strong>PyTorch 직접 구현</strong> — torch.autograd를 활용하여 PDE 잔차를 직접 계산한다. 원리를 이해하기에 가장 좋은 방법이다.</p>
  </div>
</div>

---

## 손실 함수 설계 가이드

<div class="highlight-box info">
  <span class="highlight-box-icon">📐</span>
  <div class="highlight-box-content">
    <p><strong>PINN 손실 함수의 구조와 가중치 조절</strong></p>
    <p>총 손실은 <strong>L = λ_data × L_data + λ_pde × L_pde + λ_bc × L_bc</strong>로 구성된다. 여기서 L_data는 관측 데이터와의 오차, L_pde는 지배방정식 잔차, L_bc는 경계조건 위반 정도를 나타낸다.</p>
    <p><strong>λ 가중치 조절이 핵심이다.</strong> 초기에는 경계조건 손실(λ_bc)을 크게 설정하여 해가 물리적으로 유효한 영역에서 시작하도록 유도한다. 학습이 진행되면 PDE 손실(λ_pde)의 비중을 점차 증가시켜 지배방정식을 더 정밀하게 만족시킨다.</p>
    <p>가중치를 수동으로 조절하는 것은 번거롭고 문제마다 다르다. 최근에는 <strong>NTK(Neural Tangent Kernel) 기반 가중치 조절</strong>, <strong>gradient norm balancing</strong> 등 자동 조절 기법이 연구되고 있어, 이를 활용하면 하이퍼파라미터 튜닝 부담을 줄일 수 있다.</p>
  </div>
</div>

---

## 간단한 예제: 1D 열전도

<div class="card-grid">
  <div class="card accent-blue">
    <span class="card-icon">📋</span>
    <div class="card-title">문제 정의</div>
    <div class="card-desc">길이 L=1m인 막대의 정상상태 열전도 문제. 양끝 온도를 T(0)=0, T(1)=1로 고정한다. 지배방정식은 d²T/dx²=0이며, 해석해는 T(x)=x이다.</div>
  </div>
  <div class="card accent-purple">
    <span class="card-icon">🧠</span>
    <div class="card-title">신경망 구조</div>
    <div class="card-desc">입력: x좌표(1개), 출력: T(x)(1개). 은닉층 3개, 각 32개 뉴런, tanh 활성화 함수를 사용한다. 간단한 문제이므로 소규모 네트워크로 충분하다.</div>
  </div>
  <div class="card accent-cyan">
    <span class="card-icon">📊</span>
    <div class="card-title">학습 결과</div>
    <div class="card-desc">해석해 T(x)=x와 비교하여 오차 0.1% 이내를 달성할 수 있다. 이 예제를 통해 손실 함수 구성, 자동미분, 경계조건 부여 등 PINN의 핵심 원리를 직접 체험할 수 있다.</div>
  </div>
</div>

---

## PINN vs FEM: 언제 무엇을 쓸까

<div class="do-dont">
  <div class="do-box">
    <h4>PINN이 유리한 경우</h4>
    <ul>
      <li><strong>역문제/물성치 추정:</strong> 관측 데이터로부터 미지의 파라미터를 추정할 때 PINN은 별도의 최적화 루프 없이 학습 과정에서 자연스럽게 역문제를 풀 수 있다.</li>
      <li><strong>희소 데이터에서 물리 보완:</strong> 센서 데이터가 부족한 상황에서 물리 법칙이 빈 공간을 채워주는 역할을 한다.</li>
      <li><strong>메쉬 생성이 어려운 복잡 형상:</strong> 메쉬 없이 임의의 점에서 해를 평가할 수 있어, 복잡한 지오메트리에서 전처리 부담이 적다.</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>FEM이 유리한 경우</h4>
    <ul>
      <li><strong>잘 정의된 경계조건과 지배방정식:</strong> 문제가 명확하고 정형화되어 있으면 FEM이 안정적이고 검증된 결과를 제공한다.</li>
      <li><strong>정확한 수치해가 필요할 때:</strong> 공학 설계에서 요구하는 높은 정밀도와 수렴성 보장 측면에서 FEM이 우위에 있다.</li>
      <li><strong>대규모 문제에서 수렴성 보장:</strong> 수백만 자유도 이상의 대규모 문제에서는 FEM의 체계적인 수렴 이론과 병렬 솔버가 더 효율적이다.</li>
    </ul>
  </div>
</div>
