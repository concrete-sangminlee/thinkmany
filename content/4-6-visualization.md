## 시각화 도구 비교

연구 결과를 효과적으로 전달하려면 데이터 시각화 능력이 필수다. 도구마다 강점이 다르므로, 용도에 따라 적절히 선택한다.

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s46-code">코드 기반</button>
    <button class="tab-btn" data-tab="tab-s46-gui">GUI 기반</button>
    <button class="tab-btn" data-tab="tab-s46-pub">논문 특화</button>
  </div>
  <div class="tab-content active" id="tab-s46-code">
    <p><strong>matplotlib</strong> — Python 시각화의 기본. 세밀한 커스터마이징이 가능하다. 논문 그래프의 80%는 matplotlib으로 충분하다.</p>
    <p><strong>seaborn</strong> — matplotlib 기반의 통계 시각화 라이브러리. 히트맵, 분포도, 상관 행렬을 간결한 코드로 생성한다.</p>
    <p><strong>plotly</strong> — 인터랙티브 그래프 생성. 발표 자료나 웹 기반 결과 공유에 적합하다. 3D 시각화도 용이하다.</p>
    <p><strong>Bokeh</strong> — 대용량 데이터의 인터랙티브 시각화에 강점이 있다. 대시보드 구성이 가능하다.</p>
  </div>
  <div class="tab-content" id="tab-s46-gui">
    <p><strong>Origin</strong> — 실험 데이터 시각화의 산업 표준. 피팅, 통계 분석 기능이 내장되어 있다. 많은 대학에서 라이선스를 제공한다.</p>
    <p><strong>Excel</strong> — 간단한 그래프를 빠르게 생성할 때 사용한다. 단, 논문 품질의 그래프에는 한계가 있으므로 최종 그림에는 권장하지 않는다.</p>
    <p><strong>Tableau</strong> — 대시보드와 탐색적 데이터 분석에 적합하다. 학생용 무료 라이선스를 제공한다.</p>
  </div>
  <div class="tab-content" id="tab-s46-pub">
    <p><strong>TikZ / PGFPlots</strong> — LaTeX 내에서 직접 그래프와 다이어그램을 생성한다. 논문 본문과 폰트, 스타일이 완벽히 통일된다. 학습 곡선이 높지만 결과물의 품질이 뛰어나다.</p>
    <p><strong>Inkscape</strong> — 무료 벡터 그래픽 에디터. matplotlib으로 생성한 SVG를 후편집하거나, 개념도/흐름도를 직접 그릴 때 사용한다.</p>
    <p><strong>draw.io (diagrams.net)</strong> — 웹 기반 무료 다이어그램 도구. 시스템 구성도, 알고리즘 흐름도, 실험 셋업 그림에 적합하다.</p>
  </div>
</div>

---

## 논문 그림 가이드라인

논문 그림은 독자가 가장 먼저 보는 요소다. 심사위원의 첫인상을 결정하므로 높은 품질 기준을 유지한다.

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>벡터 포맷(PDF, SVG, EPS)으로 저장한다. 확대해도 깨지지 않는다</li>
      <li>폰트 크기를 논문 본문과 비슷하게(8~12pt) 유지한다</li>
      <li>그래프 간 일관된 색상 체계를 사용한다</li>
      <li>범례와 축 라벨을 명확하게 표기한다</li>
      <li>해상도는 최소 300 DPI (래스터 이미지의 경우)로 설정한다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>화면 캡처(스크린샷)를 논문 그림으로 사용하지 않는다</li>
      <li>불필요한 3D 효과를 남용하지 않는다. 2D로 충분한 데이터는 2D로 표현한다</li>
      <li>무지개 색상(rainbow colormap)을 사용하지 않는다. 인지적 왜곡이 발생한다</li>
      <li>축 라벨, 단위, 범례를 생략하지 않는다</li>
      <li>하나의 그래프에 너무 많은 데이터 계열을 넣지 않는다</li>
    </ul>
  </div>
</div>

---

## 색상 선택 팁

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>누구나 읽을 수 있는 그래프 만들기</strong></p>
    <p><strong>색맹 친화 팔레트를 사용한다.</strong> 전체 남성의 약 8%가 색각 이상을 가지고 있다. viridis, cividis, inferno 등 perceptually uniform colormap을 기본으로 사용한다. matplotlib에서는 <code>cmap='viridis'</code>로 간단히 적용 가능하다.</p>
    <p><strong>흑백 인쇄를 고려한다.</strong> 많은 독자가 논문을 흑백으로 인쇄하여 읽는다. 색상 외에 마커 모양(circle, square, triangle), 선 스타일(실선, 점선, 파선)을 함께 사용하여 구분한다.</p>
    <p><strong>색상 수를 최소화한다.</strong> 한 그래프에 7개 이상의 색상을 사용하면 구분이 어려워진다. 데이터 그룹이 많으면 서브플롯으로 분리하는 것이 낫다.</p>
  </div>
</div>

---

## matplotlib 기본 세팅

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>논문용 matplotlib 기본 세팅</strong></p>
    <p>figsize=(8,6), fontsize=12, dpi=300, tight_layout=True, 축 라벨에 단위 포함, 범례는 데이터를 가리지 않는 위치에 배치한다. 이 세팅을 <code>plot_config.py</code> 같은 파일 하나에 저장해두고 모든 플롯에서 import하면 논문 전체에서 일관성이 유지된다. 매번 설정을 반복하는 시간을 절약할 수 있다.</p>
  </div>
</div>

---

## 논문 그림 체크리스트

<div class="check-list">
  <label><input type="checkbox"> 벡터 포맷(SVG/PDF)으로 저장했는가?</label>
  <label><input type="checkbox"> 모든 축에 라벨과 단위가 있는가?</label>
  <label><input type="checkbox"> 폰트 크기가 10pt 이상인가?</label>
  <label><input type="checkbox"> 범례가 명확하고 데이터를 가리지 않는가?</label>
  <label><input type="checkbox"> 색맹 친화적 색상(viridis 등)을 사용했는가?</label>
  <label><input type="checkbox"> 흑백 인쇄에서도 구분 가능한가?</label>
  <label><input type="checkbox"> 캡션만으로 그림을 이해할 수 있는가?</label>
</div>
