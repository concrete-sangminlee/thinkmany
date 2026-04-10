# 시간축이 있는 데이터

이미지 데이터는 픽셀의 공간적 배열이 중요하다(ch25 참조). 정형 데이터(tabular data)는 행이 독립적이다(ch21 참조). 시계열 데이터는 둘 다 아니다. 시계열에서는 **순서**가 데이터의 본질이다. 3번째 측정값이 의미를 갖는 이유는, 2번째 측정값 다음에 왔고 4번째 측정값 앞에 왔기 때문이다. 이 순서를 무시하면 데이터의 의미가 사라진다.

공학 연구에서 시계열 데이터는 어디에나 있다. 진동 센서의 가속도 이력, 구조물의 변위 응답, 제조 공정의 온도 기록, 교량의 하중 이력, 배터리의 충방전 사이클, 기상 관측 데이터. 이 데이터들은 모두 "시간축"을 가진다. 그리고 이 시간축이 분석의 모든 것을 바꾼다.

이 장에서는 시계열 데이터의 고유한 특성, 전처리 방법, 특징 추출, 전통 모델부터 딥러닝까지의 분석 방법, 그리고 공학 연구에서의 실전 적용을 다룬다. ch21에서 다룬 ML 기초와 ch22에서 다룬 딥러닝 아키텍처를 시계열이라는 구체적 데이터 유형에 적용하는 장이다.

---

## 시계열 데이터의 고유한 특성

시계열 데이터가 일반 정형 데이터와 근본적으로 다른 이유는 세 가지다.

### 순서 의존성 (Order Dependency)

정형 데이터에서 행의 순서를 바꿔도 모델에 영향이 없다. 100개의 콘크리트 시편 데이터를 섞어도 Random Forest의 예측은 동일하다. 그러나 시계열에서 순서를 바꾸면 데이터 자체가 파괴된다. 진동 신호의 시간 순서를 섞으면, 그것은 더 이상 진동 신호가 아니라 랜덤한 숫자의 나열이다.

### 자기상관 (Autocorrelation)

시계열의 현재 값은 과거 값에 의존한다. 오늘의 기온은 어제의 기온과 높은 상관관계가 있다. 현재 시점의 구조물 변위는 직전 시점의 변위와 강하게 연결되어 있다. 이 자기상관이 시계열 분석의 핵심이자, 일반 ML 방법을 그대로 적용할 수 없는 이유다.

### 정상성 (Stationarity)

정상 시계열(stationary time series)은 통계적 성질(평균, 분산)이 시간에 따라 변하지 않는다. 비정상 시계열(non-stationary)은 추세(trend), 계절성(seasonality), 분산 변화 등으로 통계적 성질이 시간에 따라 변한다. 대부분의 전통 시계열 모델(ARIMA 등)은 정상성을 가정한다. 비정상 시계열은 차분(differencing), 로그 변환 등으로 정상화한 후 모델링한다.

<div class="highlight-box info">
<span class="highlight-box-icon">ℹ️</span>
<div class="highlight-box-content">
<p><strong>공학 시계열의 특수성</strong></p>
<p>공학에서 다루는 시계열은 금융이나 기상과 다른 특징이 있다. 샘플링 주파수가 매우 높을 수 있고(진동 센서: 수 kHz~수십 kHz), 물리 법칙에 의한 제약이 있으며(변위의 연속성, 에너지 보존), 센서 노이즈와 측정 오차가 불가피하다. 이런 특성을 무시하고 범용 시계열 기법을 그대로 적용하면 물리적으로 의미 없는 결과가 나올 수 있다.</p>
</div>
</div>

---

## 공학에서의 시계열 데이터

공학 분야별로 다루는 시계열의 유형과 특성이 다르다.

<div class="card-grid">
<div class="card">
<span class="card-icon">📳</span>
<div class="card-title">진동/가속도 데이터</div>
<div class="card-desc">구조 건전성 모니터링, 기계 고장 진단. 고주파수(kHz 단위), 주파수 영역 분석이 핵심. FFT, PSD, 고유 진동수 추출이 기본 도구다.</div>
</div>
<div class="card">
<span class="card-icon">🌡️</span>
<div class="card-title">온도/환경 이력</div>
<div class="card-desc">제조 공정 모니터링, 건물 에너지 분석. 상대적으로 저주파(분~시간 단위). 추세와 계절성이 두드러지며, 이상 탐지가 주요 과제다.</div>
</div>
<div class="card">
<span class="card-icon">📐</span>
<div class="card-title">하중/변위 응답</div>
<div class="card-desc">구조 시험, 피로 시험, 지진 응답. 하중-변위 관계의 이력(hysteresis)이 중요하다. 사이클 수 계산, 피로 손상 누적 분석에 활용된다.</div>
</div>
<div class="card">
<span class="card-icon">🔋</span>
<div class="card-title">충방전 사이클</div>
<div class="card-desc">배터리 열화 분석, 수명 예측. 사이클 단위와 시간 단위의 이중 시계열 구조. 용량 감소 추세의 예측이 핵심이다.</div>
</div>
</div>

---

## 전처리: 원시 데이터에서 분석 가능한 데이터로

시계열 데이터의 전처리는 일반 데이터의 전처리보다 복잡하다. 시간적 구조를 보존하면서 노이즈를 제거하고, 결측치를 처리해야 한다.

### 리샘플링 (Resampling)

서로 다른 샘플링 주파수의 센서 데이터를 통합하려면, 하나의 공통 시간 축으로 맞춰야 한다. 업샘플링(up-sampling: 저주파 → 고주파)에는 보간(interpolation)이 필요하고, 다운샘플링(down-sampling: 고주파 → 저주파)에는 앨리어싱(aliasing) 방지를 위한 안티앨리어싱 필터가 필요하다. 나이퀴스트 정리(Nyquist theorem)에 의해, 관심 주파수의 2배 이상으로 샘플링해야 정보 손실이 없다.

### 결측치 처리

시계열의 결측치는 단순히 평균으로 채울 수 없다. 시간적 연속성을 유지하는 보간법을 사용해야 한다. 선형 보간(linear interpolation)이 가장 기본적이고, 스플라인 보간(spline interpolation)이 더 부드러운 결과를 준다. 결측 구간이 길면 보간 자체가 부정확하므로, 해당 구간을 제외하는 것이 안전할 수 있다.

### 노이즈 제거 (Filtering)

센서 데이터에는 항상 노이즈가 있다. 노이즈를 제거하면서 원래 신호의 특성을 보존하는 것이 필터링의 목표다.

**저역 통과 필터(Low-pass filter)**: 고주파 노이즈를 제거하고 저주파 성분만 남긴다. 구조물의 느린 변형을 볼 때 사용한다. 센서의 고주파 전기 노이즈를 제거할 때도 사용한다.

**고역 통과 필터(High-pass filter)**: 저주파 성분(추세, 드리프트)을 제거하고 고주파 성분만 남긴다. 진동 신호에서 DC 오프셋이나 느린 온도 드리프트를 제거할 때 사용한다.

**대역 통과 필터(Band-pass filter)**: 특정 주파수 대역만 남긴다. 특정 고유 진동수 성분만 분리하고 싶을 때 사용한다.

Butterworth 필터가 가장 일반적이다. Python의 `scipy.signal` 라이브러리로 쉽게 구현할 수 있다. 필터의 차수(order)와 차단 주파수(cutoff frequency)를 결정하는 것이 핵심이고, 이는 물리적 이해에 기반해야 한다. "노이즈가 사라질 때까지" 필터를 강하게 적용하면, 원래 신호의 중요한 특성까지 사라질 수 있다.

---

## 특징 추출: 시간 영역 vs 주파수 영역

시계열 데이터에서 모델에 입력할 특징(feature)을 추출하는 방법은 크게 두 가지 영역으로 나뉜다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch37-time">시간 영역 (Time Domain)</button>
<button class="tab-btn" data-tab="tab-ch37-freq">주파수 영역 (Frequency Domain)</button>
<button class="tab-btn" data-tab="tab-ch37-tf">시간-주파수 영역</button>
</div>
<div class="tab-content active" id="tab-ch37-time">

### 시간 영역 특징

시계열의 통계적 특성을 직접 계산한다. 직관적이고 구현이 간단하다.

**RMS (Root Mean Square)**: 신호의 "에너지 수준"을 나타낸다. 진동의 세기, 하중의 크기를 요약하는 데 가장 기본적인 지표다. 기계 고장 진단에서 RMS의 증가는 이상의 대표적 징후다.

**첨도 (Kurtosis)**: 분포의 꼬리 두께를 나타낸다. 정상 진동은 정규분포에 가깝지만(첨도 ~ 3), 충격이나 결함이 발생하면 첨도가 급격히 증가한다. 베어링 결함 초기 탐지에 효과적이다.

**왜도 (Skewness)**: 분포의 비대칭성. 특정 방향으로 편향된 하중이나 변형의 지표가 된다.

**피크값 (Peak)**: 최대 절대값. 충격 하중, 순간 최대 응력을 파악하는 데 사용한다.

**파고율 (Crest Factor = Peak/RMS)**: 신호에 날카로운 충격이 포함되어 있는지를 나타낸다. 기계 결함 진행 단계를 판별하는 데 활용된다.

**영교차율 (Zero-crossing rate)**: 신호가 0을 지나는 횟수. 주파수 정보의 간접적 추정치로 사용된다.

시간 영역 특징은 계산이 빠르고 해석이 명확하다. 하지만 신호의 주파수 구조를 직접적으로 반영하지 못한다는 한계가 있다.

</div>
<div class="tab-content" id="tab-ch37-freq">

### 주파수 영역 특징

시간 영역의 신호를 주파수 영역으로 변환하여 주파수별 성분을 분석한다.

**FFT (Fast Fourier Transform)**: 시간 영역 신호를 주파수 영역으로 변환하는 가장 기본적인 도구. "이 신호가 어떤 주파수 성분으로 구성되어 있는가?"를 알려준다. 구조물의 고유 진동수를 파악하거나, 회전 기계의 회전 주파수 성분을 분석할 때 필수적이다.

**PSD (Power Spectral Density)**: 주파수별 에너지(파워) 분포를 보여준다. FFT의 결과를 더 안정적으로 추정한 것으로, 랜덤 진동 분석의 표준 도구다. Welch 방법이 가장 많이 쓰인다.

**주파수 영역 특징**: 주 주파수(dominant frequency), 주파수 중심(spectral centroid), 대역폭(bandwidth), 스펙트럼 엔트로피 등을 계산하여 모델의 입력으로 사용한다.

주파수 영역 분석은 "어떤 주파수 성분이 존재하는가"를 명확히 보여주지만, "언제 그 주파수가 나타났는가"는 알 수 없다. 정상(stationary) 신호에는 적합하지만, 비정상 신호(시간에 따라 주파수가 변하는 경우)에는 한계가 있다.

</div>
<div class="tab-content" id="tab-ch37-tf">

### 시간-주파수 영역

시간과 주파수를 동시에 분석한다. 비정상 신호에 적합하다.

**STFT (Short-Time Fourier Transform)**: 시간 축을 작은 윈도우로 나누고, 각 윈도우에서 FFT를 수행한다. 결과는 스펙트로그램(spectrogram)으로 시각화된다. 윈도우 크기에 따라 시간 해상도와 주파수 해상도가 트레이드오프 관계에 있다.

**Wavelet Transform**: 다해상도 분석이 가능하다. 저주파에서는 시간 해상도를 낮추고 주파수 해상도를 높이며, 고주파에서는 반대로 한다. 충격 신호, 과도 현상(transient) 분석에 효과적이다. 특히 기계 진동 분석에서 Morlet wavelet이 자주 사용된다.

**HHT (Hilbert-Huang Transform)**: 경험적 모드 분해(EMD)와 힐베르트 변환을 결합한 방법. 비선형, 비정상 신호에 특히 적합하다. 지진파 분석, 구조물의 시변(time-varying) 특성 분석에 활용된다.

시간-주파수 분석의 결과(스펙트로그램 등)는 2D 이미지로 표현할 수 있으므로, CNN(ch22 참조)의 입력으로 사용하는 연구도 활발하다.

</div>
</div>

---

## 전통 시계열 모델

머신러닝과 딥러닝 이전에도 시계열 분석을 위한 강력한 통계 모델이 있었다. 이 모델들은 데이터가 적고 해석 가능성이 중요한 공학 연구에서 여전히 유효하다.

**이동 평균 (Moving Average)**: 가장 단순한 평활(smoothing) 기법. 노이즈를 줄이고 추세를 파악하는 데 사용한다. 윈도우 크기가 커질수록 더 부드러워지지만, 급격한 변화에 대한 반응이 느려진다.

**지수 평활 (Exponential Smoothing)**: 최근 데이터에 더 큰 가중치를 부여하는 평활 기법. 단순 지수 평활, 이중 지수 평활(Holt), 삼중 지수 평활(Holt-Winters)이 있다. 추세와 계절성이 있는 데이터에 적합하다.

**ARIMA (AutoRegressive Integrated Moving Average)**: 시계열 예측의 고전적 표준 모델. AR(자기회귀) + I(차분) + MA(이동평균)의 조합이다. (p, d, q) 세 개의 파라미터를 결정해야 하며, ACF/PACF 그래프와 AIC/BIC 기준으로 선택한다. 데이터가 소규모이고 선형적 패턴이 주된 경우에 효과적이다. 비선형 패턴에는 한계가 있다.

**SARIMA**: ARIMA에 계절성(Seasonality)을 추가한 모델. (p, d, q) × (P, D, Q, s) 파라미터를 가진다. 건물 에너지 소비량 같은 계절적 패턴이 뚜렷한 데이터에 적합하다.

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>전통 모델을 먼저 시도하라</strong></p>
<p>ch21에서 강조한 "간단한 것부터" 원칙이 시계열에도 적용된다. LSTM을 바로 돌리기 전에, 이동 평균이나 ARIMA로 베이스라인 성능을 확인하라. 전통 모델로 충분한 성능이 나오면, 복잡한 딥러닝 모델은 필요 없다. 베이스라인 없이 "LSTM으로 예측했다"만 보여주면, 리뷰어는 "ARIMA로도 가능하지 않나?"라고 물을 것이다.</p>
</div>
</div>

---

## 딥러닝 적용: LSTM, 1D-CNN, Transformer

시계열의 비선형 패턴, 장기 의존성, 복잡한 상호작용을 포착하기 위해 딥러닝이 활용된다. ch22에서 다룬 아키텍처 중 시계열에 특히 적합한 세 가지를 비교한다.

<div class="card-grid">
<div class="card">
<span class="card-icon">🔄</span>
<div class="card-title">LSTM</div>
<div class="card-desc">순서 정보를 자연스럽게 처리. 장기 의존성을 게이트 메커니즘으로 학습. 학습이 느리고, 매우 긴 시퀀스(수천 이상)에서 성능 저하. 가장 많이 연구된 시계열 딥러닝 모델이다.</div>
</div>
<div class="card">
<span class="card-icon">📊</span>
<div class="card-title">1D-CNN</div>
<div class="card-desc">지역적 패턴(local pattern)을 효과적으로 추출. 병렬 처리로 학습이 빠르다. 장기 의존성에는 약하지만, 진동 신호의 국소적 패턴 인식에 강하다. LSTM과 결합(CNN-LSTM)하여 사용되기도 한다.</div>
</div>
<div class="card">
<span class="card-icon">🎯</span>
<div class="card-title">Temporal Fusion Transformer</div>
<div class="card-desc">Attention 메커니즘으로 장기 의존성과 변수 간 관계를 동시에 학습. 해석 가능성이 높다(어떤 시점, 어떤 변수가 중요한지). 데이터가 충분할 때 최고 성능. 구현 복잡도가 높다.</div>
</div>
</div>

모델 선택의 현실적 기준은 이렇다. 데이터가 수천 포인트 수준이고 패턴이 상대적으로 단순하면 LSTM이 무난하다. 진동 신호처럼 국소 패턴이 중요하면 1D-CNN을 시도한다. 다변량 시계열에서 변수 간 상호작용과 시간적 의존성을 동시에 잡아야 하면 Transformer 계열을 고려한다. 어떤 모델을 쓰든, 전통 모델(ARIMA 등)을 베이스라인으로 반드시 비교해야 한다.

---

## 세 가지 주요 과제

공학에서 시계열 데이터를 다루는 과제는 크게 세 가지로 분류된다. 같은 데이터라도 과제에 따라 접근법이 달라진다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch37-forecast">예측 (Forecasting)</button>
<button class="tab-btn" data-tab="tab-ch37-classify">분류 (Classification)</button>
<button class="tab-btn" data-tab="tab-ch37-anomaly">이상 탐지 (Anomaly Detection)</button>
</div>
<div class="tab-content active" id="tab-ch37-forecast">

### 예측 (Forecasting)

미래 값을 예측하는 것이다. "향후 24시간의 건물 에너지 소비량은?", "이 배터리의 100사이클 후 용량은?", "다음 지진 발생 시 이 구조물의 최대 변위는?"

**단일 스텝 예측(One-step-ahead)**: 바로 다음 시점의 값만 예측한다. 가장 쉽고, 대부분의 모델이 이 형태를 기본으로 한다.

**다중 스텝 예측(Multi-step-ahead)**: 여러 시점 앞의 값을 예측한다. 예측 지평(prediction horizon)이 길어질수록 불확실성이 누적되어 정확도가 떨어진다. 재귀 예측(이전 예측값을 입력으로 사용)과 직접 예측(각 시점을 독립적으로 예측)의 두 가지 접근법이 있다.

**평가 지표**: MAE, RMSE, MAPE가 일반적이다. 시계열 예측에서는 "naive forecast"(단순히 직전 값을 다음 값으로 예측)와 비교하는 것이 중요하다. 복잡한 모델이 naive forecast를 이기지 못하면 모델의 가치가 없다.

</div>
<div class="tab-content" id="tab-ch37-classify">

### 분류 (Classification)

시계열 전체 또는 세그먼트를 범주로 분류하는 것이다. "이 진동 패턴은 정상인가 결함인가?", "이 지진파의 유형은?", "이 공정 데이터는 양품인가 불량인가?"

**접근법 1: 특징 추출 후 분류.** 시간/주파수 영역에서 특징을 추출하고(RMS, FFT 등), 이를 입력으로 전통 ML 분류기(Random Forest, SVM 등)에 넣는다. 해석 가능성이 높고, 소량 데이터에서도 효과적이다.

**접근법 2: End-to-end 딥러닝.** 원시 시계열을 직접 1D-CNN이나 LSTM에 넣어 분류한다. 특징 추출을 자동화한다. 데이터가 충분하면 높은 성능을 보이지만, 데이터가 부족하면 과적합된다.

**주의점**: 공학에서의 분류 문제는 거의 항상 클래스 불균형(class imbalance)이 있다. 정상 데이터는 수만 개인데 결함 데이터는 수십 개인 경우가 흔하다. Accuracy 대신 F1-score, AUROC를 사용하고, 오버샘플링(SMOTE)이나 클래스 가중치를 적용해야 한다.

</div>
<div class="tab-content" id="tab-ch37-anomaly">

### 이상 탐지 (Anomaly Detection)

정상 패턴에서 벗어난 데이터를 감지하는 것이다. "이 센서 값이 비정상적인가?", "이 시점에서 구조물에 이상이 발생했는가?", "이 공정 변수가 정상 범위를 벗어났는가?"

**통계적 방법**: 이동 평균 ± k×표준편차 범위를 벗어나는 값을 이상으로 판단한다. 간단하지만 효과적이다. 관리도(control chart)가 이 원리에 기반한다.

**비지도 ML 방법**: Isolation Forest, One-class SVM, Autoencoder 등. 정상 데이터만으로 학습하고, 정상 패턴에서 벗어나는 데이터를 이상으로 감지한다. 이상 데이터가 매우 적은 공학 현실에 적합하다.

**주의점**: 이상 탐지에서 가장 어려운 것은 "이상"의 정의다. 센서 고장에 의한 이상치와 실제 물리적 이상을 구분해야 한다. 도메인 지식 없이 알고리즘만으로는 이 구분이 불가능하다.

</div>
</div>

---

## 교차 검증의 함정

시계열에서 가장 치명적인 실수는 일반적인 교차 검증(Random K-fold)을 적용하는 것이다. 이것은 ch23에서도 언급되었지만, 시계열 장에서 더 구체적으로 다뤄야 할 만큼 중요하다.

<div class="highlight-box warning">
<span class="highlight-box-icon">⚠️</span>
<div class="highlight-box-content">
<p><strong>Random Split = 데이터 누수</strong></p>
<p>시계열 데이터를 랜덤으로 셔플하여 train/test를 나누면, 미래 데이터로 학습하고 과거 데이터를 예측하는 상황이 발생한다. 이것은 "내일의 주가를 알고 오늘의 주가를 예측하는" 것과 같다. 당연히 성능이 비현실적으로 높게 나오고, 실제 배포 시에는 성능이 급락한다. <strong>시계열 데이터에서는 반드시 TimeSeriesSplit을 사용해야 한다.</strong> 학습 데이터는 항상 검증 데이터보다 시간적으로 앞에 있어야 한다.</p>
</div>
</div>

**TimeSeriesSplit의 원리**: 데이터를 시간순으로 정렬한 상태에서, 학습 윈도우를 점진적으로 늘려가며 검증한다. 1차: [1-100]으로 학습, [101-120]으로 검증. 2차: [1-120]으로 학습, [121-140]으로 검증. 이런 식으로 시간 순서를 절대 깨뜨리지 않는다.

scikit-learn의 `TimeSeriesSplit`을 사용하면 쉽게 구현할 수 있다. 다만 기본 설정에서는 학습 윈도우가 계속 커지는데, 실무에서는 최근 N개의 데이터만 사용하는 "슬라이딩 윈도우" 방식이 더 적합한 경우도 있다.

---

## 실전 파이프라인

센서 데이터에서 최종 모델까지의 전체 흐름을 정리한다. ch21에서 다룬 ML 프로젝트 파이프라인의 시계열 특화 버전이다.

<div class="pipeline">
<div class="pipeline-step">
<div class="pipeline-step-icon">📡</div>
<div class="pipeline-step-title">센서 데이터 수집</div>
<div class="pipeline-step-desc">샘플링 주파수, 측정 범위, 센서 위치 기록. 메타데이터 확보가 핵심이다.</div>
</div>
<span class="pipeline-arrow">→</span>
<div class="pipeline-step">
<div class="pipeline-step-icon">🧹</div>
<div class="pipeline-step-title">전처리</div>
<div class="pipeline-step-desc">리샘플링, 결측치 보간, 필터링(노이즈 제거), 정규화. 시간 순서 보존 필수.</div>
</div>
<span class="pipeline-arrow">→</span>
<div class="pipeline-step">
<div class="pipeline-step-icon">🔬</div>
<div class="pipeline-step-title">특징 추출</div>
<div class="pipeline-step-desc">시간/주파수/시간-주파수 영역 특징. 또는 딥러닝의 경우 원시 데이터 직접 입력.</div>
</div>
<span class="pipeline-arrow">→</span>
<div class="pipeline-step">
<div class="pipeline-step-icon">⚙️</div>
<div class="pipeline-step-title">모델링</div>
<div class="pipeline-step-desc">ARIMA(베이스라인) → ML(RF, XGBoost) → DL(LSTM, 1D-CNN). 단계적 복잡도 증가.</div>
</div>
<span class="pipeline-arrow">→</span>
<div class="pipeline-step">
<div class="pipeline-step-icon">📏</div>
<div class="pipeline-step-title">평가</div>
<div class="pipeline-step-desc">TimeSeriesSplit으로 교차 검증. 과제별 적합 메트릭. 물리적 타당성 확인.</div>
</div>
</div>

---

## 흔한 실수와 실전 팁

시계열 분석에서 공학 대학원생이 자주 범하는 실수와 대처법을 정리한다.

<div class="do-dont">
<div class="do-box">
<h4>✅ 올바른 접근</h4>
<ul>
<li>TimeSeriesSplit으로 교차 검증한다</li>
<li>전통 모델(ARIMA)을 베이스라인으로 먼저 시도한다</li>
<li>필터링 전후의 신호를 시각적으로 비교한다</li>
<li>주파수 분석 결과를 물리적으로 해석한다</li>
<li>예측 불확실성(신뢰 구간)을 함께 제시한다</li>
<li>샘플링 주파수와 나이퀴스트 조건을 확인한다</li>
</ul>
</div>
<div class="dont-box">
<h4>❌ 흔한 실수</h4>
<ul>
<li>랜덤 셔플로 train/test를 나눈다 (데이터 누수)</li>
<li>LSTM부터 바로 시작한다 (베이스라인 없음)</li>
<li>필터의 차단 주파수를 물리적 근거 없이 설정한다</li>
<li>FFT 결과의 주파수 축 단위를 확인하지 않는다</li>
<li>시계열의 정상성을 검정하지 않고 ARIMA를 적용한다</li>
<li>다운샘플링 시 앨리어싱을 고려하지 않는다</li>
</ul>
</div>
</div>

### 추가 실전 팁

**윈도우 크기 결정**: 시계열을 고정 길이 윈도우로 나누어 모델에 입력할 때, 윈도우 크기의 선택이 성능에 큰 영향을 미친다. 물리적으로 의미 있는 단위(진동 1주기, 공정 1사이클 등)를 기준으로 결정하고, 여러 크기를 실험하여 비교한다.

**다변량 시계열**: 하나의 센서만 분석하는 경우는 드물다. 여러 센서의 시계열을 동시에 분석하는 다변량(multivariate) 시계열이 공학의 현실이다. 변수 간 시간 지연(time lag), 인과 관계(Granger causality)를 파악하는 것이 중요하다.

**센서 동기화**: 여러 센서에서 데이터를 수집할 때, 센서 간 시간 동기화가 정확한지 반드시 확인하라. 밀리초 단위의 시간 오차도 고주파 신호 분석에서는 큰 문제가 된다.

<div class="highlight-box important">
<span class="highlight-box-icon">🔑</span>
<div class="highlight-box-content">
<p><strong>시계열 분석의 핵심 원칙</strong></p>
<p>시계열 데이터는 "시간을 무시하면 안 되는 데이터"다. 전처리에서 시간 순서를 보존해야 하고, 교차 검증에서 시간 방향을 지켜야 하고, 해석에서 물리적 시간 스케일을 고려해야 한다. 이미지 데이터(ch25)가 "공간"의 데이터라면, 시계열은 "시간"의 데이터다. 각 데이터 유형의 고유한 구조를 존중하는 것이, 올바른 분석의 출발점이다.</p>
</div>
</div>

---

## 다음 단계

이 장에서 시계열 데이터의 특성, 전처리, 특징 추출, 모델링, 그리고 실전 파이프라인을 다뤘다. ch21의 ML 기초, ch22의 딥러닝 아키텍처, ch23의 ML 파이프라인에서 배운 내용이 시계열이라는 구체적인 데이터 유형에 어떻게 적용되는지를 보았다.

시계열 분석은 공학 연구에서 갈수록 중요해지고 있다. IoT 센서의 보급으로 수집 가능한 시계열 데이터가 폭발적으로 증가하고 있고, 이 데이터를 의미 있는 정보로 변환하는 능력이 연구자의 핵심 역량이 되고 있다. 시간축이 있는 데이터를 다룰 때는, 항상 "이 데이터의 시간적 구조를 내 분석이 존중하고 있는가?"를 스스로에게 물어라.

---

## 확률적 시계열 예측 — 점 예측을 넘어 불확실성까지

대부분의 시계열 예측 연구는 "내일 온도는 20도가 될 것이다"와 같은 **점 예측(point forecast)**에 집중한다. 그러나 공학의 실제 의사결정에서는 "내일 온도가 18-22도 사이일 확률이 80%이고, 극단적으로 15도 이하로 떨어질 확률이 5%"와 같은 **확률적 예측(probabilistic forecast)**이 훨씬 더 가치 있다. 리스크 관리, 안전 기준 설정, 자원 계획에서는 점 예측만으로는 부족하고, 예측의 불확실성 범위가 필수적이다.

<div class="highlight-box highlight-important">

**"단일 숫자 예측"의 한계.** 본인의 모델이 "다음 주 전력 수요는 10,500 MW"라고 예측했다고 하자. 실제 수요가 11,200 MW면 700 MW 부족이다. 반대로 예측이 "90% 확률로 9,800~11,500 MW 사이"라면 의사결정자는 여유 발전 용량을 미리 준비할 수 있다. 단일 숫자는 신뢰감을 주지만 오히려 위험하다. 확률 분포는 정직하고 유용하다.

</div>

**점 예측 vs 구간 예측 vs 밀도 예측.**

확률적 시계열 예측은 세 가지 수준이 있다.

1. **점 예측(Point Forecast)**: 단일 값. 예: $\hat{y}_{t+1} = 20.5$. 가장 단순하지만 불확실성 정보가 없다.

2. **구간 예측(Prediction Interval)**: 특정 신뢰 수준에서의 구간. 예: 95% PI = [18.2, 22.8]. 실제 값이 이 구간에 포함될 확률이 95%라는 의미.

3. **밀도 예측(Density Forecast)**: 완전한 확률 분포. 예: $\hat{y}_{t+1} \sim N(20.5, 1.2^2)$ 또는 비모수 분포. 가장 풍부한 정보이지만 구현과 평가가 복잡하다.

연구 수준에서 가장 실용적인 것은 **구간 예측**이다. 점 예측보다 훨씬 많은 정보를 주지만, 밀도 예측만큼 복잡하지 않다.

**구간 예측의 3가지 주요 방법.**

**방법 1: 잔차 기반(Residual-Based).** 가장 단순한 접근. 본인의 점 예측 모델을 학습한 후, 학습 데이터에서의 잔차(residual = 실제값 - 예측값)의 분포를 본다. 95% 구간은 잔차의 2.5%와 97.5% 분위수를 점 예측에 더하여 만든다.

```python
# 점 예측
y_pred = model.predict(X_test)

# 잔차 분포 (학습 데이터에서)
residuals = y_train - model.predict(X_train)
lower_quantile = np.quantile(residuals, 0.025)
upper_quantile = np.quantile(residuals, 0.975)

# 95% PI
y_pred_lower = y_pred + lower_quantile
y_pred_upper = y_pred + upper_quantile
```

이 방법의 장점은 모든 점 예측 모델에 추가할 수 있다는 것이다. 단점은 잔차가 시간에 따라 일정하다는 가정이다(등분산성). 이 가정이 깨지면 구간이 부정확해진다.

**방법 2: 분위수 회귀(Quantile Regression).** 점 예측 모델 대신, 여러 분위수(예: 5%, 25%, 50%, 75%, 95%)를 직접 예측하는 모델을 학습한다. 손실 함수를 pinball loss로 바꾸면 된다.

$$L_\tau(y, \hat{y}) = \max(\tau(y - \hat{y}), (\tau-1)(y - \hat{y}))$$

여기서 $\tau$는 목표 분위수. 5% 분위수를 원하면 $\tau = 0.05$를 사용한다.

**LightGBM의 분위수 회귀 예시.**
```python
import lightgbm as lgb

# 중앙값 (50%)
model_median = lgb.LGBMRegressor(
    objective='quantile', alpha=0.5
)

# 5% 하한
model_lower = lgb.LGBMRegressor(
    objective='quantile', alpha=0.05
)

# 95% 상한
model_upper = lgb.LGBMRegressor(
    objective='quantile', alpha=0.95
)

for m in [model_median, model_lower, model_upper]:
    m.fit(X_train, y_train)
```

이 방법의 장점은 시간대별로 다른 불확실성을 포착할 수 있다는 것이다. 단점은 세 배의 모델을 학습해야 하고, 분위수들이 엇갈릴(quantile crossing) 수 있다는 점이다.

**방법 3: 몬테카를로 드롭아웃(MC Dropout) 또는 앙상블.** 딥러닝 모델의 경우. 드롭아웃을 학습뿐 아니라 추론 시에도 활성화하고, 같은 입력에 대해 여러 번 예측(예: 100번)하여 예측 분포를 얻는다. 각 예측이 약간씩 다르므로 평균과 표준편차를 계산할 수 있다.

```python
# 추론 시에도 드롭아웃 활성
model.train()  # PyTorch에서 드롭아웃이 활성화됨
predictions = []
for _ in range(100):
    with torch.no_grad():
        pred = model(X_test)
        predictions.append(pred.numpy())

predictions = np.array(predictions)
y_mean = predictions.mean(axis=0)
y_std = predictions.std(axis=0)

# 95% PI
y_lower = y_mean - 1.96 * y_std
y_upper = y_mean + 1.96 * y_std
```

MC 드롭아웃은 베이지안 근사의 일종으로, 이론적 정당성이 있다. 앙상블(여러 모델의 예측 결합)도 유사한 효과를 낸다.

**확률적 예측의 평가 지표.**

점 예측에서는 RMSE, MAE가 표준이지만, 확률적 예측에서는 다른 지표가 필요하다.

**1. Coverage Probability.** 구간이 실제값을 포함하는 비율. 95% PI라면 실제로 95% 근처여야 한다. 너무 높으면(예: 99%) 구간이 지나치게 넓다는 뜻이고, 너무 낮으면(예: 80%) 구간이 너무 좁아 신뢰할 수 없다. 이상적 coverage는 명목 수준과 일치해야 한다.

**2. Prediction Interval Width.** 구간의 평균 폭. 폭이 좁을수록 좋지만, coverage를 희생하면 안 된다. 두 지표를 함께 본다.

**3. Pinball Loss (분위수 손실).** 분위수 회귀의 학습 손실이기도 하지만 평가 지표로도 사용된다. 낮을수록 좋다.

**4. CRPS (Continuous Ranked Probability Score).** 밀도 예측의 표준 평가 지표. 예측 분포와 실제 관측값의 차이를 정량화. 점 예측의 MAE의 확률적 일반화.

$$\text{CRPS}(F, y) = \int_{-\infty}^{\infty} (F(z) - \mathbb{1}\{y \le z\})^2 dz$$

여기서 $F$는 예측 CDF. 낮을수록 좋다. Python의 `properscoring` 또는 `CRPS` 라이브러리로 계산 가능.

**5. Reliability Diagram.** 시각적 진단. 예측된 확률 수준과 실제 발생 빈도를 비교한다. 완벽한 교정(calibration)이면 대각선 위에 있다. 대각선에서 벗어나면 모델이 과신(overconfident) 또는 저신(underconfident)이다.

**확률적 예측의 교정(Calibration) 점검.**

모델이 "95% 신뢰"라고 말하면 실제로 95%가 맞아야 한다. 이것을 확인하지 않으면 본인의 확률 예측은 의미가 없다. 다음 절차로 교정을 점검한다.

1. **테스트 세트에서 구간 예측 생성** (95% PI).
2. **실제값이 구간에 포함되는 비율 계산**.
3. **이 비율이 95%에서 얼마나 벗어나는지 확인**.
4. **벗어나면 재교정(recalibration)**: 구간을 조정하여 목표 coverage를 달성.

간단한 재교정 방법: 본인의 95% PI가 실제로 90%만 커버한다면, 구간을 1.1배 늘린다. 더 정교한 방법은 **Conformal Prediction**이다.

**Conformal Prediction — 분포 가정 없는 확률적 예측.**

최근 활발히 연구되는 방법. 가장 큰 장점은 **분포 가정 없이 마진 유효성(marginal validity)**을 보장한다는 것이다. 즉 본인의 데이터가 어떤 분포를 따르든, 생성된 95% PI는 정확히 95% coverage를 보장한다.

**기본 아이디어**:
1. 학습 데이터를 훈련 세트와 교정(calibration) 세트로 나눈다.
2. 훈련 세트에서 점 예측 모델을 학습한다.
3. 교정 세트에서 각 샘플의 예측 오차(conformity score)를 계산한다.
4. 오차의 95% 분위수를 임계값으로 사용하여 새 예측에 구간을 더한다.

이 방법은 모델 불가지론적(model-agnostic)이라 어떤 예측 모델에도 적용할 수 있다. Python의 `mapie` 라이브러리가 사용하기 쉽다.

```python
from mapie.regression import MapieRegressor

mapie = MapieRegressor(estimator=base_model)
mapie.fit(X_train, y_train)
y_pred, y_pis = mapie.predict(X_test, alpha=0.05)
# y_pis[:,:,0] = 95% 구간
```

시계열 데이터에서는 **Conformal Prediction for Time Series (CPTS)** 같은 변형이 필요하다. 시간 순서를 고려한 분할이 중요하다.

**공학 응용에서의 확률적 예측 활용.**

확률적 예측이 가장 가치 있는 공학 응용.

- **구조 건전성 모니터링**: "앞으로 1시간 내 진동 진폭이 임계값을 초과할 확률은 3%다"와 같은 예측. 단일 값보다 훨씬 의사결정에 유용.
- **에너지 수요 예측**: 발전량 계획, 재생에너지 변동성 관리.
- **자원 고갈 예측**: 예비 부품의 재고 관리.
- **환경 모니터링**: 대기오염, 수질 이상 가능성.
- **의료 시계열**: 환자 상태 악화 확률.

이런 응용에서는 점 예측만 제공하는 연구보다 확률적 예측을 제공하는 연구가 훨씬 더 많이 인용되고 산업 적용된다.

**연구 논문에서 확률적 예측을 소개하는 법.**

본인의 논문에 확률적 예측을 포함할 때 다음을 포함한다.

1. **Methods**: 어떤 확률적 방법을 사용했는지 명시. 잔차 기반인지, 분위수 회귀인지, MC 드롭아웃인지, Conformal인지.
2. **Baselines**: 점 예측 모델과 나란히 비교. 확률적 모델의 점 예측 정확도가 낮으면 안 된다.
3. **Coverage 검증**: 명목 coverage와 실제 coverage의 차이를 보고. 그림이나 표로 제시.
4. **Interval Width**: 구간의 평균 폭을 함께 보고. Coverage와 균형.
5. **시각화**: 시계열 플롯에 점 예측(선)과 신뢰 구간(음영)을 함께 그린다. ch10 참조.
6. **의사결정 활용 시나리오**: "이 예측 불확실성이 실제 의사결정에 어떻게 활용되는가"를 구체적으로 서술.

**흔한 실수.**

**실수 1**: 확률적 예측을 생성했지만 coverage를 확인하지 않음. 구간이 실제로 얼마나 신뢰할 만한지 검증하지 않으면 의미가 없다.

**실수 2**: Coverage만 높이고 구간 폭을 무시함. "99% coverage"라면서 구간이 비현실적으로 넓으면 쓸모가 없다.

**실수 3**: 모든 시점에 같은 폭의 구간 적용. 시계열의 일부 기간(예: 변동이 큰 시기)에는 더 넓은 구간이 필요하다. 시간에 따라 달라지는 불확실성을 반영해야 한다.

**실수 4**: 점 예측 없이 구간만 보고. 많은 독자는 여전히 점 예측을 원한다. 점 예측(중앙값)과 구간을 모두 제공한다.

**실수 5**: 분포 가정을 맹목적으로 사용. "정규 분포" 가정이 비대칭 분포(예: 극단 기상 현상)에 맞지 않을 수 있다. 실제 잔차 분포를 확인한다.

> 점 예측은 쉽지만 거짓된 정확성을 준다. 확률적 예측은 약간 더 복잡하지만 정직하다. 본인이 박사 연구에서 시계열 예측을 다룬다면, 최소 한 편의 논문에 확률적 예측을 포함하는 것을 권한다. 이 작은 노력이 본인의 연구를 "숫자 한 개를 내는 모델"에서 "의사결정에 쓸 수 있는 시스템"으로 격상시킨다. 공학은 결국 의사결정을 위한 학문이고, 의사결정은 불확실성을 알 때 더 좋다.
