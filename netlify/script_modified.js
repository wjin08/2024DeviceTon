// API 설정
const GEOLOCATION_API_URL = `#api키를 발급받아서 넣으세요`;
const NETLIFY_FUNCTION_URL = "https://???????.netlify.app/.netlify/functions/updateData";

// 전역 변수
let isFindingMode = false;
let findingInterval;

// RSSI 레벨 판단
function getRSSILevel(rssi) {
  const rssiAbs = Math.abs(rssi);

  if (rssiAbs < 45) return {
      level: "immediate",
      message: "바로 근처에 있음",
      icon: "📍",
      color: "#2ecc71"
  };
  if (rssiAbs < 60) return {
      level: "near",
      message: "가까운 거리",
      icon: "🟢",
      color: "#27ae60"
  };
  if (rssiAbs < 70) return {
      level: "medium",
      message: "중간 거리",
      icon: "🟡",
      color: "#f1c40f"
  };
  if (rssiAbs < 80) return {
      level: "far",
      message: "멀어지는 중",
      icon: "🟠",
      color: "#e67e22"
  };
  return {
      level: "out_of_range",
      message: "신호 약함",
      icon: "❌",
      color: "#e74c3c"
  };
}

// 보안 상태 업데이트
function updateSecurityStatus() {
  fetch(NETLIFY_FUNCTION_URL)
      .then(response => response.json())
      .then(data => {
          // 보안 상태 업데이트
          const statusDisplay = document.getElementById("security-status");
          statusDisplay.textContent = data.status;
          statusDisplay.className = "status-indicator " +
              (data.status === "위험" ? "danger" : "warning");

          // RSSI 상태 업데이트
          const rssiInfo = getRSSILevel(data.rssi);
          const rssiDisplay = document.getElementById("rssi-indicator");
          rssiDisplay.textContent = `${rssiInfo.icon} ${rssiInfo.message} (${data.rssi}dBm)`;
          rssiDisplay.style.backgroundColor = rssiInfo.color;

          // Finding Mode에서 부저 패턴 제어
          if (isFindingMode) {
              updateBuzzerPattern(rssiInfo.level);
          }

          // 도난 상태 업데이트
          updateTheftStatus(data);
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById("security-status").textContent = "연결 끊김";
          document.getElementById("rssi-indicator").textContent = "신호 없음";
      });
}

// ALARM 버튼 제어 (수정된 부분)
document.getElementById('buzzer-toggle').addEventListener('click', function() {
    if (this.textContent === 'ACTIVATION') {
        // Finding Mode가 켜져있으면 끄기
        if(isFindingMode) {
            const findingButton = document.getElementById('finding-mode');
            findingButton.click();  // Finding Mode 끄기
        }
        fetch(NETLIFY_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                buzzer: true,
                mode: 'alarm'
            })
        });
        this.textContent = 'DEACTIVATION';
   } else {
       fetch(NETLIFY_FUNCTION_URL, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ 
               buzzer: false,
               mode: 'alarm'
           })
       });
       this.textContent = 'ACTIVATION';
   }
   this.style.backgroundColor = (this.textContent === 'ACTIVATION') ? '#ff2e2e' : '#d40000';
});

// Finding Mode 토글 (수정된 부분)
function toggleFindingMode() {
   isFindingMode = !isFindingMode;
   const button = document.getElementById('finding-mode');
   button.textContent = isFindingMode ? 'FINDING MODE [ON]' : 'FINDING MODE [OFF]';
   button.classList.toggle('finding-active', isFindingMode);

   fetch(NETLIFY_FUNCTION_URL, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ 
           buzzer: isFindingMode,
           mode: 'finding'
       })
   });

   if (isFindingMode) {
       findingInterval = setInterval(updateSecurityStatus, 1000);
   } else {
       clearInterval(findingInterval);
   }
}

// 부저 패턴 업데이트 (수정된 부분)
function updateBuzzerPattern(level) {
   fetch(NETLIFY_FUNCTION_URL, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ 
           buzzer: true,
           mode: 'finding',
           pattern: level 
       })
   }).catch(error => console.error('Buzzer pattern error:', error));
}

// 지도 초기화
function initMap() {
  const location = { lat: 36.7065773, lng: 127.4308905 };  
  
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: location
  });
  
  new google.maps.Marker({
      position: location,
      map: map,
      title: "(재단)충북과학기술혁신원 2관"
  });
}

// 위치 찾기
function updateDeviceLocation(map) {
  fetch(GEOLOCATION_API_URL)
      .then(response => response.json())
      .then(data => {
          const location = { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) };
          new google.maps.Marker({ position: location, map: map });
          map.setCenter(location);
      });
}

// 도난 상태 업데이트
function updateTheftStatus(data) {
  const theftStatus = document.getElementById('theft-status');
  if (data.rssi < -85) {
      theftStatus.textContent = "도난 의심";
      theftStatus.className = "status-indicator danger";
  } else {
      theftStatus.textContent = "정상";
      theftStatus.className = "status-indicator warning";
  }
}

// 이벤트 로그 업데이트
function updateEventLog(event) {
  const eventLists = document.querySelectorAll('.event-log ul');
  const timestamp = new Date().toLocaleString();
  const newEvent = `<li>${timestamp} - ${event}</li>`;

  eventLists.forEach(list => {
      list.insertAdjacentHTML('afterbegin', newEvent);

      // 최대 4개 항목만 유지
      const items = list.getElementsByTagName('li');
      while (items.length > 4) {
          list.removeChild(items[items.length - 1]);
      }
  });
}

// 주기적 상태 업데이트
setInterval(updateSecurityStatus, 3000);
