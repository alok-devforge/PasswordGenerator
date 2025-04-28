const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Maximum number of passwords to store in history
const MAX_HISTORY_ITEMS = 5;

// Generate password based on selected options
function generatePassword() {
  const passEl = document.getElementById("pass-el");
  const length = parseInt(document.getElementById("lengthInput").value, 10);

  // Get user-selected options using button states
  const includeUpper = document
    .getElementById("toggleUpper")
    .classList.contains("active");
  const includeLower = document
    .getElementById("toggleLower")
    .classList.contains("active");
  const includeNumbers = document
    .getElementById("toggleNumbers")
    .classList.contains("active");
  const includeSymbols = document
    .getElementById("toggleSymbols")
    .classList.contains("active");

  // Build character set based on options
  let finalChars = "";
  if (includeUpper) finalChars += uppercaseChars;
  if (includeLower) finalChars += lowercaseChars;
  if (includeNumbers) finalChars += numberChars;
  if (includeSymbols) finalChars += symbolChars;

  // Ensure at least one character set is selected
  if (finalChars === "") {
    showNotification("Please select at least one character type", 2000);
    return;
  }

  // Generate the password
  const password = Array.from(
    { length },
    () => finalChars[Math.floor(Math.random() * finalChars.length)]
  ).join("");

  // Display the password
  passEl.textContent = password;

  // Show action buttons
  const copyButton = document.getElementById("copy-button");
  const refreshButton = document.getElementById("refresh-button");
  copyButton.classList.remove("hidden");
  refreshButton.classList.remove("hidden");

  // Evaluate and display password strength
  const strength = calculateStrength(password);
  updateStrengthIndicator(strength);

  // Add to password history
  addToPasswordHistory(password);
}

// Calculate password strength with detailed criteria
function calculateStrength(password) {
  let score = 0;
  let details = [];

  // Length criteria
  if (password.length >= 8) {
    score += 1;
    details.push("8+ characters");
  }
  if (password.length >= 12) {
    score += 1;
    details.push("12+ characters");
  }
  if (password.length >= 16) {
    score += 1;
    details.push("16+ characters");
  }

  // Character type criteria
  if (/[A-Z]/.test(password)) {
    score += 1;
    details.push("uppercase letters");
  }
  if (/[a-z]/.test(password)) {
    score += 1;
    details.push("lowercase letters");
  }
  if (/[0-9]/.test(password)) {
    score += 1;
    details.push("numbers");
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
    details.push("special characters");
  }

  // Calculate level based on score
  let level, color;
  if (score <= 3) {
    level = "Weak";
    color = "#ef4444"; // Red
  } else if (score <= 5) {
    level = "Moderate";
    color = "#f59e0b"; // Amber
  } else {
    level = "Strong";
    color = "#10b981"; // Green
  }

  return { level, color, score, details };
}

// Update the visual strength indicator
function updateStrengthIndicator(strength) {
  const strengthBar = document.getElementById("strength-bar");
  const strengthText = document.getElementById("strength-text");

  // Update the strength text
  strengthText.textContent = `Strength: ${strength.level}`;
  strengthText.title = `Score: ${
    strength.score
  }/7 - Features: ${strength.details.join(", ")}`;

  // Calculate width percentage based on score
  let width;
  switch (strength.level) {
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

  // Update the strength bar
  strengthBar.style.width = `${width}%`;
  strengthBar.style.backgroundColor = strength.color;
  strengthBar.setAttribute("aria-valuenow", width);
}

// Display notification
function showNotification(message, duration) {
  const notificationContainer = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add(
    "custom-notification", 
    "py-2", 
    "px-4", 
    "rounded-md", 
    "shadow-md",
    "text-center", 
    "text-sm",
    "bg-white",
    "dark:bg-gray-800",
    "border",
    "border-gray-200",
    "dark:border-gray-700",
    "max-w-xs",
    "mx-auto"
  );

  notificationContainer.appendChild(notification);

  setTimeout(function () {
    notificationContainer.removeChild(notification);
  }, duration);
}

// Copy password to clipboard
function copyToClipboard() {
  const passEl = document.getElementById("pass-el").textContent;
  if (passEl) {
    navigator.clipboard
      .writeText(passEl)
      .then(() => {
        showNotification("Password copied to clipboard", 2000);

        // Add visual feedback
        const copyButton = document.getElementById("copy-button");
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 1000);
      })
      .catch((err) => {
        showNotification("Failed to copy password", 2000);
      });
  }
}

// Add password to history
function addToPasswordHistory(password) {
  if (!password) return;

  // Get stored passwords
  let passwordHistory = JSON.parse(
    localStorage.getItem("passwordHistory") || "[]"
  );

  // Check if this password is already in history
  if (passwordHistory.includes(password)) {
    // Move it to the top (most recent)
    passwordHistory = passwordHistory.filter((p) => p !== password);
  }

  // Add new password to the beginning
  passwordHistory.unshift(password);

  // Limit history size
  if (passwordHistory.length > MAX_HISTORY_ITEMS) {
    passwordHistory = passwordHistory.slice(0, MAX_HISTORY_ITEMS);
  }

  // Save updated history
  localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory));

  // Update the UI
  displayPasswordHistory();
}

// Display password history in UI
function displayPasswordHistory() {
  const historyContainer = document.getElementById("password-history");
  historyContainer.innerHTML = "";

  const passwordHistory = JSON.parse(
    localStorage.getItem("passwordHistory") || "[]"
  );

  if (passwordHistory.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No passwords generated yet";
    emptyMessage.className =
      "text-gray-400 dark:text-gray-500 text-center py-2 text-xs italic";
    historyContainer.appendChild(emptyMessage);
    return;
  }

  passwordHistory.forEach((password) => {
    const historyItem = document.createElement("div");
    historyItem.className =
      "flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0";

    // Truncate long passwords
    const truncatedPassword =
      password.length > 20 ? password.substring(0, 20) + "..." : password;

    const passwordText = document.createElement("span");
    passwordText.textContent = truncatedPassword;
    passwordText.className = "font-mono text-xs";

    const actionButtons = document.createElement("div");
    actionButtons.className = "flex gap-2";

    const useButton = document.createElement("button");
    useButton.innerHTML = '<i class="fas fa-arrow-up text-xs"></i>';
    useButton.className =
      "text-primary-DEFAULT dark:text-primary-light hover:text-primary-dark";
    useButton.title = "Use this password";
    useButton.addEventListener("click", () => {
      // Set the password and trigger strength calculation
      document.getElementById("pass-el").textContent = password;

      // Evaluate and display strength
      const strength = calculateStrength(password);
      updateStrengthIndicator(strength);

      // Show action buttons
      document.getElementById("copy-button").classList.remove("hidden");
      document.getElementById("refresh-button").classList.remove("hidden");
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-times text-xs"></i>';
    deleteButton.className = "text-gray-400 hover:text-red-500";
    deleteButton.title = "Remove from history";
    deleteButton.addEventListener("click", () => {
      // Remove password from history
      const updatedHistory = JSON.parse(
        localStorage.getItem("passwordHistory") || "[]"
      ).filter((p) => p !== password);
      localStorage.setItem("passwordHistory", JSON.stringify(updatedHistory));

      // Update display
      displayPasswordHistory();
    });

    actionButtons.appendChild(useButton);
    actionButtons.appendChild(deleteButton);

    historyItem.appendChild(passwordText);
    historyItem.appendChild(actionButtons);

    historyContainer.appendChild(historyItem);
  });
}

// Clear all password history
function clearPasswordHistory() {
  localStorage.removeItem("passwordHistory");
  displayPasswordHistory();
  showNotification("Password history cleared", 2000);
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Toggle theme between light and dark mode
  const themeToggle = document.getElementById("theme-toggle");
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme based on user preference
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  }

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });

  // Update length display when slider changes
  const lengthInput = document.getElementById("lengthInput");
  const lengthValue = document.getElementById("length-value");

  lengthValue.textContent = lengthInput.value;
  lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
  });

  // Setup toggle buttons for character types
  const toggleButtons = [
    document.getElementById("toggleUpper"),
    document.getElementById("toggleLower"),
    document.getElementById("toggleNumbers"),
    document.getElementById("toggleSymbols"),
  ];

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      button.setAttribute("aria-pressed", button.classList.contains("active"));
    });
  });

  // Setup action buttons
  const generateButton = document.getElementById("generate-button");
  const copyButton = document.getElementById("copy-button");
  const refreshButton = document.getElementById("refresh-button");
  const clearHistoryButton = document.getElementById("clear-history");

  generateButton.addEventListener("click", generatePassword);
  copyButton.addEventListener("click", copyToClipboard);
  refreshButton.addEventListener("click", generatePassword);
  clearHistoryButton.addEventListener("click", clearPasswordHistory);

  // Load and display saved password history
  displayPasswordHistory();
});