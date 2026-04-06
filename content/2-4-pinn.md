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
