## 공학에서의 컴퓨터 비전

<div class="card-grid">
  <div class="card accent-blue">
    <span class="card-icon">🔍</span>
    <div class="card-title">결함 및 균열 탐지</div>
    <div class="card-desc">콘크리트 균열, 용접 결함, 부식 등을 이미지에서 자동으로 검출한다. 사람의 육안 검사 대비 일관성과 속도가 높다.</div>
  </div>
  <div class="card accent-purple">
    <span class="card-icon">🔬</span>
    <div class="card-title">재료 미세구조 분석</div>
    <div class="card-desc">SEM/TEM 이미지에서 결정립 크기, 상 분포, 결함 밀도 등을 정량적으로 분석한다. 수동 측정 대비 처리량이 비약적으로 증가한다.</div>
  </div>
  <div class="card accent-cyan">
    <span class="card-icon">🤖</span>
    <div class="card-title">로봇 및 자율주행</div>
    <div class="card-desc">환경 인식, 장애물 검출, 경로 계획에 비전 기술이 핵심이다. LiDAR 데이터와 융합하여 3D 인지도 수행한다.</div>
  </div>
  <div class="card accent-green">
    <span class="card-icon">🏭</span>
    <div class="card-title">제조 공정 모니터링</div>
    <div class="card-desc">생산 라인에서 불량품 실시간 검출, 공정 상태 모니터링, 품질 예측 등에 활용된다.</div>
  </div>
</div>

---

## 핵심 태스크

<div class="pipeline">
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🏷️</div>
    <div class="pipeline-step-title">이미지 분류</div>
    <div class="pipeline-step-desc">전체 이미지에 하나의 라벨 부여</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">📦</div>
    <div class="pipeline-step-title">객체 탐지</div>
    <div class="pipeline-step-desc">Bounding Box로 객체 위치와 종류 식별</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">🎨</div>
    <div class="pipeline-step-title">시맨틱 세그멘테이션</div>
    <div class="pipeline-step-desc">픽셀 단위 클래스 분류</div>
  </div>
  <span class="pipeline-arrow">→</span>
  <div class="pipeline-step">
    <div class="pipeline-step-icon">✂️</div>
    <div class="pipeline-step-title">인스턴스 세그멘테이션</div>
    <div class="pipeline-step-desc">개별 객체를 구분하여 픽셀 분류</div>
  </div>
</div>

---

## 주요 모델과 프레임워크

<div class="tab-container">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-s23-models">주요 모델</button>
    <button class="tab-btn" data-tab="tab-s23-frameworks">프레임워크</button>
  </div>
  <div class="tab-content active" id="tab-s23-models">
    <p><strong>ResNet</strong> — 잔차 연결(Residual Connection)로 깊은 네트워크 학습을 가능하게 했다. 분류의 표준 백본이다.</p>
    <p><strong>YOLO (v5/v8)</strong> — 실시간 객체 탐지의 대표 모델. 속도와 정확도의 균형이 뛰어나 산업 현장에서 널리 사용된다.</p>
    <p><strong>U-Net</strong> — 인코더-디코더 구조의 세그멘테이션 모델. 의료영상에서 시작했으나 공학 전반에서 활용된다.</p>
    <p><strong>ViT (Vision Transformer)</strong> — 이미지를 패치로 분할하여 Transformer에 입력한다. 대규모 데이터에서 CNN을 능가하는 성능을 보인다.</p>
  </div>
  <div class="tab-content" id="tab-s23-frameworks">
    <p><strong>PyTorch</strong> — 연구 커뮤니티에서 사실상 표준. 동적 그래프로 디버깅이 용이하고, torchvision이 비전 태스크를 지원한다.</p>
    <p><strong>TensorFlow / Keras</strong> — 프로덕션 배포에 강점이 있다. TF Lite로 엣지 디바이스 배포가 가능하다.</p>
    <p><strong>OpenCV</strong> — 전통적 이미지 처리(필터링, 엣지 검출, 변환) 라이브러리. 전처리 단계에서 필수적이다.</p>
    <p><strong>Detectron2</strong> — Meta에서 개발한 객체 탐지/세그멘테이션 프레임워크. 사전학습 모델과 설정 기반 학습이 편리하다.</p>
  </div>
</div>

---

## 데이터가 부족할 때

<div class="highlight-box tip">
  <span class="highlight-box-icon">💡</span>
  <div class="highlight-box-content">
    <p><strong>소량 데이터 극복 전략</strong></p>
    <p><strong>전이학습(Transfer Learning)</strong> — ImageNet 사전학습 모델을 가져와 마지막 층만 재학습한다. 공학 이미지에서도 대부분의 경우 효과적이다.</p>
    <p><strong>데이터 증강(Augmentation)</strong> — 회전, 반전, 색상 변환, 노이즈 추가 등으로 학습 데이터를 인위적으로 늘린다. Albumentations 라이브러리가 강력하다.</p>
    <p><strong>합성 데이터(Synthetic Data)</strong> — CAD 모델이나 시뮬레이션으로 학습용 이미지를 생성한다. 실제 데이터와의 도메인 갭을 줄이는 것이 핵심이다.</p>
  </div>
</div>
