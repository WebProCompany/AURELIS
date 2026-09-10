"use strict";

/* ==================================================
   AURÉLIS — PREMIUM INTERACTION ENGINE
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    try {
        initializePreloader();
        initializeHeader();
        initializeMobileMenu();
        initializeRevealAnimations();
        initializeHeroVideo();
        initializeNoteBadges();
        initializeRitualOrder();
        initializeDiscoveryBuilder();
        initializeSmoothLinks();
    } catch (error) {
        console.error(
            "AURÉLIS initialization error:",
            error
        );
    }
});


/* ==================================================
   HELPERS
================================================== */

function safeQuery(selector, root = document) {
    try {
        return root.querySelector(selector);
    } catch (error) {
        console.error(
            `Invalid selector: ${selector}`,
            error
        );

        return null;
    }
}


function safeQueryAll(selector, root = document) {
    try {
        return Array.from(
            root.querySelectorAll(selector)
        );
    } catch (error) {
        console.error(
            `Invalid selector: ${selector}`,
            error
        );

        return [];
    }
}


/* ==================================================
   PRELOADER
================================================== */

function initializePreloader() {
    const preloader = safeQuery("#preloader");

    if (!preloader) {
        return;
    }

    const hidePreloader = () => {
        window.setTimeout(() => {
            preloader.classList.add("is-hidden");
        }, 1550);
    };

    if (document.readyState === "complete") {
        hidePreloader();
        return;
    }

    window.addEventListener(
        "load",
        hidePreloader,
        { once: true }
    );
}


/* ==================================================
   HEADER
================================================== */

function initializeHeader() {
    const header = safeQuery("#header");

    if (!header) {
        return;
    }

    const updateHeader = () => {
        if (window.scrollY > 45) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


/* ==================================================
   MOBILE MENU
================================================== */

function initializeMobileMenu() {
    const button = safeQuery("#menuButton");
    const menu = safeQuery("#mobileMenu");

    if (!button || !menu) {
        return;
    }

    const links = safeQueryAll(
        "a",
        menu
    );

    const openMenu = () => {
        menu.classList.add("open");
        button.classList.add("active");

        button.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );
    };

    const closeMenu = () => {
        menu.classList.remove("open");
        button.classList.remove("active");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    };

    button.addEventListener(
        "click",
        () => {
            if (menu.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    );

    links.forEach((link) => {
        link.addEventListener(
            "click",
            closeMenu
        );
    });

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        }
    );
}


/* ==================================================
   SCROLL REVEAL
================================================== */

function initializeRevealAnimations() {
    const elements = safeQueryAll(
        ".reveal"
    );

    if (!elements.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    currentObserver.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );

    elements.forEach((element) => {
        observer.observe(element);
    });
}


/* ==================================================
   HERO VIDEO
================================================== */

function initializeHeroVideo() {
    const hero = safeQuery(".hero");
    const video = safeQuery("#heroVideo");

    if (!hero || !video) {
        return;
    }

    /*
     * Local video support.
     *
     * Add this later:
     *
     * /assets/aurelis-smoke.mp4
     *
     * The site remains fully functional without it.
     */

    const localVideoSource =
        "assets/aurelis-smoke.mp4";

    const source =
        document.createElement("source");

    source.src = localVideoSource;
    source.type = "video/mp4";

    video.appendChild(source);

    video.addEventListener(
        "loadeddata",
        () => {
            hero.classList.add("has-video");

            video.play().catch(() => {
                /*
                 * Browser may block autoplay.
                 * Muted inline playback usually works.
                 * CSS cinematic background remains active.
                 */
            });
        },
        { once: true }
    );

    video.addEventListener(
        "error",
        () => {
            /*
             * No external asset is required.
             * CSS smoke remains as fallback.
             */
            hero.classList.remove("has-video");
        },
        { once: true }
    );
}


/* ==================================================
   SCENT NOTES
================================================== */

function initializeNoteBadges() {
    const buttons = safeQueryAll(
        ".note-badge"
    );

    const modal = safeQuery(
        "#noteModal"
    );

    const closeButton = safeQuery(
        "#noteModalClose"
    );

    const backdrop = safeQuery(
        ".note-modal__backdrop"
    );

    const title = safeQuery(
        "#noteTitle"
    );

    const description = safeQuery(
        "#noteDescription"
    );

    const mood = safeQuery(
        "#noteMood"
    );

    if (
        !buttons.length ||
        !modal ||
        !closeButton ||
        !title ||
        !description ||
        !mood
    ) {
        return;
    }

    const notes = {
        oud: {
            title: "Oud",
            description:
                "Тёмная, сухая и глубокая древесная нота с дорогим восточным характером.",
            mood:
                "DEEP · WARM · MYSTERIOUS"
        },

        amber: {
            title: "Amber",
            description:
                "Тёплое смолистое звучание, которое создаёт ощущение мягкого света и глубины.",
            mood:
                "WARM · LUMINOUS · SENSUAL"
        },

        wood: {
            title: "Woods",
            description:
                "Сухая древесная структура, добавляющая композиции уверенность и чистую силу.",
            mood:
                "DRY · CLEAN · CONFIDENT"
        },

        musk: {
            title: "Musk",
            description:
                "Мягкий, чистый и почти бархатный аккорд, близкий к ощущению кожи.",
            mood:
                "SOFT · SKIN · INTIMATE"
        },

        jasmine: {
            title: "Jasmine",
            description:
                "Белый цветочный аккорд с чистым, воздушным и слегка кремовым характером.",
            mood:
                "WHITE · AIRY · ELEGANT"
        },

        iris: {
            title: "Iris",
            description:
                "Пудровая, сухая и утончённая нота, создающая ощущение холодной элегантности.",
            mood:
                "POWDERY · COOL · REFINED"
        },

        spice: {
            title: "Spice",
            description:
                "Пряный акцент, который добавляет композиции темперамент и тёплую энергетику.",
            mood:
                "WARM · SPICED · BOLD"
        },

        cedar: {
            title: "Cedar",
            description:
                "Сухое кедровое дерево с благородным, чистым и структурированным характером.",
            mood:
                "DRY · STRUCTURED · NOBLE"
        },

        leather: {
            title: "Leather",
            description:
                "Глубокая текстура кожи с тёмным, чувственным и уверенным оттенком.",
            mood:
                "DARK · TEXTURED · MAGNETIC"
        },

        bergamot: {
            title: "Bergamot",
            description:
                "Свежая цитрусовая нота, которая открывает композицию светло и энергично.",
            mood:
                "FRESH · BRIGHT · CLEAN"
        },

        neroli: {
            title: "Neroli",
            description:
                "Цветочно-цитрусовый аккорд с чистым, солнечным и немного зелёным характером.",
            mood:
                "SOLAR · GREEN · ELEGANT"
        },

        citrus: {
            title: "Citrus",
            description:
                "Светлая и искристая свежесть, создающая ощущение чистоты и лёгкости.",
            mood:
                "BRIGHT · FRESH · AIRY"
        }
    };

    const openModal = (key) => {
        const data = notes[key];

        if (!data) {
            console.error(
                "Unknown scent note:",
                key
            );

            return;
        }

        title.textContent = data.title;
        description.textContent =
            data.description;
        mood.textContent =
            data.mood;

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );
    };

    const closeModal = () => {
        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !safeQuery(".ritual-modal.open")
        ) {
            document.body.classList.remove(
                "modal-open"
            );
        }
    };

    buttons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const key =
                    button.dataset.note;

                openModal(key);
            }
        );
    });

    closeButton.addEventListener(
        "click",
        closeModal
    );

    if (backdrop) {
        backdrop.addEventListener(
            "click",
            closeModal
        );
    }

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "open"
                )
            ) {
                closeModal();
            }
        }
    );
}


/* ==================================================
   PRIVATE RITUAL ORDER
================================================== */

function initializeRitualOrder() {
    const modal = safeQuery(
        "#ritualModal"
    );

    const closeButton = safeQuery(
        "#ritualClose"
    );

    const backdrop = safeQuery(
        ".ritual-modal__backdrop"
    );

    const productElement = safeQuery(
        "#ritualProduct"
    );

    const priceElement = safeQuery(
        "#ritualPrice"
    );

    const form = safeQuery(
        "#ritualForm"
    );

    const confirmation = safeQuery(
        "#ritualConfirmation"
    );

    const doneButton = safeQuery(
        "#ritualDone"
    );

    const orderButtons = safeQueryAll(
        ".order-button"
    );

    if (
        !modal ||
        !closeButton ||
        !productElement ||
        !priceElement ||
        !form ||
        !confirmation ||
        !doneButton
    ) {
        return;
    }

    let selectedProduct = "";
    let selectedPrice = "";

    const updateProgress = (step) => {
        const progress = safeQueryAll(
            ".ritual__progress span",
            modal
        );

        progress.forEach(
            (element, index) => {
                element.classList.toggle(
                    "is-active",
                    index < step
                );
            }
        );
    };

    const goToStep = (stepNumber) => {
        const steps = safeQueryAll(
            ".ritual-step",
            modal
        );

        if (
            stepNumber < 1 ||
            stepNumber > steps.length
        ) {
            return;
        }

        steps.forEach((step) => {
            const current =
                Number(
                    step.dataset.step
                );

            step.classList.toggle(
                "is-active",
                current === stepNumber
            );
        });

        updateProgress(stepNumber);
    };

    const openRitual = (
        product,
        price
    ) => {
        if (
            typeof product !== "string" ||
            product.trim().length < 2
        ) {
            console.error(
                "Invalid product."
            );

            return;
        }

        selectedProduct =
            product.trim();

        selectedPrice =
            typeof price === "string"
                ? price.trim()
                : "";

        productElement.textContent =
            selectedProduct;

        priceElement.textContent =
            selectedPrice;

        goToStep(1);

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );
    };

    const closeRitual = () => {
        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !safeQuery(".note-modal.open")
        ) {
            document.body.classList.remove(
                "modal-open"
            );
        }
    };

    orderButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const product =
                    button.dataset.product;

                const price =
                    button.dataset.price;

                openRitual(
                    product,
                    price
                );
            }
        );
    });

    closeButton.addEventListener(
        "click",
        closeRitual
    );

    if (backdrop) {
        backdrop.addEventListener(
            "click",
            closeRitual
        );
    }

    safeQueryAll(
        ".ritual-next",
        modal
    ).forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const nextStep =
                    Number(
                        button.dataset.next
                    );

                goToStep(nextStep);
            }
        );
    });

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            try {
                const nameInput =
                    safeQuery(
                        "#ritualName"
                    );

                const phoneInput =
                    safeQuery(
                        "#ritualPhone"
                    );

                if (
                    !nameInput ||
                    !phoneInput
                ) {
                    throw new Error(
                        "Order fields are missing."
                    );
                }

                const name =
                    nameInput.value.trim();

                const phone =
                    phoneInput.value.trim();

                if (name.length < 2) {
                    alert(
                        "Пожалуйста, введите имя."
                    );

                    nameInput.focus();

                    return;
                }

                if (phone.length < 7) {
                    alert(
                        "Пожалуйста, введите корректный номер."
                    );

                    phoneInput.focus();

                    return;
                }

                confirmation.textContent =
                    `Спасибо, ${name}. ` +
                    `Вы выбрали ${selectedProduct}. ` +
                    "Мы свяжемся с вами для подтверждения заказа.";

                form.reset();

                goToStep(3);
            } catch (error) {
                console.error(
                    "Ritual form error:",
                    error
                );

                alert(
                    "Не удалось обработать заявку. " +
                    "Попробуйте ещё раз."
                );
            }
        }
    );

    doneButton.addEventListener(
        "click",
        closeRitual
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "open"
                )
            ) {
                closeRitual();
            }
        }
    );
}


/* ==================================================
   DISCOVERY BUILDER
================================================== */

function initializeDiscoveryBuilder() {
    const productButtons =
        safeQueryAll(
            ".builder-product"
        );

    const slots =
        safeQueryAll(
            ".builder-slot"
        );

    const countElement =
        safeQuery("#selectionCount");

    const clearButton =
        safeQuery("#clearSelection");

    const orderButton =
        safeQuery("#discoveryOrder");

    if (
        !productButtons.length ||
        !slots.length ||
        !countElement ||
        !clearButton ||
        !orderButton
    ) {
        return;
    }

    const selection = [];

    const updateUI = () => {
        countElement.textContent =
            `${selection.length} / 3`;

        slots.forEach(
            (slot, index) => {
                const value =
                    selection[index];

                slot.classList.toggle(
                    "has-item",
                    Boolean(value)
                );

                const label =
                    slot.querySelector("small");

                if (!label) {
                    return;
                }

                label.textContent =
                    value ||
                    "Перетащите аромат";
            }
        );

        orderButton.disabled =
            selection.length !== 3;

        productButtons.forEach(
            (button) => {
                const scent =
                    button.dataset.scent;

                const isSelected =
                    selection.includes(
                        scent
                    );

                button.classList.toggle(
                    "is-selected",
                    isSelected
                );

                button.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );
            }
        );
    };

    const addSelection = (scent) => {
        if (
            typeof scent !== "string" ||
            scent.trim().length < 2
        ) {
            return;
        }

        const normalized =
            scent.trim();

        if (
            selection.length >= 3 ||
            selection.includes(normalized)
        ) {
            return;
        }

        selection.push(normalized);

        updateUI();
    };

    const removeSelection = (
        index
    ) => {
        if (
            index < 0 ||
            index >= selection.length
        ) {
            return;
        }

        selection.splice(index, 1);

        updateUI();
    };

    productButtons.forEach(
        (button) => {
            button.addEventListener(
                "click",
                () => {
                    addSelection(
                        button.dataset.scent
                    );
                }
            );

            button.addEventListener(
                "dragstart",
                (event) => {
                    const scent =
                        button.dataset.scent;

                    if (!scent) {
                        event.preventDefault();

                        return;
                    }

                    button.classList.add(
                        "dragging"
                    );

                    event.dataTransfer.effectAllowed =
                        "copy";

                    event.dataTransfer.setData(
                        "text/plain",
                        scent
                    );
                }
            );

            button.addEventListener(
                "dragend",
                () => {
                    button.classList.remove(
                        "dragging"
                    );
                }
            );
        }
    );

    slots.forEach(
        (slot) => {
            slot.addEventListener(
                "dragover",
                (event) => {
                    event.preventDefault();

                    slot.classList.add(
                        "is-over"
                    );

                    event.dataTransfer.dropEffect =
                        "copy";
                }
            );

            slot.addEventListener(
                "dragleave",
                () => {
                    slot.classList.remove(
                        "is-over"
                    );
                }
            );

            slot.addEventListener(
                "drop",
                (event) => {
                    event.preventDefault();

                    slot.classList.remove(
                        "is-over"
                    );

                    const scent =
                        event.dataTransfer.getData(
                            "text/plain"
                        );

                    addSelection(scent);
                }
            );

            slot.addEventListener(
                "click",
                () => {
                    const slotIndex =
                        Number(
                            slot.dataset.slot
                        );

                    if (
                        !Number.isInteger(
                            slotIndex
                        )
                    ) {
                        return;
                    }

                    removeSelection(
                        slotIndex
                    );
                }
            );
        }
    );

    clearButton.addEventListener(
        "click",
        () => {
            selection.length = 0;

            updateUI();
        }
    );

    orderButton.addEventListener(
        "click",
        () => {
            if (
                selection.length !== 3
            ) {
                return;
            }

            const joined =
                selection.join(" · ");

            const ritualModal =
                safeQuery(
                    "#ritualModal"
                );

            const ritualProduct =
                safeQuery(
                    "#ritualProduct"
                );

            const ritualPrice =
                safeQuery(
                    "#ritualPrice"
                );

            const progress =
                safeQueryAll(
                    ".ritual__progress span",
                    ritualModal
                );

            const ritualSteps =
                safeQueryAll(
                    ".ritual-step",
                    ritualModal
                );

            if (
                !ritualModal ||
                !ritualProduct ||
                !ritualPrice
            ) {
                return;
            }

            ritualProduct.textContent =
                joined;

            ritualPrice.textContent =
                "DISCOVERY SET · 300 TJS";

            ritualSteps.forEach(
                (step) => {
                    step.classList.toggle(
                        "is-active",
                        step.dataset.step === "1"
                    );
                }
            );

            progress.forEach(
                (element, index) => {
                    element.classList.toggle(
                        "is-active",
                        index === 0
                    );
                }
            );

            ritualModal.classList.add(
                "open"
            );

            ritualModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );
        }
    );

    updateUI();
}


/* ==================================================
   SMOOTH LINKS
================================================== */

function initializeSmoothLinks() {
    const links = safeQueryAll(
        'a[href^="#"]'
    );

    links.forEach((link) => {
        link.addEventListener(
            "click",
            (event) => {
                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                let target = null;

                try {
                    target =
                        document.querySelector(
                            targetId
                        );
                } catch (error) {
                    console.error(
                        "Invalid anchor:",
                        targetId,
                        error
                    );

                    return;
                }

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });
}
