# 논문이라는 건축물

ch05 '논문 읽기의 기술'에서 논문을 읽고 정리하는 방법을 다뤘고, ch06 '연구 문제 찾기'에서 연구 주제를 잡는 법을 다뤘다. 이제 그 읽기와 사고의 결과물을 하나의 논문으로 완성할 차례다.

논문은 벽돌을 하나씩 쌓아 올리는 건축이다. 설계도 없이 건물을 짓는 사람은 없듯, 구조를 잡지 않고 논문을 쓰기 시작하면 높은 확률로 무너진다. 처음 논문을 쓰는 대학원생 대부분이 빈 화면 앞에서 첫 문장을 고민하며 시간을 보낸다. "이 연구의 배경은..."으로 시작해야 할 것 같은데, 뭘 써야 할지 모르겠다. 한 시간째 커서만 깜빡이고 있다.

이 문제의 원인은 간단하다. Introduction부터 쓰려고 하기 때문이다. 논문의 순서대로 쓰는 것은 가장 비효율적인 방법이다. 건물을 지을 때 1층부터 쌓지 않는다. 기초 공사를 먼저 한다. 논문에서 기초 공사는 결과(Results)이고, 1층은 방법론(Methodology)이며, 지붕은 Introduction과 Abstract이다.

이 장에서는 논문 작성의 전체 흐름, 각 섹션의 구체적인 작성법, 스토리라인 구성, 흔한 실수와 교정법, 그리고 초안부터 최종본까지의 여정을 다룬다. 처음 쓰는 논문이든, 세 번째 쓰는 논문이든, 여기에서 다루는 원칙은 동일하게 적용된다.

---

## 논문 작성의 전체 흐름

논문 작성에는 최적의 순서가 있다. 이 순서는 수많은 연구자가 시행착오를 거쳐 도달한 것이다. 물론 사람마다 약간의 변형이 있지만, 큰 틀은 거의 동일하다.

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📊</div>
    <div class="pipeline-step-title">결과 확보</div>
    <div class="pipeline-step-desc">실험/시뮬레이션 완료, 핵심 데이터 확보</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📈</div>
    <div class="pipeline-step-title">그림/표 제작</div>
    <div class="pipeline-step-desc">결과를 시각화하고 스토리라인 구상</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🔧</div>
    <div class="pipeline-step-title">Methodology</div>
    <div class="pipeline-step-desc">무엇을 어떻게 했는지 상세 기술</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📝</div>
    <div class="pipeline-step-title">Results & Discussion</div>
    <div class="pipeline-step-desc">결과 제시와 해석</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🎯</div>
    <div class="pipeline-step-title">Introduction</div>
    <div class="pipeline-step-desc">연구의 맥락과 동기 서술</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">✨</div>
    <div class="pipeline-step-title">Abstract</div>
    <div class="pipeline-step-desc">전체 논문의 압축 요약</div>
  </div>
</div>

왜 이 순서인가? 논리적 이유가 있다.

첫째, 결과가 없으면 논문이 없다. 아무리 훌륭한 방법론을 개발했어도, 결과가 기대에 미치지 못하면 논문으로 쓸 수 없거나 방향을 바꿔야 한다. 결과를 먼저 확보해야 "이 연구가 논문이 될 수 있는가"를 판단할 수 있다.

둘째, 그림과 표를 먼저 만들면 논문의 스토리가 보인다. 그림 5장과 표 3개를 책상 위에 펼쳐놓고 배열해 보면, "이 논문이 어떤 이야기를 하고 있는가"가 눈에 들어온다. 그림의 순서가 곧 논문의 서사 구조가 된다.

셋째, Methodology는 사실의 기록이므로 가장 쓰기 쉽다. "무엇을 어떻게 했는지"를 적으면 된다. 고민이 적고, 글쓰기의 탄력을 붙이기에 좋다. 빈 화면의 공포를 가장 빨리 해소할 수 있는 섹션이다.

넷째, Results와 Discussion은 그림/표를 설명하고 해석하는 것이므로, 그림이 완성된 후에 쓰는 것이 자연스럽다.

다섯째, Introduction은 전체 논문의 맥락을 제공하는 섹션이다. 결과와 방법론이 완성된 후에야 "이 연구를 왜 했는가"를 정확히 서술할 수 있다. Introduction을 먼저 쓰면, 결과가 나온 후에 전부 다시 써야 하는 경우가 많다.

여섯째, Abstract는 논문 전체의 요약이므로 당연히 마지막에 쓴다. 쓸 내용이 다 확정된 후에 압축하는 것이다.

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>처음부터 완벽할 필요 없다</strong></p>
    <p>위 순서는 "어디부터 시작하느냐"의 문제이지, "한 번에 완성하라"는 뜻이 아니다. Methodology를 쓰다가 Results로 넘어가고, 다시 Methodology로 돌아오는 것은 자연스러운 과정이다. 핵심은 Introduction부터 시작하지 말라는 것이다.</p>
  </div>
</div>

---

## 섹션별 작성 가이드

논문의 각 섹션에는 고유한 목적, 구조, 그리고 관례가 있다. "감으로" 쓰면 리뷰어에게 지적당한다. 각 섹션이 어떤 역할을 하고, 어떻게 구성해야 하는지 구체적으로 살펴보자.

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-ch08-abstract">Abstract</button>
    <button class="tab-btn" data-tab="tab-ch08-intro">Introduction</button>
    <button class="tab-btn" data-tab="tab-ch08-method">Methodology</button>
    <button class="tab-btn" data-tab="tab-ch08-results">Results & Discussion</button>
    <button class="tab-btn" data-tab="tab-ch08-conclusion">Conclusion</button>
  </div>

  <div class="tab-content active" id="tab-ch08-abstract">
    <p><strong>Abstract: 논문의 얼굴</strong></p>
    <p>Abstract는 논문 전체를 200-250단어로 압축한 것이다. 리뷰어, 편집자, 그리고 데이터베이스 검색자가 가장 먼저 읽는 부분이다. Abstract만 읽고 논문을 읽을지 말지를 결정하는 사람이 대부분이므로, 여기에 공을 들여야 한다.</p>
    <p><strong>구조:</strong> 배경(1-2문장) → 목적(1문장) → 방법(2-3문장) → 결과(2-3문장) → 의의(1문장)</p>
    <p><strong>예시 구조:</strong></p>
    <ul>
      <li>"[분야]에서 [문제]는 중요한 과제이다. 기존 방법은 [한계]가 있다."</li>
      <li>"본 연구에서는 [방법]을 제안하여 [목적]을 달성하고자 한다."</li>
      <li>"제안된 방법은 [핵심 기술 1], [핵심 기술 2]로 구성되며, [데이터/조건]에서 검증하였다."</li>
      <li>"실험 결과, [주요 지표]에서 [수치]의 성능을 달성하였으며, 기존 방법 대비 [개선율]% 향상되었다."</li>
      <li>"본 연구는 [분야]에서 [기여]의 가능성을 제시한다."</li>
    </ul>
    <p><strong>주의사항:</strong> 참고문헌을 인용하지 않는다. 약어는 처음 등장 시 풀어 쓴다. 구체적인 수치를 반드시 포함한다. "좋은 결과를 얻었다" 같은 모호한 표현은 금물이다.</p>
  </div>

  <div class="tab-content" id="tab-ch08-intro">
    <p><strong>Introduction: Funnel(깔때기) 구조</strong></p>
    <p>Introduction은 넓은 맥락에서 시작해 점점 좁혀가며, 최종적으로 "이 논문이 무엇을 하는가"에 도달하는 깔때기 구조를 따른다.</p>
    <p><strong>구조와 분량 비율:</strong></p>
    <ul>
      <li><strong>넓은 배경 (15-20%):</strong> 이 연구가 속한 큰 분야의 중요성. "구조물의 안전 평가는 사회 기반시설 유지관리의 핵심이다."</li>
      <li><strong>기존 연구 리뷰 (40-50%):</strong> 이 문제를 해결하기 위해 어떤 연구들이 있었는지. 시간순 또는 방법론별로 분류하여 정리한다. 단순 나열이 아니라, 흐름과 발전 과정을 보여줘야 한다.</li>
      <li><strong>한계와 Gap (15-20%):</strong> 기존 연구의 구체적 한계. "그러나 이러한 방법들은 [한계1]과 [한계2]의 문제를 가지고 있다." 이 부분이 논문의 존재 이유를 결정한다.</li>
      <li><strong>본 연구의 목적과 기여 (15-20%):</strong> "따라서 본 연구에서는 [방법]을 제안하여 [문제]를 해결하고자 한다. 본 연구의 주요 기여는 다음과 같다: (1)... (2)... (3)..."</li>
    </ul>
    <p><strong>핵심 원칙:</strong> Introduction을 읽은 후 독자가 "그래서 이 연구가 필요하구나"라고 납득해야 한다. 납득이 안 되면 Introduction이 실패한 것이다.</p>
  </div>

  <div class="tab-content" id="tab-ch08-method">
    <p><strong>Methodology: 재현 가능성의 보증</strong></p>
    <p>Methodology 섹션의 존재 이유는 단 하나다. 다른 연구자가 이 섹션만 읽고 동일한 연구를 재현할 수 있어야 한다. 이 기준을 충족하지 못하면 불완전한 것이다.</p>
    <p><strong>포함해야 할 내용:</strong></p>
    <ul>
      <li><strong>전체 프레임워크:</strong> 연구의 전체 흐름을 보여주는 다이어그램. 이 그림 하나로 방법론의 큰 그림이 이해되어야 한다.</li>
      <li><strong>모델/알고리즘 상세:</strong> 사용한 모델의 수학적 정의, 아키텍처, 핵심 수식. 기존 모델을 사용했다면 인용과 함께 핵심만 요약. 새로 제안한 부분은 상세히.</li>
      <li><strong>데이터:</strong> 데이터 소스, 크기, 분할 비율(train/val/test), 전처리 과정.</li>
      <li><strong>하이퍼파라미터:</strong> 학습률, 배치 크기, 에폭 수, 옵티마이저, 정규화 등. 표로 정리하면 효과적이다.</li>
      <li><strong>평가 지표:</strong> 성능을 측정하는 기준. 왜 이 지표를 선택했는지 근거를 제시한다.</li>
      <li><strong>실험 환경:</strong> 하드웨어(GPU 종류, 메모리), 소프트웨어(프레임워크 버전), 실행 시간.</li>
    </ul>
    <p><strong>팁:</strong> "자세히 쓰면 페이지가 부족하다"는 걱정은 Supplementary Material로 해결한다. 본문에는 핵심만, 세부 사항은 부록에 담는다.</p>
  </div>

  <div class="tab-content" id="tab-ch08-results">
    <p><strong>Results & Discussion: 해석이 생명이다</strong></p>
    <p>Results 섹션에서 가장 흔한 실수는 결과를 나열만 하는 것이다. "Table 1에서 보듯이, 제안 방법의 accuracy는 94.2%이다. Table 2에서 보듯이, F1-score는 0.91이다." 이것은 결과 보고서이지 논문이 아니다.</p>
    <p><strong>좋은 Results 섹션의 구조:</strong></p>
    <ul>
      <li><strong>결과 제시:</strong> 그림/표를 참조하며 핵심 수치를 언급한다.</li>
      <li><strong>해석:</strong> "왜 이런 결과가 나왔는가?" 제안 방법이 기존 방법보다 나은 이유를 분석한다.</li>
      <li><strong>비교:</strong> 기존 최고 성능(SOTA) 대비 어떤 차이가 있는지. 공정한 비교 조건을 명시한다.</li>
      <li><strong>예상과 다른 결과:</strong> 특정 조건에서 성능이 떨어졌다면, 왜 그런지 분석한다. 이 부분을 숨기면 리뷰어가 반드시 지적한다. 솔직하게 쓰고 분석하는 것이 오히려 논문의 신뢰도를 높인다.</li>
      <li><strong>Ablation study:</strong> 제안 방법의 각 구성요소가 얼마나 기여하는지 분리하여 분석한다.</li>
    </ul>
    <p><strong>Discussion과 Results를 분리하는 저널도 있고, 합치는 저널도 있다. 타겟 저널의 포맷을 반드시 확인한다.</strong></p>
  </div>

  <div class="tab-content" id="tab-ch08-conclusion">
    <p><strong>Conclusion: 깔끔한 마무리</strong></p>
    <p>Conclusion은 논문의 마지막 인상을 결정한다. 간결하고 명확해야 한다.</p>
    <p><strong>구조:</strong></p>
    <ul>
      <li><strong>연구 요약 (2-3문장):</strong> 무엇을 왜 했는지를 한 문단으로 압축한다. Introduction의 축소판이다.</li>
      <li><strong>주요 발견 (3-5문장):</strong> 가장 중요한 결과를 번호를 매겨 나열한다. 구체적인 수치를 포함한다.</li>
      <li><strong>한계점 (2-3문장):</strong> 이 연구의 한계를 솔직히 인정한다. 리뷰어가 지적하기 전에 스스로 인정하는 것이 유리하다.</li>
      <li><strong>향후 연구 (2-3문장):</strong> 이 연구를 확장할 수 있는 방향을 제시한다.</li>
    </ul>
    <p><strong>절대 하지 말아야 할 것:</strong> Conclusion에 새로운 데이터, 새로운 분석, 새로운 논의를 추가하는 것. Conclusion은 "마무리"이지 "추가"가 아니다.</p>
  </div>
</div>

---

## 스토리라인: 논문은 이야기다

논문이 과학적 사실의 나열이라고 생각하면 오산이다. 좋은 논문은 이야기다. 시작(문제 제기)이 있고, 전개(방법론)가 있고, 절정(결과)이 있고, 마무리(의의와 전망)가 있다. 스토리가 없는 논문은 아무리 결과가 좋아도 읽히지 않는다. 리뷰어도 사람이고, 사람은 이야기에 반응한다.

스토리라인을 구성하는 첫 번째 단계는 "한 문장 요약"이다. 이 논문을 한 문장으로 요약하면 무엇인가? "딥러닝을 이용해 균열을 검출했다"는 한 문장 요약이 아니다. 이것은 방법의 나열이다. "기존 균열 검출 방법은 조명 조건에 취약한데, 본 연구에서는 도메인 적응 기법을 적용하여 다양한 조명 조건에서도 강건하게 작동하는 검출 모델을 개발했다." 이것이 스토리가 있는 한 문장 요약이다. 문제가 있고, 해결이 있고, 가치가 있다.

한 문장 요약이 정해지면, 이 문장을 확장하여 논문 전체의 흐름을 설계한다. 논문의 서사 구조는 크게 네 가지 요소로 구성된다.

첫째, 동기(Motivation)이다. 왜 이 연구를 해야 하는가? 현실 세계에서 이 문제가 왜 중요한가? 독자가 "아, 이건 해결해야 할 문제구나"라고 느끼게 해야 한다. Introduction의 도입부가 이 역할을 한다.

둘째, 갈등(Conflict)이다. 기존 방법들은 왜 이 문제를 완벽히 해결하지 못하는가? 어떤 한계가 있는가? 이 갈등이 뚜렷할수록 논문의 존재 이유가 명확해진다. Introduction의 literature review와 gap 분석이 이 역할을 한다.

셋째, 해결(Resolution)이다. 이 논문이 제안하는 방법은 무엇이고, 어떻게 기존의 한계를 극복하는가? Methodology와 Results가 이 역할을 한다.

넷째, 의의(Significance)이다. 이 해결이 왜 중요한가? 어떤 후속 연구와 응용이 가능한가? Discussion과 Conclusion이 이 역할을 한다.

이 네 요소가 자연스럽게 연결될 때, 논문은 하나의 완결된 이야기가 된다. 각 섹션이 단절 없이 이어져야 하며, 독자가 한 섹션을 읽은 후 "다음에는 뭐가 나올까?"라는 기대를 가질 수 있어야 한다.

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>스토리와 과장은 다르다</strong></p>
    <p>스토리라인을 구성하라는 것이 결과를 부풀리라는 뜻이 아니다. 5% 개선을 "혁신적 성능 향상"이라고 쓰면 리뷰어의 신뢰를 잃는다. 사실에 기반한 서사를 만들되, 그 사실이 가지는 의미를 명확히 전달하는 것이 스토리텔링이다.</p>
  </div>
</div>

스토리라인을 검증하는 좋은 방법이 있다. 논문의 모든 그림과 표를 순서대로 나열하고, 각각에 한 줄씩 설명을 붙인 후, 그 설명들만 이어서 읽어본다. 이 설명들이 하나의 이야기로 읽힌다면, 스토리라인이 잘 잡힌 것이다. 이야기가 끊기거나 논리적 비약이 있다면, 그림의 순서를 바꾸거나 빠진 그림을 추가해야 한다.

교수님과의 미팅에서도 이 방법이 유용하다. 논문의 초안을 가져가기 전에, 그림과 표만 모은 슬라이드를 먼저 보여주고 스토리라인에 대한 피드백을 받는다. 글을 다 쓴 후에 구조를 바꾸는 것보다, 그림 단계에서 구조를 확정하는 것이 훨씬 효율적이다.

---

## 1문단 1아이디어 원칙

학술 글쓰기에서 가장 기본적이면서 가장 자주 위반되는 원칙이 있다. 하나의 문단에 하나의 아이디어만 담는 것이다. 이 원칙은 간단해 보이지만, 실제로 지키는 것은 생각보다 어렵다.

글을 쓰다 보면 한 아이디어에서 다른 아이디어로 자연스럽게 넘어가게 된다. "이 모델은 CNN 기반이다. CNN은 이미지 분류에 효과적이다. 이미지 분류는 최근 의료 분야에서도 많이 쓰인다. 의료 분야에서는 데이터 확보가 어렵다. 데이터가 적을 때는 전이학습이 효과적이다." 한 문단 안에서 모델 설명, CNN 일반론, 응용 분야, 데이터 문제, 전이학습까지 다섯 개의 아이디어가 섞여 있다. 이런 문단은 읽는 사람이 길을 잃는다.

좋은 문단의 구조는 세 요소로 이루어져 있다.

첫째, 주제문(Topic Sentence)이다. 문단의 첫 문장에 이 문단이 무엇에 대한 것인지를 명시한다. "본 연구에서는 전이학습을 활용하여 소규모 데이터에서의 성능 저하 문제를 해결하였다." 이 문장을 읽으면 이 문단이 전이학습에 대한 내용임을 알 수 있다.

둘째, 뒷받침 문장(Supporting Sentences)이다. 주제문을 구체적으로 설명하거나, 근거를 제시하거나, 예시를 든다. "ImageNet에서 사전학습된 ResNet-50을 백본으로 사용하고, 마지막 fully connected layer만 재학습하였다. 학습 데이터가 500장임에도 불구하고, scratch에서 학습한 모델 대비 12% 높은 accuracy를 달성하였다."

셋째, 전환문(Transition Sentence)이다. 다음 문단으로 자연스럽게 연결하는 문장이다. "그러나 전이학습만으로는 도메인 간의 차이를 완전히 극복하기 어려워, 추가적인 도메인 적응 기법이 필요하다." 이 문장은 자연스럽게 다음 문단(도메인 적응)으로 이어진다.

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>한 문단에 하나의 핵심 주장</li>
      <li>첫 문장에서 문단의 주제 명시</li>
      <li>마지막 문장에서 다음 문단으로 연결</li>
      <li>문단 길이: 4-8문장 (영어 기준 100-200단어)</li>
      <li>같은 아이디어를 다른 각도에서 보강</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>하나의 문단에 여러 주제를 혼합</li>
      <li>한 문장짜리 문단 (예외: 강조 목적)</li>
      <li>반 페이지가 넘는 거대 문단</li>
      <li>문단 간 연결 없이 갑자기 주제 전환</li>
      <li>주제문 없이 바로 세부 설명 시작</li>
    </ul>
  </div>
</div>

이 원칙이 지켜지면 논문의 가독성이 비약적으로 올라간다. 리뷰어는 각 문단의 첫 문장만 읽어도 논문의 흐름을 파악할 수 있고, 세부 내용이 궁금하면 해당 문단을 깊이 읽으면 된다. 역으로, 문단의 첫 문장만 모아서 읽었을 때 논문의 논리적 흐름이 자연스러우면, 글의 구조가 잘 잡힌 것이다. 이것을 "첫 문장 테스트"라고 부른다.

초안을 쓸 때는 이 원칙을 너무 의식하지 않아도 된다. 일단 생각나는 대로 쓰고, 교정 단계에서 문단을 분리하는 것이 효율적이다. 긴 문단을 만나면 "이 문단에 아이디어가 몇 개인가?"를 세어본다. 두 개 이상이면 쪼갠다.

---

## 참고문헌 관리

참고문헌 관리는 대부분의 대학원생이 "나중에 하면 되지"라고 생각하다가 제출 직전에 지옥을 경험하는 영역이다. 논문 작성의 첫날부터 참고문헌 관리 도구를 사용해야 한다. 단 하루도 미루지 않는 것이 좋다.

추천하는 도구는 Zotero이다. 무료이고, 브라우저 확장 프로그램으로 논문 페이지에서 원클릭 저장이 가능하며, Word와 LaTeX 모두에서 인용을 삽입할 수 있다. Mendeley도 많이 쓰이지만, Elsevier 소유로 넘어간 후 제약이 늘었다. EndNote는 유료이고 무겁지만, 학교에서 라이선스를 제공하면 사용해도 좋다.

참고문헌 관리에서 중요한 습관이 몇 가지 있다.

논문을 읽는 순간 바로 Zotero에 저장한다. (Zotero의 기본 활용법과 브라우저 확장 프로그램 사용법은 ch05 '논문 읽기의 기술'에서도 소개했다.) "나중에 넣어야지" 하면 그 논문을 다시 찾는 데 30분이 걸린다. Google Scholar에서 논문을 열었을 때 바로 Zotero 아이콘을 클릭하는 습관을 들여야 한다. PDF도 함께 저장되므로 파일 관리까지 자동으로 해결된다.

인용 정보의 정확성을 반드시 확인한다. 자동으로 가져온 정보가 틀린 경우가 생각보다 많다. 저자명, 출판 연도, 저널명, 볼륨, 페이지 번호를 한 번씩 확인한다. 특히 arXiv 프리프린트의 경우, 나중에 정식 출판되면 정보를 업데이트해야 한다.

폴더나 태그로 분류한다. "내 연구 분야", "방법론", "관련 데이터셋" 등으로 분류해 두면, 논문 작성 시 필요한 참고문헌을 빠르게 찾을 수 있다.

인용 스타일은 타겟 저널에 맞춘다. 저널마다 인용 형식이 다르다(번호 순, 저자-연도, 알파벳 순 등). Zotero에서 저널별 스타일을 선택하면 자동으로 변환된다. 이걸 수동으로 하는 것은 시간 낭비의 극치이다.

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>참고문헌 관련 최악의 시나리오</strong></p>
    <p>제출 마감 3시간 전, 참고문헌 40개를 수동으로 포맷팅하고 있는 자신을 발견하는 것이다. 저자명 형식이 통일되지 않고, 몇 개는 저널명이 약어이고 몇 개는 전체명이며, 본문의 인용 번호와 참고문헌 목록의 번호가 맞지 않는다. 이 악몽은 첫날부터 Zotero를 쓰면 100% 예방할 수 있다.</p>
  </div>
</div>

---

## 흔한 실수와 교정

처음 논문을 쓰는 대학원생이 반복적으로 저지르는 실수가 있다. 대부분은 의식적으로 주의하면 교정할 수 있는 것들이다. 여기서 다루는 실수 목록을 체크리스트처럼 활용하여, 초안 작성 후 하나씩 점검하면 좋다.

### 수동태 남용

한국어는 능동태가 자연스러운 언어인데, 영어 학술 글쓰기에서 수동태가 많이 쓰인다는 것을 배운 학생들이 모든 문장을 수동태로 쓰는 경우가 있다. "The model was developed. The dataset was collected. The experiment was conducted. The results were analyzed." 네 문장 연속 수동태는 읽는 사람을 졸리게 만든다. 한국어 학술 글쓰기의 구조와 영어와의 차이는 ch59에서 더 자세히 다룬다.

교정법은 간단하다. 능동태와 수동태를 적절히 섞는 것이다. 일반적으로 Method 섹션에서는 수동태가 적합하고("The specimens were cured for 28 days"), Results와 Discussion에서는 능동태가 더 명확하다("The proposed method outperforms the baseline by 15%"). 중요한 주장을 할 때는 능동태가 힘이 있다.

### 그림 설명 없이 넘기기

"Figure 3 shows the results."라고만 쓰고 다음 문단으로 넘어가는 것은 매우 흔한 실수이다. 그림을 본문에서 참조했다면, 그 그림에서 독자가 무엇을 봐야 하는지를 구체적으로 설명해야 한다.

나쁜 예: "Figure 3 shows the comparison of models."
좋은 예: "Figure 3 compares the accuracy of three models across different noise levels. The proposed model maintains accuracy above 90% even at the highest noise level (SNR = 5dB), whereas Model A drops below 70% and Model B fails to converge."

차이가 보이는가? 좋은 예는 독자가 그림을 보지 않아도 핵심 정보를 파악할 수 있게 해준다. 물론 그림도 봐야 하지만, 텍스트만으로도 메시지가 전달되어야 한다.

### 문단이 너무 길다

A4 한 페이지 전체가 하나의 문단인 논문을 가끔 본다. 이것은 읽는 사람의 인지적 부하를 극심하게 증가시킨다. 어디서 끊어 읽어야 할지 모르고, 앞부분의 내용이 뒷부분과 어떻게 연결되는지 파악하기 어렵다.

경험적 기준으로, 한 문단이 영어 기준 200단어를 넘으면 쪼갤 수 있는지 검토한다. 물론 복잡한 수학적 유도나 상세한 실험 조건 기술에서는 예외가 있지만, 대부분의 경우 긴 문단은 여러 아이디어가 섞여 있다는 신호이다.

### 논리적 비약

"A는 B이다. 따라서 C를 제안한다." A에서 C로 넘어가는 논리적 연결이 빠져 있으면 리뷰어가 즉각 지적한다. "왜 B로부터 C가 도출되는가?"를 독자에게 설명해야 한다. 연구자 본인에게는 당연한 논리도, 독자에게는 전혀 당연하지 않을 수 있다. 모든 논리적 단계를 명시적으로 서술하는 것이 학술 글쓰기의 기본이다.

### 기여(Contribution) 과장

첫 논문을 쓰는 대학원생이 특히 빠지기 쉬운 함정이다. "Novel", "innovative", "revolutionary" 같은 단어를 남발하면 리뷰어는 기대 수준을 높이고, 기대에 미치지 못하면 더 가혹한 평가를 내린다. 결과가 5% 개선이면 "modest but consistent improvement"라고 쓰는 것이 정직하고 효과적이다. 과장은 리뷰어의 적대감을 부른다. 겸손하되 명확하게, 실제로 한 만큼만 주장하는 것이 현명하다.

### 관련 연구 인용 누락

자기 연구와 관련된 최근 논문을 인용하지 않으면, 리뷰어가 "이 저자는 최근 동향을 파악하지 못하고 있다"고 판단한다. 더 나쁜 경우, 리뷰어 논문이 인용되지 않으면 감정적으로 불리해질 수 있다. 물론 리뷰어의 논문을 알 방법은 없지만, 해당 분야의 최근 2-3년 주요 논문을 빠짐없이 인용하는 것이 안전하다.

<div class="check-list">
  <label><input type="checkbox"> 수동태와 능동태가 적절히 섞여 있는가?</label>
  <label><input type="checkbox"> 모든 그림/표가 본문에서 참조되고 설명되어 있는가?</label>
  <label><input type="checkbox"> 200단어 이상인 문단이 없는가?</label>
  <label><input type="checkbox"> 논리적 비약 없이 주장이 전개되는가?</label>
  <label><input type="checkbox"> 기여를 과장하지 않았는가?</label>
  <label><input type="checkbox"> 최근 2-3년의 관련 연구가 인용되어 있는가?</label>
  <label><input type="checkbox"> 참고문헌의 형식이 타겟 저널 기준에 맞는가?</label>
</div>

---

## 초안부터 최종본까지

논문은 한 번에 완성되지 않는다. 여러 차례의 수정과 피드백을 거쳐 점진적으로 완성된다. 이 과정을 미리 이해하고 있으면 중간에 좌절할 일이 줄어든다.

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-label">1단계</div>
    <div class="timeline-title">1차 초안 작성 (Shitty First Draft)</div>
    <div class="timeline-desc">완벽하지 않아도 된다. 문법, 표현, 흐름 신경 쓰지 말고 일단 모든 내용을 종이 위에 올린다. 빈칸은 [TODO]로 표시하고 넘어간다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">2단계</div>
    <div class="timeline-title">자가 교정 (Self-editing)</div>
    <div class="timeline-desc">하루 이상 시간을 두고 다시 읽는다. 논리 흐름, 문단 구조, 1문단 1아이디어, 그림 설명, 참고문헌을 점검한다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">3단계</div>
    <div class="timeline-title">지도교수 피드백</div>
    <div class="timeline-desc">교수님에게 초안을 드린다. 보통 구조적 수정이 많이 온다. "이 섹션을 앞으로 옮겨라", "이 결과가 더 중요하니 강조해라", "이 부분은 빼라" 같은 피드백이 온다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">4단계</div>
    <div class="timeline-title">2차 수정</div>
    <div class="timeline-desc">교수님의 피드백을 반영하여 수정한다. 이 과정을 2-3회 반복하기도 한다. 교수님마다 다르지만, 보통 3회차 이상은 세부 표현 수정에 집중된다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">5단계</div>
    <div class="timeline-title">공동저자 리뷰</div>
    <div class="timeline-desc">공동저자가 있다면 그들의 피드백도 받는다. 특히 해당 분야의 전문성을 가진 공동저자의 의견은 논문의 완성도를 크게 높인다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">6단계</div>
    <div class="timeline-title">영문 교정</div>
    <div class="timeline-desc">영어가 모국어가 아닌 경우, 전문 교정 서비스나 원어민 동료의 도움을 받는다. 문법뿐 아니라 자연스러운 표현을 확인한다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">7단계</div>
    <div class="timeline-title">최종 점검 및 제출</div>
    <div class="timeline-desc">저널 포맷 확인, 그림 해상도 확인, 참고문헌 형식 확인, Cover letter 작성 후 제출한다.</div>
  </div>
</div>

### 1차 초안: 일단 쓴다

1차 초안에서 가장 중요한 것은 "완벽주의를 버리는 것"이다. Anne Lamott이 말한 "Shitty First Draft"의 개념이다. 첫 번째 초안은 형편없어도 된다. 좋은 글은 좋은 초안에서 나오는 것이 아니라, 나쁜 초안의 교정에서 나온다.

빈 화면 앞에서 첫 문장을 30분째 고민하고 있다면, 그냥 아무거나 쓰면 된다. "이 섹션에서는 제안한 방법에 대해 설명한다"처럼 단순하게 시작해도 좋다. 나중에 다 고칠 것이다. 지금은 내용을 종이 위에 올리는 것이 목표이다.

실질적인 팁 하나를 알려주면, 논문의 각 문단에 들어갈 핵심 아이디어를 bullet point로 먼저 적는 것이다. Methodology 섹션이라면 이런 식이다:

- 전체 프레임워크 그림 설명
- 입력 데이터 전처리 과정
- CNN 아키텍처 상세 (레이어 구성, 활성화 함수)
- 손실 함수 정의
- 학습 전략 (learning rate schedule, early stopping)
- 평가 지표 (accuracy, F1, IoU)

이 bullet point들을 하나씩 문단으로 확장하면, 어느새 Methodology 섹션이 완성된다. 각 bullet point가 하나의 문단이 되므로 1문단 1아이디어 원칙도 자연스럽게 지켜진다.

### 자가 교정: 냉각 시간이 필요하다

초안을 쓴 직후에 바로 교정하면 효과가 떨어진다. 자기가 쓴 글은 자기 눈에 완벽해 보이기 때문이다. 최소 하루, 가능하면 2-3일의 "냉각 시간"을 두고 다시 읽으면, "이게 무슨 소리지?"라는 부분이 보이기 시작한다.

자가 교정 시 점검해야 할 순서가 있다. 먼저 큰 구조를 본다. 섹션의 순서가 논리적인가? 불필요한 섹션은 없는가? 빠진 내용은 없는가? 구조가 확정된 후에 문단 수준을 본다. 각 문단이 하나의 아이디어를 담고 있는가? 문단 간 전환이 자연스러운가? 마지막으로 문장 수준을 본다. 문법, 어휘, 수동태/능동태, 시제 일관성을 점검한다.

큰 것에서 작은 것으로 가는 이 순서가 중요하다. 문장을 완벽하게 다듬어 놓은 문단이 구조 수정으로 통째로 삭제되는 일이 벌어지면, 그 시간은 전부 낭비다.

### 교수님 피드백: 당황하지 않기

교수님에게 초안을 드리면 빨간 줄이 잔뜩 그어진 채로 돌아온다. 처음 이것을 받으면 좌절감이 밀려온다. "이렇게 못 쓴 건가?" 하는 자괴감이 든다. 하지만 이것은 정상이다. 교수님의 피드백이 많다는 것은 관심이 있다는 뜻이다. 피드백이 아예 없거나 "잘 쓰셨네요"라고만 하는 것이 더 걱정스러운 상황이다.

피드백을 받으면 먼저 전체를 한 번 읽고, 구조적 피드백과 세부 피드백을 분류한다. 구조적 피드백("이 섹션을 앞으로 옮겨라", "이 결과를 앞에 넣어라")을 먼저 반영하고, 그 다음에 세부 피드백("이 표현을 바꿔라", "이 참고문헌을 추가해라")을 반영한다. 한꺼번에 하려고 하면 혼란스러워진다.

교수님의 피드백에 동의하지 않는 부분이 있을 수 있다. 이때는 무조건 따르지 말고, 왜 동의하지 않는지를 정리해서 다음 미팅에서 논의한다. "교수님, 이 부분은 이런 이유로 원래 순서가 나을 것 같은데, 어떻게 생각하시나요?" 이것이 건강한 학술적 대화이다. 다만, 교수님의 경험이 당신보다 훨씬 많다는 것을 기억하고, 대부분의 경우 교수님의 피드백이 맞다는 것도 인정해야 한다.

---

## 제출 전 최종 확인

논문이 거의 완성되면 마지막으로 점검해야 할 것들이 있다. 이 단계에서의 실수는 첫인상을 망치고, 리뷰어에게 "이 저자는 꼼꼼하지 않다"는 인상을 줄 수 있다.

타겟 저널의 투고 규정(Author Guidelines)을 처음부터 끝까지 읽는다. 대부분의 대학원생이 이것을 대충 훑고 넘어가는데, 여기에는 페이지 수 제한, 그림 해상도 요구 사항, 참고문헌 형식, 키워드 수, Abstract 단어 수 제한 등이 상세히 명시되어 있다. 규정을 위반하면 리뷰 전에 reject(desk rejection) 될 수 있다.

그림의 해상도를 확인한다. 대부분의 저널은 300 DPI 이상을 요구한다. 화면에서 깨끗해 보이는 그림도 인쇄하면 흐릿할 수 있다. 벡터 형식(SVG, PDF, EPS)으로 저장하면 해상도 문제에서 자유로워진다.

영어 문법과 맞춤법을 최종 점검한다. Grammarly 같은 도구를 돌리면 놓친 오류가 발견되기도 한다. 특히 a/the 관사, 단수/복수, 시제 일관성은 마지막까지 확인한다.

모든 그림과 표가 본문에서 참조되어 있는지 확인한다. Figure 5가 있는데 본문에서 언급되지 않았다면, 이 그림은 필요 없다는 뜻이거나 참조를 빠뜨린 것이다.

참고문헌의 번호가 본문의 인용과 정확히 일치하는지 확인한다. LaTeX을 쓰면 자동으로 처리되지만, Word에서 수동으로 관리했다면 반드시 교차 확인한다.

Cover letter를 작성한다. 편집자에게 보내는 편지로, 연구의 핵심 기여와 이 저널에 적합한 이유를 간결하게 설명한다. 길 필요 없이, 한 페이지면 충분하다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>Desk Rejection을 피하는 법</strong></p>
    <p>Desk rejection은 리뷰어에게 보내기 전에 편집자가 거절하는 것이다. 주요 원인은 세 가지다. (1) 저널의 범위(scope)에 맞지 않는 주제, (2) 논문 형식이 투고 규정에 맞지 않음, (3) 영어 수준이 심각하게 낮음. 이 세 가지만 확인해도 desk rejection의 80%를 피할 수 있다.</p>
  </div>
</div>

---

## 글쓰기는 근육이다

논문 글쓰기는 재능이 아니라 기술이다. 기술은 연습으로 향상된다. 처음 쓰는 논문이 좋을 수는 없다. 두 번째가 첫 번째보다 낫고, 세 번째가 두 번째보다 낫다. 이것은 거의 모든 연구자에게 해당되는 사실이다.

매일 30분이라도 글을 쓰는 습관을 들이면 글쓰기 근육이 붙는다. ch04 '하루를 설계하라'에서 매일의 루틴으로 "30분 글쓰기"를 소개한 것도 같은 이유다. 논문이 아니어도 좋다. 연구 노트, 세미나 요약, 실험 결과 보고서, 무엇이든 좋다. 쓰는 행위 자체가 중요하다.

좋은 논문을 많이 읽는 것도 글쓰기 실력 향상에 도움이 된다. ch05 '논문 읽기의 기술'에서 다룬 비판적 읽기 습관이 여기서 빛을 발한다. 읽을 때 "이 저자는 왜 이 단어를 선택했을까?", "이 문단의 구조는 어떻게 되어 있지?", "이 전환이 왜 자연스럽지?"를 의식적으로 분석해 보면, 자기 글에도 그 패턴이 스며든다.

마지막으로, 글쓰기를 두려워하지 않아야 한다. 빈 화면이 무서운 것은 누구나 마찬가지다. 하지만 일단 첫 문장을 쓰면, 두 번째 문장은 조금 더 쉬워진다. 완벽한 첫 문장을 기다리지 말고, 불완전한 첫 문장이라도 쓰는 것이 시작이다. 고칠 수 있는 나쁜 초안이, 고칠 수 없는 빈 페이지보다 항상 낫다.

---

## 함께 쓰는 논문

대부분의 논문은 혼자 쓰지 않는다. 지도교수가 공저자이고, 선배나 동기가 함께 연구에 참여하고, 때로는 다른 연구실이나 외부 기관과 협력한다. 혼자 쓸 때의 어려움과 함께 쓸 때의 어려움은 질적으로 다르다. 혼자 쓸 때는 글 자체가 어렵고, 함께 쓸 때는 조율이 어렵다. 이 섹션에서는 공저 논문을 효과적으로 진행하는 실전 방법을 다룬다.

### 공저자와의 분업

논문 작성에 여러 사람이 참여할 때, "누가 어떤 섹션을 쓸 것인가"를 초기에 명확히 정해야 한다. 이것이 안 되면 두 사람이 같은 부분을 쓰고 있거나, 아무도 쓰지 않는 부분이 생긴다.

**분업의 일반적 패턴.** 제1저자(주로 대학원생)가 전체 초안을 쓰고, 공저자들이 리뷰와 수정을 하는 것이 가장 흔한 패턴이다. 하지만 대규모 프로젝트에서는 섹션별로 나누기도 한다. 예를 들어, 실험을 수행한 사람이 Methodology와 Results를 쓰고, 이론을 담당한 사람이 수식 유도와 모델 설명을 쓰고, 제1저자가 Introduction/Discussion/Conclusion과 전체 통합을 맡는 식이다.

**분업 시 주의할 점.** 첫째, 각 섹션의 마감일을 정한다. "빨리" "곧"이 아니라 "5월 15일까지 Methods 초안"처럼 구체적으로 잡는다. 둘째, 전체 논문의 톤과 표기법을 미리 통일한다. 한 사람은 "the proposed method"라고 쓰고 다른 사람은 "our approach"라고 쓰면, 나중에 통합할 때 수정할 곳이 산더미가 된다. 시작 전에 표기법 가이드(notation guide)를 만들어 공유하면 이 문제를 크게 줄일 수 있다. 셋째, 통합 담당자를 정한다. 보통 제1저자가 이 역할을 맡는다. 각자가 쓴 부분을 합치고, 톤을 통일하고, 흐름을 매끄럽게 다듬는 것은 생각보다 시간이 많이 드는 작업이다.

**커뮤니케이션 프로토콜.** 주간 미팅에서 진행 상황을 공유한다. "이번 주에 Methodology 초안을 완성했고, 다음 주에 Results를 시작합니다." 진행이 막히면 빨리 알린다. "Results의 Table 3 데이터가 아직 안 나왔어서, 다른 섹션을 먼저 하겠습니다." 이 소통이 없으면, 한 사람의 지연이 전체 일정을 무너뜨린다.

### 버전 관리와 피드백 통합

공저 논문에서 가장 혼란스러운 것이 버전 관리다. "최종.docx", "최종_수정.docx", "진짜최종.docx", "진짜최종_교수님수정.docx"가 폴더에 쌓이는 순간, 어떤 것이 최신 버전인지 아무도 모르게 된다.

**Word + Track Changes 워크플로.** 대부분의 연구실에서 실제로 사용하는 방법이다. Word의 변경 내용 추적(Track Changes) 기능을 켜고, 각 공저자가 수정 사항을 남긴다. 수정이 돌아오면 제1저자가 하나씩 수락/거절하며 통합한다. 이 방법은 진입 장벽이 낮지만, 여러 사람이 동시에 수정하면 병합이 어렵다. 순차적으로 돌려야 한다. "A가 먼저 보고 → B에게 전달 → B가 보고 → C에게 전달." 시간이 걸리지만 충돌은 피할 수 있다.

**Overleaf(LaTeX) 워크플로.** LaTeX을 쓰는 연구실이라면 Overleaf가 강력한 대안이다. Google Docs처럼 실시간 공동 편집이 가능하고, 버전 히스토리가 자동으로 저장된다. 누가 언제 무엇을 바꿨는지가 모두 기록된다. 무료 플랜으로도 기본 기능은 충분하다. 단, LaTeX 학습 곡선이 있으므로 공저자 모두가 LaTeX에 익숙해야 한다.

**Git을 이용한 논문 관리.** ch16 '버전 관리'에서 코드 관리용으로 Git을 소개했지만, 논문 관리에도 활용할 수 있다. LaTeX 파일은 텍스트 기반이라 Git과 궁합이 좋다. 각 공저자가 브랜치에서 수정하고, Pull Request로 병합하면 충돌을 체계적으로 관리할 수 있다. 다만 이 방법은 공저자 전원이 Git에 익숙해야 하므로, 현실적으로는 CS 관련 연구실에서 주로 사용된다.

**상충하는 피드백 처리.** 공저자가 여러 명이면, 피드백이 서로 모순되는 경우가 반드시 생긴다. 교수 A는 "이 문단을 줄여라"라고 하고, 교수 B는 "이 부분을 더 자세히 설명해라"라고 한다. 이때 패닉에 빠지지 말자. 다음의 원칙을 따른다. (1) 지도교수(교신저자)의 의견이 최우선이다. (2) 양쪽 의견이 모두 타당할 때는 제1저자가 판단하고, 그 이유를 설명한다. (3) 해결이 안 되면 미팅을 잡아서 직접 논의한다. 이메일로 핑퐁하는 것보다 5분 대화가 훨씬 효율적이다.

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>피드백 통합의 현실적 팁</strong></p>
    <p>공저자의 피드백을 받으면, 각 코멘트에 대해 세 가지 중 하나로 분류한다. (1) 바로 반영 — 오탈자 수정, 명백한 개선. (2) 논의 필요 — 구조 변경, 내용 삭제/추가 등 판단이 필요한 것. (3) 반영하지 않음 — 이유를 적어서 답변. 이 분류를 하지 않고 무조건 다 반영하면, 논문이 여러 사람의 스타일이 뒤섞인 누더기가 된다.</p>
  </div>
</div>

### 프리프린트 전략

프리프린트(Preprint)는 피어리뷰 전에 공개하는 논문 초고다. arXiv(물리, 수학, CS, 공학), engrXiv(공학), bioRxiv(생물학) 등의 서버에 무료로 올릴 수 있다. 최근 공학 분야에서도 프리프린트 활용이 빠르게 늘고 있다.

**프리프린트의 장점.** 첫째, 우선권(priority) 주장이 가능하다. 저널 리뷰는 수개월에서 1년 이상 걸리는데, 그 사이에 다른 그룹이 비슷한 연구를 발표할 수 있다. 프리프린트를 미리 올려두면, "우리가 먼저 이 아이디어를 공개했다"는 증거가 된다. 둘째, 조기 피드백을 받을 수 있다. 동료 연구자들이 프리프린트를 읽고 댓글이나 이메일로 피드백을 주기도 한다. 셋째, 가시성(visibility)이 높아진다. 저널 발표 전에도 연구가 알려지고, 인용될 수 있다.

**프리프린트의 단점과 주의사항.** 첫째, 일부 저널은 프리프린트가 올라간 논문을 거부한다. 특히 일부 공학 저널(예: ASCE 계열 저널)은 "이전에 공개된 적 없는 원고"를 요구하는 경우가 있다. 제출 전에 반드시 해당 저널의 정책을 확인해야 한다. 대부분의 주요 출판사(Elsevier, Springer, IEEE, Wiley)는 프리프린트를 허용하지만, 예외가 있으니 확인이 필수다. 둘째, 프리프린트는 피어리뷰를 거치지 않았으므로, 오류가 있을 수 있다. 너무 성급하게 불완전한 원고를 올리면 자기 평판에 오히려 해가 될 수 있다. 셋째, 프리프린트를 올린 후에도 저널 투고와 리비전은 별도로 진행해야 한다. 프리프린트가 최종 논문은 아니다.

**언제 프리프린트를 올릴 것인가.** 저널에 투고한 직후가 가장 일반적인 타이밍이다. 이때 원고가 이미 공저자 전원의 승인을 받은 상태이고, 내용도 충분히 완성되어 있다. 투고 전에 올리는 것은 공저자와 반드시 합의해야 한다. 지도교수의 동의 없이 프리프린트를 올리는 것은 절대 하지 말아야 한다.

<div class="do-dont">
  <div class="do-box">
    <h4>✅ Do</h4>
    <ul>
      <li>저널 투고 후, 공저자 전원의 동의를 받고 프리프린트를 올린다</li>
      <li>타겟 저널의 프리프린트 정책을 사전에 확인한다</li>
      <li>프리프린트에 "Submitted to [저널명]"을 명시한다</li>
      <li>저널 발표 후 프리프린트를 최종 버전으로 업데이트한다</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ Don't</h4>
    <ul>
      <li>지도교수 동의 없이 프리프린트를 올린다</li>
      <li>불완전한 초안을 성급하게 공개한다</li>
      <li>프리프린트를 올렸으니 저널 투고를 생략한다</li>
      <li>타겟 저널의 프리프린트 정책을 확인하지 않는다</li>
    </ul>
  </div>
</div>

함께 쓰는 논문은 혼자 쓰는 것보다 더 좋은 논문이 될 수 있다. 여러 사람의 관점이 모이면 논리의 허점이 줄어들고, 다양한 전문성이 합쳐지면 연구의 깊이가 깊어진다. 그 잠재력을 실현하려면 명확한 분업, 체계적인 버전 관리, 그리고 솔직한 소통이 필수다. 공저 논문의 협업 전반에 대해서는 ch30 '공동 연구'에서 더 폭넓게 다룬다.

---

## 논문의 첫 문단의 기술

논문의 첫 문단은 논문 전체에서 가장 많이 읽히는 부분이다. abstract를 읽은 독자가 본문으로 넘어갈지 결정하는 순간이 첫 문단이다. 리뷰어가 논문에 대한 첫 인상을 만드는 부분도 첫 문단이다. 첫 문단에 충분한 시간을 쓰는 것이 논문 전체의 인상을 결정한다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>첫 문단의 1분 규칙</strong></p>
    <p>독자가 첫 문단을 1분 안에 읽는다. 그 1분 안에 독자는 다음을 알아야 한다. (1) 다루는 문제, (2) 왜 그것이 중요한지, (3) 논문이 어떤 새 관점을 제공하는지. 첫 문단이 이 3가지를 전달하지 못하면 독자가 논문을 닫는다.</p>
  </div>
</div>

**첫 문단의 4가지 구성 요소.**

좋은 첫 문단은 보통 다음 4가지 구성 요소를 가진다.

요소 1: **Hook (1-2 문장)**. 독자의 주의를 끄는 첫 문장. 분야의 큰 그림, 흥미로운 사실, 또는 문제의 중요성.

요소 2: **Problem (1-2 문장)**. 다루는 구체적 문제. Hook의 큰 그림에서 좁은 문제로 독자를 안내.

요소 3: **Gap (1-2 문장)**. 기존 연구가 문제를 충분히 다루지 못한 부분. 논문이 왜 필요한지의 정당성.

요소 4: **Promise (1-2 문장)**. 논문이 무엇을 할 것인지 약속. 첫 문단의 마지막에 핵심 기여를 1-2 문장으로.

총 4-8 문장. 1-2 단락. 너무 짧으면 약하고, 너무 길면 독자가 잃는다.

**첫 문단의 모범 예시.**

```
[Hook] 교량의 안전 점검은 시민의 일상 안전과 직결된다.
[Hook] 한국에만 약 3만 개의 교량이 있고, 매년 수십 건의 손상이 보고된다.
[Problem] 그러나 모든 교량을 사람의 눈으로 정기적으로 점검하는 것은
물리적으로 불가능하며, 작은 균열이 큰 사고로 발전하기 전에 발견하는 데
한계가 있다.
[Gap] 기존의 영상 처리 기반 자동 균열 검출 방법은 정확도가 충분하지 않고,
다양한 환경 조건(조명, 날씨, 표면 상태)에서의 일반화가 어렵다.
[Promise] 본 연구에서는 이 한계를 극복하기 위해 합성곱 신경망(CNN) 기반의
새로운 균열 검출 방법론을 제안하며, 다양한 환경 조건에서 수집된 대규모
데이터셋으로 검증한 결과, 기존 방법 대비 정확도를 15% 향상시켰다.
```

이 첫 문단을 1분 안에 읽으면 독자가 논문의 핵심을 안다.

**첫 문단의 5가지 함정.**

함정 1: **첫 문장이 너무 일반적**. "기계 학습은 최근 많은 분야에서 사용된다." 이것은 거의 모든 ML 논문에 적용되는 일반론. 분야 또는 문제에 특화시킨다.

함정 2: **문제 정의의 모호함**. "콘크리트 구조물의 안전이 중요하다." 이것은 큰 그림이지만 구체적 문제가 아니다. 다루는 정확한 문제를 명시.

함정 3: **Gap이 없음**. 문제만 설명하고 기존 연구의 한계를 명시하지 않는다. 독자가 "왜 이 새 논문이 필요한가"를 모른다.

함정 4: **Promise가 너무 약함**. "본 연구에서는 새로운 방법을 제안한다." 이것은 모든 논문이 한다. 핵심 기여가 무엇인지 구체적으로.

함정 5: **첫 문단의 분량 과다**. 첫 문단이 1페이지를 넘는다. 독자가 잃는다. 4-8 문장으로 압축.

**첫 문단을 5번 다시 쓴다.**

첫 문단은 논문 전체에서 가장 많은 시간을 쓰는 부분이다. 첫 초고 작성 후 논문 전체를 다 쓴 후 다시 본다.

다시 쓰는 5단계:

1. **첫 초고 작성**: 논문의 핵심을 4-8 문장으로 작성.
2. **본문 완성 후 검토**: 본문이 첫 문단의 약속과 일치하는가?
3. **동료의 검토**: 동료가 첫 문단만 보고 1분 안에 논문의 핵심을 이해하는가?
4. **PI의 검토**: 톤, 강조점, 표현을 PI가 검토.
5. **마지막 다듬기**: 모든 단어를 검토. 불필요한 단어 제거. 더 강한 표현으로 교체.

첫 문단을 5번 다시 쓰면 논문의 첫 인상이 강해진다. 첫 문단에 박사 학위 논문이라면 1-2일, 일반 논문이라면 4-8시간을 쓴다. 논문 전체에 비해 작은 시간이지만 효과는 가장 크다.

---

## Discussion 섹션의 기술 — 가장 약한 섹션을 가장 강하게

학생 논문을 리뷰할 때 리뷰어가 가장 자주 지적하는 부분이 Discussion 섹션이다. Introduction은 선배 논문을 참고해서 쓸 수 있고, Methods는 이미 수행한 작업을 기술하면 되고, Results는 데이터가 말해준다. 하지만 Discussion은 **데이터가 무엇을 의미하는지 해석**해야 한다. 이 해석의 질이 학문적 사고 수준을 직접 드러낸다. 많은 학생의 Discussion이 약한 이유는 "Results 섹션의 요약"에 그치기 때문이다. 좋은 Discussion은 결과를 반복하지 않고, 결과로부터 통찰을 끌어낸다.

<div class="highlight-box highlight-important">

**Results vs Discussion의 경계.** Results는 "무엇을 발견했는가"를 중립적으로 기술한다. Discussion은 "그것이 무엇을 의미하는가"를 해석한다. 이 둘의 경계가 흐려지면 논문이 혼란스러워진다. Results에서 "이것은 중요한 발견이다"라고 쓰면 Discussion의 영역을 침범한 것이고, Discussion에서 단순히 "Figure 3에서 X는 Y였다"라고 반복하면 Results의 복사가 된다. 경계를 명확히 지키는 것이 기본이다.

</div>

**좋은 Discussion의 6가지 구성 요소.**

잘 쓰인 Discussion 섹션은 다음 6가지 요소를 포함한다. 순서는 다를 수 있지만 모든 요소가 있어야 한다.

**1. 주요 결과의 해석 (Interpretation)**
Results에서 보여준 수치와 패턴이 실제로 무엇을 의미하는지 설명한다. "85% 정확도"가 Results의 사실이라면, "이 85%는 기존 방법 대비 의미 있는 향상이다. 특히 어려운 케이스(X 조건)에서 10% 포인트 개선이 있었는데, 이는 본 방법이 다룰 수 있는 문제 영역이 넓어졌음을 시사한다"가 Discussion의 해석이다.

**2. 선행 연구와의 비교 (Comparison)**
결과를 기존 연구와 비교한다. 일치하는 경우는 "A et al. (2020)이 보고한 B와 일치하는 방향이며, 이는 이 현상이 널리 관찰됨을 시사한다". 불일치하는 경우는 특히 중요하다. "본 결과는 C et al. (2021)의 관찰과 다르다. 가능한 이유는 (1) 실험 조건의 차이, (2) 측정 방법의 차이, (3) 본 연구가 사용한 데이터셋의 특수성 때문일 수 있다"처럼 차이를 설명한다.

**3. 메커니즘 또는 이유 (Why/Mechanism)**
"왜 이런 결과가 나왔는가"를 설명한다. 물리적 원리, 알고리즘의 작동 방식, 데이터의 특성 등. 이 부분이 Discussion의 지적 깊이를 가장 잘 보여준다. "본 방법이 잘 작동한 이유는 X가 Y를 제공했기 때문이다"라는 식. 단순히 숫자를 나열하는 것과 원인을 설명하는 것은 천지 차이다.

**4. 함의와 확장 (Implications)**
발견이 더 넓은 맥락에서 어떤 의미를 가지는지 논의한다. 이론적 함의(기존 이론을 지지/반박/확장), 실무적 함의(산업 응용의 가능성), 방법론적 함의(다른 분야에도 적용 가능). 리뷰어는 "So what?"을 묻는다. 결과가 이 특정 문제를 넘어서는 의미가 있는지 설명해야 한다.

**5. 한계 (Limitations)**
본 연구의 한계를 솔직히 인정한다. 데이터 크기, 가정의 제약, 측정의 불확실성, 일반화 범위 등. 이 섹션을 약하게 쓰거나 피하면 리뷰어는 "저자가 방법의 한계를 모른다"고 판단한다. 반대로 한계를 정직하게 인정하면 신뢰를 얻는다.

**6. 향후 연구 (Future Work)**
한계로부터 자연스럽게 이어지는 향후 연구 방향을 제시한다. "본 연구에서 다루지 못한 X는 향후 연구에서 다룰 것이다" 같은 식. 단순히 "더 많은 데이터가 필요하다"는 진부한 표현을 피하고, 구체적인 다음 단계를 제시한다.

**Discussion의 실전 구조 — 6가지 요소를 어떻게 배열할 것인가.**

위의 6가지 요소를 논문에 배치하는 방법에는 두 가지 주요 패턴이 있다.

**패턴 A: 주요 발견별 접근 (Finding-Centric)**
Discussion의 각 소제목이 주요 발견에 대응한다. 각 소제목 안에서 해석, 비교, 메커니즘, 함의를 다룬다. 한계와 향후 연구는 마지막에 별도로 모은다.

```
5. Discussion
5.1 Finding 1: [주요 발견 1]의 의미
   (해석 + 비교 + 메커니즘 + 함의)
5.2 Finding 2: [주요 발견 2]의 의미
   (해석 + 비교 + 메커니즘 + 함의)
5.3 Finding 3: [주요 발견 3]의 의미
   (해석 + 비교 + 메커니즘 + 함의)
5.4 Limitations
5.5 Future Work
```

이 패턴은 발견이 3-4개로 명확하게 분리될 때 효과적이다.

**패턴 B: 요소별 접근 (Element-Centric)**
Discussion 전체를 6가지 요소 순서대로 구성한다. 모든 주요 발견을 한 소제목 안에서 함께 다룬다.

```
5. Discussion
5.1 Interpretation of Main Results
5.2 Comparison with Previous Work
5.3 Underlying Mechanisms
5.4 Broader Implications
5.5 Limitations
5.6 Future Directions
```

이 패턴은 발견들이 서로 강하게 연결되어 있을 때 효과적이다.

논문의 성격에 따라 둘 중 하나를 선택한다. 한번 선택하면 일관되게 적용한다.

**Discussion에서 피해야 할 6가지 실수.**

**실수 1: Results의 단순 반복.**
"Figure 3에서 Method A는 85%, Method B는 82%였다. Method C는 80%였다..."는 Discussion이 아니라 Results의 복사다. Discussion에서는 "Method A가 B와 C를 이긴 이유는..." 같은 해석을 해야 한다.

**실수 2: 과잉 일반화.**
한 데이터셋에서 실험했는데 "본 방법은 모든 경우에 작동한다"라고 쓰면 안 된다. 테스트한 조건에서만 주장이 유효하다. "본 데이터셋에서" 또는 "검토된 조건에서"라는 한정어를 붙인다.

**실수 3: 근거 없는 추측.**
"이 결과는 아마도 X 때문일 것이다"라는 식의 근거 없는 추측은 위험하다. X라고 주장하려면 그 근거를 제시해야 한다. 근거가 없으면 "X는 가능한 설명이지만 본 연구에서는 검증되지 않았다"라고 정직하게 쓴다.

**실수 4: 모순되는 결과의 회피.**
결과가 선행 연구와 다를 때, 이를 언급하지 않고 넘어가는 것은 가장 흔한 실수다. 리뷰어는 반드시 알아채고 지적한다. 먼저 인정하고 설명하는 것이 낫다.

**실수 5: 한계의 축소.**
"본 연구의 한계는 데이터가 약간 부족하다는 것이다"는 너무 약하다. 한계를 진지하게 서술한다. "본 연구는 N=30의 소규모 데이터에 기반하므로, 일반화는 신중해야 한다. 특히 X 조건에서의 성능은 추후 더 큰 데이터로 검증되어야 한다"처럼.

**실수 6: 향후 연구의 모호함.**
"더 많은 연구가 필요하다"라는 표현은 의미가 없다. 구체적으로 무엇을 해야 하는지 제시한다. "향후 X 조건을 포함한 데이터를 수집하여 본 방법의 강건성을 검증할 것이다. 또한 Y 접근과의 비교를 통해 본 방법의 강점과 약점을 더 명확히 할 수 있을 것이다"처럼.

**Discussion의 1단락 템플릿.**

Discussion의 첫 단락은 특히 중요하다. 다음 5문장 템플릿을 참고한다.

> 1. [본 연구의 목표를 간결히 재진술]
> 2. [핵심 결과 1-2개를 요약 — 수치 포함]
> 3. [이 결과가 본 연구 가설/예측과 어떻게 맞는지]
> 4. [선행 연구와의 관계 — 확장/반박/보완]
> 5. [아래에서 상세히 논의할 주제들의 개요]

예시:

> "In this study, we investigated whether physics-informed neural networks can outperform traditional finite element methods in fatigue life prediction under variable loading.
> Our results show that PINN achieves a mean absolute error of 0.18 log-cycles, a 35% improvement over the rainflow-counting baseline.
> This confirms our hypothesis that incorporating physical constraints into the loss function provides a strong inductive bias for this task.
> These findings extend prior work by Smith et al. (2022), who showed similar benefits in static loading conditions, to the more complex regime of variable amplitude loading.
> In the following sections, we discuss the mechanism behind this improvement, its limitations under extreme conditions, and implications for structural design practice."

이 한 단락이 전체 Discussion의 요약과 방향을 제시한다.

**한계 섹션의 전략적 작성.**

한계를 쓰는 것은 단순히 "나는 솔직하다"를 보여주는 것이 아니라 전략적 행위다. 다음 원칙이 있다.

**원칙 1: 리뷰어가 지적하기 전에 먼저 인정한다.** 리뷰어가 "본 연구는 X가 부족하다"고 지적할 것이 예상되면, 먼저 Discussion에서 언급한다. "본 연구의 한 가지 한계는 X이다"라고 쓰면, 리뷰어는 "저자가 이를 인식하고 있다"고 판단하여 덜 공격적이 된다.

**원칙 2: 한계를 나열만 하지 말고 완화 노력도 함께 서술.** "한계: 데이터가 작다"만 쓰지 말고, "데이터가 작은 한계를 완화하기 위해 교차 검증과 부트스트랩 분석을 수행했다"라고 쓴다. 한계를 인정하되 최선을 다했음을 보여준다.

**원칙 3: 해결할 수 없는 한계와 미래에 해결할 한계를 구분.** 본 연구의 근본적 한계(예: 측정 장비의 정밀도)와 미래 연구에서 해결할 한계(예: 더 큰 데이터셋)를 구분한다. 전자는 솔직히 인정하고, 후자는 향후 연구에 연결한다.

**원칙 4: 치명적 한계는 논문 자체를 재고해야 한다.** 만약 한계가 논문의 주장을 무효화할 정도라면, 한계를 숨길 것이 아니라 연구 자체를 재구성해야 한다. 문제 정의를 좁히거나, 주장을 완화하거나, 추가 실험을 수행한다.

**Discussion을 쓰기 위한 사전 작업.**

Discussion을 쓰기 전에 다음을 준비한다.

1. **결과를 한눈에 볼 수 있는 요약표**: 모든 수치 결과를 한 페이지에 정리.
2. **관련 선행 연구 10-20편의 요약**: 각 논문의 핵심 결과와 본 연구 결과의 관계.
3. **"So what?" 3가지 답**: 결과가 왜 중요한지 3가지 이유를 미리 정리.
4. **예상 비판 목록**: 리뷰어라면 어떤 약점을 지적할지 5-10개 적어본다.

이 준비가 있으면 Discussion이 훨씬 쉽게 써진다. 준비 없이 쓰기 시작하면 두서없이 흘러간다.

**Discussion 분량의 균형.**

Discussion 섹션의 적절한 분량은 어느 정도인가? 일반적 가이드:

- **Introduction + Results + Discussion의 균형**: Discussion이 Introduction보다 길어야 한다. Discussion이 Introduction의 절반도 안 되면 해석이 부족한 것이다.
- **전체 논문의 20-30%**: 일반적 공학 논문에서 Discussion이 전체 분량의 20-30%를 차지. 이보다 짧으면 해석이 부족, 길면 불필요한 내용이 많다.
- **결과당 1-2단락의 해석**: 주요 결과마다 최소 1단락, 중요한 결과는 2-3단락의 해석.

분량을 맞추기 위해 내용을 늘리는 것은 금물이다. 적절한 깊이의 해석이 들어가면 자연스럽게 적절한 분량이 된다.

**Discussion을 강화하는 5가지 질문.**

Discussion 초안을 쓴 후 다음 질문으로 검토한다.

1. 내 해석이 Results의 단순 반복이 아닌가?
2. "왜" 이런 결과가 나왔는지 설명했는가?
3. 선행 연구와 결과의 관계가 명확한가?
4. 결과가 더 넓은 맥락에서 무엇을 의미하는지 논의했는가?
5. 한계를 솔직히 그리고 구체적으로 서술했는가?

이 다섯 질문에 모두 "예"라고 답할 수 있으면 Discussion은 평균 이상이다.

> Discussion은 "데이터를 수집하는 사람"에서 "데이터를 해석하는 사람"으로 올라가는 섹션이다. 박사 과정의 본질적 성장도 이와 같다. 학부생은 계산을 하고, 석사는 실험을 하고, 박사는 결과를 해석한다. Discussion 섹션에 시간의 상당 부분을 쓰는 것이 박사급 연구자가 되는 길이다. 다른 섹션은 기술이지만, Discussion은 사고다.

---

## Related Work 섹션 작성의 기술 — 문헌을 지도로 만들기

박사 학생의 논문에서 **가장 대충 쓰이는 섹션**이 Related Work다. "관련된 논문 나열" 정도로 인식하고, 각 논문을 한두 문장으로 요약한다. "A et al. [1] proposed X. B et al. [2] proposed Y. C et al. [3] proposed Z." 이것이 Related Work라고 믿는다. 그러나 좋은 Related Work는 단순한 목록이 아니라 **분야를 이해시키는 지도**다. 이 지도가 독자에게 "연구가 어디에 있고, 왜 중요한지"를 보여준다. Related Work를 잘 쓰면 리뷰어의 첫인상이 근본적으로 달라진다.

<div class="highlight-box highlight-important">

**"목록 vs 지도"의 차이**. 관광 가이드북을 생각해보자. 단순 목록은 "서울에는 경복궁, 남산, 한강이 있다"라고 말한다. 지도는 "경복궁은 북쪽 중심에, 남산은 중앙에, 한강은 도시를 남북으로 가르며 흐른다. 이들의 관계가 서울의 지리를 만든다"라고 설명한다. 독자가 원하는 것은 목록이 아니라 지도다. Related Work도 마찬가지. 논문들의 **관계**를 보여주는 것이 핵심이다.

</div>

**Related Work의 5가지 기능.**

좋은 Related Work가 수행하는 역할.

**1. 분야의 지도 제공.**
독자(리뷰어 포함)가 분야의 전체 풍경을 이해하게 한다. 어떤 접근들이 있고, 어떻게 분류되는지.

**2. 연구 위치 지정.**
"연구가 이 지도의 어디에 있는가"를 명확히 한다. 빈 공간을 채우는가, 기존 접근을 개선하는가, 완전히 새로운 영역을 여는가.

**3. 차별점 강조.**
연구가 기존 연구와 어떻게 다른지. 단순히 다른 것이 아니라 왜 다른지가 중요.

**4. 신뢰성 확립.**
분야를 깊이 안다는 것을 증명. 주요 논문을 빠뜨리지 않고, 올바르게 이해하고 있음을 보여준다.

**5. 리뷰어 설득.**
리뷰어는 종종 "이 저자가 내 분야를 제대로 이해하고 있는가?"를 Related Work로 판단한다. 약하면 나머지가 아무리 좋아도 의심받는다.

**Related Work의 3가지 구조 패턴.**

잘 쓰인 Related Work는 다음 3가지 구조 중 하나를 따른다.

**패턴 1: 주제별 그룹화 (Thematic).**
관련 연구를 주제별로 묶어 각 그룹을 서브섹션으로.

```
2. Related Work
  2.1 Approach A (전통적 방법)
      - 특징 설명
      - 대표 연구들 [1-5]
      - 한계
  2.2 Approach B (최근 방법)
      - 특징 설명
      - 대표 연구들 [6-10]
      - 한계
  2.3 Approach C (하이브리드)
      - 특징 설명
      - 대표 연구들 [11-15]
      - 한계
  2.4 본인 위치
```

**장점**: 독자가 분야의 구조를 이해. 방법이 어느 그룹에 속하는지 명확.

**사용 시기**: 분야에 명확한 접근 카테고리가 있을 때.

**패턴 2: 시간순 (Chronological).**
분야의 발전을 시간 순으로 서술.

```
2. Related Work
  The early work on X focused on [approach A].
  Starting in [year], researchers shifted to [approach B] because [reason].
  Recent years have seen the emergence of [approach C], driven by [advance].
  Our work builds on this trajectory by [contribution].
```

**장점**: 분야의 발전 내러티브를 보여줌. 연구가 자연스러운 다음 단계로 느껴짐.

**사용 시기**: 분야의 역사가 명확하고 발전 방향이 뚜렷할 때.

**패턴 3: 차원별 (Dimensional).**
여러 축(차원)에 따라 기존 연구를 분류.

```
2. Related Work
  We compare existing methods along three dimensions:
  - Accuracy vs Speed
  - Supervision level
  - Scalability

  Methods that prioritize accuracy [1, 2, 3]
  Methods that prioritize speed [4, 5, 6]
  ...

  Table 1 summarizes these trade-offs. Our work
  achieves [X] by [Y].
```

**장점**: 복잡한 풍경을 체계화. 표가 유용함.

**사용 시기**: 분야가 복잡하고 여러 차원이 얽혀 있을 때.

**어느 패턴이든 목록 나열은 피한다.** 단순한 "A가 이걸 했다, B가 저걸 했다"는 Related Work가 아니라 참고문헌 덤프다.

**Related Work의 길이.**

학생들이 흔히 묻는 질문: "얼마나 길게 써야 하나?"

**일반적 가이드라인**:
- **Full paper (10-12 pages)**: 1-2 페이지
- **Short paper (4-6 pages)**: 0.5-1 페이지
- **학위논문 챕터**: 20-40 페이지 (ch36 참조)

**원칙**:
- 너무 짧으면 분야를 모른다는 인상
- 너무 길면 연구가 희석됨
- 모든 관련 논문을 다룰 필요 없음 (대표만)

**나쁜 Related Work의 5가지 신호.**

Related Work가 다음 신호를 보이면 재작성 필요.

**신호 1: 나열뿐.**
"A did X. B did Y. C did Z." 관계 없음, 구조 없음.

**신호 2: 연구와의 연결 부재.**
기존 연구를 설명하지만 "그래서 연구와 뭐가 다른가"가 없음.

**신호 3: 핵심 논문 누락.**
분야의 가장 중요한 논문이 없음. 리뷰어가 즉시 알아챔.

**신호 4: 오래된 논문만.**
최근 2-3년의 중요 논문이 없음. 분야를 쫓지 못한다는 인상.

**신호 5: 오해 또는 왜곡.**
다른 연구자의 방법을 잘못 설명. 원 저자가 리뷰어면 치명적.

**Related Work의 핵심 기법.**

잘 쓰인 Related Work의 실전 기법.

**기법 1: "Zoom In" 구조.**
넓은 범위에서 시작해서 연구와 가까운 범위로 좁혀 들어간다.

```
이 분야 전체의 문제 → 하위 분야 A → 특정 방법 → 본인의 연구
```

**예시**:
```
"Machine learning for structural health monitoring has evolved
over the past decade. Early work used handcrafted features with
traditional classifiers [1-5]. The rise of deep learning enabled
end-to-end approaches [6-10]. Recently, physics-informed
methods have gained attention [11-15]. Within physics-informed
approaches, [specific technique] has been particularly promising
[16-20]. Our work extends this line by [contribution]."
```

이 구조가 독자를 연구 자리까지 자연스럽게 안내.

**기법 2: "Gap Identification" (빈 공간 찾기).**
기존 연구의 어떤 부분이 해결되지 않았는지 명시.

**예시**:
```
"While [Method A] achieves high accuracy on X, it fails on Y.
[Method B] addresses Y but requires large amounts of labeled data.
[Method C] reduces the data requirement but cannot handle Z.
Thus, there remains a gap: no existing method handles X, Y,
and Z simultaneously with minimal supervision. Our work fills
this gap."
```

**주의**: "Gap"이 너무 작위적이면 안 됨. 진짜 빈 공간이어야.

**기법 3: 비교 표 (Comparison Table).**
복잡한 분야에서 한 장의 표로 요약.

```
| Method     | Accuracy | Speed | Data | Assumption |
|------------|----------|-------|------|------------|
| [A] [1]    | High     | Low   | Lots | Smooth     |
| [B] [2]    | Med      | High  | Few  | Smooth     |
| [C] [3]    | Low      | High  | Few  | None       |
| Ours       | High     | High  | Few  | None       |
```

이 표가 100 줄의 글보다 효과적. 연구의 장점이 즉각 드러남.

**기법 4: "직접 비교" 표현.**
특정 논문을 직접 참조하여 본인과의 차이 설명.

**예시**:
```
"The closest work to ours is [Smith et al., 2024]. They proposed
[their method] for [their problem]. However, their approach
assumes [limitation], which does not hold in [our setting].
We address this by [our approach]."
```

가장 가까운 선행 연구 1-2편을 이렇게 직접 비교.

**기법 5: "상위 분류 + 하위 디테일".**
먼저 큰 카테고리로 묶고, 각 카테고리 안의 대표 논문들.

**예시**:
```
"Existing approaches fall into three categories: (1) rule-based
methods [1, 2], (2) statistical methods [3-5], and (3)
learning-based methods [6-10]. Rule-based methods are
interpretable but limited in complex scenarios. Statistical
methods handle uncertainty well but assume specific
distributions. Learning-based methods are flexible but
require large datasets."
```

**기법 6: 인용 밀도 조절.**
핵심 논문은 자세히, 주변 논문은 짧게.

```
"[Smith et al., 2024] introduced the first framework for X,
showing that [key insight]. This opened up a new direction of
research [3-8]. Subsequent work has explored various extensions
[9-12], including [specific example]. Our approach differs
from these in two key ways..."
```

핵심 논문(Smith)은 이름과 내용을 풀어 쓰고, 주변 논문은 번호로만.

**Related Work 작성의 실전 단계.**

**1단계: 논문 수집.**
Google Scholar, Semantic Scholar에서 관련 논문 수집. 30-50편의 후보.

**2단계: 분류.**
수집한 논문을 카테고리로 분류. 3-5개 카테고리. 이것이 Related Work의 뼈대.

**3단계: 핵심 논문 선정.**
각 카테고리에서 2-4편의 대표 논문. 총 10-20편이 Related Work의 주연.

**4단계: 관계 그림 그리기.**
종이에 논문들과 그들 사이의 관계를 그려본다. 누가 누구를 기반으로 했는지, 어떤 아이디어가 어떻게 발전했는지.

**5단계: 위치 결정.**
이 지도에서 연구가 어디에 있는지 표시. 기존 연구와의 관계를 명확히.

**6단계: 초안 작성.**
위의 구조 패턴 중 하나를 선택하여 초안. 의식적으로 "관계"를 서술.

**7단계: 수정과 다듬기.**
초안을 여러 번 수정. 각 문장이 필요한지, 관계가 명확한지.

**8단계: 동료 검토.**
같은 분야의 동료에게 읽혀보고 "분야가 잘 이해되는가?"를 묻기.

**"직접 인용" vs "간접 언급"의 선택.**

**직접 인용**: 저자 이름을 풀어서 쓰기. "Smith et al. proposed..."

**간접 언급**: 번호로만 언급. "Previous work [1] proposed..."

**사용 규칙**:

- **중요 논문**: 직접 인용. 저자의 기여를 인정. 1-5편.
- **연관 논문**: 간접 언급. 맥락 제공. 10-20편.
- **주변 논문**: 번호 나열. "[11-15]". 필요 시.

**예시**:
```
"Building on the seminal work of Smith et al. [1], several
researchers have explored extensions [2-8]. Most notably,
Jones et al. [5] introduced [specific technique]. Our work
differs from these by..."
```

Smith와 Jones는 직접 인용 (중요), 나머지는 번호.

**인용 윤리의 기본.**

Related Work에서 특히 중요한 윤리.

**원칙 1: 누락 금지.**
알고 있는 중요 논문을 고의로 누락하지 말 것. "경쟁자의 논문을 인용하고 싶지 않다"는 생각은 위험. 리뷰어가 누락을 즉시 지적.

**원칙 2: 오해 금지.**
다른 논문의 내용을 과장하거나 축소하지 말 것. 정확히 요약.

**원칙 3: 자기 인용 남용 금지.**
이전 논문을 과도하게 인용하지 말 것. 관련성이 있어야 인용.

**원칙 4: "Cite-to-flatter" 금지.**
편집자나 심사위원의 논문을 억지로 인용해서 환심을 사려 하지 말 것. 들킨다.

**원칙 5: Fair Credit.**
어떤 아이디어가 누구의 것인지 정확히 표시. "이것은 [원 저자]의 아이디어이며, 우리는 이를 확장했다"처럼.

**Related Work의 리뷰어 관점.**

리뷰어가 Related Work를 읽을 때 찾는 것.

**리뷰어의 체크리스트**:
1. 분야의 주요 논문이 있는가?
2. 저자가 분야를 올바르게 이해하고 있는가?
3. 연구와 기존 연구의 차이가 명확한가?
4. 분류와 설명이 정확한가?
5. 리뷰어 자신의 논문이 있는가? (농담 아님, 실제로 확인)
6. 최근 논문이 포함되어 있는가?

이 체크리스트에 맞추어 Related Work를 작성하면 리뷰어의 첫 인상이 좋아진다.

**리뷰어의 논문 언급.**
학계의 작은 비밀: 리뷰어는 종종 논문이 인용되었는지 확인한다. 잠재적 리뷰어를 예상해서 그들의 관련 논문을 포함하는 것은 합리적. 이것은 조작이 아니라 "좋은 Related Work가 자연스럽게 하는 일".

**Top 저널과 컨퍼런스의 기대 수준.**

저널별로 Related Work의 기대 수준이 다르다.

**Top journals (Nature, Science 등)**:
- 분야 외 독자를 위한 넓은 맥락
- 최신 주요 논문 포함
- 연구의 큰 그림 의의

**Specialized journals**:
- 더 깊은 기술적 비교
- 구체적 방법 차이
- 전문가 독자를 가정

**Conference papers (CVPR, NeurIPS 등)**:
- 간결하지만 완전
- 최신 2-3년 집중
- 경쟁 방법과의 명확한 비교

타겟 저널에 맞게 조정.

**박사 학위논문의 Related Work 챕터.**

학위논문의 Related Work는 학술 논문의 Related Work보다 훨씬 길고 깊다 (20-40 페이지).

**차이점**:
- 논문의 Related Work: 1-2 페이지, 핵심만
- 학위논문 Related Work: 상세한 문헌 조사, 분야를 마스터했음을 증명

**학위논문 Related Work의 구조**:
- 분야의 역사 (배경)
- 주요 접근들의 상세 설명
- 각 접근의 수학적/기술적 기초
- 접근들 간의 관계와 비교
- 연구가 이 맥락에서 위치
- 남아 있는 문제들

ch36에서 더 자세히 다룸.

**Related Work의 업데이트.**

논문을 쓴 후에도 Related Work는 업데이트되어야 한다.

**언제 업데이트?**
- 투고 전: 최신 논문 추가
- 리비전 때: 리뷰어가 지적한 누락 추가
- 출판 전: 마지막 몇 주간 출판된 논문 확인

논문 투고 후 6개월이면 새 관련 논문이 10-20편 더 나올 수 있다. 이것이 리뷰에서 지적될 수 있음. 투고 직전까지 업데이트.

**도구의 활용.**

Related Work를 효율적으로 쓰는 도구.

**1. Zotero**: 참고문헌 관리의 표준. 태그, 노트 기능.

**2. Connected Papers (connectedpapers.com)**: 한 논문을 입력하면 관련 논문 그래프를 보여줌. 빠른 문헌 맵핑.

**3. Semantic Scholar**: AI 기반 논문 검색. 관련성 추천.

**4. ResearchRabbit**: 논문 기반 추천 시스템.

**5. Litmaps**: 문헌 네트워크 시각화.

**6. ChatGPT/Claude**: Related Work 초안 작성 보조. 단 출력을 그대로 쓰지 말 것. 확인과 수정 필수 (ch29 참조).

**Related Work 작성의 흔한 함정.**

**함정 1: "모든 것을 인용".**
50-100편을 나열. 읽기 힘들고 연구가 희석됨.

**해결**: 20-30편의 핵심만. 나머지는 "[추가 참고 문헌 12-20]" 수준으로.

**함정 2: "단순 요약".**
각 논문을 한 문장으로 요약만. 관계 없음.

**해결**: 논문들의 **관계**와 **본인과의 차이**에 집중.

**함정 3: "비판 없음".**
기존 연구를 모두 칭찬만. "A는 좋다, B도 좋다, C도 좋다".

**해결**: 각 방법의 한계를 명시. 이것이 본인 연구의 필요성을 만든다.

**함정 4: "분야 밖 논문 인용".**
관련 없는 분야의 논문을 "다양성"을 위해 포함.

**해결**: 핵심 관련 논문만. 분야 외 연결이 중요하면 명확히 설명.

**함정 5: "최신만 또는 오래된 것만".**
균형 없음.

**해결**: 고전 + 최근 5년의 핵심 논문.

**함정 6: "언어의 과장".**
"Revolutionary", "groundbreaking" 같은 과장된 표현.

**해결**: 객관적이고 중립적 언어.

**Related Work 품질 체크리스트.**

Related Work를 완성한 후 점검.

<div class="highlight-box highlight-info">

**Related Work 품질 체크리스트**

- [ ] 논문들이 의미 있는 카테고리로 그룹화되어 있는가?
- [ ] 각 카테고리의 특징과 한계가 설명되어 있는가?
- [ ] 핵심 논문 (top 2-3개 per category)이 포함되어 있는가?
- [ ] 본인 연구와 가장 가까운 논문 1-2편은 직접 비교되었는가?
- [ ] 연구의 위치와 차별점이 명확한가?
- [ ] 최근 2-3년의 중요 논문이 있는가?
- [ ] 잠재 리뷰어의 논문이 있는가?
- [ ] 분량이 적절한가? (풀 페이퍼 기준 1-2 페이지)
- [ ] 각 문장이 관계를 설명하는가? (단순 요약 아님)
- [ ] 언어가 객관적이고 정확한가?
- [ ] 비교 표가 있다면 장점이 드러나는가?

</div>

이 11개 항목을 모두 만족하면 Related Work는 리뷰어에게 인상을 남길 수 있다.

**학습 자원.**

- **"Writing Science" (Joshua Schimel)**: 과학 글쓰기의 고전
- **"How to Write a Better Thesis" (Evans, Gruba, Zobel)**: 학위논문의 Related Work
- **PhD Comics의 Related Work 패러디**: 웃으면서 배우기
- **Top 저널의 최근 논문**: 분야 논문들의 Related Work를 읽으며 학습
- **ch36**: 학위논문의 Related Work 챕터

> Related Work는 "목록"이 아니라 "지도"다. 이 차이를 이해하고 Related Work를 지도로 쓰는 순간, 논문의 품질이 한 단계 올라간다. 리뷰어의 첫인상이 긍정적이 되고, 기여가 명확해지고, 독자가 분야를 이해하게 된다. Related Work에 논문 작성 시간의 20-30%를 투자하는 것이 박사급 논문의 기본이다. 이것을 "마지막에 대충 쓰는 섹션"으로 두지 말자.

---

## Rebuttal과 Reviewer 응답의 기술 — 논문이 거절에서 accept로 바뀌는 순간

논문을 제출하고 4-12주 후 리뷰가 돌아온다. 이 순간부터 accept까지의 과정이 **rebuttal**이다. 많은 박사가 논문 작성에는 몇 달을 쓰면서 rebuttal에는 며칠만 쓴다. 이것은 큰 실수다. **Major revision 논문의 최종 결과는 대체로 rebuttal의 품질로 결정된다**. 같은 논문이라도 rebuttal을 잘 쓰면 accept, 못 쓰면 reject. 박사 5-7년에 10-20번의 rebuttal을 쓰게 된다. 이 기술은 박사의 핵심 역량 중 하나이지만 명시적으로 가르쳐지지 않는다.

**리뷰를 받은 첫날 — 하지 말아야 할 것.**

리뷰가 도착한 첫날은 감정이 정점이다. 특히 부정적 리뷰를 받으면 분노·좌절·방어적 태도가 자동으로 나온다. 이 시기에 하지 말아야 할 것:

- **즉시 답장하지 않기**: 첫 분노로 쓴 답장은 거의 항상 관계를 망친다. 최소 **24-48시간** 기다린다.
- **리뷰어에 대한 감정적 반응**: "이 리뷰어는 무식하다"는 생각이 들어도 글로 쓰지 않는다. 공동저자에게 비공식적으로 조차 쓰지 않기를 권장 (이메일이 나중에 유출될 위험).
- **팀 전체에 바로 공유하지 않기**: 감정이 가라앉은 후 공유. 첫 리뷰를 읽고 감정적으로 공유하면 팀 전체의 모멘텀이 떨어진다.
- **결론부터 내리지 않기**: "이 논문은 이제 끝이다"라는 결론을 하루 만에 내리지 마라. 다음 날에 다시 보면 리뷰가 덜 나쁘게 보인다.

**첫 단계 (24시간 후): 리뷰의 객관적 분석.**

감정이 가라앉은 후 리뷰를 체계적으로 분석한다:

1. **리뷰 전체를 출력**: 물리적으로 종이에 인쇄. 디지털로만 읽으면 감정이 다시 올라온다. 형광펜으로 표시하며 읽는다.
2. **각 comment를 유형 분류**: (a) 팩트 오류 지적, (b) 실험 부족 지적, (c) 명확성 부족 지적, (d) 기여도 의문, (e) 철학적 반대, (f) 리뷰어의 오해. 6가지 유형을 라벨로 각 comment에 붙인다.
3. **comment의 수정 가능성 평가**: (a) 쉽게 수정 가능, (b) 추가 실험 필요, (c) 변론/설명으로 해결, (d) 수정 불가능. 4단계 라벨.
4. **리뷰어 톤 파악**: 적대적 / 중립적 / 친절한 / 무관심한. 같은 지적이라도 리뷰어의 의도가 다르다.
5. **승산 평가**: 이 논문이 accept 가능한지의 현실적 평가. 공동저자·지도교수와 함께 판단.

이 분석이 끝나면 rebuttal의 전략이 정해진다. 분석 없이 rebuttal을 쓰면 구조 없는 답변이 된다.

**리뷰어 유형별 대응 전략.**

**유형 1, 적대적 리뷰어**: "이 논문은 novelty가 부족", "방법론이 알려진 것과 유사" 같은 reject 지향. 대응: 정중하게, 구체적 증거로 반박. 감정 배제. "We thank Reviewer for the careful reading. We respectfully disagree that... Specifically, [공손하게 구체 반박]." 적대적 리뷰어를 우리 편으로 만드는 것이 최고의 rebuttal.

**유형 2, 친절한 리뷰어**: Minor 개선점을 제안, 기본적으로 논문을 긍정. 대응: 감사 표현 후 모든 제안을 구체적으로 반영 또는 토론. 이런 리뷰어의 champion 역할을 강화.

**유형 3, 무관심한 리뷰어**: 짧은 리뷰, 피상적 comment. 대응: 짧지만 완성도 있게 답. 너무 길게 답하면 리뷰어가 읽지 않는다. 핵심만 3-5줄로.

**유형 4, 전문가 리뷰어**: 분야 전문가가 깊이 있는 technical comments. 대응: 같은 깊이로 답. 기술적 정확성이 최우선. "We implemented [specific method] as suggested and the results are..."

**리뷰어의 오해 vs 실제 문제 구분.**

리뷰어가 지적한 것이 **리뷰어의 오해** (논문의 존재하는 내용을 리뷰어가 놓침) vs **실제 문제** (논문이 실제로 부족)인지 구분하는 것이 rebuttal의 핵심.

**리뷰어 오해의 5가지 징후**:
- Comment가 언급한 내용이 이미 논문에 있음.
- 리뷰어가 방법론의 구체를 잘못 이해.
- 리뷰어가 인용하는 논문이 본인 논문과 무관.
- 리뷰어가 잘못된 단순화로 오해.
- 리뷰어가 분야 용어를 다르게 사용.

**대응**: 오해를 **지적하지 말고, 공손하게 명확화**. "We appreciate the comment. To clarify, Section 3.2 discusses [구체]... To make this clearer, we have [구체 변경]." 리뷰어가 틀렸다고 직접 말하면 감정적 반응. "Our presentation wasn't clear enough"의 프레이밍.

**실제 문제의 3가지 대응 수준**:
- 수준 1, **완전 수정**: 실험 추가, 분석 보완, 섹션 재작성. Rebuttal에 "We have [구체 행동]. See revised Section X, Figure Y."
- 수준 2, **부분 수정**: 전체 수정은 불가능하지만 약점 일부를 보완. 한계로 명시적 인정. "We agree this is a limitation. We have added discussion in Section 6.1."
- 수준 3, **방어**: 수정 불가능하지만 해당 선택의 정당성 변론. "We chose X because [구체 이유]. Y would be an interesting future direction."

**Rebuttal 문서의 구조.**

체계적 rebuttal은 다음 구조로 작성한다:

1. **개관 (1단락)**: 리뷰어들에게 감사. 주요 수정사항 3-5개를 bullet으로 요약. 리뷰어가 2분만 읽어도 논문의 변화를 파악할 수 있게.
2. **리뷰어별 응답 (리뷰어 1, 2, 3...)**: 각 리뷰어의 comment를 그대로 인용한 후 응답. "R1-Comment 1" 같은 라벨링.
3. **각 comment 응답의 3단계 구조**:
   - **감사/인정**: "We thank Reviewer for this comment. We agree that..."
   - **행동**: "We have [구체 변경]. See revised Section X."
   - **요약**: 어떻게 바뀌었는지 1-2 문장.
4. **수정된 논문의 summary**: 마지막에 전체 변경사항 요약. 변경된 섹션 목록, 추가된 실험 목록, 수정된 그림 목록.

이 구조를 벗어나면 리뷰어가 혼란. 리뷰어는 rebuttal을 **첫 리뷰와 함께 병렬로 읽는다**. 어떤 comment에 어떤 응답인지 즉시 찾을 수 있어야 한다.

**"감사-인정-행동-요약" 4단 구조 — 각 응답의 템플릿.**

개별 comment 응답의 4단 구조:

```
[R1-C3] Reviewer's comment: "The baseline comparison seems insufficient.
Why not compare with Method X (Wang et al., 2023)?"

Response:
감사: We thank the reviewer for pointing out this important baseline.
인정: We agree that Method X is a relevant comparison and should have been included.
행동: We have implemented Method X on our benchmark and added the results in
   Table 2 and Section 4.3. Our method outperforms Method X by 3.2% on average.
요약: The revised Table 2 now includes 7 baselines, including Method X.
```

이 4단 구조가 모든 comment에 일관되게 적용되면 리뷰어의 readability가 크게 올라간다. 일부 응답만 이 구조이고 일부는 다르면 "어떤 것이 핵심인가"를 리뷰어가 헷갈린다.

**Rebuttal의 분량 — "짧고 완전하게".**

Rebuttal의 분량은 학회마다 다르다:
- **NeurIPS/ICLR**: 1-2페이지 (매우 짧음). 핵심 3-5개만.
- **CVPR/ICCV**: 1페이지. 초집중.
- **Nature/Science**: 길어도 20-40페이지. 세부 완전성.
- **일반 저널**: 5-15페이지. 각 comment를 빠짐없이.

분량 한계 내에서 **가장 중요한 응답을 먼저**. 리뷰어가 마지막까지 읽지 않을 수 있음. 분량 초과는 반드시 리뷰어의 불만을 산다.

**수정 논문의 diff 기법 — 변경점을 쉽게 찾게.**

수정된 논문 제출 시 **변경된 부분을 색으로 표시**하는 것이 2024년 이후 표준. 파란색 or 빨간색으로 변경된 섹션을 강조. 리뷰어는 수정 논문을 처음부터 읽지 않고 변경 부분만 보는 것이 보통.

- **LaTeX의 `\color{blue}{...}`**: 변경된 텍스트에 색 적용.
- **차이 문서 (diff document)**: 원본과 수정본을 나란히 배치한 부록 문서. 일부 저널 요구.
- **수정된 그림에 "Updated"**: 그림 caption에 "Updated in revision" 같은 라벨.

**감정 관리 — Rebuttal의 숨은 도전.**

Rebuttal 작성은 기술적 작업이 아니라 심리적 마라톤이다. 박사의 5-7년에 10-20회를 반복하는 이 과정의 심리 관리:

- **Reject의 2-3주 회복 기간**: Reject 후 바로 다음 학회에 제출하지 마라. 2-3주의 거리를 둔 후 리뷰를 다시 읽으면 다르게 보인다.
- **리뷰어와의 개인적 감정 분리**: "이 리뷰어는 나의 적이 아니다"의 명시적 재확인. 리뷰어도 다른 박사 또는 교수.
- **지도교수의 지원 활용**: 지도교수는 수십 번의 rebuttal 경험. 전략 조언. 감정적 지지.
- **동료와의 rebuttal workshop**: 연구실의 동료들과 서로의 rebuttal을 review. 맹점 발견.
- **긴 호흡**: 한 번의 reject가 경력의 끝이 아님. 박사 5년에 2-3번의 major reject는 정상.

**AI 시대의 Rebuttal — 2024+ 주의사항.**

LLM이 rebuttal 작성을 도울 수 있지만, 경계선이 있다:

- **ALLOWED**: 문법 교정, 영어 다듬기, 구조 제안, 톤 조정 (적대적 → 정중한).
- **CAUTION**: 리뷰어 comment에 대한 답변 초안 생성. AI가 틀린 기술적 답변을 줄 수 있음. 반드시 본인이 검증.
- **FORBIDDEN**: 본인이 논문 내용을 제대로 모르는 상태에서 AI에게 rebuttal 작성을 맡기는 것. Rebuttal은 저자의 논문 이해를 증명하는 문서.

**원칙: AI는 rebuttal의 언어를 다듬지만, 논리와 내용은 본인이 만든다.** 2024년 이후 리뷰어들이 "AI-generated rebuttal"을 직감적으로 구별하기 시작. 특징: 일반화된 언어, 구체성 부족, 실험 세부 언급 없음. AI로 작성한 rebuttal은 accept 확률이 오히려 낮아진다.

**마지막 — Rebuttal은 논문의 일부다.**

많은 박사가 "논문 쓰기"와 "rebuttal 쓰기"를 분리해서 생각한다. 실제로는 **rebuttal이 논문의 최종 모습을 결정하는 마지막 장**이다. 리뷰어 4명과의 대화가 accept된 논문의 일부가 된다. 이 대화를 잘 이끌면 같은 연구가 더 높이 평가받는다. 첫 24시간의 감정 관리, 6가지 comment 분류, 리뷰어 오해와 실제 문제 구분, 4단 응답 구조, 분량 조절, AI 시대 주의사항 — 이 기술들을 박사 2-3년차부터 의식적으로 훈련하면 박사 10-20편의 논문이 같은 연구 품질에서 더 높이 올라간다.

> Rebuttal은 논문의 마지막 장이다. 첫 24시간은 감정 관리, 24시간 후 6가지 comment 유형 분류와 4단계 수정 가능성 평가. 리뷰어 유형별(적대적·친절한·무관심한·전문가) 대응과 오해 vs 실제 문제 구분. "감사-인정-행동-요약" 4단 응답 구조와 분량 내 핵심 먼저. AI 시대에는 언어 도구로만, 논리와 내용은 본인. Rebuttal 기술이 같은 연구를 accept 논문으로 만드는 박사의 숨은 역량이다.

---

## 논문의 Title과 Abstract — 읽히기 시작하는 문턱

논문의 모든 섹션 중 가장 많이 읽히는 것은 **Title**과 **Abstract**. 전체 논문 독자의 90% 이상이 Title만 보고, 70% 이상이 Abstract까지만 읽고, 본문까지 진입하는 비율은 5-10%. 따라서 Title·Abstract가 **논문의 노출·영향·인용의 문턱**. 많은 박사가 본문 완성 후 Title·Abstract를 급하게 작성하지만, 전략적 박사는 **작성 시간의 10-15%를 여기에 투자**. 이 섹션은 박사의 Title·Abstract 설계를 다룬다. ch08의 다른 섹션(초안·수정·Rebuttal)이 **본문 중심**이었다면, 이 섹션은 **진입점의 설계**다.

**Title의 5가지 기능.**

논문 Title은 여러 역할:

**기능 1, 검색 매칭**: Google Scholar, arXiv, Semantic Scholar에서 검색. 키워드가 Title에 있어야.

**기능 2, 첫 인상**: Reviewer·독자가 본 첫 텍스트. 관심 유발·진입 결정.

**기능 3, 분야 신호**: 본인 분야의 분류. "transformer"가 있으면 AI/NLP, "PINN"이면 Physics.

**기능 4, 방법 vs 응용 명시**: 새 방법 제안인지 기존 방법 응용인지.

**기능 5, Novelty의 암시**: "Novel", "Improved" 같은 단어가 아니라 **구조적으로** 새로움 암시.

이 5가지 기능을 모두 만족하는 Title이 좋은 Title.

**Title의 4가지 유형.**

**유형 1, Descriptive (서술형)**:
- 예: "Transformer-based Anomaly Detection in Time Series"
- 장점: 명확함, 검색 우수.
- 단점: 평범함, 인상 약.
- 적합: 대부분 박사 논문.

**유형 2, Declarative (주장형)**:
- 예: "Attention Is All You Need" (Vaswani 2017)
- 장점: 강한 주장, 기억에 남음.
- 단점: 과대 광고 리스크.
- 적합: 분야 주요 논문에 국한.

**유형 3, Question (질문형)**:
- 예: "Is All You Need?" 형태.
- 장점: 호기심 유발.
- 단점: 박사 논문에는 보통 부적합.

**유형 4, Dual-part (2부 구조)**:
- 예: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
- 장점: 짧은 약어 + 긴 설명.
- 단점: 약어가 기억에 남아야.
- 적합: 방법론 논문 (BERT, GPT, T5).

박사의 권장: 주로 **유형 1 (Descriptive)**. 특별한 기여라면 유형 4도 가능.

**Title의 7가지 함정.**

**함정 1, 너무 긴**: 20단어 이상. 검색·기억에 불리.

**함정 2, 너무 짧은**: 3-4단어. 정보 부족.

**함정 3, 약어 남용**: "A Novel FPGA-based CNN for RTL"의 연속. 외부자 이해 불가.

**함정 4, "Novel", "Improved", "Advanced" 남용**: 검증되지 않은 자기 선언. Reviewer 부정적.

**함정 5, 결과 과대 주장**: "Solving X Problem"처럼 "완전 해결". 반박 쉬움.

**함정 6, 분야 불명확**: "A Framework for Efficient Computation"처럼 너무 추상. 어느 분야?

**함정 7, 유머·wordplay**: 학술 논문에 부적합. 전공 외 문화적 표현.

**Title 작성의 5단계 절차.**

**1단계, 핵심 contribution 한 문장**: "본 연구의 핵심은 X 방법으로 Y 문제를 Z 개선"이라는 문장 완성.

**2단계, 키워드 추출**: 이 문장에서 5-10개 키워드.

**3단계, 구조 선택**: 위 4가지 유형 중 선택. 대부분 유형 1.

**4단계, 초안 3-5개**: 다른 단어 순서·강조로 여러 버전.

**5단계, 테스트·선택**:
- 동료에게 읽어주기 → 기억에 남는가?
- 검색해보기 → 유사 논문과 구별되는가?
- 지도교수 의견.
- 최종 결정.

이 절차 없이 "즉흥적 Title"은 논문의 첫 인상을 잃음.

**Abstract의 구조 — 표준 5-step.**

좋은 Abstract는 5단계 구조:

**Step 1, 배경·동기 (1-2 문장)**: 문제가 왜 중요한가, 왜 어려운가.

**Step 2, 기존 접근의 한계 (1-2 문장)**: 현재 방법들이 무엇을 못하는가.

**Step 3, 본 연구의 제안 (1-2 문장)**: 무엇을 하는가, 어떻게.

**Step 4, 주요 결과 (2-3 문장)**: 구체적 숫자, 비교.

**Step 5, 의의·의미 (1-2 문장)**: 이 결과가 왜 중요한가.

**총 150-250 단어**. 저널별 상한 확인.

**Abstract의 7가지 핵심 원칙.**

**원칙 1, 자기 완결성**: Abstract만 읽어도 논문을 이해.

**원칙 2, 구체적 숫자**: "성능을 향상" → "정확도 92.3%, 기존 대비 +3.2%".

**원칙 3, 논리적 흐름**: 문장 간 연결. 논리적 비약 없음.

**원칙 4, 명확한 공헌 진술**: "We propose..." 또는 "This work..."

**원칙 5, 과대 주장 배제**: "Solve", "Completely", "Always" 주의.

**원칙 6, 과거 시제와 현재 시제의 균형**: 본인 연구는 과거 (did, proposed), 결론·함의는 현재 (is, shows).

**원칙 7, 검색 키워드 포함**: 본인 분야의 핵심 용어.

**Abstract 작성의 타이밍.**

언제 쓸 것인가?

- **잘못된 관행**: 본문 끝난 후 5분 만에.
- **좋은 관행**: 본문 시작 전 초안 + 완성 후 수정.

**타임라인**:
- **연구 시작 시**: 1차 Abstract (가설 기반).
- **실험 진행 중**: 2차 Abstract (중간 결과).
- **논문 초안 완성 시**: 3차 Abstract.
- **제출 1주 전**: 최종 Abstract.

여러 번 수정하는 것이 표준. Abstract는 논문의 **응축된 핵심**이므로.

**Abstract의 한국 박사 특수 과제.**

- **영어 Abstract의 언어 장벽**: 직역이 아닌 영어 관용.
- **전문 첨삭 필요**: 원어민·동료의 검토.
- **한국어 Abstract**: 국내 저널은 한국어 초록 추가. 영어와 다른 구조 (ch59).
- **기계 번역의 한계**: DeepL·Google은 보조, 최종은 본인.

**Abstract의 AI 시대 — 2024+.**

- **AI 시대의 Abstract 특수**: "We use LLM to..." 같은 명시.
- **AI 생성 Abstract의 탐지**: Reviewer가 구별. 너무 매끄럽고 구체성 부족.
- **권장**: 본인이 초안, AI는 문법·영어 다듬기.
- **Semantic Search 최적화**: 2024+ 논문 검색은 의미 기반. Abstract의 의미적 명확성 중요.

**Keywords — Abstract 이후의 검색 항목.**

논문 제출 시 선택:

- **5-8개 keywords**: 본인 분야의 표준 용어.
- **Hierarchical**: 일반(AI) → 중간(ML) → 구체(Transformer).
- **저널별 MeSH 등**: 의학의 MeSH, ACM의 CCS.
- **검색성 우선**: 본인 분야 연구자가 검색할 용어.

**Graphical Abstract — 2020년대 트렌드.**

일부 저널(Cell, Nature 등)이 Graphical Abstract 요구:

- **1장의 그림**: 논문의 핵심 시각화.
- **목적**: Title·Abstract 외 빠른 이해.
- **설계**: 입력→방법→결과의 흐름.
- **도구**: BioRender (생물학), Inkscape (일반).

**박사 논문의 Title·Abstract 체크리스트.**

제출 전 확인:

- ☐ Title이 핵심 contribution을 명확히 반영
- ☐ Title이 15단어 이내
- ☐ Title에 본인 분야 키워드 포함
- ☐ "Novel", "Improved" 등 과대 어휘 없음
- ☐ Abstract가 5단계 구조 (배경·한계·제안·결과·의의)
- ☐ 구체적 숫자 포함 (정확도·개선도 등)
- ☐ 자기 완결적 (Abstract만 읽어도 이해 가능)
- ☐ 250 단어 이내
- ☐ Keywords 5-8개 선정
- ☐ 원어민·동료 검토 완료

**마지막 — Title과 Abstract는 논문의 투자수익률 핵심이다.**

본인이 5-7년 연구로 만든 논문이 Title·Abstract의 약함으로 읽히지 않는 것은 큰 손실. 5가지 Title 기능·4가지 유형·7가지 함정·5단계 작성 절차·Abstract의 5-step 구조·7가지 원칙·타이밍·한국 과제·AI 시대·Keywords·Graphical Abstract·제출 체크리스트 — 이 모든 것을 의식적으로 다루면 같은 논문이 훨씬 더 많이 읽히고 인용된다. 논문 작성 시간의 10-15%를 Title·Abstract에 투자가 **최고의 ROI**.

> 논문 독자의 90%가 Title만, 70%가 Abstract까지 읽음. Title의 5가지 기능 (검색·인상·분야·방법·novelty)과 4가지 유형 중 대부분 Descriptive. 7가지 함정 (과장·과대·약어·무의미 등) 회피. Abstract의 5단계 구조 (배경·한계·제안·결과·의의)와 7가지 원칙. Abstract는 본문 시작 전 초안 + 완성 후 수정. 한국 박사의 영어 장벽·기계 번역 한계. 2024+ AI 시대 주의. Keywords·Graphical Abstract. 작성 시간 10-15% 투자가 최고의 ROI.

---

## 저널·학회 선택의 전략 — 어디에 논문을 낼 것인가

박사의 한 편의 논문에 **어느 저널·학회에 투고할지**의 선택이 6개월-2년의 운명을 결정한다. 잘못 선택하면 reject·늘어난 revision·낮은 가시성. 잘 선택하면 빠른 수용·적절한 청중·인용 기회. 하지만 많은 박사가 "지도교수가 선택"이라고 위임하거나 "가장 높은 IF" 기준으로만 결정. 이 섹션은 박사가 전략적으로 저널·학회를 선택하는 실전을 다룬다. ch08의 다른 섹션(스토리라인·Related Work·Rebuttal·Title/Abstract)이 **논문 작성**이었다면, 이 섹션은 **투고의 전략**이다.

**저널·학회 선택의 7가지 기준.**

**기준 1, Fit (분야 일치)**:
- 저널의 scope가 본인 논문과 일치?
- 최근 해당 저널의 논문을 3-5편 읽어 확인.
- Fit이 안 맞으면 desk reject (심사조차 안 됨).

**기준 2, Impact Factor / h5-index**:
- 저널의 영향력 지표.
- 단순 IF보다 분야 상대 순위.
- 너무 높으면 reject 확률 ↑, 낮으면 영향력 ↓.

**기준 3, 심사 기간 (Turnaround)**:
- First decision: 1주-6개월.
- Revision + Accept: 추가 2-12개월.
- 박사 졸업 타이밍 고려.

**기준 4, Acceptance Rate**:
- Top venue: 10-25%.
- Mid venue: 30-50%.
- 본인 논문의 강도와 매칭.

**기준 5, 청중 (Audience)**:
- 누가 읽을 것인가?
- 학계 vs 산업.
- 분야 내부 vs 외부.

**기준 6, Open Access / 비용**:
- Gold OA: $1,000-5,000.
- 구독 기반: 무료 투고.
- 연구비 상황.

**기준 7, 지도교수·공저자의 네트워크**:
- 해당 저널의 Editor·AC가 아는 사람인가?
- 공정한 심사 받을 가능성.

이 7가지를 **가중 평균**해서 선택.

**학회 vs 저널 — 분야별 차이.**

**CS/AI**:
- **학회 중심**: NeurIPS·ICLR·ICML·CVPR이 최상위.
- Acceptance rate 20-30%.
- 빠른 출판 (6개월).
- 저널(TMLR·JMLR)은 부차.

**물리·화학·생명과학**:
- **저널 중심**: Nature·Science·Cell·PRL.
- 학회는 presentation only.
- 느린 출판 (6-18개월).

**공학**:
- **저널+학회 혼합**: IEEE Transactions·ASME.
- 분야에 따라 다름.

**수학**:
- **저널 중심**: Annals of Mathematics·Inventiones.
- 매우 느린 출판 (1-3년).

본인 분야의 **주류**를 파악하고 그에 맞춤.

**Tier 전략 — 3단계 투고.**

박사의 현실적 투고 전략:

**Tier 1 (최상위, 첫 시도)**:
- 최고 기대치.
- Rejection 가능성 70-80%.
- Reviewer 피드백이 강력.
- 도전 가치.

**Tier 2 (중상위, 재시도)**:
- Tier 1 reject 후.
- 높은 수용 확률.
- Reviewer 피드백 반영된 강한 버전.

**Tier 3 (적정, 안전)**:
- 확실한 accept.
- 빠른 출판 필요 시.

**권장 전략**: Tier 1 → 2 → 3의 하향. 하지만 박사 졸업 시기·논문 성격에 따라 조정.

**위험**: 너무 낮은 tier에 바로 투고 → "쉽게 간 논문" 인상. 너무 높이 오래 → 졸업 지연.

**저널 shopping의 함정.**

"저널 shopping" (Tier 순차 투고)의 위험:

- **시간 낭비**: 각 시도 4-8개월. 3번 실패 = 1년 이상.
- **reviewer 중복**: 같은 reviewer가 여러 저널에서. 악영향.
- **논문 노후화**: 분야 발전으로 논문이 낡음.
- **저자의 지침 부족**: "왜 이 저널인가"의 합리적 근거.

**대안**:
- 첫 투고 전 **3-5개 후보 저널** 명단.
- 각 저널에 맞게 초안 수정.
- 지도교수·공저자와 합의.

**한국 박사의 저널 선택 특수 맥락.**

- **SCI/SCIE 강조**: 한국 대학·기관의 평가 기준.
- **임용 시장 인식**: 국내 임용에서 특정 저널 선호.
- **국내 저널**: 한국정보과학회 논문지·대한기계학회지. 낮은 IF이지만 국내 네트워크.
- **한국 IF·평점**: 한국연구재단의 등급.
- **이중 언어**: 국내 저널 한국어 버전 + 국제 저널 영어 버전 (self-plagiarism 주의).

한국 박사는 **국내·국제** 양쪽 고려.

**Open Access의 4가지 모델.**

2024년 이후 OA의 선택지:

**모델 1, Gold OA**:
- 논문이 출판 즉시 무료 공개.
- APC (Article Processing Charge) $1,000-5,000.
- PLOS·Frontiers·MDPI.
- 박사의 예산 문제.

**모델 2, Hybrid OA**:
- 전통 저널에 OA 옵션 추가.
- APC로 본인 논문만 OA.
- 단점: 가격 높음.

**모델 3, Green OA**:
- 구독 저널이지만 preprint/manuscript를 arXiv 등에 공개.
- 무료.
- 가장 박사 친화적.

**모델 4, Diamond OA**:
- 무료 OA + 무료 APC.
- 소수 저널. JMLR 같은 학회 운영.

**한국 박사의 권장**: Green OA가 기본. Gold OA는 연구비로 해결.

**약탈적 저널 (Predatory Journal) 회피.**

초대 이메일·빠른 심사 약속의 함정:

**위험 신호**:
- 연구비·저널 발급 이메일 스팸.
- "3-5일 내 수용".
- 낮은 APC (하지만 수용).
- 유명 저자 이름 도용.
- DOI·인용 지표 조작.

**확인 도구**:
- **Beall's List** (보관됨): 약탈적 저널 목록.
- **Think Check Submit** (thinkchecksubmit.org): 체크리스트.
- **DOAJ** (Directory of Open Access Journals): 품질 확인된 OA.
- **SCImago**: 저널 평가 지표.
- **지도교수·선배**: 경험.

박사 초기 **약탈적 저널에 논문 내면 이력에 흠**. 신중.

**Special Issue의 기회와 위험.**

특집호 (Special Issue):

**기회**:
- 특정 주제에 집중된 청중.
- 빠른 심사.
- Topic이 본인과 맞으면 유리.

**위험**:
- Special issue의 품질 편차.
- MDPI 등 일부는 무분별한 special issue.
- "SI에 게재"가 이력에 낮게 평가되기도.

**권장**: Top 저널의 SI는 OK. 무명 저널의 SI는 주의.

**학회 워크숍 투고의 전략적 활용.**

Main conference + Workshop:

- **Workshop의 장점**:
  - 심사 기준 완화.
  - 초기·소규모 아이디어 공유.
  - 피드백 빠름.
  - 네트워킹.

- **Workshop의 한계**:
  - Archival 여부 다름 (재투고 가능성).
  - Main 학회보다 낮은 인지도.

**박사의 전략**:
- 박사 1-2년차: Workshop으로 연습·피드백.
- 박사 3년차+: Main track에 도전.

**박사 졸업 타이밍과 투고 계획.**

졸업 1-2년 전의 투고 계획:

- **졸업 18개월 전**: 마지막 Tier 1 도전.
- **졸업 12개월 전**: Tier 2로 이동.
- **졸업 6개월 전**: Tier 3 안전 투고.
- **졸업 3개월 전**: Minor revision만.
- **졸업 직전**: 새 투고 자제.

이 타임라인이 **학위 심사까지 accept된 논문 보유**의 기반.

**AI 시대의 저널 선택 — 2024+.**

- **AI 관련 저널·학회의 확장**: 새 venue 계속 등장.
- **NeurIPS의 팽창**: 2024년 acceptance rate 25%+로 증가, 경쟁 완화.
- **OpenReview의 투명성**: 심사 과정 공개. 저널 선택 판단에 도움.
- **LLM으로 저널 조사**: "내 논문에 적합한 저널 5개"를 LLM에게 질문.
- **AI 생성 논문의 우려**: 저널들이 AI 탐지 도구 도입. 진정성 중요.

**박사의 저널·학회 선택 5가지 함정.**

**함정 1, IF만 추구**: 높은 IF가 항상 좋은 fit 아님.

**함정 2, 지도교수에 전적 의존**: 본인의 판단 없음.

**함정 3, 약탈적 저널의 달콤한 유혹**: 빠른 수용에 넘어감.

**함정 4, 한 저널만 고집**: 다른 옵션 고려 없음.

**함정 5, 졸업 압박에 하향**: 낮은 venue에 급하게.

**마지막 — 저널 선택은 논문 작성의 일부다.**

논문을 쓰고 나서 저널을 고르는 것이 아니라 **논문 아이디어 단계부터** 저널을 염두. 7가지 기준·분야별 차이·3단계 Tier 전략·한국 특수 맥락·OA 4가지 모델·약탈적 저널·Special Issue·Workshop·졸업 타이밍·AI 시대·5가지 함정 — 이 모든 것을 의식적으로 다루면 같은 논문이 **가장 적절한 청중**을 만난다. 잘못된 venue의 좋은 논문보다 옳은 venue의 평범한 논문이 더 큰 영향.

> 저널 선택은 논문 작성의 일부. 7가지 기준 (fit·IF·기간·acceptance·청중·OA·네트워크). 분야별 학회 vs 저널 중심. 3단계 Tier 전략 (최상위→중상위→안전). 저널 shopping의 함정과 대안. 한국 박사의 SCI·국내 저널·이중 언어 맥락. OA 4가지 모델 (Gold·Hybrid·Green·Diamond) 중 Green OA 권장. 약탈적 저널 회피 (Beall's List·Think Check Submit·DOAJ). Special Issue와 Workshop의 전략적 활용. 졸업 타이밍의 18개월 계획. 2024+ AI 시대의 OpenReview·LLM 조사. 5가지 함정 회피. 옳은 venue의 평범한 논문이 잘못된 venue의 좋은 논문보다 영향.

---

## 공동저자 관계의 실전 — 5명의 논문을 한 방향으로

박사 논문의 대부분은 **공동저자 2-6명**. 같은 논문이지만 각 저자의 역할·시간·기여가 다름. 잘 작동하면 혼자서는 불가능한 논문, 잘못되면 관계·논문 모두 파탄. 이 섹션은 박사가 공동저자와의 관계를 전략적으로 관리하는 실전을 다룬다. ch08의 다른 섹션(Related Work·Rebuttal·Title·저널 선택)이 **논문 자체**였다면, 이 섹션은 **사람들**이다.

**박사 논문의 전형적 공동저자 5가지 유형.**

**유형 1, 박사 (First Author)**:
- 주저자.
- 80-90% 기여.
- 핵심 아이디어·실행.

**유형 2, 박사 지도교수 (Last Author)**:
- 전체 지도.
- 자금·리소스.
- 최종 책임.

**유형 3, 공동 지도·협업 교수 (Middle Author)**:
- 특정 부분 전문성.
- 방법론 조언.

**유형 4, 석사·후배 박사**:
- 실험 보조.
- 구현 지원.

**유형 5, 산업·외부 협력자**:
- 데이터 제공.
- 실용적 관점.

각 저자의 **다른 기여**.

**저자 순서의 원칙.**

학문 관례:

**First Author**:
- 가장 큰 기여.
- 초안 작성.
- 교신 저자 가능.

**Last Author**:
- Senior·지도.
- 일반적으로 PI.
- 최종 책임자.

**Middle Authors**:
- 기여도 순.
- 또는 알파벳 순 (분야에 따라).

**Corresponding Author**:
- 연락 담당.
- 출판 후 관리.
- First 또는 Last가 많음.

**Equal Contribution (공동 1저자)**:
- 정말 동등한 기여.
- 별표 표시.
- 남발 금지.

**저자 선정의 3가지 기준 (ICMJE).**

**International Committee of Medical Journal Editors**:

**기준 1**: 연구의 개념·설계·실행·해석에 **실질적 기여**.

**기준 2**: 논문의 초안 작성 또는 **중요한 지적 내용** 수정.

**기준 3**: 출판 버전의 **최종 승인**.

**추가**: 연구의 모든 측면에 **책임** 동의.

4가지 모두 충족해야 **저자**. 부분만이면 **Acknowledgment**.

**저자 선정의 실전 갈등.**

흔한 문제:

**문제 1, 실험만 한 사람**:
- 초안 작성 X.
- 저자 vs Acknowledgment.
- ICMJE는 Ack 권고.

**문제 2, 아이디어만 제시**:
- 논의 참여.
- 지적 기여?
- 경우에 따라.

**문제 3, 자금 지원만**:
- PI·교수.
- 저자 관례이지만 ICMJE 모호.
- 한국 관례: 저자.

**문제 4, Ghost Authors**:
- 기여했는데 빠짐.
- 부정.

**문제 5, Gift Authors**:
- 기여 없는데 포함.
- 부정.

박사는 **초기 논의**로 방지.

**박사의 저자 설계 타이밍.**

**프로젝트 시작 시**:
- 예상 저자 목록 작성.
- 기여 예상.
- 순서 논의.

**진행 중**:
- 기여 변화 반영.
- 재조정.

**논문 완성 시**:
- 최종 확정.
- 모두 동의.

**제출 시**:
- 공식 등록.

**초기 명확화가 후기 갈등 방지**.

**박사와 지도교수의 관계.**

**First vs Last author**:
- 박사: First.
- 지도교수: Last.
- 표준.

**단독 저자?**:
- 드물지만 가능.
- 지도교수 지원 없이.
- 대부분 권장 안 됨.

**Corresponding author 협상**:
- 박사가 가능.
- 논문의 주체성.
- 졸업 후 교신.

**저자 순서의 협상**:
- 대부분 표준 따름.
- 예외 시 초기 논의.

**박사의 자기 주장**:
- 본인 기여 명확.
- 과도한 겸손 X.

**공저자와의 커뮤니케이션.**

**채널**:
- 정기 회의 (주 1회).
- 이메일·Slack·카톡.
- 문서 공유 (Overleaf·Google Docs).

**빈도**:
- 초안: 주 1회.
- 수정 중: 수시.
- Rebuttal: 집중.

**내용**:
- 진행 상황.
- 막힘.
- 결정 요청.

**Over-communication이 Under보다 낫다**.

**Overleaf·공동 편집의 실전.**

**Overleaf (LaTeX)**:
- 실시간 공동 편집.
- 버전 관리.
- 박사의 표준.

**Google Docs**:
- 간단한 경우.
- 주석·제안 기능.

**Notion·Coda**:
- 프로젝트 관리.

**Git**:
- 기술적 팀.
- LaTeX·코드 함께.

**팁**:
- 한 사람씩 편집 (충돌 방지).
- 주석으로 소통.
- 큰 변경은 공유.

**공저자 간 갈등의 5가지 유형.**

**갈등 1, 저자 순서**:
- 가장 흔함.
- 초기 논의로 방지.

**갈등 2, 기여도 인식 차이**:
- 본인 > 타인 관점.

**갈등 3, 논문 방향**:
- 각자의 선호.
- 절충·다수결.

**갈등 4, 일정·속도**:
- 빠른 쪽 vs 느린 쪽.

**갈등 5, 마감 기한**:
- 마지막 순간 수정.

**해결 원칙**:
- 즉시 대화.
- 지도교수 중재.
- 서면 기록.

**공저자 drop-out의 처리.**

**상황**:
- 누군가 프로젝트 이탈.
- 기여 부족.
- 다른 직장·사정.

**대응**:
- 대화로 이유.
- 저자 순서 재조정.
- 또는 Acknowledgment.

**박사의 유연성**:
- 이상적 팀 바뀜.
- 관계 유지.

**Industry Collaborator와의 특수.**

**데이터 제공·산학**:
- NDA 준수.
- 승인 절차.
- 공개 범위.

**저자권**:
- 기여에 따름.
- 회사 정책.

**IP**:
- 논문 vs 특허.
- 사전 합의 (ch40).

**출판 지연**:
- 특허 출원 후.
- 공개 타이밍.

**국제 공저자의 관리.**

**시차**:
- 회의 시간.
- 비동기 소통.

**언어**:
- 영어 기본.
- 뉘앙스 차이.

**문화**:
- 미국·유럽·아시아 관례.
- 격식·속도.

**기대 관리**:
- 명시적 합의.
- 이메일 기록.

**공저자 관계의 장기 가치.**

박사 졸업 후:

**Alumni Network**:
- 박사 공저자의 평생.
- 협업·조언.

**추천서**:
- 공저자가 작성.
- 신뢰 관계.

**후속 논문**:
- 본인의 독립 연구자로.
- 이전 공저자와 계속.

**박사의 관계가 자산**.

**한국 박사의 공저자 특수.**

- **연구실 문화**: 모든 선배·동료 저자?
- **선배 기여**: 실제 vs 관례.
- **교수 여러 명**: 공동 지도.
- **동문 추가**: Gift author 압박.
- **국제 협업**: 드물지만 증가.

한국 박사의 **저자 갈등**은 위계 문화와 연결.

**AI 시대의 공저자 — 2024+.**

**AI의 기여**:
- 코드·분석·글쓰기 보조.
- **저자 아님**.
- Methods·Acknowledgment에 명시.

**원격 협업**:
- 비동기 도구.
- 지구 반대편 공저자.

**협업 도구의 AI**:
- Notion AI·Copilot.
- 자동 요약·분류.

**공저자 관계의 5가지 함정.**

**함정 1, 초기 논의 없음**: 후에 갈등.

**함정 2, 기여 불명확**: 누가 뭐 했나.

**함정 3, 일방 소통**: 다른 사람 무시.

**함정 4, 기록 부재**: 말만으로 합의.

**함정 5, Gift/Ghost**: 학계 신뢰 훼손.

**CRediT Taxonomy.**

**Contributor Roles Taxonomy (2014)**:
- 14가지 기여 카테고리.
- 저자별 명시.
- 많은 저널이 요구.

**14가지**:
Conceptualization·Methodology·Software·Validation·Formal Analysis·Investigation·Resources·Data Curation·Writing Original Draft·Writing Review Editing·Visualization·Supervision·Project Administration·Funding Acquisition.

**박사 논문의 투명성**:
- 각 저자의 역할 명시.
- "Y. Kim conceptualized and wrote..."

**박사의 공저자 5단계 훈련.**

**1년차**: 관찰. 선배 논문 참여.

**2-3년차**: First-author 논문 시작. 협업 배움.

**4-5년차**: 복수 공저자 논문. 리더 역할.

**박사 후**: 공동 연구 주도.

**박사 후 10년**: 공저자 네트워크 확장.

**공저자 관계의 철학.**

좋은 공저자:

- **신뢰**: 서로의 기여 존중.
- **투명성**: 기여·저자 명확.
- **유연성**: 상황 변화 수용.
- **평생**: 박사 논문이 끝 아님.

**마지막 — 공저자는 박사 논문의 동료이자 평생 자산이다.**

박사의 논문 대부분이 공저. 5가지 저자 유형·저자 순서 원칙·ICMJE 3기준·갈등 유형·타이밍·관계 관리·커뮤니케이션·공동 편집·갈등 해결·Drop-out·산학·국제·장기 가치·한국 특수·AI 시대·5가지 함정·CRediT·5단계 훈련·철학 — 이 모든 것을 의식적으로 다루면 박사의 공저자들이 **평생 동료**가 된다. 관계가 학계의 기반.

> 박사 논문의 공저자는 평생 자산. 5가지 저자 유형 (First·Last·Middle·보조·외부). First/Last·Corresponding·Equal Contribution의 관례. ICMJE 3기준 (기여·작성·승인). 저자 선정의 5가지 실전 갈등 (실험만·아이디어만·자금만·Ghost·Gift). 저자 설계의 3가지 타이밍 (시작·진행·완성). 박사와 지도교수의 관계. 공저자 커뮤니케이션 채널·빈도·내용. Overleaf·Google Docs·Git의 공동 편집. 5가지 공저자 갈등과 해결. Drop-out 처리. 산학·국제 공저자 특수. CRediT Taxonomy 14가지. 한국 위계 문화. 2024+ AI는 저자 아님. 5가지 함정. 박사 5단계 공저자 훈련. 관계가 학계의 기반.
