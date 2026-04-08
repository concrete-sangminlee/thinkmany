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
