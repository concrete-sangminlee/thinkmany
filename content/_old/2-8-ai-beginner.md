## 프로그래밍 경험이 없다면

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-label">1주차</div>
    <div class="timeline-title">Python 설치와 기초 문법</div>
    <div class="timeline-desc">Anaconda를 설치하고, 변수, 반복문(for/while), 조건문(if/else), 함수 정의를 익힌다. Jupyter Notebook에서 코드를 한 줄씩 실행하며 결과를 즉시 확인하는 것이 가장 빠른 학습 방법이다. 완벽히 외울 필요 없다. 필요할 때 검색하면 된다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">2-3주차</div>
    <div class="timeline-title">numpy 배열 연산과 pandas 데이터 다루기</div>
    <div class="timeline-desc">numpy로 행렬 연산, 선형대수 기본 연산을 익힌다. pandas로 CSV 파일을 읽고, 데이터를 필터링하고, 기초 통계량을 계산한다. 이 두 라이브러리가 ML의 모든 데이터 처리의 기반이다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">4주차</div>
    <div class="timeline-title">시각화와 첫 ML 모델</div>
    <div class="timeline-desc">matplotlib으로 선 그래프, 산점도, 히스토그램을 그린다. scikit-learn으로 간단한 회귀(Linear Regression)나 분류(Random Forest) 모델을 만들어 본다. 데이터 → 학습 → 예측 → 평가의 전체 흐름을 한 번 경험하는 것이 목적이다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">2개월차</div>
    <div class="timeline-title">미니 프로젝트 1개 완성</div>
    <div class="timeline-desc">Kaggle의 입문용 데이터셋(집값 예측, 타이타닉 생존 예측 등)으로 처음부터 끝까지 하나의 프로젝트를 완성한다. 데이터 로딩 → 전처리 → 모델 학습 → 평가 → 결과 시각화를 혼자 힘으로 해 본다.</div>
  </div>
</div>

---

## 바이브 코딩이란?

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>AI에게 자연어로 코드를 시키는 방식</strong></p>
    <p>"이 CSV 파일을 읽어서 3번째 열 기준으로 정렬하고 산점도를 그려줘"처럼 원하는 작업을 말로 설명하면 AI가 코드를 생성해 준다. Cursor, GitHub Copilot, Claude Code 등의 도구가 대표적이다. 코딩 경험이 부족한 대학원생도 연구용 코드를 빠르게 만들 수 있다. 단, 생성된 코드를 이해하고 검증하는 능력은 반드시 필요하다. AI가 만든 코드가 항상 맞는 것은 아니며, 특히 수치 계산이나 통계 처리에서 미묘한 오류가 있을 수 있다. "돌아간다"와 "맞다"는 다르다.</p>
  </div>
</div>

---

## AI 코딩 도구 비교

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🖥️</span>
    <div class="card-title">Claude Code</div>
    <div class="card-desc">터미널 기반으로 동작하며, 파일을 직접 읽고 수정하고 실행할 수 있다. 프로젝트 전체 맥락을 이해하고 여러 파일에 걸친 작업이 가능하다. 연구 코드의 구조 설계, 디버깅, 리팩토링에 강하다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📝</span>
    <div class="card-title">Cursor</div>
    <div class="card-desc">VS Code 기반 IDE로 코드 자동완성과 채팅 기능을 제공한다. 에디터 안에서 코드를 선택하고 AI에게 수정이나 설명을 요청할 수 있다. 코드를 직접 작성하면서 AI의 도움을 받는 형태에 적합하다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🤖</span>
    <div class="card-title">GitHub Copilot</div>
    <div class="card-desc">코드 자동완성에 특화되어 있으며, VS Code, JetBrains 등 대부분의 IDE를 지원한다. 주석이나 함수명을 쓰면 나머지 코드를 자동으로 제안한다. 반복적인 코드 작성에 시간을 크게 절약해 준다.</div>
  </div>
  <div class="card">
    <span class="card-icon">💬</span>
    <div class="card-title">ChatGPT / Claude 웹</div>
    <div class="card-desc">범용 AI 도구로 코드 작성, 에러 해석, 개념 설명, 논문 요약 등 다양한 용도로 활용할 수 있다. 별도 설치 없이 웹 브라우저에서 바로 사용 가능하다. 코드를 복사-붙여넣기로 옮겨야 하는 것이 단점이다.</div>
  </div>
</div>

---

## 코딩 제로에서 ML 모델까지

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🐍</div>
    <div class="pipeline-step-title">Python 기초 (1주)</div>
    <div class="pipeline-step-desc">변수, 자료형, 반복문, 함수, 파일 입출력. 매일 1-2시간씩 Jupyter Notebook에서 직접 쳐 본다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📊</div>
    <div class="pipeline-step-title">데이터 다루기 (2주)</div>
    <div class="pipeline-step-desc">numpy로 배열 생성/연산/인덱싱, pandas로 DataFrame 조작, matplotlib으로 기본 시각화.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔧</div>
    <div class="pipeline-step-title">scikit-learn 첫 모델 (2주)</div>
    <div class="pipeline-step-desc">train/test 분리, 회귀와 분류 모델 학습, 교차 검증, 성능 지표(MSE, accuracy) 계산.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔥</div>
    <div class="pipeline-step-title">PyTorch 기초 (3주)</div>
    <div class="pipeline-step-desc">텐서 연산, 자동 미분, 간단한 신경망 구현, GPU 활용. 처음엔 2-3층짜리 간단한 네트워크부터 시작한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🎯</div>
    <div class="pipeline-step-title">내 데이터로 모델 만들기</div>
    <div class="pipeline-step-desc">자기 연구 데이터 또는 분야 관련 공개 데이터셋에 모델을 적용한다. 여기서부터가 진짜 연구의 시작이다.</div>
  </div>
</div>

---

## 현실적 조언

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>작은 문제부터 시작한다 — 100줄짜리 코드를 완성하는 경험이 이론 100시간보다 낫다</li>
      <li>에러 메시지를 꼼꼼히 읽는다 — 에러 메시지의 마지막 줄에 답이 있는 경우가 대부분이다</li>
      <li>AI 도구를 적극 활용한다 — 에러 메시지를 그대로 붙여넣고 "왜 이런 에러가 나는가"라고 물어본다</li>
      <li>매일 30분이라도 코딩한다 — 프로그래밍은 외국어와 같아서 매일 조금씩 해야 늘고, 한 번에 몰아서 하면 금방 잊는다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>처음부터 논문의 복잡한 모델을 재현하려 한다 — 좌절만 남는다</li>
      <li>혼자 모든 걸 이해하려 한다 — 주변 사람과 AI 도구의 도움을 받는 것도 실력이다</li>
      <li>완벽한 코드를 추구한다 — 돌아가는 코드가 먼저이고, 정리는 그다음이다</li>
      <li>이론만 공부하고 코딩을 안 한다 — 수학 공식을 외워도 코드로 구현 못 하면 연구에 쓸 수 없다</li>
    </ul>
  </div>
</div>

---

## AI를 활용한 연구 워크플로우

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>모든 단계에서 AI는 보조 도구, 판단은 연구자의 몫이다</strong></p>
    <p>데이터 전처리(Pandas + AI가 코드 생성 보조) → 모델 개발(Copilot/Cursor로 빠르게 프로토타이핑) → 하이퍼파라미터 튜닝(Optuna 등 자동 탐색 활용) → 결과 시각화(AI에게 matplotlib 코드를 요청하고 디테일 수정) → 논문 작성(AI로 문법 교정, 표현 다듬기). 주의할 점: AI가 생성한 코드의 수치적 정확성은 반드시 직접 검증해야 한다. AI가 제안한 분석 방법이 자신의 문제에 적합한지 판단하는 것은 연구자의 역할이다.</p>
  </div>
</div>
