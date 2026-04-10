# 교과서, 강의, 필독 논문

대학원에서 가장 흔한 실수 중 하나는 "논문만 읽는 것"이다. 최신 논문을 쫓아다니면서 기초를 건너뛰는 것이다. 논문은 이미 기초를 가진 사람을 위해 쓰여졌다 (효과적인 논문 읽기 방법은 ch05 '논문 읽기의 기술'에서 다루었다.). 선형대수를 모르면 PCA 논문을 이해할 수 없고, 확률론을 모르면 베이지안 최적화 논문을 읽을 수 없다. 최적화 이론을 모르면 딥러닝 학습 알고리즘의 작동 원리를 파악할 수 없다.

기초는 교과서에서 배운다. 이것은 지름길이 없는 과정이다. 유튜브 영상으로 직관을 잡을 수 있고, 블로그로 개념을 이해할 수 있지만, 체계적이고 정확한 지식은 검증된 교과서에서만 얻을 수 있다. 좋은 교과서 한 권을 제대로 읽는 것이 논문 열 편을 대충 읽는 것보다 낫다.

이 장에서는 공학 대학원생이 알아야 할 교과서, 온라인 강의, 그리고 반드시 읽어야 할 핵심 논문을 정리한다. 앞 장(ch26 '생성형 AI 활용법')에서 강조했듯이, 기초가 탄탄한 연구자가 AI 도구도 더 잘 활용한다. 여기서 소개하는 학습 자원이 바로 그 기초를 다지는 출발점이다. 모든 것을 다 읽을 필요는 없다. 자기 연구에 필요한 것을 선별하고, 우선순위를 정하고, 효율적으로 학습하는 것이 핵심이다.

---

## 교과서의 역할

교과서는 "지식의 지도"다. 한 분야의 핵심 개념들이 어떻게 연결되어 있는지, 어떤 순서로 이해해야 하는지, 어디까지가 기본이고 어디서부터가 응용인지를 보여준다. 논문은 지도의 한 지점만 자세히 다루지만, 교과서는 전체 지형을 보여준다.

교과서의 또 다른 중요한 역할은 "공통 언어"를 제공하는 것이다. 같은 교과서를 읽은 연구자들은 같은 용어, 같은 표기법, 같은 프레임워크를 공유한다. "Bishop 책의 3장에 나오는 방법"이라고 하면, 해당 분야 연구자는 바로 무엇을 말하는지 안다. 이런 공통 기반이 없으면 학술적 소통이 어려워진다.

교과서를 읽는 것은 힘들고 지루한 작업이다. 솔직히 말해서, 재미있는 교과서는 거의 없다. 하지만 이 과정을 거치지 않으면 기초가 허술해져서, 나중에 연구가 진행될수록 더 큰 어려움을 겪게 된다. 기초가 탄탄한 연구자는 새로운 논문을 빠르게 이해하고, 자기 연구의 이론적 근거를 명확하게 설명할 수 있다.

---

## 공학 공통 필수 교과서

전공에 관계없이 공학 대학원생이라면 알아야 할 교과서가 있다. 공학 수학, 통계, 수치해석이 그것이다.

### 공학 수학: Kreyszig

Erwin Kreyszig의 "Advanced Engineering Mathematics"는 공학 수학의 바이블이다. ODE, PDE, 선형대수, 복소 해석, 확률/통계, 수치해석까지 공학에 필요한 수학의 거의 모든 것을 다룬다. 대학원 과정에서 마주치는 대부분의 수학이 이 책에 있다.

이 책은 두껍다(약 1,300페이지). 처음부터 끝까지 읽으려고 하면 안 된다. 필요한 장만 선택적으로 읽는 것이 현실적이다. ML/AI 연구를 한다면 선형대수(7-8장), 확률/통계(24-25장)가 가장 급하다. PINN이나 FEM을 다룬다면 PDE(12장), 수치해석(19-21장)이 필수다. 제어 연구라면 라플라스 변환(6장)과 푸리에 해석(11장)이 핵심이다.

대안 교과서로는 Strang의 "Linear Algebra and Its Applications"(선형대수에 집중하고 싶을 때), Boyce & DiPrima의 "Elementary Differential Equations"(ODE를 기초부터 다져야 할 때)가 있다. 특히 Gilbert Strang 교수의 선형대수 교과서는 MIT OCW 강의와 함께 보면 이해가 훨씬 수월하다.

### 통계: Montgomery

Douglas Montgomery의 "Design and Analysis of Experiments"는 실험 설계와 통계 분석의 표준 교과서다. 실험 계획법(DOE), 분산 분석(ANOVA), 회귀 분석, 반응 표면법(RSM)을 체계적으로 다룬다.

공학 연구에서 통계가 왜 중요한가? 실험 결과의 유의성을 검정하고, 변수의 영향을 정량화하고, 결과의 불확실성을 보고하기 위해서다. "A 조건에서 강도가 높았다"가 아니라 "A 조건에서 강도가 평균 15MPa 높았으며, p < 0.05로 통계적으로 유의하다"고 말할 수 있어야 한다.

ML 연구에서도 통계는 필수다. 교차 검증 결과의 유의성 검정, 모델 비교에서의 통계적 검정(t-test, Wilcoxon test), 신뢰 구간 보고 등이 모두 통계 기초를 요구한다.

대안으로는 Walpole, Myers, Myers의 "Probability and Statistics for Engineers and Scientists"가 확률/통계 기초를 더 폭넓게 다룬다.

### 수치해석: Chapra & Canale

Steven Chapra와 Raymond Canale의 "Numerical Methods for Engineers"는 공학 수치해석의 대표 교과서다. 근 찾기, 연립방정식, 곡선적합, 수치 미적분, ODE/PDE의 수치적 풀이 등을 다룬다. MATLAB 예제가 포함되어 있어 실습에 적합하다.

이 책이 중요한 이유는, ML 이전에도 공학자들은 수치적 방법으로 문제를 풀어왔기 때문이다. FEM, FDM, FVM의 기초는 모두 수치해석에 있다. 시뮬레이션 도구(ABAQUS, ANSYS, COMSOL)가 내부에서 무엇을 하는지 이해하려면 수치해석 기초가 필요하다.

---

## ML/AI 교과서

AI/ML을 연구에 적용하려면, ML 자체의 이론적 기초를 다져야 한다. 유행하는 기법의 코드를 복사-붙여넣기하는 것과, 그 기법의 원리를 이해하고 적절히 수정하여 적용하는 것은 천지 차이다.

### Bishop: 패턴 인식과 머신러닝

Christopher Bishop의 "Pattern Recognition and Machine Learning" (PRML)은 ML 이론의 고전이다. 베이지안 관점에서 ML을 체계적으로 설명한다. 확률 분포, 선형 모델, 신경망, 커널 방법, 그래프 모델, 근사 추론 등을 다룬다.

이 책은 수학적으로 엄밀하다. 선형대수와 확률론의 기초가 없으면 읽기 어렵다. 하지만 ML의 "왜"를 이해하고 싶다면 이 책이 최선이다. "왜 정규화가 필요한가?", "왜 베이지안 접근이 유용한가?", "왜 EM 알고리즘이 작동하는가?" 같은 근본적 질문에 답을 준다.

추천 독법: 1장(도입, ML 개요) → 2장(확률 분포) → 3장(선형 회귀) → 5장(신경망)을 순서대로 읽는다. 나머지 장은 필요할 때 참조한다. 무료 PDF가 저자의 웹사이트에서 공개되어 있다.

### Goodfellow, Bengio, Courville: 딥러닝

Ian Goodfellow, Yoshua Bengio, Aaron Courville의 "Deep Learning"은 딥러닝의 표준 교과서다. 수학 기초(선형대수, 확률, 수치계산)부터 시작하여 MLP, CNN, RNN, 정규화, 최적화, 생성 모델까지 체계적으로 다룬다.

이 책의 강점은 딥러닝의 수학적 기초를 Part I에서 친절하게 다룬다는 것이다. 선형대수, 확률, 정보 이론, 수치 최적화를 복습하거나 새로 배울 수 있다. Part II가 핵심(딥러닝 기초)이고, Part III는 연구 주제(생성 모델 등)다.

deeplearningbook.org에서 무료로 전체 내용을 읽을 수 있다. 공학 대학원생이라면 최소한 Part II(6-12장)는 통독하는 것을 추천한다.

### Murphy: 확률적 머신러닝

Kevin Murphy의 "Probabilistic Machine Learning"은 최신 ML 교과서 시리즈다. "An Introduction"(기초편)과 "Advanced Topics"(심화편) 두 권으로 구성된다. Bishop보다 현대적이며, 딥러닝과 전통 ML을 균형 있게 다룬다.

특히 가우시안 프로세스, 베이지안 최적화, 변분 추론 등을 현대적 관점에서 설명하므로, 대리 모델링이나 불확실성 정량화를 연구하는 공학 연구자에게 유용하다. 무료 PDF가 probml.github.io에서 공개되어 있다.

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>ML 교과서 선택 가이드</strong></p>
<p>ML을 처음 공부한다면 Goodfellow(딥러닝 중심)로 시작한다. 수학적 엄밀성을 원하면 Bishop을 참조한다. 최신 기법과 확률적 관점을 원하면 Murphy를 읽는다. 세 책 모두 무료 온라인 버전이 있으므로, 먼저 목차를 훑어보고 자기에게 맞는 책을 선택하는 것이 좋다.</p>
</div>
</div>

---

## 분야별 교과서

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch27-mech">기계공학</button>
<button class="tab-btn" data-tab="tab-ch27-civil">토목/건축</button>
<button class="tab-btn" data-tab="tab-ch27-elec">전기/전자</button>
<button class="tab-btn" data-tab="tab-ch27-chem">화학/재료</button>
<button class="tab-btn" data-tab="tab-ch27-cs">컴퓨터과학</button>
</div>

<div class="tab-content active" id="tab-ch27-mech">

**기계공학 핵심 교과서:**

- **Incropera & DeWitt, "Fundamentals of Heat and Mass Transfer"**: 열전달의 바이블. 전도, 대류, 복사를 체계적으로 다룬다. 열 관련 ML 연구(PINN, 대리 모델)의 물리적 기반.
- **Shigley, "Mechanical Engineering Design"**: 기계 설계의 기본. 응력 해석, 피로, 체결 요소, 축/베어링 설계. 구조 건전성 모니터링 연구의 배경 지식.
- **Munson, Young, Okiishi, "Fundamentals of Fluid Mechanics"**: 유체역학 기초. CFD나 유체-구조 상호작용 연구를 위한 물리적 기반.
- **Rao, "Mechanical Vibrations"**: 진동 해석. 센서 데이터 기반 고장 진단, 구조물 동적 응답 분석의 기초.

</div>

<div class="tab-content" id="tab-ch27-civil">

**토목/건축 핵심 교과서:**

- **Chopra, "Dynamics of Structures"**: 구조 동역학. 지진 공학, 구조 건전성 모니터링(SHM)의 이론적 기반.
- **Nilson, Darwin, Dolan, "Design of Concrete Structures"**: 콘크리트 구조 설계. RC 구조물의 거동과 파괴 메커니즘 이해.
- **Wight & MacGregor, "Reinforced Concrete: Mechanics and Design"**: 콘크리트 역학의 고전. 비선형 거동, 전단, 비틀림 등 심화 주제.
- **Salmon, Johnson, "Steel Structures: Design and Behavior"**: 강구조 설계. 좌굴, 연결부, 내진 설계 등.

</div>

<div class="tab-content" id="tab-ch27-elec">

**전기/전자 핵심 교과서:**

- **Haykin, "Neural Networks and Learning Machines"**: 신경망 이론의 고전. 수학적으로 엄밀한 신경망 이론을 원하는 연구자에게.
- **Oppenheim & Willsky, "Signals and Systems"**: 신호 처리의 기본. 시계열 분석, 센서 데이터 처리의 이론적 기반.
- **Gonzalez & Woods, "Digital Image Processing"**: 디지털 영상 처리. 컴퓨터 비전 연구의 기초(필터링, 에지 검출, 변환 등).
- **Sadiku, "Elements of Electromagnetics"**: 전자기학. 안테나, EMC 관련 ML 연구의 물리적 배경.

</div>

<div class="tab-content" id="tab-ch27-chem">

**화학/재료 핵심 교과서:**

- **Callister & Rethwisch, "Materials Science and Engineering"**: 재료과학 입문. 결정 구조, 기계적 성질, 상변태 등 재료 ML 연구의 기본.
- **Smith & Ness, "Introduction to Chemical Engineering Thermodynamics"**: 화학 열역학. 공정 시뮬레이션과 최적화의 이론적 기반.
- **Fogler, "Elements of Chemical Reaction Engineering"**: 화학 반응공학. 반응기 설계 최적화, 반응 속도론 ML의 기초.
- **Sholl & Steckel, "Density Functional Theory"**: 밀도범함수 이론. 계산 재료과학, 재료 인포매틱스의 시뮬레이션 기반.

</div>

<div class="tab-content" id="tab-ch27-cs">

**컴퓨터과학 핵심 교과서:**

- **Cormen et al., "Introduction to Algorithms" (CLRS)**: 알고리즘의 바이블. 정렬, 그래프, 동적 프로그래밍 등. 효율적인 코드 작성의 기반.
- **Russell & Norvig, "Artificial Intelligence: A Modern Approach"**: AI의 포괄적 개요. 탐색, 논리, 확률, ML, NLP 등을 폭넓게 다룬다.
- **Hastie, Tibshirani, Friedman, "The Elements of Statistical Learning"**: 통계적 학습 이론. 회귀, 분류, 부스팅, SVM 등의 수학적 기초. 무료 PDF 공개.
- **Jurafsky & Martin, "Speech and Language Processing"**: 자연어 처리. NLP/LLM 관련 연구의 기초. 일부 초안이 온라인에 공개되어 있다.

</div>
</div>

---

## 우선순위 가이드

교과서 목록이 길다. 모두 읽을 시간은 없다. 현실적인 우선순위를 제안한다.

시간이 정말 없다면 3권만 읽는다.

첫째, 수학 1권. 자기 연구에 가장 필요한 수학 분야를 Kreyszig에서 찾아 읽거나, ML을 한다면 Strang의 선형대수를 읽는다. 선형대수는 ML의 거의 모든 것의 기초다. 행렬 분해(SVD, eigendecomposition), 벡터 공간, 선형 변환을 이해하지 못하면 PCA, 신경망, 최적화를 제대로 이해할 수 없다.

둘째, ML/DL 1권. Goodfellow의 "Deep Learning" Part II(6-12장)를 통독한다. 딥러닝의 핵심 개념(손실 함수, 최적화, 정규화, CNN, RNN)을 체계적으로 배울 수 있다.

셋째, 전공 분야 핵심 1권. 자기 전공 분야에서 "바이블"로 불리는 책 하나를 읽는다. 위의 분야별 목록에서 첫 번째로 나열된 책이 대체로 그런 위치에 있다.

이 3권을 읽는 데 약 3~6개월이 걸린다. 매일 30분~1시간씩 꾸준히 읽는 것이 한 번에 몰아서 읽는 것보다 효과적이다.

---

## 교과서 읽는 법

교과서를 "처음부터 끝까지 순서대로 읽는 것"은 대부분의 경우 비효율적이다. 효과적인 독법을 제안한다.

**필요한 장부터 읽는다.** 연구에서 가우시안 프로세스를 쓰려면, Bishop 책의 GP 장(6장)을 먼저 읽는다. GP 장을 읽다가 커널 함수에서 막히면 커널 관련 부분을 찾아 읽고, 다변량 가우시안 분포가 이해 안 되면 확률 장(2장)으로 돌아간다. 이렇게 "필요 → 참조 → 복귀"의 패턴으로 읽으면 동기부여를 유지하면서 필요한 지식을 빠르게 습득할 수 있다.

**예제를 직접 풀어본다.** 교과서의 예제를 읽기만 하면 "이해한 것 같은" 착각에 빠진다. 해답을 가리고 직접 풀어봐야 진짜 이해인지 확인할 수 있다. 특히 수학과 통계 교과서는 예제 풀이가 필수다. 시간이 없으면 각 장의 기본 예제(1-2번)만이라도 풀어본다.

**요약 노트를 만든다.** 각 장을 읽은 후, 핵심 개념과 수식을 한 페이지에 요약한다. 이 요약 노트가 나중에 논문을 쓸 때, 시험을 준비할 때, 발표를 준비할 때 큰 도움이 된다. 교과서를 다시 펼칠 필요 없이 요약 노트만 보면 된다.

**동료와 함께 읽는다.** 혼자 읽으면 막히는 부분에서 포기하기 쉽다. 같은 연구실이나 같은 분야의 동료와 스터디 그룹을 만들어 함께 읽으면, 서로 설명하고 질문하면서 이해가 깊어진다. 사람에게 설명할 수 있어야 진짜 이해한 것이다.

---

## 온라인 강의 추천

교과서의 보완재로 온라인 강의가 유용하다. 교과서가 "정확한 지식"을 제공한다면, 강의는 "직관적 이해"를 제공한다. 둘을 병행하면 학습 효과가 극대화된다.

### Coursera - Andrew Ng의 ML 강의

Andrew Ng 교수의 "Machine Learning Specialization"은 ML 입문의 표준이다. 선형 회귀, 로지스틱 회귀, 신경망, 의사결정 나무, 비지도 학습, 추천 시스템을 다룬다. 수식보다는 직관적 설명에 초점을 맞추고, 실습 과제가 포함되어 있다.

이 강의의 최대 장점은 "ML의 큰 그림"을 제공한다는 것이다. 각 알고리즘이 어떤 문제에 적합한지, 왜 특정 방식으로 작동하는지를 직관적으로 이해할 수 있다. ML을 처음 접하는 공학 대학원생이 가장 먼저 들어야 할 강의다.

Deep Learning Specialization도 추천한다. CNN, RNN, Transformer, 전이학습 등 딥러닝 핵심을 다룬다. ML Specialization을 마친 후 이어서 듣는 것이 자연스럽다.

### MIT OCW

MIT OpenCourseWare에서 무료로 제공하는 강의들은 학부/대학원 수준의 정식 강의다. 교과서 수준의 깊이와 체계성을 가지고 있다.

핵심 추천 강의는 다음과 같다. Gilbert Strang 교수의 "Linear Algebra (18.06)"는 선형대수를 직관적이면서도 엄밀하게 배울 수 있는 최고의 강의다. 행렬 분해, 고유값, SVD 등을 기하학적 직관과 함께 설명한다. ML을 한다면 반드시 들어야 한다.

"Introduction to Deep Learning (6.S191)"은 MIT의 딥러닝 입문 강의. 매년 업데이트되며, 최신 트렌드를 빠르게 반영한다. TensorFlow 기반의 실습이 포함되어 있다.

### Stanford CS231n, CS224n

Stanford의 CS231n(CNN for Visual Recognition)은 컴퓨터 비전의 바이블 강의다. CNN의 원리, 학습 기법, 주요 아키텍처, 객체 탐지, 세그멘테이션 등을 체계적으로 다룬다. 컴퓨터 비전을 연구한다면 필수다.

CS224n(NLP with Deep Learning)은 자연어 처리의 핵심 강의다. Word2Vec, RNN, Attention, Transformer 등을 다룬다. 생성형 AI의 원리를 이해하고 싶다면 추천한다.

두 강의 모두 YouTube에서 무료로 볼 수 있고, 과제와 자료가 공개되어 있다.

### YouTube 채널

교과서와 강의 수업의 보완재로 YouTube가 유용하다.

**3Blue1Brown.** 수학적 개념을 아름다운 시각화로 설명한다. 선형대수, 미적분, 신경망의 직관적 이해에 최적이다. "Essence of Linear Algebra" 시리즈는 선형대수의 기하학적 직관을 잡는 데 최고다. "Neural Networks" 시리즈도 훌륭하다.

**StatQuest with Josh Starmer.** 통계와 ML의 각 개념을 하나씩 짧고 명확하게 설명한다. PCA, 랜덤 포레스트, 그래디언트 부스팅, 교차 검증 등 개별 주제를 빠르게 이해하고 싶을 때 유용하다.

**Andrej Karpathy.** 전 Tesla AI Director이자 OpenAI 연구원. 딥러닝의 실전적 통찰을 제공하는 강의와 영상을 올린다. "Neural Networks: Zero to Hero" 시리즈가 대표적이다.

---

## 학습 로드맵

어떤 순서로 공부해야 하는가? 공학 대학원생이 ML/AI를 학습하는 추천 로드맵을 제안한다.

<div class="pipeline">
<div class="pipeline-step">
<div class="pipeline-step-icon">📐</div>
<div class="pipeline-step-title">수학 기초</div>
<div class="pipeline-step-desc">선형대수(Strang) + 확률/통계(Walpole) 2-3개월</div>
</div>
<span class="pipeline-arrow">→</span>
<div class="pipeline-step">
<div class="pipeline-step-icon">🤖</div>
<div class="pipeline-step-title">ML 기초</div>
<div class="pipeline-step-desc">Andrew Ng + 실습(Kaggle) 2-3개월</div>
</div>
<span class="pipeline-arrow">→</span>
<div class="pipeline-step">
<div class="pipeline-step-icon">🧠</div>
<div class="pipeline-step-title">DL 기초</div>
<div class="pipeline-step-desc">CS231n/6.S191 + PyTorch 실습 2-3개월</div>
</div>
<span class="pipeline-arrow">→</span>
<div class="pipeline-step">
<div class="pipeline-step-icon">🔧</div>
<div class="pipeline-step-title">분야 응용</div>
<div class="pipeline-step-desc">PINN/CV/NLP 등 연구 분야 특화 학습</div>
</div>
</div>

이 로드맵은 8~12개월의 투자를 요구한다. 빠르다고는 할 수 없지만, 체계적으로 기초를 다진 후에는 이후의 학습과 연구가 훨씬 수월해진다.

---

## 병행 학습 전략

위의 로드맵을 순차적으로 따르면 가장 체계적이지만, 현실에서는 연구와 수업을 병행하면서 공부해야 한다. 효율적인 병행 전략을 제안한다.

**직관(YouTube) + 이론(교과서/강의) + 구현(코딩)을 동시에 진행한다.**

새로운 개념(예: CNN)을 배울 때, 먼저 3Blue1Brown이나 StatQuest의 짧은 영상으로 직관을 잡는다(30분). 그 다음 교과서나 강의(CS231n)에서 이론을 공부한다(2-3시간). 마지막으로 PyTorch로 직접 구현하고 학습해본다(2-3시간). 이 세 가지를 같은 주에 병행하면, 개념이 머리에서 손까지 연결된다.

구현 실습에는 Kaggle이 최적이다. 실제 데이터셋과 커널(노트북)이 공개되어 있어, 다른 사람의 코드를 참조하면서 배울 수 있다. Fast.ai의 "Practical Deep Learning for Coders"도 실용적인 구현 중심 강의로 추천된다.

이론만 파면 "이해한 것 같은데 구현이 안 된다"는 상황에 빠지고, 구현만 하면 "돌아가긴 하는데 왜 되는지 모르겠다"는 상황에 빠진다. 이론과 구현을 반드시 병행해야 한다.

---

## 필독 논문

교과서가 기초를 다진다면, 핵심 논문은 현재의 연구 지형을 보여준다. ML/AI와 공학의 교차점에서 반드시 읽어야 할 논문들을 정리한다.

### ML/DL 기초 논문

**Vaswani et al. (2017), "Attention Is All You Need."** Transformer 아키텍처를 제안한 논문이다. Self-attention 메커니즘이 핵심이다. 현재의 LLM(GPT, Claude, Gemini)과 Vision Transformer의 기반이다. ML/AI를 하는 모든 연구자가 읽어야 한다.

**He et al. (2016), "Deep Residual Learning for Image Recognition."** ResNet을 제안한 논문이다. Skip connection이라는 단순하지만 혁신적인 아이디어로 깊은 신경망의 학습 문제를 해결했다. 2024년 기준 인용 수 20만 회 이상. CV를 하든 안 하든, 딥러닝을 다루는 연구자라면 읽어야 한다.

**Kingma & Ba (2015), "Adam: A Method for Stochastic Optimization."** Adam 옵티마이저를 제안한 논문이다. 거의 모든 딥러닝 학습에서 기본 옵티마이저로 사용된다. 왜 Adam이 SGD보다 실전에서 잘 작동하는지를 이해하는 것이 중요하다.

**Srivastava et al. (2014), "Dropout: A Simple Way to Prevent Neural Networks from Overfitting."** Dropout 정규화 기법을 제안한 논문이다. 학습 시 무작위로 노드를 비활성화하여 과적합을 방지한다. 단순하지만 효과적인 정규화의 대표 사례다.

### 공학+AI 핵심 논문

**Raissi, Perdikaris, Karniadakis (2019), "Physics-Informed Neural Networks."** PINN의 원조 논문이다. ch24 '물리 기반 AI와 대리 모델'에서 다룬 PINN의 이론적 기반이다. 물리+AI 융합 연구를 한다면 반드시 읽어야 한다.

**LeCun, Bengio, Hinton (2015), "Deep Learning" (Nature Review).** 딥러닝 3대 거장이 Nature에 쓴 리뷰 논문이다. 딥러닝의 역사, 핵심 개념, 미래 전망을 20페이지로 요약한다. 딥러닝의 큰 그림을 잡는 데 최적이다.

**Brunton & Kutz (2019), "Data-Driven Science and Engineering."** 데이터 기반 공학의 교과서이자 논문이다. SVD, 동적 모드 분해(DMD), 희소 센서 배치 등을 다룬다. 공학에서 데이터 기반 방법을 어떻게 활용하는지의 청사진을 제공한다.

---

## 논문 찾는 법

논문을 읽으려면 먼저 찾아야 한다. 효과적인 논문 검색 전략을 정리한다.

**Google Scholar.** 가장 범용적인 학술 검색 엔진이다. 키워드 검색, 저자 검색, 인용 추적이 모두 가능하다. "Cited by" 링크를 통해 특정 논문을 인용한 후속 논문들을 찾을 수 있다. Google Scholar Alerts를 설정하면 관심 키워드의 새 논문을 이메일로 받을 수 있다.

**Semantic Scholar.** AI 기반 학술 검색 엔진이다. 논문의 핵심 기여(TL;DR)를 자동으로 요약해주고, 관련 논문을 추천한다. 인용 그래프를 시각적으로 보여주어 논문 간의 관계를 파악하기 쉽다.

**Connected Papers.** 특정 논문과 관련된 논문들을 그래프로 시각화한다. 한 논문을 입력하면, 그 논문과 유사한 논문들이 네트워크 형태로 표시된다. 새로운 분야에 진입할 때 핵심 논문들을 빠르게 파악하는 데 유용하다.

### 읽는 순서

새로운 분야에 진입할 때 추천하는 읽기 순서가 있다.

첫째, 리뷰 논문(Review paper)을 먼저 찾는다. "키워드 + review" 또는 "키워드 + survey"로 검색한다. 리뷰 논문은 해당 분야의 전체 지형을 보여주고, 핵심 논문들을 정리해놓는다. 분야의 큰 그림을 먼저 파악한 후에 개별 논문을 읽는 것이 효율적이다.

둘째, 리뷰 논문에서 가장 많이 인용된 기초 논문을 읽는다. 이 논문들이 해당 분야의 "근본"이다. 방법론의 원리와 한계를 이해하는 데 집중한다.

셋째, 최근 2~3년의 논문을 읽는다. 최신 동향, 개선된 방법, 새로운 응용을 파악한다. Google Scholar의 발행년도 필터를 활용한다.

넷째, 자기 연구와 직접적으로 관련된 논문을 집중적으로 읽는다. 방법론의 세부사항, 실험 설정, 결과 비교를 주의 깊게 분석한다.

<div class="check-list">
<label><input type="checkbox"> 수학 기초 교과서 1권 선택 (Kreyszig 또는 Strang)</label>
<label><input type="checkbox"> ML/DL 교과서 1권 선택 (Goodfellow 또는 Bishop)</label>
<label><input type="checkbox"> 전공 핵심 교과서 1권 선택</label>
<label><input type="checkbox"> Andrew Ng ML Specialization 시작</label>
<label><input type="checkbox"> 3Blue1Brown 선형대수 시리즈 시청</label>
<label><input type="checkbox"> Kaggle에 가입하고 첫 노트북 실행</label>
<label><input type="checkbox"> Transformer 논문 (Attention Is All You Need) 읽기</label>
<label><input type="checkbox"> 내 분야의 리뷰 논문 1편 찾아 읽기</label>
<label><input type="checkbox"> Connected Papers로 핵심 논문 네트워크 파악</label>
</div>

---

## 마무리: 학습은 투자다

교과서, 강의, 논문을 공부하는 것은 당장 논문을 쓰는 것보다 느린 길처럼 보인다. 하지만 기초 없이 쓴 논문은 얕고, 기초 위에 쓴 논문은 깊다. 리뷰어는 이 차이를 즉시 알아본다.

좋은 교과서 한 권은 수십 편의 논문보다 오래 남는 지식을 제공한다. 좋은 강의 한 시리즈는 수개월의 시행착오를 줄여준다. 핵심 논문 한 편은 연구의 방향을 바꿀 수 있다. 학습은 비용이 아니라 투자다. 가장 높은 수익률을 내는 투자다.

---

## 전공별 학습 로드맵

앞서 공통 학습 로드맵을 제시했다. 하지만 전공에 따라 필요한 도구와 기법이 다르다. 아래에서 전공별로 구체적인 학습 경로를 제안한다. 각 경로에 핵심 교과서 1권, 온라인 강의 1개, 그리고 직접 해볼 수 있는 프로젝트 1개를 추천한다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch27-road-struct">구조/재료 ML</button>
<button class="tab-btn" data-tab="tab-ch27-road-thermo">열유체 ML</button>
<button class="tab-btn" data-tab="tab-ch27-road-elec">전기/신호 ML</button>
<button class="tab-btn" data-tab="tab-ch27-road-chem">재료/화학 ML</button>
</div>

<div class="tab-content active" id="tab-ch27-road-struct">

**구조/재료 ML 학습 경로:**

Kreyszig 공학수학(선형대수, PDE 장) → 구조역학 교과서(Chopra 또는 Hibbeler) → Python + scikit-learn 기초 → CNN for 결함 탐지(균열 이미지 분류) → PINN(물리 기반 신경망)

- **핵심 교과서:** Chopra, "Dynamics of Structures." 구조물의 동적 응답과 모드 해석을 이해해야 SHM(구조 건전성 모니터링) 데이터를 올바르게 다룰 수 있다.
- **온라인 강의:** Stanford CS231n. 이미지 기반 결함 탐지를 하려면 CNN의 원리를 제대로 배워야 한다.
- **첫 프로젝트:** Kaggle의 균열 이미지 데이터셋으로 결함/정상 이진 분류기를 만든다. 전처리부터 모델 학습, 평가까지 전체 파이프라인을 경험할 수 있다.

</div>

<div class="tab-content" id="tab-ch27-road-thermo">

**열유체 ML 학습 경로:**

열역학/유체역학(Incropera, Munson) → 수치해석(Chapra & Canale) → Python 기초 → 대리 모델링/GP(Gaussian Process) → CFD 가속(시뮬레이션 결과 예측)

- **핵심 교과서:** Incropera & DeWitt, "Fundamentals of Heat and Mass Transfer." 열전달 현상의 물리적 이해 없이 대리 모델을 만들면, 물리적으로 불가능한 예측을 걸러낼 수 없다.
- **온라인 강의:** Andrew Ng ML Specialization. GP나 대리 모델링으로 바로 넘어가기 전에, ML의 기초(회귀, 과적합, 교차 검증)를 먼저 잡아야 한다.
- **첫 프로젝트:** 간단한 2D 열전도 시뮬레이션(COMSOL 또는 Python FDM)에서 입력(경계조건, 물성)과 출력(온도 분포)의 관계를 GP로 대리 모델링한다.

</div>

<div class="tab-content" id="tab-ch27-road-elec">

**전기/신호 ML 학습 경로:**

신호처리(Oppenheim & Willsky) → 회로해석 기초 → Python 기초 → RNN/LSTM for 시계열 예측 → 이상 탐지(anomaly detection)

- **핵심 교과서:** Oppenheim & Willsky, "Signals and Systems." 시계열 데이터의 주파수 분석, 필터링, 샘플링 이론을 이해해야 전처리 단계에서 정보를 잃지 않는다.
- **온라인 강의:** MIT 6.S191 (Introduction to Deep Learning). RNN, LSTM, Attention 메커니즘을 짧고 최신 트렌드에 맞게 배울 수 있다.
- **첫 프로젝트:** 공개 센서 데이터셋(예: NASA Bearing Dataset)에서 LSTM 기반 시계열 예측 모델을 만들고, 예측 오차 기반 이상 탐지를 구현한다.

</div>

<div class="tab-content" id="tab-ch27-road-chem">

**재료/화학 ML 학습 경로:**

물리화학/재료과학(Callister) → 양자역학 기초(Sholl & Steckel DFT 입문) → Python 기초 → GNN(Graph Neural Network)/분자 표현 → Materials Project 활용

- **핵심 교과서:** Callister & Rethwisch, "Materials Science and Engineering." 결정 구조, 상변태, 기계적 성질의 기초를 모르면 재료 데이터의 물리적 의미를 파악할 수 없다.
- **온라인 강의:** Fast.ai Practical Deep Learning for Coders (Part 1). 코드 중심으로 빠르게 모델을 만들어보는 경험이 중요하고, 이후 GNN으로 확장할 때 기초가 된다.
- **첫 프로젝트:** Materials Project API에서 재료 물성 데이터를 다운로드하고, 조성(composition) 기반 특성으로 밴드갭이나 형성 에너지를 예측하는 모델을 만든다.

</div>
</div>

---

## 학습 자가 진단

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>"내가 충분히 이해한 건가?" 확인 기준</strong></p>
<p>공부를 했는데 정말 이해한 건지 확신이 안 설 때가 있다. 아래의 기준으로 자가 진단해 볼 수 있다.</p>
<ul>
<li><strong>선형대수를 이해했다면:</strong> 2x2 행렬의 고유값 분해를 손으로 할 수 있다. 고유벡터가 기하학적으로 무엇을 의미하는지 설명할 수 있다.</li>
<li><strong>ML을 이해했다면:</strong> 과적합이 왜 발생하는지 비전공자에게 비유를 들어 설명할 수 있다. 편향-분산 트레이드오프를 그림으로 그릴 수 있다.</li>
<li><strong>DL을 이해했다면:</strong> CNN의 합성곱 연산이 입력 이미지에 무엇을 하는지 그림으로 그릴 수 있다. 왜 풀링 층이 필요한지 설명할 수 있다.</li>
<li><strong>통계를 이해했다면:</strong> p-value가 무엇인지 한 문장으로 정의할 수 있다. "유의하다"와 "중요하다"의 차이를 설명할 수 있다.</li>
</ul>
<p>설명할 수 없으면 이해한 것이 아니다. 교과서를 다시 펴는 것이 부끄러운 일이 아니라, 정직한 학습의 시작이다.</p>
</div>
</div>

---

## 각 교재/강의의 현실적 학습 시간

교과서나 강의를 시작할 때 가장 궁금한 것이 "이거 얼마나 걸리나?"다. 현실적인 시간 추정을 아래에 정리한다. 개인차가 있으므로 ±30% 정도의 편차를 감안해야 한다.

<div class="card-grid">
<div class="card">
<h4>Goodfellow "Deep Learning"</h4>
<p><strong>핵심 5장(Part II) 읽기:</strong> 약 30시간. 수식을 따라가면서 읽으면 하루 1~2시간씩 3~4주가 소요된다.<br><strong>전체 통독:</strong> 100시간 이상. Part III까지 포함하면 한 학기 분량이다. 전체를 읽는 것보다 필요한 장을 선별해서 읽는 것이 현실적이다.</p>
</div>
<div class="card">
<h4>Andrew Ng ML Specialization</h4>
<p><strong>비디오 시청:</strong> 약 40시간. 1.5배속으로 들으면 30시간 정도로 줄일 수 있지만, 처음 듣는다면 1배속을 추천한다.<br><strong>과제 포함:</strong> 약 60시간. 프로그래밍 과제를 직접 풀면 이해도가 크게 올라간다. 비디오만 보는 것과는 학습 효과의 차이가 분명하다.</p>
</div>
<div class="card">
<h4>Stanford CS231n</h4>
<p><strong>비디오 시청:</strong> 약 25시간. 강의가 밀도 있으므로 1배속을 추천한다.<br><strong>과제 포함:</strong> 약 80시간. 과제가 상당히 도전적이고, 직접 CNN을 구현해야 하므로 시간이 많이 소요된다. 과제를 풀지 않으면 절반만 배우는 것이다.</p>
</div>
<div class="card">
<h4>Fast.ai Part 1</h4>
<p><strong>비디오 시청:</strong> 약 15시간. 실용적이고 빠르게 진행되므로, 입문자에게 부담이 적다.<br><strong>실습 포함:</strong> 약 40시간. 각 강의 후 자기 데이터셋에 적용해보는 실습이 핵심이다. 비디오만 보면 "할 수 있을 것 같은" 착각에 빠지기 쉽다.</p>
</div>
</div>

완강이 목표가 아니라 이해가 목표다. 강의를 끝까지 듣는 것에 집착하면, 중간에 이해 안 되는 부분을 넘기게 된다. 한 강의의 70%를 확실히 이해하는 것이 100%를 대충 훑는 것보다 낫다. 이해가 안 되면 멈추고, 교과서나 다른 자료를 찾아본 후 다시 돌아오는 것이 올바른 학습 방식이다.

---

## 분야별 필독 교과서

앞에서 공학 공통 교과서, ML/AI 교과서, 분야별 교과서를 다뤘다. 여기서는 각 공학 분야에서 대학원 수준의 연구를 시작하기 전에 반드시 거쳐야 하는 심화 교과서를 추가로 정리한다. 앞서 소개한 교과서와 일부 중복되는 것은 그만큼 중요하기 때문이다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch27-civil2">토목/건축</button>
<button class="tab-btn" data-tab="tab-ch27-mech2">기계</button>
<button class="tab-btn" data-tab="tab-ch27-mat2">재료/화학공학</button>
<button class="tab-btn" data-tab="tab-ch27-elec2">전기전자</button>
</div>

<div class="tab-content active" id="tab-ch27-civil2">

**토목/건축 심화 필독서:**

- **Bathe, "Finite Element Procedures"**: 유한요소법의 바이블. 선형/비선형 해석, 동역학, 솔버 알고리즘까지 체계적으로 다룬다. FEM 기반 연구를 한다면 반드시 거쳐야 할 책. 수식이 무겁지만, Part I만이라도 읽어두면 상용 소프트웨어가 내부에서 무엇을 하는지 이해할 수 있다.
- **Clough & Penzien, "Dynamics of Structures"**: Chopra와 함께 구조 동역학의 양대 산맥. 다자유도 시스템, 모달 해석, 지진 응답 스펙트럼을 상세히 다룬다. 구조 건전성 모니터링(SHM) 연구자에게 필수.
- **Terzaghi, Peck & Mesri, "Soil Mechanics in Engineering Practice"**: 지반공학의 고전. 흙의 역학적 성질, 침하, 지반 안정 해석의 기초. 지반 관련 ML 연구에서 물리적 배경을 제공한다.
- **Timoshenko & Goodier, "Theory of Elasticity"**: 탄성학의 원전. 응력, 변형률, 평형 방정식의 근본적 이해를 제공한다. 고체역학 기반 연구의 이론적 토대.

</div>

<div class="tab-content" id="tab-ch27-mech2">

**기계공학 심화 필독서:**

- **Anderson, "Computational Fluid Dynamics: The Basics with Applications"**: CFD 입문서의 정석. 유한차분법, 유한체적법의 기초부터 난류 모델링까지 다룬다. CFD와 ML을 결합하는 연구의 출발점.
- **Reddy, "An Introduction to the Finite Element Method"**: 기계공학 관점의 FEM 교과서. Bathe보다 입문 단계에서 접근하기 쉽다. 열전달, 유체, 구조 해석의 FEM 적용을 고루 다룬다.
- **Meirovitch, "Fundamentals of Vibrations"**: 진동학의 현대적 교과서. 연속체 진동, 근사 방법, 실험 모달 해석까지 포함. Rao보다 수학적 엄밀성이 높다.
- **Bejan, "Convection Heat Transfer"**: 대류 열전달의 심화서. 경계층 이론, 난류 열전달, 자연 대류 등을 상세히 다룬다. 열유체 시뮬레이션 연구에 필요한 물리적 직관을 키워준다.
- **Norton, "Machine Design: An Integrated Approach"**: Shigley와 함께 기계 설계의 대표 교과서. 설계 최적화와 ML을 결합하는 연구에서 설계 변수와 제약 조건의 물리적 의미를 이해하는 데 도움.

</div>

<div class="tab-content" id="tab-ch27-mat2">

**재료/화학공학 심화 필독서:**

- **Askeland, Fulay & Wright, "The Science and Engineering of Materials"**: Callister와 함께 재료과학 입문의 양대 교과서. 금속, 세라믹, 폴리머, 복합재료를 골고루 다룬다. 재료 인포매틱스 연구의 물리적 기반.
- **Levenspiel, "Chemical Reaction Engineering"**: 화학 반응공학의 고전. 반응기 설계, 반응 속도론, 비이상 반응기 해석. 공정 최적화 ML 연구의 기초 지식.
- **Bird, Stewart & Lightfoot, "Transport Phenomena"**: 이동 현상론의 바이블. 운동량, 에너지, 물질 전달을 통합적으로 다룬다. 화학공학 시뮬레이션과 PINN 연구의 지배 방정식을 이해하는 데 필수.
- **Porter & Easterling, "Phase Transformations in Metals and Alloys"**: 금속의 상변태를 다루는 교과서. 열역학적 기초부터 확산, 핵생성, 마르텐사이트 변태까지. 합금 설계 ML 연구에서 물리적 제약을 이해하는 데 핵심.

</div>

<div class="tab-content" id="tab-ch27-elec2">

**전기전자 심화 필독서:**

- **Razavi, "Design of Analog CMOS Integrated Circuits"**: 아날로그 회로 설계의 대표 교과서. 반도체 소자 모델링과 회로 설계의 기초. 회로 시뮬레이션 자동화 연구의 배경.
- **Proakis & Manolakis, "Digital Signal Processing"**: 디지털 신호 처리의 핵심 교과서. DFT, 필터 설계, 스펙트럼 분석. 센서 데이터 기반 ML 연구에서 신호 전처리의 이론적 기반.
- **Haykin, "Adaptive Filter Theory"**: 적응 필터의 교과서. LMS, RLS 알고리즘과 칼만 필터. 시계열 예측, 노이즈 제거 연구에서 전통적 방법과 ML을 비교할 때 필요한 기초.
- **Boyd & Vandenberghe, "Convex Optimization"**: 볼록 최적화의 표준 교과서. 선형/이차 계획법, 쌍대성, 내부점법. 최적화 기반 ML 연구의 수학적 토대. 무료 PDF가 공개되어 있다.

</div>
</div>

### 온라인 학습 플랫폼

교과서가 체계적 지식의 근간이라면, 온라인 학습 플랫폼은 빠르게 직관을 잡고 실습 경험을 쌓는 데 유용하다. 아래의 플랫폼들은 각각 다른 강점을 가지고 있으므로, 자기 목적에 맞게 선택해야 한다. AI 학습 로드맵 전반에 대해서는 ch20 'AI 학습 로드맵'에서 더 자세히 다룬다.

**fast.ai** — 코드부터 시작하고, 이론은 나중에 배우는 "Top-down" 접근법. 딥러닝을 실전에 빠르게 적용하고 싶은 사람에게 최적이다. fastai 라이브러리를 사용하여 몇 줄의 코드로 이미지 분류, 텍스트 분류, 추천 시스템을 구현할 수 있다. 무료이며, 실용적인 팁이 풍부하다. 단, 수학적 엄밀성보다 실전을 우선하므로, 이론적 깊이를 원한다면 교과서를 병행해야 한다.

**deeplearning.ai (Andrew Ng)** — ML/DL의 체계적 입문. "Machine Learning Specialization"은 ML의 전반을 다루고, "Deep Learning Specialization"은 DL의 핵심을 다룬다. Andrew Ng의 설명은 직관적이고 친절하다. Coursera에서 수강하며, 수료증이 필요 없다면 청강(audit)으로 무료 이용이 가능하다. 수학적 기초가 약한 상태에서 시작하기에 적합하다.

**Khan Academy** — 수학 기초를 다시 다져야 할 때. 선형대수, 미적분, 확률/통계를 고등학교 수준부터 대학 수준까지 무료로 학습할 수 있다. 대학원에 와서 Khan Academy를 보는 것이 부끄러울 수 있지만, 기초가 흔들리면 위에 아무것도 쌓을 수 없다. 부끄러움보다 정직함이 중요하다.

**MIT OpenCourseWare (OCW)** — 세계 최고 수준의 강의를 무료로. Gilbert Strang의 18.06 선형대수, Patrick Winston의 6.034 인공지능 등 전설적인 강의가 공개되어 있다. 강의 노트, 과제, 시험까지 모두 제공된다. 교과서를 읽다가 이해가 안 되는 부분이 있을 때, MIT OCW에서 해당 주제의 강의를 찾아보면 해결되는 경우가 많다.

**3Blue1Brown (YouTube)** — 수학적 직관을 시각적으로 설명하는 유튜브 채널. "Essence of Linear Algebra", "Essence of Calculus" 시리즈는 수학의 "왜"를 아름다운 애니메이션으로 보여준다. 교과서에서 공식만 외우고 넘어간 개념이 이 영상을 보면 "아, 이런 뜻이었구나"라고 이해되는 경험을 할 수 있다. 수학 기초를 리프레시할 때 첫 번째로 추천하는 자원이다.

### 수학 리프레셔

대학원에 와서 가장 당황하는 순간 중 하나는 "학부 때 배운 수학을 다 까먹었다"는 것을 깨닫는 순간이다. 논문을 읽는데 수식이 이해가 안 되고, 코드를 짜야 하는데 행렬 연산이 헷갈린다. 이것은 정상이다. 쓰지 않은 지식은 잊히게 되어 있다. 중요한 것은 필요할 때 빠르게 복습하는 것이다.

**선형대수 — 가장 급하다.** ML/AI 연구에서 데이터는 행렬이고, 모델은 행렬 연산이다. 최소한 다음을 할 수 있어야 한다. 행렬 곱셈과 전치, 역행렬과 의사 역행렬, 고유값 분해(eigendecomposition), 특이값 분해(SVD), 행렬식(determinant)의 기하학적 의미. 추천 자원: 3Blue1Brown의 "Essence of Linear Algebra"(직관 잡기, 약 3시간) → Gilbert Strang의 MIT 18.06(심화, 원하는 주제만 선택적으로) → Strang "Linear Algebra and Its Applications"(참고서).

**미적분 — 최적화의 기초.** 딥러닝의 학습은 곧 최적화이고, 최적화의 언어는 미적분이다. 최소한 다음을 할 수 있어야 한다. 편미분(partial derivative), 그래디언트(gradient)와 방향 미분, 체인 룰(chain rule) — 역전파의 기초, 테일러 급수 — 근사와 수렴의 이해. 추천 자원: 3Blue1Brown의 "Essence of Calculus"(직관 잡기) → Khan Academy의 Multivariable Calculus → Kreyszig 해당 장 참조.

**확률과 통계 — 불확실성의 언어.** 실험 결과에 유의성이 있는지, 모델의 예측에 얼마나 확신할 수 있는지, 데이터의 분포가 어떤지를 판단하려면 확률과 통계가 필요하다. 최소한 다음을 알아야 한다. 확률 분포(정규, 균등, 베르누이, 포아송), 베이즈 정리, 최대 우도 추정(MLE), 가설 검정과 p-value, 신뢰 구간. 추천 자원: Khan Academy의 Statistics and Probability → Walpole "Probability and Statistics for Engineers" → Montgomery "Design and Analysis of Experiments"(실험 설계 통계).

<div class="card-grid">
<div class="card">
<h4>선형대수 리프레셔</h4>
<p><strong>시간:</strong> 1-2주 (하루 1시간)<br><strong>경로:</strong> 3Blue1Brown 영상(3시간) → MIT 18.06 선택 강의 → 연습문제 풀기<br><strong>목표:</strong> 고유값 분해를 손으로 하고, SVD의 기하학적 의미를 설명할 수 있다.</p>
</div>
<div class="card">
<h4>미적분 리프레셔</h4>
<p><strong>시간:</strong> 1주 (하루 1시간)<br><strong>경로:</strong> 3Blue1Brown 영상(2시간) → Khan Academy 다변수 미적분 → 체인 룰 연습<br><strong>목표:</strong> 다변수 함수의 그래디언트를 구하고, 역전파의 원리를 설명할 수 있다.</p>
</div>
<div class="card">
<h4>확률/통계 리프레셔</h4>
<p><strong>시간:</strong> 2주 (하루 1시간)<br><strong>경로:</strong> Khan Academy 확률/통계 → Walpole 해당 장 → Python으로 실습<br><strong>목표:</strong> 베이즈 정리를 적용하고, t-test를 직접 수행하고, p-value를 정확히 해석할 수 있다.</p>
</div>
</div>

수학 리프레셔에서 가장 중요한 것은 "완벽히 다시 배우겠다"는 야심을 버리는 것이다. 목표는 연구에 필요한 수준까지 빠르게 복구하는 것이다. 교과서 1장부터 읽기 시작하면 진도가 안 나가고 포기하기 쉽다. 자기 연구에서 지금 당장 필요한 개념을 먼저 복습하고, 나머지는 필요할 때마다 찾아보는 것이 현실적이다.

---

## 배운 것을 오래 기억하는 과학 — 망각 곡선과 싸우는 법

박사 과정에서 본인이 가장 많이 하는 일 중 하나가 학습이다. 교과서 장들, 논문, 강의, 세미나, 코드 문서. 하지만 본인이 읽은 것의 얼마가 6개월 후에 남아 있는가? 대부분의 학생이 정직하게 답하면 "20-30%"다. 나머지 70-80%는 잊힌다. 이것은 본인의 잘못이 아니라 인간 두뇌의 정상 작동이다. 다만 몇 가지 과학적으로 검증된 학습 기법을 적용하면 이 기억 유지율을 70-80%로 올릴 수 있다. 같은 학습 시간으로 훨씬 더 많이 남는다.

<div class="highlight-box highlight-important">

**망각 곡선(Forgetting Curve).** 19세기 말 독일 심리학자 헤르만 에빙하우스가 발견한 현상. 새로 학습한 정보의 약 50%가 1시간 안에, 70%가 하루 안에, 90%가 한 달 안에 잊힌다. 학습 직후부터 기억은 기하급수적으로 감쇠한다. "많이 읽기"만 하는 학습은 망각 곡선과 싸우지 않는다. 망각과 싸우는 도구가 필요하다.

</div>

**기법 1: 간격 반복 (Spaced Repetition).**

망각 곡선에 대항하는 가장 강력한 기법이다. 핵심 아이디어는 "잊기 직전에 다시 본다"다. 한 번에 여러 번 반복하는 것(벼락치기)이 아니라, 간격을 두고 여러 번 보는 것이다. 간격은 점점 길어진다.

**최적 간격의 예시**:
- 1일: 첫 복습
- 3일: 두 번째 복습
- 7일: 세 번째 복습
- 14일: 네 번째 복습
- 30일: 다섯 번째 복습
- 90일: 여섯 번째 복습
- 6개월 이후: 거의 영구 기억

이 간격으로 6번 복습하면 같은 정보를 100번 벼락치기로 보는 것보다 훨씬 잘 기억된다. 총 학습 시간은 훨씬 적다.

**도구 1: Anki.** 간격 반복을 자동화하는 가장 유명한 오픈소스 도구. 본인이 질문-답변 형태의 카드(flashcard)를 만들면, Anki가 알고리즘(SuperMemo SM-2 기반)으로 다음 복습 날짜를 계산하여 보여준다. 매일 Anki를 열면 오늘 복습할 카드들이 나타난다.

**Anki 카드 예시 (좋은 카드)**:
```
Front: ReLU 활성화 함수의 그래디언트 소실 문제는 무엇이며, 어떻게 해결하는가?

Back: 입력이 음수인 경우 출력과 그래디언트가 모두 0이 되어
"dead neuron" 문제가 발생. 해결책:
- Leaky ReLU (음수 영역에 작은 기울기)
- ELU (지수적 감소)
- 적절한 가중치 초기화 (He initialization)
```

**Anki 카드 예시 (나쁜 카드)**:
```
Front: CNN에 대해 설명하라.

Back: CNN은 convolutional neural network의 약자로, 이미지
처리에 많이 쓰이며 ... [긴 문단]
```

나쁜 카드의 문제는 너무 광범위하고, 답이 너무 길다는 것이다. 좋은 카드는 **하나의 구체적 질문**에 대한 **짧은 답**을 가진다.

**카드 작성의 5원칙**:
1. 한 카드에 하나의 개념만
2. 질문이 명확하고 구체적
3. 답이 짧음 (1-3문장)
4. 본인의 언어로 작성 (복사 아님)
5. 맥락 포함 (왜 중요한지)

**도구 2: Quizlet, RemNote.** Anki보다 사용이 쉬운 대안. 웹 기반으로 사용 가능. 다만 고급 기능은 Anki가 가장 강력하다.

**기법 2: 능동적 회상 (Active Recall).**

수동적 재읽기(passive rereading)는 학습 효과가 낮다. 본인이 같은 텍스트를 다시 읽으면 "아는 것 같다"는 착각에 빠지지만, 실제로는 기억에 깊이 남지 않는다. 능동적 회상은 반대로, 텍스트를 덮고 본인이 기억을 끌어내는 방식이다.

**능동적 회상의 실전 방법**:

1. **덮고 쓰기**: 논문의 한 섹션을 읽고, 책을 덮고, 그 섹션의 핵심을 본인의 말로 종이에 쓴다. 다 쓴 후 원문과 비교.

2. **자기 테스트**: 학습한 내용에 대해 본인에게 질문을 던진다. "이 논문의 주요 기여는?" "왜 이 방법이 작동하는가?" 답을 한 후 원문 확인.

3. **설명하기**: 본인이 학습한 것을 다른 사람(또는 가상의 청중)에게 설명한다. 막히는 부분이 본인이 실제로 모르는 부분이다. ch05에서 다룬 "Rubber Duck Debugging"의 학습 버전.

4. **문제 풀기**: 교과서의 연습 문제를 직접 푼다. 답을 보는 것과 푸는 것은 완전히 다른 효과다.

능동적 회상은 수동적 재읽기보다 2-3배 더 효과적이라는 연구 결과가 많다. 같은 시간에 훨씬 많이 남는다.

**기법 3: 인터리빙 (Interleaving).**

한 주제만 길게 공부하는 것(blocking)보다, 여러 주제를 섞어서 공부하는 것(interleaving)이 효과가 높다. 예를 들어 "월요일: 선형대수만 3시간, 화요일: 확률만 3시간"보다 "매일 선형대수 1시간 + 확률 1시간 + 최적화 1시간"이 더 좋다.

**왜 효과가 있는가**: 인터리빙은 두뇌가 주제 간의 차이를 구분하도록 강제한다. 이 구분 과정이 기억을 더 깊게 만든다. 블로킹은 편안하지만 피상적 학습에 그친다.

**인터리빙의 실전 적용**:
- 여러 교과서를 번갈아 읽는다.
- 다양한 주제의 논문을 한 세션에 섞어서 읽는다.
- 문제를 풀 때 한 유형만 반복하지 말고 여러 유형을 섞는다.

주의: 본인의 학습 초반에는 블로킹이 더 편하게 느껴진다. 인터리빙은 처음에 "더 어렵고 느리게" 느껴지지만, 장기 기억에는 훨씬 좋다. 이 불편을 참는 것이 중요하다.

**기법 4: 정교화 (Elaboration).**

새로 배운 것을 기존 지식과 연결한다. 단순히 외우는 것보다 **"왜?"**와 **"어떻게?"**를 묻는 것이다.

**정교화 질문 예시**:
- "이 개념은 내가 이미 아는 X와 어떻게 다른가?"
- "이 방법이 왜 작동하는가? 만약 다른 가정을 사용하면?"
- "이것을 내 연구에 어떻게 적용할 수 있을까?"
- "이것과 반대되는 접근은 무엇이고, 언제 쓰는가?"

정교화를 거친 지식은 단순 암기보다 훨씬 오래 남는다. 특히 본인의 기존 지식과 연결될수록 강하게 남는다.

**기법 5: 시험 효과 (Testing Effect).**

학습 직후 시험을 치르는 것이 재학습보다 효과적이다. "시험=평가"라는 관념이 있지만, 시험은 **학습 도구**이기도 하다. 본인을 정기적으로 테스트하면 기억이 강화된다.

**셀프 시험의 방법**:
- Anki 카드를 매일 복습 (자동화된 시험)
- 주말마다 지난 주에 배운 것을 요약 (능동적 회상)
- 분기마다 큰 주제에 대한 에세이 작성 (심층 통합)
- 연구실 동료와 서로 질문 주고받기

**실전 학습 루틴의 예시.**

위의 기법들을 결합한 하루 학습 루틴 예시.

<div class="highlight-box highlight-info">

**공학 박사생의 하루 학습 루틴 (2시간)**

- **아침 20분**: Anki 복습 (지금까지 쌓인 카드).
- **오후 40분**: 새 논문 읽기 (능동적 회상 적용 — 섹션 읽고 덮고 요약).
- **오후 30분**: 수학 교과서 문제 풀기 (인터리빙 — 여러 장의 문제 섞어서).
- **저녁 20분**: 오늘 배운 것을 Anki 카드로 변환.
- **주말 10분**: 지난 주 전체 요약 (정교화).

</div>

이 루틴이 본인의 학습을 2-3배 효과적으로 만든다. 단, 시작할 때 몇 주의 적응 기간이 필요하다.

**박사 과정 기간 중의 학습 자산 쌓기.**

5-6년간 이 방식으로 학습하면 Anki 카드 데이터베이스가 수천 장으로 쌓인다. 이것은 본인의 지적 자산이 된다. 졸업 시점에 본인은 본인 분야의 핵심 개념 수천 개를 장기 기억에 가지고 있다. 이것이 후배에게 가르칠 때, 논문을 쓸 때, 면접을 볼 때 결정적이다.

**흔한 오해와 주의.**

**오해 1**: "이것은 의학이나 언어 학습에만 유용하다." 답: 공학에도 완벽히 적용된다. 수식, 정의, 개념, 알고리즘, 코드 패턴 모두 flashcard로 만들 수 있다.

**오해 2**: "나는 이해했으면 되는 것이지 외울 필요가 없다." 답: 이해와 기억은 다른 것이다. 이해했다고 해서 6개월 후에 기억난다는 보장이 없다. 그리고 다른 개념을 이해하려면 이미 이해한 것이 기억에 있어야 한다.

**오해 3**: "Anki는 너무 시간이 걸린다." 답: 카드 만들기는 처음에 시간이 걸리지만, 일단 만든 후 복습은 하루 10-20분이면 충분하다. 장기적으로 시간을 절약한다.

**오해 4**: "수동적 읽기가 편하니까 그게 더 좋겠지." 답: 편안함과 효과는 반대인 경우가 많다. 불편한 학습이 더 오래 남는다.

**과학 학습 기법의 참고 자료.**

- **Make It Stick** (Brown, Roediger, McDaniel): 학습 과학의 대표 저서. 능동적 회상, 간격 반복, 인터리빙의 증거.
- **A Mind for Numbers** (Barbara Oakley): 공학/수학 학습에 특화된 책. Coursera의 "Learning How to Learn" 강의도 추천.
- **Peak** (Anders Ericsson): 의도적 연습(deliberate practice)의 개념.

> 박사 과정의 5-6년은 인생에서 가장 집중적인 학습 시기다. 이 시간을 최대한 활용하려면 단순히 "많이 읽기"가 아니라 "잘 기억하기"가 필요하다. 위의 기법들을 적용하면 본인이 공부한 것의 상당 부분이 장기 기억으로 남는다. 이것이 졸업 후에도 평생의 자산이 된다. 학습 기법은 가르치는 사람이 거의 없지만, 배우면 가장 큰 투자 대비 수익을 준다.
