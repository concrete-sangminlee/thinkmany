## 왜 그림과 표가 중요한가

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>리뷰어는 그림과 표를 먼저 본다</strong></p>
    <p>논문 심사를 맡은 리뷰어는 수십 페이지의 본문을 읽기 전에 먼저 그림과 표를 훑어본다. 잘 만든 그림 하나가 논문의 첫인상을 결정하고, 엉성한 그림 하나가 전체 연구의 신뢰도를 떨어뜨린다. 스스로에게 물어보라: "그림만 보고 이 논문의 스토리가 이해되는가?" 이것이 좋은 그림의 기준이다.</p>
  </div>
</div>

---

## 그림 작성 도구

<div class="card-grid">
  <div class="card">
    <span class="card-icon">📊</span>
    <div class="card-title">matplotlib / seaborn</div>
    <div class="card-desc">Python 기반 데이터 플롯 도구다. 선 그래프, 산점도, 히트맵, 등고선 등 거의 모든 유형의 학술 그래프를 만들 수 있다. 코드로 생성하므로 재현성이 높고, 스타일을 일괄 변경하기 쉽다. 논문 품질의 그래프를 만들 수 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">✏️</span>
    <div class="card-title">draw.io / Inkscape</div>
    <div class="card-desc">다이어그램, 프레임워크 도식, 방법론 흐름도 등을 만들 때 사용한다. 둘 다 무료이며 벡터 포맷(SVG)을 지원한다. draw.io는 웹 기반으로 설치 없이 사용 가능하고, Inkscape는 세밀한 벡터 편집에 강하다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📐</span>
    <div class="card-title">PowerPoint</div>
    <div class="card-desc">간단한 개념도나 설명 다이어그램을 빠르게 만들 때 적합하다. 대부분의 연구자에게 익숙한 도구라 학습 비용이 없다. 단, 복잡한 그래프에는 적합하지 않으며 벡터 출력 시 EMF로 저장해야 한다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📏</span>
    <div class="card-title">TikZ / PGFPlots</div>
    <div class="card-desc">LaTeX 내장 그래픽 도구로, 논문 본문과 그림의 폰트/스타일이 완벽하게 통일된다. 학습 곡선이 높지만, 익숙해지면 가장 깔끔한 결과를 만들 수 있다. 특히 수식이 포함된 도식에 강하다.</div>
  </div>
</div>

---

## 좋은 그림 vs 나쁜 그림

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>벡터 포맷(SVG, PDF, EPS)을 사용한다 — 확대해도 깨지지 않는다</li>
      <li>모든 축에 라벨과 단위를 명시한다 — "Stress (MPa)", "Time (s)"</li>
      <li>폰트 크기를 10pt 이상으로 설정한다 — 논문에 삽입 후 축소되어도 읽혀야 한다</li>
      <li>논문 전체에서 색상 팔레트를 통일한다 — Figure 1의 파란색과 Figure 3의 파란색이 같은 대상을 나타내야 한다</li>
      <li>범례(legend)를 명확하게 배치한다 — 데이터와 겹치지 않는 위치에 놓는다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>스크린캡처를 그림으로 사용한다 — 해상도가 낮고, 출판 시 흐려진다</li>
      <li>불필요한 3D 차트를 사용한다 — 2D로 충분한 데이터를 3D로 만들면 오히려 읽기 어렵다</li>
      <li>빨강-초록 조합을 사용한다 — 색각이상(색맹) 독자가 구분할 수 없다</li>
      <li>장식적 요소(그림자, 그라데이션, 3D 효과)를 과다하게 넣는다</li>
      <li>해상도 낮은 래스터 이미지(JPG, PNG)를 사용한다 — 최소 300 DPI 이상이어야 한다</li>
    </ul>
  </div>
</div>

---

## 표 작성 가이드

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>깔끔한 표를 위한 실전 규칙</strong></p>
    <p>소수점 자릿수를 통일한다(예: 모두 소수점 2자리). 최고 성능은 볼드 처리하여 한눈에 보이게 한다. 단위를 반드시 명시하되, 각 셀이 아닌 열 제목에 한 번만 쓴다(예: "Error (%)" 형식). 비교 대상을 명확히 하고, 자신의 방법과 기존 방법을 같은 조건에서 비교한다. 가로선은 최소화하여 3선 표(상단선, 헤더 구분선, 하단선)를 사용한다. 세로선은 쓰지 않는 것이 학술 논문의 관례다. 표가 5개 이상이면 핵심 표는 본문에, 나머지는 부록(Appendix)에 배치하는 것을 고려한다.</p>
  </div>
</div>

---

## 그림/표 캡션 작성법

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>캡션만 읽어도 내용이 이해되어야 한다</strong></p>
    <p>캡션은 그림이나 표의 독립적인 설명이다. 본문을 읽지 않아도 캡션만으로 해당 그림/표가 무엇을 보여주는지 이해할 수 있어야 한다. 서브플롯이 있는 경우 "Figure 1. (a) 하중 조건에 따른 응력 분포, (b) 시간에 따른 변위 변화" 형식으로 각각 설명한다. 그림 번호는 본문 등장 순서와 일치해야 하며, 본문에서 "Figure 1에 보이듯이..."와 같이 반드시 참조해야 한다. 캡션이 없는 그림이나, 본문에서 언급되지 않는 그림은 있으면 안 된다.</p>
  </div>
</div>

---

## 실전 워크플로우

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📋</div>
    <div class="pipeline-step-title">결과 데이터 정리</div>
    <div class="pipeline-step-desc">실험/시뮬레이션 결과를 CSV나 DataFrame으로 정리한다. 열 이름, 단위, 조건을 명확히 기록한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🐍</div>
    <div class="pipeline-step-title">Python으로 플롯 생성</div>
    <div class="pipeline-step-desc">matplotlib/seaborn으로 그래프를 코드로 생성한다. 플롯 코드를 저장해 두면 데이터가 바뀌어도 즉시 재생성할 수 있다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">💾</div>
    <div class="pipeline-step-title">SVG로 저장</div>
    <div class="pipeline-step-desc">plt.savefig('fig1.svg')로 벡터 포맷 저장한다. PDF도 좋다. PNG가 필요하면 dpi=300 이상으로 설정한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">✏️</div>
    <div class="pipeline-step-title">Inkscape에서 미세 조정</div>
    <div class="pipeline-step-desc">폰트 크기, 색상, 범례 위치, 화살표 등을 미세하게 조정한다. 여러 서브플롯을 하나의 Figure로 배치하는 작업도 여기서 한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📄</div>
    <div class="pipeline-step-title">논문에 삽입</div>
    <div class="pipeline-step-desc">LaTeX의 경우 \includegraphics, Word의 경우 이미지 삽입으로 배치한다. 캡션과 본문 참조를 추가한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🖨️</div>
    <div class="pipeline-step-title">인쇄 테스트</div>
    <div class="pipeline-step-desc">흑백으로 인쇄했을 때도 각 데이터가 구분 가능한지 확인한다. 색상 대신 마커 모양이나 선 스타일(실선/점선/파선)로 구분이 되어야 한다.</div>
  </div>
</div>
