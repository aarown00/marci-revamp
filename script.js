document.addEventListener("DOMContentLoaded", () => {

  // ===== Navbar scroll effect =====
  const nav = document.querySelector('.custom-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 50);
    });
  }

  // ===== Schedule display =====
  const schedule = {
    1: "8:00 AM – 7:00 PM", // Monday
    2: "8:00 AM – 7:00 PM", // Tuesday
    3: "8:00 AM – 7:00 PM", // Wednesday
    4: "8:00 AM – 7:00 PM", // Thursday
    5: "8:00 AM – 7:00 PM", // Friday
    6: "8:00 AM – 7:00 PM", // Saturday
    0: "Closed"             // Sunday
  };

  const today = new Date().getDay();
  const todayHours = document.getElementById("today-hours");
  const scheduleList = document.querySelectorAll("#full-schedule li");

  if (todayHours) {
    todayHours.textContent = schedule[today];
  }

  // ===== Highlight today's entry in dropdown =====
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  scheduleList.forEach((item) => {
    const dayLabel = item.querySelector("strong");
    if (dayLabel && dayLabel.textContent.trim() === dayNames[today]) {
      item.style.fontWeight = "700";
      item.style.backgroundColor = "#f9f5f1"; // soft warm tint
      dayLabel.style.color = "rgb(143, 110, 110)";
    }
  });

  // ===== Dropdown toggle =====
  const toggleBtn = document.getElementById("toggle-hours");
  const dropdown = document.getElementById("full-schedule");

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent click from closing instantly
      const isVisible = dropdown.style.display === "block";
      dropdown.style.display = isVisible ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== toggleBtn) {
        dropdown.style.display = "none";
      }
    });
  }
});

/* Cookie Banner with localStorage + fade effect */

function showCookieBanner() {
  const cookieBanner = document.getElementById("cb-cookie-banner");
  cookieBanner.classList.add("show");
}

function hideCookieBanner() {
  const cookieBanner = document.getElementById("cb-cookie-banner");
  cookieBanner.classList.add("hide");
  
  // Save preference
  localStorage.setItem("cb_isCookieAccepted", "yes");
  
  // Remove after fade-out transition
  setTimeout(() => {
    cookieBanner.style.display = "none";
  }, 400);
}

function initializeCookieBanner() {
  const isCookieAccepted = localStorage.getItem("cb_isCookieAccepted");
  if (!isCookieAccepted || isCookieAccepted === "no") {
    showCookieBanner();
  }
}

window.onload = initializeCookieBanner;
window.cb_hideCookieBanner = hideCookieBanner;

