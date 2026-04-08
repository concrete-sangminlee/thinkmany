# 리뷰어는 그림부터 본다

논문을 제출하면 리뷰어에게 배정된다. 리뷰어는 대부분 바쁜 사람이다. 논문을 받으면 제목을 읽고, Abstract를 훑고, 그 다음으로 하는 일이 그림과 표를 쭉 넘겨보는 것이다. Introduction을 정독하기 전에 이미 그림만으로 이 논문의 수준과 스토리를 대략 파악한다.

이것은 과장이 아니다. 경험 많은 연구자일수록 그림을 통해 논문을 판단하는 경향이 강하다. 잘 만들어진 프레임워크 다이어그램, 깔끔한 데이터 플롯, 명확한 비교 그래프가 나열되어 있으면 "이 연구자는 제대로 했구나"라는 인상을 준다. 반대로 해상도가 낮고, 축 라벨이 빠져 있고, 색상이 알아보기 어려운 그림이 나오면, 내용이 좋아도 신뢰도가 떨어진다.

그림과 표만 보고 논문의 전체 스토리가 이해되어야 한다. 이것은 매우 높은 기준이지만, 좋은 논문이 추구해야 할 목표이다. Figure 1에서 연구의 전체 프레임워크를 보여주고, Figure 2에서 데이터를 소개하고, Figure 3-5에서 결과를 보여주고, Table 1-2에서 정량적 비교를 하면, 이 순서만으로 논문이 무엇을 했는지, 얼마나 잘했는지가 드러나야 한다.

이 장에서는 논문에 들어가는 그림과 표를 어떻게 만들고, 어떻게 배치하고, 어떻게 설명하는지를 다룬다. 도구의 사용법보다 원칙에 집중한다. 도구는 바뀌어도 원칙은 남기 때문이다.

---

## 논문 그림의 종류

논문에 들어가는 그림은 크게 네 가지 유형으로 분류된다. 각 유형은 서로 다른 목적을 가지고 있으며, 제작 방식도 다르다.

### 프레임워크/아키텍처 다이어그램

논문에서 가장 먼저 등장하는 그림이다. 보통 Figure 1이나 Figure 2에 배치된다. 연구의 전체 흐름이나 제안하는 모델의 구조를 한눈에 보여주는 역할을 한다. 입력이 왼쪽에 있고, 처리 과정이 중앙에 있고, 출력이 오른쪽에 있는 구성이 일반적이다.

좋은 프레임워크 다이어그램은 텍스트를 읽지 않아도 연구의 큰 그림이 이해되게 해준다. 각 구성 요소가 무엇인지, 어떤 순서로 처리되는지, 어디서 데이터가 들어오고 나가는지가 직관적으로 파악되어야 한다. 반대로 나쁜 프레임워크 다이어그램은 박스와 화살표가 복잡하게 얽혀 있어서 오히려 혼란을 준다.

프레임워크 다이어그램을 만들 때의 원칙은 단순함이다. 핵심 구성 요소만 포함하고, 세부 사항은 텍스트에서 설명한다. 박스 안에 너무 많은 텍스트를 넣지 않는다. 화살표의 방향이 일관되어야 한다(일반적으로 왼쪽에서 오른쪽, 또는 위에서 아래).

### 데이터 플롯

실험 결과를 시각적으로 보여주는 그래프이다. 선 그래프(line plot), 막대 그래프(bar plot), 산점도(scatter plot), 히트맵(heatmap), 박스 플롯(box plot) 등이 있다.

각 플롯 유형의 적합한 상황이 다르다. 선 그래프는 연속적인 변화(에폭(epoch, 전체 학습 데이터를 한 번 훑는 단위)에 따른 손실 감소, 온도에 따른 강도 변화 등)에 적합하다. 막대 그래프는 이산적인 비교(모델 간 성능 비교, 조건별 결과 비교 등)에 적합하다. 산점도는 두 변수 간의 관계(예측값 vs 실측값 등)에 적합하다. 히트맵은 2차원 데이터의 분포(혼동 행렬(confusion matrix, 분류 모델의 예측 결과와 실제 정답을 비교 정리한 표), 상관 계수 매트릭스 등)에 적합하다. 박스 플롯은 데이터의 분포와 이상치를 보여줄 때 적합하다.

잘못된 플롯 유형을 선택하면 데이터의 의미가 왜곡될 수 있다. 예를 들어, 범주형 데이터를 선 그래프로 그리면 범주 간에 연속적인 관계가 있는 것처럼 보인다. 시계열이 아닌 데이터를 선으로 연결하면 존재하지 않는 추세를 암시한다.

### 비교 결과 시각화

제안 방법과 기존 방법의 결과를 시각적으로 비교하는 그림이다. 이미지 분할이라면 원본 이미지, 정답(ground truth), 기존 방법의 결과, 제안 방법의 결과를 나란히 놓는다. 균열 검출이라면 각 방법의 검출 결과를 오버레이하여 보여준다.

이 유형의 그림에서 중요한 것은 공정성이다. 제안 방법이 잘 된 사례만 보여주면 리뷰어가 의심한다. 대표적인 사례(잘 된 것, 보통인 것, 어려운 것)를 균형 있게 보여주는 것이 신뢰를 준다. 제안 방법이 실패한 사례를 포함하고, 왜 실패했는지를 분석하는 것이 오히려 논문의 깊이를 보여준다.

### 사진 및 현미경 이미지

실험 기반 연구에서는 실제 시편 사진, 현미경 이미지, 실험 장치 사진 등이 필요하다. 이 유형의 그림에서 중요한 것은 스케일 바(scale bar)와 해상도이다.

현미경 이미지에는 반드시 스케일 바를 넣어야 한다. "100 um"이라고 텍스트로만 쓰는 것보다, 이미지 위에 스케일 바를 표시하는 것이 직관적이다. 사진은 배경이 깔끔해야 하고, 조명이 균일해야 하며, 초점이 정확해야 한다. 스마트폰으로 찍은 실험실 사진이 논문에 들어가면 전문성이 의심받는다.

---

## 그림 작성 도구

논문 그림을 만드는 도구는 다양하다. 각 도구에는 장단점이 있고, 적합한 용도가 다르다. 하나의 도구로 모든 유형의 그림을 만들 수는 없으므로, 2-3개의 도구를 조합하는 것이 현실적이다.

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-ch10-matplotlib">matplotlib / seaborn</button>
    <button class="tab-btn" data-tab="tab-ch10-drawio">draw.io</button>
    <button class="tab-btn" data-tab="tab-ch10-inkscape">Inkscape</button>
    <button class="tab-btn" data-tab="tab-ch10-ppt">PowerPoint</button>
    <button class="tab-btn" data-tab="tab-ch10-tikz">TikZ</button>
  </div>

  <div class="tab-content active" id="tab-ch10-matplotlib">
    <p><strong>용도:</strong> 데이터 플롯(선 그래프, 막대 그래프, 산점도, 히트맵 등)</p>
    <p><strong>장점:</strong></p>
    <ul>
      <li>Python 기반으로 데이터 처리와 시각화를 하나의 워크플로우에서 처리할 수 있다.</li>
      <li>코드로 만들기 때문에 재현성이 완벽하다. 데이터가 바뀌면 코드만 다시 실행하면 된다.</li>
      <li>seaborn은 matplotlib 위에 구축된 라이브러리로, 통계적 시각화와 깔끔한 스타일을 제공한다.</li>
      <li>벡터 형식(SVG, PDF) 출력을 기본 지원한다.</li>
    </ul>
    <p><strong>단점:</strong></p>
    <ul>
      <li>초기 학습 곡선이 있다. 특히 세부 스타일 조정에 시간이 걸린다.</li>
      <li>프레임워크 다이어그램 같은 자유로운 도식에는 적합하지 않다.</li>
    </ul>
    <p><strong>추천 대상:</strong> 모든 공학 대학원생. 데이터 플롯은 matplotlib으로 만드는 것을 기본으로 삼는다.</p>
  </div>

  <div class="tab-content" id="tab-ch10-drawio">
    <p><strong>용도:</strong> 프레임워크 다이어그램, 플로우차트, 아키텍처 도식</p>
    <p><strong>장점:</strong></p>
    <ul>
      <li>무료이고 웹 기반으로 설치 없이 사용 가능하다(app.diagrams.net).</li>
      <li>드래그 앤 드롭으로 직관적이다. 프로그래밍 지식이 필요 없다.</li>
      <li>SVG, PNG, PDF 등 다양한 형식으로 내보내기 가능하다.</li>
      <li>다양한 템플릿과 아이콘을 제공한다.</li>
    </ul>
    <p><strong>단점:</strong></p>
    <ul>
      <li>데이터 기반 플롯에는 부적합하다.</li>
      <li>매우 복잡한 도식은 관리가 어려워질 수 있다.</li>
    </ul>
    <p><strong>추천 대상:</strong> 프레임워크 다이어그램이 필요한 모든 연구자. 가성비 최고의 도구이다.</p>
  </div>

  <div class="tab-content" id="tab-ch10-inkscape">
    <p><strong>용도:</strong> 벡터 그래픽 편집, 기존 그림의 미세 조정</p>
    <p><strong>장점:</strong></p>
    <ul>
      <li>무료 오픈소스 벡터 편집기이다. Adobe Illustrator의 무료 대안.</li>
      <li>matplotlib에서 만든 SVG를 열어서 폰트, 색상, 배치를 미세 조정할 수 있다.</li>
      <li>여러 그림을 하나의 Figure로 합칠 때(subfigure 배치) 유용하다.</li>
    </ul>
    <p><strong>단점:</strong></p>
    <ul>
      <li>학습 곡선이 있다. 벡터 편집 경험이 없으면 처음에 헤맨다.</li>
      <li>데이터 플롯을 직접 만드는 용도로는 비효율적이다.</li>
    </ul>
    <p><strong>추천 대상:</strong> 최종 그림의 품질을 높이고 싶은 연구자. matplotlib + Inkscape 조합은 매우 강력하다.</p>
  </div>

  <div class="tab-content" id="tab-ch10-ppt">
    <p><strong>용도:</strong> 간단한 도식, 프레임워크의 빠른 초안</p>
    <p><strong>장점:</strong></p>
    <ul>
      <li>대부분의 사람이 이미 사용법을 알고 있다.</li>
      <li>빠르게 도식을 만들 수 있다. 아이디어를 시각화하는 초안 단계에 적합하다.</li>
      <li>EMF(Enhanced Metafile) 형식으로 저장하면 벡터 품질을 유지할 수 있다.</li>
    </ul>
    <p><strong>단점:</strong></p>
    <ul>
      <li>정교한 그림을 만들기에는 기능이 제한적이다.</li>
      <li>PNG로 직접 저장하면 해상도가 낮을 수 있다.</li>
      <li>학술적 느낌이 부족할 수 있다.</li>
    </ul>
    <p><strong>추천 대상:</strong> 빠른 초안이 필요한 경우. 최종본은 draw.io나 Inkscape로 다시 만드는 것이 좋다.</p>
  </div>

  <div class="tab-content" id="tab-ch10-tikz">
    <p><strong>용도:</strong> LaTeX 문서에 직접 통합되는 정교한 도식</p>
    <p><strong>장점:</strong></p>
    <ul>
      <li>LaTeX과 완벽하게 통합된다. 본문과 그림의 폰트가 일치한다.</li>
      <li>수식이 포함된 다이어그램에 최적이다.</li>
      <li>코드 기반이므로 재현성이 완벽하다.</li>
    </ul>
    <p><strong>단점:</strong></p>
    <ul>
      <li>학습 곡선이 매우 가파르다. TikZ 문법을 익히는 데 상당한 시간이 필요하다.</li>
      <li>간단한 도식도 코드가 길어질 수 있다.</li>
    </ul>
    <p><strong>추천 대상:</strong> LaTeX을 주로 사용하고 시간을 투자할 의향이 있는 연구자. 수학/물리 관련 논문에 특히 적합하다.</p>
  </div>
</div>

---

## 좋은 그림 vs 나쁜 그림

논문 그림의 품질은 몇 가지 명확한 기준으로 판별할 수 있다. 좋은 그림과 나쁜 그림의 차이는 미적 감각이 아니라, 학술적 관례와 가독성을 얼마나 준수하느냐에 달려 있다.

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>벡터 형식(SVG, PDF, EPS)으로 저장</li>
      <li>모든 축에 라벨과 단위 표시</li>
      <li>폰트 크기: 본문 크기와 비슷하게 (8-12pt)</li>
      <li>일관된 색상 팔레트 사용</li>
      <li>범례(legend)를 그림 안에 적절히 배치</li>
      <li>흰 배경, 깔끔한 레이아웃</li>
      <li>300 DPI 이상의 해상도</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>스크린 캡처를 그림으로 사용</li>
      <li>불필요한 3D 효과 (3D 막대, 3D 파이)</li>
      <li>빨강-초록 조합 (색맹 불친화적)</li>
      <li>그림 안 텍스트가 너무 작아서 안 보임</li>
      <li>과도한 장식 (그림자, 그라데이션, 테두리)</li>
      <li>축 범위가 데이터를 왜곡하는 경우</li>
      <li>JPEG 압축으로 품질 저하된 그래프</li>
    </ul>
  </div>
</div>

각 항목을 구체적으로 살펴보자.

### 벡터 vs 래스터

이것은 논문 그림에서 가장 중요한 구분이다. 래스터 형식(PNG, JPEG)은 픽셀의 집합이므로, 확대하면 깨진다. 벡터 형식(SVG, PDF, EPS)은 수학적 도형으로 정의되므로, 아무리 확대해도 선명하다.

데이터 플롯과 다이어그램은 반드시 벡터 형식으로 저장해야 한다. matplotlib에서 `plt.savefig('figure.svg')` 또는 `plt.savefig('figure.pdf')`로 저장하면 된다. JPEG로 저장하면 압축 과정에서 아티팩트(artifact, 압축으로 인해 원본에 없던 노이즈나 왜곡이 생기는 현상)가 발생하므로, 그래프에 JPEG를 쓰는 것은 절대 금물이다.

예외가 있다. 사진이나 현미경 이미지는 본질적으로 래스터 데이터이므로 PNG가 적합하다. 이 경우에도 최소 300 DPI 이상의 해상도를 유지해야 한다.

### 폰트 크기

논문 그림에서 가장 흔한 실수 중 하나가 폰트 크기이다. 그림을 만들 때 모니터에서 보기에는 적당해 보이지만, 논문에 삽입하면 축 라벨이 개미만 한 글씨가 되는 경우가 비일비재하다.

원칙은 이렇다. 그림 안의 텍스트 크기가 논문 본문의 텍스트 크기와 비슷해야 한다. 두 컬럼 저널에서 한 컬럼 너비(약 8.5cm)의 그림이라면, matplotlib 기준으로 fontsize를 10-12로 설정하고, figsize를 (3.5, 2.5) 인치 정도로 설정하면 적절하다. 전체 너비(약 17cm) 그림이라면 figsize를 (7, 4) 인치 정도로 한다.

최종 확인법은 간단하다. 논문을 A4에 인쇄해서 그림의 텍스트가 편하게 읽히는지 확인하는 것이다. 돋보기가 필요하면 폰트가 너무 작은 것이다.

### 색상 통일

한 논문 안에서 색상 팔레트가 통일되어야 한다. Figure 3에서 제안 방법을 파란색으로 표시했으면, Figure 5에서도 파란색이어야 한다. 그림마다 색상이 바뀌면 독자가 혼란을 느낀다.

미리 색상 팔레트를 정해두는 것이 좋다. 예를 들어, "제안 방법 = 파란색, Baseline A = 주황색, Baseline B = 녹색, Baseline C = 빨간색"으로 정하면, 모든 그림에서 이 규칙을 따른다.

---

## 색상 전략

색상은 데이터를 전달하는 강력한 도구이지만, 잘못 사용하면 오히려 정보를 가린다. 논문 그림의 색상 전략에는 몇 가지 핵심 원칙이 있다.

### 색맹 친화적 색상

전 세계 남성의 약 8%, 여성의 약 0.5%가 색각 이상(색맹/색약)을 가지고 있다. 리뷰어가 색맹일 확률은 결코 무시할 수 없다. 가장 흔한 유형이 적록 색맹이므로, 빨간색과 초록색을 구분 수단으로 사용하지 않는 것이 기본이다.

색맹 친화적인 색상 맵으로는 viridis, cividis, inferno가 있다. matplotlib에서 `cmap='viridis'`로 설정하면 된다. 기본 색상 맵인 jet는 색맹에게 불친화적이고, 데이터 해석도 왜곡할 수 있으므로 사용하지 않는 것이 좋다.

범주형 데이터의 경우, 파란색-주황색-보라색-갈색 같은 조합이 색맹에게도 구분 가능하다. Colorbrewer(colorbrewer2.org)에서 색맹 안전 팔레트를 확인할 수 있다.

### 흑백 인쇄 대비

저널에 따라 컬러 인쇄에 추가 비용이 들거나, 독자가 흑백으로 인쇄하여 볼 수 있다. 이 경우에도 그림이 이해 가능해야 한다. 색상만으로 구분하지 말고, 선 스타일(실선, 점선, 파선), 마커 모양(원, 삼각형, 사각형), 패턴(빗금, 점 패턴)을 함께 사용하여 흑백에서도 구분되게 만든다.

확인 방법은 간단하다. 그림을 흑백으로 인쇄하거나, 이미지 편집기에서 그레이스케일로 변환해 본다. 구분이 안 되면 추가적인 시각적 단서를 넣어야 한다.

### 일관된 팔레트

앞서 언급했듯이, 논문 전체에서 색상의 의미를 일관되게 유지한다. 더 나아가, 색상에 의미를 부여하는 것이 효과적이다. 예를 들어, 연속적인 데이터에는 순차적 색상(밝은 파랑 → 진한 파랑)을, 대비되는 카테고리에는 질적 색상(파랑 vs 주황)을, 양극단 데이터에는 발산형 색상(파랑 ← 흰색 → 빨강)을 사용한다.

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>색상 선택 팁</strong></p>
    <p>matplotlib에서 기본으로 제공되는 tab10 색상 팔레트(prop_cycle의 기본값)는 많은 경우에 충분히 좋다. 특별한 이유가 없다면 이 기본 팔레트를 사용하는 것도 합리적인 선택이다. 단, tab10의 빨간색과 초록색은 색맹에게 구분이 어려울 수 있으므로, 이 둘을 같은 그래프에서 구분 수단으로 쓸 때는 주의한다.</p>
  </div>
</div>

---

## 표 작성 가이드

표(Table)는 정량적 데이터를 정확하게 비교하기에 가장 효과적인 형식이다. 그래프가 추세와 패턴을 보여준다면, 표는 정확한 수치를 전달한다. 성능 비교, 파라미터 설정, 실험 조건 요약 등에 표가 적합하다.

### 소수점 통일

표 안의 숫자는 소수점 자릿수를 통일해야 한다. 한 열에서 "94.2", "91", "93.15"처럼 소수점이 들쑥날쑥하면 비전문적으로 보인다. "94.20", "91.00", "93.15"로 통일하거나, 모두 소수점 첫째 자리까지("94.2", "91.0", "93.2")로 맞춘다.

유효숫자(significant figures, 측정값에서 의미 있는 자릿수의 개수)도 고려해야 한다. 측정 정밀도보다 더 많은 소수점을 표시하는 것은 허위 정밀도(false precision)이다. 정확도가 소수점 한 자리까지만 의미 있다면, 세 자리까지 표시할 필요가 없다.

### 최고 성능 강조

비교 표에서 각 지표의 최고 성능을 볼드(bold)로 표시하는 것은 거의 표준적인 관례이다. 리뷰어가 표를 훑을 때, 볼드가 어디에 있는지를 보면 어떤 방법이 전반적으로 우수한지 즉각 파악할 수 있다.

두 번째로 좋은 성능에 밑줄을 치는 관례도 있다. 표 아래 캡션에 "Bold indicates the best result; underlined indicates the second best"라고 명시한다.

### 단위 명시

모든 열의 헤더에 단위를 표시한다. "Accuracy"만 쓰지 말고 "Accuracy (%)"로 쓴다. "Processing Time"이 아니라 "Processing Time (s)"로 쓴다. 단위가 빠진 숫자는 의미 없는 숫자이다.

### 3선 표(Three-line Table)

학술 논문에서는 3선 표가 표준이다. 세로 선을 쓰지 않고, 가로 선도 최소한으로 사용한다. 상단선(top line), 헤더와 본문 사이의 구분선(header line), 하단선(bottom line) 세 개의 가로선만 사용한다.

LaTeX에서는 `booktabs` 패키지(논문용 표를 깔끔하게 만들어주는 LaTeX 패키지)의 `\toprule`, `\midrule`, `\bottomrule`을 사용하면 자동으로 3선 표가 만들어진다. Word에서는 표를 삽입한 후 세로 선과 불필요한 가로 선을 제거한다.

3선 표는 깔끔하고 전문적으로 보인다. 모든 셀에 테두리가 있는 격자형 표는 Excel 스프레드시트처럼 보이므로, 학술 논문에서는 피하는 것이 좋다.

### 표 vs 그림: 선택 기준

같은 데이터를 표로 보여줄 것인지 그래프로 보여줄 것인지는 전달하고 싶은 메시지에 따라 결정된다.

정확한 수치 비교가 중요하면 표를 선택한다. "제안 방법의 정확도가 94.2%이고, Baseline A가 91.5%이고, Baseline B가 89.3%이다"라는 정보를 전달하려면 표가 적합하다.

추세나 패턴을 보여주려면 그래프를 선택한다. "노이즈가 증가할수록 모든 방법의 정확도가 감소하지만, 제안 방법의 감소폭이 가장 작다"는 메시지는 선 그래프가 훨씬 효과적이다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>표와 그림으로 같은 데이터를 중복 제시하지 않는다</strong></p>
    <p>같은 데이터를 표로도 보여주고 그래프로도 보여주는 것은 낭비이다. 하나를 선택해야 한다. 정확한 수치가 필요한 데이터(성능 비교)는 표로, 추세가 중요한 데이터(학습 곡선)는 그래프로 보여준다. 예외적으로 Supplementary Material에 보완적인 형태를 넣을 수는 있지만, 본문에서는 하나만 쓴다.</p>
  </div>
</div>

---

## 캡션 작성법

캡션(caption)은 그림과 표에 붙이는 설명이다. 사소해 보이지만, 캡션의 품질이 논문의 전문성을 드러낸다. 좋은 캡션은 독자가 그림을 이해하는 데 필요한 모든 정보를 자체적으로 제공한다. 본문을 읽지 않고 캡션만 읽어도 그림이 무엇을 보여주는지 파악할 수 있어야 한다.

캡션의 구조는 이렇다. 먼저 그림 전체가 무엇인지 한 문장으로 설명한다. 그 다음, 세부 사항을 추가한다. 서브피겨가 있다면 (a), (b), (c)의 내용을 각각 설명한다.

나쁜 캡션의 예: "Figure 3. Results."
이것은 캡션이 아니다. 어떤 결과인지, 어떤 조건인지, 무엇이 비교되는지 아무 정보가 없다.

좋은 캡션의 예: "Figure 3. Comparison of crack detection accuracy under different noise levels. (a) Clean images (SNR = 30 dB). (b) Moderate noise (SNR = 15 dB). (c) Severe noise (SNR = 5 dB). The proposed method (blue) maintains accuracy above 90% across all conditions, while Baseline A (orange) and Baseline B (green) show significant degradation below SNR = 15 dB."

차이가 명확하다. 좋은 캡션은 그림을 보지 않아도 핵심 메시지를 전달한다.

표의 캡션에도 같은 원칙이 적용된다. "Table 1. Results"가 아니라 "Table 1. Performance comparison of crack detection methods on the Bridge Dataset. Bold values indicate the best performance for each metric."처럼 구체적으로 쓴다.

관례상, 그림의 캡션은 그림 아래에, 표의 캡션은 표 위에 위치한다. 이것은 학술 출판의 오래된 관례이므로 반드시 지킨다.

---

## matplotlib 논문용 기본 세팅

matplotlib의 기본 설정은 프레젠테이션용이다. 논문에 삽입하기에는 폰트가 작고, 여백이 넓고, 전체적으로 최적화되어 있지 않다. 논문용 그래프를 만들 때 매번 세부 설정을 조정하는 것은 비효율적이므로, 기본 세팅을 한 번 잡아놓고 재사용하는 것이 좋다.

핵심 설정 항목은 다음과 같다.

**figsize**: 타겟 저널의 컬럼 너비에 맞춘다. 단일 컬럼 그림은 (3.5, 2.5) 인치, 양쪽 컬럼 전체 너비 그림은 (7, 4) 인치가 일반적이다. 정확한 수치는 저널의 Author Guidelines에서 확인한다.

**fontsize**: 그림 안 모든 텍스트(축 라벨, 범례, 제목)의 크기를 통일한다. 단일 컬럼 그림이라면 9-10pt, 전체 너비 그림이라면 10-12pt가 적절하다. 논문에 삽입했을 때 본문 텍스트와 비슷한 크기가 되어야 한다.

**dpi**: 저장 시 해상도이다. 벡터 형식(SVG, PDF)으로 저장하면 dpi가 의미 없지만, 래스터(PNG)로 저장해야 할 경우 최소 300 dpi를 사용한다. 화면 미리보기용은 150 dpi면 충분하다.

**tight_layout**: `plt.tight_layout()` 또는 `plt.savefig(..., bbox_inches='tight')`를 사용하면 그림 주변의 불필요한 여백이 제거된다. 이 설정 하나로 그림의 공간 효율이 크게 향상된다.

**기타**: 축의 tick 방향(`tick_params(direction='in')`으로 안쪽으로), 그리드 설정(얇은 회색 그리드는 도움이 되지만 과도한 그리드는 산만하다), 범례의 위치와 스타일(프레임 없이 깔끔하게) 등을 통일한다.

이 설정들을 Python 스크립트의 상단에 넣어두거나, 별도의 스타일 파일(`.mplstyle`)로 관리하면 모든 그림에 일관된 스타일을 적용할 수 있다. matplotlib의 `rcParams`를 활용하면 전역 설정이 가능하다. 이런 기본 세팅을 한 번 잡아두면, 이후의 모든 그림 제작 시간이 단축된다.

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>스타일 파일을 연구실 공용으로 관리하라</strong></p>
    <p>연구실에서 공용 matplotlib 스타일 파일을 관리하면, 같은 연구실에서 나오는 모든 논문의 그래프 스타일이 통일된다. 이것은 연구실의 전문성을 보여주는 좋은 방법이다. Git 저장소에 스타일 파일을 공유하고, 새로운 학생이 들어오면 이 파일부터 가르치면 된다.</p>
  </div>
</div>

---

## 실전 워크플로우

논문 그림을 만드는 실전 워크플로우를 단계별로 정리한다. 이 흐름을 따르면 효율적이면서도 높은 품질의 그림을 만들 수 있다.

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📁</div>
    <div class="pipeline-step-title">데이터 정리</div>
    <div class="pipeline-step-desc">CSV/JSON으로 결과 데이터 구조화</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🐍</div>
    <div class="pipeline-step-title">Python 플롯</div>
    <div class="pipeline-step-desc">matplotlib/seaborn으로 초안 그래프 생성</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">💾</div>
    <div class="pipeline-step-title">SVG 저장</div>
    <div class="pipeline-step-desc">벡터 형식으로 내보내기</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">✏️</div>
    <div class="pipeline-step-title">미세 조정</div>
    <div class="pipeline-step-desc">Inkscape에서 폰트, 색상, 배치 수정</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📄</div>
    <div class="pipeline-step-title">논문 삽입</div>
    <div class="pipeline-step-desc">LaTeX/Word에 삽입 후 크기 확인</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🖨️</div>
    <div class="pipeline-step-title">흑백 테스트</div>
    <div class="pipeline-step-desc">그레이스케일 변환 후 구분 가능 확인</div>
  </div>
</div>

### 1단계: 데이터 정리

실험 결과를 CSV 파일이나 JSON 파일로 정리한다. Jupyter Notebook에서 바로 플롯하는 것도 가능하지만, 데이터를 별도 파일로 분리하면 나중에 그래프를 수정할 때 편하다. 데이터 파일명에 날짜와 실험 조건을 포함하면 추적이 쉽다.

### 2단계: Python 플롯

matplotlib 또는 seaborn으로 초안 그래프를 만든다. 이 단계에서는 데이터가 올바르게 표현되는지, 적절한 플롯 유형인지를 확인하는 것이 목적이다. 세부 스타일은 아직 신경 쓰지 않아도 된다.

스크립트를 Jupyter Notebook이 아닌 `.py` 파일로 작성하면, 나중에 데이터가 바뀌었을 때 터미널에서 한 번에 모든 그림을 재생성할 수 있다. `python generate_figures.py`를 실행하면 모든 그림이 갱신되는 구조가 이상적이다.

### 3단계: SVG 저장

`plt.savefig('fig3.svg', bbox_inches='tight')`로 벡터 형식으로 저장한다. PDF도 좋지만, 다음 단계에서 Inkscape로 편집하려면 SVG가 가장 편하다.

### 4단계: Inkscape 미세 조정

matplotlib으로는 하기 어려운 미세 조정을 Inkscape에서 한다. 화살표 추가, 특정 데이터 포인트에 주석 달기, 여러 서브피겨를 (a), (b), (c)로 배치하기, 폰트 통일 등이 여기에 해당한다.

모든 그림에 Inkscape 단계가 필요한 것은 아니다. matplotlib만으로 충분히 깔끔한 그래프가 나올 수도 있다. 하지만 프레임워크 다이어그램이나 복잡한 비교 그림에서는 이 단계가 품질을 확실히 높여준다.

### 5단계: 논문 삽입

LaTeX에서는 `\includegraphics`로, Word에서는 그림 삽입 기능으로 넣는다. 삽입 후 반드시 원하는 크기에서 텍스트가 읽히는지 확인한다. 화면에서는 괜찮아 보여도, 실제 인쇄 크기에서는 글씨가 너무 작을 수 있다.

### 6단계: 흑백 테스트

완성된 그림을 그레이스케일로 변환해서 본다. 색상 없이도 모든 데이터 시리즈가 구분 가능한지 확인한다. 구분이 안 되면 선 스타일이나 마커를 추가한다.

---

## 제출 전 최종 체크리스트

모든 그림과 표가 완성되면, 제출 전에 다음 항목을 하나씩 점검한다. 이 체크리스트는 사소해 보이지만, 한 항목이라도 빠지면 리뷰어에게 부정적인 인상을 줄 수 있다.

<div class="check-list">
  <label><input type="checkbox"> 모든 그림이 벡터 형식(SVG/PDF/EPS) 또는 300+ DPI 래스터인가?</label>
  <label><input type="checkbox"> 모든 축에 라벨과 단위가 있는가?</label>
  <label><input type="checkbox"> 그림 안 텍스트가 인쇄 크기에서 읽을 수 있는가?</label>
  <label><input type="checkbox"> 색상 팔레트가 논문 전체에서 일관되는가?</label>
  <label><input type="checkbox"> 흑백으로 변환해도 구분이 가능한가?</label>
  <label><input type="checkbox"> 색맹 친화적 색상을 사용했는가?</label>
  <label><input type="checkbox"> 표의 소수점 자릿수가 통일되어 있는가?</label>
  <label><input type="checkbox"> 최고 성능이 볼드로 표시되어 있는가?</label>
  <label><input type="checkbox"> 모든 그림/표가 본문에서 참조되어 있는가?</label>
  <label><input type="checkbox"> 캡션만 읽어도 그림/표의 내용이 이해되는가?</label>
  <label><input type="checkbox"> 그림 캡션은 그림 아래에, 표 캡션은 표 위에 있는가?</label>
  <label><input type="checkbox"> 불필요한 3D 효과나 장식이 없는가?</label>
  <label><input type="checkbox"> 저널의 그림 크기/해상도 요구 사항을 충족하는가?</label>
  <label><input type="checkbox"> 스크린 캡처 대신 직접 제작한 그림인가?</label>
</div>

---

## 좋은 그림은 시간이 걸린다

논문 한 편에 들어가는 그림을 만드는 데 일주일 이상이 걸리는 것은 정상이다. "그래프 하나 그리는 데 왜 이렇게 오래 걸리지?"라는 좌절감이 들 수 있지만, 좋은 그림은 원래 시간이 걸린다.

처음에는 matplotlib의 기본 문법도 모르고, Inkscape의 인터페이스도 낯설고, 색상 선택도 막막할 것이다. 하지만 논문 한 편을 쓰면서 그림 10개를 만들고 나면, 두 번째 논문에서는 절반의 시간에 더 좋은 그림을 만들 수 있다. 세 번째 논문에서는 나만의 템플릿과 스타일이 완성되어 있어서, 새로운 데이터만 넣으면 바로 출판 수준의 그림이 나온다.

그림 만들기에 투자한 시간은 절대 낭비가 아니다. 좋은 그림은 논문의 인용을 높이고, 발표에서 청중의 주의를 끌고, 리뷰어의 호의를 산다. 연구 결과가 아무리 훌륭해도, 그것을 제대로 보여주지 못하면 인정받기 어렵다. 그림은 연구와 세상 사이의 다리이다. 그 다리를 튼튼하고 아름답게 만드는 것은 연구자의 중요한 역량이다.

그림과 표가 완성되었다면, 이제 논문 투고를 준비할 차례다. 저널마다 그림 해상도, 파일 형식, 배치 방식에 대한 요구 사항이 다르므로, 투고 전에 반드시 확인해야 한다 (이 주제는 ch11 '투고에서 게재까지'에서 자세히 다룬다.).
