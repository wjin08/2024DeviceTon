

<div align="center">

![48575898784b74834f564cb1c163dc93](https://github.com/user-attachments/assets/3cf46194-6f3b-4612-8e62-24c9777a340f)




  # IoT 도난방지 모니터링 서비스

  
  
![Arasaka Logo](https://img.shields.io/badge/TEAM-ARASAKA-red?style=for-the-badge)
![IoT](https://img.shields.io/badge/IoT-SECURITY-green?style=for-the-badge)
![Cloud](https://img.shields.io/badge/CLOUD-SERVERLESS-blue?style=for-the-badge)



**해외여행 도난범죄 방지를 위한 클라우드 기반 IoT 솔루션**
ESP32 + Serverless Functions + Hybrid App



<img width="2559" height="1439" alt="스크린샷 2025-09-30 113045" src="https://github.com/user-attachments/assets/8f575948-5d49-41dd-8f41-dbb044dc7283" />




</div>

---

## 📸 시연 영상

**Click Me->**

https://youtube.com/shorts/-jIEfDzU2Ag?si=WpqzO_D3C45cB0bK

---

## 📖 프로젝트 개요

ARASAKA는 해외여행 시 도난범죄의 타겟이 되는 것을 방지하기 위해 개발된 클라우드 기반 IoT 보안 모니터링 서비스입니다.

### 프로젝트 배경

코로나19 이후 해외여행 수요가 급증하면서 여행객을 대상으로 한 도난 범죄도 증가하는 추세입니다. 특히 유럽과 동남아시아에서 백팩 여행객들이 소매치기와 가방 도난의 주요 타겟이 되고 있습니다.

### 해결하고자 하는 문제

**시나리오 1: 소매치기 상황**
- 백팩을 메고 다니는 중 등을 보일 때
- 도둑이 몰래 가방에 손을 넣어 물건을 가져가는 상황
- **해결**: 스마트폰 경고 + 비프음으로 즉시 인지 가능

**시나리오 2: 가방 전체 도난**
- 가방을 통째로 도둑맞는 상황
- **해결**: 도난 알림 + 실시간 위치 추적 + 거리 측정으로 신고 및 추격 용이

---

## ✨ 핵심 기능

### 🛡️ 실시간 도난 감지
- **홀 센서 기반 모니터링**: 가방 개폐 감지
- **즉각적 알림**: 웹/앱을 통한 시각적 경고
- **비프음 경보**: 엣지 디바이스에서 즉시 소리 출력

<img width="993" height="621" alt="스크린샷 2025-09-30 104915" src="https://github.com/user-attachments/assets/df825b75-a10d-44f4-9146-868d17d3e2c4" />


### 📍 정밀 위치 추적
- **WiFi RSSI 기반 거리 측정**: 중거리~근거리까지 cm 단위 측정
- **Google Maps 연동**: 실시간 위치 표시
- **로드뷰 지원**: 주변 랜드마크 및 지형지물 확인 가능
- **실내외 구분 없는 안정적 추적**: GPS와 달리 지하/실내에서도 작동

<img width="430" height="750" alt="스크린샷 2025-09-30 104955" src="https://github.com/user-attachments/assets/ddbeb9fc-58cc-4b8c-977d-ad6713a93c3c" />


### 🔔 스마트 알람 시스템
- **Alarm Mode**: 원격 부저 활성화
- **Finding Mode**: RSSI 기반 근접도 확인 (5단계)
  - 📍 바로 근처 (< 45dBm)
  - 🟢 가까운 거리 (45-60dBm)
  - 🟡 중간 거리 (60-70dBm)
  - 🟠 멀어지는 중 (70-80dBm)
  - ❌ 신호 약함 (> 80dBm)

### 📊 이벤트 로깅
- 모든 활동 기록 및 타임스탬프 저장
- 도난 시각 및 패턴 분석 가능




---

## 🏗️ 시스템 아키텍처

```
┌──────────────┐         ┌────────────────────┐         ┌──────────────┐
│              │  WiFi   │                    │  HTTPS  │              │
│  ESP32       │◄────────┤  Netlify           │◄────────┤  Web/App     │
│  (Edge)      │         │  Serverless        │         │  (Client)    │
│              │         │  Functions         │         │              │
│  - PCB 설계   │         │                    │         │  - 웹앱       │
│  - 마그네틱   │         │  - API Gateway     │         │  - 하이브리드 │
│  - 부저      │         │  - Memory DB       │         │    앱        │
│  - RSSI 측정 │         │  - CORS Enabled    │         │  - Google    │
│              │         │                    │         │    Maps      │
└──────────────┘         └────────────────────┘         └──────────────┘
```

### 기술적 구현

**엣지 디바이스 (ESP32)**
- **자체 설계 PCB** 적용: 브레드보드 방식의 통신 간섭 문제를 해결하기 위해 직접 회로도를 설계하고 PCB를 제작
- WiFi RSSI 신호 강도 분석 알고리즘
- 마그네틱 센서를 통한 도난 상태 감지
- 실시간 클라우드 통신

  <img width="1362" height="841" alt="스크린샷 2025-09-30 104927" src="https://github.com/user-attachments/assets/87b0c46c-a20f-488f-a9e3-c64330e1c36b" />


**클라우드 서비스 (Serverless)**
- Netlify Functions 기반 백엔드 API
- IoT 디바이스 ↔ 웹 애플리케이션 실시간 통신
- 메모리 기반 상태 관리
- RESTful API 설계

<img width="659" height="500" alt="스크린샷 2025-09-30 105001" src="https://github.com/user-attachments/assets/d368d542-b037-4f5c-ac93-9c2e09124ae6" />


**클라이언트 (Web + Hybrid App)**
- 반응형 웹 애플리케이션
- 웹뷰 기반 하이브리드 앱 배포
- 크로스 플랫폼 지원 (Android/iOS)
- Google Maps API 연동

<img width="868" height="729" alt="스크린샷 2025-09-30 104944" src="https://github.com/user-attachments/assets/711978f0-3b86-41c1-be45-94492575e31a" />


---

## 💰 제품 경제성

### 경제적 가치
- 저렴한 원가로 대량 생산 가능
- 기존 GPS 기반 솔루션 대비 70% 이상 비용 절감
- 애플 에어태그(39,000원) 대비 80% 저렴

<img width="576" height="768" alt="스크린샷 2025-09-30 105014" src="https://github.com/user-attachments/assets/ec613d6b-77b8-4147-9516-2a33c84818fd" />


---

## 🎯 차별점

### vs 기존 물리적 잠금장치
| 항목 | 기존 솔루션 | ARASAKA |
|------|------------|---------|
| 편의성 | ❌ 매번 개폐 필요 | ✅ 자동 감지 |
| 대응 방식 | 사전 예방 | 사전 예방 + 사후 대책 |
| 위치 추적 | ❌ 불가능 | ✅ 실시간 추적 |
| 알림 기능 | ❌ 없음 | ✅ 즉각 알림 |

### vs 애플 에어태그
| 항목 | 애플 에어태그 | ARASAKA |
|------|--------------|---------|
| 가격 | 39,000원 | 7,700원 (원가) |
| 호환성 | iOS 전용 | 모든 기기 (웹 기반) |
| 로드뷰 | ❌ 미지원 | ✅ 지원 |
| 실시간 알림 | 제한적 | 즉각적 |
| 커스터마이징 | 불가능 | 오픈소스 |

### vs GPS 기반 디바이스
| 항목 | GPS 디바이스 | ARASAKA |
|------|-------------|---------|
| 실내 추적 | ❌ 불가능 | ✅ 가능 |
| 지하 추적 | ❌ 불가능 | ✅ 가능 |
| 근접 정밀도 | 미터 단위 | **cm 단위** |
| 가격 | 30,000원+ | 7,700원 |
| 배터리 수명 | 짧음 | 상대적 길음 |

### vs 로컬 웹서버 프로젝트
- **ARASAKA**: 클라우드 기반, URL만으로 어디서든 접근 가능
- **로컬 서버**: 동일 네트워크에서만 사용 가능

<img width="806" height="456" alt="스크린샷 2025-09-30 104940" src="https://github.com/user-attachments/assets/72078805-51c4-43d5-93da-f8bf2897cde8" />


---

## 🛠️ 기술 스택

### Hardware
- **ESP32 Development Board**: WiFi/BLE 통신
- **커스텀 PCB 설계**: 통신 간섭 최소화
- **마그네틱 센서**: 개폐 감지
- **부저 모듈**: 경보음 출력
- **리튬 배터리 + 충전 모듈**

### Backend (Serverless)
- **Netlify Functions**: Node.js 기반 서버리스
- **RESTful API**: GET/POST 엔드포인트
- **In-Memory Storage**: 실시간 데이터 관리
- **CORS 지원**: 크로스 오리진 통신

### Frontend
- **HTML5 / CSS3 / JavaScript**
- **Google Maps JavaScript API**: 지도 + 로드뷰
- **반응형 디자인**: 모바일 최적화
- **Orbitron Font**: 사이버펑크 테마

### Mobile App
- **하이브리드 앱**: 웹뷰 기반
- **크로스 플랫폼**: Android/iOS 지원
- **PWA 지원**: 오프라인 기능

---

## 📦 설치 및 사용 방법

### 1. 저장소 클론
```bash
git clone https://github.com/team-arasaka/iot-security-monitor.git
cd iot-security-monitor
```

### 2. API 키 설정

**Google Maps API 발급**
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. Maps JavaScript API 활성화
3. API 키 생성

**환경 변수 설정**
```javascript
// script_modified.js
const NETLIFY_FUNCTION_URL = "https://your-app.netlify.app/.netlify/functions/updateData";

// index.html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```

### 3. Netlify 배포

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 배포
netlify deploy --prod
```

### 4. ESP32 펌웨어 업로드

Arduino IDE에서 ESP32 보드 설치 후 펌웨어 업로드
(별도 제공되는 ESP32 코드 참고)

### 5. 하드웨어 조립

1. PCB에 ESP32 장착
2. 마그네틱 센서 연결
3. 부저 모듈 연결
4. 배터리 및 충전 모듈 연결
5. 가방 내부에 설치

---

## 🚀 사용 시나리오

### 여행 전 준비
1. 디바이스를 가방 내부에 설치
2. 웹/앱에서 디바이스 연결 확인
3. Finding Mode로 거리 측정 테스트

### 여행 중 모니터링
1. 가방을 열 때마다 자동 감지
2. 스마트폰으로 알림 수신
3. 이상 상황 시 즉시 확인

### 도난 발생 시
1. 실시간 위치 추적 시작
2. Finding Mode로 근접도 확인
3. 로드뷰로 주변 환경 파악
4. 경찰 신고 및 추격

---

## 📊 API 문서

### Base URL
```
https://your-app.netlify.app/.netlify/functions/updateData
```

### GET /updateData
현재 디바이스 상태 조회

**Response**
```json
{
  "status": "정상",
  "rssi": -65,
  "buzzer": false,
  "lastUpdate": 1699012345678
}
```

### POST /updateData
디바이스 상태 업데이트

**Request Body**
```json
{
  "status": "위험",
  "rssi": -85,
  "buzzer": true,
  "mode": "alarm"
}
```

**Response**
```json
{
  "message": "Data received",
  "buzzer": true,
  "status": "위험",
  "rssi": -85
}
```


---



<div align="center">

**실용적이면서도 효과적인 도난 방지 솔루션**

</div>
