"use strict";

/* =========================================================
   AURÉLIS — INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    try {
        initPreloader();
        initHeader();
        initMobileMenu();
        initHeroVideo();
        initRevealAnimations();
        initNoteModal();
        initRitualModal();
        initDiscoveryBuilder();
        initSmoothLinks();
    } catch (error) {
        console.error(
            "AURÉLIS initialization error:",
            error
        );
    }
});


/* =========================================================
   HELPERS
========================================================= */

function query(selector, root = document) {
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


function queryAll(selector, root = document) {
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


/* =========================================================
   PRELOADER
========================================================= */

function initPreloader() {
    const preloader = query("#preloader");
    const bar = query("#preloaderBar");

    if (!preloader || !bar) {
        return;
    }

    requestAnimationFrame(() => {
        bar.style.transition =
            "transform 1500ms cubic-bezier(0.16, 1, 0.3, 1)";

        bar.style.transform =
            "translateX(0)";
    });

    const hide = () => {
        window.setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            preloader.style.pointerEvents = "none";
        }, 1550);
    };

    if (document.readyState === "complete") {
        hide();
    } else {
        window.addEventListener(
            "load",
            hide,
            { once: true }
        );
    }
}


/* =========================================================
   HEADER
========================================================= */

function initHeader() {
    const header = query("#header");

    if (!header) {
        return;
    }

    const update = () => {
        if (window.scrollY > 35) {
            header.classList.add(
                "header-scrolled"
            );
        } else {
            header.classList.remove(
                "header-scrolled"
            );
        }
    };

    update();

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {
    const button = query("#menuButton");
    const menu = query("#mobileMenu");

    if (!button || !menu) {
        return;
    }

    const links = queryAll(
        ".mobile-nav-link",
        menu
    );

    const open = () => {
        button.classList.add("menu-open");

        menu.classList.remove(
            "invisible",
            "translate-x-full",
            "opacity-0"
        );

        menu.classList.add(
            "mobile-menu-visible"
        );

        menu.setAttribute(
            "aria-hidden",
            "false"
        );

        button.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";
    };

    const close = () => {
        button.classList.remove("menu-open");

        menu.classList.remove(
            "mobile-menu-visible"
        );

        menu.classList.add(
            "invisible",
            "translate-x-full",
            "opacity-0"
        );

        menu.setAttribute(
            "aria-hidden",
            "true"
        );

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";
    };

    button.addEventListener(
        "click",
        () => {
            if (
                menu.classList.contains(
                    "mobile-menu-visible"
                )
            ) {
                close();
            } else {
                open();
            }
        }
    );

    links.forEach((link) => {
        link.addEventListener(
            "click",
            close
        );
    });

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key !== "Escape") {
                return;
            }

            if (
                menu.classList.contains(
                    "mobile-menu-visible"
                )
            ) {
                close();
            }
        }
    );
}


/* =========================================================
   HERO VIDEO
========================================================= */

function initHeroVideo() {
    const hero = query("#home");
    const video = query("#heroVideo");

    if (!hero || !video) {
        return;
    }

    /*
     * Put your video here:
     *
     * /assets/aurelis-smoke.mp4
     */

    const source = document.createElement(
        "source"
    );

    source.src =
        "assets/aurelis-smoke.mp4";

    source.type = "video/mp4";

    video.appendChild(source);

    video.addEventListener(
        "loadeddata",
        () => {
            video.classList.remove(
                "opacity-0"
            );

            video.classList.add(
                "opacity-100"
            );

            video.play().catch(() => {
                /*
                 * Autoplay may be blocked by
                 * browser policy.
                 *
                 * CSS cinematic background
                 * remains active.
                 */
            });
        },
        { once: true }
    );

    video.addEventListener(
        "error",
        () => {
            video.classList.remove(
                "opacity-100"
            );

            video.classList.add(
                "opacity-0"
            );
        },
        { once: true }
    );
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initRevealAnimations() {
    const elements = queryAll(".reveal");

    if (!elements.length) {
        return;
    }

    if (
        !("IntersectionObserver" in window)
    ) {
        elements.forEach((element) => {
            element.classList.add(
                "visible"
            );
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (
                        !entry.isIntersecting
                    ) {
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


/* =========================================================
   SCENT NOTE MODAL
========================================================= */

function initNoteModal() {
    const modal = query("#noteModal");
    const closeButton = query("#noteClose");
    const title = query("#noteTitle");
    const description = query(
        "#noteDescription"
    );
    const mood = query("#noteMood");

    if (
        !modal ||
        !closeButton ||
        !title ||
        !description ||
        !mood
    ) {
        return;
    }

    const buttons = queryAll(
        ".note-badge"
    );

    const notes = {
        oud: {
            title: "Oud",
            description:
                "Тёмная, сухая и глубокая древесная нота с восточным характером.",
            mood:
                "DEEP · WARM · MYSTERIOUS"
        },

        amber: {
            title: "Amber",
            description:
                "Тёплое смолистое звучание, создающее ощущение мягкого света и глубины.",
            mood:
                "WARM · LUMINOUS · SENSUAL"
        },

        wood: {
            title: "Woods",
            description:
                "Сухая древесная структура, которая добавляет композиции уверенность и чистую силу.",
            mood:
                "DRY · CLEAN · CONFIDENT"
        },

        musk: {
            title: "Musk",
            description:
                "Мягкий и чистый аккорд, близкий к ощущению тёплой кожи.",
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
                "Пудровая и сухая нота, создающая ощущение спокойной холодной элегантности.",
            mood:
                "POWDERY · COOL · REFINED"
        },

        spice: {
            title: "Spice",
            description:
                "Пряный акцент, который добавляет аромату тепло и выразительный темперамент.",
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
                "Тёмная текстура кожи с чувственным, глубоким и уверенным характером.",
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
                "Цветочно-цитрусовый аккорд с чистым и солнечным характером.",
            mood:
                "SOLAR · GREEN · ELEGANT"
        },

        citrus: {
            title: "Citrus",
            description:
                "Искристая свежесть, создающая ощущение чистоты и лёгкости.",
            mood:
                "BRIGHT · FRESH · AIRY"
        }
    };

    const open = (key) => {
        const note = notes[key];

        if (!note) {
            console.error(
                "Unknown scent note:",
                key
            );

            return;
        }

        title.textContent =
            note.title;

        description.textContent =
            note.description;

        mood.textContent =
            note.mood;

        modal.classList.add(
            "is-active"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    };

    const close = () => {
        modal.classList.remove(
            "is-active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !document.querySelector(
                ".modal-overlay.is-active"
            )
        ) {
            document.body.style.overflow =
                "";
        }
    };

    buttons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const key =
                    button.dataset.note;

                open(key);
            }
        );
    });

    closeButton.addEventListener(
        "click",
        close
    );

    queryAll(
        "[data-close-note]",
        modal
    ).forEach((element) => {
        element.addEventListener(
            "click",
            close
        );
    });

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-active"
                )
            ) {
                close();
            }
        }
    );
}


/* =========================================================
   PRIVATE RITUAL MODAL
========================================================= */

function initRitualModal() {
    const modal = query(
        "#ritualModal"
    );

    const closeButton = query(
        "#ritualClose"
    );

    const product = query(
        "#ritualProduct"
    );

    const price = query(
        "#ritualPrice"
    );

    const form = query(
        "#ritualForm"
    );

    const confirmation = query(
        "#ritualConfirmation"
    );

    const doneButton = query(
        "#ritualDone"
    );

    if (
        !modal ||
        !closeButton ||
        !product ||
        !price ||
        !form ||
        !confirmation ||
        !doneButton
    ) {
        return;
    }

    const orderButtons = queryAll(
        ".order-button"
    );

    const steps = queryAll(
        ".ritual-step",
        modal
    );

    const progressItems = queryAll(
        ".ritual-progress-item",
        modal
    );

    let selectedProduct = "";
    let selectedPrice = "";

    const setStep = (stepNumber) => {
        if (
            !Number.isInteger(stepNumber) ||
            stepNumber < 1 ||
            stepNumber > 3
        ) {
            return;
        }

        steps.forEach((step) => {
            const current =
                Number(step.dataset.step);

            step.classList.toggle(
                "is-active",
                current === stepNumber
            );
        });

        progressItems.forEach(
            (item, index) => {
                item.classList.toggle(
                    "active",
                    index < stepNumber
                );
            }
        );
    };

    const open = (
        productName,
        productPrice
    ) => {
        if (
            typeof productName !== "string" ||
            productName.trim().length < 2
        ) {
            console.error(
                "Invalid product."
            );

            return;
        }

        selectedProduct =
            productName.trim();

        selectedPrice =
            typeof productPrice === "string"
                ? productPrice.trim()
                : "";

        product.textContent =
            selectedProduct;

        price.textContent =
            selectedPrice;

        setStep(1);

        modal.classList.add(
            "is-active"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    };

    const close = () => {
        modal.classList.remove(
            "is-active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !document.querySelector(
                ".modal-overlay.is-active"
            )
        ) {
            document.body.style.overflow =
                "";
        }
    };

    orderButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                open(
                    button.dataset.product,
                    button.dataset.price
                );
            }
        );
    });

    queryAll(
        "[data-ritual-next]",
        modal
    ).forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const next =
                    Number(
                        button.dataset
                            .ritualNext
                    );

                setStep(next);
            }
        );
    });

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            try {
                const nameInput =
                    query("#ritualName");

                const phoneInput =
                    query("#ritualPhone");

                if (
                    !nameInput ||
                    !phoneInput
                ) {
                    throw new Error(
                        "Ritual inputs not found."
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
                        "Пожалуйста, введите корректный номер телефона."
                    );

                    phoneInput.focus();

                    return;
                }

                confirmation.textContent =
                    `Спасибо, ${name}. ` +
                    `Вы выбрали ${selectedProduct}. ` +
                    "Мы свяжемся с вами для подтверждения заказа.";

                form.reset();

                setStep(3);
            } catch (error) {
                console.error(
                    "Ritual submit error:",
                    error
                );

                alert(
                    "Не удалось обработать заявку. Попробуйте ещё раз."
                );
            }
        }
    );

    doneButton.addEventListener(
        "click",
        close
    );

    closeButton.addEventListener(
        "click",
        close
    );

    queryAll(
        "[data-close-ritual]",
        modal
    ).forEach((element) => {
        element.addEventListener(
            "click",
            close
        );
    });

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-active"
                )
            ) {
                close();
            }
        }
    );
}


/* =========================================================
   DISCOVERY SET
========================================================= */

function initDiscoveryBuilder() {
    const products = queryAll(
        ".builder-product"
    );

    const slots = queryAll(
        ".builder-slot"
    );

    const countElement =
        query("#selectionCount");

    const clearButton =
        query("#clearSelection");

    const orderButton =
        query("#discoveryOrder");

    if (
        !products.length ||
        !slots.length ||
        !countElement ||
        !clearButton ||
        !orderButton
    ) {
        return;
    }

    const selection = [];
    let draggedScent = "";

    const updateUI = () => {
        countElement.textContent =
            `${selection.length} / 3`;

        slots.forEach(
            (slot, index) => {
                const selected =
                    selection[index];

                const label =
                    slot.querySelector(
                        "small"
                    );

                slot.classList.toggle(
                    "has-item",
                    Boolean(selected)
                );

                if (label) {
                    label.textContent =
                        selected ||
                        "Нажмите, чтобы добавить";
                }
            }
        );

        orderButton.disabled =
            selection.length !== 3;

        if (
            selection.length === 3
        ) {
            orderButton.classList.remove(
                "opacity-30"
            );
        } else {
            orderButton.classList.add(
                "opacity-30"
            );
        }

        products.forEach(
            (button) => {
                const scent =
                    button.dataset.scent;

                if (!scent) {
                    return;
                }

                const selected =
                    selection.includes(
                        scent
                    );

                button.classList.toggle(
                    "is-selected",
                    selected
                );

                const icon =
                    button.querySelector(
                        "i"
                    );

                if (icon) {
                    icon.textContent =
                        selected
                            ? "✓"
                            : "+";
                }
            }
        );
    };


    const add = (scent) => {
        if (
            typeof scent !== "string" ||
            scent.trim().length < 2
        ) {
            return false;
        }

        const normalized =
            scent.trim();

        /*
         * Do not add duplicates.
         */
        if (
            selection.includes(
                normalized
            )
        ) {
            return false;
        }

        /*
         * Maximum 3.
         */
        if (
            selection.length >= 3
        ) {
            return false;
        }

        selection.push(
            normalized
        );

        updateUI();

        return true;
    };


    const remove = (index) => {
        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= selection.length
        ) {
            return;
        }

        selection.splice(
            index,
            1
        );

        updateUI();
    };


    /*
     * Mobile / desktop click interaction.
     *
     * Tap once  -> add.
     * Tap again -> remove.
     */
    products.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const scent =
                    button.dataset.scent;

                if (!scent) {
                    return;
                }

                if (
                    selection.includes(
                        scent
                    )
                ) {
                    const index =
                        selection.indexOf(
                            scent
                        );

                    remove(index);

                    return;
                }

                add(scent);
            }
        );
    });


    /*
     * Desktop drag-and-drop.
     */
    products.forEach((button) => {
        button.addEventListener(
            "dragstart",
            (event) => {
                const scent =
                    button.dataset.scent;

                if (!scent) {
                    event.preventDefault();

                    return;
                }

                draggedScent =
                    scent;

                button.style.opacity =
                    "0.45";

                if (
                    event.dataTransfer
                ) {
                    event.dataTransfer.effectAllowed =
                        "copy";

                    event.dataTransfer.setData(
                        "text/plain",
                        scent
                    );
                }
            }
        );

        button.addEventListener(
            "dragend",
            () => {
                button.style.opacity =
                    "";
                draggedScent = "";
            }
        );
    });


    slots.forEach((slot) => {

        slot.addEventListener(
            "dragover",
            (event) => {
                event.preventDefault();

                slot.classList.add(
                    "is-over"
                );
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

                let scent =
                    draggedScent;

                if (
                    event.dataTransfer
                ) {
                    scent =
                        event.dataTransfer.getData(
                            "text/plain"
                        ) || scent;
                }

                add(scent);

                draggedScent = "";
            }
        );


        /*
         * Tap selected slot to remove.
         */
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

                if (
                    selection[slotIndex]
                ) {
                    remove(
                        slotIndex
                    );
                }
            }
        );
    });


    clearButton.addEventListener(
        "click",
        () => {
            selection.length = 0;

            updateUI();
        }
    );


    /*
     * Discovery Set order.
     */
    orderButton.addEventListener(
        "click",
        () => {
            if (
                selection.length !== 3
            ) {
                return;
            }

            const ritualModal =
                query("#ritualModal");

            const ritualProduct =
                query("#ritualProduct");

            const ritualPrice =
                query("#ritualPrice");

            const steps =
                queryAll(
                    ".ritual-step",
                    ritualModal
                );

            const progress =
                queryAll(
                    ".ritual-progress-item",
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
                selection.join(
                    " · "
                );

            ritualPrice.textContent =
                "DISCOVERY SET · 300 TJS";

            steps.forEach(
                (step) => {
                    step.classList.toggle(
                        "is-active",
                        step.dataset.step ===
                            "1"
                    );
                }
            );

            progress.forEach(
                (item, index) => {
                    item.classList.toggle(
                        "active",
                        index === 0
                    );
                }
            );

            ritualModal.classList.add(
                "is-active"
            );

            ritualModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";
        }
    );


    updateUI();
}


/* =========================================================
   SMOOTH LINKS
========================================================= */

function initSmoothLinks() {
    const links = queryAll(
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
