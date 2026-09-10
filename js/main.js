"use strict";

/* ==================================================
   AURÉLIS
   MAIN / MOBILE MENU
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeSite();
  } catch (error) {
    console.error(
      "AURÉLIS initialization error:",
      error
    );
  }
});


function initializeSite() {
  const menuButton =
    document.querySelector("#menu-toggle");

  const mobileNavigation =
    document.querySelector("#mobile-navigation");

  if (!menuButton || !mobileNavigation) {
    return;
  }

  setupMobileMenu(
    menuButton,
    mobileNavigation
  );
}


/**
 * Initializes the mobile navigation.
 *
 * @param {HTMLButtonElement} button
 * @param {HTMLElement} navigation
 */
function setupMobileMenu(button, navigation) {
  const links =
    navigation.querySelectorAll(
      ".mobile-navigation-link"
    );

  const setMenuState = (isOpen) => {
    button.classList.toggle(
      "is-open",
      isOpen
    );

    navigation.classList.toggle(
      "is-open",
      isOpen
    );

    button.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    button.setAttribute(
      "aria-label",
      isOpen
        ? "Закрыть меню"
        : "Открыть меню"
    );

    navigation.setAttribute(
      "aria-hidden",
      String(!isOpen)
    );
  };

  setMenuState(false);

  button.addEventListener(
    "click",
    () => {
      const isOpen =
        button.classList.contains("is-open");

      setMenuState(!isOpen);
    }
  );

  links.forEach((link) => {
    link.addEventListener(
      "click",
      () => {
        setMenuState(false);
      }
    );
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 700) {
        setMenuState(false);
      }
    }
  );
}
