# 논문이라는 건축물

논문은 벽돌을 하나씩 쌓아 올리는 건축이다. 설계도 없이 건물을 짓는 사람은 없듯, 구조를 잡지 않고 논문을 쓰기 시작하면 반드시 무너진다. 처음 논문을 쓰는 대학원생 대부분이 빈 화면 앞에서 첫 문장을 고민하며 시간을 보낸다. "이 연구의 배경은..."으로 시작해야 할 것 같은데, 뭘 써야 할지 모르겠다. 한 시간째 커서만 깜빡이고 있다.

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

스토리라인을 구성하는 첫 번째 단계는 "한 문장 요약"이다. 이 논문을 한 문장으로 요약하면 무엇인가? "딥러닝을 이용해 균열을 검출했다"는 한 문장 요약이 아니다. 이것은 방법의 나열이다. "기존 균열 검출 방법은 조명 조건에 취약한데, 본 연구에서는 도메인 적응 기법을 적용하여 다양한 조명 조건에서도 강건하게 작동하는 검출 모델을 개발했다" -- 이것이 스토리가 있는 한 문장 요약이다. 문제가 있고, 해결이 있고, 가치가 있다.

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

논문을 읽는 순간 바로 Zotero에 저장한다. "나중에 넣어야지" 하면 그 논문을 다시 찾는 데 30분이 걸린다. Google Scholar에서 논문을 열었을 때 바로 Zotero 아이콘을 클릭하는 습관을 들여야 한다. PDF도 함께 저장되므로 파일 관리까지 자동으로 해결된다.

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

한국어는 능동태가 자연스러운 언어인데, 영어 학술 글쓰기에서 수동태가 많이 쓰인다는 것을 배운 학생들이 모든 문장을 수동태로 쓰는 경우가 있다. "The model was developed. The dataset was collected. The experiment was conducted. The results were analyzed." 네 문장 연속 수동태는 읽는 사람을 졸리게 만든다.

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

자기 연구와 관련된 최근 논문을 인용하지 않으면, 리뷰어가 "이 저자는 최근 동향을 파악하지 못하고 있다"고 판단한다. 더 나쁜 경우, 리뷰어 본인의 논문이 인용되지 않으면 감정적으로 불리해질 수 있다. 물론 리뷰어의 논문을 알 방법은 없지만, 해당 분야의 최근 2-3년 주요 논문을 빠짐없이 인용하는 것이 안전하다.

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

논문 글쓰기는 재능이 아니라 기술이다. 기술은 연습으로 향상된다. 처음 쓰는 논문이 좋을 수는 없다. 두 번째가 첫 번째보다 낫고, 세 번째가 두 번째보다 낫다. 이것은 예외 없이 모든 연구자에게 해당되는 사실이다.

매일 30분이라도 글을 쓰는 습관을 들이면 글쓰기 근육이 붙는다. 논문이 아니어도 좋다. 연구 노트, 세미나 요약, 실험 결과 보고서, 무엇이든 좋다. 쓰는 행위 자체가 중요하다.

좋은 논문을 많이 읽는 것도 글쓰기 실력 향상에 도움이 된다. 읽을 때 "이 저자는 왜 이 단어를 선택했을까?", "이 문단의 구조는 어떻게 되어 있지?", "이 전환이 왜 자연스럽지?"를 의식적으로 분석해 보면, 자기 글에도 그 패턴이 스며든다.

마지막으로, 글쓰기를 두려워하지 않아야 한다. 빈 화면이 무서운 것은 누구나 마찬가지다. 하지만 일단 첫 문장을 쓰면, 두 번째 문장은 조금 더 쉬워진다. 완벽한 첫 문장을 기다리지 말고, 불완전한 첫 문장이라도 쓰는 것이 시작이다. 고칠 수 있는 나쁜 초안이, 고칠 수 없는 빈 페이지보다 항상 낫다.
