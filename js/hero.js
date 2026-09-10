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
  const hero = document.querySelector(".hero");

  if (!hero) {
    return;
  }

  if (typeof gsap === "undefined") {
    console.warn(
      "GSAP is not available."
    );

    return;
  }

  setupHeroEntrance(hero);
  setupHeroButtons(hero);
  setupHeroParallax(hero);
}


/* ==================================================
   HERO ENTRANCE
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

  gsap.set(elements, {
    opacity: 0
  });

  const timeline = gsap.timeline({
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
        duration: 0.7
      }
    );
  }

  if (title) {
    timeline.fromTo(
      title,
      {
        opacity: 0,
        y: 38,
        scale: 0.97,
        filter: "blur(8px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.05
      },
      "-=0.35"
    );
  }

  if (description) {
    timeline.fromTo(
      description,
      {
        opacity: 0,
        y: 16,
        filter: "blur(4px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75
      },
      "-=0.5"
    );
  }

  if (actions) {
    timeline.fromTo(
      actions,
      {
        opacity: 0,
        y: 15
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65
      },
      "-=0.4"
    );
  }

  if (meta) {
    timeline.fromTo(
      meta,
      {
        opacity: 0,
        y: 8
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55
      },
      "-=0.25"
    );
  }
}


/* ==================================================
   BUTTON MICRO INTERACTION
================================================== */

function setupHeroButtons(hero) {
  const buttons =
    hero.querySelectorAll(".hero-button");

  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener(
      "mouseenter",
      () => {
        if (
          !window.matchMedia(
            "(hover: hover)"
          ).matches
        ) {
          return;
        }

        gsap.to(button, {
          y: -4,
          duration: 0.35,
          ease: "power2.out"
        });
      }
    );

    button.addEventListener(
      "mouseleave",
      () => {
        if (
          !window.matchMedia(
            "(hover: hover)"
          ).matches
        ) {
          return;
        }

        gsap.to(button, {
          y: 0,
          duration: 0.4,
          ease: "power3.out"
        });
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

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const touchDevice =
    window.matchMedia(
      "(hover: none)"
    ).matches;

  if (reducedMotion || touchDevice) {
    return;
  }

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  function animateParallax() {
    currentX +=
      (targetX - currentX) * 0.045;

    currentY +=
      (targetY - currentY) * 0.045;

    gsap.set(background, {
      x: currentX * 0.20,
      y: currentY * 0.15
    });

    gsap.set(silk, {
      x: currentX * 0.45,
      y: currentY * 0.30
    });

    requestAnimationFrame(
      animateParallax
    );
  }

  hero.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        hero.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;

      targetX =
        (x - 0.5) * 20;

      targetY =
        (y - 0.5) * 20;
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
    animateParallax
  );
}
