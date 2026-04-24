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

---

## 복제 위기와 박사 연구의 통계적 방어

2010년대 이후 학계가 직면한 가장 큰 통계적 도전 중 하나는 **복제 위기(Replication Crisis)**다. 유명 논문의 결과가 재현되지 않는 현상이 심리학·경제학·의학·공학 전반에 걸쳐 드러났다. 원인의 상당 부분이 **통계의 잘못된 사용**이다. 이 섹션은 박사 연구가 복제 위기의 희생자 또는 가해자가 되지 않도록 하는 통계적 방어 기술을 다룬다.

<div class="highlight-box warning">
<span class="highlight-box-icon">⚠️</span>
<div class="highlight-box-content">
<p><strong>복제 위기의 숫자</strong></p>
<p>Open Science Collaboration의 2015년 대규모 복제 연구: 심리학 영향력 있는 논문 100편 중 <em>39%만 복제 성공</em>. 경제학: Camerer et al. (2016)의 실험 경제학 18편 중 11편(61%)만 복제. 암 연구: Begley & Ellis (2012)의 주요 전임상 논문 53편 중 <em>6편(11%)만 재현</em>. 이 숫자들이 과학의 신뢰를 흔들었고, 박사 과정 학생이 본인의 연구가 같은 운명을 맞지 않도록 대비하는 것이 현대 박사의 숨은 책임이 됐다.</p>
</div>
</div>

### 복제 실패의 다섯 가지 원인

**원인 1: p-hacking (P값 조작)**.
같은 데이터에 여러 분석을 시도한 후 p<0.05가 나오는 결과만 보고. 혹은 outlier를 특정 방법으로 제거해 원하는 결과를 만듦. 의도적 조작이 아니라 **무의식적 데이터 마사지**가 더 흔함.

**원인 2: HARKing (Hypothesizing After Results are Known)**.
결과를 본 후에 가설을 세우고, 마치 처음부터 그 가설로 실험한 것처럼 논문을 쓰기. "이것이 본인의 원래 가설이었다"는 사후 재구성.

**원인 3: Low Statistical Power**.
표본 크기가 작아 진짜 효과를 감지할 힘이 부족. 감지되는 효과는 과대평가됨 ("winner's curse"). 대부분의 박사 실험이 이 문제를 가짐.

**원인 4: Selective Reporting**.
"유의한" 결과만 논문에 보고하고 "유의하지 않은" 결과는 서랍에 묻어둠. 분야 전체가 진짜 효과를 과대평가.

**원인 5: Multiple Testing without Correction**.
한 데이터에 100개 검정을 하면 우연히 5개가 p<0.05가 남. 보정 없이 "유의함"을 주장.

이 다섯 가지가 서로 강화하며 복제 위기의 누적 원인이 된다.

### 박사 연구에서 방어하는 다섯 가지 기술

**방어 1: 사전 분석 계획 (Pre-registration)**.
실험 전에 가설·방법·통계 분석을 명시한 문서. OSF(Open Science Framework) 또는 AsPredicted.org에 기록. 분석 중 추가하는 내용은 "exploratory"로 명시. ch38의 사전등록 섹션과 연결.

**장점**: p-hacking·HARKing을 원천 차단. 박사 논문의 신뢰성을 근본적으로 높임.
**비용**: 사전 계획에 2-5시간. 나중에 새 가설이 생겨도 명시적으로 "추가 분석"이라고 표시해야 함.

**방어 2: Proper Power Analysis**.
실험 전에 **예상 효과 크기·필요 표본 수·목표 power**를 계산. G*Power, R의 `pwr` 패키지. 일반적 목표: 80% power (β=0.2), α=0.05.

대부분의 박사 실험은 50% 이하의 power로 수행. 즉 진짜 효과가 있어도 반만 감지. Power 80% 이상을 목표로 하는 박사의 결과가 복제될 확률이 3-5배 높음.

**방어 3: Multiple Testing Correction**.
여러 검정을 동시에 할 때 보정 필수.

| 보정 방법 | 엄격성 | 적용 상황 |
|---|---|---|
| Bonferroni | 가장 엄격 | 독립적 검정이 5개 이하 |
| Holm-Bonferroni | 중간 | 순차 검정, 10-20개 |
| Benjamini-Hochberg (FDR) | 유연 | 수백-수천 개 검정 (유전자학·이미지) |
| Tukey HSD | 전문 | ANOVA 사후 비교 |

박사 논문에서 multiple testing을 했다면 어떤 보정을 썼는지 명시 필수.

**방어 4: 효과 크기 + 신뢰 구간 우선 보고**.
p-value만 보고하지 않고 Cohen's d, Hedges' g, 신뢰 구간을 함께. 효과 크기는 표본 수와 무관하게 "얼마나 큰 효과인가"를 보여줌. 작은 효과가 큰 표본으로 유의해진 경우를 드러냄.

**방어 5: Replication-Ready Documentation**.
본인의 논문이 다른 연구자가 재현할 수 있도록 문서화.
- 원본 데이터 공개 (ch38의 오픈 데이터)
- 코드 공개 (GitHub, Zenodo DOI)
- 사전 분석 계획 링크
- 실패한 분석도 부록에 포함

### 공학·AI 분야의 복제 위기

"복제 위기는 심리학 문제"라고 생각하기 쉽지만 공학·AI도 예외가 아니다.

**AI 분야의 복제 문제**:
- ML 논문의 약 30-40%가 학습 코드를 공개하지 않음 (2022 NeurIPS 조사)
- 같은 코드로도 seed·hardware에 따라 결과 상이 (ch38 참조)
- 벤치마크의 overfit (Common Benchmark에 과도하게 조정된 모델)
- 비공개 데이터·모델 의존 (OpenAI API 기반 실험)

**공학 실험의 복제 문제**:
- 특정 장비·특정 환경에서만 작동 (재현에 같은 장비 필요)
- 측정 절차의 암묵적 지식 (논문에 안 쓰임)
- 산업 협력 데이터의 접근 제한
- 시뮬레이션 결과의 random seed 미공개

분야마다 다른 복제 도전이지만 원칙은 동일 — **투명성과 문서화**.

### 박사 학생을 위한 실전 체크리스트

본인의 박사 논문이 복제 가능하기 위한 최소 체크리스트:

- [ ] 실험 전에 가설·방법·분석 계획 문서화
- [ ] Power analysis로 표본 크기 계산
- [ ] Multiple testing 있으면 보정 명시
- [ ] Effect size + 95% CI 보고 (p-value와 함께)
- [ ] 실패·미공개 결과도 부록에 포함
- [ ] Seed·hardware·버전 명시 (AI)
- [ ] 코드·데이터 공개 링크 (가능한 범위)
- [ ] 사전등록 링크 (OSF 또는 AsPredicted)
- [ ] Limitations 섹션에서 일반화 범위 명시

이 체크리스트를 초기부터 따르면 박사 논문이 복제 위기의 원인이 아니라 방어에 기여.

### Bayesian 관점의 대안 — 간략한 소개

복제 위기의 대안적 프레임으로 **Bayesian 통계**가 주목받음. Frequentist와 Bayesian의 핵심 차이:

- **Frequentist**: "이 p-value가 낮다 → 효과가 있다"
- **Bayesian**: "사전 믿음 + 데이터 = 사후 믿음. 얼마나 확실히?"

Bayesian의 장점:
- p-hacking의 여지 감소 (연속적 확률 vs 이진 유의성)
- 불확실성이 자연스럽게 표현됨
- 사전 정보(이전 연구)를 분석에 통합

한계:
- 학습 곡선이 가파름
- 모든 분야·저널이 Bayesian을 수용하지는 않음
- Prior의 선택이 주관적

박사 중후반에 시도할 수 있는 현대적 선택. Stan, PyMC, brms 같은 라이브러리가 접근성을 크게 높임.

### 저널·학회의 복제 친화 정책

2020년대 이후 주요 저널·학회가 복제 위기에 대응하며 정책 강화:

- **Nature**: 2023년부터 Methods Checklist 확대. Code availability 필수.
- **Registered Reports**: 사전등록된 논문을 결과와 무관하게 수락하는 새 형식. eLife, BMC Medicine 등.
- **NeurIPS·ICML**: Reproducibility checklist 의무. 코드 공개 강력 권장.
- **IEEE Transactions**: 일부 저널에서 open data·open code badge.

본인의 박사 논문을 이런 정책 있는 저널에 투고하면 복제 가능성이 저절로 높아짐.

### 마지막 — 박사 논문은 복제 가능한 과학의 한 단위다

복제 위기는 학계 전체의 과제이지만 개별 박사 학생의 행동이 누적되어 방향을 결정한다. 다섯 가지 방어 기술(사전등록·power analysis·multiple testing correction·효과 크기·문서화)을 박사 1-2년차부터 습관화하면 본인의 박사 논문이 **복제 친화적 과학의 한 단위**가 된다. 10년 후 본인의 박사 논문이 "이 결과 재현 가능"으로 인용되는 것이 박사 학위의 가장 깊은 성공이다.

> 복제 위기는 학계 전체의 과제이지만 해결은 개별 박사의 통계적 방어에서 시작된다. 사전등록·proper power·multiple testing correction·효과 크기·replication-ready 문서화의 다섯 기술을 박사 1-2년차부터 습관화하면 본인의 논문이 복제 친화적 과학의 단위가 된다. 박사 학위의 가장 깊은 성공은 10년 후에도 본인의 결과가 재현되는 것이다.

---

## 인과 추론 (Causal Inference) — 상관을 넘어 인과를 증명하는 박사의 통계

"상관관계는 인과관계가 아니다"는 과학의 기본 원칙이다. 하지만 현실에서는 이것을 **어떻게 인과관계를 증명할 것인가**가 박사 연구의 핵심 과제다. 공학 연구, 의학 연구, 정책 연구, AI 연구 모두에서 "X가 Y의 원인이다"라는 주장을 엄격히 검증해야 하는 상황이 있다. 2024-2026년 기준 인과 추론(Causal Inference)은 박사 통계의 중요한 확장 영역이다. ch35의 앞부분은 전통적 가설 검정을 다뤘다면, 이 섹션은 **인과 관계 증명의 체계적 도구**를 다룬다.

**왜 박사에게 인과 추론이 중요한가.**

많은 박사가 "상관만 보고 인과라고 주장"하는 실수를 범한다. 결과: reviewer의 강력한 비판 ("Have you established causality?"). 박사 연구에서 인과 추론이 필요한 전형적 상황:

- **관찰 데이터 연구**: 임상 데이터, 센서 데이터, 사용자 로그. 무작위 실험이 불가능한 상황. 하지만 "X 처리가 Y 결과의 원인"을 주장해야 함.
- **정책/제도 평가**: "이 신재생에너지 정책이 온실가스를 줄였는가?" 정책 도입 전후 비교.
- **공학 시스템의 고장 원인**: "센서 A의 값 증가가 시스템 실패를 유발했는가?"
- **AI 모델의 해석**: "모델이 특징 X 때문에 이 예측을 했는가?" Explainability와 연결.
- **사용자 행동**: "이 UI 변경이 사용자 유지율을 높였는가?" A/B 테스트가 어려운 상황.

전통적 통계 (가설 검정, 회귀)만으로는 인과를 증명할 수 없다. 인과 추론은 별도의 체계적 도구를 요구한다.

**인과 추론의 3가지 철학적 틀.**

2024년 현재 인과 추론에는 세 가지 주요 틀이 있다. 박사는 본인 분야에서 어느 틀이 주류인지 파악해야 한다:

**틀 1, Potential Outcomes Framework (Rubin Causal Model, 1974-)**: 각 개체에 "처리 받았을 때의 결과"와 "처리 안 받았을 때의 결과"라는 두 potential outcomes를 가정. 실제로는 한쪽만 관측됨. 인과 효과 = 두 potential outcomes의 차이. 의학·경제학·사회과학의 주류. ATE (Average Treatment Effect), ATT (Average Treatment effect on Treated) 같은 지표.

**틀 2, Causal DAGs (Judea Pearl, 1988-)**: 변수 간 인과 관계를 directed acyclic graph로 표현. Graph 구조에서 do-calculus로 인과 효과를 계산. 컴퓨터과학·AI·역학의 주류. Confounder, collider, mediator를 명확히 구분. Pearl의 *Book of Why* (2018)로 대중화.

**틀 3, Structural Causal Models (SCM)**: Potential Outcomes와 DAG의 통합. 각 변수를 다른 변수의 함수 + 노이즈로 표현. 이론적 완결성이 높지만 실전 적용이 복잡. 최근 AI 분야에서 인기.

박사 연구에서는 **본인 분야의 주류 틀**로 시작. 의학 박사는 Potential Outcomes, AI/CS 박사는 DAG, 이론 박사는 SCM. 세 가지를 다 알 필요는 없지만 주류 외 하나는 알아야 다른 분야와 대화 가능.

**인과 추론의 5가지 핵심 도구 — 박사가 알아야 할 주요 방법.**

**도구 1, Randomized Controlled Trial (RCT)**: 무작위 할당으로 confounder를 자동 균형. 인과 추론의 **금본위(gold standard)**. 가능하면 항상 RCT. 하지만 윤리적·실용적 제약으로 많은 박사 연구에서 불가능.

**도구 2, Propensity Score Matching (PSM)**: 관찰 데이터에서 처리군과 유사한 control을 매칭. "이 사람들이 만약 처리 안 받았다면?"의 근사. 구현 간단, 해석 명확. 단점: 측정 안 된 confounder는 처리 못 함. 의학·경제학 연구의 표준.

**도구 3, Instrumental Variables (IV)**: 처리에는 영향을 주지만 결과에는 직접 영향을 주지 않는 변수(instrument)를 찾아서 인과 효과 추정. 예: 유전자 → 콜레스테롤 → 심장병에서 유전자를 IV로. Mendelian Randomization. 좋은 instrument를 찾기 어려운 것이 도전.

**도구 4, Regression Discontinuity Design (RDD)**: 임의적 임계값 주변의 불연속을 이용. 예: 시험 점수 70점 이상 합격 → 합격/불합격이 점수 근처에서 거의 무작위. 사회과학·교육 연구의 주요 방법.

**도구 5, Difference-in-Differences (DiD)**: 처리군과 대조군의 처리 전후 변화를 비교. 시간 불변 confounder를 제거. 정책 평가의 표준. 전제: "평행 추세(parallel trends)" 가정이 성립해야 함.

박사 논문에서 인과 주장을 할 때 **최소 2가지 방법**으로 robustness 확인이 2024년 이후 표준. 한 가지 방법만 쓰면 reviewer가 반드시 비판.

**Confounder 식별 — 인과 추론의 가장 흔한 실패.**

인과 추론에서 가장 자주 빠지는 실수는 **숨은 confounder**. 예:

- **고전 예**: 아이스크림 판매량과 익사 사고가 양의 상관. 실제: 여름 온도가 confounder.
- **공학 예**: 새 장비 도입 후 고장률 감소 → 사실은 새 장비와 함께 도입된 새 유지보수 매뉴얼이 진짜 원인.
- **AI 예**: 새 모델이 정확도 향상 → 사실은 더 좋은 데이터 전처리가 원인.

Confounder 식별의 절차:

1. **DAG 그리기**: 본인의 문제를 변수 간 화살표로 그려본다. 모든 변수가 다른 변수에 미치는 영향을 생각.
2. **Backdoor paths 확인**: 처리 → 결과의 직접 경로 외에, 다른 경로로 연결되는가? 이것이 confounder의 경로.
3. **측정 가능한 confounder vs 측정 불가능한 confounder**: 측정 가능하면 모델에 포함. 측정 불가능하면 IV 또는 sensitivity analysis.
4. **Sensitivity Analysis**: "얼마나 강한 미측정 confounder가 있어야 우리 결론이 뒤집힐까?" E-value, Rosenbaum bounds 같은 방법.

DAG를 그리는 습관은 박사의 인과 사고를 근본적으로 바꾼다. 논문의 "Causal Assumptions" 섹션에 DAG를 포함하는 것이 2024년 이후 일부 저널의 권장.

**Simpson's Paradox — 왜 변수 분해가 결과를 뒤집는가.**

박사 연구에서 자주 마주치는 역설. 전체 데이터에서 양의 상관이 있는데, 하위 그룹으로 나누면 각 그룹에서 음의 상관. 반대도 가능.

**고전 예 (UC Berkeley 1973 입학)**: 전체 데이터에서 여성이 남성보다 합격률 낮음 → 성차별 의심. 학과별로 나누면 대부분 학과에서 여성이 더 높은 합격률. 원인: 여성이 합격률 낮은 학과에 더 많이 지원.

**공학 예**: 전체 센서 데이터에서 온도 증가가 성능 향상. 장비 종류별로 나누면 각 장비에서 온도 증가가 성능 저하. 원인: 고성능 장비가 더 높은 온도에서 작동.

**대응**: 항상 **하위 그룹별 분석**을 병행. Confounder 가능성 의심. 전체와 그룹이 반대 결과면 Simpson's Paradox를 명시적으로 고려.

**Causal Inference와 Machine Learning — 2024-2026 통합 경향.**

2020년 이후 인과 추론과 ML의 통합이 급속히 발전. 박사 연구에서 알아야 할 최신 동향:

- **Double ML / Debiased ML (Chernozhukov et al., 2018)**: ML의 예측력 + 인과 추론의 엄밀성. 고차원 confounder를 ML로 다루면서 인과 효과의 통계적 valid한 추정.
- **Causal Forests (Wager & Athey, 2018)**: Random Forest의 인과 버전. 개별 수준의 treatment effect (heterogeneous effects) 추정. 의료·정책 personalization에 강력.
- **DoWhy (Microsoft)**: Python 라이브러리. DAG 기반 인과 추론의 민주화. 2024년 이후 많은 박사 연구에서 baseline.
- **EconML (Microsoft)**: ML 기반 인과 추론 도구. Heterogeneous effects 추정.
- **Causal Discovery**: 데이터에서 DAG 자체를 학습 (PC algorithm, GES, NOTEARS). 2024-2026 연구의 hot topic.

박사 연구에서 순수 ML만 하는 시대는 지나가고 있다. **"ML + 인과 추론"**이 2025년 이후 많은 분야의 차세대 박사에게 필요한 조합. 특히 의료 AI, 정책 AI, 사용자 AI 박사.

**박사 논문에서 인과 주장의 3가지 수준.**

본인 연구가 어느 수준의 인과 주장인지 명확히 하는 것이 reviewer와의 갈등을 피한다:

**수준 1, 상관 (Correlation)**: "X와 Y는 연관되어 있다." 가장 약한 주장. 무난.
**수준 2, 예측 (Prediction)**: "X로 Y를 예측할 수 있다." 조금 더 강한 주장. 하지만 인과는 아님.
**수준 3, 인과 (Causation)**: "X가 Y의 원인이다." 가장 강한 주장. 엄격한 증명 필요.

박사 논문에서 수준 3 주장을 하려면 RCT, PSM, IV, RDD, DiD 중 하나 + 반드시 2가지 이상의 robustness check. 수준 3 주장을 하면서 수준 2 증거만 제시하면 reviewer의 강력한 reject 사유.

**마지막 — 인과 추론은 2020년대 박사 통계의 필수 확장이다.**

전통적 통계 (가설 검정, 회귀)만으로는 박사 연구의 많은 질문에 답할 수 없다. 인과 추론은 이것을 보완하는 체계적 도구. 3가지 틀(Potential Outcomes, DAG, SCM)·5가지 도구(RCT, PSM, IV, RDD, DiD)·Confounder 식별 절차·Simpson's Paradox 경계·ML 통합 경향을 이해하면, 박사 논문의 인과 주장이 reviewer의 scrutiny를 통과할 수 있다. 2024-2026년 이후 박사 연구에서 "상관만 주장"은 허용되지 않는 분야가 늘고 있다. 본인 분야의 인과 추론 수준에 맞게 준비하는 것이 박사의 통계적 성숙이다.

> 인과 추론은 2020년대 박사 통계의 필수 확장이다. 본인 분야의 주류 틀(Potential Outcomes·DAG·SCM)을 선택하고, 5가지 핵심 도구(RCT·PSM·IV·RDD·DiD) 중 최소 2가지로 robustness. Confounder를 DAG로 식별하고 sensitivity analysis. Simpson's Paradox 경계. 2024+ ML 통합(Double ML·Causal Forests·DoWhy·EconML)을 주시. 박사 논문의 인과 주장 수준(상관·예측·인과)을 명확히 하고 증거와 일치시킨다. 본인 분야의 인과 추론 수준에 맞추는 것이 박사의 통계적 성숙이다.

---

## 베이지안 통계 — 박사의 불확실성 관리 틀

박사 연구에서 "단일 점추정"은 많은 경우 부족하다. "우리 모델의 정확도는 85%"보다 "95% 신뢰 구간 [82%, 88%]"이 정보가 많다. 단계 더 나아가 "이 파라미터의 사후 분포는 평균 0.72, 분산 0.03"이 박사의 표준적 주장. 이것이 **베이지안 통계**의 세계다. 2020년대 이후 박사 연구에서 베이지안 접근이 빠르게 표준화되고 있지만, 많은 박사가 빈도주의(frequentist) 통계만 배우고 베이지안을 건너뛴다. 이 섹션은 박사가 베이지안 통계를 실전에 통합하는 전략을 다룬다. ch35의 앞부분이 빈도주의 중심이었다면, 이 섹션은 **베이지안 관점의 확장**이다.

**베이지안 통계의 3가지 핵심 아이디어.**

**아이디어 1, 확률 = 믿음의 정도**. 빈도주의는 확률을 "반복 시행의 빈도"로 본다. 베이지안은 "어떤 명제에 대한 믿음의 정도". 본인이 실제로 한 번만 관측하는 실험에 자연스러움.

**아이디어 2, Prior + Data → Posterior**. 사전 지식(prior) + 관측 데이터 → 사후 분포(posterior). 베이즈 정리: P(θ|D) ∝ P(D|θ) × P(θ). 사후 분포가 모든 추론의 기반.

**아이디어 3, 불확실성의 자연스러운 표현**. 파라미터의 점추정이 아닌 분포. "이 모델 파라미터는 0.72 ± 0.03"이 아닌 전체 분포. 의사결정에 더 많은 정보.

**박사에게 베이지안의 5가지 가치.**

**가치 1, 작은 샘플에 강함**: 빈도주의는 대샘플 가정. 베이지안은 prior가 있어서 n=10도 의미 있는 추론. 박사 연구의 소규모 실험에 적합.

**가치 2, 불확실성의 정직한 표현**: "효과가 있다/없다"의 이분법이 아닌 "효과의 분포". 박사 논문의 intellectual honesty.

**가치 3, 이전 연구의 통합**: 기존 문헌 결과를 prior로. 본인의 새 데이터 + 기존 지식.

**가치 4, 모델 선택의 자연스러운 프레임**: Bayes factor로 모델 비교. AIC/BIC의 베이지안 대응.

**가치 5, 의사결정 이론과 연결**: 베이지안 결정 이론. 손실 함수 + 사후 분포 = 최적 결정.

**박사가 시작할 3가지 베이지안 방법.**

**방법 1, Bayesian Linear Regression**: 전통 회귀의 베이지안 버전. 계수의 사후 분포. Scikit-learn의 `BayesianRidge`, PyMC, Stan.

**방법 2, Hierarchical Models (Multilevel)**: 데이터에 계층 구조 (학생/학교, 환자/병원, 실험/사이트). "partial pooling"으로 각 그룹의 추정을 개별 + 전체 평균의 절충. 박사 연구에서 흔한 구조.

**방법 3, MCMC (Markov Chain Monte Carlo)**: 사후 분포 샘플링. Hamiltonian Monte Carlo (HMC), NUTS. Stan, PyMC, Turing.jl의 표준.

이 3가지로 시작하면 베이지안의 90%를 커버. 나중에 Variational Inference, Normalizing Flows 등으로 확장.

**Prior 선택 — 박사의 미묘한 기술.**

Prior 선택은 베이지안의 가장 논쟁적 부분. 박사의 실전:

- **Informative Prior**: 이전 연구의 결과를 prior로. 명시적 지식 활용.
- **Weakly Informative Prior**: 약한 제약만. 예: 정규 분포 N(0, 10). 극단값 방지.
- **Non-informative Prior**: 거의 제약 없음. 예: 균등 분포. 빈도주의와 유사한 결과.
- **Reference Prior**: Jeffreys prior 등 수학적으로 선택.
- **Empirical Bayes**: 데이터로부터 prior 추정.

**박사 논문의 권장**: Weakly Informative Prior + Sensitivity Analysis. Prior 선택이 결과에 미치는 영향을 명시적으로 검증.

**Posterior 해석의 실전.**

박사의 베이지안 결과 보고 방식:

- **Posterior Mean/Median**: 점추정. "θ의 추정치는 0.72".
- **95% Credible Interval**: 빈도주의 신뢰 구간과 다른 해석. "θ가 이 구간에 있을 확률이 95%". 해석이 직관적.
- **Highest Posterior Density (HPD)**: 밀도가 가장 높은 구간. 비대칭 분포에 적합.
- **Posterior Probability**: "P(θ > 0) = 0.98". 가설 검정의 자연스러운 대체.
- **Posterior Predictive**: 새 관측의 예측 분포. 박사 연구의 미래 예측에 유용.

**MCMC 진단 — 수렴 확인의 필수.**

MCMC 결과의 신뢰성은 **수렴 여부**에 달림:

- **Trace plot**: chain의 샘플이 안정적으로 섞이는지. 시각적 확인.
- **R-hat (Gelman-Rubin)**: 여러 chain 간 분산 비교. <1.01이면 수렴.
- **ESS (Effective Sample Size)**: 효과적 샘플 수. >400이면 안정적.
- **Divergent transitions**: HMC 경고. 모델 재설계 필요.
- **Energy plot**: HMC의 에너지 분포 확인.

박사 논문의 베이지안 결과는 이 4-5가지 진단을 보고해야 reviewer 수용.

**베이지안 도구의 2024+ 지형.**

**Stan**: 가장 성숙. RStan, PyStan, CmdStanPy. HMC·NUTS 표준.

**PyMC (Python)**: Stan의 Python 대안. 접근성 좋음. PyMC5로 안정.

**Turing.jl (Julia)**: 빠른 실행. Julia 생태계.

**NumPyro (JAX 기반)**: Google이 지원. GPU 가속. 대규모 데이터에 강점.

**Pyro (PyTorch 기반)**: 딥러닝 통합. Uber 개발.

**BUGS/JAGS**: 전통적 도구. 학습용으로는 아직 유용.

박사는 **PyMC 또는 NumPyro**로 시작하는 것이 현실적. Stan은 수학 집약 분야.

**베이지안의 5가지 함정.**

**함정 1, Prior sensitivity 무시**: 여러 prior로 결과가 달라지는지 확인 안 함. Reviewer의 주요 지적.

**함정 2, MCMC 수렴 확인 생략**: 수렴 없이 결과 보고. 신뢰 불가.

**함정 3, "사후 확률 = 진실"로 혼동**: 사후 확률은 모델과 prior 하에서. 모델이 틀리면 사후 확률도 틀림.

**함정 4, 계산 비용 무시**: MCMC가 하루 걸리는 모델을 반복 실행. 시간 계획 중요. Variational Inference 대안.

**함정 5, 빈도주의 결과의 무시**: 베이지안만 보고하고 빈도주의 검증 안 함. Robustness를 위해 둘 다.

**박사 분야별 베이지안 활용.**

- **의학·역학**: 약물 효과, 임상 시험. 베이지안 적응형 시험(BAR).
- **천문학**: 관측 데이터의 불확실성. 베이지안이 표준.
- **생태학**: 개체군 동역학. 계층 모델.
- **심리학·교육학**: 개인 간 차이 모델링.
- **경제학**: 베이지안 시계열 (BVAR).
- **기계학습**: Bayesian Deep Learning, Gaussian Processes.
- **공학**: 신뢰성 분석, 센서 퓨전.

본인 분야의 베이지안 전통을 파악.

**AI 시대의 베이지안 — 2024+ 부상.**

**Bayesian Deep Learning**: 신경망의 불확실성. Dropout as Bayesian approximation, Variational Inference in DL.

**Gaussian Processes**: 소규모 데이터의 유연한 모델. 박사 연구에 자주 사용.

**Bayesian Optimization**: 하이퍼파라미터 탐색. ch35의 DOE 연결.

**Probabilistic Programming**: PPL의 성숙. 박사가 커스텀 모델 빠르게 구축.

**LLM의 불확실성**: LLM 출력의 신뢰도 측정. 2024-2025 hot topic.

베이지안은 AI 시대에 오히려 더 중요해짐. "정확하지만 틀린 답"을 피하는 핵심.

**마지막 — 베이지안은 박사의 성숙한 불확실성 관리다.**

박사 논문의 단일 점추정 결과는 종종 부족. 베이지안은 불확실성을 정직하게 표현하고, 소규모 데이터에 강하고, 이전 연구를 통합하는 틀. 3가지 핵심 아이디어·5가지 박사 가치·3가지 시작 방법·Prior 선택·Posterior 해석·MCMC 진단·도구 지형·5가지 함정·분야별 활용·AI 시대 부상 — 이 모든 것을 의식적으로 다루면, 본인 논문의 통계적 주장이 더 정직하고 견고해진다. 2024-2026년 박사 통계는 빈도주의 + 베이지안의 하이브리드가 이상.

> 베이지안은 박사의 성숙한 불확실성 관리 틀. 3가지 핵심 아이디어(확률=믿음·Prior+Data→Posterior·분포 표현). 박사의 5가지 가치 (소샘플 강함·정직한 불확실성·문헌 통합·모델 선택·의사결정). 시작 3가지 방법 (Bayesian Regression·Hierarchical·MCMC). Prior 선택의 스펙트럼과 sensitivity analysis. Posterior의 5가지 해석. MCMC 진단 (R-hat·ESS·divergent). PyMC·NumPyro·Stan·Turing의 도구 지형. 5가지 함정 회피. AI 시대의 Bayesian DL·BO·PPL 부상. 박사 통계는 빈도주의+베이지안의 하이브리드가 이상이다.

---

## 다중 검정과 FDR — 박사가 자주 놓치는 통계의 함정

박사 연구에서 **여러 가설을 동시에 검정**하는 상황은 흔하다. 1000개 유전자 중 어느 것이 의미 있나, 100개 피쳐 중 어느 것이 중요한가, 20개 실험 조건 중 어느 것이 효과적인가. 이 **다중 검정 (Multiple Testing)**의 함정을 이해 못하면 논문의 주요 발견이 **거짓**일 수 있다. 이 섹션은 박사가 다중 검정 문제를 체계적으로 다루는 실전을 다룬다. ch35의 다른 섹션(가설 검정·인과 추론·베이지안)과 구별되는 **통계의 숨은 함정**이다.

**왜 다중 검정이 문제인가 — 직관적 설명.**

1회의 p-value < 0.05 검정:
- H0 참일 때 false positive 확률 = 5%.
- 괜찮아 보임.

100회 독립 검정:
- H0 모두 참일 때 최소 1개 false positive 확률 = 1 - 0.95^100 = **99.4%**.
- 거의 확실히 허위 발견.

**고전 예시, 죽은 연어 실험 (Bennett et al. 2009)**: 죽은 연어를 fMRI에 넣고 여러 voxel 검정. 수천 개 voxel의 다중 검정 없이 "연어가 감정을 느낀다"는 허위 발견. Nobel Ig 상 수상.

박사 연구에서 이런 실수는 **논문 retraction의 주요 원인**.

**다중 검정의 3가지 에러 율.**

**FWER (Family-Wise Error Rate)**:
- **적어도 하나의 false positive 확률**.
- 가장 엄격.
- Bonferroni, Holm 방법.

**FDR (False Discovery Rate)**:
- **발견 중 false positive의 기대 비율**.
- 좀 덜 엄격.
- Benjamini-Hochberg 방법.

**PFER (Per-Family Error Rate)**:
- **기대되는 false positive 수**.
- 드물게 사용.

박사의 실전에서 **FDR이 주류**. FWER은 임상 시험·확정 연구.

**Bonferroni 보정 — 가장 쉬운 방법.**

원리:
- N개 검정을 할 때 각 검정의 p-value 임계값을 α/N으로.
- 예: 100개 검정, α=0.05 → 각 검정 p < 0.0005.

**장점**: 단순. 계산 쉬움.

**단점**: 너무 엄격. 많은 실제 신호 놓침 (power 감소).

**권장**: N이 작을 때 (10 이하).

**Benjamini-Hochberg (BH) — 박사의 표준.**

1995년 제안. FDR 제어:

**절차**:
1. N개 검정의 p-value를 오름차순 정렬: p(1) ≤ p(2) ≤ ... ≤ p(N).
2. 각 p(i)를 (i/N) × α와 비교.
3. 가장 큰 i*를 찾음: p(i*) ≤ (i*/N) × α.
4. 1부터 i*까지의 검정은 reject (신호 있음).

**Python 코드**:
```python
from statsmodels.stats.multitest import multipletests
p_values = [...]
reject, p_adjusted, _, _ = multipletests(p_values, alpha=0.05, method='fdr_bh')
```

**해석**: "FDR < 5%로 reject"는 "발견 중 5% 이하가 false positive일 것".

**박사의 다중 검정 5가지 시나리오.**

**시나리오 1, 유전자 발현 분석**:
- 20,000개 유전자의 분석.
- FDR 표준 (R의 `qvalue` 패키지).
- 일반적으로 q-value < 0.05.

**시나리오 2, 뇌 영상 (fMRI)**:
- 100,000+ voxel.
- Cluster-based FDR.
- Random Field Theory.

**시나리오 3, 다중 비교 실험**:
- 5개 조건 간 pairwise 비교 = 10회 검정.
- Tukey's HSD 또는 Bonferroni.

**시나리오 4, 특징 선택 (Feature Selection)**:
- 수백 개 특징의 중요도.
- Boruta, Stability Selection.

**시나리오 5, A/B 테스팅**:
- 여러 metric, 여러 세그먼트.
- 사전 등록의 primary metric.

분야별 **표준 방법**이 있음. 본인 분야 관례 확인.

**다중 검정의 7가지 함정.**

**함정 1, 무시**: 100회 검정하고 p < 0.05 보고. 가장 흔한 실수.

**함정 2, 사후 선택 (Post-hoc selection)**:
- 실험 후 유의한 결과만 선택.
- p-hacking의 주요 형태.

**함정 3, HARKing (Hypothesizing After Results Known)**:
- 결과를 본 후 가설 세움.
- 가설 검정의 의미 상실.

**함정 4, 부적절한 보정 방법**:
- 독립이 아닌데 Bonferroni.
- 시간 시리즈에 단순 FDR.

**함정 5, α 수준의 자의적 조정**:
- 결과가 마음에 안 들면 α 올림.
- 과학적 부정행위.

**함정 6, "거의 유의" 보고**:
- p = 0.07을 "marginally significant".
- 다중 검정 후엔 더 보수적.

**함정 7, Subgroup analysis의 남용**:
- 전체 효과 없을 때 하위 그룹만.
- 재현 실패의 주 원인.

**다중 검정의 사전 대응 — Pre-registration.**

가장 강력한 방어: **사전 등록**.

- **Primary hypothesis** 1-2개 명시.
- **Secondary** hypothesis는 exploratory로.
- Primary는 엄격한 다중 검정.
- Secondary는 follow-up 연구 대상.

OSF (Open Science Framework), ClinicalTrials.gov.

**검정 독립성의 확인.**

BH 방법은 **독립 또는 양의 상관** 가정:

- **독립**: 이상적.
- **양의 상관**: BH 여전히 유효.
- **음의 상관**: BH 부정확. Benjamini-Yekutieli (더 엄격).

**실전**: 대부분 양의 상관. BH 사용.

**다중 검정과 박사 분야.**

**생명과학·의학**:
- FDR 방법이 표준.
- 유전체·단백질체 분석.

**신경과학**:
- 복잡한 공간·시간 상관.
- Random Field Theory.

**심리학**:
- 반복 측정 분산 분석.
- Bonferroni 또는 조정된 방법.

**ML/AI**:
- 종종 무시! 박사 연구에서 중요.
- 하이퍼파라미터 탐색, 모델 비교.

**경제학**:
- 정책 효과의 subgroup 분석.
- Family-wise error rate.

본인 분야의 **표준 관행**을 파악.

**다중 검정과 논문 심사.**

Reviewer가 자주 지적:

- "How many tests did you perform?"
- "How did you correct for multiple comparisons?"
- "What was the pre-specified hypothesis?"
- "Sub-group analysis was pre-registered?"

박사 논문의 **Methods 섹션**에 다중 검정 전략 명시. 기본.

**통계적 유의성의 2020년대 논쟁.**

2016년 ASA (American Statistical Association)의 성명:
- p < 0.05의 임의적 기준.
- p-value만으로 결론 금지.
- 효과 크기·신뢰 구간도 보고.

2019년 "Retire statistical significance" 운동:
- 유의성 이분법 포기.
- p-value를 연속적으로 해석.

박사 논문은 **이 논쟁 인지하고** 효과 크기 + p-value + 신뢰 구간 모두 보고.

**AI 시대의 다중 검정 — 2024+.**

- **LLM의 다중 비교**: 여러 모델·프롬프트 비교. 수십 건. 다중 검정 필요.
- **A/B 테스팅의 가속**: 클라우드로 수백 실험 동시. 보정 필수.
- **ML 대량 모델 비교**: Model zoo의 수백 모델. Corrected leaderboard.
- **AI의 "의미 있는 발견"의 과잉**: 데이터의 fishing. 박사의 엄격함.

**박사의 다중 검정 체크리스트.**

- ☐ 검정 수 명시 (몇 개 가설?)
- ☐ Primary vs exploratory 구분
- ☐ 사전 등록 (가능하면)
- ☐ 다중 검정 보정 방법 명시 (BH·Bonferroni·등)
- ☐ 보정된 p-value·q-value 보고
- ☐ 효과 크기 + 신뢰 구간 병기
- ☐ 분야 표준과 일치 확인
- ☐ Reviewer의 예상 질문 대비

**마지막 — 다중 검정은 박사의 통계적 성숙의 지표다.**

많은 박사 논문이 다중 검정을 **무시**하고 출판된다. 그 결과 분야의 재현성 위기. 박사가 이 함정을 의식하면 **본인의 논문은 재현 가능한 과학**. 3가지 에러 율·Bonferroni·BH·5가지 시나리오·7가지 함정·사전 등록·검정 독립성·분야 관행·논문 심사·2020년대 논쟁·AI 시대·체크리스트 — 이 모든 것을 다루면 박사의 통계가 분야의 평균 이상이 된다. 다중 검정의 엄격함이 **박사의 과학적 정직성**.

> 다중 검정은 박사가 자주 놓치는 함정. 100회 검정 중 H0 참이어도 99.4% false positive. 3가지 에러 율 (FWER·FDR·PFER) 중 FDR이 박사 표준. Bonferroni는 N 작을 때, BH는 N 클 때. 5가지 시나리오 (유전·fMRI·다중 비교·feature·A/B). 7가지 함정 (무시·사후 선택·HARKing·부적절 보정·α 조정·marginal·subgroup). Pre-registration이 최강 방어. 독립성 확인. 분야별 표준 관행. 2020년대 p-value 논쟁과 효과 크기 병기. 2024+ AI 시대의 대량 비교. 8가지 체크리스트. 다중 검정의 엄격함이 박사의 과학적 정직성.

---

## 효과 크기 (Effect Size)의 실전 — p-value 너머의 통계

2016년 ASA (American Statistical Association) 성명 이후 **p-value 단독 보고는 부족**. 박사 논문은 **효과 크기 (Effect Size)**를 반드시 병기. 하지만 많은 박사가 효과 크기를 **대충 이해**하고 습관적으로 사용. 잘못된 효과 크기는 논문의 신뢰도 훼손. 이 섹션은 박사가 효과 크기를 정확히 선택·계산·해석하는 실전을 다룬다. ch35의 다른 섹션(가설 검정·인과·베이지안·다중 검정)이 **방법**이었다면, 이 섹션은 **결과의 의미**다.

**왜 효과 크기인가.**

**p-value만의 한계**:
- 표본 크기에 의존.
- 유의성 = 중요성 X.
- Binary 결정.

**효과 크기의 가치**:
- 크기의 실질적 의미.
- 표본 독립.
- 연속적 해석.

**예시**:
- p = 0.001, 그런데 효과 크기 d = 0.05 → 작은 효과.
- p = 0.06, 효과 크기 d = 0.8 → 큰 효과 (통계 유의 X).

박사는 **둘 다 보고**.

**주요 효과 크기 지표.**

**표준화된 평균 차이 (Standardized Mean Difference)**:
- **Cohen's d**: 두 집단의 차이.
- **Hedges' g**: d의 소샘플 보정.
- 해석: 0.2 작음, 0.5 중간, 0.8 큼.

**상관 지표**:
- **Pearson's r**: 선형 상관.
- **R²**: 설명 분산.
- 해석: 0.1 작음, 0.3 중간, 0.5 큼.

**비율 지표**:
- **Odds Ratio**: 로지스틱 회귀.
- **Risk Ratio**: 상대 위험.
- **NNT (Number Needed to Treat)**: 의학.

**분산 지표**:
- **η² (eta-squared)**: ANOVA.
- **f²**: 회귀의 효과.

**박사의 분야별 선택**.

**Cohen's d의 계산과 해석.**

**공식**:
d = (M1 - M2) / SD_pooled

**예시**:
- 처리군 평균 75, 통제군 70.
- Pooled SD = 10.
- d = 0.5 (중간 효과).

**해석 가이드**:
- d = 0.2: 작음 (감지 어려움).
- d = 0.5: 중간 (일반적 유의미).
- d = 0.8: 큼 (명확).
- d > 1.0: 매우 큼 (드물음).

**주의**:
- Cohen의 기준은 일반적.
- 분야별 다름.

**신뢰 구간의 필수.**

효과 크기 + **95% CI**:
- 추정의 불확실성.
- 재현성 신호.

**예시**:
- d = 0.5, 95% CI [0.3, 0.7]: 명확.
- d = 0.5, 95% CI [-0.1, 1.1]: 불확실.

**박사 논문의 표준**:
- Point estimate + CI.
- 둘 다 보고.

**효과 크기의 검정력 분석.**

**Power Analysis**:
- 검출 가능한 최소 효과 크기.
- 필요 샘플 크기.

**사전 계산**:
- α = 0.05.
- Power = 0.8.
- Expected effect d = 0.5.
- Required n = 64 per group.

**도구**:
- **G*Power**: 무료·강력.
- **pwr (R 패키지)**.
- **statsmodels (Python)**.

**박사의 실험 설계**의 기반.

**효과 크기의 분야별 기준.**

**교육학**:
- d = 0.4가 의미 있음 (Hattie).
- 작은 효과도 중요.

**의학**:
- NNT 중심.
- 임상적 유의미.

**심리학**:
- Cohen의 기준 표준.
- Replication Project의 교훈.

**ML/AI**:
- Accuracy 개선 %.
- 비표준화된 metric.

**물리·공학**:
- 측정 불확실성.
- 오차 전파.

본인 분야의 **관행 이해**.

**효과 크기의 5가지 실수.**

**실수 1, p-value만 보고**: 효과 크기 누락.

**실수 2, 잘못된 지표**: 연속 데이터에 binary 지표.

**실수 3, CI 없이**: 불확실성 숨김.

**실수 4, 분야 관행 무시**: 일반 기준 고집.

**실수 5, 과대 해석**: 작은 효과를 큰 것처럼.

**Meta-analysis와 효과 크기.**

효과 크기의 활용:

- **여러 연구의 종합**.
- 공통 metric 필요.
- 분야의 cumulative 이해.

**박사의 기여**:
- 표준 지표로 보고.
- 미래 meta-analysis 기여.

**재현성과 효과 크기.**

**Replication Crisis**:
- 많은 효과가 과장.
- 작은 효과가 실제.
- Publication bias.

**박사의 책임**:
- 정직한 효과 크기.
- 과대 주장 금지.
- Pre-registration.

**Bayesian Effect Size.**

Bayesian 접근:

- **Posterior distribution**: 효과 크기의 분포.
- **Credible interval**: 95%.
- **Probability of direction**: p(d > 0).
- **ROPE (Region of Practical Equivalence)**: 실질적 동등.

**장점**:
- 풍부한 정보.
- 직관적.

박사의 **현대적 접근**.

**효과 크기의 시각화.**

**Forest plot**:
- 여러 연구·그룹.
- 중앙치·CI.

**Funnel plot**:
- Publication bias 확인.

**Violin plot**:
- 분포 전체.

**Raincloud plot**:
- 개별 + 분포 + 요약.

**박사의 권장**: Raincloud plot. 풍부한 정보.

**실전 논문 보고 예시.**

**잘못된 보고**:
"Group A was significantly higher than Group B (p < 0.05)."

**올바른 보고**:
"Group A (M = 75, SD = 10) scored significantly higher than Group B (M = 70, SD = 10), t(98) = 2.50, p = 0.014, Cohen's d = 0.50, 95% CI [0.10, 0.90]."

**차이**:
- 구체적 숫자.
- 효과 크기.
- CI.
- 완전한 정보.

**박사 논문의 Methods 기술.**

**필수 보고**:
- Effect size measure 선택 이유.
- Point estimate.
- 95% CI.
- Power analysis (사전).

**예시**:
"We report Cohen's d as the effect size measure, with 95% bootstrapped CIs. A priori power analysis (G*Power 3.1) indicated N = 128 to detect d = 0.5 with 80% power."

**투명성이 표준**.

**한국 박사의 효과 크기 특수.**

- **SCI 논문의 요구**: 많은 저널 필수.
- **한국 저널**: 점진적 도입.
- **교육용**: 박사 과정 강의.
- **소프트웨어**: G*Power·R·Python.

**AI 시대의 효과 크기 — 2024+.**

**ML 논문**:
- 벤치마크 accuracy.
- 효과 크기 논의 부족.

**개선 방향**:
- Accuracy 차이의 CI.
- Multiple seeds·runs.
- Bootstrap CI.

**박사의 기여**:
- ML에 효과 크기 도입.
- 엄격한 보고.

**5가지 함정.**

**함정 1, 표준화 무시**: 비교 불가.

**함정 2, 작은 효과의 과장**: 실질 중요성 X.

**함정 3, 큰 효과의 축소**: 인간 크기 무시.

**함정 4, 부적절 지표**: 데이터 유형 불일치.

**함정 5, CI 생략**: 불확실성 숨김.

**박사의 효과 크기 실천.**

**1년차**:
- Cohen's d·r 익힘.
- G*Power 사용.

**2-3년차**:
- 본인 분야 지표.
- CI 보고.

**4-5년차**:
- Meta-analysis 참여.
- Bayesian 접근.

**박사 후**:
- 평생 엄격한 보고.

**효과 크기의 미래.**

- **Open Science**: 투명성 증가.
- **Pre-registration**: 표준화.
- **Registered Reports**: 효과 크기 중심.
- **Meta-research**: 분야의 자기 평가.

**박사의 역할**:
- 이 변화의 일부.
- 최신 표준 따름.

**마지막 — 효과 크기는 박사의 결과 언어다.**

p-value의 시대는 저물고, 효과 크기의 시대. 주요 지표·Cohen's d·CI·Power analysis·분야 기준·5가지 실수·Meta-analysis·재현성·Bayesian·시각화·논문 보고·Methods 기술·한국 특수·AI 시대·5가지 함정·박사 실천·미래 — 이 모든 것을 의식적으로 다루면 박사 논문의 **결과가 정직·정확**. p-value는 묻는 질문, 효과 크기는 답이다.

> 효과 크기는 p-value 너머의 통계. 주요 지표 (Cohen's d·Hedges' g·r·R²·OR·RR·NNT·η²·f²). Cohen's d의 계산과 해석 (0.2·0.5·0.8). 신뢰 구간의 필수. Power Analysis (G*Power·pwr·statsmodels). 분야별 기준 (교육·의학·심리·ML·물리). 5가지 실수. Meta-analysis 기여. 재현성과 효과 크기. Bayesian Effect Size (Credible interval·ROPE). 시각화 (Forest·Funnel·Violin·Raincloud). 논문 보고의 구체 예시. Methods 기술 (투명성). 한국 SCI 요구. 2024+ ML에 효과 크기 도입. 5가지 함정. 박사의 효과 크기 실천. p-value는 질문, 효과 크기는 답.
