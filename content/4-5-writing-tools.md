## 논문 작성 도구 비교

논문의 내용만큼 형식도 중요하다. 저널마다 요구하는 템플릿, 참고문헌 스타일, 수식 표기가 다르므로, 적합한 작성 도구를 선택하면 형식 맞추기에 소모되는 시간을 크게 줄일 수 있다.

<div class="card-grid">
  <div class="card">
    <span class="card-tag tag-green">필수</span>
    <span class="card-icon">📝</span>
    <div class="card-title">LaTeX / Overleaf</div>
    <div class="card-desc">학술 논문 조판의 표준. 수식, 참고문헌, 그림 번호를 자동 관리한다. Overleaf는 브라우저에서 실시간 공동 편집이 가능하여 지도교수와의 협업에 적합하다. 대부분의 저널이 LaTeX 템플릿을 제공한다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-blue">범용</span>
    <span class="card-icon">📄</span>
    <div class="card-title">MS Word</div>
    <div class="card-desc">빠른 초안 작성에 유리하다. Track Changes 기능으로 지도교수의 수정 사항을 추적할 수 있다. 일부 저널은 Word 템플릿만 제공하므로 기본적인 사용법은 숙지해야 한다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-orange">신규</span>
    <span class="card-icon">✨</span>
    <div class="card-title">Typst</div>
    <div class="card-desc">차세대 조판 시스템으로, LaTeX보다 문법이 직관적이고 컴파일이 빠르다. 학습 곡선이 낮아 LaTeX에 어려움을 느끼는 경우 대안이 될 수 있다. 다만 저널 템플릿 지원은 아직 제한적이다.</div>
  </div>
  <div class="card">
    <span class="card-tag tag-green">무료</span>
    <span class="card-icon">☁️</span>
    <div class="card-title">Google Docs</div>
    <div class="card-desc">실시간 공동 편집에 최적화되어 있다. 초기 아이디어 정리, 공동 저자 간 브레인스토밍에 활용한다. 수식과 참고문헌 관리가 약하므로 최종 원고 작성에는 부적합하다.</div>
  </div>
</div>

---

## 참고문헌 관리

논문에서 참고문헌 관리를 수동으로 하면 반드시 실수가 생긴다. 전용 도구를 사용하여 수집, 정리, 인용 삽입을 자동화한다.

<div class="card-grid">
  <div class="card">
    <span class="card-icon">📚</span>
    <div class="card-title">Zotero</div>
    <div class="card-desc">무료 오픈소스. 브라우저 확장(Zotero Connector)으로 클릭 한 번에 논문을 수집한다. Word, Google Docs, LaTeX(BibTeX 내보내기) 모두 연동된다. 그룹 라이브러리로 연구실 공유도 가능하다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📖</span>
    <div class="card-title">Mendeley</div>
    <div class="card-desc">무료. PDF 관리와 주석 기능이 편리하다. 내장 PDF 뷰어에서 직접 하이라이트와 메모를 추가할 수 있다. Elsevier 소속이라 ScienceDirect 연동이 원활하다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🏛️</span>
    <div class="card-title">EndNote</div>
    <div class="card-desc">상용이지만 많은 대학에서 기관 라이선스를 제공한다. Word와의 연동이 가장 안정적이며, 대규모 라이브러리(수천 편) 관리에 강점이 있다.</div>
  </div>
</div>

---

## 영어 교정 도구

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>영어 논문 교정 전략</strong></p>
    <p><strong>Grammarly</strong> — 문법, 철자, 구두점 오류를 실시간으로 잡아준다. 브라우저 확장이나 데스크톱 앱으로 Overleaf, Word에서 사용 가능하다. 무료 버전만으로도 기본 교정에 충분하다.</p>
    <p><strong>DeepL Write</strong> — 문장 단위 교정과 자연스러운 표현 제안에 강점이 있다. 한국어 초안을 영어로 번역한 후 다듬는 용도로도 활용된다.</p>
    <p><strong>ChatGPT / Claude</strong> — 문단 단위 교정, 학술적 톤 조정, 패러프레이징에 활용한다. 단, AI가 생성한 표현을 무비판적으로 수용하지 말고 반드시 검토한다.</p>
    <p><strong>저널별 Style Guide를 확인한다.</strong> 미국식/영국식 영어, 약어 규칙, 숫자 표기법이 저널마다 다르다. Author Guidelines를 투고 전에 반드시 정독한다.</p>
  </div>
</div>

---

## LaTeX vs Word 선택

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>상황에 따른 선택 기준</strong></p>
    <p>수식이 많은 논문이면 LaTeX가 압도적으로 편하다. 공동 작업에서 Track Changes가 필요하면 Word가 유리하다. Overleaf를 쓰면 LaTeX의 장점 + 실시간 공동 편집을 모두 얻을 수 있다. 대부분의 공학 저널은 LaTeX 템플릿을 제공한다. 지도교수가 Word를 선호하면 Word로 쓰되, 최종 조판만 LaTeX로 변환하는 방법도 있다.</p>
  </div>
</div>

---

## Zotero → Overleaf 워크플로우

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🌐</div>
    <div class="pipeline-step-title">논문 저장</div>
    <div class="pipeline-step-desc">브라우저에서 Zotero Connector로 클릭 한 번에 수집한다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📂</div>
    <div class="pipeline-step-title">컬렉션별 정리</div>
    <div class="pipeline-step-desc">프로젝트/주제별로 폴더를 나눠 관리한다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📤</div>
    <div class="pipeline-step-title">BibTeX 내보내기</div>
    <div class="pipeline-step-desc">Better BibTeX 플러그인으로 자동 내보내기를 설정한다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔗</div>
    <div class="pipeline-step-title">Overleaf 연동</div>
    <div class="pipeline-step-desc">.bib 파일을 프로젝트에 업로드한다</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📝</div>
    <div class="pipeline-step-title">\cite{key}로 인용</div>
    <div class="pipeline-step-desc">참고문헌이 자동 생성된다</div>
  </div>
</div>
