# 연구는 도구로 완성된다

연구의 본질은 새로운 지식을 생산하는 것이지만, 그 지식이 논문으로 작성되고, 동료에게 공유되고, 학술지에 게재되기까지는 수많은 "작업"이 필요하다. 수식을 입력하고, 그래프를 논문에 삽입하고, 참고문헌을 정리하고, 영문 교정을 하고, 공동 저자와 소통하고, 마감일을 관리하고. 이 작업들을 효율적으로 처리하느냐 아니냐에 따라 같은 시간에 낼 수 있는 연구 성과가 크게 달라진다.

도구를 잘 고르고 잘 쓰는 것은 연구 생산성의 핵심이다. 그러나 동시에 도구에 매몰되어서는 안 된다. 새로운 생산성 앱이 나올 때마다 갈아타고, 워크플로우를 매달 재설계하고, 도구 설정에 연구보다 더 많은 시간을 쓰는 것은 본말전도다. 적절한 도구를 고르고, 익숙해지고, 일관되게 쓰는 것이 최선이다.

이 장에서는 논문 작성 도구, 참고문헌 관리, 영문 교정, 연구 생산성 도구, 그리고 이것들을 엮는 워크플로우까지 다룬다.

---

## 논문 작성 도구

### LaTeX vs Word: 영원한 논쟁

학술 논문을 작성하는 도구는 크게 두 가지로 나뉜다. LaTeX과 Microsoft Word. 어떤 것이 더 좋은지에 대한 논쟁은 수십 년째 계속되고 있고, 정답은 없다. 분야, 학술지, 개인 취향, 공동저자의 선호에 따라 달라진다.

**LaTeX**은 조판 시스템이다. 코드를 작성하면 그것이 컴파일되어 PDF 문서가 된다. 수식 표현이 아름답고, 참고문헌/번호/교차 참조가 자동 관리되며, 대규모 문서에서도 안정적이다. 수학, 물리, 컴퓨터 과학, 그리고 많은 공학 분야에서 학술지가 LaTeX 템플릿을 제공하며 사실상 표준이다.

LaTeX의 진입 장벽은 높다. 코드로 문서를 작성하는 것 자체가 낯설고, 표와 그림의 위치를 세밀하게 제어하려면 상당한 학습이 필요하다. 그럼에도 한 번 익히면 생산성이 크게 올라간다. 특히 수식이 많은 논문에서는 LaTeX의 효율이 압도적이다. Word에서 수식 편집기로 복잡한 방정식을 입력하는 고통을 겪어 본 사람이라면, LaTeX의 수식 문법이 얼마나 간결하고 아름다운지 바로 체감할 것이다.

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
    <p>단, 아직 학술지 템플릿이 부족하고, 커뮤니티 규모가 작으며, 기존 LaTeX 생태계(패키지, 템플릿)와의 호환성이 없다. 미래에 LaTeX의 대안이 될 가능성이 있지만, 2026년 현재로서는 논문 작성의 주력 도구로 쓰기에는 이르다. 개인 문서나 프레젠테이션 용도로 먼저 시도해 보는 것을 권한다.</p>
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
\usepackage[utf8]{inputenc} % UTF-8 인코딩

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

연구 노트는 연구 과정의 모든 것을 기록하는 곳이다. 실험 설정, 코드 변경 사항, 아이디어, 논문 메모, 미팅 내용. 수첩에 손으로 써도 되고, 디지털 도구를 써도 된다. 중요한 것은 기록을 하는 것이지 도구가 아니다. 다만 검색과 정리의 편의를 생각하면 디지털이 유리하다.

**Notion**: 올인원 워크스페이스. 문서, 데이터베이스, 칸반 보드, 캘린더를 하나의 도구에서 관리한다. 기능이 풍부하지만, 그만큼 설정에 시간이 걸린다. "Notion 세팅에 3일 쓰고, 정작 연구는 안 하는" 함정에 빠지기 쉽다. 팀 협업에 강하다.

**Obsidian**: 로컬 마크다운 기반 노트 앱. 파일이 내 컴퓨터에 일반 텍스트(.md)로 저장되므로, 특정 서비스에 종속되지 않는다. 양방향 링크로 노트 간 연결이 가능해서, 아이디어의 네트워크를 구축할 수 있다. 개인 지식 관리에 최적이다.

둘 중 하나를 고르자면, 혼자 연구하는 대학원생에게는 Obsidian을, 팀 프로젝트가 많은 경우에는 Notion을 추천한다. 그렇지만 솔직히 말하면, 어떤 도구를 쓰든 꾸준히 기록하는 것이 도구 선택보다 100배 중요하다.

### 일정 관리

Google Calendar를 쓰면 된다. 복잡하게 생각할 것 없다. 수업, 세미나, 미팅, 마감일, 학회 일정을 Google Calendar에 넣고, 알림을 설정한다. 지도교수님과 공유 캘린더를 만들면 미팅 잡기가 편해진다.

### 할 일 관리

할 일(To-do) 관리에 도구가 필요한가? 단순한 체크리스트면 종이에 써도 된다. 그런데 프로젝트가 여러 개 동시에 돌아가고, 각각의 마감이 다르고, 우선순위를 정리해야 한다면, 디지털 도구가 도움이 된다.

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

## LaTeX 5분 스타트

LaTeX을 한 번도 써본 적 없는 사람이, 5분 안에 첫 문서를 만들고 컴파일할 수 있도록 최소한의 과정을 정리한다. 로컬 설치는 생략한다. Overleaf(overleaf.com)에서 시작하면 설치 없이 브라우저에서 바로 작업할 수 있다.

**Step 1**: Overleaf에 가입하고, "New Project → Blank Project"를 클릭한다.

**Step 2**: 학술지 투고가 목적이라면 "New Project → View All Templates"에서 IEEE, Elsevier, ASCE 등 해당 저널의 템플릿을 검색해서 연다. 템플릿을 쓰면 형식 맞추기에 시간을 쓸 필요가 없다.

**Step 3**: 제목(`\title{...}`)과 저자(`\author{...}`)를 수정한다.

**Step 4**: 본문에 섹션을 추가한다. 오른쪽의 "Recompile" 버튼을 눌러 PDF를 확인한다.

이것만 알면 시작할 수 있다. 아래는 논문 작성에서 가장 자주 쓰는 명령어 6개다.

`\section{제목}`: 대분류 섹션을 만든다. `\subsection{제목}`으로 소분류를 만든다.

`\cite{키}`: 참고문헌을 인용한다. `.bib` 파일에 등록된 citation key를 넣으면, 컴파일 시 자동으로 번호가 매겨진다.

`\ref{라벨}`: 그림, 표, 수식의 번호를 자동 참조한다. `\label{fig:crack}`으로 라벨을 달고, 본문에서 `Fig.~\ref{fig:crack}`으로 참조한다.

`\begin{figure}...\end{figure}`: 그림을 삽입한다. `\includegraphics[width=0.8\textwidth]{figure.pdf}`로 그림 파일을 넣고, `\caption{설명}`으로 캡션을 단다.

`\begin{table}...\end{table}`: 표를 삽입한다. 내부에 `tabular` 환경을 넣어서 표 내용을 작성한다.

`\begin{equation}...\end{equation}`: 수식을 삽입한다. 자동으로 번호가 매겨진다.

자주 쓰는 수식 입력법도 정리한다. 분수는 `\frac{분자}{분모}`, 적분은 `\int_{a}^{b} f(x)\,dx`, 행렬은 `\begin{bmatrix} a & b \\ c & d \end{bmatrix}`, 편미분은 `\frac{\partial u}{\partial x}`, 그리스 문자는 `\alpha`, `\beta`, `\sigma` 등으로 쓴다. 이 정도면 공학 논문에 나오는 수식 대부분을 커버할 수 있다.

---

## LaTeX 자주 겪는 문제 해결

LaTeX을 쓰다 보면 반드시 부딪히는 문제들이 있다. 처음 겪으면 당황스럽지만, 대부분은 원인이 정해져 있고 해결법도 단순하다.

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>참고문헌이 물음표([?])로 나올 때</strong></p>
<p>가장 흔한 문제다. 원인은 대부분 두 가지 중 하나이다. 첫째, 컴파일 횟수가 부족한 경우. LaTeX은 참고문헌 처리를 위해 여러 번 컴파일해야 한다(LaTeX → BibTeX → LaTeX → LaTeX). Overleaf에서는 보통 자동으로 처리되지만, 가끔 수동으로 "Recompile"을 두 번 눌러야 하는 경우가 있다. 둘째, .bib 파일 경로가 틀렸거나, citation key가 .bib 파일에 없는 경우. \bibliography{references}에서 파일명(확장자 제외)이 실제 .bib 파일명과 일치하는지, \cite{키}의 키가 .bib 파일 안에 존재하는지를 확인한다.</p>
</div>
</div>

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>그림이 원하는 위치에 안 갈 때</strong></p>
<p>LaTeX의 float 시스템은 그림과 표를 "최적의 위치"에 배치하려 하기 때문에, 코드에 넣은 위치와 실제 출력 위치가 다를 수 있다. \begin{figure}[h!]로 "여기에 가능한 한 배치하라"고 지시하거나, \usepackage{float}를 추가한 뒤 \begin{figure}[H]로 "반드시 여기에 배치하라"고 강제할 수 있다. 다만 [H]를 남용하면 페이지에 빈 공간이 많이 생길 수 있으므로, 최종 조판 단계에서 조절하는 것을 권한다.</p>
</div>
</div>

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>한글이 깨질 때</strong></p>
<p>기본 LaTeX 엔진(pdflatex)은 한글을 지원하지 않는다. 한글이 포함된 문서를 작성하려면 XeLaTeX이나 LuaLaTeX 엔진을 사용하고, \usepackage{kotex} 패키지를 추가해야 한다. Overleaf에서는 왼쪽 상단 메뉴 → "Settings" → "Compiler"를 XeLaTeX으로 변경하면 된다. 학위논문 작성 시 한글이 필수이므로, 처음부터 XeLaTeX + kotex 조합으로 시작하는 것이 편하다.</p>
</div>
</div>

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>표가 너무 넓어서 페이지를 벗어날 때</strong></p>
<p>열이 많은 표는 페이지 폭을 초과하기 쉽다. 해결법은 세 가지다. 첫째, \resizebox{\textwidth}{!}{...}로 표 전체를 페이지 폭에 맞게 축소한다. 둘째, tabular 대신 tabularx 환경을 쓰면 열 폭을 자동으로 조절할 수 있다(\usepackage{tabularx} 필요). 셋째, 폰트 크기를 줄이는 방법도 있다. \begin{table} 안에 \small이나 \footnotesize를 넣으면 표의 글자 크기가 줄어든다.</p>
</div>
</div>

---

## 논문 협업을 위한 Git 워크플로우

논문을 혼자 쓰는 경우는 드물다. 지도교수님, 공동 저자와 함께 원고를 수정하고 코멘트를 주고받는 과정이 반복된다. 이때 버전 관리가 엉망이면 "최종.tex", "최종_수정.tex", "진짜최종.tex" 같은 파일이 쌓이게 된다.

### Overleaf만 쓸 때의 한계

Overleaf는 구글 독스처럼 실시간 공동 편집을 지원하지만, 몇 가지 한계가 있다. 무료 계정에서는 버전 히스토리가 제한적이다. 동시 편집 시 같은 줄을 수정하면 충돌이 발생할 수 있다. 오프라인 작업이 불가능하다. 프로젝트가 커지면(그림 파일이 많아지면) 컴파일 시간이 길어지고 타임아웃이 발생하기도 한다.

### Git + Overleaf 연동

Overleaf 유료 플랜에서는 Git 연동 기능을 제공한다. Overleaf 프로젝트를 Git 저장소로 클론해서, 로컬에서 편집한 뒤 push하면 Overleaf에 반영된다. 반대로 Overleaf에서 수정한 내용을 pull로 받을 수도 있다. 이 방식을 쓰면 Overleaf의 편의성과 Git의 버전 관리 능력을 모두 활용할 수 있다.

### 순수 Git으로 LaTeX 협업하기

Overleaf 없이 Git만으로 LaTeX 논문을 관리하는 것도 충분히 가능하다. 이 경우 아래 규칙을 따르면 충돌을 최소화할 수 있다.

**.gitignore 설정**: LaTeX은 컴파일 시 보조 파일을 많이 생성한다. *.aux, *.log, *.bbl, *.blg, *.out, *.toc, *.pdf(컴파일 결과물)를 .gitignore에 추가하여, 소스 파일만 추적한다. 불필요한 파일이 커밋되면 diff가 지저분해지고 충돌이 잦아진다.

**브랜치 전략**: main 브랜치는 항상 컴파일 가능한 상태를 유지한다. 대규모 수정(섹션 재구성, 새로운 실험 결과 추가)은 별도 브랜치에서 작업하고, 컴파일이 확인된 후 main에 병합한다. "main은 항상 돌아가는 원고"라는 원칙을 지키면, 어느 시점에서든 안전한 버전으로 돌아갈 수 있다.

**.bib 파일 충돌 방지**: 참고문헌 파일(.bib)은 여러 저자가 동시에 수정할 때 충돌이 잦다. 간단한 규칙 하나로 충돌을 크게 줄일 수 있다. 항목을 citation key 알파벳순으로 정렬하는 것이다. 각자 새 항목을 추가할 때 알파벳 순서에 맞는 위치에 넣으면, 다른 위치에서 수정이 발생하므로 충돌 확률이 줄어든다.

**커밋 메시지 규칙**: "update"나 "fix" 같은 모호한 메시지 대신, "Section 3: 실험 결과 표 추가", "Eq. 5: 유도 과정 보완", "Reviewer 2 코멘트 #3 반영" 등 구체적으로 적는다. 나중에 특정 변경 시점을 찾아야 할 때 이 메시지가 결정적으로 도움이 된다.

---

## 도구보다 중요한 것

이 장 전체에서 수많은 도구를 소개했다. LaTeX, Overleaf, Zotero, Grammarly, Notion, Obsidian, Slack, Makefile. 그런데 솔직히 말해야 할 것이 있다. 도구를 아무리 잘 갖춰도, 연구를 대신해 주지는 않는다.

가장 생산적인 연구자를 관찰해 보면, 그들이 반드시 가장 좋은 도구를 쓰는 것은 아니다. 어떤 교수는 아직도 emacs에서 LaTeX을 쓰고, 참고문헌을 수동으로 관리하고, 이메일로 모든 소통을 한다. 그럼에도 매년 고품질 논문을 여러 편 낸다. 도구가 아니라 습관과 집중력이 생산성의 진짜 원천이기 때문이다.

매일 30분씩 논문을 쓰는 습관, 읽은 논문을 바로 정리하는 습관, 코드를 수정하면 바로 커밋하는 습관, 아이디어가 떠오르면 즉시 적는 습관. 이런 습관들이 어떤 도구보다 강력하다. 도구는 이 습관을 지원하는 인프라일 뿐이다.

도구에 대한 조언을 한 문장으로 요약하면 이것이다. **"쓸 만한 도구를 골라서, 익숙해질 때까지 쓰고, 쓸데없이 바꾸지 마라."** 6개월마다 새로운 노트 앱으로 갈아타는 것보다, 하나의 도구에 모든 기록을 꾸준히 쌓는 것이 100배 더 가치 있다.

---

## LaTeX의 현대적 대안: Typst와 Quarto

LaTeX은 40년 이상 학술 출판의 표준이었지만, 진입 장벽이 높고 오류 메시지가 모호하고 컴파일 속도가 느리다는 약점이 있다. 최근 이 약점을 개선한 새로운 대안들이 등장했고, 점점 받아들여지고 있다. LaTeX에 익숙하다면 굳이 바꿀 이유는 없지만, 새로 시작하는 사람이라면 검토해 볼 가치가 있다.

<div class="card-grid">
<div class="card">
<h4>Typst</h4>
<p>2023년에 정식 출시된 현대적 조판 언어다. LaTeX의 기능을 대부분 유지하면서 문법이 훨씬 직관적이다. 컴파일 속도는 LaTeX의 10배 이상 빠르다. 오류 메시지가 명확하여 디버깅이 쉽다. 웹 에디터(typst.app)를 무료로 제공하므로 Overleaf와 비슷한 사용 경험을 얻을 수 있다. 단점은 학술 템플릿이 아직 적고, 주요 저널이 Typst를 공식 지원하지 않는다는 것이다. 현재로서는 학위논문이나 발표 자료에는 적합하지만, 저널 투고용으로는 LaTeX이 더 안전하다.</p>
</div>
<div class="card">
<h4>Quarto</h4>
<p>R Markdown의 후속 도구로 개발되었지만, 현재는 R, Python, Julia 코드를 직접 실행할 수 있는 범용 출판 시스템이다. 문서 안에 코드를 넣으면 그 결과(그림, 표, 통계)가 컴파일 시 자동 생성된다. 데이터 과학, 통계학, ML 연구자에게 특히 유용하다. 한 .qmd 파일에서 PDF, HTML, Word, 슬라이드, 책 등 여러 형식으로 출력 가능하다. 학술 논문 템플릿(IEEE, ACM, Elsevier)도 점점 늘고 있다.</p>
</div>
<div class="card">
<h4>Pandoc + Markdown</h4>
<p>가장 가벼운 대안이다. Markdown으로 글을 쓰고 Pandoc으로 PDF/Word/LaTeX 등 어떤 형식으로든 변환한다. 학술 인용도 BibTeX과 연동된다. 글의 본질에 집중하고 형식은 나중에 처리하고 싶을 때 유용하다. 대규모 논문보다 짧은 글이나 블로그 형식에 더 적합하다.</p>
</div>
<div class="card">
<h4>LyX</h4>
<p>LaTeX의 GUI 프론트엔드다. WYSIWYG 비슷한 환경에서 LaTeX 문서를 작성한다. LaTeX의 강력함을 유지하면서 진입 장벽을 낮춘다. 오래된 도구이지만 안정적이다. LaTeX과 Word 사이의 절충안을 원하는 사람에게 적합하다.</p>
</div>
</div>

**대안을 선택할 때의 판단.** 첫째, **타겟 저널이 LaTeX 템플릿만 제공한다면 LaTeX이 안전하다**. 다른 도구로 작성해도 결국 마지막에 LaTeX으로 변환해야 한다면, 처음부터 LaTeX이 낫다. 둘째, **박사 논문이 코드와 데이터를 많이 포함한다면 Quarto가 유리하다**. 코드와 결과를 함께 관리할 수 있다. 셋째, **새로 시작하고 빠르게 결과를 내고 싶다면 Typst를 시도해 본다**. 학습 곡선이 LaTeX보다 훨씬 완만하다. 넷째, **공동 저자가 LaTeX에 익숙하다면 LaTeX을 유지한다**. 도구 선택은 본인 혼자의 결정이 아니다.

---

## 연구를 위한 지식 관리 시스템

대학원 5-6년 동안 읽은 논문, 떠올린 아이디어, 작성한 노트는 수천 건이 된다. 이것을 어떻게 정리하고 검색할 수 있게 만들 것인가는 연구 효율을 결정한다. ch04에서 일일 연구 노트 작성을 다뤘다면, 여기서는 전체 지식을 장기적으로 관리하는 시스템에 집중한다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>Personal Knowledge Management (PKM)의 가치</strong></p>
    <p>박사 과정 중 만난 모든 정보를 머릿속에 저장하는 것은 불가능하다. 필요한 것은 "필요할 때 빠르게 찾을 수 있는 외부 기억"이다. 이것을 Personal Knowledge Management 또는 "Second Brain"이라고 부른다. 잘 구축된 PKM은 사고 능력을 확장한다. 새로운 아이디어를 떠올릴 때, 과거에 정리한 노트가 자동으로 연결되며 새로운 통찰을 만들어 낸다.</p>
  </div>
</div>

**주요 PKM 도구.**

<div class="card-grid">
<div class="card">
<h4>Obsidian</h4>
<p>로컬 마크다운 파일 기반의 노트 도구. 노트 간 [[양방향 링크]]가 핵심 기능이다. 한 노트가 다른 노트와 어떻게 연결되는지 그래프로 시각화된다. 플러그인 생태계가 풍부하다(Dataview, Templater, Citations 등). 유료 동기화 서비스를 쓰지 않으면 무료다. 데이터가 본인 컴퓨터에 평문 마크다운으로 저장되므로 plugin이 사라져도 노트는 안전하다.</p>
</div>
<div class="card">
<h4>Logseq</h4>
<p>Obsidian과 유사하지만 outliner(아웃라이너) 방식이다. 모든 노트가 들여쓰기 가능한 블록 단위로 작성된다. 일일 저널(daily note)을 중심으로 작동한다. 오픈소스이고 무료다. Roam Research의 무료 대안으로 인기가 있다. Obsidian보다 더 개방적인 워크플로우를 좋아하는 사람에게 적합하다.</p>
</div>
<div class="card">
<h4>Notion</h4>
<p>데이터베이스 기능이 강력하다. 노트뿐 아니라 프로젝트 관리, 일정, 작업 목록, 위키를 모두 한 곳에서 관리할 수 있다. 단점은 클라우드 기반이라 인터넷이 없으면 작동이 제한적이고, 연구 데이터가 외부 서버에 저장된다는 것이다. 협업이 잦은 사람에게 유리하다.</p>
</div>
<div class="card">
<h4>Roam Research</h4>
<p>양방향 링크의 원조 도구다. 강력하지만 유료(월 15달러)이고 진입 장벽이 있다. 노트를 깊이 연결하여 사고하는 사람들에게 매니아 층이 형성되어 있다. 가성비를 따진다면 Obsidian이나 Logseq이 대안이다.</p>
</div>
</div>

**연구자의 PKM 구조 예시.** PKM을 어떻게 구성할지는 개인 취향이지만, 다음 구조가 출발점으로 유용하다.

```
research-vault/
├── 00-Inbox/              ← 모든 새 노트가 처음 들어오는 곳
├── 01-Daily/              ← 일일 저널 (오늘 한 일, 떠오른 생각)
├── 02-Papers/             ← 논문 노트 (한 논문당 한 파일)
│   ├── Smith2020-PINN-Heat.md
│   └── Lee2023-DeepSDF.md
├── 03-Concepts/           ← 개념/주제 노트
│   ├── PINN.md
│   ├── Surrogate-Model.md
│   └── Bayesian-Optimization.md
├── 04-Projects/           ← 진행 중인 프로젝트별 노트
│   ├── Thesis/
│   └── Paper-CFD-2026/
├── 05-People/             ← 만난 연구자, 교수
├── 06-Ideas/              ← 미래 연구 아이디어 (sleeping ideas)
├── 07-Resources/          ← 책, 강의, 튜토리얼 메모
└── templates/             ← 노트 템플릿
```

**연결의 힘 활용하기.** PKM의 진정한 가치는 노트를 만드는 것이 아니라 노트들을 연결하는 데 있다. 새 논문 노트를 작성할 때, 그 논문이 다루는 개념(예: PINN)을 [[PINN]]으로 링크한다. 그러면 [[PINN]] 노트에는 자동으로 "이 논문이 PINN을 다룬다"는 역참조가 쌓인다. 시간이 지나면 PINN 노트가 읽은 모든 PINN 관련 논문의 종합 인덱스가 된다. 이것을 손으로 만들면 며칠이 걸릴 작업이 자동으로 만들어진다.

**Atomic Notes 원칙.** 한 노트는 한 가지 아이디어만 다룬다. "PINN의 모든 것"이라는 거대한 노트는 검색도 어렵고 재사용도 어렵다. 대신 "PINN의 손실 함수 가중치 조정", "PINN의 boundary layer 문제", "PINN과 FEM의 비교" 같은 작은 노트들로 쪼갠다. 각 노트가 작고 독립적이면 다른 노트와 연결하기 쉽고, 새 글을 쓸 때 재사용하기 쉽다. 이것이 Niklas Luhmann의 Zettelkasten 원칙이다.

**문헌 노트와 영구 노트의 구분.** 두 종류의 노트를 구분한다. **문헌 노트(Literature Notes)**는 읽은 논문/책의 내용을 언어로 요약한 것이다. 직접 인용은 줄이고 이해를 글로 옮긴다. **영구 노트(Permanent Notes)**는 생각, 통찰, 아이디어를 기록한 것이다. 어떤 논문에서 비롯되었든, 머릿속에서 정제된 결과물이다. 문헌 노트는 많이 만들지만, 영구 노트는 신중하게 만든다. 영구 노트가 진짜 자산이 된다.

---

## PDF 주석과 동기화 워크플로

대학원생은 매일 PDF를 읽는다. 종이에 인쇄해서 읽으면 주석은 종이에만 남고, 디지털 노트와 연결되지 않는다. 디지털로 읽고 주석을 PKM과 연결하는 워크플로가 효율적이다.

**PDF 리더와 주석 도구.**

| 도구 | 특징 |
|------|------|
| Zotero PDF Reader | Zotero 7부터 내장. 하이라이트, 노트가 Zotero 라이브러리와 자동 동기화. 무료. |
| GoodReader (iPad) | iPad용 강력한 PDF 리더. 손글씨와 터치 주석 지원. |
| Notability (iPad) | 노트 필기에 특화. PDF 위에 자유롭게 쓸 수 있음. |
| LiquidText (iPad/Mac) | PDF를 잘라서 재배열할 수 있는 독특한 인터페이스. 깊이 읽을 때 유용. |
| Highlights for Mac | 하이라이트와 노트를 Markdown으로 추출. PKM 연동에 좋다. |
| Adobe Acrobat | 가장 표준적인 도구. 유료. |

**Zotero 중심 워크플로.** 가장 표준적이고 무료인 워크플로는 Zotero를 중심에 두는 것이다. 첫째, **새 논문을 발견하면 Zotero 브라우저 확장(Zotero Connector)으로 한 클릭에 저장한다**. 메타데이터(저자, 제목, 학회, 연도)가 자동으로 저장되고 PDF도 함께 다운로드된다. 둘째, **Zotero 7의 내장 PDF 리더로 읽으면서 하이라이트한다**. 하이라이트는 자동으로 Zotero 데이터베이스에 저장된다. 셋째, **읽은 후 짧은 노트를 작성한다**. "이 논문의 핵심 기여는 X이고, 한계는 Y다. 우리 연구와의 관련성: Z." 이 노트가 나중에 논문 작성 시 참고가 된다. 넷째, **인용이 필요할 때 LaTeX/Word에서 한 클릭으로 삽입한다**(앞서 다룬 ch18의 워크플로).

**Zotero + Obsidian 연동.** Zotero의 노트를 Obsidian으로 내보내는 플러그인이 있다(Zotero Integration, Obsidian Citation Plugin). Zotero의 하이라이트와 노트가 Obsidian의 마크다운 노트로 자동 변환된다. 이렇게 하면 Zotero의 강력한 인용 관리와 Obsidian의 강력한 노트 연결을 모두 활용할 수 있다. PKM을 진지하게 운영한다면 이 연동을 권장한다.

**iPad 사용자의 워크플로.** iPad가 있다면 PDF 읽기 경험이 훨씬 좋다. 추천 워크플로는 다음과 같다. Zotero에서 논문을 다운로드하고 → iCloud나 Dropbox를 통해 iPad와 동기화 → iPad에서 GoodReader 또는 Notability로 손글씨 주석 → 주요 통찰을 별도로 디지털 노트(Obsidian 등)에 옮긴다. 손글씨 주석은 깊이 읽기에 더 효과적이라는 연구 결과가 있다. 다만 손글씨 주석은 검색이 안 되므로, 핵심 내용은 반드시 디지털 노트로도 옮긴다.

**디지털 vs 종이의 균형.** 모든 논문을 디지털로 읽는 것이 항상 최선은 아니다. 정말 깊이 읽어야 하는 핵심 논문(본인 분야의 주요 논문 5-10편)은 종이에 인쇄하여 손으로 주석을 다는 것이 효과적일 수 있다. 종이 위의 손글씨는 디지털보다 인지적으로 더 깊이 처리된다. 종이로 깊이 읽고, 핵심 통찰만 디지털 노트로 옮긴다. 이 하이브리드 방식이 효율과 깊이의 균형을 맞춘다.

---

## 인용 스타일 관리: CSL의 이해

저널마다 인용 스타일이 다르다. 어떤 저널은 [1] [2] 같은 숫자 인용을, 다른 저널은 (Smith et al., 2020) 같은 저자-연도 인용을 요구한다. 같은 저자-연도라도 세부 형식이 다르다(쉼표 위치, 이탤릭체, 약어). 매번 손으로 바꾸는 것은 비효율적이고 오류가 잘 생긴다. **CSL(Citation Style Language)**이 이 문제를 해결한다.

**CSL이 무엇인가.** CSL은 인용 스타일을 표준화된 XML 형식으로 정의하는 언어다. Zotero, Mendeley, EndNote, Pandoc, Overleaf 모두 CSL을 지원한다. 9000개 이상의 저널 스타일이 CSL로 작성되어 무료로 배포된다(Zotero Style Repository, zotero.org/styles).

**저널 스타일 적용 워크플로.** Zotero를 사용한다고 가정하자. 첫째, Zotero Style Repository에서 투고할 저널을 검색한다(예: "IEEE Transactions on Pattern Analysis and Machine Intelligence"). 둘째, 해당 스타일을 한 클릭으로 설치한다. 셋째, Word/LibreOffice의 Zotero 플러그인에서 그 스타일을 선택한다. 모든 인용이 자동으로 그 저널 형식으로 변환된다. 넷째, 다른 저널에 투고하게 되면 스타일만 바꾸면 모든 인용이 한 번에 새 형식으로 바뀐다.

**LaTeX의 경우.** LaTeX은 BibTeX 또는 BibLaTeX을 사용한다. 저널이 제공하는 .bst 파일(BibTeX 스타일 파일)을 사용하면 된다. 대부분의 주요 저널은 .bst 파일을 함께 제공한다. 저널 템플릿을 다운로드하면 그 안에 포함되어 있다. BibLaTeX은 더 현대적인 대안으로, CSL과 일부 호환된다. 새 프로젝트라면 BibLaTeX을 추천한다.

**저널이 제공하지 않는 스타일을 만나면.** 가끔 저널이 .bst 파일도 CSL 스타일도 제공하지 않는 경우가 있다. 이때는 Zotero Style Repository에서 가장 비슷한 스타일을 찾아 시작점으로 사용한다. 그 스타일을 다운로드하여 텍스트 에디터로 열면 XML 코드가 보인다. 일부 항목(예: 저자 이름 형식, 연도 위치)을 수동으로 수정할 수 있다. 본격적인 CSL 편집은 학습이 필요하지만, 작은 수정은 어렵지 않다.

**여러 인용 스타일을 다루는 학생의 팁.** 박사 과정 중 논문이 여러 저널을 거치고, 학위 논문도 별도 스타일을 요구한다. 매번 모든 인용을 손으로 바꾸는 것은 끔찍하다. 처음부터 Zotero/EndNote/Mendeley + CSL/BibTeX 워크플로를 정착시키면, 이 모든 변환이 한 번의 설정으로 끝난다. 시간 절감 효과가 박사 과정 5-6년에 걸쳐 누적되면 수십 시간이 된다.

---

## 동시 다수 논문 프로젝트의 도구 관리

박사 후반기가 되면 한 번에 2-5개의 논문 프로젝트를 동시에 돌리는 상황이 흔하다. 한 논문은 심사 중이고, 다른 하나는 리비전을 쓰고 있고, 또 다른 하나는 초고 작성 중이며, 새 주제는 자료 조사 단계에 있다. 이 상황은 단순히 "바쁘다"의 문제가 아니라, 도구 관리 자체가 병목이 되는 상황이다. 한 논문에 집중하다가 다른 논문으로 옮겨 갈 때마다 "어디까지 했더라", "이 버전이 최신인가", "공저자가 보낸 피드백은 어디 있었지"에서 시간을 낭비한다.

<div class="highlight-box highlight-warning">

**가장 흔한 실패 패턴.** 세 논문의 파일을 데스크톱에 뒤섞어 놓고 파일명만으로 구분하려는 방식. `paper_final.pdf`, `paper_final_v2.pdf`, `paper_final_v2_coauthor.pdf`, `paper_final_real_final.pdf` 같은 이름이 쌓이다가, 어느 순간 "어느 것이 실제 최신인가"를 알 수 없게 된다. 공저자와 이메일로 첨부파일을 주고받으면 상황이 더 악화된다.

</div>

**원칙: 프로젝트 당 하나의 루트 폴더.** 각 논문 프로젝트는 하나의 독립된 루트 폴더를 가진다. 그 폴더 안에 모든 것이 들어간다. 원고, 그림, 데이터 링크, 참고문헌, 리뷰 응답, 공저자 피드백, 투고 이력. 데스크톱이나 여기저기에 파일을 흩어 두지 않는다. 폴더 이름은 논문 주제를 한눈에 알 수 있게 한다. `2026-concrete-carbonation` 처럼 연도와 주제를 붙인다.

**표준 폴더 구조.** 모든 논문 프로젝트에 같은 하위 폴더 구조를 사용한다. 이렇게 하면 다른 프로젝트로 이동할 때 인지 부하가 줄어든다.

```
2026-concrete-carbonation/
├── 00-admin/          # 투고 이력, 저널 편지, 체크리스트
├── 01-manuscript/     # 원고 (LaTeX 또는 Word)
├── 02-figures/        # 그림 원본과 내보낸 파일
├── 03-data/           # 실험/시뮬레이션 데이터 (또는 외부 링크)
├── 04-references/     # PDF 사본, .bib 파일
├── 05-reviews/        # 리뷰어 코멘트, 응답 초안
├── 06-coauthor-feedback/  # 공저자별 피드백 트랙
└── README.md          # 현재 상태, 다음 할 일, 담당자
```

각 폴더의 역할을 고정하면 "이 파일을 어디에 둘까"를 매번 고민하지 않아도 된다.

**README.md: 프로젝트의 대시보드.** 모든 논문 프로젝트 폴더의 루트에 `README.md`를 둔다. 이 파일은 프로젝트의 현재 상태를 한눈에 보여주는 대시보드 역할이다. 길 필요는 없다. 10-30줄이면 충분하다.

```markdown
# 2026 Concrete Carbonation Paper

## 현재 상태
- 단계: Reviewer response 작성 중
- 저널: Cement and Concrete Research
- 제출일: 2026-02-15
- 리뷰 도착: 2026-04-01
- 응답 마감: 2026-05-30 (D-20)

## 공저자
- 본인 (1저자, 주 담당)
- 교수A (지도교수, 교신저자)
- 박사후연구원B (시뮬레이션 검증 담당)

## 다음 할 일
- [ ] Reviewer 2의 FEM 검증 요구에 응답 (담당: 본인)
- [ ] 새 그래프 Fig 5 재작성 (담당: 본인, 기한 5/10)
- [ ] 교수A에게 response letter 초안 전달 (기한 5/20)

## 최신 버전
- 원고: 01-manuscript/main_r1.tex (2026-04-15 수정)
- Response: 05-reviews/response_v2.md (2026-04-14 수정)
```

프로젝트를 일주일 만에 다시 열 때, 이 README만 보면 5분 안에 맥락을 복원할 수 있다. 3개월 후에 다시 돌아와도 마찬가지다. "지금 이 프로젝트의 상태가 무엇인가"를 머릿속에 유지하려고 애쓰지 않아도 된다.

**주 단위 프로젝트 리뷰 루틴.** 매주 금요일 오후(또는 월요일 오전) 30분을 할당하여 모든 논문 프로젝트의 README를 업데이트한다. 각 프로젝트의 다음 할 일을 점검하고, 완료된 것을 체크하고, 새로 생긴 것을 추가한다. 이 30분의 투자가 다음 주의 혼란을 막는다. 머릿속에만 유지하려고 하면 반드시 하나는 놓친다.

**공저자별 피드백 트랙.** 한 원고에 여러 공저자가 피드백을 주면 빠르게 혼란이 생긴다. 한 공저자는 Word의 변경 내용 추적으로, 다른 공저자는 PDF 주석으로, 또 다른 공저자는 이메일 본문으로 피드백을 준다. 이를 통합하는 표준 방법을 둔다. `06-coauthor-feedback/` 폴더 안에 공저자별 하위 폴더를 만든다.

```
06-coauthor-feedback/
├── advisor/
│   ├── 2026-04-10_main_comments.pdf
│   └── 2026-04-15_response_v1_review.docx
├── postdoc-B/
│   └── 2026-04-12_fem_section_comments.md
└── INTEGRATION_LOG.md    # 어떤 코멘트를 어떻게 반영했는지 기록
```

`INTEGRATION_LOG.md`에는 각 공저자의 주요 코멘트와 그것을 어떻게 반영했는지(또는 왜 반영하지 않았는지)를 기록한다. 다음에 공저자에게 "이전에 주신 의견을 이렇게 반영했습니다"라고 보여줄 수 있다. 이것은 공저자의 신뢰를 유지하는 데도 중요하다.

**클라우드 동기화 전략.** 여러 프로젝트 폴더를 관리할 때 클라우드 동기화는 양날의 검이다. Dropbox나 Google Drive에 두면 어디서든 접근 가능하지만, 대용량 데이터나 많은 파일이 있으면 동기화가 느려지거나 충돌(conflict)이 생긴다. 실전에서는 이렇게 분리한다. 원고, 그림, 참고문헌, 리뷰 같은 텍스트 기반 파일은 Git + 클라우드(Overleaf, GitHub private repo)에 둔다. 대용량 원시 데이터는 별도의 대용량 저장소(학교 서버, 연구실 NAS)에 두고 README에 링크만 남긴다. 이렇게 하면 동기화 속도와 버전 관리를 모두 챙길 수 있다.

**프로젝트의 "일시 정지"와 재개.** 한 논문을 리뷰어에게 보낸 후 3-6개월간 기다리는 시기가 있다. 이때 다른 프로젝트에 몰입하고 나면, 리뷰가 돌아왔을 때 원래 논문의 맥락을 완전히 잊어버리는 경우가 흔하다. 논문을 제출하고 프로젝트를 "일시 정지"할 때, README에 "복귀 시 읽을 것" 섹션을 추가한다. 주요 결정 사항, 예상 리뷰어 질문, 백업 자료의 위치 등을 2-3줄로 남긴다. 리뷰가 돌아왔을 때 이 섹션을 먼저 읽으면 5-10분 만에 맥락을 복원할 수 있다.

**도구 라이선스와 계정의 중앙 관리.** 여러 프로젝트를 돌리다 보면 Overleaf, Grammarly, DeepL Pro, Adobe Acrobat 등 다양한 유료 도구를 쓰게 된다. 각 도구의 계정, 구독 상태, 공유 링크를 별도의 노트 파일(예: `~/research/tools.md`)에 중앙 관리한다. 프로젝트별로 어떤 Overleaf 프로젝트 링크를 쓰는지, 공저자가 누구에게 초대되었는지 기록한다. 프로젝트가 끝난 후에도 구독을 계속 내고 있지는 않은지 점검한다.

> 동시 여러 논문 관리는 박사 후반과 포닥 시기에 본격화되는 기술이다. 이 기술 없이 2-3개의 동시 프로젝트를 운영하면, 실제 연구 시간보다 "어디까지 했더라" 찾는 시간이 더 길어진다. 조기에 표준 폴더 구조, README 습관, 주간 리뷰 루틴을 몸에 익히는 것이 장기적으로 가장 큰 생산성 향상을 가져온다. 도구는 단순해도 된다. 중요한 것은 일관성이다.

---

## 저널 포맷 변환의 지옥과 탈출 — 리젝 후 재투고 실전

박사 과정에서 가장 감정적으로 지치는 순간 중 하나는 논문이 리젝된 후 다른 저널에 투고할 때다. 리젝 자체의 실망감도 크지만, **새 저널의 포맷으로 논문을 전부 다시 맞추는 작업**은 연구 자체보다 더 지치는 경우가 많다. IEEE 형식에서 Elsevier 형식으로, 또는 double-column에서 single-column으로 바꾸는 데 하루 이상이 걸린다. 이 섹션은 포맷 변환의 고통을 최소화하는 전략을 다룬다.

<div class="highlight-box highlight-warning">

**포맷 변환의 숨은 비용.** 논문 한 편이 리젝되고 다른 저널에 투고될 때까지의 평균 "포맷 변환 시간"은 공학 분야에서 8-16시간이다. 박사 5년 동안 5편의 논문을 각각 2-3번씩 투고한다면, 포맷 변환에만 총 100-200시간(약 2-4주)을 쓴다. 이것이 모두 생산적인 작업이 아니라 "다시 맞추기"에 쓰인 시간이다. 포맷 변환 전략을 알면 이 시간을 절반 이하로 줄일 수 있다.

</div>

**포맷 변환이 왜 이렇게 어려운가.**

각 저널은 자체 LaTeX 클래스(`.cls`) 파일을 요구하고, 이 클래스들은 다음 항목에서 서로 다르다.

- **열 구조**: single-column, double-column, 또는 하이브리드
- **글꼴과 크기**: Times, Computer Modern, Helvetica 등
- **여백과 페이지 크기**: letter, A4, 사용자 정의
- **인용 스타일**: 숫자, 저자-연도, 각주
- **그림과 표의 위치**: inline, top/bottom, 별도 페이지
- **섹션 번호**: 1, 1.1 vs 1.A, Section 1
- **수식 번호**: (1), [1], 1
- **초록의 위치와 형식**: 제목 위/아래, 키워드 포함 여부
- **저자 정보**: 이름 위치, affiliation 형식, 이메일 각주
- **참고문헌 포맷**: 수많은 변종

이 모든 항목이 저널마다 미묘하게 다르다. 하나하나 수정하는 것이 시간 낭비다.

**전략 1: "저널-불가지론적" LaTeX 소스 작성.**

가장 강력한 전략은 **처음부터 저널에 특화되지 않은 소스를 작성**하는 것이다. 이것이 무슨 말인지 구체적으로 본다.

**잘못된 접근**:
```latex
\documentclass[twocolumn,10pt]{IEEEtran}
\usepackage{cite}
...
\title{My Paper}
\author{Me\thanks{Korea University}}

% 본문에서 IEEE 특화 명령어 사용
\begin{IEEEbiography}...\end{IEEEbiography}
```

**올바른 접근**:
```latex
\documentclass[11pt]{article}  % 단순한 article 클래스
\usepackage{natbib}  % 범용 인용 패키지
...
\title{My Paper}
\author{Me\\ Korea University \and Co-author\\ Another University}

% 저널 특화 명령어 없음
```

메인 소스는 단순한 `article` 클래스로 작성한다. 이것은 어느 저널에도 쉽게 변환할 수 있는 "중립 소스"다. 특정 저널에 투고할 때만 그 저널의 클래스를 적용한다.

**전략 2: 래퍼(wrapper) 파일 사용.**

한 단계 더 나아가, 본문 내용과 저널 포맷을 완전히 분리할 수 있다.

**파일 구조**:
```
paper/
├── content.tex           # 본문 내용 (중립)
├── references.bib        # 참고문헌
├── figures/              # 그림
├── ieee_wrapper.tex      # IEEE 투고용
├── elsevier_wrapper.tex  # Elsevier 투고용
├── springer_wrapper.tex  # Springer 투고용
└── acm_wrapper.tex       # ACM 투고용
```

각 wrapper는 다음과 같이 구성된다.

**`ieee_wrapper.tex`**:
```latex
\documentclass[twocolumn,10pt]{IEEEtran}
\usepackage{cite}
% IEEE 특화 설정

\begin{document}
\title{\input{title.tex}}
\author{\input{authors_ieee.tex}}
\maketitle
\begin{abstract}
\input{abstract.tex}
\end{abstract}
\input{content.tex}
\bibliographystyle{IEEEtran}
\bibliography{references}
\end{document}
```

**`elsevier_wrapper.tex`**:
```latex
\documentclass[review]{elsarticle}
\usepackage{lineno}
% Elsevier 특화 설정

\begin{document}
\begin{frontmatter}
\title{\input{title.tex}}
\author{\input{authors_elsevier.tex}}
\begin{abstract}
\input{abstract.tex}
\end{abstract}
\end{frontmatter}
\input{content.tex}
\bibliographystyle{elsarticle-num}
\bibliography{references}
\end{document}
```

본문 `content.tex`는 모든 wrapper에서 동일하게 사용된다. 저널을 바꿀 때는 wrapper 파일만 바꾸면 된다. 본문 변경이 없다.

**저자 정보는 별도 파일로**: 저자 정보의 포맷이 저널마다 크게 다르므로 `authors_ieee.tex`, `authors_elsevier.tex` 등으로 분리한다. 이 작은 파일만 관리하면 된다.

**전략 3: LaTeX 매크로로 저널 차이 흡수.**

저널 특화 명령어를 매크로로 추상화한다. 본문에서는 항상 같은 명령어를 쓰고, wrapper에서 그 명령어의 정의를 저널에 맞게 바꾼다.

```latex
% content.tex에서는 항상 이것 사용
Figure~\figref{overview} shows our architecture.

% ieee_wrapper.tex의 정의
\newcommand{\figref}[1]{\ref{fig:#1}}

% 다른 저널 wrapper의 정의 (예: nature)
\newcommand{\figref}[1]{Fig.~\ref{fig:#1}}
```

이것이 수십 개의 작은 차이를 한 곳에서 관리할 수 있게 한다.

**전략 4: Pandoc으로 Markdown → LaTeX 변환.**

급진적 접근: LaTeX을 직접 쓰지 않고 **Markdown으로 작성**한 다음, Pandoc으로 LaTeX으로 변환한다.

**워크플로**:
1. `paper.md`를 Markdown으로 작성
2. `pandoc paper.md --template=ieee.template -o paper.tex`로 변환
3. 저널 바꿀 때는 template만 변경

Markdown은 매우 단순하고 "저널 중립적"이다. 모든 저널 특화 요소는 template에서 처리된다.

**장점**: Markdown만 알면 되고, 변환이 자동.
**단점**: 복잡한 수식이나 표는 결국 LaTeX 문법을 섞어 써야 한다. 완전히 "LaTeX 없이" 하기는 어렵다.

이 접근은 수식이 많지 않은 분야(컴퓨터 과학 일부, 응용 분야)에 더 적합하다.

**전략 5: Quarto 사용.**

Quarto는 Pandoc 기반의 과학 문서 작성 도구로, LaTeX, Word, HTML 등 다양한 출력을 지원한다. Jupyter 통합도 우수하다.

**장점**:
- 하나의 `.qmd` 파일로 여러 포맷 출력
- 코드, 그림, 수식, 참고문헌 통합
- 저널별 template 증가 중
- 차세대 연구 문서 도구

**단점**:
- 아직 LaTeX만큼 저널 template이 풍부하지 않음
- 공학 분야에서는 아직 주류가 아님

현재(2026년)는 전통 LaTeX이 안전한 선택이지만, Quarto를 조금씩 익혀두면 미래 대비가 된다.

**참고문헌의 저널 간 변환.**

참고문헌은 저널마다 포맷이 가장 다르다. 수동으로 수정하면 실수가 많다.

**원칙 1: `.bib` 파일 유지.**
모든 참고문헌을 `.bib` 파일(BibTeX 포맷)로 관리한다. 이것이 저널 간 변환의 기반이다.

**원칙 2: 저널별 `.bst` 파일 사용.**
`.bst` 파일이 참고문헌 포맷을 결정한다. 각 저널 template에 포함된 `.bst` 파일을 쓰면 된다.

**원칙 3: 수동으로 `\bibitem` 쓰지 말기.**
많은 학생이 LaTeX에서 `\begin{thebibliography}`를 직접 쓰는데, 이것은 저널 변환의 지옥이다. 항상 BibTeX를 쓴다.

**원칙 4: Zotero/Mendeley와 연동.**
참고문헌 관리 도구에서 `.bib` 파일을 자동 생성하고, 논문 프로젝트 폴더에 링크. 수동으로 `.bib` 파일을 편집하지 않는다.

**포맷 변환의 단계별 체크리스트.**

새 저널로 변환할 때 다음 순서로 작업한다.

**1단계: 저널 template 다운로드.**
- 저널 공식 사이트에서 최신 LaTeX template을 다운로드
- Overleaf를 쓴다면 "Journal Templates" 섹션에서 검색
- 오래된 template을 쓰면 문제가 생기므로 항상 최신 버전

**2단계: Wrapper 파일 생성.**
- template을 복사하여 `journal_wrapper.tex`로 저장
- `\input{content.tex}` 등으로 본문 연결
- 기존 wrapper를 참고하여 구조 통일

**3단계: 저자 정보 맞추기.**
- `authors_{journal}.tex`를 만든다
- 각 저자의 이름, 소속, 이메일을 저널 형식으로
- Corresponding author 표시

**4단계: 컴파일과 오류 수정.**
- 처음 컴파일은 거의 확실히 오류가 난다
- 가장 흔한 오류: 저널이 특정 패키지를 요구하거나 금지
- Log를 읽고 하나씩 해결

**5단계: 그림 크기 조정.**
- 저널의 column width에 맞게 그림 크기 조정
- `\includegraphics[width=\columnwidth]{...}` 또는 `\textwidth`
- 해상도 확인 (저널이 요구하는 dpi)

**6단계: 참고문헌 스타일 확인.**
- `.bst` 파일이 저널과 맞는지 확인
- `\bibliographystyle{...}` 변경
- 참고문헌이 제대로 나오는지 전체 확인

**7단계: 최종 PDF 검토.**
- 페이지 수가 저널 제한 내인지 확인
- 그림과 표의 위치가 합리적인지
- 오버플로우, 잘린 수식 등이 없는지
- Line number가 필요하면 활성화

이 체크리스트대로 하면 변환 시간이 크게 줄어든다. 처음에는 여전히 4-6시간 걸리지만, 익숙해지면 1-2시간 내로 가능하다.

**Overleaf의 저널 template 기능 활용.**

Overleaf는 수백 개 저널의 template을 제공한다.

**사용법**:
1. Overleaf 홈페이지 → Templates → Journal
2. 타겟 저널 검색
3. "Open as Template" 클릭 → 새 프로젝트 생성
4. content.tex를 복사하여 붙여넣기

이것이 처음부터 template을 찾는 것보다 훨씬 빠르다. 특히 Elsevier, Springer, Wiley 같은 주요 출판사의 저널들은 거의 다 있다.

**주의**: Overleaf의 template은 때때로 저널 공식보다 약간 오래되었을 수 있다. 최종 투고 전에 저널 공식 사이트의 template과 비교한다.

**Word로 작성하는 경우의 포맷 변환.**

일부 저널은 Word 파일도 받는다. 한국 학생 중 일부는 LaTeX 대신 Word를 선호한다. Word의 포맷 변환 전략.

**전략 1: 스타일(Styles) 적극 사용.**
모든 제목, 본문, 캡션에 Word의 "스타일"을 적용한다. 저널을 바꿀 때 스타일만 수정하면 전체 문서가 자동 변환된다. 수동으로 폰트 크기나 색을 바꾸지 않는다.

**전략 2: 저널 template의 "스타일 복사".**
저널에서 Word template을 제공하면, 그 template의 스타일을 문서에 "스타일 가져오기"로 적용한다. 이것이 수동 변환보다 훨씬 빠르다.

**전략 3: Word 매크로.**
반복 작업(그림 크기 조정, 참고문헌 번호 재정렬 등)을 매크로로 자동화한다. VBA 학습 곡선이 있지만 장기적으로 시간을 절약한다.

**전략 4: 참고문헌 도구 사용.**
Zotero, EndNote의 Word 플러그인으로 참고문헌을 관리한다. 스타일만 바꾸면 모든 인용이 자동 재포맷된다. 수동으로 수정하지 않는다.

**변환 중 발견되는 "숨겨진 문제들".**

포맷 변환 중에 원고의 숨겨진 문제가 드러나는 경우가 있다.

- **긴 수식의 overflow**: 다른 column 폭에서는 수식이 페이지를 벗어난다. 수식을 나누거나 축약한다.
- **그림의 해상도 부족**: 저널이 요구하는 dpi에 맞지 않아 흐릿하게 나온다. 원본 그림을 다시 생성.
- **표가 깨짐**: 열 수가 많은 표가 좁은 column에 안 들어간다. 표를 회전시키거나 내용을 줄인다.
- **페이지 수 초과**: 새 저널의 페이지 제한이 이전보다 작다. 내용을 압축해야 한다.
- **저자 수 초과**: 일부 저널은 저자 수에 제한이 있다. 공저자 순서와 역할 재검토.

이런 문제는 변환의 "숨은 이익"이 되기도 한다. 원고를 다시 검토하는 기회가 된다.

**페이지 제한을 맞추는 압축 기법.**

새 저널의 페이지 제한이 원고보다 작을 때의 압축 기법.

1. **여러 그림을 하나로 통합**: 3개의 그림을 3개 subplot이 있는 하나의 Figure로.
2. **Introduction 축약**: 배경 설명을 줄이고 기여에 집중.
3. **Related Work 압축**: 개별 논문 설명 대신 그룹화하여 서술.
4. **표를 그림으로**: 표 대신 바 차트로 정보 압축.
5. **Supplementary로 이동**: 부수적 실험, 긴 유도식, 추가 세부사항을 Supplementary로.
6. **긴 문장 나누기/압축**: 두 문장을 한 문장으로, 또는 두 단락을 한 단락으로.
7. **수식 간소화**: 여러 단계로 유도한 식을 핵심 결과만.
8. **참고문헌 줄이기**: 50개 중에서 진짜 필요한 것만 남김.

한 편의 논문에서 1-2 페이지를 줄이는 것은 보통 어렵지 않다. 5 페이지 이상 줄이는 것은 기여를 재구성해야 한다.

**변환 작업의 감정 관리.**

포맷 변환은 지적으로 도전적이지 않지만 감정적으로 지치는 일이다. 리젝의 실망감이 겹치면서 "왜 이 일을 또 해야 하나"라는 생각이 든다. 대응.

- **한 번에 다 하지 말기**: 하루에 2-3시간씩 나누어 한다. 8시간 연속으로 하면 실수가 늘고 지친다.
- **쉬운 부분부터**: 그림 크기 조정 같은 기계적 작업부터 시작. 진도감이 생긴다.
- **리젝과 분리**: 리젝의 감정 처리는 ch12의 "감정 관리"에서 다룬 대로 하고, 변환 작업은 그것과 분리한다.
- **작은 축하**: 변환 완료 후 본인에게 작은 보상(맛있는 저녁, 산책 등).

**변환의 "두 번째 기회" 가치.**

포맷 변환 중에 원고를 다시 읽게 된다. 이것을 단순한 작업으로 보지 말고 **원고 개선의 기회**로 본다.

- **논리의 빈틈 발견**: 몇 주 전에 쓴 글을 새 눈으로 읽으면 약점이 보인다.
- **표현 다듬기**: 어색한 문장이나 모호한 부분을 수정.
- **그림 재검토**: 이 그림이 정말 핵심을 전달하는지 재평가.
- **참고문헌 업데이트**: 리젝 후 몇 달이 지났다면 새로 나온 관련 논문 추가.

이렇게 개선된 원고가 새 저널에서 더 나은 결과를 낳는다. "같은 원고를 그대로 재투고"보다 "개선된 원고를 재투고"가 훨씬 나은 전략이다.

> 저널 포맷 변환은 박사 과정의 숨겨진 시간 소비자다. 전략 없이 접근하면 논문 한 편당 수십 시간을 낭비한다. Wrapper 파일, 매크로, 자동화 도구를 배우는 데 몇 시간을 투자하면, 박사 5년 동안 수백 시간을 절약한다. 더 중요한 것은 변환의 감정적 피로를 줄이는 것이다. 리젝 후 빠르게 재투고할 수 있는 능력이 박사 과정의 속도를 결정한다.

---

## 박사 학위 논문의 대형 LaTeX 프로젝트 관리

박사 학위 논문은 박사 과정의 가장 큰 LaTeX 프로젝트다. 학술 논문이 10-20페이지라면 박사 학위 논문은 150-300페이지. 여러 장, 수백 개의 그림, 수백 개의 참고문헌, 수십 개의 수식, 여러 부록. 학술 논문 스타일로 박사 학위 논문을 다루면 프로젝트가 관리 불가능해진다. 박사 학위 논문의 LaTeX 프로젝트를 체계적으로 관리해야 한다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>박사 학위 논문 LaTeX의 숨은 복잡성</strong></p>
    <p>박사 학위 논문을 한 개의 .tex 파일로 작성하면 파일이 수천 줄이 된다. 컴파일 시간이 한 번에 5-10분이 된다. 한 오류가 발생하면 오류의 위치를 찾기 어렵다. 공저자(지도교수)와의 협업이 어렵다. 버전 관리가 복잡해진다. 박사 학위 논문의 LaTeX 프로젝트를 단일 파일로 다루지 않는다. 모듈화된 구조로 프로젝트를 설계해야 한다.</p>
  </div>
</div>

### 박사 학위 논문의 LaTeX 파일 구조

박사 학위 논문의 권장 디렉토리 구조:

```
thesis/
├── main.tex                 # 본인의 최상위 파일 (장 \input 포함)
├── preamble.tex            # 본인의 패키지, 명령어 정의
├── macros.tex              # 본인의 개인 매크로
├── bibliography.bib        # 본인의 참고문헌 데이터베이스
├── front_matter/
│   ├── title.tex           # 본인의 제목 페이지
│   ├── abstract_en.tex     # 본인의 영문 초록
│   ├── abstract_ko.tex     # 본인의 한국어 초록
│   ├── acknowledgments.tex # 본인의 감사의 글
│   └── dedication.tex      # 본인의 헌사 (선택)
├── chapters/
│   ├── ch01_introduction.tex
│   ├── ch02_background.tex
│   ├── ch03_method1.tex
│   ├── ch04_method2.tex
│   ├── ch05_results.tex
│   ├── ch06_discussion.tex
│   └── ch07_conclusion.tex
├── appendices/
│   ├── appA_math.tex
│   ├── appB_code.tex
│   └── appC_data.tex
├── figures/
│   ├── ch01/
│   ├── ch02/
│   └── ...
├── tables/
│   ├── ch03/
│   └── ...
└── build/                  # 컴파일 출력물 (gitignore)
```

**핵심 원칙**:

- `main.tex`는 간단해야 한다. 장의 `\input{chapters/ch01_introduction}`만.
- `preamble.tex`에 모든 패키지와 설정을 분리.
- 각 장을 독립 파일로. 장 단위 편집이 쉽다.
- 그림과 표를 장별 서브폴더에 정리. 찾기가 쉽다.
- 컴파일 출력물 (`.aux`, `.log`, `.bbl`, `.toc`, `.pdf`)을 별도 `build/` 폴더에. Git 저장소가 깨끗해진다.

### main.tex의 표준 구조

`main.tex` 파일의 표준 구조 예시:

```latex
\documentclass[12pt,a4paper,oneside]{book}

% 본인의 패키지와 설정
\input{preamble}
\input{macros}

% 본인의 참고문헌 스타일
\usepackage[style=ieee,backend=biber]{biblatex}
\addbibresource{bibliography.bib}

\begin{document}

% 본인의 Front matter
\frontmatter
\input{front_matter/title}
\input{front_matter/abstract_en}
\input{front_matter/abstract_ko}
\input{front_matter/acknowledgments}
\tableofcontents
\listoffigures
\listoftables

% 본인의 본문
\mainmatter
\input{chapters/ch01_introduction}
\input{chapters/ch02_background}
\input{chapters/ch03_method1}
\input{chapters/ch04_method2}
\input{chapters/ch05_results}
\input{chapters/ch06_discussion}
\input{chapters/ch07_conclusion}

% 본인의 부록
\appendix
\input{appendices/appA_math}
\input{appendices/appB_code}
\input{appendices/appC_data}

% 본인의 참고문헌
\backmatter
\printbibliography

\end{document}
```

`main.tex`가 30-50줄로 간결. 내용은 장 파일에.

### 개인 매크로 파일의 힘

`macros.tex`에 박사 학위 논문 전체에 사용하는 매크로를 정의. 매크로가 일관성과 편집 속도를 크게 향상.

**매크로의 유형**

**유형 1: 분야 기호**
```latex
\newcommand{\R}{\mathbb{R}}
\newcommand{\N}{\mathbb{N}}
\newcommand{\E}{\mathbb{E}}
\newcommand{\Var}{\text{Var}}
\newcommand{\diag}{\text{diag}}
```

분야의 표준 기호를 한 번 정의하면 `\R`만 쓰면 `\mathbb{R}`로 자동 확장.

**유형 2: 용어**
```latex
\newcommand{\PINN}{\text{PINN}}
\newcommand{\RMSE}{\text{RMSE}}
\newcommand{\MAE}{\text{MAE}}
\newcommand{\thisthesis}{this thesis}
```

용어의 통일이 전체 논문에 보장. 용어를 변경하고 싶으면 매크로만 수정.

**유형 3: 수학 연산자**
```latex
\newcommand{\pd}[2]{\frac{\partial #1}{\partial #2}}
\newcommand{\pdd}[2]{\frac{\partial^2 #1}{\partial #2^2}}
\newcommand{\grad}{\nabla}
\newcommand{\divg}{\nabla \cdot}
\newcommand{\curl}{\nabla \times}
```

자주 쓰는 수학 표현을 짧게. `\pd{u}{x}`로 쉽게 쓴다.

**유형 4: 참조 매크로**
```latex
\newcommand{\figref}[1]{Fig.~\ref{fig:#1}}
\newcommand{\tabref}[1]{Table~\ref{tab:#1}}
\newcommand{\eqref}[1]{Eq.~(\ref{eq:#1})}
\newcommand{\secref}[1]{Section~\ref{sec:#1}}
\newcommand{\chref}[1]{Chapter~\ref{ch:#1}}
```

참조의 일관성. `\figref{temperature}`로 쓰면 "Fig. 3.2"로 자동 변환.

**유형 5: TODO 매크로**
```latex
\newcommand{\TODO}[1]{\textcolor{red}{\textbf{[TODO: #1]}}}
\newcommand{\NOTE}[1]{\textcolor{blue}{\textbf{[NOTE: #1]}}}
\newcommand{\CITE}{\textcolor{orange}{\textbf{[CITE]}}}
```

집필 중 TODO를 눈에 띄게 표시. 최종 제출 전에 모든 TODO를 제거.

### 참고문헌 관리의 대형 프로젝트 전략

박사 학위 논문에는 300-600개의 참고문헌이 있다. 참고문헌을 체계적으로 관리해야 한다.

**전략 1: Zotero와 Better BibTeX**

Zotero에 모든 참고문헌을 수집. Better BibTeX 플러그인으로 BibTeX 파일을 자동 생성. Zotero의 업데이트가 `bibliography.bib`에 즉시 반영.

BibKey 일관성을 보장. `AuthorYear` 또는 `AuthorYearTitle` 형식을 표준으로.

**전략 2: 분류된 컬렉션**

Zotero에 박사 학위 논문의 장별로 컬렉션을 만든다. 한 논문이 여러 장에 관련되면 여러 컬렉션에 동시 포함.

**전략 3: 정기 검증**

박사 학위 논문의 집필 중 참고문헌을 월 1회 검증. 오래된 논문 URL이 죽었는가? DOI가 정확한가? 저자 이름의 철자가 맞는가?

**전략 4: 참고문헌 통계**

박사 학위 논문 제출 전에 참고문헌의 통계를 확인. 최근 5년 논문의 비율 (너무 오래된 논문만 있으면 심사위원이 의심). 자기 인용의 비율 (너무 높으면 부적절). 분야의 주요 학자의 인용 포함 여부.

### 컴파일 최적화

박사 학위 논문의 컴파일 시간이 5-10분이 되면 작업이 느려진다. 컴파일을 빠르게 하는 전략.

**최적화 1: 부분 컴파일**

현재 작업하는 장만 컴파일. `\includeonly{chapters/ch03_method1}`를 `main.tex`에 추가. ch03만 컴파일. 시간이 1/5로.

**최적화 2: 그림의 PDF 변환**

원본 그림 (PNG, EPS)을 PDF로 변환해 사용. PDF 그림이 컴파일 속도를 빠르게.

**최적화 3: latexmk 사용**

`latexmk -pdf main.tex`가 자동으로 필요한 만큼만 컴파일. `pdflatex → bibtex → pdflatex → pdflatex`를 수동으로 할 필요 없다.

**최적화 4: draft 모드**

`\documentclass[draft]{book}`로 draft 모드 사용. 그림이 플레이스홀더로 대체되어 컴파일이 매우 빠르다. 최종 컴파일 전에 draft 모드를 제거.

**최적화 5: Overleaf 또는 로컬 선택**

Overleaf는 서버 컴파일이므로 대형 프로젝트에서 느리다. 박사 학위 논문은 로컬 LaTeX로 작업. 공저자 협업 시만 Overleaf로.

### 버전 관리

박사 학위 논문을 Git으로 버전 관리. 학술 논문과 다르게 박사 학위 논문의 Git은 6-12개월의 긴 집필 기간을 커버.

**전략 1: 의미 있는 커밋**

"edit"이 아닌 의미 있는 커밋 메시지. "Add section 3.2 on methodology", "Update Figure 4.1 with new data", "Fix references in Chapter 5".

**전략 2: 장별 브랜치**

한 장의 큰 수정 시 별도 브랜치에서 작업. main 브랜치를 깨끗하게 유지.

**전략 3: 정기 태그**

중요한 마일스톤에 태그. `thesis-draft-v1`, `thesis-submitted-to-advisor`, `thesis-defense-version`, `thesis-final`.

**전략 4: .gitignore**

컴파일 출력물을 Git에서 제외.

```gitignore
# LaTeX 중간 파일
*.aux
*.bbl
*.bcf
*.blg
*.fdb_latexmk
*.fls
*.log
*.out
*.toc
*.xml
*.synctex.gz
build/
```

PDF 출력은 포함할지 선택. 지도교수가 PDF만 보는 경우 포함. 용량이 크면 제외.

**전략 5: 백업 분산**

GitHub/GitLab 외에 추가 백업. 박사 학위 논문의 손실이 치명적. Dropbox/Google Drive + 외장 하드 + 연구실 서버.

### 박사 학위 논문 템플릿의 활용

학교마다 박사 학위 논문의 LaTeX 템플릿이 있다. 학교의 템플릿을 처음부터 사용.

**템플릿 찾기**:
- 학교의 대학원 웹사이트
- 학교의 박사 졸업생 (선배)의 GitHub
- 학교의 도서관의 박사 학위 논문 가이드

**템플릿의 주의 사항**:
- 학교가 템플릿을 매년 갱신. 최신 버전을 확인.
- 템플릿이 모든 학과를 지원하지 않을 수 있다. 학과별 요구 사항을 확인.
- 템플릿의 제출 형식 (여백, 폰트 크기, 줄 간격)을 준수.

**템플릿 커스터마이징**:
- 학교의 요구 사항을 위반하지 않는 선에서 템플릿을 커스터마이징.
- 매크로, 색상, 폰트를 취향에 맞게.
- 제출 전에 학교의 양식 검토 담당자에게 확인 요청.

### 박사 학위 논문 LaTeX의 흔한 함정

**함정 1: 단일 파일로 작성**

박사 학위 논문을 하나의 `.tex` 파일에 작성. 파일이 3000-5000줄이 된다. 편집이 느려지고 오류 찾기가 어렵다.

방지: 모듈화. 각 장을 별도 파일로.

**함정 2: 매크로 없이 시작**

박사 학위 논문을 매크로 없이 시작. 표기법을 변경하고 싶을 때 전체 논문을 수동으로 수정.

방지: 매크로를 시작부터 사용. 추가 매크로는 집필 중 추가.

**함정 3: 그림의 원본 상실**

그림을 PNG로만 저장. 원본 (PPT, SVG, Python matplotlib 코드)을 삭제. 그림을 수정할 수 없다.

방지: 원본 파일을 `figures/` 폴더의 `sources/` 서브폴더에 저장.

**함정 4: 참고문헌의 수동 관리**

`.bib` 파일을 수동으로 편집. 오타, 불일치, 중복이 발생.

방지: Zotero + Better BibTeX. 자동 생성.

**함정 5: 백업 부재**

박사 학위 논문의 유일한 사본이 노트북에만 있다. 노트북의 손상/분실 시 박사 학위가 위험.

방지: 3-2-1 백업 규칙. ch16과 ch55의 "기술적 재난" 섹션과 연결.

---

## 박사 학위 논문 집필 일정 관리

박사 학위 논문의 LaTeX 작업 자체가 6-12개월의 프로젝트다. 일정 관리가 완성 여부를 결정.

### 6개월 집필 일정의 예시

**월 1: 구조와 Front Matter**
- 학교 템플릿 다운로드와 커스터마이징
- 디렉토리 구조 생성
- 매크로 파일 작성
- 각 장의 개요(outline) 작성
- Front Matter (제목, 목차 구조)

**월 2-3: 핵심 장 작성 (방법론과 결과)**
- 방법론 장 (ch03, ch04)
- 결과 장 (ch05)
- 그림과 표 생성
- 지도교수의 첫 피드백

**월 4: 전후 장 작성 (서론과 결론)**
- 서론 장 (ch01)
- 배경/관련 연구 장 (ch02)
- 토의/결론 장 (ch06, ch07)
- 부록 작성

**월 5: 통합과 검토**
- 전체 통합 컴파일
- 일관성 검토 (용어, 표기법, 참조)
- 지도교수의 전체 피드백
- 수정과 재작성

**월 6: 최종 검토와 제출**
- 영어 교정 (가능하면 전문 교정)
- 참고문헌 최종 검증
- 그림/표 최종 검토
- 학교 양식 검토
- 인쇄와 제출

### 하루 집필 루틴

박사 학위 논문 집필 기간의 이상적 루틴.

- **오전 3-4시간**: 집중 집필. 가장 에너지가 높은 시간.
- **오후 2-3시간**: 편집과 수정. 그림 작성.
- **저녁 1-2시간**: 참고문헌, 부록, 행정 작업.

하루 목표: 1-2페이지의 새 내용 또는 5-10페이지의 수정.

### 박사 학위 논문의 "완성"의 정의

박사 학위 논문의 "완성"은 완벽이 아니라 "제출 가능"이다. 완벽주의에 빠지면 졸업이 무한히 늦어진다.

제출 가능의 기준:
- 모든 장이 존재
- 지도교수가 "제출 가능"이라고 인정
- 학교 양식 준수
- 참고문헌 완전
- 명확한 논리 흐름

"완벽한 박사 학위 논문"을 추구하지 않는다. "제출 가능한 박사 학위 논문"이 목표. 완벽은 논문 출판에서 추구.

---

## 마지막 — LaTeX 프로젝트 관리는 박사 학위 논문의 숨은 기술

박사 학위 논문의 LaTeX 프로젝트 관리가 박사 학위의 숨은 기술이다. 학술 논문의 LaTeX에는 익숙하지만 박사 학위 논문의 LaTeX는 다른 규모의 작업이다. 구조, 매크로, 참고문헌, 컴파일, 버전 관리, 템플릿을 체계적으로 다루면 박사 학위 논문의 집필이 "생존"에서 "효율"로 전환된다.

박사 중반부터 박사 학위 논문의 LaTeX 프로젝트를 천천히 시작한다. 디렉토리 구조, 매크로, 참고문헌 시스템을 미리 구축. 박사 후반에 집중 집필의 시기가 오면 시스템 위에서 집필에만 집중할 수 있다. 시스템 구축에 미리 투자한 시간이 집필의 수백 시간을 절약한다.

## 수식과 표의 고급 LaTeX — 공학 박사의 필수 조판 기술

공학 박사 논문의 페이지마다 수식과 표가 있다. 단순한 `$a+b$` 수준이 아니라 여러 줄의 정렬된 수식, 행렬, 미분 방정식, 복잡한 데이터 표. 이것을 깔끔하게 조판하는 것은 논문의 완성도를 결정한다. 그런데 많은 박사생이 LaTeX의 수식과 표에 대한 피상적 지식만 가지고, 매번 어려움을 겪으며 미숙하게 처리한다. 결과는 읽기 어려운 수식과 정렬이 맞지 않는 표, 그리고 심사에서의 지적이다. 이 섹션은 공학 박사 논문에 자주 등장하는 수식과 표의 고급 LaTeX 기법을 체계적으로 다룬다.

<div class="highlight-box highlight-important">

**"수식과 표의 품질이 논문의 인상을 결정한다".** 독자는 논문을 읽기 전에 먼저 훑어본다. 수식과 표가 엉성하면 "이 저자는 LaTeX를 모르는구나"라는 첫 인상이 생기고, 이것이 내용의 신뢰도에도 영향을 미친다. 반대로 잘 조판된 수식과 표는 "이 논문은 품질이 높다"는 인상을 만든다. 내용이 같아도 조판의 차이가 논문의 수용률을 바꾼다. 박사 과정에서 이 기술에 투자하는 것은 모든 논문에 복리로 돌아온다.

</div>

**수식 환경의 선택.**

LaTeX의 수식 환경은 여러 가지가 있고, 각각의 용도가 다르다.

**인라인 수식**: `$...$` 또는 `\(...\)`
본문에 포함되는 짧은 수식. `\(f(x) = ax + b\)`.

**디스플레이 수식 (번호 없음)**: `\[...\]` 또는 `$$...$$`
별도 줄로 표시되지만 번호가 없는 수식. 짧은 독립 수식.

**equation**: `\begin{equation}...\end{equation}`
번호 있는 단일 수식. 논문에서 가장 흔한 형태.

**align**: `\begin{align}...\end{align}` (amsmath 패키지)
여러 줄의 수식을 정렬. 각 줄에 번호 부여 가능.

**gather**: `\begin{gather}...\end{gather}`
여러 수식을 중앙 정렬하되 서로 정렬 없이.

**split**: `\begin{split}...\end{split}` (equation 내부)
긴 수식을 여러 줄로 나누되 하나의 번호.

**cases**: `\begin{cases}...\end{cases}`
조건별 정의. 예: `f(x) = \begin{cases} x, & x \geq 0 \\ -x, & x < 0 \end{cases}`.

**원칙**: equation과 align이 가장 많이 쓰인다. 단순 수식은 equation, 여러 줄은 align.

**align 환경의 활용.**

align은 박사 논문에서 가장 유용한 환경이다. 정렬 기준이 `&`다.

**기본 예시**:
```latex
\begin{align}
f(x) &= ax^2 + bx + c \\
f'(x) &= 2ax + b \\
f''(x) &= 2a
\end{align}
```

`=` 기호가 정렬된다. 독자가 변화를 따라가기 쉽다.

**복잡한 유도**:
```latex
\begin{align}
\int f(x) \, dx &= \int (ax^2 + bx + c) \, dx \\
&= \frac{ax^3}{3} + \frac{bx^2}{2} + cx + C \\
&= \frac{1}{6}(2ax^3 + 3bx^2 + 6cx) + C
\end{align}
```

두 번째와 세 번째 줄은 LHS 없이 시작. `&=`로 정렬.

**번호 제어**:
- 특정 줄만 번호: `\nonumber` 또는 `\notag`를 해당 줄 끝에
- 전체 환경 번호 없이: `align*`

**align 내 텍스트**:
```latex
\begin{align}
E &= mc^2 && \text{(아인슈타인 공식)} \\
F &= ma && \text{(뉴턴 제2법칙)}
\end{align}
```

`&&`로 텍스트 정렬.

**수식 내 복잡한 표현.**

공학에서 자주 쓰는 복잡한 표현의 LaTeX.

**행렬**:
```latex
\begin{pmatrix} a & b \\ c & d \end{pmatrix}
\begin{bmatrix} a & b \\ c & d \end{bmatrix}
\begin{vmatrix} a & b \\ c & d \end{vmatrix}
```

각각 괄호, 대괄호, 행렬식 표시.

**긴 행렬**: `smallmatrix` 또는 `array`
```latex
\left(\begin{array}{cccc}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{array}\right)
```

**편미분 방정식**:
```latex
\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}
```

더 예쁘게는 `\dfrac`을 사용해 크기 유지.

**적분**:
```latex
\int_{0}^{\infty} e^{-x^2} \, dx = \frac{\sqrt{\pi}}{2}
\iint_{D} f(x,y) \, dA
\oint_{C} \mathbf{F} \cdot d\mathbf{r}
```

`\,`는 미분의 앞 공백. 생략하면 `dx`가 `\int`에 붙어 보기 안 좋다.

**합과 곱**:
```latex
\sum_{i=1}^{n} x_i
\prod_{i=1}^{n} x_i
\lim_{x \to \infty} f(x)
```

**수식 내 텍스트**:
```latex
\[
f(x) = \begin{cases} 
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
\]
```

수식 모드에서 텍스트는 `\text{}` 또는 `\mathrm{}`.

**단위와 숫자.**

공학 논문에서 단위 표기가 중요하다. `siunitx` 패키지를 사용.

```latex
\usepackage{siunitx}

% 숫자
\num{1234567}  % 1,234,567
\num{1.23e-4}  % 1.23 × 10^-4

% 단위
\si{\meter\per\second\squared}  % m/s²
\si{\kilo\gram\meter\per\second\squared}  % kg·m/s²

% 숫자와 단위 결합
\SI{9.81}{\meter\per\second\squared}  % 9.81 m/s²
\SI{1.5e3}{\volt}  % 1.5 × 10³ V

% 범위
\SIrange{10}{20}{\meter}  % 10 m to 20 m
```

이렇게 하면 단위가 일관되게 포맷되고, 숫자 구분자가 통일된다. 표에도 적용 가능.

**수식의 참조.**

수식에 레이블을 붙이고 참조한다.

```latex
\begin{equation}
E = mc^2 \label{eq:einstein}
\end{equation}

본문에서 Eq.~\eqref{eq:einstein} 또는 
식 (\ref{eq:einstein})을 참조...
```

`\eqref`를 쓰면 자동으로 괄호가 붙는다 (`(1)` 형식). `\ref`는 번호만.

**권장 명명 규칙**: `eq:설명`, `fig:설명`, `tab:설명`, `sec:설명` 등 prefix를 붙여 구분.

**매크로로 가독성 향상.**

반복되는 수식 표현을 매크로로 만든다. Preamble에 정의.

```latex
% 일반적인 매크로
\newcommand{\R}{\mathbb{R}}
\newcommand{\E}{\mathbb{E}}
\newcommand{\T}{\mathsf{T}}  % 전치
\newcommand{\norm}[1]{\left\lVert #1 \right\rVert}
\newcommand{\abs}[1]{\left\lvert #1 \right\rvert}
\newcommand{\inner}[2]{\left\langle #1, #2 \right\rangle}

% 도메인 특화
\newcommand{\Reynolds}{\mathrm{Re}}
\newcommand{\Prandtl}{\mathrm{Pr}}
\newcommand{\Nusselt}{\mathrm{Nu}}

% 예시: \norm{\mathbf{x}}를 쓰면 자동 크기 조정 ||x||
```

매크로의 장점:
1. 일관된 표기 (매번 똑같이 쓸 수 있음)
2. 나중에 수정 쉬움 (한 곳만 바꾸면 전체 적용)
3. 가독성 (본인 코드가 읽기 쉬움)

**수식의 포맷 팁.**

1. **미분 기호**: `dx`보다 `\mathrm{d}x`가 표준. 매크로로 `\d`를 정의.
2. **함수명**: `\sin`, `\cos`, `\log` 등 이미 정의된 함수 사용. 직접 `sin`이라 쓰면 기울임으로 나와 틀림.
3. **볼드 벡터**: `\mathbf{x}` 또는 `\boldsymbol{x}`. 후자가 수식 모드 기울임과 결합.
4. **공백 조절**: `\,`(얇은), `\:`(중간), `\;`(두꺼운), `\!`(음수 공백).
5. **여러 줄 수식의 나눔**: 연산자 앞에서 나누지 뒤에서 나누지 말 것. `... \\ + b ...`가 아니라 `... + \\ b ...`.

**표 환경의 선택.**

LaTeX의 표 환경도 여러 가지가 있다.

**tabular**: 기본 표 환경.
**tabularx**: 지정 폭에 맞춰 열 자동 조정.
**booktabs**: 고품질 표 (강력 권장).
**longtable**: 여러 페이지에 걸친 표.
**multirow**, **multicolumn**: 행/열 병합.
**threeparttable**: 표와 설명, 주석을 함께.

**booktabs로 전문적인 표 만들기.**

`booktabs` 패키지가 논문 수준의 표를 만드는 표준이다.

```latex
\usepackage{booktabs}

\begin{table}[t]
\centering
\caption{실험 결과 비교}
\label{tab:results}
\begin{tabular}{lccc}
\toprule
Method & Accuracy (\%) & F1 Score & Time (s) \\
\midrule
Baseline & 82.3 & 0.81 & 15.2 \\
Method A & 87.5 & 0.86 & 18.7 \\
Method B & 91.2 & 0.90 & 25.4 \\
\textbf{Ours} & \textbf{93.7} & \textbf{0.93} & 22.1 \\
\bottomrule
\end{tabular}
\end{table}
```

**booktabs의 규칙**:
- **`\toprule`, `\midrule`, `\bottomrule`**만 사용. 수평 선은 이 세 개 뿐.
- **수직 선 금지**. 세로선을 넣지 않는다. (`|`를 쓰지 말 것)
- **행 사이 선 최소화**: 필요하면 `\cmidrule{2-3}` 같은 부분 선.

이 규칙을 따르면 전문가의 표가 된다. `booktabs`를 안 쓴 표와 나란히 비교하면 차이가 확연하다.

**표 정렬 — `l`, `c`, `r`, `S`**.

- `l`: 왼쪽 정렬 (텍스트)
- `c`: 가운데 정렬
- `r`: 오른쪽 정렬 (짧은 숫자)
- `S`: 소수점 정렬 (siunitx 패키지)

**소수점 정렬의 예시**:
```latex
\usepackage{siunitx}

\begin{tabular}{lSS}
\toprule
Method & {Mean} & {Std} \\
\midrule
Baseline & 82.3 & 2.1 \\
Method A & 87.56 & 1.89 \\
Method B & 91.234 & 0.567 \\
\bottomrule
\end{tabular}
```

`S` 열은 소수점이 정렬된다. 숫자 데이터 표에 필수.

**복잡한 표 — multirow와 multicolumn**.

```latex
\usepackage{multirow}

\begin{tabular}{llcc}
\toprule
\multirow{2}{*}{Category} & \multirow{2}{*}{Method} 
  & \multicolumn{2}{c}{Dataset} \\
\cmidrule{3-4}
& & Train & Test \\
\midrule
\multirow{2}{*}{Linear} & A & 0.85 & 0.82 \\
 & B & 0.87 & 0.84 \\
\multirow{2}{*}{Nonlinear} & C & 0.91 & 0.89 \\
 & D & 0.93 & 0.90 \\
\bottomrule
\end{tabular}
```

- `\multirow{2}{*}{내용}`: 2행에 걸친 셀
- `\multicolumn{2}{c}{내용}`: 2열에 걸친 셀
- `\cmidrule{3-4}`: 3~4열에만 선

**긴 표 — longtable**.

여러 페이지에 걸친 표.

```latex
\usepackage{longtable}

\begin{longtable}{llcc}
\caption{긴 실험 결과} \label{tab:long} \\
\toprule
A & B & C & D \\
\midrule
\endfirsthead

\multicolumn{4}{c}{\tablename\ \thetable{} -- 계속} \\
\toprule
A & B & C & D \\
\midrule
\endhead

\midrule
\multicolumn{4}{r}{\emph{다음 페이지에 계속}} \\
\endfoot

\bottomrule
\endlastfoot

% 여기에 데이터 행들
1 & 2 & 3 & 4 \\
% ...
\end{longtable}
```

복잡하지만 한 번 설정하면 자동으로 페이지 구분.

**표 배치 — `[htbp]`과 `float` 패키지**.

표의 위치를 지정한다.

- `[t]`: 페이지 상단
- `[b]`: 페이지 하단
- `[h]`: 여기 (here)
- `[p]`: 별도 페이지
- `[!]`: 강제 (일반적 규칙 무시)

**원칙**: `[t]`를 기본으로 권장. 논문은 보통 위쪽에 표가 있다.

**강제 배치 — `H` 옵션**:
```latex
\usepackage{float}
\begin{table}[H]
...
\end{table}
```

`[H]`는 "반드시 여기에" 배치. 단, 남용하면 레이아웃이 깨진다.

**표의 캡션과 주석.**

표에는 캡션과 주석이 있다.

```latex
\usepackage{threeparttable}

\begin{table}[t]
\centering
\begin{threeparttable}
\caption{실험 결과\tnote{a}}
\label{tab:exp}
\begin{tabular}{lcc}
\toprule
Method & Accuracy & Time\tnote{b} \\
\midrule
Baseline & 82.3 & 15.2 \\
Ours & 93.7 & 22.1 \\
\bottomrule
\end{tabular}
\begin{tablenotes}
\footnotesize
\item[a] 5-fold 교차 검증의 평균.
\item[b] GPU 시간, 초 단위.
\end{tablenotes}
\end{threeparttable}
\end{table}
```

표 아래에 주석을 달 때 `threeparttable`을 사용.

**수식과 표의 공통 실수.**

박사생이 자주 하는 실수들.

**수식의 실수**:
1. 함수명에 `\` 안 붙임: `sin(x)` 대신 `\sin(x)`
2. 변수에 `\mathrm` 사용: `\mathrm{v}`가 아닌 `v`
3. 수식 내 한글 (예외적 상황 제외)
4. `$$...$$` 사용 (구식, `\[...\]` 또는 환경 사용)
5. 긴 수식을 한 줄에 붙여 씀
6. `\left(` 없이 큰 분수에 `(` 사용

**표의 실수**:
1. 세로선 사용 (`|`)
2. 모든 행에 수평선
3. 숫자 정렬 안 함
4. 폭 지정 없이 좁은 열에 긴 텍스트
5. 캡션을 표 아래에 (표의 캡션은 위)
6. `\bf` 같은 구식 굵게 (대신 `\textbf` 또는 `\bfseries`)

**수식과 표 디버깅**.

LaTeX의 수식과 표는 에러가 자주 발생한다.

**흔한 에러와 해결**:

1. **"Missing $ inserted"**: 본문에서 수식 모드로 전환 안 됨. `$`로 감쌈.
2. **"Extra alignment tab"**: 표의 `&` 개수가 선언한 열 수와 안 맞음.
3. **"Misplaced alignment tab"**: `align` 밖에서 `&` 사용.
4. **"Package amsmath: Missing & in alignment at position X"**: align 내 `&` 누락.
5. **표가 페이지 밖으로 나감**: 열 폭 지정 필요 (tabularx 또는 p{폭}).

**디버깅 팁**:
- 작은 예시로 시작해서 점차 추가
- `\begin` / `\end`가 짝이 맞는지 확인
- `%`로 일부를 주석 처리해서 에러 위치 찾기

**박사 논문 수식과 표의 일관성.**

박사 논문은 수십 페이지에 걸쳐 수식과 표가 등장한다. 일관성이 중요.

**일관성을 위한 체크리스트**:
- [ ] 모든 수식이 같은 번호 스타일 (예: (1.1) 또는 (1))
- [ ] 같은 변수가 같은 기호로 표기 (x vs X)
- [ ] 모든 표가 같은 booktabs 스타일
- [ ] 소수점 자리수가 일관 (2자리 또는 3자리)
- [ ] 단위 표기 통일 (siunitx 사용)
- [ ] 참조 형식 일관 (Eq.~1, Table~1 등)

Preamble에서 매크로와 설정을 정의하고 모든 곳에 동일하게 적용.

**수식과 표의 효율 — 복사-붙여넣기에서 자동 생성으로**.

많은 박사생이 수식과 표를 복사-붙여넣기로 만든다. 이것은 오류의 원인이 된다. 고급 방법은 자동 생성.

**수식 자동 생성 — SymPy + LaTeX**:
```python
from sympy import symbols, integrate, latex

x, a, b = symbols('x a b')
expr = a*x**2 + b*x + 1
integral = integrate(expr, x)
print(latex(integral))
# 결과: \frac{a x^{3}}{3} + \frac{b x^{2}}{2} + x
```

이 출력을 논문에 복사. 수식 오류가 크게 줄어든다.

**표 자동 생성 — Pandas**:
```python
import pandas as pd

df = pd.DataFrame({
    'Method': ['Baseline', 'Method A', 'Ours'],
    'Accuracy': [82.3, 87.5, 93.7],
    'F1': [0.81, 0.86, 0.93],
})

# booktabs 스타일 표로 출력
print(df.to_latex(
    index=False,
    column_format='lcc',
    float_format='%.2f',
))
```

이것이 실험 결과가 바뀔 때마다 표를 다시 만드는 시간을 크게 줄인다. ch16의 재현성과 연결.

**공학 분야별 특화 패키지.**

분야에 맞는 특수 패키지들.

**화학 공학**: `chemformula`, `mhchem`
```latex
\usepackage{mhchem}
\ce{H2O}  % H₂O
\ce{2H2 + O2 -> 2H2O}  % 화학 반응식
```

**물리학**: `physics`
```latex
\usepackage{physics}
\dv{f}{x}  % df/dx (미분)
\pdv{f}{x}  % ∂f/∂x (편미분)
\expval{x}  % ⟨x⟩ (기댓값)
\mel{\phi}{H}{\psi}  % ⟨φ|H|ψ⟩ (행렬 요소)
```

**기계 공학**: 일반 패키지로 충분하지만 `siunitx`가 필수.

**전기전자**: `circuitikz`로 회로도 그리기.

분야의 표준 패키지를 알고 사용하는 것이 효율과 품질을 함께 높인다.

**수식과 표 품질의 장기적 가치.**

수식과 표의 조판 기술을 박사 1-2년차에 익히면 박사 전체에 복리로 돌아온다.

1. **속도**: 매번 새로 배우지 않고 빠르게 작성
2. **품질**: 리뷰어의 "수식/표 지적"이 줄어듦
3. **일관성**: 모든 논문이 같은 스타일
4. **자신감**: 복잡한 수식/표에 두려움 없음
5. **후배 지도**: 후배에게 가르칠 수 있는 기술
6. **학위 논문의 효율**: 집필 시 기술적 문제가 아닌 내용에 집중

**학습 자원**:
- **"LaTeX Companion"**: 표준 참고서
- **Overleaf의 학습 섹션**: 대화형 튜토리얼
- **TeX Stack Exchange**: 구체적 질문 답변
- **본인 분야의 좋은 논문의 소스**: arXiv에서 .tex 파일 다운로드 가능
- **TikZ 예시**: texample.net

> 수식과 표의 LaTeX은 공학 박사생의 필수 도구다. 박사 과정 초반에 이 기술에 2-3일을 투자하면 이후 5-6년의 모든 논문 작성에 이익이 돌아온다. 논문의 내용이 아무리 훌륭해도 수식과 표가 엉성하면 독자의 첫 인상이 나빠진다. 반대로 깔끔하고 전문적인 수식과 표는 논문에 "품질의 후광"을 만든다. 박사 1-2년차부터 이 섹션의 원칙들을 실천하라. 모든 논문이 조금씩 더 좋아진다.

박사 학위 논문의 LaTeX가 박사의 기술적 결과물의 최종 형태다. LaTeX를 도구가 아니라 박사의 한 부분으로 본다면 박사 학위 논문을 자부심으로 완성할 수 있다.

## 글쓰기 도구의 통합 워크플로 — VS Code + LaTeX + Git의 현대적 조합

박사 과정의 글쓰기 도구를 선택하는 것은 한 번만이 아니라 5-7년의 결정이다. 오늘 선택한 도구와 워크플로가 박사 기간 내내 수천 시간의 작업에 영향을 준다. 많은 학생이 이 결정을 피상적으로 한다. "Overleaf가 편하니까"로 시작해서 5년 내내 같은 환경. 그러나 박사 과정의 요구사항은 점점 커진다. 협업, 버전 관리, 여러 논문 동시 작성, 큰 규모의 학위 논문. 이것들을 감당하려면 더 강력한 워크플로가 필요하다. 이 섹션은 **VS Code + LaTeX + Git**의 통합 워크플로를 다룬다. 이것은 소프트웨어 개발자들의 워크플로를 학술 글쓰기에 적용한 것이고, 박사 후반에 갈수록 Overleaf보다 강력해진다.

<div class="highlight-box highlight-important">

**"Overleaf는 입문에 좋지만 박사 후반에는 부족하다".** Overleaf는 진입 장벽이 낮고 협업이 쉽다. 그러나 인터넷 의존, 큰 프로젝트의 느림, 버전 관리의 제약, 오프라인 작업 불가 등의 한계가 있다. 박사 3-4년차에 여러 논문을 동시에 쓰고, 학위 논문을 시작하고, 데이터와 코드와 논문을 모두 관리하기 시작하면 Overleaf의 한계가 보인다. 로컬 환경에 투자하는 것이 박사 중반에 "시간이 아니라 투자"가 된다. VS Code + LaTeX + Git 조합은 현재의 가장 강력한 로컬 워크플로다.

</div>

**왜 VS Code인가**.

학술 글쓰기용 에디터는 여러 선택이 있다.

**주요 선택**:
- **VS Code**: Microsoft, 무료, 강력한 확장
- **Vim/Neovim**: 전통적, 학습 곡선 가파름
- **Emacs**: 고급 사용자, 매우 커스터마이즈 가능
- **TeXstudio**: LaTeX 전용, 쉬움
- **Sublime Text**: 빠름, 유료
- **Kile**: Linux 용, LaTeX 전용

**VS Code의 장점**:
1. **무료**: 영구 무료
2. **플랫폼 독립**: Windows/Mac/Linux
3. **강력한 확장**: 수천 개의 확장 (LaTeX 포함)
4. **통합 기능**: 에디팅, Git, 터미널이 한 창에
5. **원격 편집**: SSH로 원격 서버 접속
6. **AI 통합**: Copilot, Claude 등
7. **커뮤니티**: 활발한 사용자층

**VS Code의 단점**:
1. **Vim/Emacs만큼 빠르지 않음**
2. **초기 설정 필요**
3. **때로는 무겁다**

**권장**: 박사생에게 VS Code는 거의 항상 좋은 선택. 특히 코딩과 글쓰기를 병행하는 공학 박사에게 이상적.

**VS Code의 LaTeX 설정**.

VS Code를 LaTeX 편집기로 만드는 단계.

**단계 1: LaTeX 배포판 설치**.
- **Windows**: MiKTeX 또는 TeX Live
- **Mac**: MacTeX
- **Linux**: TeX Live (`sudo apt install texlive-full`)

**단계 2: VS Code 설치**.
code.visualstudio.com에서 다운로드.

**단계 3: LaTeX Workshop 확장 설치**.
Extensions 패널에서 "LaTeX Workshop" 검색 → 설치.

이 확장이 VS Code를 전문 LaTeX 편집기로 만든다.

**단계 4: 기본 설정**.
Settings (⌘,) → Extensions → LaTeX Workshop → 주요 설정:

```json
{
  "latex-workshop.latex.autoBuild.run": "onSave",
  "latex-workshop.view.pdf.viewer": "tab",
  "latex-workshop.synctex.afterBuild.enabled": true,
  "latex-workshop.latex.clean.subfolder.enabled": true,
  "latex-workshop.message.error.show": true,
  "latex-workshop.message.warning.show": false
}
```

**단계 5: 첫 테스트**.
간단한 `.tex` 파일을 만들고 저장. 자동으로 컴파일되어 PDF가 옆에 표시되어야 함.

**LaTeX Workshop의 주요 기능**.

기본 설정 후 사용할 수 있는 기능들.

**기능 1: 자동 컴파일**.
저장 시 자동으로 LaTeX 컴파일. `Ctrl+S` → PDF 즉시 업데이트.

**기능 2: SyncTeX**.
PDF의 한 부분을 클릭하면 해당 .tex 소스로 이동. 반대도 가능. 큰 문서에서 매우 유용.

**기능 3: 자동 완성**.
`\section`, `\cite`, `\ref` 등의 명령어 자동 완성. 참고문헌 이름도 자동 완성.

**기능 4: 구문 강조**.
LaTeX 명령어, 수식, 환경이 색깔로 구분. 가독성 향상.

**기능 5: 오류 표시**.
컴파일 오류가 표시. 클릭하면 해당 줄로 이동.

**기능 6: 개요 (Outline)**.
문서의 section/subsection 구조를 트리로 표시. 큰 문서의 탐색.

**기능 7: 스니펫**.
`\fig` → `\begin{figure}...\end{figure}` 자동 확장.

**이 기능들이 조합되어** LaTeX 작업이 크게 가속화된다.

**VS Code에서 Git 통합**.

VS Code의 내장 Git 지원.

**기본 Git 기능**:
- Source Control 패널에서 변경 사항 확인
- 파일 옆 표시 (M=수정, U=새로운)
- 라인별 Git blame
- Inline diff
- 커밋, push, pull UI

**Git 확장**:
- **GitLens**: 강력한 Git 기능. 각 줄의 마지막 변경자, 히스토리 등.
- **Git Graph**: 브랜치 그래프 시각화
- **Git History**: 파일 히스토리

**워크플로**:
1. 파일 편집
2. Source Control 패널에서 변경 확인
3. 커밋 메시지 입력
4. `Ctrl+Enter`로 커밋
5. ... → Push로 원격 업로드

**LaTeX과 Git의 결합**:
각 편집을 작은 커밋으로. 예: "Add introduction paragraph", "Fix equation 3", "Update figure 2 caption".

**1일 10-20 커밋**도 정상. 자주 커밋하는 것이 복구의 안전망.

**본격 워크플로 — 한 논문 작성의 흐름**.

구체적 예시: 논문을 처음부터 끝까지 작성.

**Day 1: 프로젝트 생성**.
```bash
mkdir my-paper
cd my-paper
git init
mkdir figures bibliography sections
touch main.tex
touch bibliography/refs.bib
touch .gitignore
```

**.gitignore 설정**:
```
*.aux
*.log
*.bbl
*.blg
*.out
*.pdf  # 또는 제외: !final.pdf
*.synctex.gz
```

**main.tex 초안**:
```latex
\documentclass{article}
\usepackage{amsmath}
\usepackage{graphicx}
\usepackage{natbib}

\title{My Paper}
\author{Me}

\begin{document}
\maketitle
\input{sections/introduction}
\input{sections/methods}
\input{sections/results}
\input{sections/discussion}
\input{sections/conclusion}
\bibliographystyle{plain}
\bibliography{bibliography/refs}
\end{document}
```

**첫 커밋**:
```bash
git add -A
git commit -m "Initial paper structure"
```

**Day 2-10: 섹션 작성**.
각 섹션을 `sections/` 폴더의 별도 파일로:
- `sections/introduction.tex`
- `sections/methods.tex`
- `sections/results.tex`

**장점**:
- 한 번에 한 섹션 집중
- Git diff가 더 명확
- 협업 시 충돌 적음

**Day 11-15: 그림과 표 통합**.
`figures/` 폴더에 PDF/PNG 추가. LaTeX에서 참조:
```latex
\includegraphics[width=\textwidth]{figures/fig1.pdf}
```

**Day 16-20: 수정과 개선**.
작은 수정마다 커밋. Git log로 진척 추적.

**Day 21: 최종 빌드**.
```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

또는 `latexmk`:
```bash
latexmk -pdf main.tex
```

**최종 커밋**:
```bash
git tag v1.0-submitted
git add -A
git commit -m "Initial submission"
```

**이 워크플로가** 처음에는 복잡해 보이지만 점차 자연스러워진다.

**latexmk와 빌드 자동화**.

`latexmk`는 LaTeX 컴파일의 자동화 도구다.

**기본 사용**:
```bash
latexmk -pdf main.tex
```

한 번의 명령으로 pdflatex + bibtex + 여러 pass를 자동으로.

**지속적 컴파일 (continuous build)**:
```bash
latexmk -pdf -pvc main.tex
```

`-pvc` = "preview continuously". 파일이 변할 때마다 자동 재컴파일. Overleaf와 유사한 경험.

**설정 파일**: `.latexmkrc` 또는 `latexmkrc`
```perl
$pdf_mode = 1;
$bibtex_use = 2;
$pdf_previewer = 'open -a Preview';
$clean_ext = 'synctex.gz';
```

프로젝트 루트에 이 파일을 두면 자동 적용.

**VS Code 통합**: LaTeX Workshop이 자동으로 latexmk 사용.

**참고문헌 관리 — Zotero와의 연동**.

VS Code에서 참고문헌 관리.

**Zotero 설정**:
1. Zotero 설치 (zotero.org)
2. Better BibTeX 확장 설치
3. Auto-export 설정

**Auto-export 방법**:
1. Zotero에서 라이브러리 선택
2. File → Export Library
3. Format: "Better BibTeX"
4. "Keep updated"와 "Automatic Export" 체크
5. 프로젝트의 `bibliography/refs.bib`에 저장

**VS Code에서 사용**:
```latex
% refs.bib이 자동 업데이트됨
\cite{smith2024}  % 자동 완성 지원
```

**워크플로**:
1. Zotero에 논문 추가 (브라우저 플러그인으로 한 번 클릭)
2. 자동으로 refs.bib 업데이트
3. VS Code에서 `\cite{` 입력 시 자동 완성
4. 새 논문을 추가하면 즉시 사용 가능

**이것이 "끊김 없는" 참고문헌 관리**를 만든다.

**멀티 파일 프로젝트 관리**.

큰 문서 (학위 논문)는 여러 파일로 분할.

**디렉토리 구조**:
```
thesis/
├── main.tex
├── preamble.tex
├── titlepage.tex
├── abstract.tex
├── acknowledgments.tex
├── chapters/
│   ├── chapter1_intro.tex
│   ├── chapter2_background.tex
│   ├── chapter3_methods.tex
│   ├── chapter4_results.tex
│   └── chapter5_conclusion.tex
├── appendices/
│   ├── appA.tex
│   └── appB.tex
├── figures/
│   └── (chapter별 하위 폴더)
├── bibliography/
│   └── refs.bib
└── .gitignore
```

**main.tex**:
```latex
\documentclass{thesis}
\input{preamble}

\begin{document}
\input{titlepage}
\input{abstract}
\input{acknowledgments}
\tableofcontents
\listoffigures
\listoftables

\input{chapters/chapter1_intro}
\input{chapters/chapter2_background}
\input{chapters/chapter3_methods}
\input{chapters/chapter4_results}
\input{chapters/chapter5_conclusion}

\appendix
\input{appendices/appA}
\input{appendices/appB}

\bibliographystyle{plain}
\bibliography{bibliography/refs}
\end{document}
```

**장점**:
- 각 챕터를 독립적으로 편집
- Git diff가 명확
- 병렬 작업 가능 (협업 시)
- 한 파일의 오류가 다른 파일에 영향 적음

**`\subfile` 패키지**: 각 챕터를 독립적으로 컴파일 가능. 빠른 미리보기.

**원격 서버에서의 편집**.

VS Code Remote 확장으로 원격 서버에서 편집.

**Remote - SSH 확장 설치**:
Extensions에서 "Remote - SSH" 검색 → 설치.

**사용법**:
1. `Ctrl+Shift+P` → "Remote-SSH: Connect to Host"
2. SSH 정보 입력
3. 원격 서버에 연결
4. 로컬처럼 편집

**사용 시나리오**:
- HPC 서버에서 시뮬레이션 + 논문 작성
- 연구실 서버의 공유 파일 편집
- 여러 컴퓨터 간 환경 동기화

**장점**:
- 로컬 설정 그대로
- 원격 컴퓨팅 자원 활용
- 서로 다른 환경의 통합

**연구실의 공유 Linux 서버에서 작업**할 때 특히 유용.

**AI 통합 — Copilot과 LLM의 활용**.

VS Code에 AI 어시스턴트 통합.

**GitHub Copilot**:
- 코드 작성 보조
- LaTeX도 일부 지원
- 학생은 무료 (GitHub Student Pack)

**Copilot for LaTeX**:
- 표의 자동 완성
- 반복되는 구조 생성
- 참고문헌 키 완성

**주의**:
- AI가 만든 내용은 반드시 검토
- 학술 내용 (수식, 논증)은 AI에 맡기지 말자
- ch09의 AI 글쓰기 원칙 적용

**다른 LLM 통합**:
- Continue 확장: Claude, GPT-4 등과 통합
- Codeium: 무료 대안

**활용**: 형식적 LaTeX 생성은 AI, 학술 내용은 본인. 이것이 건강한 조합.

**Preview의 최적화**.

LaTeX의 PDF 미리보기 설정.

**옵션 1: 외부 PDF 뷰어**.
- **Windows**: SumatraPDF (lightweight, auto-reload)
- **Mac**: Skim (SyncTeX 지원)
- **Linux**: Zathura (vim-like)

이들이 LaTeX 편집 중 자동 새로고침.

**옵션 2: VS Code 내부 탭**.
기본 설정. VS Code의 PDF 탭에서 표시.

**옵션 3: 브라우저**.
PDF를 브라우저에서 표시. 외부 창으로 분리 가능.

**SyncTeX 설정**:
소스 ↔ PDF의 양방향 동기화. `\usepackage[synctex=1]` 또는 컴파일 옵션.

**듀얼 모니터 팁**: 한 모니터에 VS Code, 다른 모니터에 PDF. 매우 생산적.

**버전 관리 전략 — 논문을 위한 Git**.

코드를 위한 Git과 다른 원칙이 적용된다.

**원칙 1: 매일 커밋**.
큰 변경 없어도 매일. "Working on introduction" 같은 WIP 커밋 OK.

**원칙 2: 의미 있는 메시지**.
```
좋은 예:
"Fix grammar in Section 3"
"Add experiment results to Table 2"
"Rewrite abstract for clarity"

나쁜 예:
"Update"
"asdf"
"wip"
```

**원칙 3: 섹션별 커밋**.
한 커밋에 한 섹션의 변경. 기능별 분리.

**원칙 4: 브랜치 활용**.
- `main`: 최신 안정 버전
- `revision`: 리비전 작업
- `experimental-intro`: 새 서론 시도

**원칙 5: 태그**.
제출 시점에 태그:
```bash
git tag v1.0-submission
git tag v2.0-revision1
git tag v3.0-accepted
```

**원칙 6: Force push 금지**.
문서의 경우 Git 히스토리 재작성은 위험. 실수한 커밋은 revert로.

**협업 시의 Git**.

공저자와 함께 쓸 때의 워크플로.

**방법 1: GitHub/GitLab 공유**.
```bash
# 저장소 생성
git remote add origin https://github.com/user/paper.git

# Push
git push -u origin main

# 공저자 초대
# (웹 UI에서)
```

**방법 2: 브랜치 기반 워크플로**.
각 저자가 자신의 브랜치에서 작업 → Pull Request로 통합.

**방법 3: 단순 main 작업**.
소규모 팀. 모두가 main에서 직접 작업. 수시 pull.

**충돌 해결**:
같은 파일의 같은 부분을 동시에 수정하면 conflict. 수동 해결 필요.

**예방**:
- 작업 시작 전 pull
- 작업 종료 후 즉시 push
- 섹션별로 작업 분리
- 명확한 소통 ("내가 Section 3 작업한다")

**텍스트 파일의 merge는 코드보다 까다롭다**. 작은 단위로 자주 공유.

**Overleaf와의 공존**.

Overleaf를 완전히 버릴 필요는 없다. 상황에 따라 선택.

**Overleaf의 장점**:
- 설정 없이 즉시 시작
- 공저자와 실시간 협업
- 모바일 접근
- 자동 백업

**Overleaf와 Git 동기화**:
1. Overleaf 프로젝트 → "Git"
2. 로컬에 clone
3. 로컬에서 작업 후 push
4. Overleaf에서 자동 업데이트

**하이브리드 워크플로**:
- 본인: VS Code + LaTeX + Git (강력한 기능)
- 공저자: Overleaf (간편함)
- 동기화: Git bridge

**전환 시기**: 박사 초반은 Overleaf, 중반부터 로컬. 또는 논문별로 다른 선택.

**학습 곡선 관리**.

이 모든 것이 동시에 너무 복잡할 수 있다. 단계적 학습.

**1주차**: VS Code + LaTeX Workshop 설치, 간단한 .tex 파일 작성.
**2주차**: Git 기초, 로컬 저장소.
**3-4주차**: Zotero 연동.
**5-6주차**: 멀티 파일 프로젝트.
**7-8주차**: 원격 저장소, 협업.
**9-10주차**: 고급 기능, 자동화.

**원칙**: 한 번에 한 가지씩. 모든 것을 동시에 배우려 하지 말자.

**체크리스트 — 통합 워크플로의 구축**.

<div class="highlight-box highlight-info">

**VS Code + LaTeX + Git 워크플로 체크리스트**

- [ ] LaTeX 배포판 설치
- [ ] VS Code 설치와 기본 설정
- [ ] LaTeX Workshop 확장 설치
- [ ] 첫 .tex 파일 컴파일 성공
- [ ] SyncTeX 작동 확인
- [ ] Git 로컬 저장소 생성
- [ ] .gitignore 설정
- [ ] Zotero + Better BibTeX 연동
- [ ] 자동 완성 작동 확인
- [ ] 원격 저장소 (GitHub/GitLab) 연결
- [ ] 멀티 파일 프로젝트 구조 구축
- [ ] latexmk 또는 자동 빌드 설정

</div>

이 12가지를 완료하면 워크플로가 전문적이 된다.

**투자의 회수**.

이 모든 설정에 시간이 든다. 회수는 언제 올까.

**초기 설정**: 5-10시간 (1-2일)
**학습 기간**: 2-4주 (점진적)
**익숙해짐**: 2-3개월

**회수**:
- **6개월 후**: 투자 회수 시작
- **1년 후**: 확연히 더 생산적
- **박사 전체**: 수천 시간 절약

**계산**: 박사 5-6년 동안 논문 10편 + 학위 논문 = 수만 줄의 LaTeX. 하루 10% 시간 절약 = 전체 수백 시간. 투자 대비 100배 이상.

**지속적 개선**.

워크플로는 고정이 아니다. 지속적으로 개선.

**정기 리뷰**:
- 3개월마다: 현재 워크플로의 불편함?
- 6개월마다: 새로운 도구/확장 시도?
- 1년마다: 전체 구조 재평가?

**개선의 원천**:
- 동료의 팁
- 블로그/유튜브 튜토리얼
- VS Code의 새 버전/확장
- 작업 패턴 변화

**원칙**: "작동하는 것"에 집착하지 말고 "더 나은 것"을 항상 탐색.

**박사 이후의 가치**.

이 워크플로는 박사 이후에도 계속 쓰인다.

**포스닥에서**:
- 같은 도구로 새 환경에서 작업
- 설정 이전이 쉬움
- 새 협력자 가르치기 쉬움

**교수직에서**:
- 학생들에게 가르침
- 연구 그룹의 표준화
- 여러 논문 동시 관리

**산업체에서**:
- 기술 문서 작성
- Git 기반 워크플로가 표준
- VS Code는 산업체에서도 주류

**평생 기술**: 한 번 익힌 이 워크플로가 20-30년 쓰인다.

> 글쓰기 도구의 통합 워크플로는 박사 과정의 숨은 투자다. 눈에 보이지 않지만, 수천 시간의 작업에 영향을 준다. 박사 1-2년차에 5-10시간을 투자해 VS Code + LaTeX + Git 환경을 구축하면, 박사 5-7년 동안 수백 시간을 절약하고 훨씬 생산적인 글쓰기를 할 수 있다. Overleaf의 편리함을 넘어서 더 강력한 로컬 환경으로 이동하는 것은 박사 중반의 자연스러운 성장이다. 이 워크플로가 본인을 "LaTeX 사용자"에서 "문서 시스템 관리자"로 격상시킨다.
