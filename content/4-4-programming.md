## 공학 연구의 프로그래밍 언어

대학원 연구에서 프로그래밍은 선택이 아니라 필수다. 데이터 분석, 시뮬레이션 자동화, 논문 그래프 생성까지 모든 단계에서 코딩이 필요하다. 자신의 연구 분야와 목적에 맞는 언어를 선택하되, 최소 하나는 능숙하게 다룰 수 있어야 한다.

<div class="card-grid">
  <div class="card">
    <span class="card-tag tag-green">범용</span>
    <span class="card-icon">🐍</span>
    <div class="card-title">Python</div>
    <div class="card-desc">가장 범용적인 선택. 데이터 분석(pandas/numpy), 머신러닝(PyTorch/scikit-learn), 시각화(matplotlib), 자동화 스크립트까지 모두 커버한다. 공학 대학원생의 첫 번째 언어로 추천한다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-blue">학교 라이선스</span>
    <span class="card-icon">📐</span>
    <div class="card-title">MATLAB</div>
    <div class="card-desc">행렬 연산, 신호 처리, 제어 시스템에 특화되어 있다. Simulink와의 연동이 강점이다. 대부분의 대학에서 캠퍼스 라이선스를 제공하므로 무료로 사용 가능하다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-orange">고성능</span>
    <span class="card-icon">⚡</span>
    <div class="card-title">C/C++</div>
    <div class="card-desc">실행 속도가 중요한 대규모 시뮬레이션 코드에 사용된다. OpenFOAM, LAMMPS 등 오픈소스 해석기의 소스 수정 시 필수적이다. 메모리 관리에 대한 이해가 필요하다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-green">과학계산</span>
    <span class="card-icon">🚀</span>
    <div class="card-title">Julia</div>
    <div class="card-desc">Python의 편의성과 C의 속도를 결합한 과학 계산 특화 언어. 수치 해석, 미분방정식 풀이에서 성능이 뛰어나다. 생태계가 빠르게 성장 중이다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-blue">통계</span>
    <span class="card-icon">📊</span>
    <div class="card-title">R</div>
    <div class="card-desc">통계 분석과 데이터 시각화의 전통적 강자. ggplot2로 출판 품질의 그래프를 빠르게 생성할 수 있다. 실험 데이터의 통계 검증에 유용하다.</div>
  </div>
</div>

---

## 개발 환경 설정

코드를 작성하기 전에 개발 환경부터 제대로 갖춘다. 처음에 투자하는 시간이 이후 수년간의 효율을 결정한다.

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s44-ide">IDE / 에디터</button>
    <button class="tab-btn" data-tab="tab-s44-git">버전 관리</button>
    <button class="tab-btn" data-tab="tab-s44-pkg">패키지 관리</button>
  </div>
  <div class="tab-content active" id="tab-s44-ide">
    <p><strong>VS Code</strong> — 무료이며 확장 기능이 풍부하다. Python, C++, LaTeX, Markdown을 하나의 에디터에서 모두 다룰 수 있다. Remote-SSH 확장으로 서버 작업도 가능하다.</p>
    <p><strong>PyCharm</strong> — Python 전용 IDE. 디버깅, 리팩토링, 테스트 기능이 강력하다. Community 버전은 무료다.</p>
    <p><strong>Jupyter Notebook/Lab</strong> — 코드, 결과, 설명을 한 문서에 담는다. 탐색적 데이터 분석과 프로토타이핑에 적합하다. 단, 대규모 프로젝트에는 적합하지 않다.</p>
  </div>
  <div class="tab-content" id="tab-s44-git">
    <p><strong>Git + GitHub는 필수다.</strong> 코드의 모든 변경 이력을 추적하고, 실수로 삭제한 코드를 복구할 수 있다. 논문 리비전 때 "3개월 전 버전의 코드"를 찾아야 할 때 생명줄이 된다.</p>
    <p><strong>기본 워크플로우:</strong> git add → git commit → git push를 매일 반복한다. 브랜치를 활용하면 실험적 시도를 안전하게 수행할 수 있다.</p>
    <p><strong>GitHub/GitLab</strong>은 원격 저장소이자 협업 플랫폼이다. 연구실 동료와 코드를 공유하고, 졸업 후에도 포트폴리오로 활용 가능하다.</p>
  </div>
  <div class="tab-content" id="tab-s44-pkg">
    <p><strong>conda</strong> — Python + 비Python 패키지를 함께 관리한다. 환경 분리가 쉬워서 프로젝트별 독립 환경을 만들 수 있다. Miniconda로 가볍게 시작한다.</p>
    <p><strong>pip + venv</strong> — Python 표준 패키지 관리자. venv로 가상환경을 만들고, requirements.txt로 의존성을 기록한다.</p>
    <p><strong>원칙:</strong> 프로젝트마다 독립된 가상환경을 만든다. 시스템 Python에 직접 패키지를 설치하지 않는다. 환경 설정 파일(environment.yml 또는 requirements.txt)을 반드시 저장소에 포함한다.</p>
  </div>
</div>

---

## 코딩 습관

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>연구 코드도 소프트웨어다</strong></p>
    <p><strong>매일 커밋한다.</strong> "작동하는 상태"에서 자주 커밋해야 문제 발생 시 되돌릴 수 있다. 커밋 메시지에 변경 이유를 간결하게 적는다.</p>
    <p><strong>README를 작성한다.</strong> 프로젝트 구조, 실행 방법, 의존성을 기록한다. 6개월 후의 자신이 가장 큰 수혜자가 된다.</p>
    <p><strong>코드에 주석을 단다.</strong> "무엇"보다 "왜"를 설명한다. 수식의 출처(논문, 교과서 페이지)를 주석에 명시한다.</p>
    <p><strong>requirements.txt를 관리한다.</strong> 다른 환경에서 동일한 결과를 재현하려면 패키지 버전을 고정해야 한다.</p>
  </div>
</div>

---

## Python vs MATLAB 결정

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>어떤 언어를 먼저 배울까?</strong></p>
    <p>연구실에서 이미 MATLAB을 쓰고 있다면 MATLAB부터 배운다. 선배의 코드를 이해하고 협업하는 것이 우선이다. 새 프로젝트를 시작하거나 ML을 쓸 계획이면 Python을 추천한다. 무료이고, 라이브러리 생태계가 압도적이며, 취업 시장에서도 더 유리하다. 둘 다 배울 여유가 있다면 Python을 메인으로 잡고, MATLAB은 필요할 때 보조로 활용하는 전략이 효율적이다.</p>
  </div>
</div>

---

## Git 실전 워크플로우

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🌿</div>
    <div class="pipeline-step-title">branch 생성</div>
    <div class="pipeline-step-desc">feature/실험명으로 새 브랜치를 만든다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔧</div>
    <div class="pipeline-step-title">코드 수정 및 테스트</div>
    <div class="pipeline-step-desc">실험 코드를 작성하고 동작을 확인한다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">💾</div>
    <div class="pipeline-step-title">commit</div>
    <div class="pipeline-step-desc">변경 내용을 명확히 기록한다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">☁️</div>
    <div class="pipeline-step-title">push</div>
    <div class="pipeline-step-desc">원격 저장소에 백업한다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔀</div>
    <div class="pipeline-step-title">PR/merge</div>
    <div class="pipeline-step-desc">완료된 실험을 main에 통합한다</div>
  </div>
</div>
