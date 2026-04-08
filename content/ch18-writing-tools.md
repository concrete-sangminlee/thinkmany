# 연구는 도구로 완성된다

연구의 본질은 새로운 지식을 생산하는 것이지만, 그 지식이 논문으로 작성되고, 동료에게 공유되고, 학술지에 게재되기까지는 수많은 "작업"이 필요하다. 수식을 입력하고, 그래프를 논문에 삽입하고, 참고문헌을 정리하고, 영문 교정을 하고, 공동 저자와 소통하고, 마감일을 관리하고. 이 작업들을 효율적으로 처리하느냐 아니냐에 따라 같은 시간에 낼 수 있는 연구 성과가 크게 달라진다.

도구를 잘 고르고 잘 쓰는 것은 연구 생산성의 핵심이다. 하지만 동시에 도구에 매몰되어서는 안 된다. 새로운 생산성 앱이 나올 때마다 갈아타고, 워크플로우를 매달 재설계하고, 도구 설정에 연구보다 더 많은 시간을 쓰는 것은 본말전도다. 적절한 도구를 고르고, 익숙해지고, 일관되게 쓰는 것이 최선이다.

이 장에서는 논문 작성 도구, 참고문헌 관리, 영문 교정, 연구 생산성 도구, 그리고 이것들을 엮는 워크플로우까지 다룬다.

---

## 논문 작성 도구

### LaTeX vs Word: 영원한 논쟁

학술 논문을 작성하는 도구는 크게 두 가지로 나뉜다. LaTeX과 Microsoft Word. 어떤 것이 더 좋은지에 대한 논쟁은 수십 년째 계속되고 있고, 정답은 없다. 분야, 학술지, 개인 취향, 공동저자의 선호에 따라 달라진다.

**LaTeX**은 조판 시스템이다. 코드를 작성하면 그것이 컴파일되어 PDF 문서가 된다. 수식 표현이 아름답고, 참고문헌/번호/교차 참조가 자동 관리되며, 대규모 문서에서도 안정적이다. 수학, 물리, 컴퓨터 과학, 그리고 많은 공학 분야에서 학술지가 LaTeX 템플릿을 제공하며 사실상 표준이다.

LaTeX의 진입 장벽은 높다. 코드로 문서를 작성하는 것 자체가 낯설고, 표와 그림의 위치를 세밀하게 제어하려면 상당한 학습이 필요하다. 하지만 한 번 익히면 생산성이 크게 올라간다. 특히 수식이 많은 논문에서는 LaTeX의 효율이 압도적이다. Word에서 수식 편집기로 복잡한 방정식을 입력하는 고통을 겪어 본 사람이라면, LaTeX의 수식 문법이 얼마나 간결하고 아름다운지 바로 체감할 것이다.

**Word**는 WYSIWYG(What You See Is What You Get) 편집기의 대표다. 화면에 보이는 대로 출력된다. 직관적이고, 별도의 학습 없이 바로 사용할 수 있다. Track Changes 기능은 공동 저자 간의 교정과 코멘트에 매우 유용하다. 생명과학, 의학, 일부 공학 분야에서는 Word가 표준이다.

Word의 문제는 대규모 문서에서 드러난다. 논문이 50페이지를 넘어가면 Word가 느려지고, 그림 위치가 갑자기 틀어지고, 번호가 꼬이는 일이 빈번하다. 수식이 많은 문서에서는 더 심하다. 또한 수식의 미적 품질이 LaTeX에 비해 명확히 떨어진다.

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-ch18-latex">LaTeX 추천 상황</button>
    <button class="tab-btn" data-tab="tab-ch18-word">Word 추천 상황</button>
    <button class="tab-btn" data-tab="tab-ch18-typst">Typst (신생)</button>
  </div>
  <div class="tab-content active" id="tab-ch18-latex">
    <p><strong>수식이 많은 논문</strong>: 편미분방정식, 텐서 표기법, 행렬 유도 등이 포함된 논문이라면 LaTeX이 사실상 유일한 선택이다.</p>
    <p><strong>학술지가 LaTeX 템플릿을 제공하는 경우</strong>: 대부분의 IEEE, ASCE, Elsevier 저널이 LaTeX 템플릿을 제공한다. 템플릿을 쓰면 형식 맞추기에 시간을 들일 필요가 없다.</p>
    <p><strong>대규모 문서</strong>: 학위논문(석사 100페이지, 박사 200페이지 이상)에서 LaTeX은 안정적이다. 챕터별로 파일을 나누어 관리할 수 있다.</p>
    <p><strong>버전 관리가 필요한 경우</strong>: LaTeX 파일은 텍스트이므로 Git으로 변경 이력을 추적할 수 있다. Word 파일은 바이너리이므로 Git과 궁합이 맞지 않는다.</p>
  </div>
  <div class="tab-content" id="tab-ch18-word">
    <p><strong>공동저자가 Word를 쓰는 경우</strong>: 교수님이나 공동저자가 Word를 선호하면 Word를 써야 한다. Track Changes로 교정을 주고받는 워크플로우가 확립된 경우 LaTeX으로 바꾸자고 하면 마찰만 생긴다.</p>
    <p><strong>학술지가 Word만 받는 경우</strong>: 일부 저널은 Word 템플릿만 제공한다. 이 경우 LaTeX으로 쓰고 변환하는 것보다 처음부터 Word로 쓰는 것이 낫다.</p>
    <p><strong>수식이 거의 없는 논문</strong>: 정성적 분석, 리뷰 논문, 케이스 스터디 등 수식이 거의 없는 논문이라면 LaTeX의 이점이 크지 않다.</p>
    <p><strong>빠르게 초고를 써야 하는 경우</strong>: 마감이 촉박할 때 LaTeX의 컴파일 사이클이 부담이 된다면, Word의 즉각적 편집이 더 효율적일 수 있다.</p>
  </div>
  <div class="tab-content" id="tab-ch18-typst">
    <p><strong>Typst</strong>는 2023년에 공개된 새로운 조판 시스템이다. LaTeX의 기능을 유지하면서 문법을 훨씬 간결하게 만들었다. 컴파일 속도가 즉각적이고, 웹 에디터도 제공한다. LaTeX 대비 학습 곡선이 낮고, 현대적인 문법이 매력적이다.</p>
    <p>단, 아직 학술지 템플릿이 부족하고, 커뮤니티 규모가 작으며, 기존 LaTeX 생태계(패키지, 템플릿)와의 호환성이 없다. 미래에 LaTeX의 대안이 될 가능성이 있지만, 2025년 현재로서는 논문 작성의 주력 도구로 쓰기에는 이르다. 개인 문서나 프레젠테이션 용도로 먼저 시도해 보는 것을 권한다.</p>
  </div>
</div>

결론적으로, 내 분야와 연구실에서 무엇을 쓰는지를 먼저 확인하라. 연구실의 기존 논문들이 LaTeX이면 LaTeX을, Word이면 Word를 배우는 것이 가장 실용적이다. 둘 다 처음이라면, 공학 분야에서는 LaTeX을 배우는 것을 추천한다. 초기 학습 비용을 들이면 이후 모든 논문 작성이 편해진다.

---

## LaTeX 입문

LaTeX을 처음 시작한다면, Overleaf(overleaf.com)에서 시작하는 것을 강력 추천한다. 로컬에 LaTeX을 설치할 필요가 없고, 브라우저에서 바로 편집하고 컴파일할 수 있다. 무료 계정으로도 충분히 사용 가능하다. 공동 편집도 지원해서, 구글 독스처럼 여러 사람이 동시에 편집할 수 있다.

### 기본 문서 구조

LaTeX 문서는 텍스트 안에 명령어(backslash로 시작하는)를 넣어서 구조와 형식을 지정한다. 기본 구조는 다음과 같다.

```latex
\documentclass[12pt]{article}
\usepackage{amsmath}        % 수식
\usepackage{graphicx}       % 그림
\usepackage{booktabs}       % 깔끔한 표
\usepackage[utf8]{inputenc} % 한글 지원

\title{논문 제목}
\author{이름}
\date{\today}

\begin{document}
\maketitle

\section{서론}
내용...

\section{방법}
내용...

\end{document}
```

이것이 LaTeX의 전부는 아니지만, 이 구조를 이해하면 나머지는 필요할 때 검색해서 쓸 수 있다. Overleaf에는 IEEE, Elsevier, ASCE 등 주요 학술지의 템플릿이 갤러리에 올라와 있다. 템플릿을 열고, 내용만 바꾸면 된다.

### 수식

LaTeX의 진가가 드러나는 부분이다. 인라인 수식은 `$E = mc^2$`처럼 달러 기호 사이에 넣고, 별도 줄의 수식은 `equation` 환경을 쓴다.

```latex
\begin{equation}
  \sigma_{ij} = C_{ijkl} \varepsilon_{kl}
  \label{eq:constitutive}
\end{equation}
```

이 코드가 컴파일되면 아름다운 수식이 자동 번호와 함께 출력된다. `\ref{eq:constitutive}`으로 본문에서 "식 (1)"과 같이 참조할 수 있고, 수식이 추가되거나 삭제되어도 번호가 자동으로 갱신된다.

### 표와 그림

표는 `tabular` 환경으로, 그림은 `\includegraphics` 명령으로 삽입한다. 처음에는 표의 형식 지정이 까다롭게 느껴지지만, 템플릿을 하나 만들어두면 이후에는 내용만 바꾸면 된다. 온라인 LaTeX 표 생성기(tablesgenerator.com)를 활용하면 GUI에서 표를 만들고 LaTeX 코드를 생성할 수 있어 편리하다.

그림은 PDF, PNG, JPG 형식을 지원한다. 벡터 그래픽(PDF)을 사용하면 확대해도 깨지지 않으므로, matplotlib에서 그래프를 그릴 때 `plt.savefig("figure.pdf")`로 PDF로 저장하는 것을 권한다.

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>LaTeX 학습의 핵심 전략</strong></p>
<p>LaTeX을 "마스터"하려고 하지 마라. 학술지 템플릿을 열고, 기존 논문(연구실 선배 것이 가장 좋다)의 LaTeX 소스를 읽으며 필요한 부분만 배우는 것이 가장 빠르다. 수식 문법은 쓰다 보면 손에 익고, 나머지는 그때그때 검색하면 된다. Overleaf의 공식 튜토리얼("Learn LaTeX in 30 minutes")이 가장 효율적인 입문 자료다.</p>
</div>
</div>

---

## 참고문헌 관리

논문 하나에 참고문헌이 30-50개는 기본이다. 학위논문이면 100개가 넘는다. 이것을 수동으로 관리하면 미치게 된다. 저자명 표기 형식, 연도, 저널명, 볼륨, 페이지 번호 등 이 모든 것을 학술지의 형식에 맞춰 일일이 입력하고, 논문에서 인용 순서가 바뀔 때마다 번호를 다시 매기고. 참고문헌 관리 도구는 이 작업을 자동화해준다.

### 도구 비교

<div class="card-grid">
  <div class="card">
    <span class="card-icon">📚</span>
    <div class="card-title">Zotero</div>
    <div class="card-desc">무료, 오픈소스. 브라우저 확장(Zotero Connector)으로 웹에서 클릭 한 번에 논문을 저장한다. Word/LaTeX 플러그인 지원. 그룹 라이브러리로 연구실 공유 가능. 300MB 무료 클라우드 저장소.</div>
  </div>
  <div class="card">
    <span class="card-icon">📖</span>
    <div class="card-title">Mendeley</div>
    <div class="card-desc">Elsevier 소유. PDF 관리와 주석 기능이 편리하다. 무료 계정 2GB 저장소. 하지만 최근 업데이트가 느리고, Elsevier의 데이터 정책에 대한 우려가 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📕</span>
    <div class="card-title">EndNote</div>
    <div class="card-desc">유료. 오래된 역사, 학교에서 라이선스를 제공하는 경우가 있다. Word와의 연동이 매우 강하다. 하지만 비싸고, 인터페이스가 구식이며, LaTeX 연동이 약하다.</div>
  </div>
</div>

새로 시작한다면 **Zotero를 추천한다.** 무료이고, 기능이 충분하고, 커뮤니티가 활발하다. 특히 Zotero의 브라우저 확장은 게임 체인저다. Google Scholar, PubMed, 학술지 웹사이트에서 논문을 찾으면, Zotero 아이콘을 클릭하는 것만으로 제목, 저자, 연도, DOI 등의 메타데이터와 PDF 파일이 자동으로 저장된다. 수동으로 입력할 필요가 없다.

### Zotero → LaTeX/Overleaf 워크플로우

Zotero와 LaTeX을 연동하는 가장 효율적인 방법은 Better BibTeX 플러그인을 사용하는 것이다.

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-label">Step 1</div>
    <div class="timeline-title">Zotero에 Better BibTeX 설치</div>
    <div class="timeline-desc">Zotero의 플러그인으로 Better BibTeX를 설치한다. 각 문헌에 고유한 citation key(예: Lee2025finite)를 자동 생성한다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">Step 2</div>
    <div class="timeline-title">.bib 파일 자동 내보내기</div>
    <div class="timeline-desc">Zotero 컬렉션을 .bib 파일로 자동 내보내기 설정한다. 논문을 추가/수정하면 .bib 파일이 자동 갱신된다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">Step 3</div>
    <div class="timeline-title">LaTeX에서 인용</div>
    <div class="timeline-desc">LaTeX 문서에서 <code>\cite{Lee2025finite}</code>으로 인용한다. 컴파일하면 학술지 형식에 맞는 참고문헌 목록이 자동 생성된다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">Step 4</div>
    <div class="timeline-title">Overleaf에 업로드</div>
    <div class="timeline-desc">Overleaf에서 작업한다면, .bib 파일을 프로젝트에 업로드하고 동기화한다. Zotero에 논문을 추가하면 .bib 파일이 업데이트되고, Overleaf에서 바로 인용할 수 있다.</div>
  </div>
</div>

이 워크플로우를 한 번 설정하면, 이후 논문을 쓸 때 참고문헌 관리에 드는 시간이 거의 0에 수렴한다. 논문을 찾으면 Zotero에 저장하고, LaTeX에서 cite 명령으로 인용하고, 나머지는 자동이다. 형식 변환(APA → IEEE → Chicago 등)도 bibliography style만 바꾸면 자동으로 변환된다.

---

## 영문 교정 도구

한국어가 모국어인 연구자에게 영어 논문 작성은 이중의 부담이다. 연구 내용을 영어로 표현하는 것 자체가 어렵고, 문법, 어휘, 문체까지 신경 써야 한다. 다행히 좋은 도구들이 있다.

**Grammarly**: 영문 교정의 대표 도구. 무료 버전으로도 기본 문법 오류와 맞춤법을 교정한다. Premium(유료)은 문체, 어조, 명확성까지 제안한다. 브라우저 확장, Word 플러그인, 독립 앱으로 사용 가능하다. 학술 영어에 특화된 것은 아니지만, 기초적인 문법 오류를 잡는 데 매우 효과적이다.

**DeepL**: 번역 도구이지만 영문 교정에도 활용할 수 있다. 한국어로 쓴 문장을 DeepL로 영어로 번역하면, 문법적으로 정확하고 자연스러운 영어 문장이 나온다. 이것을 출발점으로 삼아 학술적 어조로 다듬는 전략이 효과적이다. 다만 번역기가 의미를 미묘하게 바꾸는 경우가 있으므로, 반드시 검토해야 한다.

**ChatGPT / Claude**: AI 언어 모델을 영문 교정에 활용하는 것은 이제 매우 보편화되었다. "다음 문장을 학술 영어로 교정해 주세요"라고 요청하면, 문법 교정뿐 아니라 문체 개선, 표현 다양화, 문장 구조 재편까지 해준다.

<div class="highlight-box warning">
<span class="highlight-box-icon">⚠️</span>
<div class="highlight-box-content">
<p><strong>AI 교정 도구의 한계와 윤리</strong></p>
<p>AI 도구는 강력하지만, 주의할 점이 있다. 첫째, AI가 의미를 바꿀 수 있다. 문법적으로 더 자연스러운 문장을 생성하면서 원래 뜻과 미묘하게 달라지는 경우가 있다. 기술 용어가 일반적인 단어로 바뀌거나, 인과관계의 방향이 달라지거나. 교정 결과를 무조건 수용하지 말고, 원래 의미가 보존되었는지 반드시 확인해야 한다. 둘째, 학술지마다 AI 사용에 대한 정책이 다르다. AI 도구를 사용했다면 논문에 이를 밝혀야 하는 저널이 늘어나고 있다. 투고 전에 해당 학술지의 AI 관련 정책을 확인하라.</p>
</div>
</div>

영문 교정의 최종 책임은 저자에게 있다. 어떤 도구를 쓰든, 최종 문장을 읽고 "이것이 내가 말하려는 것이 맞는가?"를 판단하는 것은 본인이다. 도구는 문법과 표현을 도와줄 뿐이지, 연구 내용의 정확성을 보장하지는 않는다.

---

## 생산성 도구

논문 작성 외에도, 대학원 생활에는 수많은 "관리" 작업이 있다. 읽은 논문 정리, 연구 아이디어 기록, 미팅 메모, 일정 관리, 할 일 추적, 동료와의 소통. 이것들을 어떤 도구로 어떻게 관리할 것인지를 결정해야 한다.

### 연구 노트

연구 노트는 연구 과정의 모든 것을 기록하는 곳이다. 실험 설정, 코드 변경 사항, 아이디어, 논문 메모, 미팅 내용. 수첩에 손으로 써도 되고, 디지털 도구를 써도 된다. 중요한 것은 기록을 하는 것이지 도구가 아니다. 하지만 검색과 정리의 편의를 생각하면 디지털이 유리하다.

**Notion**: 올인원 워크스페이스. 문서, 데이터베이스, 칸반 보드, 캘린더를 하나의 도구에서 관리한다. 기능이 풍부하지만, 그만큼 설정에 시간이 걸린다. "Notion 세팅에 3일 쓰고, 정작 연구는 안 하는" 함정에 빠지기 쉽다. 팀 협업에 강하다.

**Obsidian**: 로컬 마크다운 기반 노트 앱. 파일이 내 컴퓨터에 일반 텍스트(.md)로 저장되므로, 특정 서비스에 종속되지 않는다. 양방향 링크로 노트 간 연결이 가능해서, 아이디어의 네트워크를 구축할 수 있다. 개인 지식 관리에 최적이다.

둘 중 하나를 고르자면, 혼자 연구하는 대학원생에게는 Obsidian을, 팀 프로젝트가 많은 경우에는 Notion을 추천한다. 하지만 솔직히 말하면, 어떤 도구를 쓰든 꾸준히 기록하는 것이 도구 선택보다 100배 중요하다.

### 일정 관리

Google Calendar를 쓰면 된다. 복잡하게 생각할 것 없다. 수업, 세미나, 미팅, 마감일, 학회 일정을 Google Calendar에 넣고, 알림을 설정한다. 지도교수님과 공유 캘린더를 만들면 미팅 잡기가 편해진다.

### 할 일 관리

할 일(To-do) 관리에 도구가 필요한가? 단순한 체크리스트면 종이에 써도 된다. 하지만 프로젝트가 여러 개 동시에 돌아가고, 각각의 마감이 다르고, 우선순위를 정리해야 한다면, 디지털 도구가 도움이 된다.

**Todoist**: 깔끔하고 가볍다. 프로젝트별로 할 일을 분류하고, 마감일을 설정하고, 우선순위를 매길 수 있다. 무료 버전으로 충분하다.

**Trello**: 칸반 보드 방식. "할 일 → 진행 중 → 완료" 형태로 시각적으로 관리한다. 논문 작성 과정(초고 → 교정 → 투고)을 추적하기에 직관적이다.

### 소통 도구

**Slack**: 연구실이나 프로젝트 팀에서 많이 쓰는 메시징 도구. 채널별로 주제를 분리할 수 있어서, 이메일보다 빠르고 조직적이다. 파일 공유, 코드 스니펫, 봇 연동 등의 기능이 있다.

**Microsoft Teams**: 학교에서 Office 365를 제공하면 무료로 사용 가능하다. 화상 회의, 채팅, 파일 공유를 통합한다. Slack과 기능이 비슷하지만, 학교 시스템과의 연동이 편리한 경우가 있다.

<div class="highlight-box warning">
<span class="highlight-box-icon">⚠️</span>
<div class="highlight-box-content">
<p><strong>도구 과부하 경고</strong></p>
<p>생산성 도구의 역설이 있다. 도구가 너무 많으면 오히려 생산성이 떨어진다. 노트는 Notion에, 할 일은 Todoist에, 논문 메모는 Obsidian에, 캘린더는 Google에, 소통은 Slack과 이메일과 카톡에. 이렇게 정보가 5개 도구에 분산되면 아무것도 찾을 수 없게 된다. 도구는 최소한으로 유지하라. 하나의 도구가 여러 기능을 충분히 해낸다면, 굳이 기능별로 다른 도구를 쓸 필요가 없다. "Best tool for each job"이 아니라 "Good enough tool for most jobs"가 대학원생에게는 맞는 전략이다.</p>
</div>
</div>

---

## 연구 워크플로우 자동화

반복되는 작업을 자동화하면 시간을 절약하고 실수를 줄일 수 있다. 논문에 들어갈 결과를 매번 수동으로 만드는 대신, 코드 한 줄로 전 과정을 실행할 수 있다면?

### Makefile: 한 줄로 모든 것을

`Makefile`은 빌드 자동화 도구다. 원래 C/C++ 컴파일을 위해 만들어졌지만, 연구 워크플로우 자동화에도 매우 유용하다.

```makefile
# Makefile 예시
all: data analysis plots paper

data:
	python scripts/download_data.py

analysis:
	python scripts/run_simulation.py

plots:
	python scripts/generate_figures.py

paper:
	cd paper && pdflatex main.tex && bibtex main && pdflatex main.tex && pdflatex main.tex

clean:
	rm -f results/*.csv figures/*.pdf paper/*.aux paper/*.bbl
```

터미널에서 `make`를 실행하면, 데이터 다운로드 → 시뮬레이션 실행 → 그래프 생성 → 논문 컴파일이 순서대로 자동 실행된다. `make plots`으로 그래프만 다시 만들 수도 있다.

### 셸 스크립트

Makefile이 부담스러우면, 셸 스크립트(bash script)로도 간단한 자동화가 가능하다. `run_experiment.sh`라는 파일에 실행 명령들을 순서대로 적어두고, `bash run_experiment.sh`로 한 번에 실행한다.

```bash
#!/bin/bash
echo "=== 실험 시작 ==="
python preprocess.py --input data/raw/ --output data/processed/
python train.py --config configs/exp01.yaml
python evaluate.py --model results/model.pt
python plot.py --results results/metrics.csv
echo "=== 실험 완료 ==="
```

이런 자동화의 핵심 가치는 **재현성**이다. 스크립트를 공유하면, 다른 사람이 같은 명령을 같은 순서로 실행할 수 있다. "이 논문의 결과를 재현하려면 이 스크립트를 실행하세요"라고 말할 수 있다.

---

## 추천 도구 조합

도구 선택에 정답은 없지만, 두 가지 조합을 제안한다.

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-ch18-minimal">미니멀 조합</button>
    <button class="tab-btn" data-tab="tab-ch18-full">풀스택 조합</button>
  </div>
  <div class="tab-content active" id="tab-ch18-minimal">
    <p><strong>미니멀 조합: 도구 4개로 충분하다</strong></p>
    <p><strong>코드 에디터:</strong> VS Code. 코딩, 마크다운 편집, 터미널, Git 연동을 하나에서 처리한다.</p>
    <p><strong>참고문헌:</strong> Zotero. 무료이고, 브라우저 확장으로 논문 저장 및 BibTeX 내보내기를 지원한다.</p>
    <p><strong>버전 관리:</strong> Git + GitHub. 코드와 논문 소스의 이력 관리 및 백업.</p>
    <p><strong>연구 노트:</strong> Obsidian. 로컬 마크다운 파일 기반으로, 검색과 링크가 간결하다.</p>
    <p>이 조합은 모두 무료(또는 무료 버전 충분)이고, 가볍고, 서로 간섭하지 않는다. 혼자 연구하는 석사/박사 학생에게 추천한다.</p>
  </div>
  <div class="tab-content" id="tab-ch18-full">
    <p><strong>풀스택 조합: 팀 협업과 생산성 극대화</strong></p>
    <p><strong>코드 에디터:</strong> VS Code + Jupyter. 코딩과 탐색적 분석을 분리한다.</p>
    <p><strong>논문 작성:</strong> Overleaf. 클라우드 기반 LaTeX으로 공동 편집을 지원한다.</p>
    <p><strong>참고문헌:</strong> Zotero + Better BibTeX. Overleaf와 자동 동기화된다.</p>
    <p><strong>버전 관리:</strong> Git + GitHub. 코드 관리와 CI/CD가 가능하다.</p>
    <p><strong>프로젝트 관리:</strong> Notion. 연구 노트, 미팅 기록, 진행 상황 추적, 팀 공유에 활용한다.</p>
    <p><strong>소통:</strong> Slack. 연구실 채널과 프로젝트 채널을 분리하여 사용한다.</p>
    <p>이 조합은 도구가 많지만, 각각의 역할이 명확하고 중복이 적다. 3인 이상의 팀 프로젝트, 또는 여러 프로젝트를 동시에 진행하는 고학년 박사에게 적합하다.</p>
  </div>
</div>

어떤 조합을 선택하든, 핵심 원칙은 같다. 도구는 연구를 돕기 위해 존재한다. 도구를 세팅하고 관리하는 데 들이는 시간이 도구가 절약해 주는 시간보다 많다면, 그 도구는 필요 없다. 단순하게 시작하고, 필요할 때 하나씩 추가하라. 그리고 가장 중요한 것은 어떤 도구를 쓰든 꾸준히, 일관되게 쓰는 것이다.

---

## 도구보다 중요한 것

이 장 전체에서 수많은 도구를 소개했다. LaTeX, Overleaf, Zotero, Grammarly, Notion, Obsidian, Slack, Makefile. 하지만 솔직히 말해야 할 것이 있다. 도구를 아무리 잘 갖춰도, 연구를 대신해 주지는 않는다.

가장 생산적인 연구자를 관찰해 보면, 그들이 반드시 가장 좋은 도구를 쓰는 것은 아니다. 어떤 교수는 아직도 emacs에서 LaTeX을 쓰고, 참고문헌을 수동으로 관리하고, 이메일로 모든 소통을 한다. 하지만 매년 고품질 논문을 여러 편 낸다. 도구가 아니라 습관과 집중력이 생산성의 진짜 원천이기 때문이다.

매일 30분씩 논문을 쓰는 습관, 읽은 논문을 바로 정리하는 습관, 코드를 수정하면 바로 커밋하는 습관, 아이디어가 떠오르면 즉시 적는 습관. 이런 습관들이 어떤 도구보다 강력하다. 도구는 이 습관을 지원하는 인프라일 뿐이다.

도구에 대한 조언을 한 문장으로 요약하면 이것이다. **"쓸 만한 도구를 골라서, 익숙해질 때까지 쓰고, 쓸데없이 바꾸지 마라."** 6개월마다 새로운 노트 앱으로 갈아타는 것보다, 하나의 도구에 모든 기록을 꾸준히 쌓는 것이 100배 더 가치 있다.