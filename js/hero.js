"use strict";

/* ==================================================
   AURÉLIS
   PREMIUM CINEMATIC HERO
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
      "GSAP is not available. CSS fallback remains active."
    );

    return;
  }

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reducedMotion) {
    setReducedMotionState(hero);
    return;
  }

  setupHeroEntrance(hero);
  setupHeroButtons(hero);

  if (window.innerWidth > 700) {
    setupHeroParallax(hero);
    setupHeroMouseGlow(hero);
  }
}


/* ==================================================
   HERO ENTRANCE
================================================== */

function setupHeroEntrance(hero) {
  try {
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
      clearProps: "animation,filter,letterSpacing",
      opacity: 0
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    /* COLLECTION 2026 */

    if (eyebrow) {
      timeline.fromTo(
        eyebrow,
        {
          opacity: 0,
          y: 12
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65
        }
      );
    }

    /* AURÉLIS */

    if (title) {
      timeline.fromTo(
        title,
        {
          opacity: 0,
          y: 24
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9
        },
        "-=0.25"
      );
    }

    /* DESCRIPTION */

    if (description) {
      timeline.fromTo(
        description,
        {
          opacity: 0,
          y: 12
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65
        },
        "-=0.35"
      );
    }

    /* BUTTONS */

    if (actions) {
      timeline.fromTo(
        actions,
        {
          opacity: 0,
          y: 12
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6
        },
        "-=0.28"
      );
    }

    /* META */

    if (meta) {
      timeline.fromTo(
        meta,
        {
          opacity: 0,
          y: 7
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5
        },
        "-=0.20"
      );
    }
  } catch (error) {
    console.error(
      "AURÉLIS Hero entrance error:",
      error
    );
  }
}

/* ==================================================
   BUTTON MICRO-INTERACTIONS
================================================== */

function setupHeroButtons(hero) {
  const buttons =
    hero.querySelectorAll(
      ".hero-button"
    );

  if (!buttons.length) {
    return;
  }

  const hoverSupported =
    window.matchMedia(
      "(hover: hover)"
    ).matches;

  if (!hoverSupported) {
    return;
  }

  buttons.forEach((button) => {
    const arrow =
      button.querySelector(
        ".hero-button-arrow"
      );

    button.addEventListener(
      "mouseenter",
      () => {
        gsap.to(button, {
          y: -4,
          duration: 0.38,
          ease: "power3.out"
        });

        if (arrow) {
          gsap.to(arrow, {
            x: 2,
            y: -2,
            duration: 0.38,
            ease: "power3.out"
          });
        }
      }
    );

    button.addEventListener(
      "mouseleave",
      () => {
        gsap.to(button, {
          y: 0,
          duration: 0.42,
          ease: "power3.out"
        });

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.42,
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
      x: currentX * 0.18,
      y: currentY * 0.14
    });

    gsap.set(silk, {
      x: currentX * 0.38,
      y: currentY * 0.26
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

      if (
        !rect.width ||
        !rect.height
      ) {
        return;
      }

      const normalizedX =
        (event.clientX - rect.left) /
        rect.width;

      const normalizedY =
        (event.clientY - rect.top) /
        rect.height;

      targetX =
        (normalizedX - 0.5) * 18;

      targetY =
        (normalizedY - 0.5) * 18;
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


/* ==================================================
   DESKTOP MOUSE LIGHT
================================================== */

function setupHeroMouseGlow(hero) {
  if (
    !hero ||
    window.innerWidth <= 700
  ) {
    return;
  }

  let targetX = 50;
  let targetY = 50;

  let currentX = 50;
  let currentY = 50;

  const updateGlow = () => {
    currentX +=
      (targetX - currentX) * 0.08;

    currentY +=
      (targetY - currentY) * 0.08;

    hero.style.setProperty(
      "--hero-mouse-x",
      `${currentX}%`
    );

    hero.style.setProperty(
      "--hero-mouse-y",
      `${currentY}%`
    );

    requestAnimationFrame(
      updateGlow
    );
  };

  hero.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        hero.getBoundingClientRect();

      if (
        !rect.width ||
        !rect.height
      ) {
        return;
      }

      targetX =
        ((event.clientX - rect.left) /
          rect.width) *
        100;

      targetY =
        ((event.clientY - rect.top) /
          rect.height) *
        100;
    }
  );

  hero.addEventListener(
    "mouseleave",
    () => {
      targetX = 50;
      targetY = 50;
    }
  );

  requestAnimationFrame(
    updateGlow
  );
}


/* ==================================================
   REDUCED MOTION
================================================== */

function setReducedMotionState(hero) {
  const elements =
    hero.querySelectorAll(
      ".hero-eyebrow, .hero-title, .hero-description, .hero-actions, .hero-meta"
    );

  elements.forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}
