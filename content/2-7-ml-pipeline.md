## 전체 파이프라인

<div class="pipeline">
  <div class="pipeline-step"><div class="pipeline-step-icon">🎯</div><div class="pipeline-step-title">문제 정의</div><div class="pipeline-step-desc">예측 대상과 성공 기준 설정</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">📊</div><div class="pipeline-step-title">데이터 수집</div><div class="pipeline-step-desc">실험, 시뮬, 공개 데이터</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">🔍</div><div class="pipeline-step-title">EDA</div><div class="pipeline-step-desc">분포, 상관관계, 이상치 탐색</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">🔧</div><div class="pipeline-step-title">전처리</div><div class="pipeline-step-desc">결측치, 정규화, 특성 공학</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">🤖</div><div class="pipeline-step-title">모델링</div><div class="pipeline-step-desc">알고리즘 선택과 학습</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">📈</div><div class="pipeline-step-title">평가</div><div class="pipeline-step-desc">정량 지표와 물리 타당성</div></div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step"><div class="pipeline-step-icon">📄</div><div class="pipeline-step-title">배포 / 논문</div><div class="pipeline-step-desc">결과 정리 및 공유</div></div>
</div>

---

## 단계별 상세

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s27-data">데이터 수집</button>
    <button class="tab-btn" data-tab="tab-s27-preprocess">전처리</button>
    <button class="tab-btn" data-tab="tab-s27-training">모델 학습</button>
    <button class="tab-btn" data-tab="tab-s27-eval">평가</button>
    <button class="tab-btn" data-tab="tab-s27-interpret">결과 해석</button>
  </div>
  <div class="tab-content active" id="tab-s27-data">
    <p><strong>시뮬레이션 데이터</strong> — FEM, CFD 등으로 생성한다. 입력 변수를 체계적으로 변화시키기 위해 DOE(실험계획법)를 활용한다. Latin Hypercube Sampling이 일반적이다.</p>
    <p><strong>실험 데이터</strong> — 노이즈와 결측치가 불가피하다. 측정 조건, 센서 사양, 환경 변수를 반드시 기록한다.</p>
    <p><strong>공개 데이터셋</strong> — UCI ML Repository, Kaggle, NASA Prognostics 등에서 벤치마크 데이터를 확보할 수 있다.</p>
  </div>
  <div class="tab-content" id="tab-s27-preprocess">
    <p><strong>결측치 처리</strong> — 삭제, 평균/중앙값 대체, KNN 보간 등을 사용한다. 결측 비율이 50% 이상이면 해당 특성 자체를 제거하는 것이 낫다.</p>
    <p><strong>정규화/표준화</strong> — Min-Max Scaling(0~1 범위)이나 Standard Scaling(평균 0, 분산 1)을 적용한다. 트리 기반 모델은 스케일링이 불필요하다.</p>
    <p><strong>특성 공학</strong> — 도메인 지식을 활용하여 물리적으로 의미 있는 특성을 생성한다. 예: 레이놀즈 수, 무차원 변수, 비율 변수 등.</p>
  </div>
  <div class="tab-content" id="tab-s27-training">
    <p><strong>하이퍼파라미터 튜닝</strong> — Grid Search, Random Search, Bayesian Optimization(Optuna) 중 선택한다. Optuna가 효율성과 사용성 면에서 추천된다.</p>
    <p><strong>교차 검증</strong> — K-Fold(일반적으로 5 또는 10)로 모델 일반화 성능을 평가한다. 시계열 데이터는 Time Series Split을 사용해야 한다.</p>
    <p><strong>앙상블</strong> — 단일 모델보다 여러 모델의 조합이 안정적이다. Stacking, Blending 등을 고려한다.</p>
  </div>
  <div class="tab-content" id="tab-s27-eval">
    <p><strong>회귀 지표</strong> — R² (결정계수), RMSE (평균제곱근오차), MAE (평균절대오차)를 함께 보고한다. R²만 높고 RMSE가 크면 의미 없다.</p>
    <p><strong>물리적 타당성</strong> — 예측값이 물리적 범위 내에 있는지 확인한다. 음수 농도, 초과 효율, 비현실적 온도 등이 없어야 한다.</p>
    <p><strong>시각화</strong> — 실측 vs 예측 산점도, 잔차 분포, 파레토 차트 등으로 성능을 다각도로 분석한다.</p>
  </div>
  <div class="tab-content" id="tab-s27-interpret">
    <p><strong>SHAP (SHapley Additive exPlanations)</strong> — 각 특성의 기여도를 개별 예측 수준에서 설명한다. summary plot과 dependence plot이 핵심이다.</p>
    <p><strong>PDP (Partial Dependence Plot)</strong> — 특정 특성과 예측값의 관계를 시각화한다. 물리적 경향과 일치하는지 확인한다.</p>
    <p><strong>물리적 의미 부여</strong> — ML 결과를 도메인 지식으로 해석한다. "왜 이 변수가 중요한가"에 물리적 근거를 제시할 수 있어야 논문의 기여가 된다.</p>
  </div>
</div>

---

## 재현성 체크리스트

<div class="check-list">
  <label><input type="checkbox"> 랜덤 시드를 고정하고 코드에 명시했다 (numpy, torch, random 모두)</label>
  <label><input type="checkbox"> 데이터 분할(train/val/test) 방법과 비율을 기록했다</label>
  <label><input type="checkbox"> requirements.txt 또는 environment.yml로 패키지 버전을 관리한다</label>
  <label><input type="checkbox"> 코드를 Git으로 버전 관리하고, 실험마다 커밋 또는 태그를 남긴다</label>
  <label><input type="checkbox"> 하이퍼파라미터 설정을 config 파일로 분리했다</label>
  <label><input type="checkbox"> 전처리 파이프라인을 코드로 자동화했다 (수동 Excel 작업 없음)</label>
  <label><input type="checkbox"> 실험 결과를 W&B, MLflow 등으로 체계적으로 기록한다</label>
</div>

---

## 실수를 줄이는 팁

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>초보자가 가장 많이 하는 실수</strong></p>
    <p><strong>데이터 누수(Data Leakage)</strong> — 테스트 데이터 정보가 학습에 포함되면 비현실적으로 높은 성능이 나온다. 전처리(정규화, 특성 선택)를 반드시 학습 데이터만으로 수행하고, 교차 검증 내부에서 처리해야 한다.</p>
    <p><strong>과적합(Overfitting)</strong> — 학습 데이터에서 R²=0.99인데 테스트에서 0.6이면 과적합이다. 모델 복잡도를 줄이거나, 정규화를 적용하거나, 데이터를 늘려야 한다.</p>
    <p><strong>불균형 데이터</strong> — 결함/정상 비율이 1:100인 분류 문제에서 정확도 99%는 의미 없다. F1-score, AUROC를 사용하고, SMOTE 등 오버샘플링을 고려한다.</p>
  </div>
</div>
