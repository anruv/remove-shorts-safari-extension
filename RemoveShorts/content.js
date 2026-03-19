/**
 * Remove Shorts - Content Script
 * Dynamically removes YouTube Shorts and redirects /shorts/ URLs
 */

(function () {
  "use strict";

  const SHORTS_URL_PATTERN = /\/shorts\//;

  // --- State ---
  let enabled = true;

  // Load saved state
  if (typeof browser !== "undefined" && browser.storage) {
    browser.storage.local.get("enabled").then((result) => {
      enabled = result.enabled !== false; // default true
      if (!enabled) document.body.classList.add("remove-shorts-disabled");
      else run();
    });

    browser.storage.onChanged.addListener((changes) => {
      if (changes.enabled) {
        enabled = changes.enabled.newValue;
        if (enabled) {
          document.body.classList.remove("remove-shorts-disabled");
          run();
        } else {
          document.body.classList.add("remove-shorts-disabled");
        }
      }
    });
  } else {
    // Fallback if storage API unavailable
    run();
  }

  // --- Redirect /shorts/ URLs to regular /watch ---
  function redirectShorts() {
    if (!enabled) return;
    const url = window.location.href;
    if (SHORTS_URL_PATTERN.test(url)) {
      const videoId = url.split("/shorts/")[1]?.split(/[?&#]/)[0];
      if (videoId) {
        window.location.replace(
          "https://www.youtube.com/watch?v=" + videoId
        );
      }
    }
  }

  // --- Remove Shorts elements from DOM ---
  function removeShortsElements() {
    if (!enabled) return;

    // Remove Shorts shelf sections
    const selectors = [
      'ytd-rich-shelf-renderer[is-shorts]',
      'ytd-reel-shelf-renderer',
      'ytd-shorts-shelf-renderer',
      'ytd-reel-video-renderer',
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.remove();
      });
    });

    // Remove individual video items that link to /shorts/
    document
      .querySelectorAll('a[href*="/shorts/"]')
      .forEach((link) => {
        const renderer = link.closest(
          "ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-video-renderer, ytd-notification-renderer"
        );
        if (renderer) renderer.remove();
      });
  }

  // --- Observe DOM changes (YouTube is an SPA) ---
  function observeDOM() {
    const observer = new MutationObserver(() => {
      redirectShorts();
      removeShortsElements();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  // --- Main ---
  function run() {
    redirectShorts();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        removeShortsElements();
        observeDOM();
      });
    } else {
      removeShortsElements();
      observeDOM();
    }

    // Also handle SPA navigation
    const pushState = history.pushState;
    history.pushState = function () {
      pushState.apply(this, arguments);
      setTimeout(redirectShorts, 100);
    };
  }
})();
