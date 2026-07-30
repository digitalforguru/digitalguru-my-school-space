let currentStep = 1;
let selectedTheme = null;
let selectedAddons = [];

const stepElements = {
  1: document.getElementById("welcomeStep"),
  2: document.getElementById("themeStep"),
  3: document.getElementById("addonsStep"),
  4: document.getElementById("packingStep"),
  5: document.getElementById("finalStep")
};

const downloadList =
  document.getElementById("downloadList");

const progressBar = document.getElementById("progressBar");
const stepLabel = document.getElementById("stepLabel");
const stepName = document.getElementById("stepName");

const themeGrid = document.getElementById("themeGrid");
const selectedThemeName = document.getElementById("selectedThemeName");
const selectedThemeEmoji = document.getElementById("selectedThemeEmoji");

const giftBox = document.getElementById("giftBox");
const finalGiftBox = document.getElementById("finalGiftBox");
const addonGiftBox =
  document.getElementById("addonGiftBox");

const packingMessage = document.getElementById("packingMessage");
const packingBar = document.getElementById("packingBar");
const packingPercent = document.getElementById("packingPercent");

const finalTheme = document.getElementById("finalTheme");
const finalAddons = document.getElementById("finalAddons");
const openWorkspaceBtn =
  document.getElementById("openWorkspaceBtn");

const stepNames = {
  1: "welcome",
  2: "your vibe",
  3: "your little box",
  4: "packing",
  5: "ready"
};


/* =========================================
   STEP NAVIGATION
========================================= */

function showStep(stepNumber) {
  currentStep = stepNumber;

  Object.entries(stepElements).forEach(([number, element]) => {
    element.classList.toggle(
      "active",
      Number(number) === stepNumber
    );
  });

  const progress = ((stepNumber - 1) / 4) * 100;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (stepLabel) {
    stepLabel.textContent =
      `${String(stepNumber).padStart(2, "0")} / 04`;
  }

  if (stepName) {
    stepName.textContent = stepNames[stepNumber];
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================
   THEME LIBRARY
========================================= */

function renderThemes() {
  if (!themeGrid || typeof themes === "undefined") {
    console.error("Themes could not be loaded.");
    return;
  }

  themeGrid.innerHTML = "";

  Object.entries(themes).forEach(([key, theme]) => {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "theme-card";
    card.dataset.theme = key;

    card.innerHTML = `
      <img
        class="theme-preview"
        src="${theme.dashboard}"
        alt="${theme.name} School Space"
      />

      <span class="theme-selected">
        selected ♡
      </span>

      <div class="theme-bottom">

        <div class="theme-name">

          <span class="theme-title">
            ${theme.name}
          </span>

          <span class="theme-description">
            ${theme.description || ""}
          </span>

        </div>

        <!-- NEW: YOUR CUSTOM THEME ICON -->
        <img
          class="theme-icon"
          src="${theme.icon}"
          alt=""
        />

      </div>
    `;

    card.addEventListener("click", () => {
      selectTheme(key);
    });

    themeGrid.appendChild(card);
  });
}


/* =========================================
   SELECT THEME
========================================= */

function selectTheme(themeKey) {
  if (!themes[themeKey]) return;

  selectedTheme = themeKey;

  const theme = themes[themeKey];

  document.querySelectorAll(".theme-card").forEach((card) => {
    card.classList.toggle(
      "selected",
      card.dataset.theme === themeKey
    );
  });

  if (selectedThemeName) {
    selectedThemeName.textContent = theme.name;
  }

  /*
    NEW:
    We are no longer using the emoji as the visual.
    The selected-theme area will be upgraded in
    the HTML/CSS next so it can display your icon.
  */

  if (selectedThemeEmoji) {
    selectedThemeEmoji.innerHTML = `
      <img
        src="${theme.icon}"
        alt=""
        class="selected-theme-icon"
      />
    `;
  }

  if (giftBox) {
    giftBox.src = theme.giftBox;
  }

  if (finalGiftBox) {
    finalGiftBox.src = theme.giftBox;
  }

  if (addonGiftBox) {
    addonGiftBox.src = theme.giftBox;
  }

  if (openWorkspaceBtn && theme.notionLink) {
    openWorkspaceBtn.href = theme.notionLink;
  }

  applyTheme(theme);
}


/* =========================================
   THEME COLORS
========================================= */

function applyTheme(theme) {
  if (!theme.colors) return;

  const root = document.documentElement;

  root.style.setProperty(
    "--accent",
    theme.colors.accent
  );

  root.style.setProperty(
    "--accent-light",
    theme.colors.accentLight
  );

  root.style.setProperty(
    "--border",
    theme.colors.border
  );

  root.style.setProperty(
    "--text",
    theme.colors.text
  );

  root.style.setProperty(
    "--page-background",
    theme.colors.background
  );

  root.style.setProperty(
    "--page-glow",
    theme.colors.glow
  );
}


/* =========================================
   ADD-ONS
========================================= */

function updateAddons() {
  selectedAddons = Array.from(
    document.querySelectorAll(
      '#addonsStep input[name="addon"]:checked'
    )
  ).map((input) => input.value);
}


/* =========================================
   DOWNLOADS
========================================= */

const downloadLinks = {
  icons:
    "https://github.com/digitalforguru/digitalguru-my-school-space/releases/download/v1.0.0/my.school.space.iconpack.zip",

  banners:
    "https://github.com/digitalforguru/digitalguru-my-school-space/releases/download/v1.0.0/my.school.space.banners.zip",

  motivation:
    "https://github.com/digitalforguru/digitalguru-my-school-space/releases/download/v1.0.0/my.school.space.motivation.zip"
};

const downloadNames = {
  icons: "icon collection",
  banners: "banner collection",
  motivation: "motivation pack"
};

function buildDownloadList() {
  if (!downloadList) return;

  downloadList.innerHTML = "";

  if (selectedAddons.length === 0) {
    downloadList.innerHTML = `
      <p class="no-downloads">
        no extras this time ♡
      </p>
    `;

    return;
  }

  selectedAddons.forEach((addon) => {
    const link = downloadLinks[addon];

    if (!link) return;

    const button = document.createElement("a");

    button.className = "download-card";
    button.href = link;
    button.download = "";
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    button.innerHTML = `
      <span>
        ♡ ${downloadNames[addon]}
      </span>

      <strong>
        download ↓
      </strong>
    `;

    downloadList.appendChild(button);
  });
}


/* =========================================
   FINAL RECEIPT
========================================= */

function buildFinalReceipt() {
  if (!selectedTheme || !themes[selectedTheme]) return;

  const theme = themes[selectedTheme];

  if (finalTheme) {
    /*
      NEW:
      Use the theme icon instead of the iPhone emoji.
    */
    finalTheme.innerHTML = `
      <span class="final-theme-value">
        <img
          src="${theme.icon}"
          alt=""
          class="final-theme-icon"
        />
        ${theme.name}
      </span>
    `;
  }

  if (finalAddons) {
    if (selectedAddons.length === 0) {
      finalAddons.textContent = "none";
    } else {
      const addonNames = {
        icons: "icon collection",
        banners: "banner collection",
        motivation: "motivation pack",
        surprise: "surprise freebie"
      };

      finalAddons.textContent =
        selectedAddons
          .map((addon) => addonNames[addon] || addon)
          .join(" + ");
    }
  }

  if (finalGiftBox) {
    finalGiftBox.src = theme.giftBox;
  }

  if (openWorkspaceBtn) {
    openWorkspaceBtn.href =
      theme.notionLink || "#";
  }

  buildDownloadList();
}


/* =========================================
   PACKING ANIMATION
========================================= */

function startPacking() {
  showStep(4);

  let progress = 0;

  const messages = [
    "picking your theme...",
    "folding your dashboard...",
    "adding your goodies...",
    "wrapping everything up...",
    "adding a tiny DigitalGuru sparkle...",
    "your School Space is ready ♡"
  ];

  if (packingBar) {
    packingBar.style.width = "0%";
  }

  if (packingPercent) {
    packingPercent.textContent = "0%";
  }

  if (packingMessage) {
    packingMessage.textContent = messages[0];
  }

  const interval = setInterval(() => {
    progress += 2;

    if (packingBar) {
      packingBar.style.width = `${progress}%`;
    }

    if (packingPercent) {
      packingPercent.textContent = `${progress}%`;
    }

    const messageIndex = Math.min(
      Math.floor(progress / 20),
      messages.length - 1
    );

    if (packingMessage) {
      packingMessage.textContent =
        messages[messageIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        buildFinalReceipt();
        showStep(5);
      }, 650);
    }
  }, 55);
}


/* =========================================
   WELCOME → THEME
========================================= */

const startBtn =
  document.getElementById("startBtn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    showStep(2);
  });
}


/* =========================================
   THEME BUTTONS
========================================= */

const backToWelcome =
  document.getElementById("backToWelcome");

if (backToWelcome) {
  backToWelcome.addEventListener("click", () => {
    showStep(1);
  });
}


const continueThemeBtn =
  document.getElementById("continueThemeBtn");

if (continueThemeBtn) {
  continueThemeBtn.addEventListener("click", () => {
    if (!selectedTheme) return;

    showStep(3);
  });
}


/* =========================================
   THEME SELECTION ENABLES CONTINUE
========================================= */

const originalSelectTheme = selectTheme;

selectTheme = function(themeKey) {
  originalSelectTheme(themeKey);

  if (continueThemeBtn) {
    continueThemeBtn.disabled = false;
  }
};


/* =========================================
   ADD-ON CHECKBOXES
========================================= */

document
  .querySelectorAll('#addonsStep input[name="addon"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", updateAddons);
  });


/* =========================================
   BACK TO THEMES
========================================= */

const backToThemes =
  document.getElementById("backToThemes");

if (backToThemes) {
  backToThemes.addEventListener("click", () => {
    showStep(2);
  });
}


/* =========================================
   PACK MY BOX
========================================= */

const buildBtn =
  document.getElementById("buildBtn");

if (buildBtn) {
  buildBtn.addEventListener("click", () => {
    updateAddons();
    startPacking();
  });
}


/* =========================================
   RESTART
========================================= */

const restartBtn =
  document.getElementById("restartBtn");

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    selectedTheme = null;
    selectedAddons = [];

    document
      .querySelectorAll('#addonsStep input[name="addon"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    if (continueThemeBtn) {
      continueThemeBtn.disabled = true;
    }

    document
      .querySelectorAll(".theme-card")
      .forEach((card) => {
        card.classList.remove("selected");
      });

    showStep(1);
  });
}


/* =========================================
   START
========================================= */

renderThemes();
showStep(1);
