let currentStep = 1;
let selectedTheme = null;
let selectedAddons = [];

const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const themeGrid = document.getElementById("themeGrid");
const addonGrid = document.getElementById("addonGrid");

const selectedThemeName = document.getElementById("selectedThemeName");
const selectedThemeEmoji = document.getElementById("selectedThemeEmoji");

const giftBox = document.getElementById("giftBox");
const finalGiftBox = document.getElementById("finalGiftBox");

const addonCount = document.getElementById("addonCount");
const packingText = document.getElementById("packingText");
const packingBar = document.getElementById("packingBar");
const packingPercent = document.getElementById("packingPercent");

const finalThemeName = document.getElementById("finalThemeName");
const finalAddonList = document.getElementById("finalAddonList");
const notionLink = document.getElementById("notionLink");

const totalSteps = 5;


/* =========================================
   STEP SYSTEM
========================================= */

function showStep(stepNumber) {
  currentStep = stepNumber;

  steps.forEach((step) => {
    step.classList.toggle(
      "active",
      Number(step.dataset.step) === stepNumber
    );
  });

  const progress = (stepNumber / totalSteps) * 100;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (progressText) {
    progressText.textContent = `${stepNumber} / ${totalSteps}`;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================
   THEME CARDS
========================================= */

function renderThemes() {
  if (!themeGrid) return;

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
        alt="${theme.name} School Space preview"
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
            ${theme.description}
          </span>
        </div>

        <span class="theme-emoji">
          ${theme.emoji}
        </span>
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
  const theme = themes[themeKey];

  if (!theme) return;

  selectedTheme = themeKey;

  document.querySelectorAll(".theme-card").forEach((card) => {
    card.classList.toggle(
      "selected",
      card.dataset.theme === themeKey
    );
  });

  applyTheme(theme);

  if (selectedThemeName) {
    selectedThemeName.textContent = theme.name;
  }

  if (selectedThemeEmoji) {
    selectedThemeEmoji.textContent = theme.emoji;
  }

  if (giftBox) {
    giftBox.src = theme.giftBox;
  }

  if (finalGiftBox) {
    finalGiftBox.src = theme.giftBox;
  }
}


/* =========================================
   APPLY THEME COLORS
========================================= */

function applyTheme(theme) {
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
}


/* =========================================
   ADD-ONS
========================================= */

const addons = [
  {
    id: "motivation",
    title: "motivation image pack",
    kicker: "free extra",
    description:
      "20 aesthetic school motivation images for your dashboards, wallpapers + inspo boards.",
    file:
      "my school space motivation"
  },

  {
    id: "icons",
    title: "digitalguru icon pack",
    kicker: "free extra",
    description:
      "a cute collection of icons to decorate your School Space and make it yours.",
    file:
      "my school space iconpack"
  },

  {
    id: "banners",
    title: "school banner pack",
    kicker: "free extra",
    description:
      "20 matching banners for course pages, dashboards, notes + more.",
    file:
      "my school space banners"
  }
];


function renderAddons() {
  if (!addonGrid) return;

  addonGrid.innerHTML = "";

  addons.forEach((addon) => {
    const label = document.createElement("label");

    label.className = "addon-card";

    label.innerHTML = `
      <input
        type="checkbox"
        value="${addon.id}"
      />

      <span class="addon-check">
        ✓
      </span>

      <span class="addon-content">

        <span class="addon-kicker">
          ${addon.kicker}
        </span>

        <h3>
          ${addon.title}
        </h3>

        <p>
          ${addon.description}
        </p>

        <span class="addon-file">
          ${addon.file}
        </span>

      </span>
    `;

    const checkbox = label.querySelector("input");

    checkbox.addEventListener("change", updateAddons);

    addonGrid.appendChild(label);
  });
}


function updateAddons() {
  selectedAddons = Array.from(
    document.querySelectorAll(
      '#addonGrid input[type="checkbox"]:checked'
    )
  ).map((input) => input.value);

  if (addonCount) {
    addonCount.textContent =
      `${selectedAddons.length} selected`;
  }
}


/* =========================================
   FINAL SUMMARY
========================================= */

function buildFinalSummary() {
  if (!selectedTheme) return;

  const theme = themes[selectedTheme];

  if (finalThemeName) {
    finalThemeName.textContent =
      `${theme.emoji} ${theme.name}`;
  }

  if (finalGiftBox) {
    finalGiftBox.src = theme.giftBox;
  }

  if (notionLink) {
    notionLink.href = theme.notionLink;
  }

  if (finalAddonList) {
    finalAddonList.innerHTML = "";

    if (selectedAddons.length === 0) {
      finalAddonList.innerHTML = `
        <span>no extras selected</span>
      `;
      return;
    }

    selectedAddons.forEach((addonId) => {
      const addon = addons.find(
        (item) => item.id === addonId
      );

      if (!addon) return;

      const item = document.createElement("span");

      item.textContent =
        `♡ ${addon.title}`;

      finalAddonList.appendChild(item);
    });
  }
}


/* =========================================
   PACKING ANIMATION
========================================= */

function startPacking() {
  showStep(4);

  let progress = 0;

  if (packingBar) {
    packingBar.style.width = "0%";
  }

  if (packingPercent) {
    packingPercent.textContent = "0%";
  }

  const messages = [
    "choosing your theme...",
    "folding your dashboard...",
    "adding your cute extras...",
    "wrapping everything up...",
    "adding a tiny DigitalGuru sparkle...",
    "your School Space is ready ♡"
  ];

  let messageIndex = 0;

  if (packingText) {
    packingText.textContent = messages[0];
  }

  const interval = setInterval(() => {
    progress += 2;

    if (packingBar) {
      packingBar.style.width = `${progress}%`;
    }

    if (packingPercent) {
      packingPercent.textContent = `${progress}%`;
    }

    const newMessageIndex = Math.min(
      Math.floor(progress / 20),
      messages.length - 1
    );

    if (newMessageIndex !== messageIndex) {
      messageIndex = newMessageIndex;

      if (packingText) {
        packingText.textContent =
          messages[messageIndex];
      }
    }

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        buildFinalSummary();
        showStep(5);
      }, 650);
    }
  }, 55);
}


/* =========================================
   BUTTON EVENTS
========================================= */

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextStep = Number(button.dataset.next);

    if (nextStep === 2) {
      showStep(2);
      return;
    }

    if (nextStep === 3) {
      if (!selectedTheme) {
        alert("pick your vibe first ♡");
        return;
      }

      showStep(3);
      return;
    }

    if (nextStep === 4) {
      startPacking();
      return;
    }

    if (nextStep === 5) {
      buildFinalSummary();
      showStep(5);
    }
  });
});


document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => {
    const previousStep = Number(button.dataset.back);

    showStep(previousStep);
  });
});


/* =========================================
   START OVER
========================================= */

const restartButton =
  document.getElementById("restartButton");

if (restartButton) {
  restartButton.addEventListener("click", () => {
    selectedTheme = null;
    selectedAddons = [];

    document.querySelectorAll(
      ".theme-card"
    ).forEach((card) => {
      card.classList.remove("selected");
    });

    document.querySelectorAll(
      '#addonGrid input[type="checkbox"]'
    ).forEach((checkbox) => {
      checkbox.checked = false;
    });

    updateAddons();

    showStep(1);

    if (giftBox) {
      giftBox.src =
        "assets/gift-box-pinkyru.png";
    }

    if (finalGiftBox) {
      finalGiftBox.src =
        "assets/gift-box-pinkyru.png";
    }
  });
}


/* =========================================
   INITIALIZE
========================================= */

renderThemes();
renderAddons();
showStep(1);
