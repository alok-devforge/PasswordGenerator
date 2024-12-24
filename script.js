const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function generatePassword() {
  const passEl = document.getElementById("pass-el");
  const length = parseInt(document.getElementById("lengthInput").value, 10);

  // Get user-selected options
  const includeUpper = document.getElementById("includeUpper").checked;
  const includeLower = document.getElementById("includeLower").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSymbols = document.getElementById("includeSymbols").checked;

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
  navigator.clipboard.writeText(password).then(() => showNotification("Password copied!", 2000));
  
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
  
  strengthBar.style.width = `${(strength.level === "Weak" ? 33 : strength.level === "Moderate" ? 66 : 100)}%`;
  strengthBar.style.backgroundColor = strength.color;
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

});