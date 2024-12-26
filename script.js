const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function generatePassword() {
  const passEl = document.getElementById("pass-el");
  const length = parseInt(document.getElementById("lengthInput").value, 10);

  // Get user-selected options using button states
  const includeUpper = document.getElementById("toggleUpper").classList.contains("active");
  const includeLower = document.getElementById("toggleLower").classList.contains("active");
  const includeNumbers = document.getElementById("toggleNumbers").classList.contains("active");
  const includeSymbols = document.getElementById("toggleSymbols").classList.contains("active");

  let finalChars = "";
  if (includeUpper) finalChars += uppercaseChars;
  if (includeLower) finalChars += lowercaseChars;
  if (includeNumbers) finalChars += numberChars;
  if (includeSymbols) finalChars += symbolChars;

  // Ensure at least one character set is selected
  if (finalChars === "") {
    showNotification("Please select at least one character type.", 2000);
    return;
  }

  const password = Array.from({ length }, () => finalChars[Math.floor(Math.random() * finalChars.length)]).join("");
  passEl.textContent = password;
  
  // Show copy button
  const copyButton = document.getElementById("copy-button");
  copyButton.style.display = 'inline-block';

  const strength = calculateStrength(password);
  updateStrengthIndicator(strength);
}

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { level: "Weak", color: "red" };
  if (score <= 4) return { level: "Moderate", color: "orange" };
  if (score <= 6) return { level: "Strong", color: "green" };
}

function updateStrengthIndicator(strength) {
  const strengthBar = document.getElementById("strength-bar");
  const strengthText = document.getElementById("strength-text");
  
  let width;
  switch(strength.level) {
      case "Weak":
          width = 33;
          break;
      case "Moderate":
          width = 66;
          break;
      case "Strong":
          width = 100;
          break;
      default:
          width = 0;
  }

  strengthBar.style.width = `${width}%`;
  strengthBar.style.backgroundColor = strength.color;
  strengthBar.setAttribute('aria-valuenow', width);
  strengthText.textContent = `Strength: ${strength.level}`;
}

function showNotification(message, duration) {
  const notificationContainer = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("custom-notification");
  notificationContainer.appendChild(notification);
  setTimeout(function () {
      notificationContainer.removeChild(notification);
  }, duration);
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeIcon = document.getElementById("modeIcon");
  const moonIcon = document.getElementById("moonIcon");

  // Initialize theme based on current class
  if (body.classList.contains('dark')) {
    modeIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else {
    modeIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }

  function toggleMode() {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        modeIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        modeIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
  }

  moonIcon.addEventListener("click", toggleMode);
  modeIcon.addEventListener("click", toggleMode);

  const lengthInput = document.getElementById("lengthInput");
  const lengthValue = document.getElementById("length-value");

  // Update length display
  lengthValue.textContent = lengthInput.value;
  lengthInput.addEventListener("input", () => {
      lengthValue.textContent = lengthInput.value;
  });

  const generateButton = document.getElementById("generate-button");
  generateButton.addEventListener("click", () => generatePassword());

  // Replace checkbox references with button references
  const toggleUpper = document.getElementById("toggleUpper");
  const toggleLower = document.getElementById("toggleLower");
  const toggleNumbers = document.getElementById("toggleNumbers");
  const toggleSymbols = document.getElementById("toggleSymbols");

  // Add event listeners for toggle buttons
  toggleUpper.addEventListener("click", () => {
      toggleUpper.classList.toggle("active");
  });
  toggleLower.addEventListener("click", () => {
      toggleLower.classList.toggle("active");
  });
  toggleNumbers.addEventListener("click", () => {
      toggleNumbers.classList.toggle("active");
  });
  toggleSymbols.addEventListener("click", () => {
      toggleSymbols.classList.toggle("active");
  });

  const copyButton = document.getElementById("copy-button");
  copyButton.addEventListener("click", () => {
      const passEl = document.getElementById("pass-el").textContent;
      if(passEl) {
          navigator.clipboard.writeText(passEl).then(() => showNotification("Password copied!", 2000));
      }
  });

});
