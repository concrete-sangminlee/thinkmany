## 필수 생산성 도구

대학원 연구는 논문, 코드, 데이터, 일정, 소통을 동시에 관리해야 하는 복합적인 작업이다. 적절한 도구를 조합하면 관리 부담을 줄이고 연구에 집중할 수 있다.

<div class="card-grid">
  <div class="card">
    <span class="card-tag tag-green">무료</span>
    <span class="card-icon">📓</span>
    <div class="card-title">Notion / Obsidian</div>
    <div class="card-desc">연구 노트, 논문 요약, 아이디어 정리를 위한 지식 관리 도구. Notion은 웹 기반으로 다양한 템플릿을 제공하고, Obsidian은 로컬 마크다운 기반으로 빠르고 검색이 강력하다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-green">무료</span>
    <span class="card-icon">💬</span>
    <div class="card-title">Slack / Teams</div>
    <div class="card-desc">연구실 소통의 중심. 채널별로 프로젝트를 분리하고, 파일 공유와 스레드 토론이 가능하다. 이메일보다 빠르고 비공식적인 논의에 적합하다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-green">무료</span>
    <span class="card-icon">📅</span>
    <div class="card-title">Google Calendar</div>
    <div class="card-desc">학회 마감일, 미팅, 실험 일정을 한눈에 관리한다. 저널 투고 마감, 학회 초록 제출일을 미리 등록하여 놓치지 않도록 한다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-green">무료</span>
    <span class="card-icon">✅</span>
    <div class="card-title">Trello / Todoist</div>
    <div class="card-desc">할 일 관리와 진행 상황 추적. 칸반 보드(Trello)나 리스트(Todoist)로 연구 태스크를 시각적으로 관리한다. 주간 목표를 설정하고 완료 여부를 체크한다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-green">무료</span>
    <span class="card-icon">📚</span>
    <div class="card-title">Zotero</div>
    <div class="card-desc">참고문헌 수집, 정리, 인용 삽입을 자동화하는 도구. 브라우저 확장으로 클릭 한 번에 논문을 저장하고, BibTeX/Word 플러그인으로 논문에 바로 삽입한다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-orange">일부 유료</span>
    <span class="card-icon">☁️</span>
    <div class="card-title">Cloud Storage</div>
    <div class="card-desc">Google Drive, Dropbox, OneDrive 중 하나는 반드시 사용한다. 데이터와 코드의 백업은 선택이 아니라 생존 전략이다. 학교 계정으로 제공되는 용량을 먼저 확인한다.</div>
  </div>
</div>

---

## 연구 워크플로우 자동화

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>반복 작업을 자동화하면 시간이 아닌 사고에 집중할 수 있다</strong></p>
    <p><strong>Makefile</strong> — 데이터 전처리, 시뮬레이션 실행, 그래프 생성, 논문 컴파일까지의 전체 파이프라인을 하나의 명령(<code>make all</code>)으로 실행한다. 의존성을 명시하면 변경된 부분만 자동으로 다시 실행된다.</p>
    <p><strong>Shell Script</strong> — 파일 정리, 배치 작업 제출, 결과 수집 등 반복적인 터미널 작업을 스크립트로 만든다. 매일 수동으로 하는 작업이 있다면 자동화 대상이다.</p>
    <p><strong>Python 자동화</strong> — 실험 데이터 파싱, 그래프 일괄 생성, 이메일 알림 등 복잡한 자동화에 활용한다. 시뮬레이션 파라미터 조합을 자동 생성하고 결과를 정리하는 스크립트를 작성해 둔다.</p>
  </div>
</div>

---

## 추천 조합

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>연구 스타일에 맞는 도구 세트</strong></p>
    <p><strong>미니멀 조합</strong> — 도구를 최소한으로 유지하고 싶은 경우. Obsidian(연구 노트) + Zotero(참고문헌) + Git(코드 버전 관리) + VS Code(코딩/글쓰기). 모두 로컬에서 작동하며, 인터넷 없이도 사용 가능하다. 마크다운 기반이라 이식성이 높다.</p>
    <p><strong>풀스택 조합</strong> — 협업이 많고 클라우드 기반으로 작업하는 경우. Notion(지식 관리) + Zotero(참고문헌) + GitHub(코드 협업) + Overleaf(논문 공동 집필) + Slack(소통). 모두 웹 기반이라 어디서든 접근 가능하다. 연구실 전체가 동일한 도구를 사용하면 효율이 극대화된다.</p>
    <p><strong>핵심 원칙:</strong> 도구가 많다고 좋은 것이 아니다. 자신이 실제로 매일 사용할 도구만 선택하고, 그 도구에 숙달되는 것이 중요하다.</p>
  </div>
</div>

---

## 연구 주간 워크플로우 예시

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-label">월요일</div>
    <div class="timeline-title">주간 계획 세우기</div>
    <div class="timeline-desc">Notion이나 Todoist에 이번 주 할 일을 정리한다. 지난주 미완료 항목을 옮기고, 우선순위를 매긴다. 지도교수 미팅이 있다면 보고할 내용과 질문 목록을 미리 준비한다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">화 - 목</div>
    <div class="timeline-title">집중 연구 시간</div>
    <div class="timeline-desc">핵심 연구 작업에 집중한다. 코드 변경은 Git으로 관리하고, 실험이나 시뮬레이션을 실행한다. 결과가 나오면 즉시 연구 노트에 기록하고, 그래프를 저장해 둔다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">금요일</div>
    <div class="timeline-title">주간 정리</div>
    <div class="timeline-desc">Zotero에 이번 주 읽은 논문을 추가하고 태그를 정리한다. 연구 노트에 주간 요약을 작성한다. 코드 리포지토리를 정리하고 커밋 메시지를 깔끔하게 남긴다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">주말</div>
    <div class="timeline-title">가벼운 회고 + 방향 설정</div>
    <div class="timeline-desc">이번 주 진행 상황을 돌아보고, 다음 주 방향을 간단히 설정한다. 무리하게 일하지 말고, 머리를 식히는 시간도 연구의 일부다.</div>
  </div>
</div>

---

## Makefile 자동화 예시

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>Makefile 하나로 연구 파이프라인 전체를 자동화할 수 있다</strong></p>
    <p><code>make run</code>(실험 실행) → <code>make plot</code>(그래프 생성) → <code>make paper</code>(LaTeX 컴파일)까지 한 번에 처리할 수 있다. 각 단계의 의존성을 명시해 두면, 데이터가 바뀌었을 때 그래프와 논문까지 자동으로 다시 생성된다.</p>
    <p>반복 작업을 자동화하면 실수가 줄고 재현성이 높아진다. "이 그래프를 어떤 스크립트로 만들었더라?"라는 고민이 사라지고, 누구든 <code>make all</code> 한 번으로 동일한 결과를 얻을 수 있다.</p>
  </div>
</div>

---

## 도구 과부하 경고

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>도구 세팅에 시간을 쓰느라 연구를 못 하는 함정에 빠지지 말 것</strong></p>
    <p>새로운 앱이 나올 때마다 설치하고, 설정을 만지고, 기존 데이터를 마이그레이션하느라 반나절을 쓰는 일이 반복되면 본말이 전도된 것이다.</p>
    <p>핵심 도구 3개 — 코드 에디터(VS Code), 논문 관리(Zotero), 노트(Notion 또는 Obsidian) — 만 제대로 쓰면 충분하다. 도구는 연구를 돕는 수단이지 목적이 아니다.</p>
  </div>
</div>
