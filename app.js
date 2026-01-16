
function openSupportModal() {
  document.getElementById("supportModal")?.classList.add("show");
}
function closeSupportModal() {
  document.getElementById("supportModal")?.classList.remove("show");
}
function showNotification(text) {
  const box = document.getElementById("notification");
  if (!box) return;
  box.textContent = text;
  box.classList.add("show");
  clearTimeout(box._t);
  box._t = setTimeout(() => box.classList.remove("show"), 2000);
}
(function () {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  const ctx = new AC();

  function tap(freq = 309, dur = 0.40) {
    if (ctx.state === "suspended") ctx.resume();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const t = ctx.currentTime;

    o.type = "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);

    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  }

  document.addEventListener("click", () => tap(), { passive: true });
})();

// ===== DASHBOARD LOCK / UNLOCK =====
(function () {
  const dash = document.getElementById("dashboard");
  if (!dash) return;

  function lock() {
    dash.classList.add("hidden-content");
  }

  function unlock() {
    dash.classList.remove("hidden-content");
  }

  
  lock();


  window.addEventListener("Zeus", (e) => {
    const state = e.detail?.state;
    const data = e.detail?.data || {};

    if (state === "verified" || state === "activated") {
      unlock();
      showNotification("✔ Key hợp lệ – Đã Kích Hoạt PANEL AIMBOT");
    } else {
      lock();
      showNotification("🔒 Chưa kích hoạt hoặc key không hợp lệ");
    }

    // Optional: log hạn key
    if (data.expiresAt) {
      console.log("KEY EXPIRE:", new Date(data.expiresAt));
    }
  });
})();

// ===== FEATURE TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-switch input").forEach((input) => {
    input.addEventListener("change", () => {
      const name =
        input.closest(".feature")?.querySelector(".feature-name")?.innerText ||
        "Feature";
      showNotification(`${name}: ${input.checked ? "ON" : "OFF"}`);
    });
  });
});