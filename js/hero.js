"use strict";

/* ==================================================
   AURÉLIS
   PREMIUM HERO ANIMATION
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeHero();
  } catch (error) {
    console.error(
      "AURÉLIS Hero initialization error:",
      error
    );
  }
});


function initializeHero() {
  const hero =
    document.querySelector(".hero");

  if (!hero) {
    return;
  }

  if (
    typeof gsap === "undefined"
  ) {
    console.warn(
      "GSAP is not available. Hero fallback animation remains active."
    );

    return;
  }

  setupHeroEntrance(hero);
  setupHeroButtons(hero);
  setupHeroParallax(hero);
}


/* ==================================================
   ENTRANCE ANIMATION
================================================== */

function setupHeroEntrance(hero) {
  const eyebrow =
    hero.querySelector(".hero-eyebrow");

  const title =
    hero.querySelector(".hero-title");

  const description =
    hero.querySelector(".hero-description");

  const actions =
    hero.querySelector(".hero-actions");

  const meta =
    hero.querySelector(".hero-meta");

  const elements = [
    eyebrow,
    title,
    description,
    actions,
    meta
  ].filter(Boolean);

  if (!elements.length) {
    return;
  }

  gsap.killTweensOf(elements);

  gsap.set(elements, {
    opacity: 0
  });

  const timeline =
    gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

  if (eyebrow) {
    timeline.fromTo(
      eyebrow,
      {
        opacity: 0,
        y: 18,
        filter: "blur(6px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75
      }
    );
  }

  if (title) {
    timeline.fromTo(
      title,
      {
        opacity: 0,
        y: 42,
        scale: 0.965,
        letterSpacing: "0.22em",
        filter: "blur(8px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        letterSpacing:
          window.innerWidth <= 700
            ? "0.11em"
            : "0.10em",
        filter: "blur(0px)",
        duration: 1.15
      },
      "-=0.35"
    );
  }

  if (description) {
    timeline.fromTo(
      description,
      {
        opacity: 0,
        y: 18,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8
      },
      "-=0.55"
    );
  }

  if (actions) {
    timeline.fromTo(
      actions,
      {
        opacity: 0,
        y: 18
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7
      },
      "-=0.45"
    );
  }

  if (meta) {
    timeline.fromTo(
      meta,
      {
        opacity: 0,
        y: 10
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65
      },
      "-=0.30"
    );
  }
}


/* ==================================================
   BUTTON MICRO INTERACTION
================================================== */

function setupHeroButtons(hero) {
  const buttons =
    hero.querySelectorAll(
      ".hero-button"
    );

  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener(
      "mouseenter",
      () => {
        if (
          window.matchMedia(
            "(hover: hover)"
          ).matches
        ) {
          gsap.to(button, {
            y: -4,
            duration: 0.35,
            ease: "power2.out"
          });
        }
      }
    );

    button.addEventListener(
      "mouseleave",
      () => {
        if (
          window.matchMedia(
            "(hover: hover)"
          ).matches
        ) {
          gsap.to(button, {
            y: 0,
            duration: 0.4,
            ease: "power3.out"
          });
        }
      }
    );
  });
}


/* ==================================================
   DESKTOP PARALLAX
================================================== */

function setupHeroParallax(hero) {
  const background =
    hero.querySelector(
      ".hero-background"
    );

  const silk =
    hero.querySelector(
      ".hero-silk"
    );

  if (!background || !silk) {
    return;
  }

  const motionAllowed =
    window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;

  const isTouch =
    window.matchMedia(
      "(hover: none)"
    ).matches;

  if (!motionAllowed || isTouch) {
    return;
  }

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  const updateParallax = () => {
    currentX +=
      (targetX - currentX) * 0.045;

    currentY +=
      (targetY - currentY) * 0.045;

    gsap.set(background, {
      x: currentX * 0.22,
      y: currentY * 0.18
    });

    gsap.set(silk, {
      xPercent: -50,
      yPercent: -50,
      x: currentX * 0.55,
      y: currentY * 0.42
    });

    requestAnimationFrame(
      updateParallax
    );
  };

  hero.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        hero.getBoundingClientRect();

      const relativeX =
        (event.clientX - rect.left) /
        rect.width;

      const relativeY =
        (event.clientY - rect.top) /
        rect.height;

      targetX =
        (relativeX - 0.5) * 20;

      targetY =
        (relativeY - 0.5) * 20;
    }
  );

  hero.addEventListener(
    "mouseleave",
    () => {
      targetX = 0;
      targetY = 0;
    }
  );

  requestAnimationFrame(
    updateParallax
  );
}
