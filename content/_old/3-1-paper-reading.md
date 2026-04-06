## 3-Pass 읽기 방법

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-label">1st Pass (5-10분)</div>
    <div class="timeline-title">훑어보기</div>
    <div class="timeline-desc">제목, 초록, Introduction 마지막 문단, 결론을 읽어 이 논문이 뭘 하려는 건지 파악한다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">2nd Pass (30-60분)</div>
    <div class="timeline-title">구조 파악</div>
    <div class="timeline-desc">그림, 표, 수식을 중심으로 읽으며 방법론의 흐름과 결과의 핵심을 이해한다.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-label">3rd Pass (수 시간)</div>
    <div class="timeline-title">깊이 읽기</div>
    <div class="timeline-desc">재현 가능할 정도로 상세히 읽으며 수식 유도를 따라가고, 가정을 검토하고, 한계점을 분석한다.</div>
  </div>
</div>

---

## 비판적 읽기 전략

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>읽으면서 스스로에게 물어볼 질문들:</strong></p>
    <p>이 가정은 현실적인가? 데이터가 결론을 충분히 뒷받침하는가? 비교 대상이 공정한가? 재현이 가능한가?</p>
  </div>
</div>

---

## 논문 정리 방법

<div class="card-grid">
  <div class="card">
    <span class="card-icon">📝</span>
    <div class="card-title">1줄 요약 기록</div>
    <div class="card-desc">읽은 논문마다 한 줄 요약을 남기는 습관을 들인다. 나중에 Related Work 쓸 때 큰 도움이 된다.</div>
  </div>
  <div class="card">
    <span class="card-icon">🗺️</span>
    <div class="card-title">문헌 맵 그리기</div>
    <div class="card-desc">관련 논문들의 관계를 시각적으로 정리한다. 연구 흐름과 갭을 파악하는 데 유용하다.</div>
  </div>
  <div class="card">
    <span class="card-icon">📊</span>
    <div class="card-title">비교표 만들기</div>
    <div class="card-desc">방법론, 데이터, 성능을 표로 정리하면 내 연구의 positioning이 명확해진다.</div>
  </div>
</div>

---

## 추천 도구

<div class="card-grid">
  <div class="card">
    <span class="card-icon">🔗</span>
    <div class="card-title">Connected Papers</div>
    <div class="card-desc">논문 간 인용 관계를 시각적 그래프로 보여주는 도구다.</div>
    <span class="card-tag tag-green">무료</span>
  </div>
  <div class="card">
    <span class="card-icon">📚</span>
    <div class="card-title">Zotero</div>
    <div class="card-desc">논문 관리와 자동 인용 생성을 지원하는 도구다.</div>
    <span class="card-tag tag-green">무료</span>
  </div>
  <div class="card">
    <span class="card-icon">🤖</span>
    <div class="card-title">Semantic Scholar</div>
    <div class="card-desc">AI 기반으로 논문을 검색하고 관련 논문을 추천해주는 도구다.</div>
    <span class="card-tag tag-green">무료</span>
  </div>
</div>

---

## 목적별 읽기 전략

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s31-survey">서베이용</button>
    <button class="tab-btn" data-tab="tab-s31-reproduce">재현용</button>
    <button class="tab-btn" data-tab="tab-s31-related">Related Work 작성용</button>
  </div>
  <div class="tab-content active" id="tab-s31-survey">
    <p><strong>빠르게 훑어 흐름을 잡는다</strong></p>
    <ul>
      <li>Abstract + Conclusion 위주로 빠르게 50편 이상을 훑는다</li>
      <li>핵심 키워드와 트렌드를 파악하여 분야의 전체 지형을 그린다</li>
      <li>방법론, 데이터, 성능을 비교표로 정리하면 서베이 논문 작성에 바로 활용할 수 있다</li>
    </ul>
  </div>
  <div class="tab-content" id="tab-s31-reproduce">
    <p><strong>Method 섹션을 집중적으로 읽는다</strong></p>
    <ul>
      <li>하이퍼파라미터, 데이터 전처리, 학습 설정을 상세히 기록한다</li>
      <li>코드 공개 여부를 확인하고, 공개된 경우 코드와 논문의 차이점을 비교한다</li>
      <li>재현이 안 되면 저자에게 이메일로 문의하는 것도 방법이다</li>
    </ul>
  </div>
  <div class="tab-content" id="tab-s31-related">
    <p><strong>각 논문의 위치를 정리한다</strong></p>
    <ul>
      <li>각 논문의 기여점을 1줄로 요약한다</li>
      <li>내 연구와의 차이점을 명시적으로 정리한다</li>
      <li>시간순으로 분야의 발전 흐름을 정리하면 Related Work 섹션의 구조가 자연스럽게 잡힌다</li>
    </ul>
  </div>
</div>

---

## 신뢰도 판단 기준

<div class="highlight-box warning">
  <span class="highlight-box-icon">⚠️</span>
  <div class="highlight-box-content">
    <p><strong>다음 징후가 있으면 논문의 신뢰도를 의심해야 한다</strong></p>
    <p>비현실적으로 높은 성능(99.9% 정확도), 데이터셋 분할 방법 미기재, 코드 미공개 + 재현 불가, 통계적 유의성 검증 없음, 비교 대상(baseline)이 너무 약함. 이런 논문을 Related Work에 포함할 때는 비판적 시각을 유지하고, 검증 없이 결과를 그대로 인용하지 않는다.</p>
  </div>
</div>
