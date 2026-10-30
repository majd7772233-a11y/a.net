/* Al-Ghaith Net: local UI behavior only. No hotspot requests live in this file. */
(function (window, document) {
  "use strict";

  /* Capture helpers exported by hotBlocker/hotCookie before main.min.js
     declares same-named globals later in the page. */
  var originalCookieReader = typeof window.getCookieOrNull === "function"
    ? window.getCookieOrNull
    : null;
  var originalClearCookies = typeof window.clearCookies === "function"
    ? window.clearCookies
    : null;

  var STORAGE_KEYS = {
    reminder: "dataUsageReminder",
    legacyReminder: ["updatesDisabled", "autoUpdateState", "autoUpdateSetting"],
    speed: "selectedSpeed",
    friday: "alGhaithFridayGreeting"
  };

  var SPEED_VALUES = ["1024K/2048k", "2048K/4096k", "4096K/8192k", "64M/64M"];
  var loadingInterval = null;
  var activeAlert = null;
  var initialized = false;
  var loadingTexts = [
    "جارٍ التحقق من رقم الكرت…",
    "جارٍ انتظار استجابة الشبكة…"
  ];

  function getElement(id) {
    return document.getElementById(id);
  }

  function safeStorageGet(key) {
    try {
      return window.localStorage ? window.localStorage.getItem(key) : null;
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(key, String(value));
        return true;
      }
    } catch (error) {
      // Private browsing and captive-portal storage restrictions are non-fatal.
    }
    return false;
  }

  function safeStorageRemove(key) {
    try {
      if (window.localStorage) window.localStorage.removeItem(key);
    } catch (error) {
      // Ignore unavailable local storage.
    }
  }

  function readReminderPreference() {
    var current = safeStorageGet(STORAGE_KEYS.reminder);
    if (current === "true") return true;
    if (current === "false") return false;

    for (var i = 0; i < STORAGE_KEYS.legacyReminder.length; i += 1) {
      var legacy = safeStorageGet(STORAGE_KEYS.legacyReminder[i]);
      if (legacy === "1" || legacy === "true") {
        safeStorageSet(STORAGE_KEYS.reminder, true);
        return true;
      }
      if (legacy === "0" || legacy === "false") {
        safeStorageSet(STORAGE_KEYS.reminder, false);
        return false;
      }
    }

    return false;
  }

  function updateReminderStatus(enabled) {
    var status = getElement("updateStatus");
    if (status) status.textContent = enabled ? "التفضيل مفعّل" : "التفضيل متوقف";

    var summary = getElement("reminderPreferenceStatus");
    if (summary) {
      summary.textContent = enabled
        ? "تم حفظ تفضيلك محلياً في هذا المتصفح."
        : "التفضيل غير مفعّل.";
    }
  }

  function setReminderPreference(enabled, persist) {
    var toggle = getElement("remember");
    var selector = getElement("remember-select");

    enabled = Boolean(enabled);
    if (toggle) toggle.checked = enabled;

    if (selector) {
      selector.value = enabled ? "choose-auto-update-off" : "no";
    }

    updateReminderStatus(enabled);
    if (persist) safeStorageSet(STORAGE_KEYS.reminder, enabled);
  }

  function updateSpeedStatus(value) {
    var speedSelect = getElement("speed");
    var status = getElement("speedStatus");
    if (!speedSelect || !status) return;

    var selectedOption = null;
    for (var i = 0; i < speedSelect.options.length; i += 1) {
      if (speedSelect.options[i].value === value && value !== "") {
        selectedOption = speedSelect.options[i];
        break;
      }
    }

    status.textContent = selectedOption
      ? "السرعة المختارة: " + selectedOption.textContent.trim()
      : "اختر السرعة التي تناسب استخدامك";
  }

  function storeSelectedSpeed(value) {
    if (SPEED_VALUES.indexOf(value) === -1) {
      safeStorageRemove(STORAGE_KEYS.speed);
      return;
    }
    safeStorageSet(STORAGE_KEYS.speed, value);
  }

  function restoreSelectedSpeed() {
    var speedSelect = getElement("speed");
    if (!speedSelect) return;

    var saved = safeStorageGet(STORAGE_KEYS.speed);
    if (!saved) {
      updateSpeedStatus("");
      return;
    }

    var matched = false;
    for (var i = 0; i < speedSelect.options.length; i += 1) {
      var option = speedSelect.options[i];
      if (option.value === saved || option.textContent.trim() === saved) {
        if (SPEED_VALUES.indexOf(option.value) !== -1) {
          speedSelect.value = option.value;
          safeStorageSet(STORAGE_KEYS.speed, option.value);
          updateSpeedStatus(option.value);
          matched = true;
        }
        break;
      }
    }

    if (!matched) {
      safeStorageRemove(STORAGE_KEYS.speed);
      updateSpeedStatus("");
    }
  }

  function checkSpeed(value) {
    var messages = {
      "4096K/8192k": "سرعة 8 ميجا مناسبة للتصفح السريع، لكن تنزيل الملفات الكبيرة ومشاهدة الفيديو بجودة عالية قد يستهلكان رصيدك بصورة أسرع.",
      "64M/64M": "هذه أعلى سرعة متاحة في القائمة. قد تُنهي تنزيلات الملفات ومشاهدة الفيديو عالي الجودة رصيدك بسرعة أكبر."
    };

    if (!messages[value] || typeof window.swal !== "function") return;

    window.swal({
      title: "تنبيه حول استهلاك البيانات",
      text: messages[value],
      confirmText: "فهمت"
    });
  }

  function doLogi() {
    var speedSelect = getElement("speed");
    if (!speedSelect) return;

    var value = speedSelect.value;
    updateSpeedStatus(value);
    storeSelectedSpeed(value);

    if (SPEED_VALUES.indexOf(value) !== -1) checkSpeed(value);
  }

  function closeActiveAlert(restoreFocus) {
    if (!activeAlert) return;

    var current = activeAlert;
    activeAlert = null;

    document.removeEventListener("keydown", current.keyHandler, true);
    if (current.overlay.parentNode) {
      current.overlay.parentNode.removeChild(current.overlay);
    }

    if (restoreFocus !== false && current.previousFocus &&
        current.previousFocus.isConnected &&
        typeof current.previousFocus.focus === "function") {
      current.previousFocus.focus();
    }
  }

  function swal(options) {
    options = options || {};
    closeActiveAlert(false);

    var previousFocus = document.activeElement;
    var overlay = document.createElement("div");
    overlay.className = "swal-overlay";
    if (typeof options.className === "string" && options.className) {
      overlay.className += " " + options.className;
    }
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "alGhaithAlertTitle");
    overlay.setAttribute("aria-describedby", "alGhaithAlertText");
    overlay.setAttribute("tabindex", "-1");

    var box = document.createElement("div");
    box.className = "swal-box";

    var title = document.createElement("h2");
    title.className = "swal-title";
    title.id = "alGhaithAlertTitle";
    title.textContent = options.title || "تنبيه";

    var message = document.createElement("p");
    message.className = "swal-text";
    message.id = "alGhaithAlertText";
    message.textContent = options.text || "";

    var actions = document.createElement("div");
    actions.className = "swal-actions";

    var focusTarget = null;

    function closeAndRun(callback) {
      closeActiveAlert(true);
      if (typeof callback === "function") callback();
    }

    if (options.buttons !== false) {
      var confirmButton = document.createElement("button");
      confirmButton.type = "button";
      confirmButton.className = "swal-button";
      confirmButton.textContent = options.confirmText || options.button || "فهمت";
      confirmButton.addEventListener("click", function () {
        closeAndRun(options.onConfirm);
      });
      actions.appendChild(confirmButton);
      focusTarget = confirmButton;
    }

    if (options.reportText && typeof options.onReport === "function") {
      var reportButton = document.createElement("button");
      reportButton.type = "button";
      reportButton.className = "swal-button swal-button-report";
      reportButton.textContent = options.reportText;
      reportButton.addEventListener("click", function () {
        closeAndRun(options.onReport);
      });
      actions.appendChild(reportButton);
      if (!focusTarget) focusTarget = reportButton;
    }

    box.appendChild(title);
    box.appendChild(message);
    if (actions.childNodes.length) box.appendChild(actions);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function keyHandler(event) {
      if (event.key === "Escape" || event.key === "Esc") {
        event.preventDefault();
        closeActiveAlert(true);
        return;
      }

      if (event.key === "Tab") {
        var focusable = box.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])");
        if (!focusable.length) {
          event.preventDefault();
          overlay.focus();
          return;
        }

        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay && options.closeOnClickOutside !== false) {
        closeActiveAlert(true);
      }
    });

    activeAlert = {
      overlay: overlay,
      previousFocus: previousFocus,
      keyHandler: keyHandler
    };

    document.addEventListener("keydown", keyHandler, true);
    if (focusTarget) focusTarget.focus();
    else overlay.focus();
  }

  function showLoadingIndicator() {
    var loader = getElement("loadingIndicator");
    var text = getElement("loadingText");
    var form = document.forms && document.forms.login;

    if (!loader) return;

    if (loadingInterval) {
      window.clearInterval(loadingInterval);
      loadingInterval = null;
    }

    loader.style.display = "block";
    loader.classList.add("show");
    loader.setAttribute("aria-busy", "true");
    if (form) form.setAttribute("aria-busy", "true");

    var index = 0;
    if (text) text.textContent = loadingTexts[index];

    loadingInterval = window.setInterval(function () {
      index = (index + 1) % loadingTexts.length;
      if (text) text.textContent = loadingTexts[index];
    }, 2600);
  }

  function hideLoadingIndicator() {
    if (loadingInterval) {
      window.clearInterval(loadingInterval);
      loadingInterval = null;
    }

    var loader = getElement("loadingIndicator");
    if (loader) {
      loader.classList.remove("show");
      loader.style.display = "none";
      loader.removeAttribute("aria-busy");
    }

    var form = document.forms && document.forms.login;
    if (form) form.removeAttribute("aria-busy");
  }

  function attachLoginLoading() {
    var button = document.querySelector(".login-submit");
    if (!button || button.__alGhaithLoadingBound) return;

    button.__alGhaithLoadingBound = true;
    button.addEventListener("click", function () {
      var username = document.querySelector("input[username-field]");
      if (username && username.value && username.value.trim()) {
        showLoadingIndicator();
      }
    }, true);
  }

  function observeLoginResult() {
    var status = getElement("status");
    var login = document.querySelector(".login");
    if (typeof window.MutationObserver !== "function") return;

    var observer = new window.MutationObserver(function () {
      if ((status && status.classList.contains("active")) ||
          (login && login.classList.contains("inactive"))) {
        hideLoadingIndicator();
      }
    });

    if (status) observer.observe(status, { attributes: true, attributeFilter: ["class", "style"] });
    if (login) observer.observe(login, { attributes: true, attributeFilter: ["class", "style"] });
  }

  function syncSavedCardSpeed() {
    var savedCards = getElement("se");
    var speedSelect = getElement("speed");
    if (!savedCards || !speedSelect) return;

    var selected = savedCards.options[savedCards.selectedIndex];
    if (!selected || !selected.value || selected.value === "relod") return;

    var speedText = selected.getAttribute("data-speed");
    if (!speedText) return;

    for (var i = 0; i < speedSelect.options.length; i += 1) {
      var option = speedSelect.options[i];
      if (SPEED_VALUES.indexOf(option.value) !== -1 &&
          option.textContent.trim() === speedText.trim()) {
        speedSelect.value = option.value;
        updateSpeedStatus(option.value);
        storeSelectedSpeed(option.value);
        break;
      }
    }
  }

  function checkFridayBlessing() {
    var now = new Date();
    if (now.getDay() !== 5) return;

    var dateKey = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    if (safeStorageGet(STORAGE_KEYS.friday) === dateKey) return;

    safeStorageSet(STORAGE_KEYS.friday, dateKey);
    swal({
      title: "جمعتك مباركة ツ",
      text: "لا تنسَ الصلاة على رسول الله 🤍",
      buttons: false,
      closeOnClickOutside: true,
      className: "transparent-popup"
    });
  }

  function initialize() {
    if (initialized || window.__alGhaithUiInitialized) return;
    initialized = true;
    window.__alGhaithUiInitialized = true;

    /* The network script is loaded after this file and declares its own
       no-op hideLoadingIndicator. Rebind this UI-only function after parsing. */
    window.doLogi = doLogi;
    window.checkSpeed = checkSpeed;
    if (originalCookieReader) window.getCookieOrNull = originalCookieReader;
    if (originalClearCookies) window.clearCookies = originalClearCookies;
    window.updateSpeedStatus = updateSpeedStatus;
    window.swal = swal;
    window.showLoadingIndicator = showLoadingIndicator;
    window.hideLoadingIndicator = hideLoadingIndicator;

    var reminder = readReminderPreference();
    setReminderPreference(reminder, false);

    var toggle = getElement("remember");
    var selector = getElement("remember-select");

    if (toggle) {
      toggle.addEventListener("change", function () {
        setReminderPreference(toggle.checked, true);
      });
    }

    if (selector) {
      selector.addEventListener("change", function () {
        if (selector.value === "choose-auto-update-off") {
          setReminderPreference(true, true);
        } else if (selector.value === "no") {
          setReminderPreference(false, true);
        }
      });
    }

    restoreSelectedSpeed();

    var savedCards = getElement("se");
    if (savedCards) savedCards.addEventListener("change", syncSavedCardSpeed);

    attachLoginLoading();
    observeLoginResult();
    checkFridayBlessing();
  }

  window.doLogi = doLogi;
  window.checkSpeed = checkSpeed;
  window.updateSpeedStatus = updateSpeedStatus;
  window.swal = swal;
  window.showLoadingIndicator = showLoadingIndicator;
  window.hideLoadingIndicator = hideLoadingIndicator;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, false);
  } else {
    initialize();
  }
})(window, document);
