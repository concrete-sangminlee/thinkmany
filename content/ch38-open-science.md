# 내 연구를 검증 가능하게

"논문은 출판했는데 코드는 비공개입니다." "데이터? 요청하시면 드리겠습니다." "전처리는... 기억이 잘 안 나는데, 결과는 맞을 겁니다."

이 말들이 익숙하다면, 그것이 문제다. 연구 윤리(ch29)에서 "데이터를 조작하지 마라"를 배웠다면, 이 장은 그 다음 단계다. 데이터를 조작하지 않는 것은 최소한의 기준이고, 연구를 투명하게 만드는 것은 더 높은 기준이다. 내 연구가 정직하다는 것을 "말"이 아니라 "구조"로 보여주는 것. 그것이 오픈 사이언스다.

오픈 사이언스는 선의의 운동이 아니다. 재현성 위기(replication crisis)라는 구조적 실패에 대한 구조적 해결책이다. 심리학에서 터진 문제가 공학도 비켜가지 않는다. 논문에 보고된 딥러닝 모델의 성능이 재현되지 않는 경우, 시뮬레이션 조건을 똑같이 맞췄는데 결과가 다른 경우, 이런 상황은 공학 연구에서도 빈번하다. ch29에서 다룬 cherry-picking과 p-hacking의 방지책이 사전등록이고, ch16에서 다룬 Git과 데이터 관리를 "연구실 안"이 아니라 "세상 밖"으로 확장하는 것이 오픈 사이언스다.

이 장에서는 오픈 사이언스의 네 가지 축, 즉 오픈 데이터, 오픈 코드, 오픈 액세스, 사전등록을 실전적으로 다룬다. "왜 해야 하는가"보다 "어떻게 하는가"에 초점을 맞춘다.

---

## 재현성 위기: 공학도 예외가 아니다

### 숫자로 보는 현실

2015년 Open Science Collaboration이 심리학 논문 100편을 재현 시도한 결과, 36%만 원래 결과를 재현할 수 있었다. 충격적인 숫자다. 하지만 공학 분야라고 안심할 수 없다.

2020년 Nature Machine Intelligence에 실린 조사에 따르면, 머신러닝 논문의 상당수가 재현에 필요한 정보(하이퍼파라미터, 데이터 전처리 방법, 난수 시드 등)를 충분히 제공하지 않는다. 코드를 공개한 논문 중에서도 실제로 돌려보면 에러가 나거나, 논문에 보고된 성능과 차이가 나는 경우가 흔하다.

시뮬레이션 기반 연구도 마찬가지다. FEM 해석에서 메시 크기, 경계 조건 세부 설정, 솔버 옵션 같은 것들은 논문 방법론 섹션에 모두 적기 어렵다. 결과적으로 "같은 조건"으로 시뮬레이션을 돌려도 다른 결과가 나올 수 있다.

### 재현 불가능의 원인

재현이 안 되는 이유는 대부분 고의적 조작이 아니다. 구조적인 문제다.

첫째, 출판 편향이다. 긍정적 결과만 출판되니, 전체 그림이 왜곡된다. 둘째, 방법론 기술의 불충분함이다. 논문에 "Adam optimizer를 사용했다"고만 쓰고, learning rate schedule, weight decay, batch size 등을 빠뜨리면 재현이 불가능하다. 셋째, 코드와 데이터의 비공개다. 논문만으로는 전달할 수 없는 디테일이 코드에 있다. 넷째, 연구 환경의 차이다. 소프트웨어 버전, 라이브러리 의존성, 하드웨어 차이가 결과에 영향을 미칠 수 있다.

이 문제들은 개인의 도덕성으로 해결되지 않는다. 시스템으로 해결해야 한다. 그 시스템이 오픈 사이언스다.

---

## 오픈 사이언스의 네 가지 축

오픈 사이언스는 하나의 개념이 아니라, 네 가지 실천의 조합이다. 오픈 데이터, 오픈 코드, 오픈 액세스, 사전등록. 각각은 독립적으로도 가치가 있고, 함께 적용하면 시너지가 난다.

<div class="card-grid">
<div class="card">
<span class="card-icon">📁</span>
<div class="card-title">오픈 데이터</div>
<div class="card-desc">연구 데이터를 공개하여 누구나 검증하고 재활용할 수 있게 한다</div>
</div>
<div class="card">
<span class="card-icon">💻</span>
<div class="card-title">오픈 코드</div>
<div class="card-desc">분석/모델링 코드를 공개하여 재현 가능성을 보장한다</div>
</div>
<div class="card">
<span class="card-icon">🔓</span>
<div class="card-title">오픈 액세스</div>
<div class="card-desc">논문을 누구나 무료로 읽을 수 있게 공개한다</div>
</div>
<div class="card">
<span class="card-icon">📋</span>
<div class="card-title">사전등록</div>
<div class="card-desc">연구 계획을 미리 등록하여 사후 조작 가능성을 차단한다</div>
</div>
</div>

---

## 사전등록: 결과를 보기 전에 계획을 잠그다

### 왜 필요한가

ch29에서 다룬 cherry-picking과 p-hacking을 기억하는가. 데이터를 본 후에 가설을 바꾸거나, 유의미한 결과가 나올 때까지 분석 방법을 이리저리 바꾸는 문제다. 사전등록은 이것을 구조적으로 방지한다.

사전등록(preregistration)이란, 데이터를 수집하기 전에 연구 가설, 분석 방법, 성공 기준을 공개 플랫폼에 등록하는 것이다. 등록된 내용은 타임스탬프가 찍히고, 변경이 불가능하다. 나중에 결과가 예상과 다르더라도, 원래 계획대로 분석하고 보고해야 한다. 물론 탐색적 분석(exploratory analysis)을 추가로 할 수 있지만, 사전등록된 분석과 탐색적 분석을 명확히 구분해서 보고해야 한다.

### 어떻게 하는가

가장 많이 사용되는 플랫폼은 두 가지다.

**OSF (Open Science Framework):** Center for Open Science에서 운영하는 무료 플랫폼이다. 사전등록뿐 아니라 데이터, 코드, 논문 초고까지 관리할 수 있는 종합 연구 관리 도구다. 사전등록 템플릿이 여러 종류 제공되며, 분야에 맞는 것을 선택할 수 있다.

**AsPredicted:** 더 간단한 플랫폼이다. 9개의 질문(연구 질문, 독립변수, 종속변수, 표본 크기, 분석 방법 등)에 답하면 사전등록이 완료된다. 비공개로 등록한 후 논문 출판 시 공개할 수 있다.

공학 분야에서 사전등록이 아직 보편적이지는 않지만, 빠르게 확산되고 있다. 특히 실험 연구나 ML 성능 비교 연구에서 사전등록의 가치가 크다. "우리 모델이 baseline을 이겼다"는 결과가, 사전등록된 평가 기준에 따른 것인지 아닌지는 신뢰도에 큰 차이를 만든다.

### 사전등록과 탐색적 연구의 공존

"사전등록을 하면 연구가 경직되지 않나?"라는 의문이 자연스럽다. 연구 과정에서 예상치 못한 발견이 나오는 것은 오히려 과학의 매력이다. 사전등록은 탐색적 연구를 금지하는 것이 아니다. 핵심은 "사전등록된 분석(confirmatory)"과 "추가로 발견한 것(exploratory)"을 명확히 구분하여 보고하는 것이다.

논문에서 "사전등록된 가설 H1에 대해 다음과 같은 결과를 얻었다"와 "추가 탐색적 분석을 통해 다음과 같은 흥미로운 패턴을 발견했다"를 분리하면 된다. 이렇게 하면 독자는 어떤 결과가 사전에 계획된 것이고, 어떤 결과가 사후적으로 발견된 것인지 판단할 수 있다. 투명성의 문제다.

Registered Reports라는 형식도 알아두면 좋다. 일부 저널은 연구 결과가 나오기 전에 연구 계획만으로 논문 게재를 사전 승인하는 "Registered Report" 형식을 지원한다. 이 형식에서는 결과의 방향(긍정적이든 부정적이든)에 관계없이 게재가 보장된다. 출판 편향을 근본적으로 해결하는 방법이다.

<div class="highlight-box info">
<span class="highlight-box-icon">ℹ️</span>
<div class="highlight-box-content">
<p><strong>사전등록에 포함할 내용</strong></p>
<p>1) 연구 가설 또는 연구 질문, 2) 데이터 수집 방법과 표본 크기, 3) 독립변수와 종속변수의 정의, 4) 분석/모델링 방법, 5) 성공 기준(어떤 결과가 나오면 가설을 지지하는가), 6) 이상치 제거 기준, 7) 알려진 한계점. 완벽할 필요는 없다. 핵심은 "결과를 보기 전에 계획을 문서화했다"는 사실이다.</p>
</div>
</div>

---

## 오픈 데이터: 내 데이터를 세상에 내놓다

### 왜 공유하는가

논문에 "데이터는 합리적인 요청 시 제공"이라고 쓰는 경우가 많다. 하지만 실제로 요청하면 응답이 없거나, 이미 데이터를 잃어버린 경우가 비일비재하다. 연구에 따르면, 논문 출판 후 시간이 지날수록 데이터 확보 가능성이 급격히 낮아진다. 2년 후면 절반 이상의 데이터가 사실상 접근 불가능해진다.

데이터를 공개하면 세 가지가 달라진다. 첫째, 재현 가능성이 보장된다. 둘째, 다른 연구자가 새로운 분석을 할 수 있다. 내가 놓친 패턴을 다른 사람이 발견할 수 있다. 셋째, 데이터 자체가 인용 가능한 학술 기여가 된다. DOI가 부여된 데이터셋은 논문처럼 인용된다.

### 어디에 공유하는가

<div class="card-grid">
<div class="card">
<span class="card-icon">🔬</span>
<div class="card-title">Zenodo</div>
<div class="card-desc">CERN 운영, 분야 제한 없음, GitHub 연동 가능, DOI 자동 발급, 50GB까지 무료</div>
</div>
<div class="card">
<span class="card-icon">📊</span>
<div class="card-title">figshare</div>
<div class="card-desc">다양한 파일 형식 지원, 시각적 미리보기, DOI 발급, 개인 20GB 무료</div>
</div>
<div class="card">
<span class="card-icon">🌿</span>
<div class="card-title">Dryad</div>
<div class="card-desc">논문 연동 특화, 데이터 큐레이션 제공, 일부 저널이 비용 부담, 생물/환경 분야 강세</div>
</div>
<div class="card">
<span class="card-icon">🏫</span>
<div class="card-title">기관 리포지토리</div>
<div class="card-desc">소속 대학이 운영, 장기 보존 보장, 기관별 정책 상이</div>
</div>
</div>

### 데이터 공유의 실전 절차

데이터를 공유한다고 해서 파일을 아무렇게나 올리면 되는 것이 아니다. 다른 연구자가 이 데이터를 실제로 사용할 수 있어야 한다.

첫째, 데이터 구조를 문서화한다. 각 파일의 형식, 컬럼의 의미, 단위, 결측값 처리 방법 등을 담은 데이터 사전(data dictionary)을 함께 제공한다. "column_3이 뭔지 모르겠다"라는 상황을 만들지 않는다.

둘째, 표준 형식을 사용한다. MATLAB .mat 파일보다는 CSV나 HDF5, 이미지라면 표준 형식(PNG, TIFF)을 사용한다. 독자적 바이너리 형식은 해당 소프트웨어가 없으면 열 수 없다.

셋째, 메타데이터를 풍부하게 작성한다. 제목, 저자, 키워드, 수집 방법, 수집 기간, 관련 논문 DOI 등을 플랫폼에서 요구하는 양식에 맞춰 입력한다. 메타데이터가 풍부할수록 다른 연구자가 검색으로 내 데이터를 발견할 확률이 높아진다.

넷째, 버전 관리를 한다. 데이터에 오류가 발견되어 수정하거나, 추가 데이터를 포함해야 하는 경우가 있다. Zenodo는 같은 DOI 아래 새로운 버전을 업로드할 수 있다.

### 공유할 수 없는 경우

모든 데이터를 공개할 수 있는 것은 아니다. 개인정보가 포함된 데이터(IRB 조건), 기업 비밀에 해당하는 산학협력 데이터, 국가 안보와 관련된 데이터 등은 공개에 제약이 있다. 이 경우에도 할 수 있는 것이 있다. 데이터의 구조와 형식을 상세히 문서화하고, 합성 데이터(synthetic data)나 익명화된 샘플 데이터를 제공하고, 접근 조건을 명시하는 것이다. "공개할 수 없다"와 "아무것도 안 한다"는 다른 것이다.

제한된 공개(restricted access)도 가능하다. Zenodo는 "접근 제한(restricted)" 옵션을 제공하여, 요청자가 이유를 밝히고 업로더가 승인하는 방식으로 데이터를 공유할 수 있다. 이렇게 하면 무차별 공개는 아니지만, 합리적인 접근 경로를 제공하는 것이다.

---

## 오픈 코드: GitHub을 연구 인프라로

### 코드 공개의 실전

ch16에서 Git과 GitHub을 연구실 내부의 버전 관리 도구로 다뤘다. 이 장에서는 그것을 한 단계 더 나아가, 연구 코드를 외부에 공개하는 것을 다룬다. 목적이 다르면 방법도 다르다.

연구 코드를 공개할 때 포함해야 할 것들이 있다. README 파일(연구 개요, 설치 방법, 실행 방법, 의존성 목록), requirements.txt 또는 environment.yml(Python 환경 재현), 결과를 재현하는 스크립트(run_experiment.py 같은 것), 데이터 접근 방법(데이터가 공개되어 있으면 링크, 비공개면 설명), 그리고 라이선스다.

"돌아가기만 하면 되는" 연구 코드와 "다른 사람이 재현할 수 있는" 코드는 다르다. 핵심적인 차이는 환경 의존성의 명시다. "내 노트북에서는 돌아간다"는 재현 가능하다는 뜻이 아니다. Docker를 사용하여 환경 전체를 패키징하면 가장 확실하지만, 최소한 requirements.txt(pip freeze > requirements.txt)나 conda의 environment.yml은 제공해야 한다. Python 버전, CUDA 버전, 운영체제 정보도 README에 명시한다.

### 코드 공개의 구조

리포지토리의 구조도 중요하다. 코드 파일을 평면적으로 나열하지 말고, 기능별로 디렉토리를 나눈다. 일반적으로 권장되는 구조는 다음과 같다. src/ 또는 코드 메인 디렉토리, data/ (또는 데이터 접근 설명), experiments/ (실험 스크립트), results/ (결과 재현 스크립트), README.md, LICENSE, requirements.txt. 이 구조를 따르면 처음 보는 사람도 "무엇이 어디에 있는지"를 빠르게 파악할 수 있다.

### 라이선스 선택

코드를 공개할 때 라이선스를 명시하지 않으면, 기본적으로 저작권이 저자에게 있어 다른 사람이 사용할 수 없다. 라이선스를 선택하는 것은 "어떤 조건에서 사용을 허락하는가"를 정하는 것이다.

<div class="tab-container">
<div class="tab-buttons">
<button class="tab-btn active" data-tab="tab-ch38-mit">MIT</button>
<button class="tab-btn" data-tab="tab-ch38-apache">Apache 2.0</button>
<button class="tab-btn" data-tab="tab-ch38-gpl">GPL 3.0</button>
<button class="tab-btn" data-tab="tab-ch38-choose">어떻게 고르나</button>
</div>

<div class="tab-content active" id="tab-ch38-mit">
<p><strong>가장 관대한 라이선스</strong></p>
<p>누구나 자유롭게 사용, 수정, 배포, 상업적 이용이 가능하다. 유일한 조건은 원저작권 표시와 라이선스 문구를 유지하는 것이다. 연구 코드에 가장 흔히 사용된다. "내 코드를 최대한 많은 사람이 쓰길 바란다"면 MIT가 적합하다.</p>
</div>

<div class="tab-content" id="tab-ch38-apache">
<p><strong>MIT + 특허 보호</strong></p>
<p>MIT와 비슷하게 관대하지만, 특허 라이선스 조항이 추가되어 있다. 기여자가 관련 특허를 가지고 있더라도 사용자에게 특허 라이선스를 부여한다. 산학협력 코드나 특허와 관련될 수 있는 코드에 적합하다.</p>
</div>

<div class="tab-content" id="tab-ch38-gpl">
<p><strong>카피레프트 라이선스</strong></p>
<p>GPL 코드를 사용하거나 수정한 소프트웨어도 반드시 GPL로 공개해야 한다. "내 코드를 사용하는 모든 파생 코드도 오픈소스여야 한다"는 철학이다. 상업적 사용을 원하지 않거나, 오픈소스 생태계에 기여하고 싶을 때 선택한다. 다만 기업에서 GPL 코드 사용을 꺼리는 경향이 있으므로, 산업계 활용을 원한다면 주의가 필요하다.</p>
</div>

<div class="tab-content" id="tab-ch38-choose">
<p><strong>실전 선택 가이드</strong></p>
<p>대부분의 연구 코드에는 MIT가 무난하다. 특허가 걸려 있을 가능성이 있으면 Apache 2.0. 파생 코드의 공개를 강제하고 싶으면 GPL. 잘 모르겠으면 MIT를 선택하라. 중요한 것은 "라이선스를 명시하는 것" 자체다. 라이선스가 없으면 아무도 합법적으로 사용할 수 없다.</p>
</div>
</div>

### DOI 발급: Zenodo + GitHub 연동

GitHub 리포지토리에 DOI를 부여하면, 코드를 논문처럼 인용할 수 있다. 방법은 간단하다. Zenodo에 GitHub 계정을 연동하고, 해당 리포지토리에 대해 Zenodo 아카이빙을 활성화한다. GitHub에서 Release를 만들면, Zenodo가 자동으로 스냅샷을 보존하고 DOI를 발급한다.

이렇게 하면 논문의 Data Availability Statement에 "코드는 https://doi.org/10.5281/zenodo.XXXXXXX에서 이용 가능하다"라고 쓸 수 있다. URL과 달리 DOI는 영구적이다. GitHub 리포지토리가 삭제되더라도 Zenodo의 아카이브는 유지된다.

---

## 오픈 액세스: 논문을 누구나 읽을 수 있게

### OA의 종류

전통적 출판 모델에서는 논문을 읽으려면 저널 구독이 필요하다. 대학 도서관이 수십억 원의 구독료를 내고 있기 때문에 캠퍼스 안에서는 무료처럼 느껴지지만, 졸업하면 접근이 끊기고, 산업체나 개발도상국의 연구자는 한 편에 30-50달러를 내야 한다. 공공 연구비로 수행된 연구의 결과물을 읽는 데 돈을 내야 하는 구조에 대한 비판이 오픈 액세스 운동의 출발점이다.

<div class="card-grid">
<div class="card">
<span class="card-icon">🥇</span>
<div class="card-title">Gold OA</div>
<div class="card-desc">저자가 APC(논문처리비용, 보통 $1,000-$5,000)를 내고 출판사 사이트에서 즉시 공개. MDPI, Frontiers 등이 대표적.</div>
</div>
<div class="card">
<span class="card-icon">🌿</span>
<div class="card-title">Green OA</div>
<div class="card-desc">출판 후 저자 최종 원고(accepted manuscript)를 기관 리포지토리나 프리프린트 서버에 공개. 비용 없음. 엠바고 기간(6-24개월) 있을 수 있음.</div>
</div>
<div class="card">
<span class="card-icon">💎</span>
<div class="card-title">Diamond OA</div>
<div class="card-desc">저자도 독자도 비용 부담 없음. 학회나 기관이 운영. 규모가 작은 저널에 많음.</div>
</div>
<div class="card">
<span class="card-icon">📄</span>
<div class="card-title">프리프린트</div>
<div class="card-desc">동료심사 전 공개. arXiv(CS/물리), engrXiv(공학), TechRxiv(IEEE). 무료, 즉시 공개, 우선권 확보.</div>
</div>
</div>

### 프리프린트: 가장 현실적인 출발점

대학원생 입장에서 Gold OA의 APC 수천 달러는 부담이다(연구비에서 나가기도 하지만). 가장 현실적이고 즉시 실행 가능한 오픈 액세스 방법은 프리프린트다.

프리프린트 서버에 논문을 올리면, 동료심사를 기다리는 동안에도 전 세계가 읽을 수 있다. 피드백을 미리 받아 논문 품질을 높일 수 있고, 아이디어의 우선권(priority)을 확보할 수 있다. 대부분의 공학 저널(Elsevier, Springer, IEEE 등)이 프리프린트 게시를 허용한다. 다만 투고 전에 해당 저널의 프리프린트 정책을 확인하는 것이 안전하다.

engrXiv는 공학 분야에 특화된 프리프린트 서버다. arXiv가 CS/물리/수학 중심이라면, engrXiv는 토목, 기계, 전기 등 전통 공학 분야를 커버한다. TechRxiv는 IEEE가 운영하는 프리프린트 서버로, IEEE 저널에 투고할 계획이라면 자연스러운 선택이다.

### OA와 연구비의 관계

한 가지 실전적인 팁이 있다. 많은 연구비(NRF, IITP 등)에서 논문 출판비(APC)를 연구비에서 지출할 수 있도록 허용한다. Gold OA로 출판하고 싶다면, 연구비 집행 항목에 "논문 게재료"가 포함되어 있는지 확인하라. 연구비로 APC를 충당할 수 있다면 대학원생 개인의 부담 없이 Gold OA 출판이 가능하다.

또한 일부 대학은 기관 차원에서 특정 출판사와 OA 출판 계약(transformative agreement)을 맺고 있어서, 해당 출판사 저널에 출판하면 APC가 면제되거나 할인되는 경우가 있다. 학교 도서관에 확인해보라.

Green OA는 비용이 들지 않으므로 항상 가능하다. 논문이 accept 되면, 출판사의 셀프 아카이빙 정책(SHERPA/RoMEO에서 확인 가능)에 따라 저자 최종 원고를 기관 리포지토리나 개인 웹사이트에 올릴 수 있다. 엠바고 기간이 있을 수 있지만, 최소한 일정 기간 후에는 무료 공개가 가능하다.

---

## FAIR 원칙

오픈 사이언스를 실천할 때 지향해야 할 원칙이 FAIR이다. 2016년에 제안된 이 원칙은 데이터와 코드를 단순히 "공개"하는 것을 넘어, "쓸 수 있게" 공개하는 것의 기준을 제시한다.

**Findable (찾을 수 있는):** DOI 같은 영구 식별자가 있어야 한다. 메타데이터(제목, 저자, 키워드 등)가 풍부해야 한다. 검색 엔진에 인덱싱되어야 한다. GitHub 리포지토리 URL만으로는 부족하다. Zenodo에 아카이빙하여 DOI를 받으면 이 조건을 충족한다.

**Accessible (접근 가능한):** 표준 프로토콜(HTTP, FTP 등)로 접근할 수 있어야 한다. 인증이 필요한 경우에도 접근 절차가 명확해야 한다. "이메일로 요청하세요"는 접근 가능하다고 보기 어렵다.

**Interoperable (상호운용 가능한):** 표준 파일 형식(CSV, JSON, HDF5 등)을 사용해야 한다. 독자적 바이너리 형식보다는 널리 사용되는 형식이 좋다. 메타데이터도 표준 스키마를 따라야 한다.

**Reusable (재사용 가능한):** 라이선스가 명확해야 한다. 데이터의 출처와 수집 방법이 문서화되어야 한다. 다른 연구자가 이 데이터를 새로운 연구에 사용할 수 있을 만큼 충분한 맥락 정보가 제공되어야 한다.

---

## 재현 가능한 연구 체크리스트

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>논문 투고 전 재현성 체크리스트</strong></p>
<p>ch23에서 ML 프로젝트의 재현성 체크리스트를 다뤘다. 아래는 모든 연구에 적용되는 일반 체크리스트다.</p>
<ul>
<li>□ 코드가 GitHub에 공개되어 있는가 (또는 공개 예정인가)</li>
<li>□ README에 설치 방법, 실행 방법, 의존성이 명시되어 있는가</li>
<li>□ requirements.txt 또는 environment.yml이 제공되는가</li>
<li>□ 데이터가 공개되어 있거나, 접근 방법이 명시되어 있는가</li>
<li>□ 난수 시드(random seed)가 고정되어 있는가</li>
<li>□ 전처리 과정이 스크립트로 자동화되어 있는가</li>
<li>□ 주요 결과를 재현하는 스크립트가 별도로 제공되는가</li>
<li>□ 라이선스가 명시되어 있는가</li>
<li>□ 코드/데이터에 DOI가 부여되었는가</li>
<li>□ 사전등록을 했다면, 링크가 논문에 포함되어 있는가</li>
</ul>
</div>
</div>

---

## 저널의 오픈 사이언스 정책 트렌드

연구비 지원 기관과 저널들이 오픈 사이언스를 점점 더 강하게 요구하고 있다.

한국연구재단(NRF)은 2023년부터 연구 데이터 관리 계획(DMP, Data Management Plan) 작성을 일부 과제에서 요구하기 시작했다. 미국 NIH는 2023년 1월부터 모든 NIH 지원 연구의 데이터 공유를 의무화했다. 유럽의 Plan S는 연구비 지원 논문의 즉시 오픈 액세스를 요구한다.

저널 수준에서도 변화가 빠르다. Nature, Science 계열 저널은 코드와 데이터 공개를 강력히 권장하거나 의무화하고 있다. IEEE는 Code Ocean을 통한 코드 재현성 검증을 지원한다. Elsevier는 데이터 공유를 장려하며, 일부 저널에서 Open Data Badge를 부여한다.

이 흐름은 돌이킬 수 없다. 지금 오픈 사이언스를 습관화하는 것은 미래의 필수 역량을 미리 갖추는 것이다.

<div class="highlight-box warning">
<span class="highlight-box-icon">⚠️</span>
<div class="highlight-box-content">
<p><strong>산학협력 프로젝트에서의 주의</strong></p>
<p>기업과의 공동연구에서는 데이터와 코드 공개가 계약에 의해 제한될 수 있다. NDA(비밀유지계약)를 위반하면 법적 문제가 생긴다. 프로젝트 시작 시 "어디까지 공개할 수 있는가"를 미리 협의하고 계약서에 명시해두는 것이 중요하다. ch40(지식재산권)에서 이 문제를 더 자세히 다룬다.</p>
</div>
</div>

---

## 오픈 사이언스 실천의 Do's and Don'ts

<div class="do-dont">
<div class="do-box">
<h4>✅ Do</h4>
<ul>
<li>논문 투고 시 코드와 데이터를 함께 공개한다 (또는 공개 계획을 명시한다)</li>
<li>GitHub 리포지토리에 라이선스 파일과 README를 포함한다</li>
<li>Zenodo 연동으로 코드/데이터에 DOI를 발급받는다</li>
<li>프리프린트를 적극 활용하여 빠른 공개와 피드백을 얻는다</li>
<li>실험/분석 전에 사전등록을 고려한다</li>
<li>FAIR 원칙에 따라 표준 형식과 충분한 메타데이터를 제공한다</li>
<li>재현에 필요한 모든 디테일(난수 시드, 하이퍼파라미터, 소프트웨어 버전)을 문서화한다</li>
</ul>
</div>
<div class="dont-box">
<h4>❌ Don't</h4>
<ul>
<li>"데이터는 합리적 요청 시 제공"이라고만 쓰고 실제로는 제공하지 않기</li>
<li>코드를 공개하면서 라이선스를 누락하기</li>
<li>GitHub URL만 제공하고 DOI를 발급받지 않기 (URL은 변할 수 있다)</li>
<li>"정리가 안 되어 있어서" 코드 공개를 계속 미루기 (완벽할 필요 없다)</li>
<li>결과를 본 후에 가설이나 분석 방법을 바꾸면서, 처음부터 그렇게 계획했던 것처럼 보고하기</li>
<li>프리프린트를 올린 후 해당 저널의 프리프린트 정책을 확인하지 않기</li>
</ul>
</div>
</div>

---

## 어디서부터 시작할 것인가

오픈 사이언스의 모든 것을 한꺼번에 하려면 부담스럽다. 단계적으로 접근하면 된다.

**1단계 (지금 당장):** 현재 진행 중인 연구의 코드를 GitHub에 올린다. private이어도 좋다. README와 requirements.txt를 작성한다. ch16에서 배운 Git 워크플로우를 적용한다.

**2단계 (논문 투고 시):** 리포지토리를 public으로 전환하고, 라이선스를 추가한다. Zenodo를 연동하여 DOI를 발급받는다. 데이터를 공개할 수 있으면 Zenodo나 figshare에 업로드한다.

**3단계 (다음 프로젝트부터):** 사전등록을 시도한다. OSF에 계정을 만들고, 연구 계획을 등록한다. 프리프린트를 활용한다.

<div class="highlight-box important">
<span class="highlight-box-icon">🔑</span>
<div class="highlight-box-content">
<p><strong>완벽하지 않아도 된다</strong></p>
<p>코드가 깔끔하지 않아도 공개하는 것이 공개하지 않는 것보다 낫다. 데이터의 일부만 공개할 수 있어도 아무것도 안 하는 것보다 낫다. "완벽하게 정리한 후에 공개하겠다"는 "영원히 공개하지 않겠다"와 같은 말이 되기 쉽다. 최소한의 문서화를 하고, 일단 공개하라.</p>
</div>
</div>

연구는 혼자만의 것이 아니다. 내 연구가 다른 연구자에 의해 검증되고, 확장되고, 활용될 때 비로소 과학이 진보한다. 오픈 사이언스는 그 진보의 속도를 높이는 인프라다. ch29에서 "정직하라"를 배웠다면, 이 장에서는 "정직함을 증명할 수 있는 구조를 만들라"를 배운 것이다.

---

## 연구 데이터 관리 계획(DMP) — 펀딩이 요구하는 새 표준

2020년대 중반부터 전 세계의 주요 연구비 지원 기관이 제안서 심사의 필수 항목으로 **데이터 관리 계획(Data Management Plan, DMP)**을 요구하기 시작했다. 한국의 NRF, 미국의 NSF, EU의 Horizon Europe, 영국의 UKRI, 호주의 ARC 등이 그렇다. DMP가 없는 제안서는 심사조차 되지 않는 경우가 많다. 박사 학생이 직접 DMP를 쓸 일은 적지만, 지도교수의 제안서 작성을 돕거나 포닥/교수가 되었을 때 필수 기술이 된다. 또한 개인 연구 수준에서도 DMP의 원리를 적용하면 연구의 질과 효율이 크게 올라간다.

<div class="highlight-box highlight-info">

**DMP란 무엇인가.** DMP는 연구 프로젝트에서 생성, 수집, 관리, 공유, 보존될 데이터에 대한 서면 계획이다. "어떤 데이터를 언제 만들고, 어떻게 저장하고, 누가 접근하고, 프로젝트 종료 후 어떻게 보존할지"를 미리 명문화한다. 이것은 관료주의적 양식 채우기가 아니라 연구의 실제 품질을 좌우하는 도구다. 데이터를 미리 계획하면 프로젝트 중간에 "이 데이터를 어떻게 관리하지?"의 혼란이 사라진다.

</div>

**DMP의 표준 10개 섹션.**

대부분의 펀딩 기관이 요구하는 DMP는 다음 10개 섹션으로 구성된다. 양식은 조금씩 다르지만 내용은 유사하다.

**섹션 1: 프로젝트와 데이터 개요**
- 프로젝트 제목, 기간, 연구 목적
- 생성/수집할 데이터의 유형(센서 데이터, 시뮬레이션 결과, 이미지, 설문 등)
- 예상 데이터 크기(KB/MB/GB/TB)
- 기존 데이터 재사용 여부

**섹션 2: 데이터 수집과 생성**
- 수집 방법(장비, 소프트웨어, 프로토콜)
- 데이터 형식(CSV, HDF5, DICOM, FITS, NetCDF 등)
- 포맷 선택의 근거(왜 이 포맷인가, 표준인가 독자 포맷인가)
- 데이터 품질 관리 절차

**섹션 3: 문서화와 메타데이터**
- 각 데이터셋에 첨부할 메타데이터 표준(예: Dublin Core, DataCite, 도메인 특화 표준)
- README 파일의 구조
- 데이터 사전(data dictionary): 각 변수의 의미, 단위, 범위
- 실험 조건의 기록 방식

**섹션 4: 윤리와 법적 고려 사항**
- 인간 대상 데이터 여부와 IRB 승인(ch29 참조)
- 개인정보 보호와 익명화 절차
- 저작권과 라이선스(ch28 참조)
- 산학 과제의 NDA와 데이터 공유 제한

**섹션 5: 저장과 백업**
- 저장 위치(학교 서버, 클라우드, 외장 하드)
- 백업 전략(3-2-1 원칙: 3개 복사본, 2개 매체, 1개 오프사이트)
- 버전 관리(Git, DVC)
- 접근 권한 관리

**섹션 6: 데이터 보안**
- 민감 데이터의 암호화
- 접근 로그 기록
- 보안 사고 대응 절차
- 비밀 정보 관리(ch16 참조)

**섹션 7: 데이터 공유와 접근**
- 공유 시점(프로젝트 중 / 종료 시 / 논문 출판 시)
- 공유 플랫폼(Zenodo, figshare, Dryad, 기관 리포지토리)
- 접근 조건(완전 공개, 등록 후 접근, 요청 후 접근)
- 공유 전 필요한 처리(익명화, 정제)

**섹션 8: 장기 보존**
- 보존 기관과 보존 기간(최소 10년이 일반적)
- 포맷 마이그레이션 계획(구형 포맷의 신형 포맷으로의 변환)
- 보존 비용과 부담 주체
- 폐기 기준과 절차

**섹션 9: 책임과 자원**
- 데이터 관리 담당자(보통 PI와 박사 학생/포닥)
- 데이터 관리에 필요한 시간과 비용
- 관리 도구와 훈련 필요성

**섹션 10: 계획 검토와 업데이트**
- 프로젝트 중 DMP 업데이트 주기
- 주요 결정이 변경되었을 때의 대응

**DMP 작성의 실전 팁.**

**팁 1: 템플릿을 활용하라.** 처음부터 쓰지 말고 기존 템플릿을 사용한다. **DMPTool**(dmptool.org)과 **DMP Canvas**가 대표적. 펀딩 기관별 요구사항이 자동으로 반영되어 있다. 한국에서는 NRF의 제안서 템플릿 안에 DMP 섹션이 포함되어 있다.

**팁 2: 5페이지 이내로.** DMP는 간결해야 한다. 너무 길면 심사자가 읽지 않는다. 각 섹션을 한 단락 이내로 유지한다.

**팁 3: 구체적이고 현실적이어야 한다.** "데이터를 보존할 것이다"는 쓸모없다. "데이터는 Zenodo에 10년간 보존하고, DOI를 발급받으며, 프로젝트 종료 후 6개월 이내에 공개한다"처럼 구체적으로 쓴다.

**팁 4: 보수적으로 약속하라.** DMP는 약속이다. "모든 원시 데이터를 공개한다"고 약속했는데 실제로 못 하면 문제가 된다. 보수적으로 약속하고 더 잘 이행하는 것이 낫다.

**팁 5: 도메인 리포지토리를 먼저 찾아라.** 일반 리포지토리(Zenodo)보다 도메인 전용 리포지토리가 있으면 그것을 우선한다. 유체역학 데이터는 Johns Hopkins Turbulence Database, 재료는 Materials Project, 천문학은 NASA Exoplanet Archive 등. 도메인 리포지토리는 해당 분야 연구자에게 더 잘 발견된다.

**팁 6: 보조자료(Supplementary)와 데이터 리포지토리를 구분하라.** 논문의 보조자료는 저널이 호스팅하고, 별도 데이터는 Zenodo 등에 둔다. 큰 데이터셋은 저널 보조자료로 부적합하고, 별도 리포지토리가 적합하다.

**DMP 예시 문장.**

DMP를 쓸 때 참고할 수 있는 예시 문장.

<div class="highlight-box highlight-info">

**데이터 개요 (섹션 1):**
> 본 프로젝트는 교량의 진동 데이터를 수집하여 구조 건전성 모니터링 모델을 개발한다. 3개의 교량에서 각각 20개의 가속도계로 1년간 수집할 예정이며, 총 데이터 크기는 약 500 GB로 예상된다.

**포맷 (섹션 2):**
> 원시 데이터는 HDF5 포맷으로 저장한다. 선택 이유는 (1) 대용량 시계열 데이터에 최적화되어 있고, (2) 메타데이터를 함께 저장할 수 있으며, (3) Python/MATLAB/R에서 모두 읽을 수 있기 때문이다.

**공유 (섹션 7):**
> 데이터는 논문 출판 시점에 Zenodo에 공개된다. CC BY 4.0 라이선스로 제공되며, DOI가 발급된다. 저장소 URL은 논문의 Data Availability 섹션에 명시된다.

**장기 보존 (섹션 8):**
> 모든 원시 데이터와 분석 결과는 Zenodo에 최소 10년간 보존된다. 본인 소속 기관의 데이터 서버에도 병행 보존되며, 매년 자동 백업 검증이 수행된다.

</div>

이 예시들은 짧지만 구체적이다. DMP도 이 수준의 구체성을 목표로 한다.

**박사 학생이 개인 연구에 DMP를 적용하는 법.**

공식 DMP를 쓸 일이 없더라도, 박사 연구에 DMP의 원리를 적용할 수 있다. 다음의 **"미니 DMP"**를 2-3 페이지로 작성한다.

1. **내 연구 데이터 요약**: 어떤 데이터를 몇 GB 수집/생성하는가
2. **저장 위치와 백업**: 어디에, 어떻게 백업할 것인가 (3-2-1 원칙)
3. **명명 규칙**: 파일 이름, 폴더 구조
4. **메타데이터 관리**: 각 실험의 조건을 어떻게 기록할 것인가
5. **공유 계획**: 논문 출판 시점에 무엇을 공개할 것인가
6. **졸업 후 보존**: 내 박사 연구 종료 후 누가 이 데이터를 관리할 것인가

이 문서를 박사 시작 시점에 만들고, 1년마다 업데이트한다. 졸업 시점에 연구 자산이 체계적으로 정리되어 있을 것이다.

**DMP와 ch36(학위논문) 완료 후의 연결.**

ch36에서 "학위논문 완료 후 디지털 자산 정리"를 다뤘다. DMP를 박사 과정 초기에 세우면, 이 정리가 훨씬 쉬워진다. DMP 없이 5년을 보내고 졸업 직전에 정리를 시작하면 거의 불가능한 양이 된다. 반대로 DMP를 따라 꾸준히 관리하면 졸업 시점에 자연스럽게 자산이 정리되어 있다.

**DMP의 자주 하는 질문.**

**Q: DMP가 단지 양식 채우기 아닌가요?**
A: 그럴 수도 있지만, 진지하게 작성하면 실제 연구의 품질과 재현성을 크게 높인다. 귀찮은 과제로 대충 쓰지 말고, 미래 자신을 돕는 문서라고 생각한다.

**Q: 데이터 공유가 불가능한 경우(산학 NDA 등)에는 어떻게 하나요?**
A: DMP에 명시적으로 "이 데이터는 산학 계약에 따라 공유할 수 없다"고 쓰고, 대신 공유 가능한 부분(예: 집계 결과, 메타데이터)을 언급한다. 심사자는 정당한 이유는 이해한다.

**Q: DMP를 바꿀 수 있나요?**
A: 네, 프로젝트 진행 중 주요 변경이 있으면 업데이트한다. 다만 업데이트 이유를 기록한다.

**Q: 작은 프로젝트에도 DMP가 필요한가요?**
A: 공식 DMP는 필요 없지만, 위의 "미니 DMP"를 적용하는 것을 권한다. 15분의 투자가 수개월의 혼란을 막는다.

**DMP 학습 리소스.**

- **DMPTool** (dmptool.org): 무료 DMP 작성 도구. 기관/펀딩 기관별 템플릿 제공.
- **DCC DMP Guidance** (Digital Curation Centre, dcc.ac.uk): 영국의 DMP 작성 가이드.
- **FAIRsharing.org**: 도메인별 표준과 리포지토리 검색.
- **한국 NRF 제안서 양식**: 국내 연구 기관의 요구사항 확인.
- **Research Data Alliance**(rd-alliance.org): 연구 데이터 관리의 국제 커뮤니티.

> DMP는 오픈 사이언스의 입구다. 데이터를 처음부터 공유 가능한 구조로 만드는 사고방식이다. 박사 과정 학생이 DMP에 익숙해지면, 연구 전반의 체계가 올라가고, 졸업 후 경력에서도 차별화된 강점이 된다. "데이터를 체계적으로 관리할 줄 아는 사람"은 학계에서도 산업계에서도 희소한 자원이다.

---

## 컴퓨팅 환경의 재현성 — Docker, Binder, Conda로 재현 가능한 연구 만들기

오픈 사이언스의 핵심 약속은 "다른 연구자가 결과를 재현할 수 있다"는 것이다. 그러나 현실에서 많은 공개된 연구 코드가 **실행조차 되지 않는다**. 누군가 GitHub 저장소를 클론해서 실행하려 하면, 라이브러리 버전 충돌, 운영체제 차이, 누락된 파일, 경로 오류 등의 수십 가지 문제에 부딪힌다. 이것이 "**재현성 위기의 기술적 원인**"이다. 재현 가능한 연구를 만들려면 단순히 "코드를 공개"하는 것이 아니라, **완전한 컴퓨팅 환경**을 함께 공개해야 한다.

<div class="highlight-box highlight-important">

**"내 노트북에서 작동한다"는 함정.** 노트북에서 완벽히 작동하는 코드가 다른 사람의 환경에서는 안 돌아가는 경우가 매우 흔하다. Python 버전 차이, 운영체제 차이, 하드웨어 차이, 설치된 라이브러리의 미묘한 차이. 이런 차이들이 "같은 코드, 다른 결과"를 만든다. 논문의 재현성은 코드 품질만이 아니라 **환경의 이식성**에 달려 있다.

</div>

**재현성의 5가지 수준.**

재현성은 "all or nothing"이 아니라 스펙트럼이다. 연구가 어느 수준인지 이해한다.

**레벨 0: 코드 없음.**
논문에 설명만 있고 코드는 없음. 재현 거의 불가능.

**레벨 1: 코드 있음, 문서 없음.**
코드는 공개했지만 어떻게 실행하는지 설명 없음. 다른 사람이 몇 시간-며칠 걸려 겨우 돌림.

**레벨 2: 코드 + 기본 README.**
실행 방법이 README에 있음. 그러나 환경 설정은 사용자가 알아서.

**레벨 3: 코드 + requirements.txt/environment.yml.**
사용된 라이브러리와 버전 명시. 대부분 재현 가능. 간혹 OS 차이로 실패.

**레벨 4: 코드 + 컨테이너(Docker).**
OS까지 포함한 완전한 환경. 거의 모든 경우 재현 가능.

**레벨 5: One-click Reproduction.**
Binder, Code Ocean 같은 클라우드 서비스. 브라우저에서 바로 실행. 설치 불필요.

**박사 논문의 목표**: 최소 레벨 3, 가능하면 레벨 4. 최상급 저널은 레벨 4-5를 권장.

**레벨 3: Python 환경의 표준화.**

가장 기본적인 재현성. 사용한 라이브러리와 버전을 파일에 기록.

**방법 1: requirements.txt (pip).**
```bash
# 현재 환경의 모든 패키지 저장
pip freeze > requirements.txt

# 다른 사람의 재현
pip install -r requirements.txt
```

**requirements.txt 예시**:
```
numpy==1.24.0
pandas==2.0.1
scikit-learn==1.3.0
matplotlib==3.7.1
torch==2.0.1
```

**주의**: `pip freeze`는 모든 의존성을 포함한다. 수백 줄이 되기도 한다. 직접 사용한 것만 정리하려면 `pip list --format=freeze | grep -v -f <(pip list --format=freeze --not-required)` 같은 방법 사용.

**방법 2: environment.yml (Conda).**
```bash
# 환경 저장
conda env export > environment.yml

# 재현
conda env create -f environment.yml
```

**environment.yml 예시**:
```yaml
name: my-research
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.10
  - numpy=1.24.0
  - pandas=2.0.1
  - pytorch=2.0.1
  - pip
  - pip:
    - some-pip-only-package==1.2.3
```

**Conda의 장점**: 비-Python 의존성(CUDA, MKL, HDF5)도 함께 관리. GPU 코드의 재현에 유리.

**방법 3: Poetry 또는 PDM.**
현대적 Python 패키지 관리자. `pyproject.toml`과 `poetry.lock`으로 정확한 버전 고정.

```toml
[tool.poetry]
name = "my-research"
version = "0.1.0"

[tool.poetry.dependencies]
python = "^3.10"
numpy = "^1.24.0"
pandas = "^2.0.1"
```

**Poetry의 장점**: 의존성 해결이 견고함. 재현성을 보장하는 `poetry.lock` 파일.

**레벨 4: Docker 컨테이너.**

환경 재현의 "최종 해결책". OS부터 모든 의존성을 컨테이너에 패키징.

**Dockerfile의 구조**:
```dockerfile
# Base image
FROM python:3.10-slim

# System dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libhdf5-dev \
    && rm -rf /var/lib/apt/lists/*

# Working directory
WORKDIR /workspace

# Copy requirements first (for better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

# Default command
CMD ["python", "run_experiment.py"]
```

**사용법**:
```bash
# 이미지 빌드
docker build -t my-research:latest .

# 실행
docker run --rm my-research:latest

# 결과를 호스트로 저장
docker run --rm -v $(pwd)/results:/workspace/results my-research:latest

# GPU 사용 (NVIDIA)
docker run --rm --gpus all my-research:latest
```

**Docker의 장점**:
- OS 독립적 (리눅스/윈도우/맥 어디서나 실행)
- 완전한 환경 고정
- 큰 프로젝트에 적합

**Docker의 단점**:
- 이미지 크기 (보통 1-5 GB)
- 학습 곡선
- GPU 사용은 추가 설정 필요 (nvidia-docker)

**GPU용 Docker: 주의사항.**
딥러닝 연구에서는 NVIDIA CUDA 기반 이미지가 필요하다.

```dockerfile
# NVIDIA CUDA base
FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04

# Python 설치
RUN apt-get update && apt-get install -y python3 python3-pip

# PyTorch with CUDA
RUN pip install torch==2.0.1+cu118 torchvision==0.15.2+cu118 \
    --index-url https://download.pytorch.org/whl/cu118

COPY . /workspace
WORKDIR /workspace
```

**주의**: CUDA 버전이 호스트와 이미지에서 호환되어야 한다. 버전 불일치는 흔한 오류.

**Docker Compose로 복잡한 환경 관리.**

여러 서비스(예: 데이터베이스 + 웹 서버 + ML 모델)가 필요한 경우.

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    volumes:
      - ./data:/workspace/data
      - ./results:/workspace/results
    environment:
      - DB_HOST=db

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# 전체 환경 시작
docker-compose up

# 종료
docker-compose down
```

박사 연구의 대부분은 단일 컨테이너로 충분. 복잡한 경우에만 Compose.

**레벨 5: Binder와 Code Ocean.**

사용자가 설치 없이 브라우저에서 바로 실행할 수 있게 해주는 서비스.

**Binder (mybinder.org).**
GitHub 저장소를 클라우드의 Jupyter 환경으로 자동 변환. 무료.

**사용법**:
1. GitHub 저장소에 `requirements.txt` 또는 `environment.yml` 추가
2. `mybinder.org`에 저장소 URL 입력
3. Binder가 자동으로 환경 구축 후 Jupyter 링크 제공
4. 논문에 Binder 링크 포함

**예시 저장소 구조**:
```
my-repo/
├── notebooks/
│   └── main_analysis.ipynb
├── src/
│   └── models.py
├── data/
│   └── sample_data.csv
├── requirements.txt   # Binder가 읽음
└── README.md
```

**Binder의 장점**:
- 사용자 측 설치 불필요
- 무료
- GitHub와 직접 연동

**Binder의 한계**:
- 작은 프로젝트만 지원 (디스크 5 GB, RAM 2 GB)
- 세션 시간 제한
- GPU 지원 안 함
- 느린 시작 시간

**Code Ocean (codeocean.com).**
유료 서비스이지만 재현성 특화. 학술 논문과 긴밀히 연동.

**특징**:
- Docker 기반 환경
- GPU 지원
- DOI 발급
- 논문 저장소와 연동

**무료 대안 — MyST Markdown + GitHub Actions.**
최근의 접근: Markdown으로 논문을 쓰고 GitHub Actions로 자동 실행/검증.

**Make와 Snakemake로 실행 자동화.**

단순 스크립트 실행이 아니라 **의존성 그래프** 기반 실행. 중간 결과를 캐싱.

**Makefile 예시**:
```makefile
all: results/figures/fig1.pdf results/tables/table1.csv

data/processed.csv: data/raw.csv scripts/preprocess.py
	python scripts/preprocess.py

models/trained.pkl: data/processed.csv scripts/train.py
	python scripts/train.py

results/figures/fig1.pdf: models/trained.pkl scripts/plot.py
	python scripts/plot.py

clean:
	rm -rf data/processed.csv models/*.pkl results/
```

**사용법**:
```bash
make              # 전체 실행
make clean        # 정리
```

Make는 의존성을 자동으로 관리한다. 입력이 바뀌지 않았으면 다시 실행하지 않음.

**Snakemake**: Make의 Python 기반 현대적 대안. 과학 연구에 최적화.

```python
# Snakefile
rule all:
    input:
        "results/figures/fig1.pdf"

rule preprocess:
    input: "data/raw.csv"
    output: "data/processed.csv"
    shell: "python scripts/preprocess.py"

rule train:
    input: "data/processed.csv"
    output: "models/trained.pkl"
    shell: "python scripts/train.py"

rule plot:
    input: "models/trained.pkl"
    output: "results/figures/fig1.pdf"
    shell: "python scripts/plot.py"
```

Snakemake는 병렬 실행, 클라우드 배포, HPC 통합 등 고급 기능 제공.

**재현성 실전 체크리스트.**

저장소가 "재현 가능한지" 확인하는 체크리스트.

<div class="highlight-box highlight-info">

**재현성 체크리스트**

- [ ] 환경 파일 존재 (requirements.txt / environment.yml / Dockerfile)
- [ ] 모든 의존성의 버전 고정 (`==` 또는 `=`)
- [ ] 시드(seed) 고정 (random, numpy, torch 모두)
- [ ] 하드코딩된 경로 제거 (상대 경로 또는 설정 파일 사용)
- [ ] 데이터 다운로드 스크립트 또는 명확한 지침
- [ ] 실행 순서 명시 (README 또는 Makefile)
- [ ] 예상 실행 시간 명시
- [ ] 필요한 하드웨어 명시 (GPU, RAM)
- [ ] 예상 출력 샘플 포함
- [ ] 다른 환경에서 한 번 이상 테스트

</div>

**"다른 환경에서 테스트"가 핵심**. 컴퓨터뿐 아니라 친구의 컴퓨터, 또는 새로운 VM에서 한 번 실행해 본다. 여기서 발견되는 문제를 수정.

**시드 고정의 중요성.**

동일한 실행을 보장하려면 모든 난수 생성기의 시드를 고정해야 한다.

```python
import random
import numpy as np
import torch

def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

set_seed(42)
```

**한계**: GPU에서는 일부 연산이 본질적으로 비결정적. 완벽한 재현은 어렵지만 근접할 수 있다.

**데이터의 재현성.**

코드뿐 아니라 데이터도 재현 가능해야 한다.

**소규모 데이터 (< 100 MB)**:
- Git LFS로 저장소에 포함
- 또는 저장소에 직접 포함

**중규모 데이터 (100 MB - 10 GB)**:
- Zenodo, figshare, 기관 리포지토리에 업로드
- DOI 발급
- README에 다운로드 스크립트 제공

**대규모 데이터 (> 10 GB)**:
- 공개 저장소 권장
- AWS S3 Requester Pays (다운로드 비용은 사용자 부담)
- 또는 데이터 접근 요청 프로토콜

**데이터 무결성 확인**:
```bash
# MD5 체크섬 생성
md5sum data/*.csv > checksums.md5

# 다른 사람이 검증
md5sum -c checksums.md5
```

**난수 데이터의 재현성**: 합성 데이터는 생성 스크립트와 시드를 공개. 매우 작은 크기로 재현 가능.

**"Write the paper with code"의 철학.**

최근의 접근: 논문 자체를 "실행 가능한 문서"로 만든다.

- **Quarto**: 과학 논문용 현대 도구. R, Python 코드 내장.
- **Jupyter Book**: Jupyter 기반 책 작성.
- **Sweave / Knitr**: R의 고전적 방법.
- **Pluto.jl**: Julia의 반응형 노트북.

이 접근은 "본문 → 코드 → 그림"이 하나의 파일에 들어간다. 수정 시 자동 재실행. 논문과 코드의 동기화 보장.

**재현성과 윤리의 연결.**

재현성은 기술 문제가 아니라 윤리 문제다 (ch29 참조).

- 재현할 수 없는 연구는 검증할 수 없다
- 검증할 수 없는 연구는 신뢰할 수 없다
- 신뢰할 수 없는 연구는 과학이라고 할 수 없다

연구가 "재현 가능한 형태로" 공개되는 것은 과학의 기본 의무다. 이것을 "번거로운 추가 작업"이 아니라 "연구의 필수 부분"으로 본다.

**저널의 재현성 요구 변화.**

최근 학술 출판의 트렌드.

- **Nature, Science**: Reproducibility checklist 제출 필수
- **NeurIPS, ICML, ICLR**: 재현성 검토 (reproducibility review) 도입
- **ACM**: Reproducibility badges (Artifact Available, Functional, Reusable)
- **IEEE**: 일부 저널에서 코드/데이터 공개 필수화

투고할 저널/학회의 최신 정책을 확인한다.

**재현성 배지(Reproducibility Badges).**

일부 저널과 학회는 재현성 수준을 배지로 표시한다.

- **Artifact Available**: 코드/데이터 공개
- **Artifact Functional**: 저자 설명대로 작동
- **Results Replicated**: 제3자가 실제로 재현 성공

논문에 이 배지를 받는 것은 연구 품질의 공개적 인정이다.

**재현성의 현실적 한계.**

완벽한 재현성은 어렵다. 한계를 인정한다.

**한계 1: 하드웨어 차이.**
GPU 모델, CPU 아키텍처, 메모리 크기가 결과에 영향. 특히 수치 계산에서.

**한계 2: 랜덤성.**
GPU 연산의 비결정적 요소. CUDA의 atomicAdd 등.

**한계 3: 소프트웨어 업데이트.**
라이브러리가 시간이 지나면서 바뀜. 5년 후에도 같은 결과를 보장하기 어려움.

**한계 4: 데이터 접근.**
민감 데이터, 상업 데이터는 공개 불가. "데이터 외 모든 것"의 재현성만 가능.

**한계 5: 계산 비용.**
수천 시간 GPU가 필요한 실험을 다른 사람이 재현하기 어려움.

이런 한계를 인정하되, **가능한 한 많은 부분을 재현 가능하게** 만드는 것이 목표.

**재현성 개선의 현실적 로드맵.**

박사 과정 중 재현성 수준을 점차 올리는 로드맵.

**박사 1년차**: requirements.txt 작성 습관 (레벨 3)
**박사 2년차**: Git 사용 정착, 시드 고정, README 작성
**박사 3년차**: 첫 논문에 Dockerfile 포함 (레벨 4)
**박사 4년차**: Snakemake/Make로 워크플로 자동화
**박사 5년차**: 졸업 논문 코드에 완전한 재현 가능 환경

레벨 0에서 레벨 4로 한 번에 가는 것이 아니라, 단계적으로 발전.

**학습 자원.**

- **The Turing Way**: 재현성의 종합 가이드. 무료 온라인.
- **Reproducible Research in Computational Science** (Peng 2011): 재현성의 기본 개념.
- **"Docker for Data Science"**: 실전 Docker 가이드.
- **Snakemake 공식 문서**: snakemake.readthedocs.io
- **Binder 문서**: mybinder.readthedocs.io
- **Code Ocean**: codeocean.com

> 재현 가능한 연구는 "나중에 고민"할 것이 아니다. 박사 1년차에 requirements.txt를 관리하기 시작하면, 졸업 시점에는 자연스럽게 Docker까지 쓸 수 있다. 반면 5년차에 갑자기 재현성을 만들려고 하면 거대한 과제가 된다. 작은 습관을 일찍 시작하는 것이 가장 효과적이다. 코드가 "노트북에서만 작동"하는 상태에서 벗어나, "누구든 실행할 수 있는 상태"로 만드는 것. 이것이 오픈 사이언스의 실질적 의미다.

---

## AI 시대의 오픈 사이언스 — 모델·데이터·벤치마크의 공개

이 챕터의 앞부분이 전통적 오픈 사이언스(오픈 데이터·오픈 코드·오픈 액세스)를 다뤘다면, 이 섹션은 **AI 시대의 새로운 오픈 사이언스 층위**를 다룬다. 2020년 이후 AI·ML 분야가 오픈 사이언스의 가장 활발한 영역이 되었다. Hugging Face·Papers With Code·arXiv·GitHub이 만드는 생태계가 학문의 공개 속도와 재현성을 근본적으로 바꿨다. 한국 박사가 이 생태계에 어떻게 참여하고 기여할지 이해하는 것이 박사 학위의 가시성·영향력·미래 경력을 결정한다.

<div class="highlight-box info">
<span class="highlight-box-icon">ℹ️</span>
<div class="highlight-box-content">
<p><strong>AI가 바꾼 오픈 사이언스의 속도</strong></p>
<p>전통적 오픈 사이언스는 논문 출판 후 1-3년에 걸쳐 데이터·코드가 공개됐다. AI 분야에서는 <em>논문과 모델이 동시에 공개</em>되고, 때로 논문보다 먼저 GitHub·Hugging Face에서 공개된다. 이 속도가 학문의 검증·적용·개선 사이클을 10배 빠르게 한다. 한국 박사가 이 속도에 맞추지 못하면 분야의 뒤에서 따라가게 된다.</p>
</div>
</div>

### AI 모델 공개의 3가지 층위

AI 모델을 "공개한다"는 것은 단일 개념이 아니다. 공개의 층위별로 다른 의미:

**층위 1: 모델 가중치만 공개 (Open Weights)**.
학습된 파라미터만 제공. 아키텍처와 학습 데이터는 비공개. Meta의 Llama 초기, OpenAI의 Whisper가 이 방식. 사용 가능하지만 복제·확장은 제한.

**층위 2: 코드 + 가중치 공개 (Open Source Model)**.
학습 코드·추론 코드·가중치가 모두 공개. 학습 데이터는 부분 공개 또는 비공개. Llama 2-3, Mistral, Qwen이 이 방식. 가장 흔한 오픈 모델 형태.

**층위 3: 완전 공개 (Truly Open Science)**.
코드·가중치·학습 데이터·학습 로그가 모두 공개. BLOOM, Pythia, OLMo 등. 학술적 가치가 가장 크지만 리소스 부담이 커서 드문 형태.

박사 연구의 모델을 어느 층위로 공개할지 결정하는 것이 박사 후반의 중요한 선택이 된다.

### Hugging Face 생태계의 활용

Hugging Face가 AI 오픈 사이언스의 de facto 플랫폼. 박사 학생이 활용하는 방법:

**활용 1: 본인의 모델 공개**.
박사 논문의 모델을 Hugging Face에 업로드. 다운로드·사용 통계가 논문 인용보다 빠르게 쌓임. 2025 기준 일부 분야(NLP·CV)에서는 Hugging Face의 "downloads"가 연구 영향력의 새로운 지표.

**활용 2: Model Cards 작성**.
모델과 함께 Model Card(사용 방법·한계·윤리적 고려사항·학습 데이터 요약)를 작성. Hugging Face가 템플릿 제공. Model Card가 논문의 부록처럼 기능.

**활용 3: Spaces를 통한 데모**.
본인의 모델을 누구나 웹에서 시험해볼 수 있는 데모 페이지(Space) 구축. Gradio·Streamlit으로 무료. 학회·Job Talk에서 "live demo"의 힘.

**활용 4: 데이터셋 공유**.
본인이 수집·정제한 데이터셋을 Hugging Face Datasets에 공개. 다른 연구자의 접근성을 크게 높임. 인용 가능한 DOI 제공.

### 학습 데이터 공개의 복잡성

AI 시대 오픈 사이언스의 가장 어려운 측면. 학습 데이터 공개의 장애:

**장애 1: 저작권 (ch40 참조)**.
웹 크롤링 데이터의 원본 저작권 문제. 2023-2025의 연속 소송(NYT·Getty·Authors Guild v. OpenAI)이 이 영역을 법적 지뢰밭으로 만듦.

**장애 2: 개인정보**.
이름·주소·전화번호가 포함된 데이터. GDPR·개인정보보호법(한국)이 공개 금지. 사전 익명화 필요.

**장애 3: 산업 협력 데이터**.
기업 후원 연구의 데이터는 NDA 하에 있음. 공개 불가.

**장애 4: 의료·민감 데이터**.
IRB 승인의 범위 안에서만 공유 가능. 일반 공개 거의 불가.

**대응 전략**:
- **메타데이터만 공개**: 원본 데이터 대신 통계·구조·접근 방법만 공개
- **Synthetic data 공개**: 원본을 보존하면서 유사한 분포의 합성 데이터 생성·공개
- **Request-based access**: 연구자 신원 확인 후 개별 접근 승인 (CHI 등 학회의 표준 방식)
- **Tiered access**: 일반 공개 버전 (익명화·축소) + 제한 공개 버전 (full access)

### AI 재현성의 특수 문제

일반 과학보다 AI 연구의 재현성이 어려운 이유:

**요인 1: Seed·난수**.
같은 코드로 같은 데이터를 같은 방법으로 학습해도 random seed에 따라 결과가 달라짐. 논문에 seed 명시가 필수.

**요인 2: Hardware**.
GPU 모델·CUDA 버전·부동소수점 정밀도에 따라 결과가 미세하게 다름. "우리 A100에서 재현" vs "본인의 3090에서 재현 안 됨" 문제.

**요인 3: Library 버전**.
PyTorch 2.0 vs 2.4의 미세한 차이, Transformers 라이브러리 버전별 동작 차이. Docker·Conda env 파일이 필수.

**요인 4: 학습 데이터 shuffling**.
데이터 로딩 순서가 결과에 영향. DataLoader의 seed도 고정 필요.

**요인 5: 외부 API 의존**.
OpenAI API·Google Gemini 같은 폐쇄 모델에 의존한 실험은 모델이 업데이트되면 재현 불가. GPT-3.5 기반 실험은 2024년 이후 공식 deprecate.

**실전 체크리스트 (AI 논문의 재현성)**:
- Seed 명시 (본문·부록)
- Python 버전·주요 라이브러리 버전 requirements.txt
- GPU 사양·CUDA 버전 명시
- Docker image 제공 (이상적)
- 학습 로그(W&B·TensorBoard) 공유
- 폐쇄 API 사용 시 정확한 모델 버전·호출 날짜

### 벤치마크 생태계의 이해

AI 분야의 "공용 실험대"가 되는 벤치마크:

- **Papers With Code**: 논문-코드-벤치마크 연결 플랫폼. 본인의 결과를 leaderboard에 등록하면 즉시 가시성.
- **BIG-bench**: LLM의 다양한 능력 평가 벤치마크 (200+ 태스크).
- **HELM (Stanford)**: 종합적 LLM 평가 프레임워크.
- **MMLU·MATH·HumanEval·ARC**: 특정 능력 벤치마크의 국제 표준.
- **한국어 벤치마크**: KLUE, KoBEST, KoMT-Bench 등.

박사 논문에서 본인의 방법을 적절한 벤치마크에 비교하는 것이 재현성·신뢰성의 기본. 새 벤치마크를 제안하는 것이 박사 논문의 강력한 기여.

### 한국 박사의 기여 경로

한국 박사가 AI 오픈 사이언스에 기여할 수 있는 고유한 경로:

**경로 1: 한국어 데이터셋·모델**.
한국어 NLP·멀티모달 모델의 공백이 있음. 본인의 박사가 한국어 자원에 기여하면 국제적 희소성.

**경로 2: 한국 산업 데이터의 공개**.
협력 기업과의 합의 하에 일부 산업 데이터의 익명화된 버전을 공개. 산업-학계 격차를 메움.

**경로 3: 한국어 벤치마크**.
KLUE·KoBEST 같은 벤치마크 기여. 한국어 AI의 품질 지표를 만드는 역할.

**경로 4: Multilingual·저자원 언어**.
한국어뿐 아니라 일본어·중국어 등 동아시아 언어의 자원에 기여. 서양 중심 AI 연구에 대한 균형.

**경로 5: 문화·사회 맥락의 데이터**.
서양 데이터에 기반한 AI가 한국 문화·사회를 잘 이해하지 못하는 문제. 한국 맥락의 데이터셋 구축.

### 오픈 사이언스의 직업적 비용과 이득

오픈 사이언스에 기여하는 것이 무조건 이득은 아님. 균형 잡힌 시각:

**이득**:
- 논문 인용 증가 (오픈 코드 있는 논문의 인용 수 1.5-2배)
- 국제 학자 네트워크 확장
- Hugging Face·GitHub stars·downloads라는 새로운 영향력 지표
- 학회·저널·임용 시장에서 "오픈 사이언스 실천자"로 인정
- 산업체 채용의 강력한 신호 (오픈 프로젝트 = 검증된 실력)

**비용**:
- 공개를 준비하는 시간 (논문 1편당 20-50시간 추가)
- 외부 문의·버그 리포트 대응 (공개 후 지속적 부담)
- 본인의 미공개 후속 연구 아이디어가 다른 팀에 선점될 위험
- 산업체 취업 시 IP 귀속 문제 (ch40 참조)

박사 연구의 일부만 오픈으로, 일부는 전통적 출판으로 하는 하이브리드가 현실적.

### 박사 단계별 오픈 사이언스 로드맵

- **박사 1-2년차**: Hugging Face·GitHub 계정 설정, 타인의 오픈 프로젝트에 기여 (PR·issue)
- **박사 3-4년차**: 본인의 첫 공개 프로젝트. 재현 가능한 코드 + 간단한 Model Card
- **박사 5-7년차**: 본인의 박사 논문을 오픈 사이언스 표준으로 출판. 모델·데이터·벤치마크 공개
- **박사 후**: 오픈 사이언스의 옹호자·커뮤니티 리더로 활동

### 마지막 — AI 시대에 오픈 사이언스는 선택이 아니라 전략이다

AI 분야에서 오픈 사이언스는 이제 "이상주의자의 선택"이 아니라 **분야의 기본 작동 방식**이다. 본인의 박사 연구가 오픈 생태계에 참여하지 않으면 분야의 속도를 따라가지 못하고, 영향력이 제한되고, 임용 시장의 경쟁에서 불리하다. 3가지 공개 층위·Hugging Face 활용·재현성 체크리스트·한국 박사의 기여 경로를 의식하고 박사 5-7년 동안 단계적으로 기여하면 박사 학위가 현대 AI 학계의 건강한 일원으로 졸업한다.

> AI 시대의 오픈 사이언스는 논문 출판 이후의 보너스가 아니라 분야의 기본 작동 방식이다. Open Weights·Open Source·Truly Open의 3층위, Hugging Face·Papers With Code의 생태계, AI 특유의 재현성 체크리스트를 박사 단계별로 점진적으로 실천하면, 박사 졸업 시점에 본인의 연구가 국제 AI 학계의 건강한 일원이 된다. 한국 박사는 한국어 자원·문화 맥락의 고유한 기여 경로를 가진다.
