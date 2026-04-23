# 딥러닝 핵심 아키텍처

머신러닝을 어느 정도 이해했다면, 자연스럽게 딥러닝이 궁금해진다. 학회에서, 논문에서, 뉴스에서 "딥러닝"이라는 단어가 쉴 새 없이 등장한다. CNN으로 균열을 탐지했다, Transformer로 시계열을 예측했다, GAN으로 데이터를 생성했다. 도대체 이것들이 무엇이고, 내 연구에 쓸 수 있는 건지, 써야 하는 건지 혼란스러울 수 있다.

이 장에서는 딥러닝의 핵심 아키텍처 네 가지, MLP, CNN, RNN/LSTM, Transformer를 공학 연구자의 관점에서 설명한다. 각 아키텍처가 어떤 원리로 작동하고, 어떤 데이터에 적합하며, 공학에서 어떻게 활용되는지를 구체적으로 다룬다. 그리고 학습이 안 될 때 어떻게 디버깅하는지, 좋은 학습과 나쁜 학습을 어떻게 구분하는지도 함께 설명한다.

---

## 딥러닝 vs 머신러닝

먼저 혼란을 정리하자. 딥러닝은 머신러닝의 부분집합이다. 머신러닝이 "데이터에서 패턴을 학습하는 모든 방법"이라면, 딥러닝은 "그 중에서 깊은(deep) 신경망을 사용하는 방법"이다. Random Forest도 머신러닝이고, 신경망도 머신러닝이다. 다만 신경망 중에서 층(layer)이 여러 개인 것을 "딥(deep)"러닝이라고 부르는 것이다.

그러면 딥러닝이 전통적 ML(Random Forest, SVM 등)과 무엇이 다른가? 가장 큰 차이는 **특성 엔지니어링(feature engineering)의 자동화**다.

전통적 ML에서는 사람이 입력 변수를 설계해야 한다. 이미지에서 균열을 탐지하고 싶다면, 먼저 사람이 "균열의 특징"을 정의해야 한다. 에지(edge)의 길이, 방향, 밀도, 텍스처의 거칠기 등을 수치로 계산하고, 이 수치들을 입력 변수로 넣는다. 이 과정이 특성 엔지니어링이다. 좋은 특성을 설계하면 간단한 모델로도 높은 성능이 나오고, 나쁜 특성을 설계하면 아무리 복잡한 모델을 써도 성능이 안 나온다.

딥러닝은 이 과정을 자동화한다. 이미지를 그대로(원시 픽셀) 넣으면, 신경망이 스스로 "어떤 특성이 중요한가"를 학습한다. 첫 번째 층에서 에지를 인식하고, 다음 층에서 에지의 조합(패턴)을 인식하고, 더 깊은 층에서 패턴의 조합(객체)을 인식한다. 사람이 특성을 설계할 필요가 없다.

### 언제 딥러닝이 ML보다 나은가

딥러닝이 항상 더 좋은 것은 아니다. 딥러닝이 유리한 조건과 불리한 조건이 명확하다.

**딥러닝이 유리한 경우:**
- 데이터가 대량일 때 (수만~수백만 개)
- 입력이 비정형일 때 (이미지, 시계열, 텍스트)
- 특성 엔지니어링이 어렵거나 불가능할 때
- 입력과 출력의 관계가 매우 복잡한 비선형일 때

**전통 ML이 유리한 경우:**
- 데이터가 소규모일 때 (수십~수백 개)
- 입력이 정형 데이터(숫자 표)일 때
- 해석 가능성이 중요할 때
- 계산 자원이 제한적일 때
- 물리적 의미를 유지해야 할 때

공학 연구에서는 데이터가 수백 개 수준인 경우가 매우 흔하다. 실험 시편 100개, 시뮬레이션 300개. 이 정도 규모에서는 XGBoost나 Random Forest가 딥러닝보다 나은 경우가 많다. 딥러닝은 데이터가 충분할 때 빛을 발한다. 데이터가 부족한데 딥러닝을 쓰면 과적합이 거의 확실하게 발생한다.

<div class="highlight-box info">
<span class="highlight-box-icon">ℹ️</span>
<div class="highlight-box-content">
<p><strong>"딥"이라는 단어의 의미</strong></p>
<p>"딥"은 신경망의 층(layer)이 많다는 뜻이다. 1-2개의 층을 가진 신경망은 "얕은(shallow)" 신경망이고, 수십~수백 개의 층을 가진 것이 딥러닝이다. 층이 깊어질수록 더 복잡한 패턴을 학습할 수 있지만, 그만큼 데이터와 계산 자원이 더 필요하다. 단순히 "깊으면 좋다"가 아니라 "문제의 복잡도에 맞는 깊이"를 선택하는 것이 중요하다.</p>
</div>
</div>

---

## 핵심 아키텍처

딥러닝 아키텍처는 수십 가지가 있지만, 공학 연구에서 실제로 쓰이는 핵심은 네 가지다. MLP, CNN, RNN/LSTM, Transformer. 이 네 가지를 이해하면 대부분의 공학 딥러닝 논문을 읽고 이해할 수 있고, 자기 연구에 적용할 수 있다.

### MLP (Multi-Layer Perceptron): 가장 기본적인 신경망

MLP는 신경망의 가장 기본적인 형태다. 입력층(input layer), 은닉층(hidden layer), 출력층(output layer)으로 구성되고, 각 층의 모든 노드가 다음 층의 모든 노드와 연결되어 있다(완전 연결, fully connected). 데이터가 입력층에서 은닉층을 거쳐 출력층으로 한 방향으로 흐른다.

MLP의 핵심 원리는 이렇다. 각 연결에는 가중치(weight)가 있고, 각 노드에는 편향(bias)이 있다. 입력에 가중치를 곱하고 편향을 더한 후, 비선형 활성화 함수(activation function)를 통과시킨다. 이 과정을 여러 층에 걸쳐 반복한다. 비선형 활성화 함수가 없다면 MLP는 결국 선형 모델과 같아진다. ReLU(`max(0, x)`), sigmoid, tanh 등의 활성화 함수가 비선형성을 부여하여 복잡한 패턴을 학습할 수 있게 한다.

**공학 응용 예시:**
- 물성 예측: 재료 조성 → 기계적 물성(강도, 경도, 탄성계수)
- 공정 최적화: 공정 변수(온도, 압력, 시간) → 제품 품질
- 대리 모델: 유한요소 해석의 입력 → 출력 관계 근사

MLP는 정형 데이터(숫자로 된 표)에 적합하다. 하지만 정형 데이터에서는 XGBoost나 LightGBM이 MLP보다 나은 경우가 많다는 연구 결과도 있다. MLP를 쓸 때는 반드시 트리 기반 모델과 비교해야 한다.

### CNN (Convolutional Neural Network): 이미지와 공간 데이터

CNN은 이미지 처리를 위해 설계된 아키텍처다. 핵심 아이디어는 **합성곱(convolution)**이다. 작은 필터(커널)가 이미지 위를 슬라이딩하면서 지역적 패턴(에지, 텍스처 등)을 감지한다. 이 필터의 가중치가 학습을 통해 자동으로 결정된다.

CNN의 구조를 직관적으로 이해하면 이렇다. 첫 번째 합성곱 층은 저수준 특성(에지, 색상 변화)을 감지한다. 두 번째 층은 저수준 특성의 조합(코너, 단순한 패턴)을 감지한다. 세 번째 층은 더 복잡한 패턴(객체의 부분)을 감지한다. 층이 깊어질수록 더 추상적이고 복잡한 특성을 학습한다. 각 합성곱 층 뒤에는 보통 풀링(pooling) 층이 있다. 풀링이란 이미지를 일정 영역씩 묶어서 대표값(예: 최대값 또는 평균값)만 남기는 연산으로, 이미지의 공간 크기를 줄여 계산량을 줄이고 중요한 특성만 남기는 역할을 한다. 이렇게 합성곱과 풀링을 여러 차례 반복한 뒤, 마지막에 완전 연결 층으로 최종 예측을 한다.

CNN이 MLP보다 이미지에 적합한 이유는 두 가지다. 첫째, **파라미터 공유(parameter sharing)**. 같은 필터를 이미지 전체에 적용하므로, MLP보다 훨씬 적은 파라미터로 이미지를 처리할 수 있다. 256x256 이미지를 MLP에 넣으면 입력이 65,536개이고 첫 번째 은닉층이 1,000개만 되어도 6,500만 개의 가중치가 필요하다. CNN은 같은 작업을 수천 개의 가중치로 수행한다. 둘째, **지역적 연결(local connectivity)**. 이미지에서 중요한 패턴(균열, 결함)은 지역적이다. 한 픽셀이 수천 픽셀 떨어진 곳과 관계가 있을 가능성은 낮다. CNN의 필터는 지역적 패턴만 감지하므로, 이미지의 구조적 특성에 맞다.

**공학 응용 예시:**
- 균열 탐지: 콘크리트/도로/교량 표면 이미지에서 균열 위치와 크기 자동 검출
- 미세 구조 분석: 금속/세라믹의 SEM/TEM 이미지에서 결정립 크기, 상(phase) 분포 분석
- 결함 검출: X-ray/초음파 이미지에서 내부 결함(공극, 개재물) 탐지
- 구조물 손상 분류: 지진 후 건물 외관 이미지로 손상 등급 자동 분류

CNN은 2D 이미지뿐 아니라 1D 시계열(1D CNN)이나 3D 볼륨 데이터(3D CNN)에도 적용할 수 있다. 1D CNN은 진동 데이터, 하중 이력 같은 1차원 신호 처리에 쓰이고, 3D CNN은 CT 스캔, 3D 시뮬레이션 결과 분석에 쓰인다.

### RNN/LSTM: 시계열과 순차 데이터

RNN(Recurrent Neural Network)은 순차적(sequential) 데이터를 처리하기 위한 아키텍처다. "순차적"이라는 것은 데이터의 순서가 중요하다는 뜻이다. 시계열 데이터(센서 측정값, 지진파, 하중 이력)가 대표적인 예다.

RNN의 핵심 아이디어는 **숨겨진 상태(hidden state)**다. RNN은 시퀀스의 각 시점을 순서대로 처리하면서, 이전 시점의 정보를 hidden state에 저장한다. 현재 시점의 입력과 이전 시점의 hidden state를 결합하여 현재 시점의 출력과 새로운 hidden state를 생성한다. 이것이 "메모리"의 역할을 한다.

하지만 기본 RNN에는 심각한 문제가 있다. **장기 의존성(long-term dependency)** 문제다. 시퀀스가 길어지면(수백~수천 시점) 과거의 정보가 점차 사라진다. 100번째 시점의 정보가 500번째 시점에서 필요할 때, 기본 RNN은 그 정보를 유지하지 못한다. 이것은 기울기 소실(vanishing gradient) 문제 때문이다. 기울기 소실이란, 신경망이 학습할 때 역전파(backpropagation)를 통해 각 층의 가중치를 조절하는데, 층을 거슬러 올라갈수록 이 조절 신호(기울기)가 점점 작아져서 거의 0에 가까워지는 현상이다. 기울기가 0에 가까우면 가중치가 거의 업데이트되지 않으므로, 먼 과거의 정보를 학습에 반영하지 못하게 된다.

**LSTM(Long Short-Term Memory)**이 이 문제를 해결한다. LSTM은 셀 상태(cell state)라는 별도의 정보 흐름 경로를 추가하고, 세 개의 게이트(gate), 즉 입력 게이트, 망각 게이트, 출력 게이트로 정보의 흐름을 제어한다. 어떤 정보를 기억할지, 어떤 정보를 잊을지, 어떤 정보를 출력할지를 학습으로 결정한다. 이 메커니즘 덕분에 LSTM은 수백~수천 시점의 장기 의존성을 포착할 수 있다.

**공학 응용 예시:**
- 구조물 건전성 모니터링: 가속도계/변위계 시계열 데이터로 손상 탐지
- 설비 예지 보전: 센서 데이터의 시간적 패턴으로 고장 사전 예측
- 하중 이력 기반 피로 수명 예측: 반복 하중 패턴에서 잔존 수명 추정
- 공정 모니터링: 시간에 따른 공정 변수 변화 패턴에서 이상 감지

참고로, GRU(Gated Recurrent Unit)는 LSTM의 간소화 버전이다. LSTM의 세 개 게이트를 두 개로 줄여 파라미터가 적고 학습이 빠르다. 성능은 LSTM과 비슷한 경우가 많으므로, 계산 자원이 제한적이면 GRU를 먼저 시도해 볼 만하다.

### Transformer: 최근 가장 주목받는 아키텍처

Transformer는 2017년 "Attention Is All You Need" 논문에서 처음 제안되었다. 원래 자연어 처리(NLP)를 위해 만들어졌지만, 이후 이미지(Vision Transformer), 시계열, 단백질 구조 예측 등 거의 모든 분야로 확산되었다. GPT, BERT, ChatGPT 등이 모두 Transformer 기반이다.

Transformer의 핵심은 **셀프 어텐션(Self-Attention)** 메커니즘이다. RNN이 시퀀스를 순서대로 하나씩 처리하는 반면, Transformer는 시퀀스의 모든 위치를 동시에 보고, 각 위치가 다른 모든 위치와 얼마나 관련 있는지를 계산한다. 이것이 "어텐션"이다.

예를 들어, 센서 시계열 데이터에서 100번째 시점의 값을 해석할 때, Transformer는 1번째, 50번째, 99번째 등 모든 시점과의 관련성을 동시에 계산한다. "100번째 시점에서 이상 징후가 나타났는데, 이것이 50번째 시점의 특정 패턴과 관련이 있다"는 식의 장거리 의존성을 효과적으로 포착한다.

RNN 대비 Transformer의 장점은 두 가지다. 첫째, 병렬 처리가 가능하다. RNN은 순서대로 처리해야 하므로 시퀀스 길이에 비례하여 시간이 걸리지만, Transformer는 모든 시점을 동시에 처리하므로 GPU를 효과적으로 활용할 수 있다. 둘째, 장거리 의존성을 더 잘 포착한다. RNN/LSTM은 거리가 먼 시점 간의 관계를 포착하기 어렵지만, Transformer의 어텐션은 거리에 관계없이 직접 연결한다.

**공학 응용 예시:**
- 시계열 예측: 센서 데이터, 에너지 소비 패턴, 기상 데이터 기반 예측
- 멀티모달 학습: 이미지 + 수치 데이터를 동시에 처리
- 시퀀스-투-시퀀스 문제: 입력 시퀀스에서 출력 시퀀스를 생성(예: 하중 이력 → 응답 이력)

다만 Transformer는 데이터가 많이 필요하고, 계산 비용이 높다. 공학 연구에서 데이터가 수백 개 수준이라면, Transformer보다 LSTM이나 1D CNN이 더 실용적일 수 있다.

---

## 아키텍처 선택 가이드

어떤 아키텍처를 선택해야 할지 모르겠다면, 입력 데이터의 유형에서 출발하면 된다.

<div class="card-grid">
<div class="card">
<span class="card-icon">📊</span>
<div class="card-title">정형 데이터 (표)</div>
<div class="card-desc">MLP 또는 XGBoost. 데이터가 수백 개 수준이면 XGBoost가 더 나을 가능성이 높다. MLP를 쓴다면 반드시 XGBoost와 비교한다.</div>
</div>
<div class="card">
<span class="card-icon">🖼️</span>
<div class="card-title">이미지 데이터</div>
<div class="card-desc">CNN. 데이터가 충분하면 ResNet, EfficientNet 등 사전 학습 모델을 전이 학습(Transfer Learning)으로 사용한다.</div>
</div>
<div class="card">
<span class="card-icon">📈</span>
<div class="card-title">시계열 데이터</div>
<div class="card-desc">LSTM 또는 1D CNN. 데이터가 충분하고 장거리 의존성이 중요하면 Transformer를 고려한다.</div>
</div>
<div class="card">
<span class="card-icon">❓</span>
<div class="card-title">확신이 없을 때</div>
<div class="card-desc">MLP부터 시작한다. 가장 단순한 딥러닝 모델로 베이스라인을 잡고, 필요하면 복잡한 아키텍처로 전환한다.</div>
</div>
</div>

하나 더 강조할 것이 있다. **전이 학습(Transfer Learning)**은 공학 연구에서 매우 유용한 전략이다. 대규모 데이터(ImageNet 등)에서 미리 학습된 CNN을 가져와서, 자기 데이터에 미세 조정(fine-tuning)하는 것이다. 균열 이미지가 수백 장밖에 없더라도, ImageNet에서 학습된 모델은 이미 에지, 텍스처, 패턴을 인식하는 능력을 갖추고 있으므로, 적은 데이터로도 높은 성능을 달성할 수 있다.

---

## 학습의 핵심 개념

딥러닝 모델을 만드는 것과 잘 학습시키는 것은 별개의 문제다. 아키텍처를 정했으면, 이제 "어떻게 학습시킬 것인가"를 결정해야 한다. 여기에 세 가지 핵심 요소가 있다. 손실 함수, 옵티마이저, 정규화다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch22-loss">손실 함수</button>
<button class="tab-btn" data-tab="tab-ch22-optimizer">옵티마이저</button>
<button class="tab-btn" data-tab="tab-ch22-regularization">정규화</button>
</div>
<div class="tab-content active" id="tab-ch22-loss">

### 손실 함수 (Loss Function)

손실 함수는 "모델의 예측이 정답과 얼마나 다른가"를 측정하는 함수다. 학습은 이 손실을 최소화하는 방향으로 진행된다. 어떤 손실 함수를 선택하느냐에 따라 모델이 학습하는 방식이 달라진다.

**MSE (Mean Squared Error)**: 회귀 문제의 기본 손실 함수. 예측과 실제의 차이를 제곱하여 평균한다. 큰 오차에 큰 페널티를 부여하므로, 이상치에 민감하다. 대부분의 공학 회귀 문제에서 기본 선택이다.

**MAE (Mean Absolute Error)**: 예측과 실제의 차이의 절대값을 평균한다. MSE보다 이상치에 덜 민감하다. 데이터에 이상치가 있을 수 있다면 MAE를 고려한다.

**Cross-Entropy**: 분류 문제의 기본 손실 함수. 이진 분류(손상/정상)에는 Binary Cross-Entropy, 다중 분류(손상 유형 A/B/C)에는 Categorical Cross-Entropy를 사용한다.

**물리 기반 손실 함수**: 공학 연구의 특별한 장점은 물리 법칙을 손실 함수에 포함시킬 수 있다는 것이다. 예를 들어, 변위를 예측하는 모델에 평형 방정식을 만족하도록 하는 추가 항을 손실에 넣으면, 물리적으로 타당한 예측을 유도할 수 있다. 이것이 Physics-Informed Neural Network(PINN)의 핵심 아이디어다.

</div>
<div class="tab-content" id="tab-ch22-optimizer">

### 옵티마이저 (Optimizer)

옵티마이저는 손실 함수를 최소화하기 위해 가중치를 어떻게 업데이트할지를 결정하는 알고리즘이다. 경사하강법(Gradient Descent)이 기본이고, 이를 개선한 다양한 변종이 있다.

**SGD (Stochastic Gradient Descent)**: 가장 기본적인 옵티마이저. 각 미니배치(mini-batch, 전체 학습 데이터를 작은 묶음으로 나눈 것. 예를 들어 데이터 1,000개를 32개씩 나누면 하나의 미니배치가 32개)에서 기울기를 계산하고, 학습률(learning rate)만큼 가중치를 업데이트한다. 단순하지만, 학습률 설정이 까다롭고 수렴이 느릴 수 있다. Momentum을 추가하면 수렴 속도가 개선된다.

**Adam (Adaptive Moment Estimation)**: 현재 가장 널리 쓰이는 옵티마이저. 각 파라미터마다 학습률을 자동으로 조절한다. SGD보다 하이퍼파라미터에 덜 민감하고, 대부분의 경우 잘 작동한다. 딥러닝을 처음 할 때는 Adam을 기본으로 쓰면 된다.

**학습률 스케줄링**: 학습률을 고정하지 않고, 학습이 진행됨에 따라 줄여나가는 전략이다. 여기서 에폭(epoch)이란 전체 학습 데이터를 한 번 전부 순회하는 것을 말한다. 예를 들어 데이터 1,000개를 배치 크기 32로 학습하면, 약 31번의 미니배치 업데이트가 1에폭이 된다. 초반에는 큰 학습률로 빠르게 탐색하고, 후반에는 작은 학습률로 세밀하게 수렴한다. StepLR(일정 에폭마다 감소), CosineAnnealing(코사인 함수 형태로 감소), ReduceLROnPlateau(성능 정체 시 감소) 등이 있다.

**실전 팁**: 학습률은 딥러닝에서 가장 중요한 하이퍼파라미터(hyperparameter)다. 하이퍼파라미터란, 모델이 스스로 학습하는 값(가중치)이 아니라 사람이 학습 전에 미리 정해줘야 하는 설정값을 말한다. 학습률, 배치 크기, 층의 수, 뉴런의 수 등이 대표적인 하이퍼파라미터다. 너무 크면 발산하고(loss가 NaN이 되거나 급격히 증가), 너무 작으면 수렴이 느리다. Adam의 기본 학습률 0.001에서 시작하되, 학습이 잘 안 되면 0.0001이나 0.01로 조절해 본다.

</div>
<div class="tab-content" id="tab-ch22-regularization">

### 정규화 (Regularization)

정규화는 과적합을 방지하기 위한 기법들의 총칭이다. 모델이 학습 데이터에 너무 맞춰지는 것을 억제한다.

**Dropout**: 학습 시 랜덤하게 일부 뉴런을 비활성화(출력을 0으로 만듦)한다. 보통 20-50%의 뉴런을 끈다. 이렇게 하면 모델이 특정 뉴런에 의존하지 않고, 더 강건한 특성을 학습한다. 추론(예측) 시에는 모든 뉴런을 사용한다.

**Batch Normalization (BatchNorm)**: 각 미니배치에서 활성화 값을 정규화(평균 0, 분산 1)한다. 학습을 안정화시키고, 더 높은 학습률을 사용할 수 있게 한다. 거의 모든 현대 딥러닝 모델에 기본적으로 포함된다.

**Early Stopping**: 검증 손실(validation loss)이 더 이상 감소하지 않으면 학습을 중단한다. 과적합이 시작되기 전에 멈추는 가장 간단하고 효과적인 방법이다. patience 파라미터(몇 에폭 동안 개선이 없으면 멈출지)를 설정해야 한다. 보통 10-20으로 설정한다.

**Weight Decay (L2 정규화)**: 가중치가 너무 커지는 것을 방지한다. Adam 옵티마이저에서 `weight_decay` 파라미터로 간단히 설정할 수 있다.

**실전 팁**: 정규화를 적용할 때는 하나씩 추가하면서 효과를 확인한다. Dropout 0.2와 BatchNorm을 기본으로 적용하고, 필요에 따라 조절한다. 정규화를 너무 강하게 걸면 오히려 과소적합(underfitting)이 발생한다.

</div>
</div>

---

## 학습이 안 될 때

딥러닝에서 "코드는 에러 없이 돌아가는데, 모델이 학습되지 않는" 상황이 빈번하다. 에러가 나면 적어도 어디가 문제인지 힌트를 주지만, 학습이 안 되는 것은 원인을 찾기가 어렵다. 다음은 체계적인 디버깅 체크리스트다.

<div class="check-list">
<label><input type="checkbox"> <strong>학습률 확인:</strong> Adam 기준 0.001이 기본. Loss가 전혀 줄지 않으면 학습률을 10배 높여보고, Loss가 발산하면 10배 낮춰본다.</label>
<label><input type="checkbox"> <strong>데이터 정규화 확인:</strong> 입력 데이터의 스케일이 너무 크거나 작으면(10^6 이상, 10^-6 이하) 학습이 불안정해진다. StandardScaler 또는 MinMaxScaler를 적용한다.</label>
<label><input type="checkbox"> <strong>배치 사이즈 확인:</strong> 너무 작으면(1-4) 학습이 불안정하고, 너무 크면(전체 데이터) 일반화가 안 된다. 16, 32, 64가 일반적인 선택이다.</label>
<label><input type="checkbox"> <strong>Gradient 확인:</strong> 기울기가 0에 가까우면(vanishing) 학습이 진행되지 않는다. 기울기가 매우 크면(exploding) 발산한다. gradient clipping으로 대처한다.</label>
<label><input type="checkbox"> <strong>Loss가 NaN인가:</strong> 학습률이 너무 크거나, 데이터에 NaN/Inf가 있거나, 로그 함수에 0이 들어갔을 때 발생한다. 데이터 점검 후 학습률을 줄인다.</label>
<label><input type="checkbox"> <strong>모델 크기 확인:</strong> 데이터에 비해 모델이 너무 크면 과적합, 너무 작으면 과소적합. 파라미터 수가 데이터 수보다 크지 않은지 확인한다.</label>
<label><input type="checkbox"> <strong>작은 데이터로 과적합 테스트:</strong> 학습 데이터 10-20개로 학습시켜서 loss가 0에 수렴하는지 확인한다. 이것조차 안 되면 모델 구조나 코드에 버그가 있다.</label>
<label><input type="checkbox"> <strong>출력층 활성화 함수 확인:</strong> 회귀 문제에 sigmoid를 쓰거나, 분류 문제에 활성화 함수를 빼먹는 실수가 흔하다.</label>
</div>

이 체크리스트에서 가장 중요한 것은 **"작은 데이터로 과적합 테스트"**다. 모든 딥러닝 프로젝트에서 가장 먼저 해야 할 일이다. 학습 데이터 10개를 뽑아서 모델을 학습시키고, 이 10개에 대한 loss가 거의 0으로 수렴하는지 확인한다. 이것이 되면 모델의 용량(capacity)은 충분하다는 뜻이다. 이것이 안 되면 모델 구조, 학습률, 코드 로직에 문제가 있다. 전체 데이터에서 학습하기 전에 이 테스트를 반드시 수행하라.

---

## 좋은 학습 곡선 vs 나쁜 학습 곡선

학습 곡선(training curve)은 에폭(epoch)에 따른 loss의 변화를 그래프로 나타낸 것이다. 학습 곡선을 읽을 줄 아는 것은 딥러닝 실전에서 가장 중요한 기술 중 하나다.

### 정상적인 학습 곡선

학습 loss(train loss)와 검증 loss(validation loss)가 모두 감소하고, 일정 에폭 이후에 수렴한다. 두 곡선 사이의 간격이 크지 않다. 이것이 이상적인 상태다. 모델이 학습 데이터에서 패턴을 배우면서, 동시에 새로운 데이터에도 적용 가능한 일반적인 패턴을 학습하고 있다는 뜻이다.

### 과적합 학습 곡선

학습 loss는 계속 감소하는데, 검증 loss가 어느 시점부터 증가하기 시작한다. 두 곡선 사이의 간격이 벌어진다. 이것은 모델이 학습 데이터를 "외우기" 시작했다는 신호다.

**대처법**: Early Stopping을 적용하여 검증 loss가 최소인 시점에서 멈춘다. Dropout을 추가하거나 강도를 높인다. 데이터를 더 모은다. 모델 크기를 줄인다. Data Augmentation(데이터 증강)을 적용한다. 데이터 증강이란, 기존 데이터를 회전, 반전, 크기 조절, 밝기 변화 등으로 변형하여 학습 데이터의 양을 인위적으로 늘리는 기법이다. 원본 이미지 1장에서 회전, 반전 등을 적용하면 여러 장의 학습 데이터를 만들어낼 수 있어, 데이터가 부족한 공학 연구에서 특히 유용하다.

### 과소적합 학습 곡선

학습 loss와 검증 loss 모두 높은 상태에서 거의 움직이지 않는다. 또는 매우 느리게 감소한다. 모델이 데이터의 패턴을 학습하지 못하고 있다는 뜻이다.

**대처법**: 모델 크기를 키운다(층을 더 추가하거나 뉴런 수를 늘린다). 학습률을 높인다. 정규화가 너무 강한지 확인한다(Dropout이 너무 높으면 과소적합). 입력 특성이 충분한지 확인한다. 그리고 전처리가 올바른지 다시 점검한다.

### 불안정한 학습 곡선

Loss가 심하게 흔들리면서(진동) 수렴하지 않는다. 이것은 보통 학습률이 너무 크거나, 배치 사이즈가 너무 작을 때 발생한다.

**대처법**: 학습률을 줄인다. 배치 사이즈를 늘린다. Gradient Clipping을 적용한다. 학습률 스케줄러를 추가한다.

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>학습 곡선은 반드시 그려라</strong></p>
<p>학습 곡선을 그리지 않고 최종 성능만 보는 것은 위험하다. 최종 정확도가 높아도, 학습 곡선이 과적합 패턴을 보이면 그 모델은 신뢰할 수 없다. 매 에폭의 train loss와 validation loss를 기록하고, 그래프로 그리는 것을 습관화하라. TensorBoard나 Weights & Biases(wandb)를 사용하면 편리하다.</p>
</div>
</div>

---

## 실전 팁

딥러닝 연구를 시작하는 공학 대학원생들이 가장 많이 저지르는 실수와 그에 대한 조언을 정리한다.

### 간단한 모델부터 시작하라

"최신 아키텍처"에 대한 유혹을 억눌러라. 연구 문제를 풀 때, 가장 먼저 해야 할 것은 가장 단순한 모델로 베이스라인을 잡는 것이다. 선형 회귀 → 기본 MLP → CNN/LSTM → Transformer 순으로 복잡도를 높여간다. 간단한 모델로 R² = 0.85가 나왔다면(R²는 결정계수로, 모델이 데이터의 변동을 얼마나 잘 설명하는지를 0-1 사이의 수치로 나타낸 것이다. 1에 가까울수록 좋다), Transformer로 0.90을 달성하기 위해 며칠을 쏟을 가치가 있는지 생각해 봐야 한다.

논문에서도 "Linear Regression → Random Forest → 제안 모델"의 순서로 비교하는 것이 좋은 관행이다. 리뷰어는 "제안 모델이 간단한 모델 대비 얼마나 나은가?"를 반드시 물을 것이다. 간단한 모델과의 비교 없이 복잡한 모델의 성능만 보고하면, 그 성능이 모델의 복잡성 덕분인지, 아니면 간단한 모델로도 달성 가능한 것인지 알 수 없다.

### 물리적 의미를 확인하라

이것은 아무리 강조해도 부족하다. 딥러닝 모델이 예측한 결과가 물리적으로 말이 되는가? 모델이 "온도를 높이면 콘크리트 강도가 무한히 증가한다"고 예측한다면, 그 모델은 학습 데이터 범위 안에서는 정확할지 몰라도 물리적으로는 틀렸다.

Partial Dependence Plot(부분 의존성 그래프, 특정 입력 변수 하나를 변화시켰을 때 모델 예측이 어떻게 바뀌는지를 시각화한 그래프), SHAP 등의 해석 도구를 사용하여 각 입력 변수가 출력에 미치는 영향을 시각화하고, 이것이 도메인 지식과 부합하는지 확인해야 한다. 부합하지 않으면 모델이나 데이터에 문제가 있을 가능성이 높다.

### 데이터 품질을 점검하라

"Garbage In, Garbage Out"은 ML의 제1원칙이다. 아무리 좋은 모델을 써도 데이터가 나쁘면 좋은 결과가 나올 수 없다. 학습을 시작하기 전에 데이터를 꼼꼼히 살펴봐야 한다.

각 변수의 분포를 히스토그램으로 그려본다. 물리적으로 불가능한 값이 있는지 확인한다. 변수 간 상관관계를 살펴본다. 중복된 데이터가 있는지 확인한다. 이 과정이 모델 성능에 미치는 영향은 모델 아키텍처 선택보다 훨씬 크다.

### 블랙박스를 방치하지 말라

딥러닝 모델은 기본적으로 블랙박스다. 입력을 넣으면 출력이 나오지만, 왜 그 출력이 나왔는지 알기 어렵다. 공학 연구에서 이것은 심각한 문제가 될 수 있다. 논문에서 "모델이 35 MPa를 예측했다"라고만 쓰면, 리뷰어는 반드시 "왜 35 MPa인가?"를 물을 것이다.

이 문제를 완전히 해결할 수는 없지만, 완화할 수는 있다. Feature Importance로 어떤 입력이 중요한지 파악한다. SHAP(SHapley Additive exPlanations)으로 개별 예측에 대한 해석을 제공한다. Attention 가중치를 시각화한다(Transformer의 경우). Grad-CAM(Gradient-weighted Class Activation Mapping, CNN이 이미지의 어느 영역을 근거로 판단했는지를 히트맵으로 시각화하는 기법)으로 CNN이 이미지의 어느 부분에 주목했는지 확인한다. 이런 해석 도구를 활용하여 모델의 결정 과정을 최대한 투명하게 만들어야 한다.

<div class="do-dont">
<div class="do-box">
<h4>✅ 딥러닝 연구 좋은 관행</h4>
<ul>
<li>베이스라인(간단한 모델) 대비 성능 비교 제시</li>
<li>학습 곡선(train/val loss) 첨부</li>
<li>하이퍼파라미터 선택 근거 설명</li>
<li>모델 해석 결과(SHAP 등) 포함</li>
<li>재현 가능한 코드와 환경 정보 제공</li>
</ul>
</div>
<div class="dont-box">
<h4>❌ 딥러닝 연구 나쁜 관행</h4>
<ul>
<li>최신 모델만 사용하고 간단한 모델과 비교 안 함</li>
<li>학습 곡선 없이 최종 성능만 보고</li>
<li>하이퍼파라미터를 왜 그렇게 설정했는지 설명 없음</li>
<li>모델이 "블랙박스"인 채로 방치</li>
<li>코드와 데이터를 공유하지 않음</li>
</ul>
</div>
</div>

---

## 정리

딥러닝은 강력한 도구이지만, 모든 문제의 해답은 아니다. MLP, CNN, RNN/LSTM, Transformer 각각은 특정 유형의 데이터와 문제에 적합하다. 아키텍처 선택은 데이터 유형과 문제의 특성에서 출발해야 하며, 항상 간단한 모델에서 시작해서 필요한 만큼만 복잡도를 높여야 한다.

학습이 잘 되는지 확인하려면 학습 곡선을 반드시 그려야 하고, 학습이 안 될 때는 체계적인 디버깅 체크리스트를 따라야 한다. 그리고 무엇보다, 딥러닝 모델의 예측이 물리적으로 타당한지를 반드시 검증해야 한다. 공학자가 딥러닝을 쓰는 이유는 문제를 더 잘 풀기 위해서이지, 딥러닝을 쓰기 위해서가 아니다.

다음 장에서는 ML 프로젝트의 전체 파이프라인을 구체적으로 다룬다. 데이터 수집부터 결과 해석, 재현성 확보까지, 실제로 프로젝트를 수행할 때 각 단계에서 무엇을 해야 하는지를 상세하게 설명한다.

---

## 아키텍처별 리소스 요구량

"내 컴퓨터로 딥러닝을 할 수 있는가?"는 시작 단계에서 가장 현실적인 질문이다. 아키텍처마다 요구하는 하드웨어 수준이 다르고, 자기 상황에 맞는 선택을 해야 쓸데없는 좌절을 피할 수 있다.

<div class="card-grid">
<div class="card">
<span class="card-icon">📊</span>
<div class="card-title">MLP</div>
<div class="card-desc">CPU만으로 충분하다. 파라미터 수가 적고 연산이 단순하다. 수천 개 수준의 정형 데이터에 적합하며, 일반 노트북에서도 몇 분 이내에 학습이 완료된다. GPU가 없어도 전혀 문제없는 아키텍처다.</div>
</div>
<div class="card">
<span class="card-icon">🖼️</span>
<div class="card-title">CNN</div>
<div class="card-desc">GPU 사용을 권장한다. 특히 ImageNet 사전학습 모델을 전이학습할 때는 VRAM 4-8GB가 필요하다. 이미지 크기가 크거나(512x512 이상) 배치 사이즈를 키우려면 VRAM 8GB 이상이 유리하다. 데이터가 수백 장이고 전이학습을 쓴다면 학습 시간은 수십 분에서 수 시간 수준이다.</div>
</div>
<div class="card">
<span class="card-icon">📈</span>
<div class="card-title">RNN/LSTM</div>
<div class="card-desc">GPU 사용을 권장한다. 시퀀스가 길어질수록(수천 시점 이상) 메모리 소비가 급격히 증가한다. VRAM 4-8GB면 일반적인 시계열 문제를 다룰 수 있다. 순차 처리 특성 때문에 GPU를 써도 CNN만큼의 속도 이점은 없을 수 있다.</div>
</div>
<div class="card">
<span class="card-icon">🤖</span>
<div class="card-title">Transformer</div>
<div class="card-desc">GPU가 사실상 필수이고, VRAM 12GB 이상을 권장한다. 셀프 어텐션 연산이 시퀀스 길이의 제곱에 비례하므로, 긴 시퀀스에서는 메모리가 급격히 늘어난다. 데이터가 1만 개 이상일 때 효과가 두드러진다. 데이터가 수백 개 수준이면 Transformer보다 LSTM이나 CNN이 현실적이다.</div>
</div>
</div>

"GPU가 없으면 딥러닝을 못 하는 건가?"라는 질문을 자주 받는다. 그렇지 않다. 현실적인 대안이 있다. **Google Colab**은 무료로 GPU(T4 또는 유사 사양)를 제공한다. 세션당 시간 제한이 있지만, 대부분의 공학 연구 규모에서는 충분하다. **학교 HPC 클러스터**를 활용할 수도 있다. 대부분의 연구 중심 대학에서 GPU 노드가 포함된 HPC를 운영하며, 학생에게 무료로 제공한다. 신청 방법을 모르겠으면 연구실 선배에게 물어보자. **Kaggle Notebooks**도 무료 GPU를 제공하며, 주당 사용 시간 제한 내에서 활용할 수 있다.

---

## 딥러닝 학습 실패 진단 가이드

위에서 학습이 안 될 때의 체크리스트를 제시했지만, 실제로는 "증상"에서 출발하는 것이 더 실용적이다. 아래에서 자기 상황에 해당하는 탭을 선택하면 된다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch22-loss-stuck">Loss가 줄지 않는다</button>
<button class="tab-btn" data-tab="tab-ch22-loss-nan">Loss가 NaN이 된다</button>
<button class="tab-btn" data-tab="tab-ch22-overfit-gap">학습은 되는데 테스트 성능이 낮다</button>
</div>
<div class="tab-content active" id="tab-ch22-loss-stuck">

### Loss가 줄지 않는다

학습을 시작했는데 loss가 초기값 근처에서 움직이지 않거나, 매우 느리게만 감소하는 상황이다. 아래 순서대로 점검한다.

**1단계: 학습률 확인.** 학습률이 너무 낮으면 loss가 거의 움직이지 않는다. Adam 기준 0.001이 기본값이지만, 문제에 따라 0.01이나 0.0001이 더 나을 수 있다. 학습률을 10배 올려보고 변화가 있는지 확인한다.

**2단계: 데이터 정규화 확인.** 입력 변수의 스케일이 극단적으로 다르면(하나는 0-1, 다른 하나는 0-100,000) 학습이 불안정해진다. StandardScaler(평균 0, 표준편차 1)로 모든 입력을 정규화하고 다시 시도한다.

**3단계: 모델 용량 확인.** 모델이 너무 작으면(층 1개, 뉴런 8개) 데이터의 패턴을 표현할 수 없다. 층 수나 뉴런 수를 늘려본다. 반대로, "작은 데이터 과적합 테스트"(데이터 10개로 loss를 0에 수렴시키는 테스트)가 실패하면, 모델 구조나 코드에 근본적 문제가 있을 수 있다.

**4단계: 출력층 활성화 함수 확인.** 회귀 문제에 sigmoid를 출력층에 넣으면 출력이 0-1로 제한되어 학습이 안 된다. 회귀에서는 출력층에 활성화 함수를 넣지 않는 것이 기본이다.

</div>
<div class="tab-content" id="tab-ch22-loss-nan">

### Loss가 NaN이 된다

학습 도중 loss가 갑자기 NaN(Not a Number)이 되어 학습이 중단되는 상황이다. 원인은 거의 항상 세 가지 중 하나다.

**1단계: 학습률을 줄인다.** 학습률이 너무 크면 가중치가 급격히 변하면서 연산 결과가 무한대로 발산한다. 현재 학습률을 10분의 1로 줄여서 다시 시도한다. Adam 기준 0.001에서 NaN이 나면 0.0001로 낮춰본다.

**2단계: 데이터에 NaN이나 무한값이 있는지 확인한다.** 전처리 과정에서 결측값이 NaN으로 남아 있으면, 그 값이 연산에 전파되어 전체가 NaN이 된다. `np.isnan(data).sum()`과 `np.isinf(data).sum()`으로 점검한다.

**3단계: 수학적 불안정성을 확인한다.** `log(0)`, `sqrt(음수)`, `0으로 나누기` 등이 대표적이다. Cross-Entropy 손실 함수에서 예측 확률이 정확히 0이 되면 log(0)이 발생한다. 작은 값(epsilon, 보통 1e-8)을 더해서 방지할 수 있다: `log(prediction + 1e-8)`.

**4단계: Gradient Clipping을 적용한다.** 기울기의 크기를 제한하여 발산을 방지한다. PyTorch에서는 `torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)`으로 간단히 적용할 수 있다.

</div>
<div class="tab-content" id="tab-ch22-overfit-gap">

### 학습은 되는데 테스트 성능이 낮다

학습 데이터에서는 loss가 잘 줄어들고 성능이 좋은데, 테스트(또는 검증) 데이터에서는 성능이 크게 떨어지는 상황이다. 전형적인 과적합(overfitting)이거나, 데이터 관련 문제일 수 있다.

**1단계: 과적합 여부 확인.** 학습 곡선(train loss vs validation loss)을 그려서, validation loss가 증가하기 시작하는 시점이 있는지 확인한다. 있다면 과적합이다.

**2단계: 정규화 추가.** Dropout(0.2-0.5), Early Stopping(patience 10-20), Weight Decay(1e-4)를 적용한다. 하나씩 추가하면서 효과를 확인한다. 한 번에 모두 적용하면 어떤 것이 효과가 있었는지 알 수 없다.

**3단계: 데이터 부족 시 증강.** 이미지 데이터라면 회전, 반전, 크기 조절, 밝기/대비 변화 등의 Data Augmentation을 적용한다. 정형 데이터라면 노이즈를 추가하거나, SMOTE(소수 클래스 오버샘플링) 등을 시도한다.

**4단계: 도메인 갭 확인.** 학습 데이터와 테스트 데이터의 분포가 다른지 확인한다. 실험실 조건에서 수집한 데이터로 학습하고 현장 데이터로 테스트하면 성능이 떨어지는 것이 당연하다. 전이학습 전략을 재검토하거나, 테스트 환경과 유사한 데이터를 학습에 포함시킨다.

**5단계: 데이터 누수(Data Leakage) 점검.** 학습 데이터에 테스트 정보가 섞여 들어가면 학습 성능은 높지만 실제 테스트에서 성능이 떨어진다. train/test 분할이 올바른지, 전처리(정규화 등)가 학습 세트 기준으로만 이루어졌는지 확인한다.

</div>
</div>

---

## 베이스라인 성능 기대치

"내 모델이 잘 되고 있는 건지 모르겠다"는 딥러닝을 처음 하는 대학원생에게 가장 흔한 질문이다. 논문에서 99% 정확도를 봤는데 내 모델은 75%라면 실패한 건가? 반드시 그렇지는 않다. 문제의 난이도, 데이터의 양과 질, 클래스 분포에 따라 "합리적인 성능"의 기준이 완전히 달라진다.

<div class="highlight-box info">
<span class="highlight-box-icon">ℹ️</span>
<div class="highlight-box-content">
<p><strong>문제 유형별 대략적 기대치</strong></p>
<p><strong>이미지 분류</strong>: ImageNet 사전학습 모델을 전이학습하고 데이터가 100장 수준이면, 70-85% 정확도가 합리적인 출발점이다. 데이터가 1,000장 이상이면 85-95%도 가능하다. 클래스 간 구별이 어렵거나(미세 결함 구분 등) 클래스 불균형이 심하면 이보다 낮을 수 있다.</p>
<p><strong>회귀</strong>: R²(결정계수) 0.8 이상이면 양호한 편이고, 0.95 이상이면 우수하다. 다만 R²만으로 판단하면 안 되고, RMSE(평균제곱근오차)나 MAE(평균절대오차)를 물리적 단위와 함께 확인해야 한다. "R² = 0.99인데 MAE가 50 MPa"이면, R²는 높지만 오차가 실용적으로 큰 것이다.</p>
<p><strong>객체 탐지</strong>: mAP(mean Average Precision) 0.5 이상이면 기본적인 탐지가 작동하는 것이고, 0.7 이상이면 실용적 수준에 근접한다. 작은 객체나 밀집 객체 탐지에서는 이보다 낮을 수 있다.</p>
<p><strong>시계열 예측</strong>: MAPE(평균절대백분율오차) 10% 이내이면 양호하다. 예측 대상의 변동성이 크면(주식, 기상) MAPE가 높아지는 것은 자연스럽다.</p>
</div>
</div>

이 수치들은 절대적 기준이 아니라 출발점이다. 중요한 것은 자기 데이터와 문제에서의 "베이스라인"을 먼저 확립하는 것이다. 가장 간단한 모델(선형 회귀, Random Forest)로 얻은 성능이 베이스라인이고, 딥러닝 모델은 이 베이스라인 대비 얼마나 향상되었는지로 평가해야 한다. 베이스라인 없이 딥러닝 모델의 성능만 보고하면, 그 수치가 좋은 건지 나쁜 건지 판단할 근거가 없다.

또한, 논문에서 보는 높은 성능 수치는 대부분 최적화된 데이터, 정제된 환경, 많은 하이퍼파라미터 튜닝의 결과라는 점을 기억하라. 처음 시도에서 논문 수준의 성능이 나오지 않는 것은 정상이다. 점진적으로 데이터 품질을 높이고, 전처리를 개선하고, 하이퍼파라미터를 조절하며 성능을 끌어올리는 것이 실제 연구 과정이다.

---

## Attention 메커니즘의 직관

Transformer는 ch22 앞부분에서 간단히 언급되었지만, 그 핵심인 **Attention 메커니즘**은 별도로 깊이 이해할 가치가 있다. Attention은 2017년 "Attention Is All You Need" 논문 이후 딥러닝의 대부분 분야에서 표준이 되었다. Transformer 기반 모델(BERT, GPT, ViT, Whisper 등)을 사용하지 않더라도, Attention의 직관을 이해하면 모델을 더 잘 디자인할 수 있다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>Attention의 한 줄 설명</strong></p>
    <p>"각 입력 요소가 다른 모든 입력 요소와 얼마나 관련 있는지를 학습하여, 관련 있는 것에 더 큰 가중치를 부여한다." 이 한 문장이 Attention의 본질이다. 시계열에서는 "현재 시점이 과거 어느 시점에 주목해야 하는가"를, 이미지에서는 "이 픽셀이 다른 픽셀과 어떻게 연결되는가"를, 텍스트에서는 "이 단어가 문장의 다른 단어와 어떤 관계가 있는가"를 학습한다.</p>
  </div>
</div>

**Attention의 핵심 구조: Q, K, V.**

Attention은 세 가지 요소로 작동한다. **Query(Q)**: "내가 무엇을 찾고 싶은가". **Key(K)**: "내가 가지고 있는 것은 무엇인가". **Value(V)**: "그것의 실제 내용은 무엇인가". Q와 K의 유사도를 계산하여 가중치를 만들고, 그 가중치로 V를 더한다. 도서관 비유: Q는 찾는 책의 키워드, K는 모든 책의 제목, V는 책의 내용이다. 키워드와 제목의 유사도(softmax)로 어떤 책을 얼마나 참고할지 결정한다.

수식으로 표현하면:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

이 수식은 복잡해 보이지만 본질은 단순하다. Q와 K를 곱해 유사도를 얻고, 차원으로 나눠 안정화하고, softmax로 확률 분포를 만들고, V에 적용한다.

**Self-Attention vs Cross-Attention.** **Self-Attention**은 같은 입력 시퀀스 안에서 각 요소가 다른 요소와 얼마나 관련 있는지 계산한다. 텍스트에서 "그가 그것을 그녀에게 주었다"에서 "그것"이 무엇인지 알려면 다른 단어와의 관련성을 봐야 한다. **Cross-Attention**은 두 다른 시퀀스 사이의 관련성을 계산한다. 번역에서 영어 단어가 한국어 단어와 어떻게 매칭되는지가 cross-attention이다.

**Multi-Head Attention.** 단일 Attention은 한 종류의 관계만 학습한다. Multi-Head Attention은 여러 개의 Attention을 동시에 학습하여, 각각이 다른 종류의 관계를 포착한다. 한 head는 문법적 관계를, 다른 head는 의미적 관계를 학습할 수 있다. 보통 8개 또는 16개의 head를 사용한다.

**왜 RNN/LSTM을 대체했는가.** RNN은 시퀀스를 순차적으로 처리한다. 시점 t를 처리하려면 시점 t-1을 먼저 처리해야 한다. 이것은 병렬화가 어렵고, 긴 시퀀스에서 초기 정보가 잊히는 문제(long-term dependency)가 있다. Attention은 모든 시점을 동시에 처리한다. 시점 t가 시점 1을 직접 참조할 수 있다. 병렬화가 가능하고 긴 의존성을 잘 처리한다. 다만 메모리 비용이 시퀀스 길이의 제곱(O(n²))이라는 단점이 있다. 이것이 매우 긴 시퀀스(수만 토큰)에서 Transformer의 한계가 된다.

**공학에서 Attention의 응용.** Attention은 NLP를 넘어 공학 분야에도 적용된다. 시계열 이상 탐지에서 어느 시점이 중요한지 보여주고, 센서 융합에서 어느 센서를 더 신뢰할지 학습하고, 분자 설계에서 어느 원자가 중요한지 식별한다. 박사 연구가 시퀀스 데이터를 다룬다면, Attention 기반 모델을 검토할 가치가 있다.

---

## Vision Transformer (ViT)와 현대 이미지 모델

CNN은 2012년부터 2020년까지 이미지 처리의 절대 표준이었다. 하지만 2020년 Vision Transformer(ViT)의 등장 이후, CNN과 Transformer가 공존하는 시대가 되었다. 이미지 데이터를 다룬다면, 두 가지 모두를 알아야 한다.

**ViT의 핵심 아이디어.** ViT는 이미지를 작은 패치(patch)로 잘라 각 패치를 토큰으로 취급한다. 224×224 이미지를 16×16 패치로 자르면 14×14=196개의 패치가 된다. 각 패치를 벡터로 변환하여 Transformer에 입력한다. 위치 정보(positional encoding)를 더하여 Transformer가 패치의 공간적 위치를 알 수 있게 한다. 그 후는 일반 Transformer와 동일하다.

**ViT vs CNN.**

| 측면 | CNN | ViT |
|------|-----|-----|
| 귀납적 편향 | 강함 (지역성, 변환 불변성) | 약함 |
| 데이터 효율 | 작은 데이터에서도 작동 | 대규모 데이터 필요 (수십만~수백만 이미지) |
| 계산 복잡도 | 이미지 크기에 선형 | 패치 수의 제곱 |
| 사전학습 의존도 | 도움이 됨 | 거의 필수 |
| 해석성 (Attention 시각화) | Grad-CAM 가능 | 자체 attention 시각화 |
| 작은 객체 처리 | 우수 | 작은 패치 크기 필요 |

**언제 ViT를 쓰는가.** 첫째, **대규모 사전학습 모델을 활용할 때**. ImageNet으로 사전학습된 ViT(예: Google의 ViT-B/16, Meta의 DINOv2)를 데이터에 미세조정. 작은 데이터에도 효과적. 둘째, **글로벌 컨텍스트가 중요할 때**. 이미지의 한 영역이 멀리 떨어진 다른 영역과 관련 있을 때 ViT가 유리. 셋째, **다른 modality와 함께 사용할 때**. 텍스트와 이미지를 함께 처리하는 모델(CLIP, BLIP)은 ViT를 사용. 넷째, **충분한 GPU가 있을 때**. ViT는 CNN보다 더 많은 계산 자원이 필요.

**언제 CNN이 더 나은가.** 첫째, **데이터가 적을 때** (수백~수천 장). CNN의 귀납적 편향이 작은 데이터에 유리. 둘째, **빠른 추론이 필요할 때**. CNN(특히 EfficientNet, MobileNet)은 ViT보다 빠르다. 셋째, **작은 객체 검출** 또는 **고해상도 이미지**. 셋째, **edge 디바이스 배포**. 모바일이나 임베디드에서는 CNN이 유리.

**현대 이미지 모델의 트렌드.**

첫째, **하이브리드 모델**: ConvNeXt, CoAtNet 같은 모델은 CNN과 ViT의 장점을 결합한다. 처음 몇 층은 CNN, 후속 층은 Transformer.

둘째, **자기지도 학습 사전학습**: DINOv2, MAE(Masked Autoencoder), SimCLR 같은 자기지도 학습으로 사전학습한 모델이 표준이 되고 있다. 라벨 없이 학습한 표현이 라벨 있는 학습보다도 일반화가 잘된다.

셋째, **Foundation Models for Vision**: SAM(Segment Anything Model), GroundingDINO 같은 범용 비전 모델이 등장했다. 별도 학습 없이도 zero-shot으로 다양한 task를 수행한다. 작업에 미세조정 없이도 적용 가능한 경우가 많다.

넷째, **Diffusion Models for Image Generation**: 이미지 생성에서 GAN을 대체한 표준이 되었다. Stable Diffusion, DALL-E, Midjourney 모두 diffusion 기반. 합성 데이터를 만들거나 데이터 증강에 사용할 수 있다(ch26 참조).

**공학 응용에서의 추천.** 첫째, **데이터가 1000장 이하**: 사전학습된 CNN(ResNet50, EfficientNet) 미세조정. 둘째, **데이터가 1000-10000장**: CNN 또는 작은 ViT(ViT-S) 시도. 셋째, **데이터가 10000장 이상**: ViT-B 또는 ConvNeXt 시도. 넷째, **세그멘테이션 작업**: SAM의 zero-shot 적용 또는 SAM 기반 미세조정. 다섯째, **이상 탐지**: 자기지도 학습 모델(예: PaDiM, PatchCore)의 사전학습된 백본 활용.

---

## Loss Function 선택 가이드

ch22 앞부분에서 손실 함수를 간단히 언급했다. 여기서는 문제에 어떤 손실 함수를 선택할지 더 자세히 다룬다. 잘못된 손실 함수는 모델이 학습되지 않거나, 의미 없는 결과를 낳는 가장 흔한 원인이다.

**회귀 문제의 손실 함수.**

| 손실 함수 | 수식 | 언제 사용 |
|-----------|------|----------|
| MSE (L2) | $(y - \hat{y})^2$ | 표준. 정규분포 가정 |
| MAE (L1) | $\|y - \hat{y}\|$ | 이상치(outlier)에 강건 |
| Huber Loss | MSE + MAE 혼합 | MSE의 안정성 + MAE의 강건성 |
| Log-cosh | $\log(\cosh(y - \hat{y}))$ | Huber와 비슷, 미분 가능 |
| Quantile Loss | $\max(\tau\Delta, (\tau-1)\Delta)$ | 분위수 회귀, 불확실성 추정 |

MSE가 표준이지만, 데이터에 이상치가 많으면 MAE 또는 Huber를 시도한다. MSE는 큰 오차에 매우 민감하므로, 한두 개의 이상치가 모델 전체를 왜곡할 수 있다.

**분류 문제의 손실 함수.**

| 손실 함수 | 언제 사용 |
|-----------|----------|
| Binary Cross-Entropy | 이진 분류 |
| Categorical Cross-Entropy | 다중 클래스 분류 (one-hot 라벨) |
| Sparse Categorical CE | 다중 클래스 (인덱스 라벨) |
| Focal Loss | 클래스 불균형이 심할 때 |
| Label Smoothing CE | 과적합 방지, calibration 개선 |
| Dice Loss | 세그멘테이션, 작은 객체 |
| Tversky Loss | 세그멘테이션, 불균형 |

Cross-Entropy가 표준이지만, 클래스 불균형이 심하면 Focal Loss를 시도한다. Focal Loss는 쉬운 샘플의 가중치를 줄이고 어려운 샘플(잘못 분류된 소수 클래스)에 집중한다.

**세그멘테이션 문제의 손실 함수.** 세그멘테이션은 픽셀 단위 분류이지만, 일반 cross-entropy만으로는 문제가 있다. 배경 픽셀이 압도적으로 많아 모델이 모든 픽셀을 배경으로 예측하기 쉽다. 다음을 함께 사용한다. 첫째, **Dice Loss**: 예측과 실제의 교집합/합집합을 기반으로 한 손실. 작은 객체 세그멘테이션에 효과적. 둘째, **Cross-Entropy + Dice Loss 결합**: 두 가지를 더한 형태. 가장 흔한 선택. 셋째, **Boundary Loss**: 객체 경계에 더 가중치를 주는 손실. 정밀한 경계가 필요할 때.

**객체 탐지의 손실 함수.** 객체 탐지는 분류와 회귀가 결합된 문제다. 보통 다음 세 가지를 결합한다. 첫째, **Classification Loss**: 각 anchor의 클래스 (Cross-Entropy 또는 Focal Loss). 둘째, **Bounding Box Regression Loss**: Smooth L1 또는 IoU Loss. 셋째, **Objectness Loss**: 객체 존재 여부 (Binary Cross-Entropy). YOLO, Faster R-CNN, DETR 등 다양한 탐지 모델이 이 세 가지의 다른 조합을 사용한다.

**커스텀 손실 함수.** 문제에 표준 손실 함수가 맞지 않으면 직접 만들 수 있다. 핵심은 미분 가능해야 한다는 것이다(역전파를 위해). 공학에서의 흔한 커스텀 손실 예시. 첫째, **물리 제약 손실**: 예측이 물리 법칙을 위반하는 정도(예: 음수 강도, 에너지 비보존)에 패널티를 부여. 둘째, **가중 손실**: 더 중요하게 여기는 영역(예: 균열 영역)에 더 큰 가중치. 셋째, **다중 작업 손실**: 여러 출력을 동시에 학습할 때 각 출력의 손실을 가중 합산.

---

## 신경망 초기화와 정규화 기법

딥러닝 모델이 학습되지 않거나 불안정한 가장 흔한 원인 중 하나는 **잘못된 초기화**와 **정규화 부족**이다. ch22의 트러블슈팅 가이드를 보완하여 이 두 가지를 깊이 다룬다.

**가중치 초기화의 중요성.** 신경망의 가중치가 모두 0으로 초기화되면, 모든 뉴런이 같은 값을 출력하여 학습이 안 된다. 가중치가 너무 크면 활성화 함수가 saturation되어 그래디언트가 사라진다. 가중치가 너무 작으면 신호가 층을 거치며 점점 약해진다. 적절한 초기화가 학습의 출발점이다.

**주요 초기화 방법.**

첫째, **Xavier (Glorot) Initialization**: 이전 층과 현재 층의 노드 수를 고려하여 가중치를 초기화. tanh, sigmoid 활성화 함수에 적합. 분포: $\mathcal{N}(0, 2/(n_{in} + n_{out}))$.

둘째, **He Initialization**: ReLU 계열 활성화 함수에 최적화. 분포: $\mathcal{N}(0, 2/n_{in})$. 현대 CNN과 MLP의 표준.

셋째, **Orthogonal Initialization**: RNN/LSTM에서 그래디언트 폭발/소실을 방지. 가중치 행렬을 직교 행렬로 초기화.

PyTorch와 TensorFlow의 대부분 층은 기본적으로 He 또는 Xavier 초기화를 사용한다. 직접 초기화를 변경할 일은 드물지만, 학습이 안 될 때 초기화를 의심하는 것은 중요하다.

**Batch Normalization의 본질.** Batch Normalization(BN)은 각 배치에서 활성화 출력을 평균 0, 분산 1로 정규화한다. 효과는 다음과 같다. 첫째, **학습 안정화**: 층 사이의 활성화 분포가 안정되어 학습이 빨라진다. 둘째, **학습률 허용도 증가**: 더 큰 학습률을 사용할 수 있다. 셋째, **정규화 효과**: 약한 정규화 효과를 줘서 과적합을 줄인다. 넷째, **초기화에 덜 민감**.

BN의 단점도 있다. 첫째, **작은 배치에서 불안정**. 배치 통계를 사용하므로, 배치 크기가 작으면(2-4) 불안정하다. 둘째, **추론 모드와 학습 모드가 다름**. 학습 시는 배치 통계, 추론 시는 누적 통계를 사용. 이 차이가 가끔 버그의 원인이 된다. 셋째, **시퀀스 데이터에 적합하지 않음**. RNN/Transformer에는 BN 대신 LayerNorm을 사용.

**다양한 Normalization의 비교.**

| 방법 | 정규화 차원 | 적용 분야 |
|------|------------|----------|
| Batch Norm | 배치 차원 | CNN, MLP |
| Layer Norm | 채널 차원 | RNN, Transformer |
| Instance Norm | 각 샘플 독립 | 스타일 전이, GAN |
| Group Norm | 채널 그룹 | 작은 배치 CNN |
| Weight Norm | 가중치 직접 | 소규모 모델 |

선택의 기본 원칙: **CNN은 BN, Transformer/RNN은 LayerNorm**. 작은 배치(<4)이면 GroupNorm을 시도한다.

**Dropout과 다른 정규화 기법.** Dropout은 학습 시 일부 뉴런을 무작위로 0으로 만든다. 모델이 특정 뉴런에 의존하지 않게 하여 과적합을 줄인다. Dropout 비율은 보통 0.1-0.5 사이에서 선택한다. 큰 모델일수록 더 큰 dropout이 효과적. **DropPath/Stochastic Depth**: 전체 층을 무작위로 건너뛰는 방법. ResNet과 ViT에서 사용. **Mixup/CutMix**: 두 샘플을 섞어 새 학습 샘플을 만드는 데이터 증강 기법. 정규화 효과가 강력하다. **Label Smoothing**: 정답 라벨을 1.0이 아닌 0.9 정도로 만들어 over-confidence를 줄인다.

**실전 추천.** 모델이 학습은 되지만 과적합이 심하면 다음 순서로 시도한다. 첫째, BN/LayerNorm 추가. 둘째, Dropout 추가 (0.2부터 시작). 셋째, Weight decay 증가 (0.01 → 0.05). 넷째, 데이터 증강 강화. 다섯째, Mixup/CutMix 시도. 여섯째, 모델 크기 축소. 이 순서가 가장 효과적이다. 한 번에 모든 것을 바꾸지 말고, 한 가지씩 변경하여 효과를 측정한다.

---

## 제한된 GPU 메모리에서 큰 모델 학습하기

박사생이 딥러닝 연구를 할 때 가장 자주 부딪히는 벽은 "**이 모델을 내 GPU에 올릴 수 없다**"는 것이다. 연구실의 GPU는 보통 16GB에서 48GB 사이이고, 최신 모델들은 80GB H100을 기본으로 가정한다. 큰 모델을 돌릴 예산이 없다고 연구를 포기해야 할까? 다행히 몇 가지 기법으로 같은 GPU에서 훨씬 큰 모델을 학습할 수 있다.

<div class="highlight-box highlight-info">

**왜 GPU 메모리가 부족한가.** 학습에 필요한 메모리는 단순히 모델 파라미터 크기의 4배 이상이다. 10억 파라미터 모델은 파라미터 자체로 4GB(fp32 기준)를 차지하고, 여기에 그래디언트(4GB), Optimizer 상태(Adam은 8GB), 그리고 활성화 값(배치 크기에 비례, 보통 10-30GB)이 더해진다. 합치면 30-50GB가 쉽게 된다. 이것이 "파라미터 수 × 20"이 실질 메모리 요구치라는 어림치의 배경이다.

</div>

**전략 1: Mixed Precision Training (혼합 정밀도 학습).**

가장 먼저 시도할 기법이다. 가중치와 연산을 fp32(32비트)가 아닌 fp16/bf16(16비트)로 수행하면 메모리 사용량이 절반으로 줄고 연산 속도도 2배 빨라진다. 현대 GPU(A100, H100, RTX 30/40 시리즈)는 16비트 연산을 하드웨어로 가속한다.

```python
# PyTorch에서 Mixed Precision 사용
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
for inputs, targets in dataloader:
    optimizer.zero_grad()
    with autocast():
        outputs = model(inputs)
        loss = criterion(outputs, targets)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
```

코드 변경이 10줄 미만이고 효과가 즉각적이다. 주의점은 fp16은 수치 범위가 좁아 손실이 NaN이 될 수 있다는 것이다. 이 경우 bf16을 쓰면 대부분 해결된다. A100/H100은 bf16을 네이티브로 지원한다.

**전략 2: Gradient Accumulation (그래디언트 누적).**

배치 크기를 16으로 하고 싶지만 GPU 메모리가 4만 허용한다면? 배치 4로 4번 순전파/역전파를 돌리고, 그래디언트를 누적한 후 한 번에 업데이트한다. 효과적으로 배치 16과 같은 결과를 얻을 수 있다.

```python
accumulation_steps = 4
for i, (inputs, targets) in enumerate(dataloader):
    outputs = model(inputs)
    loss = criterion(outputs, targets) / accumulation_steps
    loss.backward()
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()
```

대가는 학습 시간이 배치 크기 비율만큼 늘어난다는 것이다. 하지만 학습 자체가 불가능한 것보다는 훨씬 낫다. BN을 사용하는 경우에만 주의가 필요하다 — BN은 실제 배치 통계에 의존하므로 gradient accumulation으로는 "진짜 큰 배치" 효과를 얻을 수 없다. 이 경우 LayerNorm이나 GroupNorm으로 대체하는 것을 고려한다.

**전략 3: Gradient Checkpointing (그래디언트 체크포인팅).**

순전파 중에 중간 활성화 값을 저장하지 않고, 역전파 때 필요한 부분만 다시 계산한다. 메모리 사용량을 크게 줄이지만(30-50%), 계산 시간은 20-30% 증가한다. Hugging Face Transformers는 한 줄로 활성화할 수 있다.

```python
model.gradient_checkpointing_enable()
```

PyTorch 네이티브에서는 `torch.utils.checkpoint.checkpoint`로 특정 층에만 적용할 수도 있다. 보통 Transformer 계열 모델에서 가장 효과가 크다.

**전략 4: Optimizer 선택의 메모리 영향.**

Adam/AdamW는 각 파라미터마다 두 개의 모멘텀 상태를 유지하므로, 파라미터 크기의 2배 메모리가 추가로 필요하다. SGD + momentum은 1배만 필요하다. 메모리가 정말 부족하면 Adam 대신 SGD나 8-bit Adam(`bitsandbytes` 라이브러리)을 고려한다. 8-bit Adam은 Optimizer 상태를 8비트로 저장하여 메모리를 75% 줄인다.

```python
# bitsandbytes 사용
import bitsandbytes as bnb
optimizer = bnb.optim.Adam8bit(model.parameters(), lr=1e-4)
```

다만 SGD는 Adam보다 학습률 튜닝이 더 섬세해야 하고 수렴이 느릴 수 있다. 먼저 Mixed Precision + Gradient Accumulation으로 충분한지 확인한 후 이 전략을 고려한다.

**전략 5: LoRA와 파라미터 효율 파인튜닝(PEFT).**

사전학습된 대형 모델(예: ResNet-152, BERT, LLaMA)을 작은 데이터셋에 파인튜닝할 때, 전체 가중치를 업데이트할 필요가 없다. **LoRA(Low-Rank Adaptation)**는 원본 가중치를 고정하고, 각 층에 작은 저차원 행렬(rank 4-16)만 추가하여 학습한다. 학습 가능한 파라미터가 원본의 0.1-1%로 줄어들어, 메모리와 계산 시간 모두 극적으로 감소한다.

```python
# Hugging Face PEFT 라이브러리
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=8, lora_alpha=16, target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1
)
model = get_peft_model(base_model, config)
```

공학 연구에서는 최근 사전학습된 Transformer/PINN 계열 모델이 늘어나고 있어서, LoRA가 점점 중요해지고 있다. 전체 파인튜닝과 거의 같은 성능을 훨씬 적은 자원으로 달성한다.

**전략 6: 모델 자체를 작게.**

위 기법들을 다 동원했는데도 부족하다면, 연구 범위에서 더 작은 모델로 충분한지 재검토한다. 파라미터 수 10억 대신 1억 모델로 문제를 풀 수 있다면, 그것이 최선이다. 실제로 공학 문제의 상당수는 거대 모델이 필요하지 않다. 데이터 크기가 중소규모(<10만 샘플)라면 대형 모델은 과적합만 일으킬 뿐이다. "큰 모델이 항상 좋다"는 것은 NLP/비전의 대규모 벤치마크에서나 맞는 이야기고, 공학 도메인에서는 종종 반대다.

**전략 7: 무료/저렴한 외부 GPU 활용.**

연구실 GPU로 불가능하다면 외부 자원을 활용한다.

- **Google Colab Free**: T4 GPU, 약 12시간 세션. 학습 중간 결과를 자주 저장해야 한다.
- **Google Colab Pro ($10/월)**: 더 긴 세션과 더 나은 GPU. 학생에게 가장 실용적인 옵션.
- **Kaggle Kernels**: 주당 30시간 GPU 무료. T4 x2 또는 P100.
- **학교/기관 HPC**: ch17에서 다룬 Slurm 기반 클러스터. 대부분 무료.
- **KISTI 슈퍼컴퓨팅 (한국)**: 학생 연구자에게 무료 할당.
- **AWS/GCP 학생 크레딧**: 첫 가입 시 $300-1000 무료 크레딧. 소량 실험에 충분.

여러 자원을 병행하여 사용하는 것이 일반적이다. 개발과 디버깅은 로컬 GPU, 본격 학습은 HPC, 발표 직전 파인튜닝은 Colab Pro 같은 식이다.

**디버깅 순서의 원칙.** 메모리 부족 오류(`CUDA out of memory`)가 나면 다음 순서로 시도한다.

1. 배치 크기 절반으로 (즉시 효과)
2. Mixed Precision 적용 (코드 10줄)
3. Gradient Accumulation으로 원래 유효 배치 크기 복원
4. Gradient Checkpointing 추가
5. LoRA 또는 Optimizer 변경
6. 모델 크기 자체를 줄이기
7. 외부 자원으로 이동

1-4는 한두 시간 안에 시도할 수 있는 변경이다. 먼저 이 네 가지로 충분한지 확인한 후 더 복잡한 변경을 고려한다.

**실전 경험담: "A100이 없다고 연구가 불가능한 것은 아니다."** 최근 ML 연구의 일부는 대기업 수준의 자원을 가정하지만, 연구실 수준의 공학 응용에서는 대부분의 문제를 RTX 3090(24GB) 또는 A100(40GB) 한 장으로 해결할 수 있다. 문제 설정을 명확히 하고, 위의 기법들을 조합하면, 제한된 자원에서도 Top 학회 수준의 연구가 가능하다. "자원 부족"을 핑계로 삼지 말자. 자원 제약 하에서 영리한 선택을 하는 것이 오히려 연구자의 중요한 역량이다.

> GPU 메모리 관리는 박사생이 반드시 익혀야 할 실전 기술이다. 이 기술 없이는 연구 주제가 "GPU에 올라가는 것"으로 제한된다. Mixed Precision, Gradient Accumulation, LoRA 이 세 가지만 익혀 두어도 할 수 있는 연구의 범위가 크게 넓어진다. 이론만이 아니라 각 기법을 토이 프로젝트에 한 번씩 적용해 보는 것이 실력이 되는 길이다.

---

## 모델 추론 최적화 — 학습한 모델을 빠르고 작게 만들기

ML 연구의 많은 부분이 "모델 학습"에 집중되지만, 실제 사용에서 중요한 것은 **추론(inference)**이다. 학습은 한 번 하면 끝이지만, 추론은 계속 반복된다. 학습된 모델이 1GB, 추론에 1초 걸린다면, 실제 응용(모바일, 엣지 디바이스, 실시간 시스템)에서는 사용할 수 없다. 박사 학생 대부분이 논문 실험에만 집중하고 추론 최적화를 무시하지만, 연구가 실제 세상에 적용되려면 이 기술이 필수다. 또한 리뷰어와 산업체 파트너는 종종 "이 모델이 얼마나 빠르고 작은가?"를 묻는다.

<div class="highlight-box highlight-important">

**학습과 추론의 비대칭.** GPU 한 장에서 며칠 동안 학습한 모델이, 추론 시에는 1,000배 더 많이 실행된다. 학습 효율은 한 번의 시간 절약이지만, 추론 효율은 10,000배, 100,000배의 시간 절약이다. 배포를 염두에 둔다면 추론 효율이 학습 효율보다 훨씬 중요하다.

</div>

**추론 최적화의 4가지 목표.**

최적화 전에 "무엇을 줄일 것인가"를 명확히 한다.

1. **지연 시간(Latency)**: 한 입력에 대한 응답 시간. 실시간 시스템(자율주행, AR/VR)에서 가장 중요.
2. **처리량(Throughput)**: 초당 처리할 수 있는 입력 수. 대규모 시스템(추천, 검색)에서 중요.
3. **모델 크기(Model Size)**: 디스크/메모리 공간. 모바일, 엣지 디바이스에서 중요.
4. **에너지 소비(Energy)**: 전력 사용량. 배터리 기반 디바이스와 환경 고려 시 중요.

이 4가지는 서로 연관되지만 정확히 같지는 않다. 응용에 따라 우선순위가 다르다. 논문을 쓸 때도 이 중 어느 것을 개선했는지 명시한다.

**기법 1: 양자화 (Quantization).**

가장 단순하고 효과적인 방법. 32비트 부동소수점(fp32)으로 저장된 모델을 8비트 정수(int8) 또는 16비트 부동소수점(fp16/bf16)으로 변환.

**효과**:
- 모델 크기 75% 감소 (int8)
- 추론 속도 2-4배 향상 (CPU/특수 하드웨어)
- 정확도 손실: 보통 0.5-2% (잘 하면 거의 없음)

**종류**:
- **Post-Training Quantization (PTQ)**: 이미 학습된 모델에 사후 적용. 가장 간단.
- **Quantization-Aware Training (QAT)**: 학습 중 양자화 영향을 고려. 정확도 손실 최소화.
- **Dynamic Quantization**: 추론 시점에 동적 결정. 구현 쉬움.

**PyTorch 구현 (PTQ)**:
```python
import torch
from torch.ao.quantization import quantize_dynamic

model = MyModel()
model.load_state_dict(torch.load('model.pt'))
model.eval()

quantized_model = quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# 크기 비교
torch.save(model.state_dict(), 'original.pt')
torch.save(quantized_model.state_dict(), 'quantized.pt')
# 일반적으로 4배 크기 감소
```

**주의**: 모델 구조에 따라 양자화 효과가 다르다. Linear/Conv 계층은 잘 양자화되지만, 일부 정규화나 활성화는 어렵다. CNN은 보통 잘 되고, Transformer는 약간 더 주의 필요.

**기법 2: 가지치기 (Pruning).**

학습된 모델의 가중치 중 0에 가까운 것들을 제거. "작은 가중치는 중요도가 낮다"는 가정.

**종류**:
- **Magnitude Pruning**: 가중치의 절대값이 작은 것 제거 (가장 단순)
- **Structured Pruning**: 전체 채널/레이어/필터 제거 (속도 향상에 유리)
- **Unstructured Pruning**: 개별 가중치 제거 (크기 감소에 유리, 속도는 어려움)

**PyTorch 예시**:
```python
import torch.nn.utils.prune as prune

# Magnitude Pruning (30% 가중치 제거)
prune.l1_unstructured(model.layer1, name='weight', amount=0.3)

# 영구화 (pruned 가중치 제거)
prune.remove(model.layer1, 'weight')
```

**효과**: 모델 크기 30-80% 감소 가능. 속도는 structured pruning이어야 실제로 빨라진다.

**주의**: Pruning 후 미세조정(fine-tuning)이 거의 항상 필요하다. Pruning만 하고 재학습 없이 쓰면 성능이 크게 떨어진다.

**Lottery Ticket Hypothesis**: Frankle & Carbin (2019)의 유명한 발견. 큰 모델 안에 작은 "당첨 티켓"이 있어서, 적절히 찾으면 원본의 10-20% 크기로도 원본 성능을 낼 수 있다. 연구 주제로도 활발하다.

**기법 3: 지식 증류 (Knowledge Distillation).**

큰 "교사 모델(teacher)"의 지식을 작은 "학생 모델(student)"에 전달. 학생 모델은 교사의 출력을 모방하도록 학습된다.

**원리**:
```python
# 교사 모델의 soft prediction
teacher_output = teacher(x)
teacher_probs = F.softmax(teacher_output / T, dim=1)  # T는 temperature

# 학생 모델 학습
student_output = student(x)
student_probs = F.log_softmax(student_output / T, dim=1)

# KL divergence loss
distillation_loss = F.kl_div(student_probs, teacher_probs, reduction='batchmean') * T**2

# 실제 라벨 loss와 결합
total_loss = alpha * distillation_loss + (1 - alpha) * F.cross_entropy(student_output, y)
```

**효과**:
- 학생 모델 크기 10-50%로 축소 가능
- 정확도 손실 1-3% 정도
- 학생을 처음부터 작게 학습하는 것보다 훨씬 좋은 성능

**응용 사례**: BERT → DistilBERT (40% 작음, 97% 성능), T5 → T5-small, GPT → TinyGPT.

**Knowledge Distillation의 변형들**:
- **Self-Distillation**: 같은 모델이 교사와 학생. 일종의 정규화.
- **Feature Distillation**: 출력뿐 아니라 중간 특징도 모방.
- **Relation Distillation**: 샘플 간 관계를 전달.

**기법 4: 모델 컴파일과 그래프 최적화.**

학습한 모델을 "실행 그래프"로 변환하고 최적화한다.

**주요 도구**:

- **PyTorch의 `torch.compile` (PyTorch 2.0+)**: 한 줄로 모델을 컴파일. 10-30% 속도 향상 가능.
  ```python
  model = torch.compile(model)
  ```

- **TorchScript**: PyTorch 모델을 정적 그래프로 변환. C++ 환경에서 실행 가능.
  ```python
  traced_model = torch.jit.trace(model, example_input)
  traced_model.save('model.pt')
  ```

- **ONNX (Open Neural Network Exchange)**: 프레임워크 독립적 모델 포맷. PyTorch → ONNX → 다양한 런타임(ONNX Runtime, TensorRT).
  ```python
  torch.onnx.export(model, example_input, 'model.onnx')
  ```

- **TensorRT (NVIDIA)**: GPU 추론 최적화의 최고 성능. INT8 양자화, 커널 fusion 등 자동 적용. 2-10배 속도 향상.

- **OpenVINO (Intel)**: Intel CPU에서의 추론 최적화.

- **TFLite (TensorFlow Lite)**: 모바일/임베디드 환경의 추론 전용 런타임.

**선택 기준**:
- 연구 프로토타입: `torch.compile` (가장 간단)
- 서버 배포: ONNX Runtime 또는 TorchScript
- GPU 고성능 추론: TensorRT
- 모바일: TFLite 또는 CoreML
- 엣지 디바이스: ONNX Runtime, OpenVINO

**기법 5: 배치 처리와 병렬화.**

여러 입력을 한 번에 처리하여 GPU 활용도를 높인다.

**원칙**:
- **Batch 크기 증가**: 한 번의 forward pass로 많은 샘플 처리
- **Dynamic Batching**: 들어오는 요청을 일정 시간 대기 후 묶어서 처리
- **Pipeline Parallelism**: 여러 단계의 연산을 파이프라인화

**도구**:
- **Triton Inference Server** (NVIDIA): 동적 배칭, 여러 모델 동시 서빙
- **TorchServe**: PyTorch 모델 서빙
- **BentoML**: 모델 패키징과 배포의 일반 프레임워크

**기법 6: 효율적 아키텍처 선택.**

처음부터 효율적인 모델을 설계하면 나중의 최적화 부담이 줄어든다.

**효율적 아키텍처의 예시**:
- **MobileNet (v1/v2/v3)**: 모바일 특화 CNN, Depthwise Separable Convolution
- **EfficientNet**: Neural Architecture Search로 발견된 효율적 구조
- **SqueezeNet**: 작은 크기 지향
- **ShuffleNet**: 채널 셔플링으로 효율성
- **DistilBERT, TinyBERT**: 작은 Transformer
- **MobileViT**: 모바일용 Vision Transformer

이들은 표준 모델보다 10-100배 작으면서도 적절한 성능을 보인다. 연구 초기부터 "최종 배포"를 고려한다면 이런 아키텍처 계열로 시작한다.

**기법 7: 조건부 계산 (Conditional Computation).**

모든 입력에 같은 계산을 하지 말고, 입력에 따라 필요한 부분만 계산.

**예시**:
- **Early Exit**: 쉬운 입력은 얕은 층에서 종료. 어려운 입력만 깊게.
- **Mixture of Experts (MoE)**: 여러 전문가 중 관련 있는 것만 활성화. GPT-4, Mixtral 등에서 사용.
- **Dynamic Networks**: 입력의 난이도에 따라 네트워크 일부만 실행.

이것은 더 고급 기법이지만, 올바르게 구현하면 평균 속도가 크게 향상된다.

**추론 최적화의 체크리스트.**

모델을 최적화할 때 다음 순서로 시도한다.

<div class="highlight-box highlight-info">

**추론 최적화 실전 순서**

1. **프로파일링**: 어디가 병목인가? `torch.profiler`로 측정.
2. **FP16/BF16 변환**: 가장 쉬운 2-4배 속도 향상.
3. **`torch.compile` 적용**: 10-30% 추가 향상.
4. **불필요한 후처리 제거**: 모델 외부의 Python 코드 최적화.
5. **배치 크기 최적화**: 하드웨어에 맞는 크기 찾기.
6. **양자화 (INT8)**: 4배 크기 감소, 2-4배 속도 향상.
7. **가지치기 + 미세조정**: 추가 30-50% 크기 감소.
8. **지식 증류**: 더 작은 모델로 재학습.
9. **ONNX Runtime 또는 TensorRT**: 추가 속도 향상.
10. **아키텍처 재설계**: 처음부터 효율적 모델로 (최후 수단).

</div>

각 단계 후 정확도와 속도를 측정하여 트레이드오프를 본다.

**측정의 중요성.**

"최적화했다"고 말할 때 반드시 측정이 필요하다.

**측정할 지표**:
- **Latency**: 한 입력의 처리 시간 (평균, 중앙값, 99 percentile)
- **Throughput**: 초당 입력 수
- **Model Size**: 파일 크기, 메모리 사용량
- **Accuracy**: 최적화 전후 정확도 차이
- **Energy**: 전력 측정 도구 사용

**공정한 측정**:
- 같은 하드웨어에서 측정
- 워밍업 후 측정 (첫 몇 번의 실행은 제외)
- 여러 번 측정하여 평균과 분산
- 실제 데이터 분포에서 측정

논문에 추론 최적화를 보고할 때 이 지표들을 표로 제시한다. "우리 모델이 빠르다"는 주장이 숫자로 뒷받침되어야 한다.

**추론 최적화 논문 작성의 팁.**

추론 최적화를 연구 주제로 삼거나 논문에 포함할 때.

1. **Pareto Frontier 그리기**: 정확도와 속도(또는 크기)의 trade-off를 시각화. 방법이 Pareto frontier를 확장한다면 가치 있다.

2. **다양한 하드웨어에서 평가**: 한 GPU에서만 빠른 것은 우연일 수 있다. CPU, GPU, 모바일 등 여러 플랫폼에서 측정.

3. **실제 응용 시나리오 제시**: "이 최적화로 우리는 실제 자율주행 시스템에서 30fps를 30fps로 유지할 수 있었다"처럼 구체적 임팩트.

4. **코드 공개**: 최적화 연구는 재현성이 특히 중요. 최적화된 모델과 벤치마크 스크립트를 함께 공개.

**연구실 vs 산업체의 관점 차이.**

학계는 종종 "정확도 0.1% 향상"에 집중하지만, 산업체는 "정확도를 유지하면서 10배 빠르게"를 원한다. 연구가 산업 응용 가능성을 가지려면 후자의 관점을 일부 받아들여야 한다.

산학 협력 연구나 산업체 인턴십을 하면 이 관점을 직접 배울 수 있다. 순수 학계에만 있으면 이 감각을 놓치기 쉽다.

**오해: "학생은 학습만 잘하면 된다".**

많은 박사 학생이 "추론 최적화는 엔지니어의 일이고 나는 연구자다"라고 생각한다. 이것은 현대 ML 연구의 현실과 맞지 않다. 최근 많은 Top 학회 논문이 "효율성"을 주요 기여로 한다. EfficientNet, DistilBERT, MobileViT, Flash Attention 등. 추론 최적화는 이제 연구의 주류 주제 중 하나다.

학습 중심 연구를 하더라도, 최소한의 추론 최적화 지식은 갖추는 것이 유리하다. "이 모델이 배포 가능한가?"를 답할 수 있어야 한다.

> 추론 최적화는 학습과 연구의 부록이 아니라 핵심 기술의 하나다. 박사 과정 중 최소 한 번은 모델을 양자화하고, 가지치고, 증류해 본다. 이 경험이 연구를 "논문용 실험"에서 "실제 쓸 수 있는 시스템"으로 한 단계 올려준다. 학습 효율에 투자한 시간만큼 추론 효율에도 투자한다. 미래의 본인과 모델을 쓸 사람들이 감사할 것이다.

---

## 사전학습 모델 활용 — Hugging Face와 Transfer Learning의 실전

2020년대 중반 이후 딥러닝 연구의 지배적 패러다임은 "모델을 처음부터 학습"이 아니라 "사전학습(pre-trained) 모델을 문제에 fine-tuning"이다. 박사 연구에서 신경망을 밑바닥부터 학습하는 것이 시간 낭비일 수 있다. Hugging Face, timm, torchvision의 사전학습 모델이 출발점을 크게 높인다. 사전학습 모델을 효율적으로 활용하는 법을 학습해야 한다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>사전학습의 시대</strong></p>
    <p>ResNet, BERT, GPT, ViT, CLIP 같은 모델을 처음부터 학습하는 것은 수천 달러의 GPU 비용과 수주의 시간이 필요하다. 그리고 처음부터 학습해도 결과가 사전학습된 공개 모델보다 나쁘다. 이유는 사전학습 모델이 수백만-수십억 장의 이미지 또는 수백억 개의 토큰에서 학습되었고, 작은 박사 연구실의 데이터셋으로 같은 규모의 학습을 할 수 없기 때문이다. 사전학습 모델을 출발점으로 사용하면 박사 연구의 실험이 수백 배 빨라진다.</p>
  </div>
</div>

### 사전학습 모델의 4가지 활용 패턴

사전학습 모델을 박사 연구에 활용하는 4가지 주요 방식.

**패턴 1: Feature Extractor로 사용**

사전학습 모델의 레이어를 고정(freeze). 모델의 출력을 특성 벡터로 사용. 특성 벡터 위에 작은 분류기 (로지스틱 회귀, SVM)를 학습.

사용 조건:
- 데이터가 매우 작다 (100-1000 샘플).
- 컴퓨팅 자원이 제한적이다.
- 모델의 내부를 이해하고 싶을 때.

예시 (PyTorch):
```python
import torch
from torchvision.models import resnet50, ResNet50_Weights

# 사전학습 모델 로드
weights = ResNet50_Weights.IMAGENET1K_V2
model = resnet50(weights=weights)
model.eval()

# 마지막 FC 층을 Identity로 교체 (특성 추출)
model.fc = torch.nn.Identity()

# 본인의 데이터에 적용
with torch.no_grad():
    features = model(images)  # (batch, 2048) 특성 벡터

# 간단한 분류기 학습
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(max_iter=1000)
clf.fit(features.numpy(), labels.numpy())
```

장점: 학습이 빠르다. 과적합 위험이 적다.
단점: 정확도가 fine-tuning보다 낮을 수 있다.

**패턴 2: Fine-tuning (전체 또는 일부)**

사전학습 모델의 모든 또는 일부 레이어를 재학습. 작은 학습률로 신중하게.

Fine-tuning의 3가지 전략:

*전략 A: 전체 fine-tuning*
- 모든 레이어를 재학습.
- 학습률: 1e-4 ~ 1e-5 (사전학습된 것을 파괴하지 않기 위해 매우 작게).
- 데이터가 충분할 때 (수천-수만 샘플).

*전략 B: 마지막 N 레이어만 fine-tuning*
- 앞 레이어 고정, 마지막 N 레이어만 재학습.
- 계산 효율과 정확도의 절충.
- 데이터가 중간 크기 (수백-수천 샘플).

*전략 C: 계층적 학습률*
- 앞 레이어는 매우 작은 학습률, 뒤 레이어는 더 큰 학습률.
- 사전학습의 일반 특성을 보존하면서 특정 문제에 적응.

예시:
```python
# 전체 fine-tuning
from torch.optim import AdamW

model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V2)
# 마지막 FC 층을 클래스 수에 맞게 교체
model.fc = torch.nn.Linear(2048, num_classes)

optimizer = AdamW(model.parameters(), lr=1e-4, weight_decay=0.01)
# 본인의 표준 학습 루프
```

**패턴 3: Adapter와 LoRA (파라미터 효율적 fine-tuning)**

사전학습 모델의 파라미터를 고정하고 작은 새 파라미터(adapter)만 학습.

LoRA (Low-Rank Adaptation): 가중치 행렬 W를 작은 저차원 업데이트 ΔW = AB (A, B는 작은 행렬)로 표현. 전체 모델의 파라미터 중 0.1-1%만 학습.

사용 조건:
- 매우 큰 모델 (LLM, ViT-Large).
- GPU 메모리가 제한적.
- 여러 태스크에 같은 기본 모델을 사용 (각 태스크마다 작은 adapter).

예시 (Hugging Face PEFT):
```python
from transformers import AutoModelForSequenceClassification
from peft import LoraConfig, get_peft_model, TaskType

model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased")

lora_config = LoraConfig(
    task_type=TaskType.SEQ_CLS,
    r=8,  # LoRA rank
    lora_alpha=16,
    lora_dropout=0.1,
    target_modules=["query", "value"]
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# 예: trainable params: 294,912 || all params: 109,778,940 || trainable%: 0.27
```

장점: 메모리 사용이 크게 줄어든다. 여러 태스크에 효율적.
단점: 복잡도가 약간 증가.

**패턴 4: Zero-shot과 Prompting**

사전학습 모델을 학습 없이 바로 사용. 언어 모델(GPT, Claude)의 프롬프트로 원하는 결과를 유도.

사용 조건:
- 매우 큰 언어 모델 (GPT-4, Claude 4.5).
- 학습 데이터가 거의 없다.
- 빠른 프로토타이핑.

예시:
- 텍스트 분류를 GPT에 "다음 문장을 [A/B/C] 중 하나로 분류하라: {text}"라는 프롬프트로.
- 이미지 분류를 CLIP에 "a photo of a {class}" 같은 텍스트 프롬프트로.

장점: 학습 불필요. 즉시 사용 가능.
단점: 특화된 성능이 fine-tuning보다 낮을 수 있다.

### 사전학습 모델 선택 가이드

태스크에 맞는 사전학습 모델을 선택.

**이미지 분류**
- ResNet (고전, 강력한 baseline)
- ViT (Vision Transformer, 현대 표준)
- EfficientNet (효율적)
- ConvNeXt (최신 CNN)
- 선택: timm 라이브러리의 리더보드에서 사이즈/성능 균형을 본다.

**객체 탐지**
- YOLO 시리즈 (실시간)
- DETR (Transformer 기반)
- Mask R-CNN (세그멘테이션 포함)

**세그멘테이션**
- U-Net (의료, 공학)
- SegFormer (Transformer 기반)
- SAM (Segment Anything Model, 범용)

**자연어 처리**
- BERT, RoBERTa (이해 태스크)
- GPT, Llama, Mistral (생성 태스크)
- T5 (일반 텍스트-텍스트)

**시계열**
- Temporal Fusion Transformer (TFT)
- Time-Series Transformer
- Foundation Time Series Models (2024년 이후)

**멀티모달**
- CLIP (이미지-텍스트)
- BLIP (이미지 캡션)
- Flamingo (소수 샷)

**과학/공학**
- ChemBERTa (분자)
- MaterialsBERT (재료)
- GraphCast (기상)
- ClimaX (기후)
- ESMFold (단백질)

분야의 특화된 사전학습 모델이 있으면 먼저 확인.

### Hugging Face의 실전 활용

Hugging Face Hub는 수십만 개의 사전학습 모델을 제공하는 플랫폼. 박사 연구에 Hugging Face를 활용하는 법.

**단계 1: 모델 찾기**

Hugging Face Hub (huggingface.co/models)에서 태스크와 분야로 필터링. 다운로드 수와 최근 업데이트로 평판을 본다.

**단계 2: 모델 로드**

```python
from transformers import AutoModel, AutoTokenizer

model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)
```

모델의 문서(Model Card)를 먼저 읽기. 허가 조건, 학습 데이터, 성능 보고.

**단계 3: Dataset 활용**

```python
from datasets import load_dataset

dataset = load_dataset("imagenet-1k")
# 본인의 자동 다운로드와 캐싱
```

Hugging Face Datasets는 수천 개의 공개 데이터셋을 한 줄로 로드.

**단계 4: Trainer API**

```python
from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    learning_rate=2e-5,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)

trainer.train()
```

Trainer API가 학습 루프, 평가, 체크포인트 저장을 자동화.

**단계 5: 모델 공유**

박사 연구의 모델을 Hugging Face Hub에 공개.

```python
trainer.push_to_hub("my-thesis-model")
```

후속 연구자가 모델을 직접 사용할 수 있다. 박사 학위의 한 기여.

### 사전학습 모델 활용의 5가지 함정

**함정 1: Model Card를 읽지 않음**

모델의 Model Card를 읽지 않고 사용. 모델의 학습 데이터의 편향이 박사 연구의 결과에 영향. 모델의 라이선스를 위반할 수 있다.

방지: 모델 사용 전에 Model Card를 읽고, 학습 데이터, 편향, 라이선스를 확인. ch28(데이터셋 문서화)과 연결.

**함정 2: fine-tuning의 과적합**

작은 데이터로 큰 모델을 전체 fine-tuning. 모델이 훈련 데이터에 과적합. 사전학습의 일반 특성을 파괴.

방지: 작은 학습률, early stopping, 정규화 (weight decay, dropout), 계층적 fine-tuning.

**함정 3: 도메인 불일치**

사전학습 모델이 자연 이미지 (ImageNet)에서 학습. 박사 연구가 의료 영상 또는 위성 영상. 도메인 불일치로 transfer가 제한적.

방지: 도메인 특화 사전학습 모델을 우선. 분야의 논문에서 어떤 사전학습 모델이 사용되는지 조사.

**함정 4: 재현성 상실**

Hugging Face의 한 모델 버전을 사용. 6개월 후 모델이 업데이트되어 결과가 달라진다. 박사 논문의 재현이 어렵다.

방지: 특정 모델 revision을 명시.
```python
model = AutoModel.from_pretrained("bert-base-uncased", revision="abc123")
```
revision 해시를 박사 논문에 명시.

**함정 5: 상업적 사용의 금지를 놓침**

일부 모델 (특히 LLM)이 비상업적 사용만 허용. 박사 논문 후에 모델을 상업적으로 사용하려 하면 라이선스 위반.

방지: 라이선스를 미리 확인. 상업적 사용 가능한 모델 (Apache, MIT) 우선. 불확실하면 학교의 법률 자문.

---

## 사전학습 시대의 박사 연구의 기여

"사전학습 모델을 사용한다면 박사 기여가 무엇인가?"라고 자신에게 물을 수 있다. 답은 기여가 모델 자체가 아니라 "모델을 적용하는 방식"에 있다는 것이다.

### 사전학습 시대의 5가지 박사 기여 방식

**방식 1: 새 태스크에 적용**

사전학습 모델을 분야의 아직 시도되지 않은 태스크에 적용. "BERT를 콘크리트 균열 예측에", "CLIP을 재료 특성 예측에" 같은 적용이 박사 기여.

**방식 2: Fine-tuning 전략의 개선**

특정 태스크에 효과적인 fine-tuning 전략을 개발. "의료 영상에 계층적 LoRA가 전체 fine-tuning보다 나은 이유" 같은 연구.

**방식 3: 도메인 특화 사전학습**

분야의 데이터로 새 사전학습 모델을 학습. "재료 과학용 BERT", "건설 도면용 ViT". 새 사전학습 모델이 분야의 한 자원이 된다.

**방식 4: 평가와 벤치마킹**

여러 사전학습 모델을 분야의 표준 벤치마크에서 체계적으로 비교. 결과가 분야의 모델 선택 가이드가 된다.

**방식 5: 이론적 분석**

사전학습 모델의 내부 (attention 패턴, 특성 표현)를 분석. "ViT의 어떤 층이 재료 구조를 이해하는가" 같은 연구.

### 박사 논문의 사전학습 모델 섹션

박사 논문에 사전학습 모델의 사용을 명시.

**명시할 항목**:
- 모델 이름과 버전 (revision 해시)
- 사전학습 데이터의 소스
- fine-tuning 전략 (전체/부분/LoRA/zero-shot)
- 하이퍼파라미터
- fine-tuning 데이터
- baseline 비교 (처음부터 학습 vs 사전학습 사용)
- 라이선스

명시가 박사 논문의 투명성과 재현성을 보장. ch38(오픈 사이언스)과 연결.

---

## 마지막 — 사전학습 시대의 박사 연구의 새 균형

박사 과정에서 "모든 것을 밑바닥부터 학습해야 한다"는 과거의 믿음을 내려놓는다. 사전학습 모델이 도구라는 것을 인정한다. 박사 연구의 기여가 모델을 어떻게 활용하는가에 있다.

박사 1-2년차에 사전학습 모델의 활용을 배운다. Hugging Face Transformers, timm, torchvision의 튜토리얼을 완성. 박사 중반에 여러 사전학습 모델을 비교. 박사 후반에 분야의 고유한 적용을 만든다.

사전학습 모델이 박사의 기여를 감소시키지 않는다. 기여의 위치를 이동시킨다. 박사 졸업 시점에 사전학습 모델의 전문가이면서 분야의 고유한 적용의 주인공이 된다. 박사 학위가 "모델을 만든 사람"이 아니라 "모델을 분야에 가져온 사람"의 증거가 된다.

## 자기지도학습(Self-Supervised Learning) — 라벨 없는 데이터의 활용

공학 연구의 가장 큰 데이터 한계는 "라벨이 없다"는 것이다. 센서는 하루에 수백만 개의 측정을 쏟아낸다. 현장의 카메라는 수십만 장의 이미지를 찍는다. 그러나 이것을 사람이 라벨링하는 데는 한계가 있다. 대부분의 데이터는 라벨 없이 쌓이고, ML 모델에 쓰이지 못한다. **자기지도학습(Self-Supervised Learning, SSL)**은 이 "잠자고 있는" 데이터를 활용하는 방법이다. 라벨 없이 데이터 자체로부터 유용한 표현을 학습한다. 최근 몇 년간 급격히 발전했고, 공학 응용에서 게임 체인저가 될 가능성이 크다. 그러나 많은 공학 박사생이 SSL을 잘 모른다. 이 섹션은 공학 박사의 관점에서 SSL의 실전 적용을 다룬다.

<div class="highlight-box highlight-important">

**"라벨 없는 데이터는 자산이 아니라 부채"라는 낡은 생각을 버려라.** 수천만 장의 센서 이미지, 수백만 시간의 진동 신호, 수십 년의 측정 데이터가 연구실에 쌓여 있다. 라벨이 없어서 쓸 수 없다고 생각했다. 그러나 SSL은 이 데이터를 그대로 사용할 수 있게 만든다. 라벨링 비용 없이 모델의 출발점을 크게 개선할 수 있다. 박사 중반부터 SSL을 탐색하는 것이 연구의 새 기반이 될 수 있다.

</div>

**자기지도학습의 핵심 아이디어.**

SSL의 기본 원리는 단순하다. "라벨이 없다면 데이터 자체에서 라벨을 만들자."

**예시 — 이미지에서의 SSL**:
- 이미지의 일부를 지우고, 모델에게 지워진 부분을 복원하게 학습
- 같은 이미지의 다른 변형(회전, 자르기)들이 "같은 것"임을 학습
- 이미지의 순서를 섞고, 원래 순서를 복원하게 학습

**예시 — 시계열에서의 SSL**:
- 시계열의 일부를 마스킹하고, 마스킹된 부분을 예측
- 미래 시점을 현재 시점으로 예측
- 두 다른 시점을 "같은 시계열의 일부"로 인식

이런 "pretext task"(가짜 과제)로 모델이 데이터의 유용한 표현을 학습한다. 그 후 작은 라벨 데이터셋으로 실제 과제에 fine-tune.

**결과**: 라벨 없는 100,000개 + 라벨 있는 1,000개가 라벨 있는 10,000개보다 좋은 성능. 공학 응용에서 엄청난 이익.

**SSL의 3가지 주요 패러다임.**

현대 SSL은 크게 세 가지 접근으로 나뉜다.

**패러다임 1: Generative (생성적)**.
데이터의 일부를 가리고 복원. 이미지, 텍스트, 시계열 모두에 적용 가능.

**대표 방법**:
- **MAE (Masked Autoencoder)**: 이미지의 75%를 마스킹하고 복원. ViT 기반. 간단하고 효과적.
- **BERT**: 텍스트의 15% 단어를 마스킹하고 예측. NLP의 기초.
- **Masked Signal Modeling**: 시계열이나 신호에 적용한 변형.

**장점**: 단순, 이해하기 쉬움, 구현 용이.
**단점**: 작은 세부까지 복원해야 해서 불필요한 정보도 학습.

**패러다임 2: Contrastive (대조적)**.
"같은 것"과 "다른 것"의 표현을 구분하게 학습.

**원리**: 한 이미지의 두 변형(회전, 자르기 등)은 "같은 것", 다른 이미지는 "다른 것". 모델이 같은 것은 가깝게, 다른 것은 멀게 임베딩하도록 학습.

**대표 방법**:
- **SimCLR**: 대조 학습의 선구자. 강한 데이터 증강 사용.
- **MoCo (Momentum Contrast)**: 큰 "queue"로 더 많은 negative 샘플 활용.
- **BYOL**: Negative 없이도 작동. 단순하지만 효과적.
- **SimSiam**: 더 단순화한 버전.

**장점**: 의미 있는 표현 학습. 특히 이미지에서 강력.
**단점**: 데이터 증강 설계가 중요. 배치 크기에 민감.

**패러다임 3: Self-Distillation (자기 증류)**.
하나의 모델이 자신의 과거 버전이나 변형된 버전을 "교사"로 삼음.

**대표 방법**:
- **DINO**: ViT에 자기 증류. 매우 강력한 이미지 표현.
- **DINOv2**: DINO의 개선판. 2023년 기준 최강 이미지 SSL.
- **I-JEPA**: 이미지 영역을 예측하는 방식. Meta AI의 접근.

**장점**: 대조 학습보다 단순. 강력한 표현.
**단점**: 수학적 이해가 까다로움.

**공학 응용의 SSL 선택 가이드.**

공학 문제에 어떤 SSL을 쓸 것인가.

**상황 1: 이미지 데이터 (결함, 미세구조, 현장)**.
- **권장**: DINOv2 pretrained model 활용 → 본인 데이터로 linear probe 또는 fine-tune
- **대안**: MAE를 본인 데이터로 처음부터 학습 (시간 있으면)
- **이유**: 이미지 SSL은 가장 성숙한 영역

**상황 2: 시계열 데이터 (센서, 진동)**.
- **권장**: TS2Vec, TNC, 또는 MAE의 시계열 버전
- **대안**: Transformer + BERT 스타일 마스킹
- **이유**: 시계열 SSL은 아직 성숙 중이지만 빠르게 발전

**상황 3: 3D 데이터 (point cloud, 메쉬)**.
- **권장**: Point-BERT, Point-MAE
- **대안**: 3D에 적용한 Contrastive 방법
- **이유**: 3D SSL은 비교적 새로운 영역

**상황 4: 그래프 데이터 (분자, 네트워크)**.
- **권장**: GraphCL, GraphMAE
- **이유**: 그래프 SSL은 특수 도메인

**상황 5: 시뮬레이션 데이터 (PDE 솔루션)**.
- **권장**: 아직 표준이 없음. MAE 변형을 직접 구현
- **참고**: 2024년 이후 이 영역의 논문이 빠르게 늘고 있다

**공학 데이터의 SSL 전처리.**

공학 데이터의 특수성에 맞는 전처리가 필요하다.

**1. 정규화의 중요성**:
- 물리 단위의 값을 0-1 또는 표준화된 값으로
- SSL이 데이터 스케일에 민감

**2. 증강의 물리적 유효성**:
- 이미지 SSL의 표준 증강(회전, 색 변경)이 본인 데이터에 의미 있는가?
- 재료 미세구조는 회전에 불변일 수 있지만, 일부 결함은 방향이 중요
- 물리적으로 "말이 되는" 증강만 사용

**3. 마스킹 비율의 조정**:
- 이미지 MAE는 75% 마스킹이 기본
- 본인 데이터에 따라 조정 필요 (정보 밀도가 다를 수 있음)

**4. 배치 크기의 중요성**:
- Contrastive SSL은 큰 배치가 필요 (256-1024)
- GPU 메모리 부족 시 MoCo 같은 queue 기반 방법
- 또는 DINO/BYOL 같은 negative 없는 방법

**5. 도메인 지식의 주입**:
- 물리 제약을 pretext task에 포함 가능
- 예: 시계열의 "다음 값"이 아닌 "다음 값의 물리적 미분"을 예측
- 이것이 pure SSL보다 공학에서 더 효과적일 수 있음

**SSL의 실전 단계.**

SSL을 처음 시도할 때의 단계.

**단계 1: 사전학습 모델 활용 (2-4주)**.
먼저 공개된 SSL 사전학습 모델(DINOv2, MAE)을 본인 데이터에 적용. Fine-tune 또는 linear probe.

**기대 결과**: 이미 학습된 강력한 표현이 본인 문제에 얼마나 도움되는지 평가. 처음부터 학습하는 것보다 10-100배 빠르게 시작.

**단계 2: 작은 SSL 실험 (1-2개월)**.
본인 데이터 일부로 간단한 SSL 구현. MAE 또는 SimCLR가 시작으로 좋다.

**기대 결과**: SSL의 내부 작동 이해. 본인 데이터의 특성 파악.

**단계 3: 본격 SSL 사전학습 (3-6개월)**.
전체 라벨 없는 데이터로 SSL 사전학습. 그 후 실제 과제에 fine-tune.

**기대 결과**: "공학 분야의 사전학습 모델"을 만듦. 이것 자체가 박사 기여.

**단계 4: 새 SSL 방법의 제안 (6-12개월)**.
도메인에 특화된 SSL 방법 개발. 물리 제약, 도메인 지식을 결합.

**기대 결과**: SSL 방법론의 논문. 분야에 새 접근.

**박사 과정에서 단계 1-3이 현실적 목표. 단계 4는 박사 후반이나 포닥에서.**

**SSL의 평가 — 얼마나 잘 학습했는가**.

SSL은 직접 평가가 어렵다. "라벨 없이 학습"이므로 "정답"이 없다. 간접 평가.

**평가 방법 1: Linear Probe**.
SSL로 학습한 특성 추출기를 고정하고, 그 위에 간단한 선형 분류기만 학습. 이 분류기의 성능이 SSL 표현의 품질을 나타냄.

**평가 방법 2: Fine-tuning**.
전체 모델을 작은 라벨 데이터셋으로 fine-tune. 성능이 randomly initialized 모델 대비 얼마나 좋은가.

**평가 방법 3: k-NN**.
SSL 특성으로 k-nearest neighbors 분류. 단순하지만 빠른 평가.

**평가 방법 4: Transfer Learning**.
SSL로 학습한 모델을 여러 다른 작업에 전이. 전이 성능이 SSL 표현의 일반성을 나타냄.

**평가 방법 5: 시각화**.
t-SNE, UMAP으로 특성 공간을 2D로 시각화. 의미 있는 클러스터가 형성되는가.

**공학 박사 논문의 보고**: 이 중 2-3가지를 조합해서 SSL의 품질을 입증. 단일 평가는 부족.

**SSL의 5가지 함정.**

**함정 1: "대충 구현"**.
SSL 논문의 세부를 무시하고 대충 구현. 학습률, 배치 크기, 증강 순서가 결과에 크게 영향. 논문을 정확히 따르거나 검증된 구현을 사용.

**함정 2: 너무 작은 데이터**.
SSL은 "많은 데이터"가 필수. 1,000개 미만으로는 효과가 제한적. 최소 10,000개 이상.

**함정 3: 도메인 불일치**.
ImageNet으로 학습한 SSL 모델을 재료 이미지에 그대로 사용. 도메인 격차가 크면 전이가 잘 안 됨.
**해결**: 본인 데이터로 추가 SSL 학습 (continued pretraining).

**함정 4: 너무 긴 사전학습**.
SSL에 몇 달을 쓰느라 다른 연구가 멈춤. SSL은 수단이지 목적이 아님. 목표 과제의 성능이 중요.

**함정 5: 평가의 편향**.
SSL이 좋은 것으로 증명하고 싶어서 특정 평가만 보고. 여러 관점의 평가가 필요.

**박사 논문에서의 SSL 활용.**

SSL을 박사 논문의 어디에 위치시킬 것인가.

**옵션 1: 데이터 전처리 챕터**.
"데이터에 SSL로 사전학습한 모델을 사용" 수준. 핵심 기여는 아니지만 결과 개선.

**옵션 2: 방법론 챕터의 한 섹션**.
"접근은 SSL 사전학습 + 특정 fine-tune"의 형태. 방법론의 한 부분.

**옵션 3: 독립적 기여**.
"분야에 특화된 SSL 방법"을 제안. 박사의 한 챕터 또는 별도 논문.

**옵션 4: 박사 전체의 주제**.
박사 전체가 SSL 관련. "공학 분야의 SSL" 같은 주제.

박사 시점과 SSL에 투자 가능한 시간에 따라 옵션 선택.

**라벨 없는 데이터의 재발견 — 연구실의 자산**.

많은 연구실에 "버려진" 라벨 없는 데이터가 있다. 이것을 SSL로 활용하는 것이 박사 기여가 될 수 있다.

**연구실에서 찾아볼 것**:
1. 과거 프로젝트의 센서 데이터 (라벨 없이 수집됨)
2. 논문에 안 쓰인 실험 데이터
3. 시뮬레이션 데이터셋 (일부만 논문에 사용)
4. 학부 수업의 실험 데이터
5. 산업 파트너에게 받았지만 활용 안 된 데이터

**과거 데이터 탐색 전략**:
- 선배에게 물어보기
- 연구실의 오래된 하드 드라이브 탐색
- 발표 자료에 있는 데이터의 출처 추적
- 산업체 협력의 비밀 해제 확인

**주의**: 데이터 사용 권한 확인. 일부 데이터는 계약상 원래 목적 외 사용 불가.

**SSL과 Foundation Models의 경계**.

2023-2026년의 트렌드는 SSL로 학습된 "Foundation Model"이다. 거대한 라벨 없는 데이터로 거대한 모델 학습.

**공학 분야의 Foundation Model 예시**:
- **MatBERT**: 재료 과학 텍스트
- **ClimaX**: 기후 데이터
- **ChemBERTa**: 화학
- **BioBERT**: 생명과학

**박사 과정에서의 의미**:
1. 이 모델들을 활용하는 것이 첫 단계 (fine-tune)
2. 분야에 맞는 Foundation Model 만들기는 큰 프로젝트 (박사 전체)
3. 작은 분야 특화 SSL 모델은 박사 중반에 가능

상황에 맞는 스케일 선택이 중요.

**자원과 학습 리소스**.

**논문**:
- He et al., "Masked Autoencoders Are Scalable Vision Learners" (2022) — MAE
- Chen et al., "A Simple Framework for Contrastive Learning" (2020) — SimCLR
- Caron et al., "Emerging Properties in Self-Supervised ViT" (2021) — DINO
- Oquab et al., "DINOv2" (2023) — 최강 이미지 SSL
- Devlin et al., "BERT" (2018) — NLP SSL의 시작

**도구**:
- **PyTorch Lightning**: SSL 구현의 편리성
- **timm**: 이미지 모델 라이브러리
- **Hugging Face Transformers**: NLP와 시계열
- **Lightly**: SSL 전용 라이브러리
- **VISSL (Meta)**: 비전 SSL 프레임워크

**튜토리얼**:
- "The Illustrated Self-Supervised Learning" 블로그
- Lightly의 공식 튜토리얼
- Papers with Code의 SSL 벤치마크

**실천 가이드**.

1. **라벨 없는 데이터 목록 작성** (1주)
2. **공개 SSL 모델로 실험** (2주): DINOv2, MAE pretrained
3. **작은 SSL 실험** (1개월): MAE 구현 또는 SimCLR
4. **본인 데이터로 사전학습** (2-3개월): 도메인 모델 만들기
5. **평가와 비교** (1개월): 여러 방법 비교
6. **논문 작성** (1-2개월): 박사의 한 기여

이 시간표는 박사 중반에 1-2년을 SSL에 투자하는 현실적 계획.

**SSL의 미래와 박사 전략**.

SSL은 2020-2026년에 급격히 성장했고, 앞으로 더 발전할 것이다.

**예상되는 트렌드**:
1. 더 거대한 Foundation Model
2. 여러 모달(이미지 + 텍스트 + 센서)의 통합
3. 소규모 도메인 특화 SSL
4. 효율적 SSL (적은 계산으로 좋은 표현)
5. 해석 가능한 SSL 표현

**박사생의 전략**:
- 트렌드를 따라가되 도메인에 집중
- "거대 모델 경쟁"에 참여하지 말고 "분야 특화 적용"에 투자
- 박사 후반에도 SSL은 발전 중. 평생 학습 필요

> 자기지도학습은 공학 ML 박사에게 새로운 가능성을 연다. 라벨링의 병목을 우회하고, 축적된 데이터를 활용하고, 분야에 특화된 사전학습 모델을 만들 수 있다. 박사 중반부터 SSL을 탐색하는 것이 늦지 않다. 오히려 도메인 지식을 활용할 수 있는 기회다. SSL은 "자료만 많으면 되는 기술"이 아니라 "올바른 pretext task의 설계가 필요한 기술"이다. 공학 문제에 맞는 pretext를 설계하는 것이 박사 기여가 될 수 있다.

## Graph Neural Networks — 관계 데이터의 딥러닝

전통 딥러닝은 **고정된 구조**의 데이터를 다룬다. CNN은 격자 (이미지), RNN은 시퀀스 (텍스트). 그러나 공학 연구의 많은 데이터가 **그래프**다. 분자 (원자와 결합), 소셜 네트워크 (사람과 관계), 전력망 (노드와 전선), 구조물 (부재와 연결), 교통 네트워크, 배관망. 이런 데이터에 CNN이나 RNN을 적용하려면 강제로 격자나 시퀀스로 변환해야 하고, 이 과정에서 정보 손실이 크다. **Graph Neural Networks (GNN)**은 그래프 구조를 직접 다루는 딥러닝이다. 2017년 이후 급속히 발전했고, 공학 분야에 점점 중요해지고 있다. 그러나 대부분의 ML 교과서는 CNN과 Transformer에만 집중한다. 이 섹션은 공학 박사생에게 GNN의 기초를 소개한다.

<div class="highlight-box highlight-important">

**"그래프는 공학의 자연스러운 표현이다".** 공학 문제를 생각해보자. 분자의 성질, 구조물의 응력, 회로의 전압, 배관망의 압력. 이 모든 것이 그래프로 표현된다. 그런데 CNN을 쓰려고 하면 그래프를 억지로 이미지로 변환해야 한다. 손실과 비효율의 원천이다. GNN은 이 자연스러운 표현을 직접 다룬다. 공학 박사생이 GNN을 모르면 분야의 많은 문제를 접근할 도구가 부족한 것이다.

</div>

**그래프의 기본 개념**.

GNN을 이해하려면 먼저 그래프의 기본.

**정의**: 그래프 $G = (V, E)$
- $V$: 노드 (vertices) 집합
- $E$: 엣지 (edges) 집합. 노드 간 연결.

**노드의 특성**: 각 노드가 특성 벡터 $x_v$
- 분자: 원자 유형, 전하
- 구조물: 부재 유형, 재료
- 소셜: 사용자 프로필

**엣지의 특성**: 각 엣지도 특성을 가질 수 있음
- 분자: 결합 유형 (단일, 이중, 삼중)
- 구조물: 연결 강도
- 소셜: 관계 유형

**그래프의 유형**:
- **방향/무방향**: 엣지의 방향성
- **가중치/비가중치**: 엣지의 중요도
- **정적/동적**: 시간에 따른 변화
- **균질/이질**: 노드/엣지 유형의 다양성

**예시 — 분자**:
```
H     H
 \   /
  C=C
 /   \
H     H
```
- 노드: 6개 (C 2개, H 4개)
- 엣지: 5개 (C-C 이중, 4개의 C-H 단일)
- 노드 특성: 원자 번호, 전자 수 등
- 엣지 특성: 결합 유형

**공학에서의 그래프 예시**:
- **구조 해석**: 노드 = 절점, 엣지 = 부재
- **배관망**: 노드 = 밸브/펌프, 엣지 = 파이프
- **교통**: 노드 = 교차로, 엣지 = 도로
- **전력망**: 노드 = 변전소, 엣지 = 송전선
- **분자 동역학**: 노드 = 원자, 엣지 = 결합
- **CAD 모델**: 노드 = 특징 (면, 모서리), 엣지 = 인접성

**GNN의 핵심 아이디어 — 메시지 전달**.

GNN의 기본 작동 원리.

**개념**: 각 노드가 이웃 노드로부터 "메시지"를 받고, 그 메시지들을 종합해 표현을 업데이트.

**수학적 표현 (한 레이어)**:
$$
h_v^{(l+1)} = \text{UPDATE}\left(h_v^{(l)}, \text{AGGREGATE}\left(\{h_u^{(l)} : u \in \mathcal{N}(v)\}\right)\right)
$$

여기서:
- $h_v^{(l)}$: 레이어 $l$에서 노드 $v$의 표현
- $\mathcal{N}(v)$: 노드 $v$의 이웃
- AGGREGATE: 이웃의 표현을 종합 (sum, mean, max 등)
- UPDATE: 자신의 표현과 종합된 이웃을 결합

**반복**: 여러 레이어를 쌓으면 각 노드가 더 멀리까지의 정보를 받음.
- 1 레이어: 직접 이웃
- 2 레이어: 이웃의 이웃
- k 레이어: k-hop 이웃

**최종**: 각 노드가 주변 그래프 구조를 반영한 표현을 가짐.

**이 메시지 전달이 GNN의 본질**. 구체적 구현은 AGGREGATE와 UPDATE의 선택에 따라 다르다.

**주요 GNN 변형**.

GNN의 대표 아키텍처들.

**변형 1: Graph Convolutional Network (GCN)**.
Kipf & Welling (2017).

**공식**:
$$
h_v^{(l+1)} = \sigma\left(\sum_{u \in \mathcal{N}(v) \cup \{v\}} \frac{1}{\sqrt{|\mathcal{N}(v)||\mathcal{N}(u)|}} W^{(l)} h_u^{(l)}\right)
$$

**아이디어**: 이웃의 가중 평균. 정규화로 도수 (degree)의 영향 조정.

**장점**: 간단, 효과적, 많은 연구의 기준.
**단점**: 모든 이웃을 동등하게 처리.

**변형 2: Graph Attention Network (GAT)**.
Veličković et al. (2018).

**아이디어**: 각 이웃에 다른 attention weight. 어떤 이웃이 더 중요한지 학습.

**공식** (단순화):
$$
\alpha_{uv} = \text{softmax}(a(h_u, h_v))
$$
$$
h_v^{(l+1)} = \sigma\left(\sum_u \alpha_{uv} W h_u\right)
$$

**장점**: 이웃의 중요도 구분. 해석 가능.
**단점**: 더 많은 파라미터.

**변형 3: GraphSAGE**.
Hamilton et al. (2017).

**아이디어**: 이웃을 샘플링 (모두 사용 안 함). 큰 그래프에 적합.

**장점**: 확장성. 본 적 없는 그래프에도 적용 (inductive).
**단점**: 샘플링 전략 선택.

**변형 4: Message Passing Neural Network (MPNN)**.
Gilmer et al. (2017).

**아이디어**: 메시지 전달의 일반화. 엣지 특성 포함.

**장점**: 유연성. 분자 특성 예측의 기준.
**단점**: 계산 비용.

**변형 5: Graph Isomorphism Network (GIN)**.
Xu et al. (2019).

**아이디어**: 그래프 구조의 구분력 최대화. 이론적 기반.

**장점**: 그래프 분류에 강력.
**단점**: 구현 주의.

**변형 6: Graph Transformers**.
최근 트렌드. Transformer의 attention을 그래프에.

**장점**: 긴 거리 의존성 포착.
**단점**: 큰 그래프에 비효율.

**선택의 원칙**: 문제에 맞는 변형. 처음에는 GCN 또는 GAT.

**GNN의 주요 작업 유형**.

GNN으로 할 수 있는 작업들.

**작업 1: 노드 분류 (Node Classification)**.
각 노드의 클래스 예측.

**예시**:
- 소셜 네트워크의 사용자 카테고리
- 단백질 네트워크의 기능 예측
- 분자의 원자 유형 예측
- 구조물의 손상된 부재 식별

**출력**: 각 노드에 대한 클래스.

**작업 2: 엣지 예측 (Link Prediction)**.
두 노드 사이의 엣지 존재 여부.

**예시**:
- 소셜 네트워크의 친구 추천
- 분자 간 상호작용 예측
- 배관망의 누수 연결 예측
- 지식 그래프의 관계 완성

**출력**: 엣지의 확률.

**작업 3: 그래프 분류 (Graph Classification)**.
전체 그래프의 클래스.

**예시**:
- 분자의 독성/약효
- 화학 화합물의 용해도
- 단백질의 기능
- 회로의 기능 분류

**출력**: 전체 그래프에 대한 클래스.

**작업 4: 그래프 회귀 (Graph Regression)**.
전체 그래프의 연속 값.

**예시**:
- 분자의 끓는점, 용해도
- 구조물의 고유 진동수
- 회로의 총 전력 소비

**출력**: 연속 값.

**작업 5: 노드 회귀 (Node Regression)**.
각 노드의 연속 값.

**예시**:
- 구조물 각 부재의 응력
- 배관망 각 노드의 압력
- 각 원자의 화학적 쉬프트

**출력**: 각 노드의 값.

**작업 6: 그래프 생성 (Graph Generation)**.
새 그래프 생성.

**예시**:
- 새 분자 설계 (신약)
- 새 촉매 구조
- 새 회로 토폴로지

**출력**: 그래프 구조.

공학 문제가 어느 유형인지 먼저 파악.

**공학에서의 GNN 응용**.

공학 분야의 구체적 응용 사례.

**응용 1: 재료 과학**.
- **MatBench**: 재료 특성 예측
- **결정 구조**: 격자로부터 성질
- **합금 설계**: 조성 최적화
- **촉매**: 반응 예측

**주요 논문**: "Crystal Graph Convolutional Neural Networks" (Xie & Grossman, 2018)

**응용 2: 화학**.
- **분자 특성 예측**: 용해도, 독성, ADMET
- **반응 예측**: 생성물
- **역합성 (Retrosynthesis)**: 합성 경로 설계
- **약물 발견**: 단백질-리간드 상호작용

**주요 연구**: Google DeepMind의 AlphaFold, AlphaFold-Multimer.

**응용 3: 구조 공학**.
- **손상 탐지**: 구조물의 손상 위치
- **응력 예측**: 유한 요소 대체
- **최적 설계**: 트러스 최적화
- **동적 거동**: 진동 예측

**장점**: 복잡한 구조를 격자 없이 직접 처리.

**응용 4: 유체역학**.
- **CFD 대체**: 속도와 압력 예측
- **메쉬 적응**: 적응적 격자 생성
- **난류 모델링**: 격자 기반 대체

**주요 논문**: "Learning Mesh-Based Simulation with Graph Networks" (Pfaff et al., 2021)

**응용 5: 전력 시스템**.
- **전력 흐름 계산**: 전통 방법의 대체
- **고장 예측**: 네트워크의 취약점
- **수요 예측**: 지역적 패턴
- **전력망 안정성**: 대규모 해석

**응용 6: 교통**.
- **교통 예측**: 네트워크의 혼잡
- **경로 계획**: 최적 경로
- **사고 예측**: 위험 지점

**응용 7: 로봇 공학**.
- **다중 로봇 제어**: 그래프로 표현된 로봇 팀
- **조작 계획**: 객체 간 관계

**이 응용들이** 박사 연구의 영감이 될 수 있다.

**GNN의 특수한 도전**.

GNN은 표준 딥러닝과 다른 문제들이 있다.

**도전 1: 그래프 크기의 다양성**.
배치의 그래프들이 다른 크기. CNN은 이미지가 같은 크기지만, 그래프는 가변.

**해결**: PyTorch Geometric의 `Batch` 객체. 여러 그래프를 하나의 큰 그래프로 연결.

**도전 2: 순열 불변성 (Permutation Invariance)**.
노드 번호가 바뀌어도 그래프는 같음. 출력이 순서와 무관해야.

**해결**: Sum, Mean, Max 같은 permutation-invariant 집계 함수 사용.

**도전 3: 과평활화 (Over-smoothing)**.
레이어가 너무 많으면 모든 노드의 표현이 비슷해짐. 구분력 상실.

**해결**:
- 레이어 수 제한 (보통 2-4)
- Residual connections
- Jumping knowledge
- PairNorm 같은 정규화

**도전 4: 확장성**.
큰 그래프 (수백만 노드)에서 느림.

**해결**:
- 서브그래프 샘플링 (GraphSAGE)
- 미니배치 학습
- 클러스터 기반 (ClusterGCN)
- 분산 훈련

**도전 5: 동적 그래프**.
시간에 따라 변하는 그래프.

**해결**: Temporal GNN. TGN, JODIE 등.

**도전 6: 이질 그래프 (Heterogeneous)**.
여러 유형의 노드와 엣지.

**해결**: Heterogeneous GNN. HGT, HAN 등.

**문제가 어느 도전에 해당하는지** 파악하고 적절한 기법 선택.

**GNN 라이브러리**.

GNN 구현의 주요 도구.

**PyTorch Geometric (PyG)**:
- PyTorch 기반
- 가장 널리 쓰임
- 많은 예시와 데이터셋
- 활발한 커뮤니티

**Deep Graph Library (DGL)**:
- PyTorch/TensorFlow 모두 지원
- 분산 훈련 강점
- AWS 지원

**Spektral**:
- TensorFlow/Keras 기반
- Keras 스타일의 간결함

**Graph Nets (DeepMind)**:
- 가장 오래된 라이브러리 중 하나
- Meta-learning에 강점

**권장**: PyTorch Geometric으로 시작. 가장 많은 자료.

**PyTorch Geometric 예시**:
```python
import torch
from torch_geometric.data import Data
from torch_geometric.nn import GCNConv

# 간단한 그래프 정의
edge_index = torch.tensor([[0, 1, 1, 2],
                           [1, 0, 2, 1]], dtype=torch.long)
x = torch.tensor([[1, 0], [0, 1], [1, 1]], dtype=torch.float)
data = Data(x=x, edge_index=edge_index)

# GCN 모델
class GCN(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = GCNConv(2, 16)
        self.conv2 = GCNConv(16, 2)

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index).relu()
        x = self.conv2(x, edge_index)
        return x

model = GCN()
out = model(data.x, data.edge_index)
```

이것이 GNN의 "Hello World"다. 간단하지만 강력.

**공학 GNN 연구의 시작**.

공학 문제에 GNN을 적용하기 시작.

**단계 1: 문제를 그래프로 변환**.
데이터를 그래프로 어떻게 표현할까?
- 노드는 무엇?
- 엣지는 무엇?
- 노드 특성은?
- 엣지 특성은?

**예시**: 교량 손상 예측
- 노드: 교량의 각 부재 (보, 기둥, 슬래브)
- 엣지: 부재 간 연결
- 노드 특성: 부재 유형, 재료, 치수, 센서 측정
- 엣지 특성: 연결 강도
- 목표: 각 부재의 손상 상태 (노드 분류)

**단계 2: 데이터셋 준비**.
PyTorch Geometric의 `Data` 또는 `Dataset` 클래스로.

**단계 3: 간단한 모델로 시작**.
GCN 2-3 레이어. 복잡한 것 금지.

**단계 4: 훈련과 평가**.
표준 ML 파이프라인 적용.

**단계 5: 비교**.
- 표준 ML (노드 특성만)
- GNN (노드 + 구조)
- 결과 비교

**단계 6: 개선**.
- 다른 GNN 변형 (GAT, SAGE)
- 레이어 수 조정
- 특성 공학

**이 프로세스가 GNN 연구의 기본 사이클**이다.

**GNN의 물리 기반 확장**.

공학에서 특히 흥미로운 영역: 물리와 GNN의 결합.

**Graph Network-based Simulators (GNS)**:
물리 시뮬레이션을 GNN으로.

**예시 — 유체 시뮬레이션**:
- 노드: 유체 입자
- 엣지: 가까운 입자 쌍
- 노드 특성: 위치, 속도
- 학습: 다음 시간 단계의 위치

**결과**: 전통 방법보다 빠르고 학습 가능.

**Equivariant GNN**:
물리 대칭 (회전, 이동 불변)을 모델에 내장.

**예시**: 분자의 3D 구조 예측. 회전해도 에너지는 같아야.

**주요 논문**:
- "Learning to Simulate Complex Physics with Graph Networks" (Sanchez-Gonzalez et al., 2020)
- "E(3) Equivariant Graph Neural Networks" (Satorras et al., 2021)

**박사 기회**: 물리 문제에 GNN 적용. 새 아키텍처 개발이 가능.

**GNN 논문의 읽기 전략**.

GNN 논문은 수식이 많고 복잡할 수 있다.

**읽기 순서**:
1. **Abstract**: 무엇을 주장?
2. **Figure 1**: 대개 전체 아키텍처 시각화
3. **Introduction**: 왜 이 문제가 중요?
4. **Method**: 이해할 수 있는 수준까지
5. **Experiments**: 결과와 비교
6. **Conclusion**: 핵심 메시지

**수식 이해의 팁**:
- 모든 기호의 의미 확인 (종이에 적기)
- 단순한 예시로 계산해보기
- 코드와 비교 (대부분의 GNN 논문은 코드 공개)
- 모르면 저자의 블로그 또는 유튜브 설명 찾기

**GNN 연구자의 팔로우**:
- Michael Bronstein (Oxford/Twitter)
- Jure Leskovec (Stanford)
- Petar Veličković (DeepMind)
- Thomas Kipf (Google Brain)

이들의 트위터/블로그가 최신 연구의 좋은 소식통.

**GNN 학습 자원**.

**온라인 강의**:
- **CS224W (Stanford)**: Machine Learning with Graphs. 완전 무료.
- **Geometric Deep Learning Course (AMMI)**: 심화.

**책**:
- **"Graph Representation Learning" (Hamilton, 2020)**: 무료 PDF.
- **"Deep Learning on Graphs" (Ma & Tang, 2021)**: 교과서.

**블로그**:
- **Graph Neural Networks (distill.pub)**: 시각적 설명.
- **PyTorch Geometric 공식 문서**: 튜토리얼.

**튜토리얼**:
- **PyG 공식 Colab 튜토리얼**: 손으로 해보기.
- **DGL 예제**: 다양한 응용.

**GNN 학습의 6개월 로드맵**.

**Month 1: 기초**.
- CS224W 1-5강
- 그래프의 기본 개념
- Hamilton의 책 1-3장
- PyG 설치와 Hello World

**Month 2: 주요 모델**.
- GCN, GAT 이해와 구현
- 노드 분류 과제
- 벤치마크 (Cora, CiteSeer)
- Kipf의 블로그 읽기

**Month 3: 응용**.
- 그래프 분류
- 분자 데이터 (QM9, MoleculeNet)
- 손으로 만든 예시

**Month 4: 본인 도메인**.
- 공학 문제 분석
- 그래프 변환
- 첫 GNN 모델

**Month 5: 고급 기법**.
- 다른 GNN 변형 시도
- 특수 기법 (attention, edge features)
- 벤치마크와 비교

**Month 6: 논문 작성**.
- 결과 정리
- 베이스라인과 비교
- 첫 GNN 논문 초안

**이 6개월이** 본인을 GNN 연구자로 만든다.

**박사에서의 GNN의 위치**.

박사 연구에 GNN을 어떻게 통합할까.

**시나리오 1: 주 기여로**.
박사 전체가 GNN 기반. 대부분의 논문이 GNN.

**적합**: AI/ML 중심 박사. 학술 논문 중심.

**시나리오 2: 여러 접근 중 하나**.
박사가 여러 ML 방법을 비교. GNN이 그 중 하나.

**적합**: 도메인 중심 박사. "어떤 ML이 내 문제에 맞나"를 탐구.

**시나리오 3: 전통 방법의 보완**.
주 방법은 전통 (FEM, 시뮬레이션). GNN이 보조.

**적합**: 전통 공학 + ML의 결합.

**시나리오 4: 박사 후반의 탐색**.
박사 4-5년차에 새 방향. GNN 논문 1-2편.

**적합**: 기존 주제 완료 후 확장.

**선택**: 박사 상황과 관심에 따라.

**GNN 연구의 도전**.

박사생이 GNN을 연구할 때의 현실적 어려움.

**도전 1: 학습 곡선**.
GNN은 CNN/RNN보다 복잡. 수학적 기반 필요.

**대응**: 점진적 학습. 2-3개월의 집중 학습 기간 확보.

**도전 2: 벤치마크의 제약**.
표준 벤치마크가 제한적. 공학 데이터는 별도 준비.

**대응**: 데이터셋을 만드는 것을 기여의 일부로.

**도전 3: 과대 약속**.
일부 논문이 GNN의 효과를 과장. 실제 성능은 단순 모델과 비슷할 수 있음.

**대응**: 강한 베이스라인 (MLP, 전통 특징)과 비교.

**도전 4: 해석의 어려움**.
GNN의 결정이 왜 그런지 설명 어려움.

**대응**: Attention GNN 사용, GNNExplainer 같은 도구.

**도전 5: 확장성**.
큰 그래프에서 느림, 메모리 문제.

**대응**: 샘플링 기법, 미니배치.

**이 도전들을 인식**하고 대비.

**GNN의 미래 — 박사 5-10년**.

2024-2026년 기준 GNN의 현재와 미래.

**현재**:
- 화학/생물에서 성숙
- 공학에서 점진적 채택
- 새로운 아키텍처 매달
- 이론적 이해 발전 중

**미래 예상**:
1. **Foundation Models**: 그래프 전용 Foundation Model
2. **Physics-aware GNN**: 물리 법칙 내장
3. **동적 그래프**: 시간 의존적 그래프
4. **이질 그래프**: 복잡한 시스템
5. **해석 가능성**: 설명 가능한 GNN

**박사 전략**:
- 단기 (1-2년): 기본 익히기
- 중기 (2-4년): 본인 도메인에 적용
- 장기 (박사 전반): GNN + 도메인의 전문가

**공학 박사에게 GNN은** CNN이 2012-2015년에 그랬던 것처럼 새 영역. 지금 시작하는 것이 미래의 전문성.

**체크리스트 — GNN 학습**.

<div class="highlight-box highlight-info">

**GNN 학습 체크리스트**

- [ ] 그래프의 기본 개념을 이해하는가?
- [ ] 메시지 전달의 아이디어를 설명할 수 있는가?
- [ ] 주요 GNN 변형 (GCN, GAT, SAGE)을 아는가?
- [ ] GNN의 주요 작업 유형을 구분하는가?
- [ ] 공학 문제를 그래프로 변환할 수 있는가?
- [ ] PyTorch Geometric으로 간단한 GNN을 구현했는가?
- [ ] GNN의 주요 도전 (과평활화 등)을 아는가?
- [ ] 본인 분야의 GNN 논문 5편을 읽었는가?
- [ ] 강한 베이스라인과 GNN을 비교했는가?
- [ ] GNN의 한계를 인식하는가?
- [ ] 박사에 GNN을 통합할 계획이 있는가?
- [ ] GNN 연구자를 팔로우하고 트렌드를 파악하는가?

</div>

이 12가지가 GNN 여정의 기초.

> Graph Neural Networks는 공학 박사의 새 도구다. 분야의 많은 문제가 본질적으로 그래프이고, GNN은 이 구조를 자연스럽게 다룬다. 전통 CNN이나 MLP로 억지로 처리하는 것보다 GNN이 훨씬 효과적일 수 있다. 박사 중반부터 GNN을 탐색하는 것이 좋은 투자다. 2024-2026년 현재 GNN은 CNN이 2012-2015년에 있었던 위치와 비슷하다. 지금 시작하면 그 파도의 앞자리에 있을 수 있다. 공학 문제를 그래프로 다시 생각해보는 것이 첫 단계다.
