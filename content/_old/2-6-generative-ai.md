## 연구에 생성형 AI를 쓰는 법

<div class="card-grid">
  <div class="card accent-blue">
    <span class="card-icon">📚</span>
    <div class="card-title">문헌 조사 보조</div>
    <div class="card-desc">관련 논문 요약, 연구 동향 파악, 핵심 키워드 추출에 활용한다. 탐색적 단계에서 시간을 크게 단축시킨다.</div>
  </div>
  <div class="card accent-purple">
    <span class="card-icon">💻</span>
    <div class="card-title">코딩 어시스턴트</div>
    <div class="card-desc">데이터 전처리 스크립트, 시각화 코드, 모델 구현의 초안을 빠르게 작성한다. 디버깅과 리팩토링에도 유용하다.</div>
  </div>
  <div class="card accent-cyan">
    <span class="card-icon">✍️</span>
    <div class="card-title">글쓰기 보조</div>
    <div class="card-desc">논문 초안 작성, 문법 교정, 영어 표현 개선에 활용한다. 특히 영어가 모국어가 아닌 연구자에게 유용하다.</div>
  </div>
  <div class="card accent-green">
    <span class="card-icon">💡</span>
    <div class="card-title">아이디어 브레인스토밍</div>
    <div class="card-desc">연구 방향 탐색, 방법론 비교, 실험 설계 시 다양한 관점을 빠르게 얻을 수 있다.</div>
  </div>
</div>

---

## 주요 도구

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🤖</span>
    <span class="card-tag tag-blue">범용</span>
    <div class="card-title">ChatGPT / Claude</div>
    <div class="card-desc">논문 요약, 코드 작성, 수식 설명, 글쓰기 보조 등 범용 목적으로 활용한다. 프롬프트 엔지니어링으로 품질을 높일 수 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">👨‍💻</span>
    <span class="card-tag tag-green">코드</span>
    <div class="card-title">GitHub Copilot</div>
    <div class="card-desc">IDE 내에서 실시간 코드 자동 완성을 제공한다. Python, MATLAB 등 연구용 코드 작성 속도를 크게 향상시킨다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🔎</span>
    <span class="card-tag tag-orange">논문 검색</span>
    <div class="card-title">Elicit / Consensus</div>
    <div class="card-desc">AI 기반 논문 검색 및 요약 도구. 연구 질문을 자연어로 입력하면 관련 논문을 찾아 핵심 내용을 정리해 준다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📄</span>
    <span class="card-tag tag-blue">LaTeX</span>
    <div class="card-title">Overleaf + AI</div>
    <div class="card-desc">LaTeX 문서 작성 중 AI 보조 기능을 활용한다. 수식 작성, 표 생성, 참고문헌 정리에 도움이 된다.</div>
  </div>
</div>

---

## 윤리적 가이드라인

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>보조 도구로 활용하고, 최종 판단은 반드시 연구자 본인이 한다</li>
      <li>AI가 생성한 내용의 출처와 정확성을 반드시 교차 검증한다</li>
      <li>논문에 AI 도구 사용 사실을 명시한다 (학회별 가이드라인 확인)</li>
      <li>프롬프트를 구체적으로 작성하여 결과 품질을 높인다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>AI 출력을 검증 없이 그대로 논문에 사용한다</li>
      <li>전체 논문을 AI로 작성하고 자신의 연구인 것처럼 제출한다</li>
      <li>존재하지 않는 참고문헌을 AI가 생성한 그대로 인용한다</li>
      <li>기밀 데이터나 미공개 연구 내용을 외부 AI 서비스에 입력한다</li>
    </ul>
  </div>
</div>

---

## 공학 연구에서의 한계

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>생성형 AI의 현실적 한계를 인식해야 한다</strong></p>
    <p><strong>수식 정확도</strong> — 복잡한 수학 유도나 단위 환산에서 오류가 빈번하다. 수식은 반드시 직접 검증해야 한다.</p>
    <p><strong>최신 논문 반영 부족</strong> — 학습 데이터의 시점 한계로 인해 최신 연구 동향을 정확히 반영하지 못할 수 있다.</p>
    <p><strong>Hallucination</strong> — 존재하지 않는 논문, 저자, 수치를 그럴듯하게 생성할 수 있다. 모든 사실 주장은 원본 소스에서 확인해야 한다.</p>
  </div>
</div>

---

## 프롬프트 엔지니어링 기초

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🎭</span>
    <div class="card-title">역할 지정</div>
    <div class="card-desc">AI에게 구체적인 역할을 부여하면 답변의 전문성이 올라간다. 예: "너는 Python 전문가야. 다음 코드의 버그를 찾아줘." 역할을 명시하면 AI가 해당 분야의 맥락에 맞춰 응답한다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🧩</span>
    <div class="card-title">맥락 제공</div>
    <div class="card-desc">연구 배경과 현재 상황을 알려줄수록 답변이 정확해진다. 예: "내 연구는 콘크리트 균열 탐지이고, 현재 ResNet50을 쓰고 있어." 맥락 없이 질문하면 일반적인 답변만 돌아온다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📋</span>
    <div class="card-title">단계별 지시</div>
    <div class="card-desc">복잡한 작업은 단계로 나누어 지시한다. 예: "1단계: 데이터 로드, 2단계: 전처리, 3단계: 모델 학습." 한 번에 모든 것을 요구하면 빠지는 단계가 생긴다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📐</span>
    <div class="card-title">출력 형식 지정</div>
    <div class="card-desc">원하는 출력 형태를 명시하면 후처리 시간이 줄어든다. 예: "표 형식으로 비교해줘" 또는 "코드만 출력해줘." 형식을 지정하지 않으면 불필요한 설명이 길어진다.</div>
  </div>
</div>

---

## 용도별 실전 프롬프트 예시

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s26-debug">코드 디버깅</button>
    <button class="tab-btn" data-tab="tab-s26-writing">논문 초안 교정</button>
    <button class="tab-btn" data-tab="tab-s26-literature">문헌 조사 보조</button>
  </div>
  <div class="tab-content active" id="tab-s26-debug">
    <p><strong>프롬프트 템플릿:</strong> "이 에러 메시지가 나온다: [에러 메시지 붙여넣기]. 원인과 해결책을 알려줘."</p>
    <p><strong>핵심 팁:</strong> 에러 메시지만 보내지 말고, 해당 코드의 관련 부분을 함께 첨부하는 것이 핵심이다. 어떤 라이브러리 버전을 쓰고 있는지, 어떤 환경(OS, Python 버전)인지도 알려주면 답변 정확도가 크게 올라간다.</p>
    <p><strong>예시:</strong> "Python 3.10, PyTorch 2.1 환경에서 다음 코드를 실행하면 RuntimeError: CUDA out of memory가 발생한다. 배치 크기는 64이고, 모델은 ResNet50이다. [코드 붙여넣기]"</p>
  </div>
  <div class="tab-content" id="tab-s26-writing">
    <p><strong>프롬프트 템플릿:</strong> "다음 문장을 학술 영어로 교정해줘. 원래 의미를 유지하되 더 자연스럽게 수정해줘."</p>
    <p><strong>핵심 팁:</strong> 논문 전체를 한꺼번에 넣지 말고, 한 문단씩 나누어 요청한다. 한꺼번에 넣으면 뒤쪽 내용의 교정 품질이 떨어진다. 교정 전후를 비교하며 표현을 학습하면 영어 실력도 함께 늘어난다.</p>
    <p><strong>예시:</strong> "다음 Abstract를 학술 영어로 교정해줘. 토목공학 저널 스타일에 맞춰줘: [문단 붙여넣기]"</p>
  </div>
  <div class="tab-content" id="tab-s26-literature">
    <p><strong>프롬프트 템플릿:</strong> "이 주제에 대한 최신 연구 동향을 정리해줘: [연구 주제]"</p>
    <p><strong>핵심 팁:</strong> AI가 알려주는 논문 제목과 저자는 반드시 Google Scholar에서 실제 존재 여부를 검증해야 한다. AI는 그럴듯하지만 존재하지 않는 논문을 생성하는 경우가 잦다. 실제 논문을 찾은 뒤에는 Semantic Scholar나 Connected Papers로 관련 논문을 확장하는 것이 효과적이다.</p>
    <p><strong>예시:</strong> "Physics-Informed Neural Networks를 구조 건전성 모니터링에 적용한 최신 연구 동향을 정리해줘. 2022년 이후 논문 위주로."</p>
  </div>
</div>

---

## 할루시네이션 탐지법

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>AI 출력은 반드시 검증한 뒤 사용해야 한다</strong></p>
    <p><strong>논문 인용 검증</strong> — AI가 인용한 논문이 실제로 존재하는지 Google Scholar에서 제목과 저자를 검색한다. 제목이 미묘하게 다르거나 저자 조합이 틀린 경우가 많다.</p>
    <p><strong>수식 검산</strong> — AI가 유도한 수식은 직접 손으로 유도하거나 Wolfram Alpha 등으로 교차 검증한다. 특히 단위 환산과 텐서 연산에서 오류가 빈번하다.</p>
    <p><strong>코드 실행 확인</strong> — AI가 작성한 코드는 반드시 실행하여 결과를 확인한다. 문법적으로 맞아 보여도 논리적 오류가 숨어 있을 수 있다.</p>
    <p><strong>출처 없는 주장 의심</strong> — "~한 연구가 있다", "~라고 알려져 있다"처럼 출처가 명시되지 않은 답변은 할루시네이션일 가능성이 높다. 구체적 출처를 요구하고, 그 출처를 다시 검증한다.</p>
  </div>
</div>
