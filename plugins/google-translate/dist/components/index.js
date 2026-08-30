// src/components/styles/google-translate.css?raw
var google_translate_default = `/* Google Translate widget styling.
   Plain CSS (lightningcss consumes this directly): hides Google's own
   chrome (banner/iframe/tooltip) and styles the language menu to match
   Quartz theme variables. */

/* Google's banner shifts the page down 40px \u2014 neutralize it. */
body {
  top: 0 !important;
}

.goog-te-banner-frame,
.goog-te-gadget-icon,
#goog-gt-tt,
.goog-tooltip,
.goog-te-ftab {
  display: none !important;
}

/* hidden host div that the TranslateElement combo box mounts into */
.gt-hidden-host {
  display: none;
}

.gt-wrapper {
  display: flex;
  align-items: center;
}

.google-translate-button {
  cursor: pointer;
  padding: 0;
  position: relative;
  background: none;
  border: none;
  width: 20px;
  height: 32px;
  margin: 0;
  text-align: inherit;
  flex-shrink: 0;
}

.google-translate-button svg {
  position: absolute;
  width: 20px;
  height: 20px;
  top: calc(50% - 10px);
  fill: var(--darkgray);
  transition: opacity 0.1s ease;
}

.google-translate-button:hover svg {
  fill: var(--gray);
}

/* language popover: positioned via JS next to the toolbar button */
#google-translate-menu {
  position: fixed;
  z-index: 999;
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  max-height: 60vh;
  overflow-y: auto;
  min-width: 9rem;
}

#google-translate-menu.gt-open {
  display: flex;
}

#google-translate-menu button {
  all: unset;
  cursor: pointer;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-family: var(--bodyFont);
  color: var(--darkgray);
  white-space: nowrap;
}

#google-translate-menu button:hover {
  background: var(--lightgray);
  color: var(--dark);
}

#google-translate-menu button.gt-active {
  color: var(--secondary);
  font-weight: 700;
}

/* dark mode support (Quartz sets saved-theme on :root) */
:root[saved-theme="dark"] #google-translate-menu {
  background: var(--dark);
}

:root[saved-theme="dark"] #google-translate-menu button {
  color: var(--light);
}

:root[saved-theme="dark"] #google-translate-menu button:hover {
  background: var(--gray);
  color: var(--light);
}`;

// src/components/scripts/google-translate.script.txt?raw
var google_translate_script_default = '// Inline browser script for the Google Translate component.\n// Bundled as raw text (`?raw`) and attached as `beforeDOMLoaded`; must stay\n// a self-contained plain script (no import/export). Quartz joins all\n// beforeDOMLoaded scripts into prescript.js which runs in <head>, so we must\n// defer until the component markup exists and re-init on SPA navigation.\n;(function () {\n  var TARGET_ID = "google-translate-root"\n  var CLASS_BUTTON = "google-translate-button"\n  var MENU_ID = "google-translate-menu"\n  var COOKIE_NAME = "googtrans"\n  var state = { opts: null }\n\n  var LANGUAGES = [\n    ["en", "English"],\n    ["es", "Espa\xF1ol"],\n    ["zh-CN", "\u4E2D\u6587 (\u7B80\u4F53)"],\n    ["ja", "\u65E5\u672C\u8A9E"],\n    ["de", "Deutsch"],\n    ["fr", "Fran\xE7ais"],\n    ["pt", "Portugu\xEAs"],\n    ["ru", "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"],\n    ["ro", "Rom\xE2n\u0103"],\n  ]\n\n  function readCookie() {\n    var match = document.cookie.match(new RegExp("(?:^|;\\\\s*)" + COOKIE_NAME + "=([^;]*)"))\n    if (!match) return ""\n    // value is either "/en/fr" or "en/fr"; last segment is the target language\n    var parts = decodeURIComponent(match[1]).split("/").filter(Boolean)\n    return parts.length >= 2 ? parts[parts.length - 1] : parts[0] || ""\n  }\n\n  function isLocalHost(host) {\n    return /^(localhost|127(\\.\\d+){3}|\\[::1\\])(:\\d+)?$/.test(host)\n  }\n\n  function writeCookie(value, pageLanguage) {\n    var host = window.location.hostname\n    var domain = host.split(".").slice(-2).join(".")\n    var domainPart = isLocalHost(host) || host === domain ? "" : ";domain=." + domain\n    if (value) {\n      document.cookie =\n        COOKIE_NAME + "=/" + pageLanguage + "/" + value + ";path=/" + domainPart + ";max-age=31536000;samesite=lax"\n    } else {\n      // expire on every plausible domain variant\n      document.cookie = COOKIE_NAME + "=;path=/;max-age=0"\n      document.cookie = COOKIE_NAME + "=;path=/;domain=." + domain + ";max-age=0"\n      if (!isLocalHost(host) && domain !== host) {\n        document.cookie = COOKIE_NAME + "=;path=/;domain=" + host + ";max-age=0"\n      }\n    }\n  }\n\n  function ensureElementScript(opts) {\n    // (re)create the TranslateElement combo box inside the hidden host div\n    window.googleTranslateElementInit = function () {\n      initElement()\n    }\n\n    if (document.getElementById("google-translate-script") === null) {\n      var script = document.createElement("script")\n      script.id = "google-translate-script"\n      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"\n      script.async = true\n      document.head.appendChild(script)\n    }\n  }\n\n  function initElement() {\n    if (!window.google || !window.google.translate) return\n    var target = document.getElementById(TARGET_ID)\n    if (!target) return\n    target.innerHTML = ""\n    var config = {\n      pageLanguage: state.opts.pageLanguage,\n      autoDisplay: false,\n      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,\n    }\n    if (state.opts.includedLanguages) {\n      config.includedLanguages = state.opts.includedLanguages\n    }\n    new window.google.translate.TranslateElement(config, TARGET_ID)\n  }\n\n  function translateTo(lang) {\n    var combo = document.querySelector(".goog-te-combo")\n    if (combo) {\n      combo.value = lang\n      combo.dispatchEvent(new Event("change"))\n      if (!lang) writeCookie("", state.opts.pageLanguage)\n      return\n    }\n    if (lang) {\n      // element not initialized yet: persist choice and reload so it applies\n      writeCookie(lang, state.opts.pageLanguage)\n      window.location.reload()\n    }\n  }\n\n  function activeLanguage() {\n    return readCookie() || state.opts.pageLanguage\n  }\n\n  function positionMenu(menu) {\n    var btn = document.querySelector("." + CLASS_BUTTON)\n    if (!btn) return\n    var rect = btn.getBoundingClientRect()\n    menu.style.top = Math.min(rect.bottom + 8, window.innerHeight - 260) + "px"\n    menu.style.left = rect.left + "px"\n  }\n\n  function buildMenu() {\n    var menu = document.createElement("ul")\n    menu.id = MENU_ID\n    var current = activeLanguage()\n\n    for (var i = 0; i < LANGUAGES.length; i++) {\n      ;(function () {\n        var code = LANGUAGES[i][0]\n        var name = LANGUAGES[i][1]\n        var item = document.createElement("li")\n        var langBtn = document.createElement("button")\n        langBtn.type = "button"\n        langBtn.textContent = name\n        langBtn.setAttribute("data-lang", code)\n        if (current === code) langBtn.classList.add("gt-active")\n        langBtn.addEventListener("click", function () {\n          menu.classList.remove("gt-open")\n          if (code === activeLanguage()) return\n          if (code === state.opts.pageLanguage) {\n            // the widget cannot un-translate itself; restore via reload\n            writeCookie("", state.opts.pageLanguage)\n            window.location.reload()\n          } else {\n            translateTo(code)\n          }\n        })\n        item.appendChild(langBtn)\n        menu.appendChild(item)\n      })()\n    }\n\n    return menu\n  }\n\n  function rebuildMenu() {\n    var existing = document.getElementById(MENU_ID)\n    if (existing) existing.remove()\n    var menu = buildMenu()\n    document.body.appendChild(menu)\n    return menu\n  }\n\n  function boot() {\n    var btn = document.querySelector("." + CLASS_BUTTON)\n    if (!btn) return\n\n    state.opts = {\n      pageLanguage: btn.getAttribute("data-page-language") || "en",\n      includedLanguages: btn.getAttribute("data-included-languages") || "",\n    }\n\n    ensureElementScript(state.opts)\n    rebuildMenu()\n  }\n\n  // one delegated listener handles button opens + outside clicks, immune to SPA re-renders\n  document.addEventListener("click", function (ev) {\n    var target = ev.target\n    var openElement = target && target.closest ? target.closest("." + CLASS_BUTTON) : null\n    if (openElement) {\n      ev.preventDefault()\n      ev.stopPropagation()\n      var menu = document.getElementById(MENU_ID) || rebuildMenu()\n      positionMenu(menu)\n      menu.classList.toggle("gt-open")\n      return\n    }\n    var openMenu = document.getElementById(MENU_ID)\n    if (openMenu && openMenu.classList.contains("gt-open") && !openMenu.contains(target)) {\n      openMenu.classList.remove("gt-open")\n    }\n  })\n\n  // prescript runs in <head>: defer boot until the component markup exists\n  if (document.readyState === "loading") {\n    document.addEventListener("DOMContentLoaded", boot)\n  } else {\n    boot()\n  }\n\n  // SPA navigation: quartz-root is replaced, so re-init the combo + menu\n  document.addEventListener("nav", function () {\n    if (!state.opts) {\n      boot()\n      return\n    }\n    initElement()\n    rebuildMenu()\n  })\n})()';

// src/components/GoogleTranslate.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var TRANSLATE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z"/></svg>`;
function GoogleTranslate(opts) {
  const pageLanguage = opts?.pageLanguage;
  const includedLanguages = opts?.includedLanguages ?? "";
  const GoogleTranslate2 = ({ cfg }) => {
    const resolvedPageLanguage = pageLanguage ?? cfg?.locale?.split("-")[0] ?? "en";
    return /* @__PURE__ */ jsxs("div", { class: "gt-wrapper", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          class: "google-translate-button",
          type: "button",
          "aria-label": "Translate page",
          "data-page-language": resolvedPageLanguage,
          "data-included-languages": includedLanguages,
          dangerouslySetInnerHTML: { __html: TRANSLATE_ICON }
        }
      ),
      /* @__PURE__ */ jsx("div", { id: "google-translate-root", class: "gt-hidden-host", "aria-hidden": "true" })
    ] });
  };
  GoogleTranslate2.css = google_translate_default;
  GoogleTranslate2.beforeDOMLoaded = google_translate_script_default;
  return GoogleTranslate2;
}
var GoogleTranslate_default = GoogleTranslate;
export {
  GoogleTranslate,
  GoogleTranslate_default as GoogleTranslateConstructor
};
//# sourceMappingURL=index.js.map