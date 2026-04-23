# "최종_진짜최종_수정3.py"의 비극

대학원생의 컴퓨터 바탕화면에는 기묘한 파일명들이 존재한다. `simulation_final.py`, `simulation_final_v2.py`, `simulation_final_v2_수정.py`, `simulation_final_v2_수정_진짜최종.py`. 이 파일들 중 어떤 것이 논문에 사용된 결과를 생성하는 코드인지 아무도 모른다. 본인조차 모른다. 3개월 전의 내가 어떤 파일로 어떤 결과를 만들었는지, 그 사이에 무엇을 수정했는지, 왜 수정했는지를 기억하는 것은 불가능하다.

이것은 게으름의 문제가 아니다. 시스템의 부재 문제다. 코드의 변경 이력을 관리하는 시스템 없이, 인간의 기억력에 의존하는 것 자체가 설계 결함이다. 이 문제를 해결하는 것이 버전 관리(Version Control)이고, 그 가장 널리 쓰이는 도구가 Git이다.

이 장에서는 Git을 중심으로 한 버전 관리의 기초부터, 연구 데이터를 체계적으로 관리하는 방법, 그리고 "내 코드와 데이터를 잃어버리지 않는" 백업 전략까지 다룬다. 이 내용들은 화려하지 않지만, 대학원 생활에서 최소 한 번은 나를 구해줄 것이다.

---

## 왜 버전 관리가 필요한가

### 코드 날림 사고

대학원생의 악몽 시나리오를 상상해 보자. 시뮬레이션 코드를 수정하던 중 실수로 핵심 함수를 삭제했다. Ctrl+Z를 눌렀지만 이미 파일을 저장하고 닫은 뒤였다. 또는 "어제 버전이 더 나았는데" 싶어서 되돌리고 싶지만, 어제 버전이 어디에도 없다. 또는 노트북이 갑자기 꺼지면서 작업 중이던 코드가 날아갔다.

이런 사고는 생각보다 자주 일어난다. 그리고 발생하면 며칠에서 몇 주의 작업을 한순간에 잃게 된다. 버전 관리를 사용하면 이런 사고를 거의 완벽하게 방지할 수 있다. 모든 변경 이력이 저장되어 있으므로, 언제든 과거의 어떤 시점으로든 되돌아갈 수 있다.

### 실험 재현성

논문 리뷰어가 "Figure 5의 결과를 다른 조건에서도 확인해 달라"고 요청했다. 그런데 그 그림을 만든 코드가 어떤 버전이었는지 모른다. 최근에 코드를 여러 차례 수정했기 때문에, 현재 코드로 돌리면 다른 결과가 나온다. 당시 코드로 돌려야 하는데, 당시 코드가 없다.

버전 관리를 사용하면 "이 논문의 Figure 5는 커밋 abc123 버전에서 생성되었다"고 기록할 수 있다. 필요하면 그 시점의 코드를 정확히 복원할 수 있다. 연구의 재현 가능성은 과학의 근본이고, 버전 관리는 그것을 가능하게 하는 실질적 도구다.

### 협업

연구실에서 한 프로젝트를 여러 사람이 함께 진행하는 경우가 있다. 선배가 시작한 코드를 내가 이어받거나, 동기와 함께 하나의 시뮬레이션 프레임워크를 개발하거나. 이때 파일을 이메일로 주고받거나 카카오톡으로 공유하는 것은 재앙의 시작이다. 누가 어떤 부분을 수정했는지, 두 사람이 같은 파일을 동시에 수정하면 어떻게 합치는지, 충돌이 생기면 어떻게 해결하는지, 이 모든 것은 버전 관리 없이는 불가능한 문제들이다.

---

## Git 기초

Git은 분산 버전 관리 시스템(Distributed Version Control System)이다. 2005년 리누스 토르발즈(리눅스 창시자)가 만들었다. 전 세계 소프트웨어 프로젝트의 대부분이 Git으로 관리되고 있으며, 연구 커뮤니티에서도 사실상의 표준이다.

Git의 핵심 개념을 비유로 설명하겠다. Git을 사진첩이라고 생각하면 이해가 쉽다.

### 핵심 명령어

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📁</div>
    <div class="pipeline-step-title">git init</div>
    <div class="pipeline-step-desc">새 사진첩을 만든다. 프로젝트 폴더에서 버전 관리를 시작한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📸</div>
    <div class="pipeline-step-title">git add</div>
    <div class="pipeline-step-desc">사진을 찍을 대상을 선택한다. 변경된 파일 중 기록할 것을 지정한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">💾</div>
    <div class="pipeline-step-title">git commit</div>
    <div class="pipeline-step-desc">사진을 찍어 사진첩에 붙인다. 변경 사항을 확정하고 기록한다.</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">☁️</div>
    <div class="pipeline-step-title">git push</div>
    <div class="pipeline-step-desc">사진첩을 클라우드에 업로드한다. 원격 저장소에 반영한다.</div>
  </div>
</div>

**git init**: 프로젝트 폴더에서 Git 버전 관리를 시작하는 명령어다. 이 명령을 실행하면 `.git`이라는 숨겨진 폴더가 생기고, Git이 이 폴더의 모든 변경 사항을 추적하기 시작한다. 프로젝트의 시작점에서 한 번만 실행하면 된다.

**git add**: 변경된 파일 중 "이번 기록에 포함시킬 파일"을 선택하는 단계다. 스테이징(staging)이라고 부른다. `git add simulation.py`는 simulation.py 파일을 스테이징에 올리고, `git add .`는 변경된 모든 파일을 올린다. 사진을 찍기 전에 "이 사진에 넣을 사람들 모여라" 하는 것과 같다.

**git commit**: 스테이징된 파일들의 현재 상태를 "스냅샷"으로 기록하는 것이다. `git commit -m "메쉬 수렴성 연구 코드 추가"`처럼 메시지와 함께 기록한다. 이 스냅샷에는 시간, 작성자, 변경 내용, 메시지가 모두 포함된다. 나중에 이 시점으로 정확하게 되돌아올 수 있다.

**git push**: 로컬(내 컴퓨터)에 있는 커밋들을 원격 저장소(GitHub, GitLab 등)로 업로드하는 것이다. push를 해야 다른 사람도 내 변경 사항을 볼 수 있고, 클라우드에 백업이 된다.

**git pull**: 원격 저장소의 최신 변경 사항을 내 로컬로 가져오는 것이다. 다른 사람이 push한 내용을 내 컴퓨터에 반영한다.

**git status**: 현재 상태를 확인한다. 어떤 파일이 수정되었는지, 스테이징되었는지, 커밋되지 않은 변경이 있는지를 보여준다. 가장 자주 쓰는 명령어 중 하나다.

**git log**: 커밋 이력을 본다. 언제, 누가, 무엇을 변경했는지의 전체 기록이 시간 역순으로 표시된다.

### 커밋 메시지 작성법

커밋 메시지는 "이번에 무엇을 왜 변경했는가"를 설명하는 한 줄(또는 짧은 글)이다. 좋은 커밋 메시지는 6개월 후에 이력을 볼 때 코드를 열어보지 않아도 무엇을 했는지 이해할 수 있게 해준다.

<div class="do-dont">
  <div class="do-box">
    <h4>✅ 좋은 커밋 메시지</h4>
    <ul>
      <li>fix: 경계 조건 적용 순서 오류 수정</li>
      <li>feat: 메쉬 수렴성 자동 검사 기능 추가</li>
      <li>refactor: 데이터 로딩 함수를 별도 모듈로 분리</li>
      <li>docs: README에 실행 방법 추가</li>
      <li>exp: 학습률 0.001로 재실험, Figure 3 업데이트</li>
    </ul>
  </div>
  <div class="dont-box">
    <h4>❌ 나쁜 커밋 메시지</h4>
    <ul>
      <li>수정</li>
      <li>fix</li>
      <li>업데이트</li>
      <li>ㅎㅎ</li>
      <li>asdfg</li>
    </ul>
  </div>
</div>

커밋은 하나의 논리적 변경 단위로 하는 것이 좋다. "경계 조건 수정 + 그래프 색상 변경 + README 업데이트"를 하나의 커밋에 몰아넣지 말고, 각각 별도의 커밋으로 나누는 것이 이상적이다. 나중에 "경계 조건 수정만 되돌리고 싶다"면, 커밋이 분리되어 있어야 가능하다.

---

## Git 실전 워크플로우

### 혼자 쓸 때

대부분의 대학원생은 Git을 혼자 쓴다. 이 경우 복잡한 브랜치 전략이 필요 없다. main 브랜치 하나에서 작업하고, 의미 있는 변경이 있을 때마다 커밋하고, 주기적으로 GitHub에 push하면 된다.

일상적인 워크플로우는 다음과 같다. 아침에 코드를 수정한다. 의미 있는 변경이 완료되면 `git add .` → `git commit -m "설명"` → `git push`. 이것을 하루에 2-5번 정도 반복한다. 점심 전에 한 번, 퇴근 전에 한 번은 최소한으로 하는 것이 좋다. push를 해야 원격에 백업이 되니까.

### 팀으로 쓸 때: 브랜치 전략

여러 사람이 하나의 저장소에서 작업한다면, 브랜치(branch)를 활용해야 한다. 브랜치는 "평행 세계"다. main 브랜치는 항상 안정적인 상태를 유지하고, 새로운 기능이나 실험은 별도의 브랜치에서 작업한다.

가장 간단한 전략은 **main + feature 브랜치**다. main은 항상 동작하는 코드가 있는 안정적인 브랜치다. 새로운 기능을 개발할 때는 `git checkout -b feature/mesh-convergence`처럼 feature 브랜치를 만들어서 작업한다. 작업이 완료되면 main에 합친다(merge).

```
main ──●──●──●──────────●──●──
              \        /
feature/mesh   ●──●──●
```

이 방식의 장점은 main이 항상 깨끗하게 유지된다는 것이다. feature 브랜치에서 아무리 실험적인 코드를 작성해도, main에 합치기 전까지는 main에 영향을 주지 않는다.

### 충돌 해결

두 사람이 같은 파일의 같은 부분을 동시에 수정하면 충돌(conflict)이 발생한다. 처음 만나면 당황하지만, 원리는 간단하다. Git이 "이 부분은 두 가지 버전이 있는데, 어느 것을 쓸지 니가 정해라"라고 알려주는 것이다.

충돌이 발생하면 해당 파일에 다음과 같은 표시가 나타난다.

```
<<<<<<< HEAD
내가 수정한 내용
=======
다른 사람이 수정한 내용
>>>>>>> feature-branch
```

이 부분을 직접 편집해서 원하는 내용으로 수정하고, 충돌 표시(`<<<<`, `====`, `>>>>`)를 삭제한 뒤 다시 커밋하면 된다. VS Code는 충돌을 시각적으로 표시하고, "Accept Current / Accept Incoming / Accept Both" 버튼을 제공해서 편리하게 해결할 수 있다.

충돌이 무서워서 Git을 안 쓰겠다는 사람들이 있다. 충돌은 무서운 것이 아니다. Git이 없었다면 두 사람이 같은 파일을 동시에 수정했을 때, 한 사람의 작업이 통째로 덮어씌워져 사라졌을 것이다. 충돌 알림이 있어서 오히려 안전한 것이다.

---

## GitHub 활용

GitHub는 Git 저장소를 호스팅하는 웹 플랫폼이다. Git이 버전 관리 도구라면, GitHub는 그 도구를 클라우드에서 사용하고, 다른 사람과 공유할 수 있게 해주는 서비스다. 학생 계정으로 가입하면 무료로 비공개(Private) 저장소를 무제한 만들 수 있다.

### 저장소 공개/비공개

연구 진행 중에는 비공개(Private) 저장소를 사용한다. 미발표 연구 코드가 공개되면 곤란하다. 논문이 게재된 후, 코드를 공개(Public)로 전환하면 된다. 최근 많은 학술지가 "코드 공개"를 장려하거나 요구하고 있다. 논문과 함께 코드를 GitHub에 공개하면 연구의 투명성과 재현 가능성이 높아지고, 인용 수가 증가한다는 연구 결과도 있다.

### README 작성

GitHub 저장소의 첫 인상은 README다. 논문과 함께 코드를 공개할 때, README에 다음 항목들을 포함해야 한다. 프로젝트 설명(한 문단), 논문 인용 정보, 설치 방법, 실행 방법, 데이터 다운로드 방법, 결과 재현 방법. 이것만 있으면 다른 연구자가 내 코드를 사용할 수 있다.

### 논문과 함께 코드 공개하기

논문의 재현성을 높이기 위해 코드를 공개하는 것은 점점 더 보편화되고 있다. 코드를 공개할 때의 실용적 팁을 정리한다.

코드를 정리한다. 연구 중에 쌓인 임시 파일, 테스트 코드, 개인 메모를 제거한다. "돌아가기만 하면 된다" 수준이 아니라, 최소한 다른 사람이 실행할 수 있는 수준으로 정리한다. 단, 완벽할 필요는 없다. 완벽한 코드를 만들려고 공개를 미루는 것보다, 조금 지저분하더라도 공개하는 것이 더 가치 있다.

Zenodo와 연동하면 코드에 DOI(Digital Object Identifier)를 발급받을 수 있다. DOI가 있으면 논문에서 정식으로 인용 가능한 형태로 코드를 참조할 수 있다. GitHub → Zenodo 연동은 몇 번의 클릭으로 설정할 수 있다.

---

## 연구 데이터 관리

코드 못지않게 중요한 것이 데이터 관리다. 실험 데이터, 시뮬레이션 결과, 전처리된 데이터, 최종 분석 결과, 이 모든 것이 체계적으로 관리되어야 한다.

### 폴더 구조 표준화

프로젝트를 시작할 때 폴더 구조를 먼저 만들어야 한다. 구조는 간결하고 일관되어야 한다. 다음은 추천하는 기본 구조다.

```
my_project/
├── data/
│   ├── raw/           # 원본 데이터 (절대 수정하지 않는다)
│   ├── processed/     # 전처리된 데이터
│   └── external/      # 외부에서 가져온 데이터
├── src/               # 소스 코드
├── notebooks/         # Jupyter 노트북 (탐색적 분석)
├── results/           # 실험 결과 (그래프, 수치)
├── docs/              # 문서
├── README.md
├── requirements.txt
└── .gitignore
```

이 구조의 핵심 원칙은 **raw 데이터와 코드의 분리**, 그리고 **원본 데이터 불변 원칙**이다.

### 원본 데이터 불변 원칙

이것은 아무리 강조해도 부족하지 않다. **raw 데이터는 절대, 어떤 이유로든, 수정하지 않는다.** 원본 데이터를 직접 편집해서 이상치를 제거하거나, 단위를 변환하거나, 형식을 바꾸지 않는다. 모든 전처리는 코드로 수행하고, 결과를 processed 폴더에 저장한다.

왜? 원본을 수정하면 되돌릴 수 없기 때문이다. "이 데이터의 원래 값이 뭐였지?" "이상치를 제거하기 전의 데이터를 다시 분석하고 싶은데?" 이런 상황이 반드시 온다. 원본이 보존되어 있으면 언제든 처음부터 다시 처리할 수 있다. 원본이 수정되어 있으면 끝이다.

<div class="highlight-box warning">
<span class="highlight-box-icon">⚠️</span>
<div class="highlight-box-content">
<p><strong>raw 데이터에 손대지 마라</strong></p>
<p>실험실에서 측정 장비가 내보낸 파일, 외부 기관에서 제공받은 데이터셋, 웹에서 다운로드한 공개 데이터, 이것들은 <code>data/raw/</code>에 넣고 읽기 전용(read-only)으로 설정해라. 전처리가 필요하면 코드를 작성해서 <code>data/processed/</code>에 결과를 저장한다. 전처리 코드가 곧 전처리의 기록이 된다. 엑셀에서 수작업으로 데이터를 수정하는 순간, 그 수정의 기록은 사라진다.</p>
</div>
</div>

### 파일 명명 규칙

파일명은 정보를 담아야 한다. 다음 원칙을 따른다.

**날짜를 포함한다.** YYYY-MM-DD 형식을 쓴다. `2025-03-15_experiment_results.csv`처럼. 이렇게 하면 파일 탐색기에서 자동으로 시간순 정렬이 된다. MM-DD-YYYY나 DD/MM/YYYY는 정렬이 깨지므로 피한다.

**의미 있는 이름을 쓴다.** `data1.csv`가 아니라 `tensile_test_specimen_A_25C.csv`. 어떤 실험인지, 어떤 조건인지가 파일명에 드러나야 한다.

**공백과 특수문자를 피한다.** 공백 대신 밑줄(_) 또는 하이픈(-)을 쓴다. 한글 파일명은 호환성 문제가 있을 수 있으므로 영문을 권장한다.

**버전 번호를 쓰지 않는다.** `report_v1.docx`, `report_v2.docx` 같은 방식은 불필요하다. 이것은 Git이 해결해 줄 일이다. 파일명에 버전을 달기 시작하면, 앞서 말한 "최종_진짜최종" 지옥으로 돌아간다.

### 메타데이터 기록

데이터만으로는 정보가 불완전하다. 이 데이터가 언제, 어떤 조건에서, 어떤 장비로, 누구에 의해 수집되었는지를 기록해야 한다. 이것이 메타데이터(metadata)다.

가장 간단한 방법은 각 데이터 폴더에 `README.txt` 또는 `metadata.json`을 넣어두는 것이다. 아래는 바로 복사해서 쓸 수 있는 `metadata.json` 템플릿이다.

```json
{
  "experiment_date": "2025-03-15",
  "experimenter": "홍길동",
  "equipment": "Instron 5982 (S/N: 12345)",
  "conditions": {
    "temperature_C": 25,
    "humidity_pct": 50
  },
  "sample": {
    "material": "CFRP",
    "dimensions_mm": [250, 25, 1.5],
    "count": 5
  },
  "notes": "시편 3번은 그립 슬립 발생, 분석에서 제외"
}
```

실험 날짜, 실험자, 장비 세팅, 환경 조건(온도, 습도), 샘플 정보 등을 기록한다. 당장은 귀찮지만, 6개월 후 "이 데이터의 시편 크기가 뭐였지?" 할 때 감사하게 될 것이다.

---

## .gitignore: Git이 무시해야 할 것들

Git으로 모든 파일을 추적할 필요는 없다. 오히려 추적하면 안 되는 파일들이 있다. 대용량 데이터 파일(수 GB짜리 시뮬레이션 결과), 임시 파일(`__pycache__/`, `.ipynb_checkpoints/`), 비밀 정보(API 키), OS 생성 파일(`.DS_Store`, `Thumbs.db`) 등이다.

`.gitignore` 파일에 이런 파일들의 패턴을 적어두면 Git이 자동으로 무시한다. 프로젝트를 시작할 때 `.gitignore`를 먼저 만드는 습관을 들이자. GitHub에서 언어별 `.gitignore` 템플릿을 제공하니 참고하면 된다.

```
# Python
__pycache__/
*.pyc
.ipynb_checkpoints/

# Data (대용량 데이터는 Git에 넣지 않는다)
data/raw/
*.h5
*.hdf5

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# 환경
.env
*.log
```

대용량 데이터 파일은 Git에 넣으면 안 된다. Git은 텍스트 파일의 변경 이력을 추적하는 데 최적화되어 있다. 수 GB짜리 바이너리 파일을 커밋하면 저장소가 비대해지고, clone과 push/pull이 극도로 느려진다. 대용량 데이터는 별도의 저장소(Google Drive, NAS, AWS S3 등)에 보관하고, 경로나 다운로드 방법을 README에 기록하는 것이 올바른 방법이다.

---

## 백업 전략

"백업이 필요하다"는 것은 누구나 안다. 하지만 실제로 체계적으로 백업하는 사람은 소수다. 대부분 노트북 하드디스크 하나에 모든 것이 있다. 그 하드디스크가 고장나면? 노트북을 분실하면? 랜섬웨어에 감염되면? 대학원 2-3년의 연구 결과가 한순간에 사라진다.

### 3-2-1 규칙

데이터 백업의 황금률이다.

<div class="card-grid">
  <div class="card">
    <span class="card-icon">3️⃣</span>
    <div class="card-title">3개의 사본</div>
    <div class="card-desc">데이터의 총 사본이 3개 이상 있어야 한다. 원본 1개 + 백업 2개. 하나가 손실되어도 나머지 2개가 안전망이 된다.</div>
  </div>
  <div class="card">
    <span class="card-icon">2️⃣</span>
    <div class="card-title">2가지 매체</div>
    <div class="card-desc">서로 다른 종류의 저장 매체를 사용한다. 내장 SSD + 외장하드, 또는 SSD + 클라우드. 같은 종류의 매체는 같은 원인으로 동시에 고장날 수 있다.</div>
  </div>
  <div class="card">
    <span class="card-icon">1️⃣</span>
    <div class="card-title">1개의 오프사이트</div>
    <div class="card-desc">최소 1개의 백업은 물리적으로 다른 장소에 있어야 한다. 화재, 도난, 자연재해에 대비한다. 클라우드 저장소가 가장 쉬운 오프사이트 백업이다.</div>
  </div>
</div>

### 실용적 백업 조합

대학원생에게 현실적으로 가능한 백업 조합을 제안한다.

**코드**: GitHub에 push하면 자동으로 클라우드 백업이 된다. 이것이 Git을 쓰는 부수적 이점이다. 코드는 용량이 작으므로, 무료 GitHub 계정으로도 충분하다.

**데이터**: 클라우드(Google Drive 15GB 무료, 학교 구글 워크스페이스는 더 많이 제공하는 경우가 있다)와 외장하드를 병행한다. 중요한 원본 데이터는 반드시 2곳 이상에 복사한다.

**논문/문서**: Overleaf를 쓰면 자동으로 클라우드에 저장된다. Word 파일은 OneDrive나 Google Drive에 동기화한다.

**연구실 NAS**: 연구실에 NAS(Network Attached Storage)가 있다면 적극 활용한다. NAS는 RAID 구성으로 디스크 하나가 고장나도 데이터가 보존되는 구조다.

핵심은 **자동화**다. 수동으로 백업하면 결국 잊어버린다. 클라우드 동기화를 설정해두면 자동으로 백업된다. Git push를 습관화하면 코드 백업이 자동이 된다. "나중에 백업해야지"가 아니라, 작업 과정 자체에 백업이 내장되도록 시스템을 설계해야 한다.

<div class="highlight-box tip">
<span class="highlight-box-icon">💡</span>
<div class="highlight-box-content">
<p><strong>최소한의 백업 자동화</strong></p>
<p>1. 코드: Git + GitHub (push 습관화) → 2. 문서: Google Drive 또는 OneDrive 동기화 → 3. 데이터: 주 1회 외장하드 백업 + 클라우드 동기화. 이 세 가지만 해도 "모든 것을 잃는" 상황은 거의 방지할 수 있다. 백업은 재난이 터진 후에는 소용없다. 지금 당장 설정하라.</p>
</div>
</div>

---

## 재현성 체크리스트

이 장의 내용을 모두 종합하면, 결국 **재현성(Reproducibility)**이라는 하나의 목표로 수렴한다. 내 연구 결과를 내가, 또는 다른 사람이, 6개월 후에도 정확히 재현할 수 있는가. 이것이 모든 관리의 궁극적 이유다.

논문을 제출하기 전에, 다음 체크리스트를 확인하라.

<div class="check-list">
  <label><input type="checkbox"> 코드가 버전 관리(Git)되고 있는가?</label>
  <label><input type="checkbox"> 논문의 각 Figure/Table을 생성하는 코드가 특정 커밋과 연결되어 있는가?</label>
  <label><input type="checkbox"> 랜덤 시드가 코드에 고정되어 있는가?</label>
  <label><input type="checkbox"> 패키지/라이브러리 버전이 기록되어 있는가? (requirements.txt / environment.yml)</label>
  <label><input type="checkbox"> 원본 데이터가 보존되어 있는가? (전처리 전 상태)</label>
  <label><input type="checkbox"> 데이터 전처리 과정이 코드로 기록되어 있는가? (수작업 없이 재현 가능)</label>
  <label><input type="checkbox"> 데이터 분할(train/val/test)이 코드에 기록되어 있는가?</label>
  <label><input type="checkbox"> 실험 설정(하이퍼파라미터, 조건 등)이 파일로 기록되어 있는가?</label>
  <label><input type="checkbox"> README에 실행 방법이 적혀 있는가?</label>
  <label><input type="checkbox"> 백업이 2곳 이상에 있는가?</label>
</div>

완벽할 필요는 없다. 하지만 이 체크리스트의 항목 중 대부분을 충족하면, 연구의 신뢰성이 크게 높아진다. 리뷰어가 "결과를 재현해 봤는데 안 됩니다"라고 했을 때, 자신 있게 대응할 수 있는 연구자가 되어야 한다.

---

## Git을 시작하는 가장 쉬운 방법

이 장을 읽고 "Git을 시작해야겠다"는 생각이 들었다면, 지금 당장 실행할 수 있는 가장 간단한 방법을 알려주겠다.

오늘 당장 아래 다섯 단계를 순서대로 실행하면, 30분 안에 Git을 시작할 수 있다.

1. github.com에 가입한다 (학교 이메일로 가입하면 GitHub Education 학생 혜택을 받을 수 있다).
2. GitHub Desktop을 설치한다 (desktop.github.com).
3. GitHub Desktop에서 "Create a New Repository"를 클릭하고 자기 연구 프로젝트 이름을 입력한다.
4. 연구 프로젝트 폴더 안의 코드 파일을 한 개 이상 넣고, "Commit to main" 버튼을 클릭한다.
5. "Push origin" 버튼을 클릭하여 GitHub 클라우드에 백업한다.

GitHub Desktop은 Git의 GUI 클라이언트로, 명령어를 모르는 상태에서도 Git을 사용할 수 있게 해준다. 버튼 클릭으로 commit, push, pull이 가능하다.

명령어가 익숙해지면 터미널에서 직접 Git을 사용하는 것이 더 효율적이지만, 처음에는 GitHub Desktop으로 시작하는 것을 추천한다. 중요한 것은 도구가 아니라 습관이다. 매일 코드를 커밋하고 push하는 습관만 들이면, 나머지는 자연스럽게 따라온다.

버전 관리와 데이터 관리는 연구의 "보이지 않는 인프라"다. 논문에 드러나지 않고, 학회에서 발표하지 않고, 교수님이 직접 가르쳐 주지도 않는다. 하지만 이 인프라가 무너지면 연구 전체가 무너진다. 하드디스크가 고장 나서 3개월의 작업을 잃은 경험, 코드를 잘못 수정해서 이전 결과를 재현할 수 없게 된 경험. 이런 경험을 한 사람만이 이 장의 가치를 절실히 안다. 그 경험을 하기 전에 시스템을 갖추는 것이 현명한 선택이다.

---

## 대용량 파일 관리: Git-LFS

연구를 진행하다 보면 코드뿐만 아니라 모델 가중치, 시뮬레이션 결과, 학습 데이터 같은 대용량 파일을 버전 관리하고 싶어진다. 그런데 Git은 대용량 바이너리 파일에 적합하지 않다. 100MB가 넘는 파일은 GitHub이 아예 거부하고, 그보다 작은 파일이라도 여러 번 수정되면 저장소가 급격히 비대해진다. 이 문제를 해결하는 것이 **Git-LFS(Large File Storage)**다.

<div class="highlight-box info">
  <span class="highlight-box-icon">ℹ️</span>
  <div class="highlight-box-content">
    <p><strong>Git-LFS의 작동 원리</strong></p>
    <p>Git-LFS는 대용량 파일 자체를 Git 저장소에 넣는 대신, 작은 "포인터 파일"만 저장하고 실제 파일은 별도의 LFS 서버에 보관한다. 사용자가 clone하거나 pull할 때 필요한 파일만 LFS 서버에서 다운로드된다. 결과적으로 Git 저장소는 가벼워지고, 대용량 파일의 버전도 추적할 수 있다.</p>
  </div>
</div>

**언제 Git-LFS가 필요한가.** 첫째, 학습된 ML 모델 가중치(`.pth`, `.h5`, `.pt`, `.ckpt` 파일, 보통 수십 MB~수 GB)를 저장할 때. 둘째, 시뮬레이션 결과 파일(`.vtk`, `.cgns`, `.h5`, 수백 MB)을 추적할 때. 셋째, 학습 데이터셋 파일(`.csv`, `.npz`, `.parquet`, 수십 MB 이상)을 함께 관리할 때. 넷째, 논문용 고해상도 그림 원본(`.tiff`, `.psd`, 수십 MB)을 추적할 때.

**Git-LFS 설치와 사용법.**

```bash
# 1. Git-LFS 설치 (한 번만)
brew install git-lfs        # macOS
sudo apt install git-lfs    # Ubuntu

# 2. 저장소에 LFS 활성화 (저장소당 한 번)
cd my-research-repo
git lfs install

# 3. 추적할 파일 패턴 지정
git lfs track "*.pth"
git lfs track "*.h5"
git lfs track "models/*.ckpt"

# 4. .gitattributes 파일이 자동 생성됨 - 이 파일도 커밋
git add .gitattributes
git commit -m "Track large files with LFS"

# 5. 이후로는 평소대로 사용
git add models/best_model.pth
git commit -m "Add trained model checkpoint"
git push
```

**Git-LFS의 한계와 주의점.** GitHub의 무료 LFS 할당량은 1GB 저장소와 월 1GB 대역폭이다. 이를 초과하면 유료 플랜으로 업그레이드해야 한다. 대학원생 연구실 단위로는 유료 결제가 부담스러울 수 있다. 대안으로는 GitLab(무료 LFS 10GB 제공), Hugging Face Hub(모델 저장소로 무료), Zenodo(대용량 파일을 DOI와 함께 영구 보관, 50GB까지 무료)가 있다. 진짜 대용량(수 GB 이상)이라면 ch38에서 다룬 Zenodo가 더 적합한 선택지다.

**대용량 파일을 Git에 잘못 커밋했을 때.** 실수로 100MB가 넘는 파일을 커밋하면, GitHub push가 실패한다. 단순히 그 파일을 삭제하고 다시 커밋해도 문제가 해결되지 않는다. Git history에 그 파일이 남아 있기 때문이다. `git filter-repo` 또는 `BFG Repo-Cleaner`로 history에서 그 파일을 완전히 제거해야 한다. 이 작업은 위험하므로(전체 history가 다시 쓰여진다), 백업 후 신중하게 진행하고, 팀 협업 중이면 모든 협력자에게 알려야 한다.

---

## Git 고급 기법: 필요할 때만 쓰는 도구들

기본 명령어(`add`, `commit`, `push`, `pull`)만으로도 99%의 연구 작업은 충분하다. 하지만 특정 상황에서는 고급 기법이 큰 도움이 된다. 모두 외울 필요는 없고, "이런 기능이 있다"는 것만 알아두면 필요할 때 검색해서 쓸 수 있다.

**`git stash`: 임시 보관함.** 한창 새 기능을 작성 중인데 갑자기 main 브랜치의 버그를 고쳐야 하는 상황을 생각해 보자. 작업을 커밋하기엔 미완성이고, 그냥 두기엔 브랜치를 바꿀 수 없다. 이때 `git stash`는 현재 변경사항을 임시 보관함에 넣어두고 작업 디렉토리를 깨끗하게 만든다.

```bash
git stash                    # 현재 변경사항 임시 저장
git checkout main            # 다른 브랜치로 이동
# 버그 수정 작업...
git checkout feature-branch  # 원래 브랜치로 복귀
git stash pop                # 임시 저장한 변경사항 복원
```

**`git rebase`: 커밋 히스토리 정리.** 여러 번의 작은 커밋(`fix typo`, `update`, `another fix`)을 하나의 깔끔한 커밋으로 합치고 싶을 때 `git rebase -i`를 쓴다. 다만 이 명령은 history를 다시 쓰므로, **이미 push한 커밋에는 절대 사용하지 않는다**. 협업 중인 브랜치를 rebase하면 다른 사람의 작업이 망가질 수 있다.

```bash
# 최근 5개 커밋을 인터랙티브 rebase
git rebase -i HEAD~5
# 에디터가 열리면 'pick'을 'squash'로 바꿔 커밋을 합칠 수 있다
```

**`git cherry-pick`: 특정 커밋만 가져오기.** 다른 브랜치에서 특정 커밋 하나만 가져오고 싶을 때 사용한다. 예를 들어, `experiment-2` 브랜치에서 작성한 데이터 처리 함수만 `main`으로 가져오고 싶을 때.

```bash
git checkout main
git cherry-pick a3f5b2c    # 특정 커밋 해시만 가져옴
```

**`git bisect`: 버그가 언제 들어갔는지 찾기.** "어제까지는 잘 되던 코드가 오늘은 안 된다"는 상황에서, 이진 탐색으로 어느 커밋이 버그를 도입했는지 찾는다.

```bash
git bisect start
git bisect bad                  # 현재 커밋이 문제 있음
git bisect good a3f5b2c         # 이 커밋은 정상이었음
# Git이 중간 커밋으로 자동 이동, 사용자가 good/bad 표시
```

**`git reflog`: 잃어버린 커밋 복구.** `git reset --hard`로 실수로 커밋을 날려버렸다면, `git reflog`로 모든 HEAD 이동 기록을 볼 수 있다. 여기서 잃어버린 커밋의 해시를 찾아 `git checkout`이나 `git reset`으로 복구한다. **Git에서 진짜로 영구히 사라지는 것은 거의 없다. reflog가 90일간 모든 이동을 기록한다.**

---

## 의존성 관리: 환경 재현의 핵심

코드와 데이터를 잘 관리해도, 코드가 의존하는 라이브러리 버전이 다르면 실행되지 않거나 다른 결과가 나온다. ch15에서 가상환경의 필요성을 다뤘고, ch23에서 ML 파이프라인의 재현성을 다뤘다면, 여기서는 **의존성을 어떻게 기록하고 공유할 것인가**를 자세히 본다.

**`requirements.txt`: 가장 기본적인 방법.** Python에서 가장 흔히 쓰는 의존성 명세 파일이다. `pip freeze > requirements.txt`로 현재 환경의 모든 패키지를 기록한다.

```
numpy==1.24.3
pandas==2.0.1
scikit-learn==1.2.2
torch==2.0.1
```

문제는 `pip freeze`가 의존성의 의존성까지 모두 기록하므로 100줄이 넘기 일쑤이고, 어떤 패키지가 직접 설치한 것이고 어떤 것이 자동으로 따라온 것인지 구분이 안 된다는 것이다.

**`environment.yml`: Conda 환경 명세.** Conda를 쓴다면 `conda env export > environment.yml`로 환경을 통째로 저장한다. 장점은 Python 버전과 비-Python 패키지(예: CUDA, MKL, HDF5)도 함께 기록된다는 것이다. 단점은 OS별로 호환이 안 될 수 있다(macOS에서 export한 environment.yml이 Linux에서 그대로 작동하지 않을 수 있다).

```yaml
name: my-research
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.10
  - numpy=1.24
  - pandas=2.0
  - pytorch=2.0
  - pip
  - pip:
    - some-pip-only-package==1.2.3
```

**`pyproject.toml` + lock 파일: 현대적인 방법.** Poetry, PDM, uv 같은 현대 Python 패키지 관리자는 `pyproject.toml`에 직접 설치한 의존성만 기록하고, 별도의 `poetry.lock` 또는 `uv.lock` 파일에 정확한 버전 트리를 기록한다. 두 파일을 모두 커밋하면 다른 사람이 정확히 같은 환경을 재현할 수 있다.

**Docker: 궁극의 재현성.** 환경 재현이 정말 중요하다면(예: 논문 부록으로 코드 공개) Docker 컨테이너를 만든다. `Dockerfile`에 OS, Python 버전, 시스템 라이브러리, Python 패키지를 모두 명시하면, 누구든 `docker run`만으로 정확히 같은 환경을 띄울 수 있다. 학습 곡선이 있지만, 재현성 보장 측면에서는 가장 강력하다.

**실전 추천.** 일반적인 연구 프로젝트에는 `requirements.txt` 또는 `environment.yml`로 충분하다. 논문 코드를 공개하거나 리비전에서 재현성 요구를 받으면 그때 Docker나 lock 파일까지 도입한다. 처음부터 모든 도구를 갖추려 하지 말고, 필요해진 시점에 도입한다. 그래야 도구가 짐이 되지 않는다.

---

## 비밀정보 관리: 절대 Git에 올리면 안 되는 것들

연구 코드를 Git으로 관리하다 보면 "실수로 올리면 안 되는 것"을 올리는 사고가 반드시 한 번은 일어난다. 개인 컴퓨터에서 혼자 쓰는 코드라면 문제가 없지만, GitHub에 공개 저장소로 푸시하면 그 정보는 인터넷에 영구히 공개된 것으로 간주해야 한다. Git 히스토리에서 파일을 지운다고 해도, 이미 다른 사람이 복제했거나 검색 엔진이 색인했을 가능성을 배제할 수 없다.

<div class="highlight-box highlight-warning">

**한 번 푸시되면 되돌릴 수 없다.** GitHub에 공개 저장소로 올라간 파일은 수초 내에 자동 크롤러가 스캔한다. API 키가 들어 있으면 해커 봇이 수분 내로 악용을 시작한다. "급하게 지웠으니까 괜찮겠지"라는 생각은 위험하다. 사고가 났다면 키를 즉시 폐기하고 재발급해야 한다.

</div>

**절대 올리면 안 되는 것들의 목록.**

- **API 키와 토큰**: OpenAI API 키, Google Cloud credentials, AWS access key, GitHub personal access token, Slack webhook URL 등. 월 수백만 원이 과금될 수 있다.
- **데이터베이스 접속 정보**: 호스트, 사용자명, 비밀번호, 포트. 특히 학교 DB나 공동 연구 DB의 자격 증명.
- **SSH 개인키(`id_rsa`, `id_ed25519` 등)**: 한 번 노출되면 접속 가능한 모든 서버가 위험해진다.
- **이메일 계정 비밀번호와 앱 비밀번호**: 실험 알림 이메일 자동화 코드에 하드코딩하는 경우가 많다.
- **개인정보가 포함된 데이터**: 실험 참가자 이름, 이메일, 학번, 의료 정보 등. IRB 규정 위반이 될 수 있다.
- **라이선스 파일**: ANSYS, COMSOL, MATLAB 등 상용 소프트웨어의 라이선스 파일은 연구실 소유물이고 공개 시 계약 위반이다.
- **산학과제 기밀 데이터**: 기업이 제공한 도면, 실험 데이터, 설계 정보. 비밀유지협약(NDA) 위반이 될 수 있다.
- **미공개 논문 원고**: 프리프린트로 공개하기 전에 GitHub 공개 저장소에 올리면 "이중 공개" 문제가 생길 수 있다.

**안전한 관리 방법 1: 환경변수.** 민감 정보는 코드가 아니라 환경변수로 관리한다.

```python
# 나쁜 예: 키가 코드에 하드코딩됨
openai.api_key = "sk-proj-abcdef123456..."

# 좋은 예: 환경변수에서 읽기
import os
openai.api_key = os.environ["OPENAI_API_KEY"]
```

실행 시에는 쉘에서 환경변수를 설정한다. `export OPENAI_API_KEY=sk-...` 후 코드를 실행한다. 또는 `~/.zshrc`나 `~/.bashrc`에 넣어 두면 새 터미널마다 자동으로 설정된다.

**안전한 관리 방법 2: `.env` 파일 + `python-dotenv`.** 환경변수를 매번 쉘에서 설정하는 것이 번거롭다면, 프로젝트 루트에 `.env` 파일을 만든다.

```
OPENAI_API_KEY=sk-proj-abcdef123456...
DB_PASSWORD=mysecretpass
```

그리고 반드시 `.gitignore`에 `.env`를 추가한다. Python에서는 `python-dotenv` 라이브러리로 자동 로드한다.

```python
from dotenv import load_dotenv
load_dotenv()
api_key = os.environ["OPENAI_API_KEY"]
```

`.env` 대신 `config/local.yaml` 같은 이름도 쓸 수 있다. 중요한 것은 이름이 무엇이든 `.gitignore`에 포함시키는 것이다.

**안전한 관리 방법 3: `.env.example` 템플릿.** 다른 사람(공동연구자, 미래의 본인)이 같은 코드를 실행하려면 어떤 환경변수가 필요한지 알아야 한다. 이를 위해 `.env.example` 파일을 만들고 이것만 Git에 커밋한다.

```
# .env.example — 복사해서 .env로 저장한 후 실제 값을 채우세요
OPENAI_API_KEY=your_api_key_here
DB_PASSWORD=your_db_password_here
```

**실수로 비밀을 커밋해버렸을 때의 대응.** 세 가지 조치를 즉시 실행한다.

1. **키 즉시 폐기와 재발급**: Git에서 파일을 지우는 것보다 먼저 해야 한다. OpenAI, AWS, GitHub 등 해당 서비스 대시보드에서 해당 키를 revoke하고 새 키를 발급받는다. 이것이 가장 중요하다. Git에서 지웠다고 해도 이미 다른 사람이 복제했을 수 있다.
2. **히스토리에서 파일 제거**: `git filter-repo` 또는 BFG Repo-Cleaner로 해당 파일을 Git 히스토리 전체에서 제거한다. 단순히 `git rm`으로는 최근 커밋에서만 지워지고 과거 커밋에는 남아 있다.
3. **강제 푸시와 공동연구자 알림**: 히스토리를 재작성한 후 `git push --force-with-lease`로 원격 저장소도 갱신한다. 공동연구자에게 저장소를 새로 클론하라고 알린다. 그들의 로컬 저장소에도 비밀이 남아 있을 수 있다.

**사전 방어: 커밋 전 자동 스캔.** 실수를 원천 차단하려면 pre-commit hook을 설치한다. `pre-commit` 프레임워크에 `detect-secrets`, `gitleaks`, `trufflehog` 같은 도구를 추가하면 커밋 시점에 자동으로 API 키 패턴을 탐지하고 커밋을 차단한다.

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
```

`pre-commit install`로 훅을 활성화하면 이후 모든 커밋에서 자동 스캔된다. 한 번 설정해두면 평생 보호 효과가 있다.

**공개 저장소 vs 비공개 저장소의 판단.** 연구 코드 저장소를 처음 만들 때 public/private 선택에 신중해야 한다. 논문 공개 전까지는 private이 기본이다. 논문이 publish된 후 공개로 전환할 때 반드시 전체 히스토리를 훑어보고 민감 정보가 없는지 확인한다. GitHub의 "Make public" 버튼을 누르는 순간 전체 커밋 히스토리가 공개된다. 중간 커밋에 API 키가 남아 있다면 그것도 함께 공개된다. 이것을 모르고 "마지막 커밋만 깨끗하면 된다"고 생각하는 학생이 많다.

> 비밀정보 관리는 한 번의 사고로 수백만 원의 손실과 연구실의 신뢰도 하락을 가져올 수 있는 영역이다. 처음 Git을 쓰기 시작할 때부터 환경변수와 `.gitignore` 습관을 들여야 한다. "나중에 공개할 때 정리하면 되지"라는 생각이 가장 위험하다. 첫 커밋부터 비밀이 없는 상태를 유지하는 것이 유일하게 안전한 전략이다.

---

## Jupyter Notebook과 Git — 데이터 과학자의 영원한 골칫거리

ML/데이터 분석 연구를 하는 학생이 첫 번째로 마주치는 Git의 불편함은 **Jupyter Notebook**과 관련 있다. Notebook은 탐색적 분석에 이상적인 도구이지만, Git과의 궁합이 나쁘기로 악명 높다. 단순히 `.ipynb` 파일을 커밋하면 여러 문제가 발생한다. 이 섹션은 그 문제들과 실전 해결책을 다룬다.

<div class="highlight-box highlight-warning">

**Jupyter Notebook의 Git 문제가 왜 심각한가.** `.ipynb` 파일은 JSON 포맷이고, 코드 외에 **실행 출력**(텍스트, 이미지, 에러)과 **메타데이터**(셀 ID, 실행 순서, 커널 정보)를 모두 포함한다. 이것 때문에 (1) 작은 변경도 diff가 거대해지고, (2) 같은 노트북을 두 명이 수정하면 merge conflict가 거의 확실하고, (3) 민감한 데이터가 출력에 남아 공개되는 사고가 자주 발생한다. 일반 `.py` 파일처럼 다루면 안 된다.

</div>

**Notebook과 Git의 구체적 문제들.**

**문제 1: 출력이 diff를 오염시킨다.**
노트북의 한 셀에서 코드를 한 글자만 바꿔도, 실행 결과(이미지, 표, 텍스트)가 바뀌면 diff에는 수백 줄의 변경이 나타난다. 실제 코드 변경은 한 글자인데 "무엇이 바뀌었는지" 리뷰가 불가능해진다.

**문제 2: Merge Conflict의 악몽.**
두 명이 같은 노트북을 편집하고 병합하려 하면, JSON 구조가 깨지면서 Git이 자동 병합에 실패한다. 수동으로 JSON을 수정해야 하는데, 이것은 매우 어렵고 오류가 나기 쉽다. 많은 연구자가 "내가 수정한 버전으로 덮어쓰기"로 해결하는데, 이것은 동료의 작업을 잃는 것이다.

**문제 3: 민감 데이터의 노출.**
노트북을 실행한 셀의 출력에 데이터 샘플, API 키, 경로 등이 남는다. 이것을 제거하지 않고 커밋하면, 나중에 저장소를 공개할 때 이 정보가 함께 공개된다. ch16의 "비밀정보 관리" 섹션과 밀접하게 연결된다.

**문제 4: 노트북의 크기 폭발.**
큰 그림이나 시각화를 포함한 셀의 출력이 저장되면, 노트북 파일 크기가 수 MB에서 수백 MB까지 커진다. Git 저장소가 무거워지고 clone이 느려진다.

**문제 5: 실행 순서의 혼란.**
Jupyter에서는 셀을 임의의 순서로 실행할 수 있다. `In [5]`, `In [2]`, `In [8]` 처럼 실행 카운터가 섞이면, 다른 사람이 이 노트북을 "위에서 아래로" 실행하면 다른 결과가 나온다. 재현성의 근본적 문제.

**해결 전략 1: nbstripout — 커밋 전 출력 제거.**

가장 기본적이고 강력한 도구. `nbstripout`은 Git 커밋 전에 노트북에서 자동으로 출력을 제거한다.

**설치와 설정**:
```bash
pip install nbstripout
cd your_project_directory
nbstripout --install
```

`nbstripout --install`은 프로젝트 저장소의 `.git/config`에 filter를 설치한다. 이후 `git add`로 노트북을 스테이징할 때 자동으로 출력이 제거된다. 실제 작업 중인 노트북에서는 출력이 유지되지만, 커밋되는 버전은 출력이 없다.

**효과**:
- Diff가 깔끔해진다 (코드 변경만 보임)
- Merge conflict가 크게 줄어든다
- 민감 데이터의 우발적 노출 방지
- 파일 크기 감소

**주의**: 팀 전체가 사용해야 효과적. 한 명만 쓰면 다른 사람이 출력을 포함해서 커밋하면 차이가 생긴다.

**해결 전략 2: nbdime — 노트북 전용 diff와 merge 도구.**

`nbdime`는 Jupyter 공식 프로젝트로, 노트북에 특화된 diff와 merge 도구다.

**설치와 사용**:
```bash
pip install nbdime
nbdime config-git --enable --global
```

설정 후 `git diff`와 `git merge`가 노트북 파일에 대해서는 nbdime을 사용한다. 차이점을 "셀 단위"로 보여주고, 출력과 메타데이터의 변경을 분리해서 표시한다.

**특히 유용한 명령**:
- `nbdiff file1.ipynb file2.ipynb`: 두 노트북의 차이 표시
- `nbdiff-web`: 웹 브라우저에서 시각적으로 비교
- `nbmerge-web`: 웹 브라우저에서 시각적으로 merge 해결

`nbstripout`이 "출력을 제거하는" 접근이라면, `nbdime`은 "출력을 이해하고 비교하는" 접근이다. 두 도구를 함께 사용하면 더 좋다.

**해결 전략 3: Jupytext — 노트북과 스크립트의 쌍둥이.**

`jupytext`는 `.ipynb`와 함께 `.py` (또는 `.md`) 파일을 자동으로 유지한다. Jupyter에서 노트북을 저장하면 `.py` 파일이 자동으로 업데이트되고, 반대로 `.py` 파일을 수정하면 노트북이 업데이트된다.

**설정**:
```bash
pip install jupytext
```

노트북 파일의 메타데이터에 다음을 추가한다:
```json
"jupytext": {
    "formats": "ipynb,py:percent"
}
```

이제 `notebook.ipynb`를 저장할 때마다 `notebook.py`가 함께 생성/업데이트된다.

**Git 워크플로**:
- `.ipynb`는 `.gitignore`에 추가 (커밋하지 않음)
- `.py`만 Git에 커밋
- 새 환경에서 clone 후 `jupytext --sync notebook.py` 로 노트북 복원

**장점**:
- 모든 Git 도구가 `.py` 파일을 완벽히 처리
- Code review가 정상적인 Python 파일처럼 가능
- Merge conflict가 일반 Python 파일 수준으로 쉬워짐
- 저장소 크기가 작아짐

**단점**:
- 초기 설정이 필요
- 셀 출력은 저장되지 않음 (별도 관리 필요)
- 팀이 이 워크플로를 이해해야 함

**해결 전략 4: ReviewNB — 노트북 전용 code review.**

`nbstripout`과 `nbdime`이 로컬 도구라면, `ReviewNB`는 GitHub/GitLab의 PR에서 노트북을 전용으로 리뷰하는 웹 서비스다. 무료 티어 있음.

**사용**:
- GitHub에 ReviewNB 앱 설치
- PR을 만들면 ReviewNB가 자동으로 노트북의 visual diff를 보여줌
- 셀 단위로 코멘트 가능

연구실에서 여러 명이 함께 노트북으로 작업할 때 매우 유용하다.

**해결 전략 5: Notebook을 "탐색용"으로만, 최종은 스크립트로.**

가장 극단적이고 확실한 해결책. 노트북을 "1회성 탐색 도구"로만 쓰고, 재사용 가능한 코드는 `.py` 모듈로 옮긴다. 노트북은 Git에 커밋하지 않거나, 매우 최소한만 커밋한다.

**워크플로**:
1. Jupyter에서 탐색적 분석 수행
2. 작동하는 코드를 `.py` 파일로 리팩토링
3. 노트북에서는 `from mymodule import analyze`로 모듈 import
4. Git에는 `.py` 파일만 커밋

이 접근의 장점은 "노트북의 저주"에서 완전히 벗어난다는 것이다. 단점은 노트북의 인터랙티브 특성을 일부 잃는다는 것. 연구 후반에 코드가 안정되면 이 접근이 적합하다.

**실전 추천 워크플로.**

상황에 따라 다른 접근을 권장한다.

**연구 초기 (탐색적 분석 단계)**:
- `nbstripout` 설치 및 사용
- 노트북을 Git에 커밋하되 출력은 제거
- 간단하고 설정 비용 적음

**연구 중반 (협업 단계)**:
- `nbstripout` + `nbdime` 조합
- 팀 전체가 같은 설정 사용
- Code review가 가능해짐

**연구 후반 (재현성이 중요한 단계)**:
- `jupytext`로 `.py` + `.ipynb` 쌍 유지
- 또는 완전히 `.py` 모듈로 리팩토링
- 재현 가능한 스크립트가 주 저장소

**논문 공개 단계**:
- 최종 노트북은 출력 포함해서 별도 폴더에 저장 (재현성 목적)
- 주 저장소에는 여전히 출력 없는 버전 유지
- 별도로 Binder 또는 Colab 링크 제공하여 실행 가능하게

**.gitignore의 Notebook 관련 항목.**

Jupyter 프로젝트의 `.gitignore`에 추가할 항목들.

```
# Jupyter Notebook checkpoints
.ipynb_checkpoints/
*/.ipynb_checkpoints/*

# IPython
profile_default/
ipython_config.py

# Jupyter 출력 캐시 (선택적)
*.nbconvert.ipynb

# Jupytext 사용 시
*.py  # jupytext가 생성한 파일만 무시하려면 주의
```

`.ipynb_checkpoints`는 Jupyter가 자동 저장하는 백업 폴더로, Git에 커밋하면 안 된다. 많은 학생이 이것을 실수로 커밋하여 저장소를 지저분하게 만든다.

**Notebook 셀의 실행 순서 문제 해결.**

"실행 순서 혼란"은 `nbstripout`이나 `nbdime`으로 해결되지 않는다. 이를 위한 별도 도구와 원칙.

**원칙 1: "Restart and Run All" 체크**.
노트북 작성을 마칠 때, 항상 "Kernel > Restart and Run All"을 실행한다. 에러 없이 끝까지 실행되면 노트북이 "재현 가능한 상태"다. 이것이 실행 순서의 혼란을 없앤다.

**원칙 2: 셀의 의존성 순서**.
각 셀이 위의 셀에만 의존하도록 작성한다. 아래 셀의 결과를 위 셀에서 참조하지 않는다. Notebook은 "위에서 아래로 읽을 수 있는 이야기"가 되어야 한다.

**원칙 3: papermill로 자동 실행**.
`papermill`은 노트북을 파라미터와 함께 스크립트처럼 실행하는 도구.
```bash
papermill notebook.ipynb output.ipynb -p param1 value1
```
이것이 "노트북을 자동 파이프라인에서 실행"할 수 있게 해준다. 매번 수동 실행이 아니라 스크립트로 돌릴 수 있다.

**원칙 4: nbval로 테스트**.
`nbval`은 pytest와 통합되어 노트북의 실행 가능성을 테스트한다.
```bash
pytest --nbval notebook.ipynb
```
CI/CD 파이프라인에 넣으면, 누군가 코드를 바꿨을 때 노트북이 여전히 실행되는지 자동 확인된다.

**큰 데이터셋과 노트북.**

노트북에서 큰 데이터를 다룰 때 주의사항.

- **데이터는 노트북에 하드코딩하지 말라**: 파일에서 로드하거나 API에서 가져온다. 데이터가 노트북에 들어가면 Git이 감당하지 못한다.
- **캐싱 활용**: `joblib.Memory`나 `dvc`를 사용하여 무거운 계산 결과를 디스크에 캐시. 노트북을 다시 실행할 때 캐시에서 로드.
- **파라메터화**: 데이터 경로를 상수로 정의하고, 환경 변수나 설정 파일에서 읽는다. 이것이 다른 사람이 다른 환경에서 실행하기 쉽게 한다.

**연구실의 Notebook 문화 만들기.**

연구실이 Jupyter를 많이 쓴다면, 팀 전체의 원칙을 만드는 것이 좋다. 다음을 포함한 "Notebook README"를 연구실 위키에 만든다.

```markdown
# 우리 연구실의 Jupyter Notebook 원칙

## 필수
1. 모든 노트북은 `nbstripout`이 설정된 상태에서 커밋
2. 노트북 파일은 `notebooks/` 디렉토리에 저장
3. 재사용 가능한 함수는 `src/` 모듈로 분리
4. 데이터는 노트북에 직접 저장하지 않음
5. 커밋 전 "Restart and Run All"로 재현성 확인

## 권장
- 팀 협업 시 `nbdime` 사용
- Long-running 노트북은 `papermill`로 스크립트화
- 노트북마다 README에 목적과 실행 방법 기록

## 금지
- `.ipynb_checkpoints`를 커밋하지 않음
- API 키를 노트북 셀에 하드코딩하지 않음
- 출력 크기가 10MB를 넘는 노트북을 그대로 커밋하지 않음
```

이 문서가 있으면 신입 학생이 첫날부터 올바른 습관을 들인다.

> Jupyter Notebook과 Git의 궁합 문제는 ML/데이터 과학 연구자의 거의 모두가 겪는다. 해결 도구들은 이미 존재하지만, 많은 학생이 이를 모르고 "노트북은 원래 이래"라며 포기한다. 박사 1년차에 `nbstripout` 또는 `jupytext` 정도는 익혀두면, Git 저장소가 깔끔해지고 협업이 훨씬 쉬워진다. 30분의 설정이 박사 5년의 편안함을 가져온다.

---

## 실험 추적 도구 — 수백 번의 실험을 잃지 않는 법

박사 과정에서 ML 또는 계산 실험을 한다면 수백에서 수천 개의 실험을 실행한다. 각 실험은 파라미터, 데이터, 코드, 결과의 조합이다. 이 실험들을 체계적으로 추적하지 않으면 6개월 후에 "어떤 파라미터가 가장 좋은 결과를 만들었는가"를 기억하지 못한다. 박사 논문의 논문 작성 시점에 과거의 실험을 재현할 수 없다. 박사 학위의 한 부분이 사라진다.

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>실험 추적 없이 박사를 시작하는 위험</strong></p>
    <p>박사 1-2년차에 "나는 간단한 스프레드시트로 기록하면 된다"라고 생각한다. 박사 3년차에 200개의 실험을 했고 스프레드시트가 엉망이다. 논문을 쓸 때 핵심 결과의 정확한 파라미터를 찾지 못한다. 같은 실험을 다시 실행해야 한다. 3개월이 재실험에 사라진다. 박사 1년차부터 실험 추적 도구를 쓰면 이 손실을 피한다. 실험 추적 도구는 시간의 가장 좋은 투자 중 하나다.</p>
  </div>
</div>

### 실험 추적 도구의 5가지 기능

어떤 실험 추적 도구를 쓰든 다음 5가지 기능을 이해한다.

**기능 1: 파라미터 로깅 (Parameter Logging)**

각 실험의 모든 파라미터 (학습률, 배치 크기, 모델 구조, 데이터 버전, 시드)를 자동으로 저장. 코드에 한 줄만 추가하면 도구가 모든 파라미터를 기록.

가치: 6개월 후에 "베스트 실험"의 정확한 파라미터를 도구에서 찾는다. 재현이 즉각적.

**기능 2: 메트릭 로깅 (Metric Logging)**

실험 중에 손실, 정확도, 평가 지표를 에포크 단위로 기록. 그래프로 시각화.

가치: 수백 개의 실험의 결과를 한 화면에서 비교. 최고 실험과 최악 실험을 즉시 식별.

**기능 3: 아티팩트 저장 (Artifact Storage)**

모델 체크포인트, 생성된 그림, 평가 결과의 CSV, 혼동 행렬 같은 실험의 결과물을 저장. Git에 넣기에 너무 큰 파일도 실험 추적 도구에 저장.

가치: 논문 작성 시점에 핵심 그림을 과거 실험의 아티팩트에서 그대로 가져온다. 그림을 재생성하지 않는다.

**기능 4: 코드 버전 연결**

각 실험이 Git 커밋 해시와 연결. 실험을 실행한 시점의 정확한 코드 상태를 기록.

가치: 6개월 전 실험의 코드를 Git에서 정확히 복원. 실험의 완전한 재현성.

**기능 5: 팀 협업**

실험을 팀원이 볼 수 있다. 지도교수가 실험을 대시보드에서 확인.

가치: 미팅 준비가 한 링크로 충분. 지도교수가 실험의 진행 상황을 실시간으로 본다.

### 주요 실험 추적 도구 비교

**도구 1: MLflow**

오픈소스, 무료, 자체 호스팅. 가장 인기 있는 무료 도구.

장점:
- 완전 무료, 로컬 서버 또는 학교 서버에 호스팅 가능.
- Python/R/Java 지원.
- PyTorch, TensorFlow, scikit-learn과 원활한 통합.
- 기관의 보안 정책에 맞춤 (학교 서버에 데이터 유지).

단점:
- UI가 경쟁 도구보다 단순.
- 자체 호스팅의 설정 부담.
- 팀 협업 기능이 덜 강력.

적합: 단독 연구, 학교 내부 팀, 보안이 중요한 프로젝트.

설치:
```bash
pip install mlflow
mlflow server --host 0.0.0.0 --port 5000
```

기본 사용:
```python
import mlflow

mlflow.start_run()
mlflow.log_param("learning_rate", 0.001)
mlflow.log_metric("accuracy", 0.95)
mlflow.log_artifact("model.pt")
mlflow.end_run()
```

**도구 2: Weights & Biases (W&B, wandb)**

상용, 학계에는 무료. 가장 인기 있는 클라우드 기반 도구.

장점:
- 매우 강력한 UI와 시각화.
- 학계 사용자에게 무료 (개인 계정, 무제한 프로젝트).
- 팀 협업 기능 강력.
- 자동 하이퍼파라미터 튜닝 (sweeps).

단점:
- 상용 도구 (산업체에서 유료).
- 데이터가 외부 클라우드로 전송 (보안 민감 프로젝트에 부적합).
- 네트워크 연결이 필수.

적합: 학계 연구, 팀 협업 프로젝트, 공개 데이터셋 연구.

설치:
```bash
pip install wandb
wandb login
```

기본 사용:
```python
import wandb

wandb.init(project="my-phd-project")
wandb.config.learning_rate = 0.001
wandb.log({"accuracy": 0.95})
wandb.save("model.pt")
```

**도구 3: Neptune.ai**

상용, 학계에 부분 무료. 메타데이터 관리에 특화.

장점:
- 메타데이터 관리의 깊이.
- 실험 비교의 유연한 UI.
- 학계 사용자에게 무료 플랜 (제한된 사용량).

단점:
- W&B만큼 커뮤니티가 크지 않다.
- 무료 플랜의 제한.

적합: 메타데이터 관리가 중요한 연구.

**도구 4: TensorBoard**

오픈소스, 무료, TensorFlow/PyTorch 내장.

장점:
- 완전 무료.
- 설치 없이 PyTorch/TensorFlow와 즉시 통합.
- 로컬 실행, 인터넷 불필요.

단점:
- 실험 추적보다 실시간 모니터링에 더 적합.
- 실험 비교가 MLflow/W&B보다 제한적.
- 팀 협업 기능 없음.

적합: 단독 실험의 빠른 시각화.

**도구 5: 자체 Google Sheets + 로그 파일**

가장 단순하지만 가장 부서지기 쉬운 선택.

장점:
- 설치 없음.
- 완전한 유연성.

단점:
- 수동 입력의 부담.
- 실수로 빠뜨리는 경우 많음.
- 200개 실험 이상에서 관리 불가능.

적합: 박사 첫 3개월의 첫 10-20개 실험. 그 이상에서는 실제 도구로 전환.

### 박사 과정에 맞는 도구 선택

**박사 1-2년차: 첫 시도**

첫 실험 추적 도구로 W&B (학계 무료) 또는 MLflow (로컬)를 선택. 두 도구 중 하나를 1-2주 동안 시험. 워크플로우에 맞는지 확인.

**박사 2-4년차: 본격 사용**

선택한 도구를 모든 실험에 적용. 하루에 10-50개의 실험을 실행하는 시기. 도구가 핵심 워크플로우의 한 부분이 된다.

**박사 5-7년차: 논문 작성과 아카이빙**

논문 작성 시점에 도구의 실험 기록을 핵심 자료로 사용. 박사 졸업 시점에 기록을 아카이브.

아카이빙 방법: W&B 프로젝트를 CSV로 내보내기. MLflow의 백업. 박사 졸업 후에도 실험 기록을 로컬에 유지.

### 실험 추적의 5가지 실전 원칙

**원칙 1: 첫 실험부터 기록**

"나는 나중에 중요해지면 기록한다"라고 생각하면 나중에 기록하지 않는다. 첫 실험부터 도구를 사용. 첫 실험의 작은 기록의 부담이 박사 3년차의 100개 실험의 정리의 부담보다 훨씬 작다.

**원칙 2: 모든 파라미터를 기록**

"이 파라미터는 중요하지 않다"라고 생각하는 것도 기록. 6개월 후에 그 파라미터가 중요해질 수 있다. 실험을 재현할 때 "무엇이 달랐는가?"의 답을 기록에서 본다.

**원칙 3: 실험에 의미 있는 이름 부여**

실험 이름이 "experiment_001", "experiment_002"이면 나중에 이름만 보고 실험의 목적을 모른다. 이름을 "lr_0.001_batch_64_baseline", "resnet50_augmentation_v2" 같은 의미 있는 형식으로 작성.

**원칙 4: 실험의 "목적" 기록**

각 실험의 "이 실험에서 무엇을 테스트하는가"를 노트 필드에 기록. 6개월 후에 목적을 다시 인식.

**원칙 5: 실험의 "결론" 기록**

실험이 끝난 후 결론을 도구에 기록. "이 실험이 가설을 지지", "이 실험이 가설을 반박", "이 실험이 모호함". 결론이 실험의 한 부분이 된다.

### 실험 추적의 흔한 함정 5가지

**함정 1: 도구를 복잡하게 만드는 함정**

도구의 모든 기능을 사용하려 한다. 설정이 몇 시간 걸린다. 실제 실험 시간이 줄어든다.

방지: 도구의 5가지 핵심 기능만 사용 (위에서 다룬 5가지). 추가 기능은 필요할 때 학습.

**함정 2: 실험의 과도한 기록**

실험의 모든 상세를 기록. 기록의 부담이 실험 자체보다 크다.

방지: 핵심 정보만 기록 (파라미터, 메트릭, 모델, 결론). 나머지는 Git에.

**함정 3: 도구의 사라지는 함정**

도구의 클라우드에 모든 실험을 저장. 도구의 서비스가 중단되거나 가격이 오르면 모든 실험을 잃는다.

방지: 정기 백업 (분기에 한 번). 도구의 CSV 내보내기 기능을 사용. 백업을 Git 또는 로컬 하드.

**함정 4: 팀 없이 팀 기능을 사용**

혼자 실험을 하면서 팀 협업 기능을 설정. 시간 낭비.

방지: 팀이 없으면 개인 사용에 집중. 팀이 생기면 팀 기능을 추가.

**함정 5: 도구의 과신**

도구에 모든 기록을 맡긴다. 연구 노트북 (ch52)을 소홀히 한다. 도구가 "무엇을 했는가"를 기록하지만 "왜 했는가"와 "어떻게 생각했는가"는 연구 노트북에만 있다.

방지: 실험 추적 도구와 연구 노트북을 함께 사용. 실험 추적 도구는 데이터, 연구 노트북은 사고.

---

## 실험 기록과 박사 논문

박사 졸업 시점에 박사 논문을 쓰면서 수천 개의 실험 중 핵심 20-50개를 선택한다. 실험 추적 도구가 이 선택을 가능하게 만든다.

실험 추적 도구의 필터와 정렬 기능으로 "가장 높은 정확도 상위 10개", "특정 구조의 실험 모두", "특정 데이터셋의 실험 모두"를 즉시 본다. 선택이 몇 분에 끝난다.

박사 논문의 각 표와 그림이 실험 추적 도구의 특정 실험에 연결. 독자가 재현을 요청하면 도구의 링크를 제공. 재현성이 박사 논문의 한 기둥이 된다 (ch38의 오픈 사이언스와 연결).

---

## 마지막 — 30분의 설정이 박사 5년의 평온이다

박사 1년차에 실험 추적 도구를 설정하는 30분이 박사 5-7년의 실험 관리의 기초를 만든다. 30분을 투자하지 않으면 박사 과정의 수개월이 실험을 재실행하거나 실험 기록을 찾는 데 소비된다.

선택 (MLflow, W&B, Neptune, TensorBoard, 또는 학교의 자체 도구)을 박사 1년차에 결정하고 그 도구에 일관되게 투자한다. 박사 졸업 시점에 도구가 박사의 과학적 기록의 한 부분이 된다. 박사 졸업 후에도 도구의 기록을 보관한다. 박사의 모든 실험이 평생 자산으로 유지된다.

## 연구 코드의 논문 공개 준비 — 개인 저장소에서 공개 저장소로의 전환

논문이 수락되고 나면 남는 작업이 있다. **코드 공개**다. 대부분의 저널과 학회가 2024-2026년에 코드 공개를 의무화하고 있고, 의무가 아니어도 공개하는 것이 표준이 되고 있다. 그런데 박사 과정 내내 개인용으로 사용해온 저장소는 공개에 적합하지 않다. 비밀 키가 섞여 있고, 폴더 구조가 난잡하고, 미완성 실험 코드가 수십 개 섞여 있고, 의존성이 명확하지 않고, 실행 방법이 머릿속에만 있다. 이 상태로 공개하면 독자가 실행할 수 없고, 평판이 오히려 떨어진다. 이 섹션은 개인 저장소를 공개 저장소로 전환하는 체계적 가이드다.

<div class="highlight-box highlight-important">

**"공개 저장소는 제2의 논문이다".** 많은 독자가 논문보다 코드를 먼저 본다. GitHub의 README가 연구의 첫 인상이 된다. 여기서 실패하면 논문이 아무리 좋아도 외면받는다. 반대로 깔끔하고 실행 가능한 공개 저장소는 논문 자체보다 더 큰 임팩트를 만들기도 한다. 공개 저장소의 정리에 1-2주를 투자하는 것이 수백 번의 다운로드와 인용으로 돌아온다.

</div>

**공개 준비의 3단계 타임라인.**

공개 준비는 논문이 수락된 직후에 시작하면 늦는다. 미리 계획해야 한다.

**단계 1: 논문 투고 시점.**
이 시점에 저장소가 "리뷰어에게 보여줄 수 있는" 상태여야 한다. 완벽하진 않아도 기본적인 README와 실행 가능성은 확보. 일부 저널은 리뷰 과정에서 코드 제출을 요구한다.

**단계 2: 리비전 제출 시점.**
리뷰어의 피드백을 반영하고 코드도 함께 업데이트. 리뷰어가 실제로 실행해본 경우 피드백이 올 수 있다.

**단계 3: 수락 후 최종 공개 시점.**
여기서 본격적 정리. 논문에 인용될 영구 버전을 만든다. DOI 발급, Zenodo 연동, 라이선스 명시.

각 단계의 저장소는 다른 수준의 완성도가 필요하다. 최종 공개는 최고 수준이어야 한다.

**단계 3의 7단계 체크리스트.**

최종 공개를 위한 구체적 정리 단계.

**단계 A: 비밀 정보 스캔.**
저장소 전체에서 비밀 정보가 없는지 철저히 확인. 이것이 가장 위험한 실수.

**스캔할 항목**:
- API 키 (AWS, Google Cloud, OpenAI, W&B 등)
- 비밀번호
- 개인 이메일 주소 (선택)
- 학교 서버 주소 (내부)
- 데이터셋의 사적 경로 (`/home/user/secret_data/`)
- 개인 식별 정보

**스캔 도구**:
- `git-secrets`: AWS, 범용 비밀 스캔
- `truffleHog`: 과거 커밋 히스토리까지 스캔
- `gitleaks`: 최신이고 강력
- GitHub의 내장 secret scanning: 공개 저장소에 자동 적용

**주의**: 과거 커밋에 비밀이 있으면 git history 전체를 재작성해야 한다. `git filter-branch` 또는 BFG Repo-Cleaner 사용. 단순히 최신 커밋에서 삭제하는 것은 불충분하다.

**단계 B: 폴더 구조의 재정비.**

박사 과정의 폴더 구조는 보통 "시간 순 카오스"다. 공개용으로는 체계적 구조가 필요하다.

**표준 구조의 예시**:
```
project-name/
├── README.md              # 첫 방문자가 읽는 곳
├── LICENSE                # 라이선스 명시
├── CITATION.cff           # 인용 정보
├── requirements.txt       # Python 의존성
├── environment.yml        # Conda 환경 (선택)
├── setup.py               # 패키지화 (선택)
├── .gitignore
├── docs/                  # 문서
│   ├── installation.md
│   └── usage.md
├── src/                   # 소스 코드
│   ├── models/
│   ├── data/
│   ├── training/
│   └── evaluation/
├── notebooks/             # 튜토리얼 노트북
│   └── demo.ipynb
├── scripts/               # 실행 스크립트
│   ├── train.sh
│   └── evaluate.sh
├── configs/               # 설정 파일
│   └── default.yaml
├── tests/                 # 테스트
│   └── test_models.py
└── data/                  # 데이터 안내 (실제 데이터는 외부)
    └── README.md          # 데이터 다운로드 방법
```

**원칙**:
- 각 폴더의 역할이 명확
- 깊이는 3-4단계 이하
- 이름은 영어, 소문자, 하이픈 또는 언더스코어
- 각 폴더에 (필요하면) README

**단계 C: README의 완성.**

README는 저장소의 "얼굴"이다. 5분 안에 독자가 알아야 할 것을 모두 담는다.

**필수 항목**:
1. **프로젝트 제목과 한 줄 설명**
2. **배지 (badges)**: 라이선스, 빌드 상태, DOI 등
3. **개요**: 무엇을 하는 코드인가 (2-3 단락)
4. **설치 방법**: 복사-붙여넣기로 작동해야 함
5. **빠른 시작 (Quick Start)**: 최소 예제 5-10줄
6. **사용 예시**: 주요 기능의 사용법
7. **데이터**: 어디서 구하는가, 어떻게 준비하는가
8. **결과 재현**: 논문의 결과를 재현하는 구체적 명령
9. **인용**: BibTeX 형식
10. **라이선스**
11. **연락처**: 이슈가 생겼을 때 어디로

**README의 길이**: 500-2000 단어가 이상적. 너무 짧으면 부실, 너무 길면 읽지 않음. 상세한 것은 docs/ 폴더로.

**예시 README 시작**:
```markdown
# PhysicsNet: Physics-Informed Neural Network for Crack Detection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.1234567.svg)](...)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)]

Official implementation of the paper "PhysicsNet: ..." 
published in Journal of X (2026).

## Overview
This repository contains the code and scripts to reproduce 
the results of our paper on physics-informed neural 
networks for bridge crack detection. Our method combines ...

## Quick Start
```bash
git clone https://github.com/your-org/physicsnet
cd physicsnet
pip install -r requirements.txt
python scripts/demo.py
```
...
```

**단계 D: 코드의 정리와 리팩터링.**

개인 저장소의 코드는 공개용으로 정리가 필요하다. 단, 과도한 리팩터링은 시간 낭비이고 버그를 만든다. "최소한의 품질"을 목표로.

**정리 원칙**:
1. **죽은 코드 제거**: 주석 처리된 코드, 사용하지 않는 함수 삭제
2. **의미 있는 이름**: `func1`, `temp`, `test2` 같은 이름을 의미 있게
3. **Magic number 제거**: 하드코딩된 숫자를 상수나 설정 파일로
4. **중복 제거**: 반복되는 코드를 함수로
5. **주석 추가**: 복잡한 로직에 "왜" 설명
6. **Type hints 추가**: Python의 경우 함수 시그니처에 타입

**과도하게 하지 말 것**:
- 완전히 다른 스타일로 재작성
- 모든 함수를 클래스로 변환
- 추상화 층을 여러 겹 추가
- 본인도 이해 못하는 디자인 패턴 적용

"작동하는 코드"가 "예쁜 코드"보다 중요하다. 독자는 코드를 읽기 위해서가 아니라 실행하기 위해 오는 경우가 많다.

**단계 E: 의존성의 고정.**

몇 년 후에도 코드가 실행될 수 있게 의존성을 명시.

**Python의 경우**:
```bash
# 현재 환경의 정확한 버전 캡처
pip freeze > requirements.txt
```

**더 좋은 방법**:
```bash
# 직접 사용하는 패키지만 명시 (minimal)
cat > requirements.txt << EOF
numpy>=1.21.0,<2.0
torch>=1.12.0,<2.0
scikit-learn>=1.0,<2.0
matplotlib>=3.5
EOF
```

**Conda 환경 파일**:
```yaml
# environment.yml
name: physicsnet
channels:
  - pytorch
  - conda-forge
dependencies:
  - python=3.10
  - pytorch=2.0
  - numpy=1.24
  - pip
  - pip:
    - timm==0.9.0
```

**Docker (고급)**:
```dockerfile
FROM pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "scripts/train.py"]
```

Docker는 가장 재현성이 높지만 초보자에게는 부담. 최소한 requirements.txt는 필수. ch38의 재현성 원칙과 연결.

**단계 F: 데이터 접근의 명확화.**

코드만 공개하고 데이터를 공개하지 않으면 실행이 불가능하다. 데이터 접근 방법을 명확히.

**데이터 공개의 3가지 모드**:

1. **완전 공개**: 데이터를 Zenodo, figshare, Kaggle 등에 업로드하고 코드에서 자동 다운로드.
2. **부분 공개**: 전체 데이터셋 중 일부만 공개 (예: 민감한 부분 제외). 나머지는 요청 시 제공.
3. **폐쇄**: 데이터는 비공개. 단, 코드의 실행 가능성을 위해 synthetic 데이터 또는 예시 데이터 제공.

**README의 데이터 섹션 예시**:
```markdown
## Data

### Public Dataset
The main experiments use the publicly available [Dataset X](url).
Download with:
```bash
python scripts/download_data.py
```

### Private Dataset
Some experiments in Section 4.3 use an industry dataset that 
cannot be shared publicly due to NDA. We provide a synthetic 
dataset that mimics its properties for demonstration:
```bash
python scripts/generate_synthetic.py
```

### Data Structure
```
data/
├── train/
│   ├── images/
│   └── labels.csv
└── test/
    └── ...
```
```

**단계 G: 라이선스 명시.**

라이선스 없는 코드는 법적으로 "사용 불가"다. 반드시 명시한다.

**주요 라이선스 비교**:
- **MIT**: 가장 자유로움. 상업 사용 가능, 수정 가능, 재배포 가능. 유일한 요구: 원 저작권 표시.
- **Apache 2.0**: MIT와 비슷하되 특허 보호 조항 추가. 기업이 선호.
- **GPL v3**: Copyleft. 코드를 사용하는 파생 작품도 GPL이어야 함. 상업적 제약.
- **BSD**: MIT와 유사.
- **CC BY 4.0**: 코드보다는 데이터/문서에 주로 사용.

**선택 원칙**:
- **학술 코드**: MIT 또는 Apache 2.0이 일반적
- **분야 표준 따르기**: 분야에서 흔히 쓰는 라이선스
- **학교 정책 확인**: 일부 학교가 특정 라이선스를 요구
- **ch40의 IP 정책 확인**: 연구실의 IP 규정에 맞는지

**적용 방법**:
1. 루트 폴더에 `LICENSE` 파일 (라이선스 전문)
2. 각 소스 파일 상단에 짧은 헤더:
```python
# Copyright (c) 2026 Your Name
# Licensed under the MIT License. See LICENSE file.
```

**단계 H: DOI와 영구 아카이브.**

공개 저장소는 바뀔 수 있다. 논문의 결과를 재현하려면 "특정 시점"의 코드가 필요하다. Zenodo를 사용해 영구 아카이브 생성.

**Zenodo + GitHub 연동 절차**:
1. Zenodo 계정 생성 (ORCID로 로그인)
2. Zenodo에서 GitHub 연동 활성화
3. 공개하려는 저장소 선택
4. GitHub에서 Release 생성 (예: v1.0)
5. Zenodo가 자동으로 해당 릴리즈를 아카이브하고 DOI 발급
6. DOI를 README에 추가

**효과**: 논문이 "DOI: 10.5281/zenodo.1234567"을 인용할 수 있다. 10년 후에도 정확히 그 버전을 재현 가능. ch38의 오픈 사이언스 원칙의 실천.

**공개 후의 유지보수.**

공개는 끝이 아니라 시작이다. 질문, 이슈, Pull Request에 대응해야 한다.

**대응 수준의 선택**:

**수준 1: 완전 방치.**
이슈에 답하지 않음. 시간과 관심의 문제. 학계에서는 실망을 주지만, 감당할 수 없으면 솔직한 공지가 낫다.

**수준 2: 기본 대응.**
이슈에 월 1회 정도 답변. 기본적인 버그 수정. 대부분의 학생 연구자의 현실적 선택.

**수준 3: 활발한 유지보수.**
이슈에 주 단위 답변. 기능 추가, 버그 수정. 이것이 오픈소스 프로젝트의 표준이지만 학생에게는 부담.

**현실적 권장**: 수준 2로 시작하되, 미리 README에 "이것은 학술 연구 코드이며 활발한 유지보수는 제한적입니다"를 명시. 기대치를 조정.

**"Maintenance Status" 섹션 예시**:
```markdown
## Maintenance

This is research code accompanying our paper. We welcome 
issues and contributions but cannot guarantee immediate 
responses. For critical bugs, please open an issue with 
[BUG] in the title.

For questions about the paper, please contact [email].
```

**박사 논문에서의 코드 섹션.**

박사 학위논문에도 코드에 대한 섹션을 포함시키는 것을 권장.

**포함할 내용**:
- 코드의 GitHub URL과 DOI
- 주요 모듈의 간략한 설명
- 핵심 알고리즘의 구현 위치
- 재현성 지침
- 의존성과 요구사항

**학위논문 appendix 예시**:
```
Appendix C: Code Availability

The complete implementation is available at:
https://github.com/your-org/physicsnet
(DOI: 10.5281/zenodo.1234567)

The main contributions of this thesis are implemented in:
- src/models/physics_net.py (Chapter 3)
- src/training/pinn_loss.py (Chapter 4)
- src/evaluation/crack_metrics.py (Chapter 5)

To reproduce the main experiments of this thesis:
1. Follow installation instructions in README.md
2. Run scripts/reproduce_thesis.sh
```

이것이 학위논문의 재현성과 투명성을 보장. ch36의 학위논문 작성과 연결.

**공개의 심리적 장벽 — "내 코드가 부끄럽다".**

많은 학생이 코드 공개를 망설이는 이유는 "내 코드가 예쁘지 않다"는 부끄러움이다. 이것을 극복하는 관점.

**관점 1: 모든 연구자의 코드는 부끄럽다.**
본인만 그런 것이 아니다. 유명한 논문의 공개 코드도 들여다보면 엉망인 경우가 많다. 완벽한 코드를 기다리면 영원히 공개할 수 없다.

**관점 2: 공개가 오히려 품질을 올린다.**
다른 사람이 본다는 생각이 코드를 조금씩 개선하게 만든다. 공개 자체가 품질 관리 메커니즘.

**관점 3: 미완성이어도 기여다.**
완벽하지 않은 코드도 "참고할 출발점"으로 가치가 있다. 세상의 모든 오픈소스가 완벽해서 공개된 것이 아니다.

**관점 4: 사후 수정 가능.**
공개 후에도 계속 개선할 수 있다. 첫 공개는 "현재 상태"일 뿐이다.

**관점 5: 동료의 이익.**
코드 공개가 분야의 다른 박사생들에게 시간을 절약해준다. 본인도 다른 사람의 공개 코드로 시간을 절약한 경험이 있을 것이다.

이런 관점이 공개 결정을 돕는다. 부끄러움보다 기여가 크다.

**공개 코드의 장기적 이익.**

공개 코드는 박사 이후 경력에 큰 이익을 준다.

1. **인용 증가**: 공개 코드가 있는 논문이 더 많이 인용됨 (30-50% 증가라는 연구 결과).
2. **재현 가능성의 증거**: 연구가 신뢰받음.
3. **포닥/취업 포트폴리오**: GitHub 프로필이 이력서의 일부.
4. **협력 기회**: 코드를 본 다른 연구자가 협력 제안.
5. **후속 연구의 기반**: 박사 후 다음 연구에서 계속 사용.
6. **교육적 가치**: 후배들이 코드로 학습.

이 이익들을 합치면 공개에 투자한 1-2주는 몇 배로 돌아온다.

> 공개 저장소는 박사 연구의 가장 눈에 보이는 결과물이다. 논문은 읽는 사람이 한정되지만, GitHub 저장소는 검색에 잡히고, 포크되고, 스타가 찍힌다. 공개 준비에 1-2주를 투자하라. 그 시간이 연구의 장기적 임팩트를 결정한다. 부끄러움을 이기고, 불완전함을 받아들이고, 공개하라. 완벽한 코드를 기다리다가 공개하지 않은 코드는 없는 코드와 같다.

## Git의 긴급 복구 — 삭제된 작업을 되살리는 법

박사 과정 어느 날, 본인은 패닉에 빠진다. "어제 작업한 것이 사라졌다!" `git reset --hard`를 잘못 실행했거나, 브랜치를 실수로 삭제했거나, 파일을 덮어썼다. 수 시간 또는 며칠의 작업이 한순간에 사라진 것처럼 보인다. 이 순간 아는 Git 지식은 평범한 사용법뿐이고, 복구의 기술은 없다. 이것이 박사 과정의 가장 무서운 순간 중 하나다. 그러나 다행히 **Git은 대부분의 "삭제"를 복구할 수 있다**. Git의 내부 구조를 이해하고 몇 가지 복구 명령을 알면, 패닉은 5분 안에 해결된다. 이 섹션은 Git의 긴급 복구 기술을 다룬다.

<div class="highlight-box highlight-important">

**"Git에서 정말 삭제되는 것은 드물다".** 작업을 "삭제했다"고 느낄 때, 대부분의 경우 Git의 내부 어딘가에 여전히 존재한다. Git은 `commit`을 "삭제"하지 않고 "참조를 잃어버림"할 뿐이다. 파일은 `.git/objects/` 폴더에 물리적으로 저장되어 있고, 찾는 방법을 알면 되살릴 수 있다. 이 사실을 이해하는 것이 복구의 첫 단계다. 패닉하지 말고, 먼저 Git의 내부 구조를 생각하라.

</div>

**패닉 시나리오의 6가지 유형**.

박사생이 자주 겪는 Git 패닉 상황.

**시나리오 1: `git reset --hard`로 커밋 지움**.
"어제 작업을 취소하려고 했는데, 너무 많이 지웠다."

**증상**: 현재 작업 디렉토리가 며칠 전 상태. 최근 커밋이 사라져 보임.

**복구 가능성**: 매우 높음. `git reflog`로 바로 복구.

**시나리오 2: 브랜치를 삭제함**.
"작업이 끝났다고 생각해서 `git branch -D feature`를 했는데, 중요한 것이 있었다."

**증상**: 브랜치가 목록에서 사라짐. 그 커밋들이 "orphan".

**복구 가능성**: 높음. `git reflog`로 복구.

**시나리오 3: 파일을 실수로 덮어씀**.
"`git checkout file.py`로 수정을 취소했는데, 실제로는 수정을 유지하고 싶었다."

**증상**: 로컬 수정이 사라짐.

**복구 가능성**: 커밋되지 않은 변경은 복구 어려움. 커밋되었으면 쉬움.

**시나리오 4: Merge 중 잘못된 해결**.
"Merge conflict를 해결하다가 잘못 선택해서 양쪽 다 잃었다."

**증상**: 두 브랜치의 일부 작업이 사라짐.

**복구 가능성**: 중간. Merge 전 상태로 돌아가 다시 시도 가능.

**시나리오 5: 잘못된 브랜치에 push**.
"feature 브랜치에 push해야 했는데 main에 push했다."

**증상**: main 브랜치가 의도하지 않은 커밋을 가짐.

**복구 가능성**: 가능하지만 복잡. `git revert`나 force push 필요.

**시나리오 6: Rebase 중 실패**.
"Interactive rebase를 하다가 뭔가 꼬였다."

**증상**: 브랜치 상태가 이상함. 커밋들이 섞임.

**복구 가능성**: 중간. `git reflog`로 rebase 전으로.

**각 시나리오에 다른 복구 도구가 필요**. 하지만 공통으로 쓰는 도구가 있다: `git reflog`.

**첫 번째 구조대: `git reflog`**.

`git reflog`는 Git의 "만능 복구 도구"다.

**무엇인가**: Git이 브랜치 참조(HEAD, 브랜치)의 이동 히스토리를 기록한다. 한 모든 커밋, 리셋, merge, rebase가 여기 있다.

**사용법**:
```bash
git reflog
```

**출력 예시**:
```
a1b2c3d (HEAD -> main) HEAD@{0}: commit: Fix bug in training
d4e5f6g HEAD@{1}: reset: moving to HEAD~1
h7i8j9k HEAD@{2}: commit: Add new experiment  ← 사라진 커밋
l0m1n2o HEAD@{3}: commit: Update README
...
```

**복구 방법**:
되살리고 싶은 상태의 해시를 확인한 후:
```bash
git reset --hard h7i8j9k
```

또는 그 상태로 새 브랜치를 만듦:
```bash
git branch recovery h7i8j9k
git checkout recovery
```

**핵심**: `git reflog`는 로컬에만 존재. 다른 컴퓨터로 push해도 reflog는 안 간다. 로컬 저장소에서만 복구 가능.

**reflog의 유효 기간**:
- 기본: 90일 (연결된 commit), 30일 (연결되지 않은 commit)
- 이 기간 내에 복구 가능
- 이후는 `git gc`로 완전 삭제

**즉시 복구**: 문제를 깨달으면 바로 `git reflog`. 시간이 지나면 복구가 어려워진다.

**구체적 복구 예시 — 시나리오별**.

**예시 1: `git reset --hard`로 커밋 지웠을 때**.

```bash
# 어제 중요한 커밋을 했는데
git commit -m "Important experiment results"
# 오늘 실수로 reset
git reset --hard HEAD~3
# 아! 3개 커밋이 사라짐

# 복구
git reflog
# HEAD@{0}: reset: moving to HEAD~3
# HEAD@{1}: commit: Important experiment results  ← 이것!
# HEAD@{2}: commit: Earlier work
# ...

# 복구
git reset --hard HEAD@{1}
# 또는 해시로
git reset --hard abc1234
```

**5분 내 완전 복구**.

**예시 2: 브랜치 삭제 후 복구**.

```bash
# 브랜치 삭제
git branch -D feature-x

# 복구
git reflog
# HEAD@{0}: checkout: moving from feature-x to main
# HEAD@{1}: commit (on feature-x): Last commit of feature-x
# ...

# feature-x 브랜치를 그 시점에 재생성
git branch feature-x HEAD@{1}
git checkout feature-x
```

**완전 복구**.

**예시 3: 잘못된 Merge 복구**.

```bash
# Merge 실행
git merge feature-branch
# 결과가 이상해서 취소하고 싶음

# 옵션 1: merge 직후라면
git reset --hard HEAD~1  # merge commit을 없앰

# 옵션 2: 이미 다른 작업 후라면
git revert -m 1 <merge-commit-hash>  # merge를 되돌리는 새 커밋
```

**예시 4: 커밋하지 않은 변경 복구**.

이것이 가장 어렵다. 커밋되지 않은 변경은 reflog에 없다.

```bash
# 실수로 변경 취소
git checkout file.py  # 로컬 변경이 사라짐

# 복구 시도
git stash list  # 혹시 stash에 있는지
git fsck --lost-found  # orphan 객체 찾기
```

**보통 복구 불가**. 이것이 "자주 커밋하기"의 중요성. 작은 단위로 커밋해야 이런 사고를 방지.

**예시 5: 잘못된 브랜치에 push**.

```bash
# 실수로 main에 push
git push origin main  # 어제 feature 작업을 main에 올림

# 복구 (팀과 조율 필요!)
git checkout main
git reset --hard HEAD~3  # 로컬에서 커밋 제거
git push origin main --force-with-lease  # 강제 push

# 안전한 대안: revert
git revert HEAD~2..HEAD  # 취소 커밋 생성
git push origin main
```

**경고**: `git push --force`는 다른 팀원의 작업을 덮어쓸 수 있다. `--force-with-lease`가 더 안전.

**예시 6: Rebase 중 실패**.

```bash
# Interactive rebase 중 잘못 편집
git rebase -i HEAD~5
# 뭔가 꼬였다!

# 복구
git rebase --abort  # rebase 진행 중이면 취소
# 또는
git reflog  # rebase 전으로 돌아가기
git reset --hard HEAD@{N}  # N은 rebase 시작 전의 번호
```

**`git fsck`와 orphan 객체 복구**.

`git fsck`는 Git 저장소의 무결성을 검사하면서 "고아" 객체를 찾는다.

**사용법**:
```bash
git fsck --lost-found
```

**결과 예시**:
```
dangling commit a1b2c3d4e5f6...
dangling blob 1234567890...
```

**"dangling commit"**: 어떤 브랜치나 태그에도 연결되지 않은 커밋. 잃어버린 작업일 수 있음.

**확인**:
```bash
git show a1b2c3d4e5f6
```

**복구**:
```bash
git branch recovered a1b2c3d4e5f6
git checkout recovered
```

**"dangling blob"**: 커밋되지 않은 파일 내용. 드물게 유용.

**사용 시기**: `reflog`가 작동하지 않거나, 오래된 것을 찾을 때.

**주의**: `git gc`가 이미 실행되었으면 dangling 객체도 삭제됨. 복구 불가.

**`git stash`의 복구**.

Stash는 임시 저장이지만 실수로 drop할 수 있다.

```bash
git stash drop  # 실수!

# 복구
git fsck --unreachable | grep commit
# unreachable commits 중 stash 찾기
git show <hash>

# 복구
git stash apply <hash>
```

**Stash 복구 팁**: 중요한 stash는 꼬리표를 붙이자:
```bash
git stash save "important feature WIP"
git stash list
```

이러면 나중에 찾기 쉽다.

**로컬 변경의 백업 전략**.

Git의 복구는 커밋된 것만 가능하다. 커밋되지 않은 변경은 복구 어렵다. 이것을 방지하는 습관.

**습관 1: 자주 커밋**.
완벽하지 않아도 자주 커밋. "WIP" (Work In Progress) 커밋도 OK. 나중에 squash하거나 rebase.

```bash
# 매 30분마다
git add -A
git commit -m "WIP: working on X"
```

**습관 2: Stash 활용**.
일시적으로 저장할 때 stash.
```bash
git stash  # 로컬 변경을 stash로
git stash pop  # 다시 가져오기
```

**습관 3: 브랜치 자주 생성**.
새 시도는 새 브랜치로. 망쳐도 원래 브랜치가 안전.
```bash
git checkout -b experiment-new-approach
```

**습관 4: Push 자주**.
로컬에 있는 것은 디스크 실패 시 잃을 수 있다. 원격에 push하면 2중 백업.
```bash
git push origin feature-branch
```

**습관 5: 이중 원격**.
GitHub + GitLab 등 두 원격 저장소에 동시에 push. 한 서비스가 다운되어도 안전.
```bash
git remote add backup git@gitlab.com:user/repo.git
git push origin main
git push backup main
```

**이런 습관이 "복구"를 거의 필요 없게** 만든다.

**Git의 내부 구조 이해**.

복구를 잘하려면 Git의 내부를 이해해야 한다.

**핵심 개념**:

**1. 객체 (Objects)**:
Git이 저장하는 모든 것은 객체다. 4가지 유형:
- **blob**: 파일 내용
- **tree**: 디렉토리 구조
- **commit**: 스냅샷 + 메타데이터
- **tag**: 특정 커밋의 이름

**저장 위치**: `.git/objects/`

**특징**: 객체는 SHA-1 해시로 식별. 한 번 만들어지면 내용이 변하지 않음 (immutable).

**2. 참조 (References)**:
객체를 가리키는 이름.
- **브랜치**: `.git/refs/heads/main`
- **태그**: `.git/refs/tags/v1.0`
- **HEAD**: 현재 위치. `.git/HEAD`

**삭제의 의미**: 참조를 지우는 것. 객체 자체는 여전히 존재.

**3. 도달 가능성 (Reachability)**:
어떤 참조(브랜치, 태그, HEAD, reflog)에서 도달 가능한 객체는 안전. 도달 불가능한 객체는 `git gc`의 대상.

**4. Garbage Collection (`git gc`)**:
도달 불가능한 객체를 삭제. 자동으로 실행되거나 수동으로:
```bash
git gc
```

**복구의 원리**: `git gc` 전에는 대부분의 "삭제된" 객체가 여전히 존재. 도달 경로를 재구축하면 복구.

**이 이해가 없으면** 복구가 마법처럼 보이고 실패할 수 있다. 이 지식이 본인을 "Git 사용자"에서 "Git 이해자"로 업그레이드.

**복구 도구의 최종 정리**.

복구에 쓰는 Git 명령들.

**조회 명령**:
- `git reflog`: 참조 이동 히스토리
- `git fsck --lost-found`: 고아 객체 찾기
- `git log --all --oneline --source`: 모든 브랜치의 로그
- `git show <hash>`: 특정 객체 확인
- `git cat-file -p <hash>`: 객체의 내용

**복구 명령**:
- `git reset --hard <commit>`: 현재 브랜치를 특정 커밋으로
- `git branch <name> <commit>`: 특정 커밋에 새 브랜치 생성
- `git cherry-pick <commit>`: 특정 커밋만 현재 브랜치에 적용
- `git stash apply <hash>`: stash 복구
- `git revert <commit>`: 커밋의 반대 커밋 생성

**경고 명령** (신중하게):
- `git push --force`: 원격을 덮어씀. 팀에 영향.
- `git push --force-with-lease`: 더 안전한 force
- `git clean -fd`: 추적되지 않는 파일 삭제. 복구 불가.

**일반 원칙**:
1. **먼저 reflog 확인**
2. **시도 전에 백업** (현재 상태를 다른 브랜치로)
3. **확실하지 않으면 지도교수/동료에게**
4. **"가장 간단한 해결부터"**

**복구 연습 — 안전한 환경에서**.

실제 프로젝트에서 복구를 시도하기 전에 연습.

**연습용 저장소 만들기**:
```bash
mkdir git-recovery-practice
cd git-recovery-practice
git init
echo "file 1" > file1.txt
git add .
git commit -m "Initial"
echo "file 2" > file2.txt
git add .
git commit -m "Second"
echo "file 3" > file3.txt
git add .
git commit -m "Third"
```

**연습 1: Reset 복구**.
```bash
# 실수 시뮬레이션
git reset --hard HEAD~2  # 2개 커밋 삭제

# 복구
git reflog
git reset --hard HEAD@{1}  # 복구
```

**연습 2: 브랜치 삭제 복구**.
```bash
git checkout -b feature
echo "feature" > feature.txt
git add .
git commit -m "Feature"
git checkout main
git branch -D feature  # 삭제

# 복구
git reflog
git branch feature <hash>  # 복구
```

**연습 3: Force push 실수**.
(원격 저장소 시뮬레이션)

이런 연습을 통해 복구 기술을 연마. 실제 사고 시 당황하지 않음.

**GitHub/GitLab의 추가 안전망**.

로컬 복구가 실패해도 원격 저장소가 도움을 줄 수 있다.

**GitHub의 "Activity" 페이지**:
저장소의 최근 활동. 삭제된 브랜치의 이름과 커밋 해시가 여기 있을 수 있다.

**GitHub Events API**:
```
https://api.github.com/repos/USER/REPO/events
```
push, delete, create 등의 이벤트 확인.

**GitHub의 "Code" 검색**:
삭제된 파일이 있었다면, GitHub 검색으로 그 내용을 찾을 수 있다 (public repo).

**Pull Request의 보호**:
삭제된 브랜치도 PR이 있었다면 PR 페이지에서 복구 가능.

**GitLab의 "Activity" + "Events"**:
유사한 기능.

**원칙**: 원격에 push된 것은 로컬에서 삭제해도 원격에서 복구 가능. 그래서 "자주 push"가 중요.

**협업 중 복구 — 팀에 영향을 주지 않게**.

혼자 쓰는 저장소가 아니라 팀과 협업 중이라면 복구가 더 복잡하다.

**원칙 1: 팀과 소통**.
"실수로 X를 했습니다. 복구하려고 합니다. 잠시 push를 기다려 주세요."

**원칙 2: Force push 지양**.
`git push --force`는 다른 사람의 작업을 덮어쓸 수 있다. 사용 전에 반드시 팀과 상의.

**원칙 3: 개인 브랜치에서 실험**.
복구가 복잡한 경우 개인 브랜치에서 실험. main이나 공유 브랜치에서 직접 하지 말자.

**원칙 4: Revert 선호**.
이미 push된 것은 `git revert`로 "취소 커밋"을 만드는 것이 안전. 히스토리를 재작성하지 않음.

**원칙 5: 최악의 경우**.
복구가 불가능하면 솔직히 인정하고 다시 작성. 팀에 사과하고 교훈을 얻음.

**데이터 파일의 복구**.

Git-LFS나 DVC로 관리되는 데이터 파일의 복구.

**Git-LFS**:
```bash
# 파일 포인터 복구
git reflog
git checkout <commit> -- path/to/file
# 실제 파일 다운로드
git lfs pull
```

**DVC**:
```bash
# DVC는 자체 버전 관리
dvc list --show-json
dvc checkout <commit>
```

**원칙**: 데이터 파일은 코드보다 복구가 어렵다. 외부 백업이 필수.

**"복구 불가능한" 상황들**.

솔직한 인정: 일부 상황은 복구 불가.

**복구 불가 시나리오**:

1. **`git gc` 실행 후**: 도달 불가능 객체가 완전 삭제. 복구 불가.
2. **`.git` 폴더 자체 삭제**: 모든 히스토리 손실.
3. **디스크 손상**: Git의 범위 밖.
4. **`git clean -fd`로 삭제된 추적 안 되는 파일**: 복구 불가.
5. **오래된 reflog**: 90일 이후 자동 삭제.

**이런 경우의 대응**:
1. **외부 백업 확인**: 클라우드, 외장 디스크
2. **원격 저장소 확인**: GitHub, GitLab
3. **동료의 로컬 복사본**: 혹시 누군가 clone 했는지
4. **다시 작성**: 교훈과 함께 받아들임

**예방의 중요성**: 복구는 최후의 수단. 예방이 훨씬 낫다.

**평상시 예방 체크리스트**.

복구가 필요하지 않게 하는 습관.

<div class="highlight-box highlight-info">

**Git 안전 체크리스트**

- [ ] 매일 1회 이상 커밋하는가?
- [ ] 매 2-3일에 원격으로 push하는가?
- [ ] 실험적 작업은 새 브랜치에서 하는가?
- [ ] `git reset --hard` 전에 한 번 더 생각하는가?
- [ ] `git push --force` 전에 팀과 상의하는가?
- [ ] 이중 원격 저장소 (GitHub + 다른 곳)를 쓰는가?
- [ ] 로컬 외 백업 (외장 하드, 클라우드)을 가지는가?
- [ ] `.gitignore`를 제대로 설정했는가?
- [ ] Git 내부 구조를 대략 이해하는가?
- [ ] `git reflog`를 아는가?
- [ ] 복구 연습을 해봤는가?
- [ ] 비밀 정보를 커밋하지 않는가?

</div>

이 12가지가 Git 작업을 안전하게 유지한다.

**복구 경험의 기록**.

실제 복구 경험을 기록하면 미래의 본인과 후배에게 도움이 된다.

**복구 일지 예시**:
```
2026-04-15

상황: git reset --hard HEAD~5로 5일 작업을 "삭제"함
원인: 최근 5개 커밋 중 3개를 취소하려 했는데 실수로 5개 모두

발견 시간: 실수 후 2분

복구 과정:
1. 패닉 → 심호흡 → "git reflog"
2. reflog에서 문제 전 상태 확인 (HEAD@{5})
3. git reset --hard HEAD@{5}
4. 완전 복구

소요 시간: 5분

교훈:
- reset 전에 현재 상태를 브랜치로 저장
- 여러 커밋을 취소할 때는 --hard 대신 --soft 사용
- reflog의 존재를 기억
```

이 일지가 후배에게 "나도 이런 실수를 했지만 복구했다"의 용기를 준다.

**Git의 철학 — 복구 가능한 설계**.

Git은 설계 자체가 "복구 가능"을 지향한다.

**Git의 설계 원칙**:
1. **객체 불변성**: 만들어진 객체는 변하지 않음. 내용 기반 해싱.
2. **참조 기반**: "삭제"는 참조를 지우는 것. 객체는 남음.
3. **분산**: 여러 복사본이 있음. 한 곳이 손상되어도 다른 곳에서 복구.
4. **시간 여유**: 자동 삭제 전 90일의 여유.

**이것을 이해하면** Git이 덜 무섭게 느껴진다. "실수해도 대부분 복구 가능"의 안심.

**그러나 조심은 필요**: Git이 모든 것을 복구할 수는 없다. 신중한 사용이 여전히 중요.

> Git 복구 기술은 박사 과정의 생존 기술이다. 누구나 한두 번 "모든 것을 잃었다"는 순간을 겪는다. 그 순간 패닉하는 학생과 침착히 reflog를 보는 학생의 차이가 몇 시간 vs 몇 주의 작업 손실을 결정한다. Git 지식에 "복구"를 추가하라. 평상시 habit (자주 커밋, 자주 push, 브랜치 활용)으로 사고를 예방하고, 사고가 나면 reflog로 침착히 복구한다. 이 기술이 박사 5-7년의 작업을 안전하게 지킨다.