// Backend API adresi. Sunucuya deploy edildiğinde bu domain kullanılacak.
const BACKEND_URL = "https://aziz-backend.team-vit-devops.nl";

const checkBtn = document.getElementById("checkBtn");
const resultBox = document.getElementById("result");
const versionInfo = document.getElementById("versionInfo");

function setResult(state, html) {
  resultBox.className = `result result--${state}`;
  resultBox.innerHTML = html;
}

async function checkBackend() {
  checkBtn.disabled = true;
  setResult("loading", "<span class='result__label'>İstek atılıyor...</span>");

  try {
    const res = await fetch(`${BACKEND_URL}/api/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    setResult(
      "ok",
      `<span class="result__label">✅ Backend'e ulaşıldı</span><pre>${JSON.stringify(data, null, 2)}</pre>`
    );
  } catch (err) {
    setResult(
      "error",
      `<span class="result__label">❌ Backend'e ulaşılamadı</span><pre>${err.message}</pre>`
    );
  } finally {
    checkBtn.disabled = false;
  }
}

async function loadVersionInfo() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/info`);
    const data = await res.json();
    versionInfo.textContent = `${data.application} — v${data.version} (${data.environment})`;
  } catch (err) {
    versionInfo.textContent = "Versiyon bilgisi alınamadı (backend'e ulaşılamıyor).";
  }
}

checkBtn.addEventListener("click", checkBackend);

// Sayfa yüklendiğinde backend bilgi endpoint'ini otomatik çek
loadVersionInfo();
