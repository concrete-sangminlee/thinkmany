# 숫자 뒤에 숨은 의미

실험을 끝냈다. 데이터가 있다. 그래프를 그려보니 "뭔가 차이가 있는 것 같다." 새로운 방법이 기존 방법보다 결과가 좋아 보인다. 하지만 "보인다"와 "증명된다"는 완전히 다른 차원의 이야기다. 리뷰어는 "이 차이가 통계적으로 유의한가?"라고 물을 것이고, 답하지 못하면 논문은 거절된다.

통계학은 공학 대학원생에게 선택이 아니다. 연구 결과를 "증명"하는 언어 자체가 통계다. 실험 3회 반복의 평균이 기존보다 5% 높다고 해서, 그것이 진짜 차이인지 우연인지를 구분하는 도구가 통계적 검정이다. 실험을 몇 번 해야 의미 있는 결론을 내릴 수 있는지를 결정하는 도구가 실험 설계(Design of Experiments)다.

이 장에서는 공학 연구에서 실제로 필요한 통계 개념과 실험 설계 방법을 다룬다. 수학적 엄밀성보다는 "내 논문에 이것을 어떻게 적용할 것인가"에 초점을 맞춘다. ch21에서 다룬 머신러닝 회귀와의 차이도 명확히 구분한다.

---

## 왜 통계인가

공학 연구에서 통계가 필요한 이유는 근본적이다. 우리가 다루는 데이터에는 항상 변동성(variability)이 있다. 같은 배합의 콘크리트를 같은 조건에서 만들어도, 시편마다 강도가 다르다. 같은 시뮬레이션을 같은 조건에서 돌려도, 난수 시드에 따라 결과가 달라진다. 같은 센서로 같은 대상을 측정해도, 측정값이 미세하게 변한다.

이 변동성이 존재하기 때문에, "A가 B보다 낫다"를 주장하려면 "그 차이가 변동성으로 인한 우연이 아니라는 것"을 보여야 한다. 이것이 통계적 검정의 본질이다.

통계를 모르면 생기는 현실적인 문제가 있다. 리뷰어가 "statistical significance를 보여달라"고 하면 답할 수 없다. 실험을 3회 반복했는데 충분한지 아닌지 판단할 수 없다. 요인(factor)이 여러 개일 때 실험을 어떤 순서로, 몇 번 해야 하는지 결정할 수 없다. 이 모든 것이 연구의 효율과 논문의 품질을 직접 좌우한다.

---

## 기술통계 vs 추론통계

통계학은 크게 두 가지로 나뉜다. 기술통계(Descriptive Statistics)와 추론통계(Inferential Statistics)다.

**기술통계**는 데이터를 요약하고 기술하는 것이다. 평균, 중앙값, 표준편차, 최솟값, 최댓값, 사분위수 등. "이 데이터가 어떻게 생겼는가"를 숫자로 보여준다. 히스토그램, 박스플롯, 산점도 같은 시각화도 기술통계의 영역이다.

**추론통계**는 표본(sample)에서 모집단(population)에 대한 결론을 이끌어내는 것이다. 우리는 콘크리트 시편 30개를 시험하지만, 알고 싶은 것은 "이 배합의 콘크리트 전체"의 강도다. 30개의 시편은 표본이고, 전체 콘크리트는 모집단이다. 추론통계가 이 다리를 놓는다.

공학 논문에서는 둘 다 필요하다. Results 섹션에서 기술통계로 데이터를 요약하고(평균 ± 표준편차), 추론통계로 차이의 유의성을 검정한다(p-value). 이 두 가지가 빠지면 리뷰어는 "데이터 해석이 불충분하다"고 지적한다.

<div class="highlight-box info">
<span class="highlight-box-icon">ℹ️</span>
<div class="highlight-box-content">
<p><strong>공학에서 자주 쓰는 기술통계 지표</strong></p>
<p><strong>평균(Mean)</strong>: 데이터의 중심. 가장 많이 쓰지만 이상치에 민감하다. <strong>중앙값(Median)</strong>: 이상치에 강건한 중심 지표. 데이터가 치우쳐 있을 때 평균보다 유용하다. <strong>표준편차(SD)</strong>: 데이터의 퍼짐 정도. 제조 공정의 품질 관리에서 핵심이다. <strong>변동계수(CV = SD/Mean)</strong>: 단위가 다른 변동성을 비교할 때 사용한다. 강도의 CV와 변위의 CV를 직접 비교할 수 있다.</p>
</div>
</div>

---

## 가설 검정: 차이를 증명하는 방법

가설 검정(Hypothesis Testing)은 추론통계의 핵심이다. 기본 구조는 이렇다.

1. **귀무가설(H₀)** 설정: "차이가 없다", "효과가 없다"는 가설. 예: "새 공법의 강도와 기존 공법의 강도는 같다."
2. **대립가설(H₁)** 설정: "차이가 있다", "효과가 있다"는 가설. 예: "새 공법의 강도가 기존 공법보다 높다."
3. **검정 통계량** 계산: 데이터로부터 검정에 필요한 통계량을 계산한다.
4. **p-value** 계산: 귀무가설이 참일 때, 관측된 결과(또는 그보다 극단적인 결과)가 나올 확률.
5. **판단**: p-value가 유의수준(보통 0.05) 미만이면 귀무가설을 기각하고, "통계적으로 유의한 차이가 있다"고 결론짓는다.

어떤 검정을 써야 하는지는 데이터의 유형과 비교 구조에 따라 결정된다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch35-ttest">t-test</button>
<button class="tab-btn" data-tab="tab-ch35-anova">ANOVA</button>
<button class="tab-btn" data-tab="tab-ch35-chi">카이제곱 검정</button>
<button class="tab-btn" data-tab="tab-ch35-nonparam">비모수 검정</button>
</div>
<div class="tab-content active" id="tab-ch35-ttest">

### t-test: 두 그룹 비교

**독립표본 t-test(Independent t-test)**: 두 개의 독립적인 그룹을 비교한다. "새 공법 시편 30개 vs 기존 공법 시편 30개"처럼, 서로 다른 대상에서 측정된 두 그룹의 평균을 비교할 때 사용한다.

**대응표본 t-test(Paired t-test)**: 같은 대상에서 두 번 측정한 결과를 비교한다. "같은 구조물의 보수 전 vs 보수 후 강도"처럼, 동일 대상의 전후 비교에 사용한다.

**단일표본 t-test(One-sample t-test)**: 하나의 그룹 평균이 특정 값과 다른지 검정한다. "이 콘크리트의 평균 강도가 설계 기준 21 MPa를 초과하는가?"

**전제 조건**: 데이터가 정규분포를 따르고, 분산이 동질적이어야 한다. Shapiro-Wilk 검정으로 정규성을, Levene 검정으로 등분산성을 확인한다. 전제가 안 맞으면 비모수 검정(Mann-Whitney U 등)을 사용한다.

**적합한 상황**: 비교 대상이 정확히 2개일 때. 3개 이상이면 ANOVA를 써야 한다.

</div>
<div class="tab-content" id="tab-ch35-anova">

### ANOVA: 세 그룹 이상 비교

**일원분산분석(One-way ANOVA)**: 하나의 요인(factor)에 대해 3개 이상의 그룹을 동시에 비교한다. "배합 A, B, C, D의 강도에 차이가 있는가?" t-test를 여러 번 하면 안 되는 이유는, 비교 횟수가 늘어날수록 1종 오류(실제로 차이가 없는데 있다고 판단하는 오류)의 확률이 누적되기 때문이다. 3개 그룹을 t-test로 3번 비교하면(A-B, A-C, B-C), 유의수준 0.05에서도 1종 오류 확률이 약 14%까지 올라간다.

**이원분산분석(Two-way ANOVA)**: 두 개의 요인을 동시에 분석한다. "배합(A, B, C)과 양생 온도(20도, 40도, 60도)가 강도에 미치는 영향은?" 두 요인의 주효과(main effect)뿐 아니라 상호작용(interaction effect)도 확인할 수 있다. 상호작용이란 "배합의 효과가 양생 온도에 따라 달라지는 현상"이다.

**사후검정(Post-hoc test)**: ANOVA에서 "차이가 있다"는 결론이 나오면, 구체적으로 어떤 그룹 간에 차이가 있는지를 추가로 검정한다. Tukey HSD, Bonferroni, Scheffé 등의 방법이 있다. ANOVA만 하고 사후검정을 안 하면 "차이가 있다는 건 알겠는데, 어디서?"라는 질문에 답하지 못한다.

**적합한 상황**: 비교 대상이 3개 이상, 요인이 1-2개일 때. 요인이 3개 이상이면 실험 설계(DOE)와 결합해야 한다.

</div>
<div class="tab-content" id="tab-ch35-chi">

### 카이제곱 검정: 범주형 데이터

**적합도 검정(Goodness-of-fit test)**: 관측된 빈도가 기대 빈도와 일치하는지 검정한다. "결함 유형의 분포가 균등한가?" "파괴 모드가 이론적 예측과 일치하는가?"

**독립성 검정(Test of independence)**: 두 범주형 변수가 서로 독립인지 검정한다. "재료 종류(A, B, C)와 결함 유무(결함/정상)가 관련이 있는가?" 교차표(contingency table)를 만들고, 관측 빈도와 기대 빈도의 차이를 분석한다.

카이제곱 검정은 수치 데이터가 아닌 범주형 데이터에 사용한다. 공학에서는 합격/불합격 판정, 결함 분류, 파괴 모드 분류 등에서 쓰인다. 기대 빈도가 5 미만인 셀이 있으면 Fisher's exact test를 대신 사용한다.

**적합한 상황**: 데이터가 범주형(개수, 빈도)일 때. 연속형 수치 데이터에는 부적합하다.

</div>
<div class="tab-content" id="tab-ch35-nonparam">

### 비모수 검정: 정규분포를 못 믿을 때

데이터가 정규분포를 따르지 않거나, 표본 크기가 매우 작을 때(n < 15 정도), 비모수 검정(Non-parametric test)을 사용한다. 비모수 검정은 데이터의 분포에 대한 가정이 약하므로 더 안전하지만, 검정력(statistical power)은 대응되는 모수 검정보다 낮다.

**Mann-Whitney U 검정**: 독립표본 t-test의 비모수 대안. 두 독립 그룹의 중앙값 차이를 검정한다.

**Wilcoxon 부호 순위 검정**: 대응표본 t-test의 비모수 대안. 동일 대상의 전후 차이를 검정한다.

**Kruskal-Wallis 검정**: 일원분산분석(ANOVA)의 비모수 대안. 3개 이상 그룹의 차이를 검정한다.

공학 데이터에서 비모수 검정이 필요한 경우는 생각보다 흔하다. 피로 수명 데이터(로그정규분포), 극값 데이터(극치분포), 소규모 시험 데이터 등이 대표적이다.

</div>
</div>

---

## p-value의 의미와 오해

p-value는 통계학에서 가장 많이 쓰이면서, 가장 많이 오해되는 개념이다.

**p-value가 의미하는 것**: 귀무가설이 참이라고 가정했을 때, 관측된 데이터(또는 그보다 극단적인 데이터)가 나올 확률. p = 0.03이면, "실제로 차이가 없는데 이 정도 차이가 관측될 확률이 3%"라는 뜻이다.

<div class="highlight-box warning">
<span class="highlight-box-icon">⚠️</span>
<div class="highlight-box-content">
<p><strong>p < 0.05는 마법의 숫자가 아니다</strong></p>
<p>p = 0.049와 p = 0.051은 본질적으로 다르지 않다. 하나는 "유의하다"이고 하나는 "유의하지 않다"로 판정되지만, 실질적인 차이는 무시할 수준이다. 0.05라는 기준은 관례일 뿐 물리 법칙이 아니다. p-value만으로 결론을 내리지 말고, 효과 크기(effect size)와 신뢰 구간(confidence interval)을 함께 보고하라. "p < 0.05이므로 유의하다"로 끝내지 말고, "평균 차이는 3.2 MPa (95% CI: 1.8-4.6 MPa, p = 0.002)이며 이는 실용적으로도 의미 있는 크기다"라고 써야 한다.</p>
</div>
</div>

**p-value가 의미하지 않는 것**: "귀무가설이 참일 확률"이 아니다. "효과의 크기"를 말해주지 않는다. "결과가 중요하다"를 의미하지 않는다. p = 0.001이어도 실질적으로 의미 없는 작은 차이일 수 있다. 표본이 매우 크면 아무리 작은 차이도 통계적으로 유의해진다.

---

## 신뢰 구간과 효과 크기

p-value의 한계를 보완하는 두 가지 도구가 있다.

**신뢰 구간(Confidence Interval, CI)**: 모수(모집단의 평균 등)가 포함될 것으로 기대되는 구간이다. "95% 신뢰 구간이 [2.1, 4.3] MPa"라는 것은, 이 실험을 100번 반복하면 95번은 이 구간 안에 실제 평균이 포함된다는 뜻이다. 신뢰 구간이 좁으면 추정이 정밀한 것이고, 넓으면 불확실한 것이다. 신뢰 구간이 0을 포함하면 차이가 유의하지 않다는 뜻이다.

**효과 크기(Effect Size)**: 차이의 "실질적인 크기"를 나타내는 지표다. Cohen's d가 대표적이다. d = (평균 차이) / (합동 표준편차)로 계산하며, 일반적으로 d = 0.2(작은 효과), 0.5(중간 효과), 0.8(큰 효과)로 해석한다. p-value가 "차이가 있는가"를 답한다면, 효과 크기는 "그 차이가 얼마나 큰가"를 답한다.

논문에서는 p-value, 신뢰 구간, 효과 크기를 함께 보고하는 것이 최선이다. 최근의 저널 가이드라인도 이 방향으로 움직이고 있다.

---

## 검정 선택 요약 가이드

어떤 검정을 써야 할지 자주 혼동된다. 아래는 가장 흔한 상황별 가이드다.

**두 그룹의 평균 비교**: 정규분포이면 t-test, 아니면 Mann-Whitney U. 같은 대상의 전후 비교면 Paired t-test 또는 Wilcoxon.

**세 그룹 이상의 평균 비교**: 정규분포이면 ANOVA + 사후검정(Tukey HSD), 아니면 Kruskal-Wallis + Dunn's test.

**두 변수 간 관계**: 연속형이면 Pearson 상관(정규) 또는 Spearman 상관(비정규). 범주형이면 카이제곱 검정.

**요인이 여러 개**: 이원분산분석(Two-way ANOVA) 또는 실험 설계(DOE) 방법론 적용.

**데이터가 매우 적다 (n < 15)**: 비모수 검정을 우선 고려한다.

<div class="highlight-box info">
<span class="highlight-box-icon">ℹ️</span>
<div class="highlight-box-content">
<p><strong>정규성 검정은 언제 하는가?</strong></p>
<p>모수 검정(t-test, ANOVA)을 사용하기 전에 정규성을 확인해야 한다. Shapiro-Wilk 검정이 가장 많이 쓰인다. 그러나 표본이 크면(n > 30) 중심극한정리에 의해 평균의 분포가 정규분포에 근사하므로, 정규성 검정의 중요도가 낮아진다. 반대로 표본이 작으면(n < 15) 정규성 검정의 검정력 자체가 낮아서, 비정규라는 결론을 내리기 어렵다. 실무적으로는 Q-Q plot을 시각적으로 확인하고, 명백한 비정규성이 보이면 비모수 검정을 사용하는 접근이 합리적이다.</p>
</div>
</div>

---

## 실험 설계 (Design of Experiments)

실험을 "하고 나서" 통계를 적용하는 것도 중요하지만, "하기 전에" 실험을 체계적으로 설계하는 것이 더 중요하다. 잘못 설계된 실험에서는 아무리 정교한 통계를 적용해도 의미 있는 결론을 이끌어내기 어렵다.

실험 설계(DOE, Design of Experiments)는 제한된 실험 횟수로 최대한 많은 정보를 얻기 위한 체계적 방법론이다. ch17에서 다룬 민감도 분석도 실험 설계의 맥락에서 더 효율적으로 수행할 수 있다.

### 완전 요인 설계 (Full Factorial Design)

모든 요인의 모든 수준 조합을 실험한다. 3개 요인이 각각 2수준이면 2³ = 8회 실험이다. 모든 주효과와 상호작용 효과를 추정할 수 있다는 장점이 있지만, 요인과 수준이 늘어나면 실험 횟수가 기하급수적으로 증가한다(4개 요인 × 3수준 = 81회).

### 부분 요인 설계 (Fractional Factorial Design)

완전 요인의 일부분만 실험한다. 2⁶⁻² 설계는 6개 요인을 2수준으로, 64회 대신 16회로 실험한다. 고차 상호작용(3개 이상 요인의 동시 효과)을 포기하는 대신 실험 횟수를 획기적으로 줄인다. 공학에서는 고차 상호작용이 중요한 경우가 드물기 때문에, 부분 요인 설계가 매우 실용적이다.

### 라틴 방격법 (Latin Square Design)

두 개의 블록 요인(예: 배치 간 차이, 장비 간 차이)을 통제하면서 하나의 처리 요인을 검정할 때 사용한다. 행과 열에 블록 요인을, 셀에 처리를 배치하되 각 행과 열에 모든 처리가 한 번씩만 나타나도록 한다. 실험 환경의 변동을 효과적으로 통제할 수 있다.

### 직교 배열표 (Orthogonal Array)

다구치(Taguchi) 방법의 핵심 도구다. L9, L18, L27 같은 표준 배열표를 사용하여, 최소한의 실험으로 각 요인의 주효과를 독립적으로 추정한다. L9 배열은 4개 요인 × 3수준을 9회 실험으로 다룬다(완전 요인이면 81회).

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>다구치 방법의 핵심 철학</strong></p>
<p>다구치(Taguchi) 방법은 단순히 실험 횟수를 줄이는 것이 아니라, "잡음(noise)에 강건한(robust) 설계"를 추구한다. 제어 가능한 요인(controllable factor)과 제어 불가능한 잡음 요인(noise factor)을 구분하고, 잡음에 의한 품질 변동을 최소화하는 조건을 찾는다. SN비(Signal-to-Noise ratio)가 이 과정의 핵심 지표다. 제조 공정 최적화, 제품 설계, 재료 배합 설계 등에서 널리 쓰인다.</p>
</div>
</div>

---

## 표본 크기와 검정력

"실험을 몇 번 해야 하나?"는 대학원생이 가장 자주 던지는 질문 중 하나다. 답은 "그때그때 다르다"가 아니라, **검정력 분석(Power Analysis)**으로 계산할 수 있다.

**검정력(Statistical Power)**은 "실제로 차이가 있을 때, 그 차이를 탐지할 확률"이다. 검정력 80%면, 실제로 차이가 있는 경우 5번 중 4번은 검정에서 유의하다는 결론을 내린다는 뜻이다. 학계의 관례적 기준은 80%다.

검정력은 네 가지 요소에 의해 결정된다: (1) 효과 크기(탐지하려는 차이의 크기), (2) 표본 크기, (3) 유의수준(보통 0.05), (4) 검정력 자체. 이 중 세 가지를 알면 나머지 하나를 계산할 수 있다. 보통은 효과 크기, 유의수준, 검정력을 정하고, 필요한 표본 크기를 계산한다.

Python의 `statsmodels` 라이브러리나 G*Power(무료 소프트웨어)로 검정력 분석을 수행할 수 있다. 실험 전에 반드시 수행해서, "n = 5로 충분한가, n = 30이 필요한가"를 사전에 결정해야 한다. 실험을 다 끝내고 나서 "표본이 부족하다"는 결론은 시간과 비용의 낭비다.

---

## 통계적 회귀 vs ML 회귀

ch21에서 머신러닝의 회귀(regression)를 다뤘다. 여기서 다루는 통계적 회귀와 ML 회귀는 이름은 같지만 목적과 철학이 다르다. 이 차이를 명확히 이해하는 것이 중요하다.

<div class="do-dont">
<div class="do-box">
<h4>✅ 통계적 회귀 (해석이 목적)</h4>
<ul>
<li>각 변수의 효과를 정량화한다 (계수의 크기와 부호)</li>
<li>변수 간 관계의 통계적 유의성을 검정한다 (p-value)</li>
<li>모델의 전제 조건(정규성, 등분산성, 독립성)을 확인한다</li>
<li>잔차 분석(residual analysis)으로 모델 적합도를 진단한다</li>
<li>"X가 1 단위 증가하면 Y는 평균적으로 β만큼 변한다"가 핵심 결론</li>
</ul>
</div>
<div class="dont-box">
<h4>❌ ML 회귀 (예측이 목적)</h4>
<ul>
<li>새로운 데이터에 대한 예측 정확도를 최대화한다</li>
<li>교차 검증으로 일반화 성능을 평가한다 (R², RMSE)</li>
<li>변수 간 관계보다 예측 성능에 초점을 맞춘다</li>
<li>블랙박스 모델도 예측이 정확하면 허용한다</li>
<li>"새 데이터가 들어왔을 때 Y를 얼마로 예측하는가"가 핵심 결론</li>
</ul>
</div>
</div>

실무적 구분은 이렇다. "물-시멘트비가 강도에 미치는 영향이 통계적으로 유의한가?"는 통계적 회귀의 질문이다. "이 배합의 28일 강도를 예측하라"는 ML 회귀의 질문이다. 논문에서 두 접근법을 혼동하면 리뷰어가 반드시 지적한다. ch21에서 다룬 R², RMSE 같은 메트릭은 ML 회귀의 평가 도구이고, 여기서 다룬 p-value, 신뢰 구간, 잔차 분석은 통계적 회귀의 평가 도구다.

둘을 같은 논문에서 함께 쓸 수도 있다. 통계적 회귀로 "어떤 요인이 중요한가"를 밝히고, ML 회귀로 "그 요인들을 사용한 예측 모델의 정확도"를 보여주는 구성이 효과적이다.

---

## 공학 데이터의 특수성

공학 데이터에는 통계 교과서에서 잘 다루지 않는 현실적 문제가 있다.

**반복 측정(Repeated Measurements)**: 같은 시편에서 여러 위치를 측정하거나, 같은 센서로 여러 번 측정하면, 데이터 간에 상관관계가 있다. 이 데이터를 독립적인 것으로 취급하면 표본 크기를 과대 평가하게 된다. 반복 측정 ANOVA(Repeated Measures ANOVA)나 혼합 효과 모델(Mixed-effects model)을 사용해야 한다. ch23에서 다룬 GroupKFold도 같은 맥락이다.

**불균형 데이터(Unbalanced Data)**: 실험 현실에서 각 조건의 시편 수가 동일하지 않은 경우가 흔하다. 시편이 깨지거나, 장비 문제로 일부 실험이 누락되거나, 예산 제약으로 특정 조건의 실험이 적을 수 있다. 불균형 데이터에서는 일반적인 ANOVA 대신 Type III 제곱합을 사용하거나, 비모수 방법을 적용해야 한다.

**물리적 제약(Physical Constraints)**: 강도는 음수가 될 수 없고, 비율은 0과 1 사이여야 하며, 농도는 0 이상이어야 한다. 이런 제약이 있는 데이터에 정규분포를 가정하면 물리적으로 불가능한 예측이 나올 수 있다. 로그 변환, 베타 분포, 감마 분포 등 데이터의 물리적 특성에 맞는 분포를 선택해야 한다.

**검열 데이터(Censored Data)**: 피로 시험에서 10만 사이클까지 돌렸는데 파괴되지 않은 시편이 있다. 이 시편의 수명은 "10만 사이클 이상"이라는 것만 알 뿐, 정확한 수명은 모른다. 이런 데이터를 제외하면 정보 손실이 크고, 10만 사이클로 취급하면 과소 추정이 된다. 생존 분석(Survival Analysis)이나 와이블 분석(Weibull Analysis)으로 검열 데이터를 올바르게 다룰 수 있다.

---

## 논문에서의 통계 분석 체크리스트

논문을 쓸 때, 통계 분석이 완전한지 아래 체크리스트로 확인하라. ch08에서 다룬 논문 작성 원칙과 함께 활용하면 효과적이다.

<div class="card-grid">
<div class="card">
<span class="card-icon">1️⃣</span>
<div class="card-title">기술통계 보고</div>
<div class="card-desc">평균 ± 표준편차(또는 중앙값 ± IQR)를 모든 주요 결과에 보고했는가? 표본 크기(n)를 명시했는가?</div>
</div>
<div class="card">
<span class="card-icon">2️⃣</span>
<div class="card-title">검정 방법 명시</div>
<div class="card-desc">사용한 통계 검정(t-test, ANOVA 등)을 Methodology에 명시했는가? 왜 그 검정을 선택했는지 근거가 있는가?</div>
</div>
<div class="card">
<span class="card-icon">3️⃣</span>
<div class="card-title">전제 조건 확인</div>
<div class="card-desc">정규성, 등분산성 등의 전제 조건을 검정했는가? 전제가 위배될 때 대안(비모수 검정 등)을 적용했는가?</div>
</div>
<div class="card">
<span class="card-icon">4️⃣</span>
<div class="card-title">유의수준과 p-value</div>
<div class="card-desc">유의수준을 사전에 정하고 명시했는가? p-value를 정확한 값으로 보고했는가(p = 0.023, p < 0.001)?</div>
</div>
<div class="card">
<span class="card-icon">5️⃣</span>
<div class="card-title">효과 크기와 신뢰 구간</div>
<div class="card-desc">p-value 외에 효과 크기(Cohen's d 등)와 95% 신뢰 구간을 보고했는가?</div>
</div>
<div class="card">
<span class="card-icon">6️⃣</span>
<div class="card-title">다중 비교 보정</div>
<div class="card-desc">여러 번의 검정을 수행했다면 Bonferroni 보정 등으로 다중 비교 문제를 처리했는가?</div>
</div>
</div>

---

## 통계 소프트웨어

통계 분석을 위한 도구는 여러 가지가 있다. 연구실 환경에 맞는 것을 선택하면 된다.

**Python (scipy.stats, statsmodels, pingouin)**: 무료, ML 파이프라인(ch23 참조)과 자연스럽게 통합된다. `scipy.stats`로 기본 검정을, `statsmodels`로 회귀 분석과 ANOVA를, `pingouin`으로 효과 크기와 검정력 분석을 수행할 수 있다. 코드로 분석 과정이 기록되므로 재현성이 높다.

**R**: 통계 분석의 "모국어." 통계 관련 패키지가 가장 풍부하다. 복잡한 실험 설계, 혼합 효과 모델, 베이지안 분석 등 고급 분석이 필요할 때 강하다. 다만 ML 파이프라인과의 통합이 Python보다 불편할 수 있다.

**Minitab**: 실험 설계(DOE)에 특화된 상용 소프트웨어. GUI 기반으로 직관적이며, 다구치 방법, 반응 표면법(RSM) 등이 잘 구현되어 있다. 학교 라이선스가 있는 경우가 있다.

**SPSS**: 사회과학에서 전통적으로 쓰이지만, 공학에서도 기본적인 통계 분석에 사용된다. GUI가 편리하지만, 자동화와 확장성이 낮다.

이미 Python으로 데이터 분석을 하고 있다면 Python을 권한다. ch19에서 다룬 검증(validation) 과정에서도 통계 검정은 필수적이므로, 분석 도구를 통일하는 것이 효율적이다.

### Python 코드 예시 (개념적)

```python
from scipy import stats
import numpy as np

# 독립표본 t-test
group_a = np.array([35.2, 33.8, 36.1, 34.5, 35.7])  # 공법 A 강도
group_b = np.array([38.1, 37.5, 39.2, 36.8, 38.4])  # 공법 B 강도

# 정규성 검정
_, p_norm_a = stats.shapiro(group_a)
_, p_norm_b = stats.shapiro(group_b)

# 등분산 검정
_, p_levene = stats.levene(group_a, group_b)

# t-test 수행
t_stat, p_value = stats.ttest_ind(group_a, group_b)
# p_value < 0.05이면 "두 공법의 강도에 유의한 차이가 있다"

# 효과 크기 (Cohen's d) 계산
pooled_std = np.sqrt((group_a.std()**2 + group_b.std()**2) / 2)
cohens_d = (group_b.mean() - group_a.mean()) / pooled_std
```

이 정도의 기본 코드면 대부분의 공학 논문에서 필요한 통계 검정을 수행할 수 있다. 중요한 것은 코드를 외우는 것이 아니라, 어떤 상황에서 어떤 검정이 적절한지를 판단하는 능력이다.

<div class="highlight-box important">
<span class="highlight-box-icon">🔑</span>
<div class="highlight-box-content">
<p><strong>통계는 실험 전에 계획하라</strong></p>
<p>통계 분석은 데이터를 다 모은 후에 "어떤 검정을 쓸까" 고민하는 것이 아니다. 실험 전에 (1) 어떤 가설을 검정할 것인가, (2) 어떤 검정을 사용할 것인가, (3) 표본 크기는 얼마나 필요한가를 결정해야 한다. 이것이 실험 설계다. 실험 후에 데이터를 보고 "유의한 결과가 나올 때까지" 다양한 검정을 시도하는 것은 p-hacking이라 불리며, 연구 윤리에 어긋난다(ch29 참조).</p>
</div>
</div>

---

## 다음 단계

이 장에서 다룬 통계와 실험 설계는 공학 연구의 기초 체력이다. 화려한 ML 모델을 돌리기 전에, 기본적인 t-test와 ANOVA를 올바르게 적용할 수 있어야 한다. 실험을 시작하기 전에, 표본 크기와 실험 배치를 체계적으로 계획할 수 있어야 한다.

ch21의 머신러닝, ch23의 ML 파이프라인과 이 장의 통계를 함께 활용하면, 데이터에서 결론까지의 전 과정을 탄탄하게 구축할 수 있다. 숫자 뒤에 숨은 의미를 제대로 읽어내는 것. 그것이 데이터를 다루는 공학자의 진짜 실력이다.

---

## 측정 불확실성과 오차 전파 — 공학 측정의 핵심 통계

공학 실험에서 "길이를 재어 보니 10.52 mm였다"라는 보고는 불완전하다. 그 측정의 불확실성이 ±0.01 mm인지 ±0.5 mm인지에 따라 결론이 완전히 달라진다. 불확실성이 없는 측정은 없으며, 이를 정량화하지 않은 데이터는 과학적 의미가 부족하다. 국제적으로 이 분야의 표준은 **GUM(Guide to the Expression of Uncertainty in Measurement)**으로 알려져 있고, 거의 모든 공학 측정 연구가 이 원칙을 따른다. 많은 학생이 이 개념을 처음 접할 때 "학부 때 배웠지만 잊었다"고 말한다. 박사 과정에서는 이것을 다시, 이번에는 제대로 배울 필요가 있다.

<div class="highlight-box highlight-important">

**"정확도"와 "정밀도"는 다르다.** 자주 혼용되지만 의미가 다르다. **정확도(Accuracy)**는 측정값이 참값에 얼마나 가까운지이고, **정밀도(Precision)**는 측정을 반복했을 때 결과가 얼마나 일관되는지다. 정밀하지만 부정확할 수 있고(체계적 오차가 있음), 정확하지만 정밀하지 않을 수도 있다(무작위 오차가 큼). 측정이 둘 중 어느 쪽에 문제가 있는지 구분하는 것이 개선의 출발이다.

</div>

**오차의 두 가지 유형.**

모든 측정 오차는 두 가지 범주로 나뉜다.

첫째, **무작위 오차(Random Error, Type A uncertainty)**: 측정을 반복할 때 무작위로 변동하는 오차. 환경 진동, 전자 노이즈, 관찰자의 판독 차이 등이 원인. 여러 번 측정하고 통계 처리하여 정량화한다. 표준편차, 표준오차로 표현한다. 측정 횟수를 늘리면 평균의 불확실성이 √n으로 감소한다.

둘째, **체계적 오차(Systematic Error, Type B uncertainty)**: 측정 전반에 걸쳐 일정한 방향으로 발생하는 오차. 기기 교정 오류, 온도 영향, 이론 모델의 단순화 등이 원인. 측정을 반복해도 줄어들지 않는다. 제조사 사양, 교정 인증서, 이론적 분석으로 추정한다.

좋은 측정은 두 유형 모두를 보고한다. "평균 10.52 mm, Type A 불확실성 ±0.01 mm, Type B 불확실성 ±0.03 mm, 결합 불확실성 ±0.032 mm"처럼.

**결합 불확실성(Combined Uncertainty)의 계산.**

여러 불확실성 원인이 함께 있을 때, 이들을 제곱합의 제곱근(root-sum-square)으로 결합한다. 이것을 GUM 방법이라고 한다.

$$u_c = \sqrt{u_A^2 + u_B^2}$$

독립적인 여러 원인이 있으면 모든 항을 더한다.

$$u_c = \sqrt{u_1^2 + u_2^2 + u_3^2 + ...}$$

이 결합은 "각 원인이 독립이고, 오차가 정규 분포를 따른다"는 가정에서 나온다. 이 가정이 깨지는 경우(예: 두 원인이 상관되어 있음)에는 공분산 항이 추가된다.

**확장 불확실성(Expanded Uncertainty).**

결합 불확실성 `u_c`는 보통 1-시그마(1σ) 수준이다. 이것은 약 68% 신뢰 구간에 해당한다. 대부분의 공학 보고서는 95% 신뢰 구간을 요구하므로, **포함 계수(coverage factor) k=2**를 곱한다.

$$U = k \cdot u_c \quad (k=2, \approx 95\%)$$

최종 보고 형식은 다음과 같다.

> $L = 10.52 \pm 0.064$ mm (k=2, 95% 신뢰)

이 형식이 공학 측정 보고의 국제 표준이다. 논문에 측정값을 보고할 때 이 형식을 따라야 한다.

**오차 전파(Error Propagation)의 실전.**

측정값이 다른 측정값들로부터 계산되는 경우가 대부분이다. 예를 들어 원통의 부피는 $V = \pi r^2 h$이고, $r$과 $h$ 각각에 불확실성이 있다. $V$의 불확실성은 어떻게 되는가? 이것이 **오차 전파** 문제다.

함수 $y = f(x_1, x_2, ..., x_n)$에서 각 $x_i$의 불확실성을 $u(x_i)$라 하면, $y$의 불확실성은 다음과 같이 계산된다.

$$u(y) = \sqrt{\sum_i \left(\frac{\partial f}{\partial x_i}\right)^2 u(x_i)^2}$$

(입력 변수들이 서로 독립일 때)

실전 공식 몇 가지:

- **덧셈/뺄셈** $y = x_1 + x_2$ 또는 $y = x_1 - x_2$:
  $u(y) = \sqrt{u(x_1)^2 + u(x_2)^2}$

- **곱셈/나눗셈** $y = x_1 \cdot x_2$ 또는 $y = x_1 / x_2$:
  $\frac{u(y)}{|y|} = \sqrt{\left(\frac{u(x_1)}{x_1}\right)^2 + \left(\frac{u(x_2)}{x_2}\right)^2}$
  즉 **상대 불확실성이 결합**된다.

- **거듭제곱** $y = x^n$:
  $\frac{u(y)}{|y|} = |n| \cdot \frac{u(x)}{|x|}$
  **거듭제곱만큼 상대 불확실성이 증폭**된다.

**원통 부피 예시.** $r = 5.0 \pm 0.1$ cm, $h = 10.0 \pm 0.2$ cm일 때:

$V = \pi \cdot 5^2 \cdot 10 = 785.4$ cm³

상대 불확실성:
- $r$의 상대 불확실성: $0.1/5.0 = 2\%$
- $h$의 상대 불확실성: $0.2/10.0 = 2\%$
- $r^2$의 상대 불확실성: $2 \times 2\% = 4\%$ (거듭제곱)
- $V$의 상대 불확실성: $\sqrt{4^2 + 2^2} = 4.47\%$

절대 불확실성: $785.4 \times 0.0447 \approx 35.1$ cm³

최종 보고: $V = 785 \pm 70$ cm³ (k=2, 95%)

이 단순한 계산이 보여주는 것은 **$r$의 2% 오차가 $V$의 4% 오차로 증폭된다**는 것이다. 계산식에 거듭제곱이 있으면, 그 변수의 측정 정밀도가 특히 중요하다.

**몬테카를로 방법의 대안.**

복잡한 비선형 함수에서는 해석적 오차 전파가 어렵다. 이때 **몬테카를로 방법**을 쓴다. 각 입력 변수를 그 불확실성 분포에서 무작위로 샘플링하고(예: 10,000번), 각 샘플에 대해 $y$를 계산하고, $y$의 분포를 분석한다. Python의 `numpy.random`으로 수십 줄 안에 구현 가능하다.

```python
import numpy as np

n_samples = 10000
r_samples = np.random.normal(5.0, 0.1/2, n_samples)  # k=2이면 /2
h_samples = np.random.normal(10.0, 0.2/2, n_samples)
V_samples = np.pi * r_samples**2 * h_samples

V_mean = V_samples.mean()
V_std = V_samples.std()
V_95 = np.percentile(V_samples, [2.5, 97.5])

print(f"V = {V_mean:.1f} ± {2*V_std:.1f} cm³")
print(f"95% CI: [{V_95[0]:.1f}, {V_95[1]:.1f}] cm³")
```

몬테카를로의 장점은 비정규 분포, 상관관계, 강한 비선형성도 자연스럽게 처리한다는 것이다. 해석적 오차 전파의 가정(선형성, 작은 오차)이 의심스러우면 몬테카를로로 검증한다.

**불확실성의 주요 원인 목록화.**

측정 불확실성 보고서를 작성할 때, 모든 주요 원인을 빠짐없이 나열하는 것이 중요하다. 공학 측정에서 흔한 원인은 다음과 같다.

1. **계측기 분해능(resolution)**: 최소 눈금의 절반 또는 디지털의 최소 자릿수.
2. **제조사 교정 사양**: 제조사가 제공하는 정확도 사양. 보통 "±0.5% of reading"처럼 표현.
3. **최근 교정의 불확실성**: 교정 기관에서 받은 인증서에 명시된 값.
4. **환경 영향**: 온도, 습도, 압력, 진동의 변화가 측정값에 미치는 영향.
5. **반복성(repeatability)**: 같은 조건에서 여러 번 측정할 때의 표준편차.
6. **재현성(reproducibility)**: 다른 관찰자, 다른 시간, 다른 장비로 측정할 때의 차이.
7. **기준물질(reference standard)의 불확실성**: 교정에 쓰인 표준기의 불확실성.
8. **이론 모델의 단순화**: 사용하는 계산식에 내재된 가정.

이들 각각을 $u_i$로 추정하고, 결합 불확실성을 계산한다. 이 과정을 "**불확실성 예산(uncertainty budget)**"이라고 한다.

**불확실성 예산 표 예시.**

| 원인 | 추정값 | 분포 가정 | 표준 불확실성 $u_i$ |
|------|--------|-----------|---------------------|
| 계측기 분해능 | ±0.005 mm | 균일 | 0.0029 mm |
| 제조사 사양 | ±0.02 mm | 정규 (k=2) | 0.010 mm |
| 환경 온도 영향 | ±0.01 mm | 균일 | 0.0058 mm |
| 반복성(10회) | 0.008 mm | 정규 | 0.008 mm |
| 교정 표준기 | ±0.003 mm | 정규 (k=2) | 0.0015 mm |
| **결합 불확실성** | | | **0.0142 mm** |
| **확장 불확실성 (k=2)** | | | **0.028 mm** |

이 표가 논문의 Appendix에 들어가면 측정의 과학적 신뢰성을 보여준다. 리뷰어는 이 표를 본 순간 저자가 측정을 진지하게 다루고 있다고 판단한다.

**균일 분포와 정규 분포의 구분.**

각 불확실성 원인의 분포를 가정해야 한다.

- **정규 분포(Gaussian)**: 측정값이 평균 주변에 집중되는 경우. 반복 측정의 결과는 보통 정규 분포. 표준편차 $\sigma$가 바로 표준 불확실성.

- **균일 분포(Uniform)**: 어떤 범위 내에서는 모든 값이 같은 확률인 경우. 계측기 분해능, 아날로그 눈금의 판독 오차가 해당. 반폭 $a$에서 표준 불확실성은 $a/\sqrt{3}$.

- **삼각 분포(Triangular)**: 중심에서 선형으로 감소하는 경우. 반폭 $a$에서 표준 불확실성은 $a/\sqrt{6}$.

이 변환을 거쳐 모든 원인을 같은 단위(표준 불확실성)로 바꾼 후, 제곱합의 제곱근으로 결합한다.

**흔한 실수들.**

**실수 1: 최대 오차를 표준 불확실성으로 직접 사용.** 예를 들어 "이 계측기의 정확도는 ±0.05 mm"라고 쓰면서 $u = 0.05$로 쓰는 경우. 정확히 말하면 이 값은 "확장 불확실성(k=2) 또는 균일 분포의 반폭"일 가능성이 높고, 표준 불확실성은 이보다 작다. 제조사 사양을 읽고 어떤 분포를 가정할지 결정한다.

**실수 2: 표본 크기를 고려하지 않음.** 반복 측정을 3번 했을 때의 표준오차는 $\sigma/\sqrt{3}$이다. 그런데 많은 학생이 이것을 평균의 불확실성으로 잘못 쓴다. 정확히는 t-분포를 쓴 확장이 필요하다(작은 표본에서는 $k > 2$). 예를 들어 $n=4$에서 95% 신뢰 구간의 $k$는 약 3.18이다.

**실수 3: 체계적 오차를 무시.** 반복 측정만으로는 무작위 오차만 잡히고 체계적 오차는 보이지 않는다. 결합 불확실성을 계산할 때 제조사 사양, 교정 인증서 값을 반드시 포함한다.

**실수 4: 전파 공식 오용.** 곱셈인데 절대 오차를 더하거나, 덧셈인데 상대 오차를 결합하는 실수가 흔하다. 공식을 외우기보다는 일반 식 $u(y) = \sqrt{\sum (\partial f/\partial x_i)^2 u(x_i)^2}$을 직접 적용하는 것이 안전하다.

**실수 5: 단위 혼동.** 절대 불확실성(mm, kg 등)과 상대 불확실성(%)을 섞어 계산하면 오류가 난다. 모든 계산을 같은 형식으로 통일한 후 결합한다.

**공학 연구 논문에서의 실전 적용.**

실험 연구 논문에 측정 불확실성을 반드시 포함한다. 다음이 기본이다.

1. **Methods 섹션**: 사용한 계측기, 교정 상태, 측정 절차를 명시한다.
2. **Results 섹션**: 모든 측정값에 불확실성을 함께 보고한다. 오차막대(ch10 참조)로 그림에 표시한다.
3. **Discussion 섹션**: 측정 불확실성이 결론에 미치는 영향을 논의한다. 결론이 불확실성 범위 내에서 유의한지 확인.
4. **Appendix 또는 Supplementary**: 상세한 불확실성 예산 표를 제공한다.

이 네 가지가 있는 논문과 없는 논문의 리뷰 결과는 크게 다르다.

**측정 불확실성 학습 리소스.**

- **GUM (JCGM 100:2008)**: 국제 표준 문서. 무료로 BIPM 웹사이트에서 다운로드 가능. 영어 원문이지만 공학 측정 연구자라면 읽어둘 가치가 있다.
- **NIST TN 1297**: 미국 국립표준기술원의 측정 불확실성 가이드. GUM의 실용 해설.
- **Kirkup & Frenkel, "An Introduction to Uncertainty in Measurement"**: 입문자를 위한 교과서.
- **한국표준과학연구원(KRISS) 자료**: 한국어로 된 측정 표준 자료.

> 측정 불확실성은 "번거로운 추가 작업"이 아니라 측정의 정체성이다. 불확실성 없이 보고된 숫자는 과학이 아니라 의견이다. 박사 과정에서 모든 실험 측정에 불확실성을 함께 보고하는 습관을 들이면, 연구는 자연스럽게 국제 표준을 만족한다. 이것이 본인을 "잘 측정하는 연구자"로 만들고, 그 평판은 졸업 후에도 오래 남는다.

---

## 부트스트랩과 몬테카를로 — 분포 가정 없이 통계를 다루는 법

전통 통계는 **분포 가정**(정규 분포, t-분포 등)에 의존한다. "데이터가 정규 분포를 따른다고 가정하고..."로 시작하는 많은 검정. 그러나 현실의 공학 데이터는 종종 이 가정을 만족하지 않는다. 비대칭 분포, 이상치, 작은 표본. 이런 상황에서 전통 통계는 잘못된 결론을 준다. **부트스트랩(Bootstrap)**과 **몬테카를로(Monte Carlo) 방법**은 분포 가정 없이 통계적 추론을 할 수 있게 해준다. 박사 과정 학생이 이 방법을 익히면 많은 "통계적 고민"이 해결된다.

<div class="highlight-box highlight-important">

**"정규성 가정의 착각"**. 많은 학생이 t-test를 맹목적으로 사용하면서 "정규성 검정을 통과했다"고 넘어간다. 그러나 작은 표본(N < 30)에서 정규성 검정은 검출력이 낮아 "정규가 아닌 것을 정규로" 잘못 판단한다. 큰 표본(N > 1000)에서는 반대로 작은 편차도 "정규가 아니다"라고 판단한다. 어느 쪽이든 정규성 검정에 의존하는 것은 위험. 부트스트랩은 이 가정 자체를 없앤다.

</div>

**부트스트랩의 핵심 아이디어.**

부트스트랩은 Bradley Efron이 1979년 제안한 방법이다. 핵심 아이디어는 놀랍게 단순하다.

**"데이터를 모집단처럼 취급하고, 거기서 반복 재샘플링한다."**

100개의 측정값을 가지고 있다면, 이 100개에서 **복원 추출**로 100개를 다시 뽑는다. 원래 샘플과 약간 다른 새 "가상의 샘플"이 생긴다. 이것을 1000번, 10000번 반복. 매번 다른 가상의 샘플에서 통계량(평균, 중앙값, 회귀 계수 등)을 계산. 이 통계량들의 분포가 **부트스트랩 분포**다.

**놀라운 사실**: 이 부트스트랩 분포가 "진짜 통계량의 분포"를 매우 잘 근사한다. 왜? Glivenko-Cantelli 정리에 의해 경험 분포가 모집단 분포를 점근적으로 수렴하기 때문. 수학적으로 엄밀히 증명된 사실.

**부트스트랩의 기본 예시.**

**문제**: 50개 샘플의 콘크리트 압축 강도를 측정했다. 평균의 95% 신뢰 구간을 알고 싶다.

**전통 방법 (t-분포 가정)**:
```python
import numpy as np
from scipy import stats

data = np.array([25.3, 26.1, 24.8, ...])  # 50개
mean = data.mean()
se = data.std(ddof=1) / np.sqrt(len(data))
ci = stats.t.interval(0.95, len(data)-1, loc=mean, scale=se)
# 95% CI: (24.5, 26.8)
```

**이 방법의 가정**: 데이터가 정규 분포. 작은 샘플에서는 위험.

**부트스트랩 방법**:
```python
import numpy as np

data = np.array([25.3, 26.1, 24.8, ...])
n_bootstrap = 10000
bootstrap_means = []

for _ in range(n_bootstrap):
    # 복원 추출로 50개 재샘플링
    sample = np.random.choice(data, size=len(data), replace=True)
    bootstrap_means.append(sample.mean())

bootstrap_means = np.array(bootstrap_means)
ci_lower = np.percentile(bootstrap_means, 2.5)
ci_upper = np.percentile(bootstrap_means, 97.5)
# 95% CI: (24.6, 26.7)
```

**결과**: 두 방법이 비슷한 CI를 준다. 그런데 부트스트랩은 **가정 없음**. 데이터가 정규가 아니어도, 비대칭이어도, 이상치가 있어도 작동한다.

**부트스트랩이 빛나는 상황.**

**상황 1: 복잡한 통계량의 신뢰 구간.**
평균은 전통 방법으로 쉽게 CI를 계산한다. 그러나 **중앙값, 분위수, 표준편차, 상관계수, 회귀 계수**의 CI는 전통 방법으로 복잡하다. 부트스트랩은 어느 통계량에도 동일하게 적용 가능.

```python
# 중앙값의 95% CI
medians = [np.median(np.random.choice(data, len(data), replace=True))
           for _ in range(10000)]
print(np.percentile(medians, [2.5, 97.5]))

# 상관계수의 95% CI
def bootstrap_correlation(x, y, n=10000):
    corrs = []
    for _ in range(n):
        idx = np.random.choice(len(x), len(x), replace=True)
        corrs.append(np.corrcoef(x[idx], y[idx])[0, 1])
    return np.percentile(corrs, [2.5, 97.5])
```

**상황 2: 작은 표본.**
N=10, N=15 같은 작은 표본에서 전통 t-분포 가정은 약하다. 부트스트랩은 여전히 작동한다(다만 매우 작은 표본에서는 정확도가 낮을 수 있음).

**상황 3: 비대칭 또는 두꺼운 꼬리 분포.**
공학 데이터에서 자주 발생. 예: 피로 수명, 고장 시간, 균열 길이. 로그 정규, 지수, Weibull 분포. 부트스트랩은 이들에 모두 작동.

**상황 4: 두 그룹 비교.**
t-test의 부트스트랩 대안.

```python
# 두 그룹의 평균 차이에 대한 신뢰 구간
group_a = [...]  # 처리군
group_b = [...]  # 대조군

def bootstrap_diff(a, b, n=10000):
    diffs = []
    for _ in range(n):
        sample_a = np.random.choice(a, len(a), replace=True)
        sample_b = np.random.choice(b, len(b), replace=True)
        diffs.append(sample_a.mean() - sample_b.mean())
    return diffs

diffs = bootstrap_diff(group_a, group_b)
ci = np.percentile(diffs, [2.5, 97.5])
if ci[0] > 0 or ci[1] < 0:
    print("두 그룹 유의미한 차이")
```

**상황 5: 회귀 계수의 신뢰 구간.**
비선형 회귀나 복잡한 모델에서 해석적 CI가 어렵다. 부트스트랩은 단순.

```python
from sklearn.linear_model import LinearRegression

def bootstrap_regression(X, y, n=1000):
    coefs = []
    for _ in range(n):
        idx = np.random.choice(len(X), len(X), replace=True)
        model = LinearRegression().fit(X[idx], y[idx])
        coefs.append(model.coef_)
    return np.array(coefs)

coefs = bootstrap_regression(X, y)
for i in range(coefs.shape[1]):
    print(f"Coef {i}: {coefs[:, i].mean():.3f} "
          f"({np.percentile(coefs[:, i], 2.5):.3f}, "
          f"{np.percentile(coefs[:, i], 97.5):.3f})")
```

**부트스트랩의 변형들.**

기본 부트스트랩 외에 더 정교한 변형이 있다.

**1. Percentile Bootstrap.**
가장 단순. 부트스트랩 분포의 2.5%, 97.5% 분위수를 CI로 사용. 위에서 본 예시.

**2. BCa (Bias-Corrected and accelerated) Bootstrap.**
편향과 비대칭을 보정. 더 정확한 CI. Python의 `scipy.stats.bootstrap`에서 제공.

```python
from scipy.stats import bootstrap

data = np.array([...])
rng = np.random.default_rng()

res = bootstrap((data,), np.mean, confidence_level=0.95,
                method='BCa', random_state=rng)
print(res.confidence_interval)
```

**3. Block Bootstrap.**
시계열 데이터용. 인접한 샘플을 "블록"으로 묶어 재샘플링. 시간적 의존성 보존.

**4. Residual Bootstrap.**
회귀 모델에서 잔차를 부트스트랩. 예측의 불확실성 추정에 사용.

**5. Wild Bootstrap.**
이분산성(heteroskedasticity)이 있을 때 사용. 회귀 모델에 적용.

**부트스트랩의 주의사항.**

**주의 1: "마법이 아니다".**
부트스트랩이 모든 통계 문제를 해결하지 않는다. 데이터 자체가 편향되어 있으면 부트스트랩도 편향된 추정을 준다. "쓰레기 입력 = 쓰레기 출력".

**주의 2: 최소 샘플 크기.**
N=5, N=10 같은 매우 작은 샘플에서는 부트스트랩의 정확도가 떨어진다. 최소 N=30을 권장. N=50-100이 안전.

**주의 3: 반복 횟수.**
일반적으로 1,000-10,000번의 재샘플링. 간단한 통계(평균)는 1,000으로 충분. 복잡한 통계나 극단 분위수는 10,000 이상 필요.

**주의 4: 복원 추출.**
부트스트랩은 **복원 추출**(with replacement). 비복원 추출로 하면 같은 샘플이 나온다. Python `np.random.choice`의 `replace=True` 사용.

**주의 5: 계산 비용.**
부트스트랩은 계산이 많다. 10,000번 반복 × 복잡한 모델 = 시간이 오래 걸릴 수 있다. 병렬 처리나 GPU 가속 고려.

**몬테카를로 방법.**

부트스트랩이 "데이터에서 재샘플링"이라면, 몬테카를로는 "가정된 분포에서 샘플링"이다.

**기본 아이디어**: 분포를 안다면, 그 분포에서 많은 샘플을 뽑아 통계량의 분포를 추정.

**예시 1: π의 추정.**
고전적 예시. 단위 정사각형에 무작위 점을 뿌리고, 원 안에 들어가는 비율로 π를 추정.

```python
import numpy as np

n = 1000000
x = np.random.uniform(-1, 1, n)
y = np.random.uniform(-1, 1, n)
inside = (x**2 + y**2) < 1
pi_estimate = 4 * inside.mean()
print(pi_estimate)  # 약 3.14
```

**예시 2: 불확실성 전파.**
입력 파라미터의 분포를 알 때, 출력의 분포 계산. ch35의 "측정 불확실성" 섹션과 연결.

```python
# 원통의 부피 V = π r² h
# r과 h의 불확실성이 있을 때 V의 분포

n = 10000
r_samples = np.random.normal(5.0, 0.1, n)  # r = 5.0 ± 0.1
h_samples = np.random.normal(10.0, 0.2, n)  # h = 10.0 ± 0.2

V_samples = np.pi * r_samples**2 * h_samples

print(f"V = {V_samples.mean():.1f} ± {V_samples.std():.1f}")
print(f"95% CI: {np.percentile(V_samples, [2.5, 97.5])}")
```

**예시 3: 검정력 분석.**
"실험이 실제 효과를 탐지할 수 있을 확률은?" 몬테카를로로 시뮬레이션.

```python
def power_simulation(effect_size, n_per_group, n_sim=10000):
    p_values = []
    for _ in range(n_sim):
        group1 = np.random.normal(0, 1, n_per_group)
        group2 = np.random.normal(effect_size, 1, n_per_group)
        _, p = stats.ttest_ind(group1, group2)
        p_values.append(p)
    power = np.mean(np.array(p_values) < 0.05)
    return power

# N=20 per group, effect size = 0.5 (medium)
print(power_simulation(0.5, 20))  # 약 0.34
# 검정력 34%. 작음. N을 늘려야 함.
```

**예시 4: 복잡한 확률 모델.**
해석적 해가 없는 확률 문제. 예: 여러 부품의 고장 확률이 주어졌을 때 전체 시스템의 고장 확률.

**몬테카를로의 장점**:
- 어떤 복잡한 문제에도 적용 가능
- 구현이 단순
- 결과 해석이 직관적

**몬테카를로의 단점**:
- 정확도가 샘플 수에 비례 (√n)
- 계산 비용 큼
- 분포 가정이 필요 (부트스트랩은 데이터만 사용)

**부트스트랩 vs 몬테카를로의 차이.**

| 측면 | 부트스트랩 | 몬테카를로 |
|------|-----------|-----------|
| 기원 | 실제 데이터 | 가정된 분포 |
| 가정 | 데이터가 모집단 대표 | 분포 형태 |
| 사용 시기 | 분포 모름 | 분포 알거나 가정 |
| 예 | 실험 측정 CI | 불확실성 전파 |

두 방법은 상호 보완적이다. 상황에 따라 선택.

**부트스트랩과 몬테카를로의 공학 연구 활용.**

**활용 1: 실험 데이터의 불확실성 정량화.**
여러 번 측정한 데이터의 평균/중앙값/분위수의 CI를 부트스트랩으로 계산.

**활용 2: 시뮬레이션 결과의 불확실성.**
입력 파라미터의 불확실성을 몬테카를로로 출력에 전파. PINN이나 FEM 시뮬레이션에 적용.

**활용 3: 모델 성능의 CI.**
ML 모델의 정확도/F1 score의 신뢰 구간을 부트스트랩으로. "우리 모델은 92% ± 2% 정확도"처럼 보고.

```python
def bootstrap_accuracy(y_true, y_pred, n=1000):
    accuracies = []
    for _ in range(n):
        idx = np.random.choice(len(y_true), len(y_true), replace=True)
        acc = (y_true[idx] == y_pred[idx]).mean()
        accuracies.append(acc)
    return np.percentile(accuracies, [2.5, 97.5])
```

**활용 4: 두 모델 비교의 통계적 유의성.**
"모델 A가 모델 B보다 정말 더 좋은가?" 부트스트랩으로 확인.

**활용 5: 희귀 사건 분석.**
구조물 파괴 확률, 장비 고장률 같은 희귀 사건의 확률 추정.

**활용 6: 역문제의 parameter 추정.**
ch24의 PINN 역문제와 연결. 파라미터의 posterior 분포를 추정.

**논문에서의 부트스트랩/몬테카를로 보고.**

논문에 이 방법을 사용했을 때 보고할 정보.

**필수 정보**:
- 방법 이름 (Bootstrap, Monte Carlo)
- 재샘플링/샘플링 횟수 (예: 10,000회)
- 신뢰 수준 (95%)
- 어떤 통계량을 부트스트랩했는지
- 사용한 변형 (Percentile, BCa 등)
- 시드 (재현성)

**예시 서술**:
> "We computed 95% confidence intervals for the mean using
> non-parametric bootstrap with 10,000 resamples. The BCa
> method was used to correct for bias and asymmetry. All
> computations used a fixed random seed (42) for
> reproducibility."

**부트스트랩과 전통 통계의 조화.**

부트스트랩이 있다고 전통 통계를 버리는 것은 아니다. 두 방법을 **상호 검증**에 사용.

```python
# 전통 t-test
t_stat, p_traditional = stats.ttest_ind(group_a, group_b)

# 부트스트랩 p-value
def bootstrap_p_value(a, b, n=10000):
    observed = a.mean() - b.mean()
    combined = np.concatenate([a, b])
    diffs = []
    for _ in range(n):
        np.random.shuffle(combined)
        diffs.append(combined[:len(a)].mean() - combined[len(a):].mean())
    p_boot = np.mean(np.abs(diffs) >= np.abs(observed))
    return p_boot

print(f"Traditional p: {p_traditional:.4f}")
print(f"Bootstrap p: {bootstrap_p_value(group_a, group_b):.4f}")
```

두 p-value가 비슷하면 전통 방법의 가정이 맞다는 증거. 크게 다르면 전통 방법을 의심하고 부트스트랩을 신뢰.

**Python 라이브러리.**

부트스트랩을 쉽게 할 수 있는 라이브러리들.

**1. scipy.stats.bootstrap (Python).**
표준 구현. Percentile, BCa, basic 방법 지원.

```python
from scipy.stats import bootstrap

data = (np.array([...]),)
res = bootstrap(data, np.mean, n_resamples=10000,
                confidence_level=0.95, method='BCa')
```

**2. bootstrapped (Python).**
더 유연한 커스텀 부트스트랩.

```python
import bootstrapped.bootstrap as bs
import bootstrapped.stats_functions as bs_stats

data = np.array([...])
ci = bs.bootstrap(data, stat_func=bs_stats.mean,
                   num_iterations=10000)
```

**3. R의 boot 패키지.**
R에서는 boot이 표준. 기능이 풍부.

**학습 자원.**

- **Efron & Tibshirani, "An Introduction to the Bootstrap"**: 고전 교과서. 수학적으로 엄밀.
- **Davison & Hinkley, "Bootstrap Methods and their Application"**: 응용 중심.
- **"Statistical Rethinking" (McElreath)**: 부트스트랩과 Bayesian의 연결.
- **scipy 공식 문서**: 실전 코드 예시.

**통계 교육의 미래.**

현대 통계 교육은 점점 부트스트랩과 시뮬레이션 기반으로 이동하고 있다. Tim Hesterberg의 "What Teachers Should Know About the Bootstrap"은 이 변화를 보여준다. "정규 분포 가정"의 한계를 인식하고, 계산 능력을 활용한 직관적 방법으로 전환.

박사 과정에서 부트스트랩을 익히면, 통계의 직관을 훨씬 빠르게 발전시킬 수 있다. t-분포의 공식을 외우는 대신 "재샘플링으로 무슨 일이 일어나는지"를 직접 본다. 이것이 통계에 대한 더 깊은 이해를 준다.

> 부트스트랩과 몬테카를로는 현대 통계의 "보편적 도구"다. 이 두 방법을 익히면, 정규 분포 가정이 맞는지 불안해할 필요 없이, 어떤 데이터에도 통계적 추론을 할 수 있다. 전통 통계의 공식들이 "특수 상황의 지름길"이라면, 부트스트랩은 "일반 상황의 직접 해결책"이다. 박사 과정 학생이 이 두 관점을 모두 갖는 것이 현대적 통계 사고다.
