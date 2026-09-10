"use strict";

/* =========================================================
   AURÉLIS — NOIR LUXURY INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    try {
        initPreloader();
        initHeader();
        initMobileMenu();
        initHeroVideo();
        initRevealAnimations();
        initCustomCursor();
        initNoteModal();
        initRitualModal();
        initDiscoveryBuilder();
        initMagneticElements();
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

function $(selector, root = document) {
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


function $$(selector, root = document) {
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
    const preloader = $("#preloader");
    const progress = $("#preloaderProgress");

    if (!preloader || !progress) {
        return;
    }

    requestAnimationFrame(() => {
        progress.style.transition =
            "transform 1500ms cubic-bezier(0.16, 1, 0.3, 1)";

        progress.style.transform =
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
    const header = $("#header");

    if (!header) {
        return;
    }

    const update = () => {
        header.classList.toggle(
            "header-scrolled",
            window.scrollY > 36
        );
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
    const button = $("#menuButton");
    const menu = $("#mobileMenu");

    if (!button || !menu) {
        return;
    }

    const links = $$(".mobile-link", menu);

    const open = () => {
        button.classList.add("menu-active");

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

        document.body.classList.add(
            "lock-scroll"
        );
    };

    const close = () => {
        button.classList.remove(
            "menu-active"
        );

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

        document.body.classList.remove(
            "lock-scroll"
        );
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
            if (
                event.key === "Escape" &&
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
   MENU ICON
========================================================= */

const menuIconStyle = document.createElement("style");

menuIconStyle.textContent = `
    .menu-active .menu-bar:nth-child(1) {
        transform: translateY(4px) rotate(45deg);
    }

    .menu-active .menu-bar:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
    }

    .menu-active .menu-bar:nth-child(3) {
        transform: translateY(-4px) rotate(-45deg);
    }
`;

document.head.appendChild(menuIconStyle);


/* =========================================================
   HERO VIDEO
========================================================= */

function initHeroVideo() {
    const video = $("#heroVideo");

    if (!video) {
        return;
    }

    /*
     * Optional local video:
     *
     * assets/aurelis-noir.mp4
     *
     * The site works without this file.
     */

    const source =
        document.createElement("source");

    source.src =
        "assets/aurelis-noir.mp4";

    source.type =
        "video/mp4";

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
                 * Autoplay can be restricted
                 * by browser policy.
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
    const elements = $$(".reveal");

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
                threshold: 0.1,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );

    elements.forEach((element) => {
        observer.observe(element);
    });
}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCustomCursor() {
    const cursor = $("#cursor");
    const dot = $("#cursorDot");

    if (
        !cursor ||
        !dot ||
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let dotX = 0;
    let dotY = 0;

    const move = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    };

    const animate = () => {
        cursorX +=
            (mouseX - cursorX) * 0.14;

        cursorY +=
            (mouseY - cursorY) * 0.14;

        dotX +=
            (mouseX - dotX) * 0.35;

        dotY +=
            (mouseY - dotY) * 0.35;

        cursor.style.transform =
            `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

        dot.style.transform =
            `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(
            animate
        );
    };

    document.addEventListener(
        "mousemove",
        move,
        { passive: true }
    );

    $$("[data-cursor]").forEach(
        (element) => {
            element.addEventListener(
                "mouseenter",
                () => {
                    const type =
                        element.dataset.cursor;

                    cursor.classList.remove(
                        "cursor-hover",
                        "cursor-card"
                    );

                    if (
                        type === "card"
                    ) {
                        cursor.classList.add(
                            "cursor-card"
                        );
                    } else {
                        cursor.classList.add(
                            "cursor-hover"
                        );
                    }
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursor.classList.remove(
                        "cursor-hover",
                        "cursor-card"
                    );
                }
            );
        }
    );

    animate();
}


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

function initMagneticElements() {
    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }

    const elements =
        $$(".magnetic");

    elements.forEach((element) => {
        element.addEventListener(
            "mousemove",
            (event) => {
                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                const strength = 0.09;

                element.style.transform =
                    `translate(${x * strength}px, ${y * strength}px)`;
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                element.style.transform =
                    "";
            }
        );
    });
}


/* =========================================================
   NOTE MODAL
========================================================= */

function initNoteModal() {
    const modal = $("#noteModal");

    const closeButton =
        $("#noteClose");

    const title =
        $("#noteTitle");

    const description =
        $("#noteDescription");

    const mood =
        $("#noteMood");

    const buttons =
        $$(".note-badge");

    if (
        !modal ||
        !closeButton ||
        !title ||
        !description ||
        !mood ||
        !buttons.length
    ) {
        return;
    }

    const notes = {
        oud: {
            title: "Oud",
            description:
                "Глубокая древесная нота с сухим, тёмным и восточным характером.",
            mood:
                "DEEP · WARM · MYSTERIOUS"
        },

        amber: {
            title: "Amber",
            description:
                "Тёплый смолистый аккорд, создающий ощущение мягкого света и глубины.",
            mood:
                "WARM · LUMINOUS · SENSUAL"
        },

        wood: {
            title: "Woods",
            description:
                "Сухая древесная структура, придающая композиции силу и уверенность.",
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
                "Белый цветочный аккорд с воздушным, чистым и слегка кремовым характером.",
            mood:
                "WHITE · AIRY · ELEGANT"
        },

        iris: {
            title: "Iris",
            description:
                "Пудровая и сухая нота, добавляющая композиции холодную утончённость.",
            mood:
                "POWDERY · COOL · REFINED"
        },

        spice: {
            title: "Spice",
            description:
                "Тёплый пряный акцент с выразительным и чувственным характером.",
            mood:
                "WARM · SPICED · BOLD"
        },

        cedar: {
            title: "Cedar",
            description:
                "Сухое кедровое дерево с благородным и структурированным звучанием.",
            mood:
                "DRY · STRUCTURED · NOBLE"
        },

        leather: {
            title: "Leather",
            description:
                "Тёмная фактурная нота кожи с чувственным и уверенным оттенком.",
            mood:
                "DARK · TEXTURED · MAGNETIC"
        },

        bergamot: {
            title: "Bergamot",
            description:
                "Свежий цитрусовый аккорд, который открывает композицию светло и чисто.",
            mood:
                "FRESH · BRIGHT · CLEAN"
        },

        neroli: {
            title: "Neroli",
            description:
                "Солнечный цветочно-цитрусовый аккорд с чистым зелёным оттенком.",
            mood:
                "SOLAR · GREEN · ELEGANT"
        },

        citrus: {
            title: "Citrus",
            description:
                "Искристая свежесть, создающая лёгкое и чистое первое впечатление.",
            mood:
                "BRIGHT · FRESH · AIRY"
        }
    };

    const open = (key) => {
        const data = notes[key];

        if (!data) {
            console.error(
                "Unknown note:",
                key
            );

            return;
        }

        title.textContent =
            data.title;

        description.textContent =
            data.description;

        mood.textContent =
            data.mood;

        modal.classList.add(
            "is-active"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lock-scroll"
        );
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
            document.body.classList.remove(
                "lock-scroll"
            );
        }
    };

    buttons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                open(
                    button.dataset.note
                );
            }
        );
    });

    closeButton.addEventListener(
        "click",
        close
    );

    $$(
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
   PRIVATE RITUAL
========================================================= */

function initRitualModal() {
    const modal =
        $("#ritualModal");

    const closeButton =
        $("#ritualClose");

    const product =
        $("#ritualProduct");

    const price =
        $("#ritualPrice");

    const form =
        $("#ritualForm");

    const confirmation =
        $("#ritualConfirmation");

    const doneButton =
        $("#ritualDone");

    const orderButtons =
        $$(".order-button");

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

    const steps =
        $$(".ritual-step", modal);

    const progress =
        $$(".ritual-progress", modal);

    let selectedProduct = "";
    let selectedPrice = "";

    const setStep = (number) => {
        if (
            number < 1 ||
            number > 3
        ) {
            return;
        }

        steps.forEach(
            (step) => {
                step.classList.toggle(
                    "is-active",
                    Number(
                        step.dataset.step
                    ) === number
                );
            }
        );

        progress.forEach(
            (item, index) => {
                item.classList.toggle(
                    "active",
                    index < number
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
                "Invalid product name."
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

        document.body.classList.add(
            "lock-scroll"
        );
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
            document.body.classList.remove(
                "lock-scroll"
            );
        }
    };

    orderButtons.forEach(
        (button) => {
            button.addEventListener(
                "click",
                () => {
                    open(
                        button.dataset.product,
                        button.dataset.price
                    );
                }
            );
        }
    );

    $$(
        "[data-ritual-next]",
        modal
    ).forEach(
        (button) => {
            button.addEventListener(
                "click",
                () => {
                    setStep(
                        Number(
                            button.dataset
                                .ritualNext
                        )
                    );
                }
            );
        }
    );

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            try {
                const nameInput =
                    $("#ritualName");

                const phoneInput =
                    $("#ritualPhone");

                if (
                    !nameInput ||
                    !phoneInput
                ) {
                    throw new Error(
                        "Form fields missing."
                    );
                }

                const name =
                    nameInput.value.trim();

                const phone =
                    phoneInput.value.trim();

                if (name.length < 2) {
                    alert(
                        "Пожалуйста, введите корректное имя."
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

                setStep(3);
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
        close
    );

    closeButton.addEventListener(
        "click",
        close
    );

    $$(
        "[data-close-ritual]",
        modal
    ).forEach(
        (element) => {
            element.addEventListener(
                "click",
                close
            );
        }
    );

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
    const products =
        $$(".builder-product");

    const slots =
        $$(".builder-slot");

    const count =
        $("#selectionCount");

    const clear =
        $("#clearSelection");

    const order =
        $("#discoveryOrder");

    if (
        !products.length ||
        !slots.length ||
        !count ||
        !clear ||
        !order
    ) {
        return;
    }

    const selection = [];

    let draggedScent = "";

    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;

    const update = () => {
        count.textContent =
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

        order.disabled =
            selection.length !== 3;

        if (
            selection.length === 3
        ) {
            order.classList.remove(
                "opacity-30"
            );
        } else {
            order.classList.add(
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

        const value =
            scent.trim();

        if (
            selection.includes(
                value
            )
        ) {
            return false;
        }

        if (
            selection.length >= 3
        ) {
            return false;
        }

        selection.push(
            value
        );

        update();

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

        update();
    };


    /*
     * Mobile:
     * click = add/remove.
     */
    products.forEach(
        (button) => {
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
                        remove(
                            selection.indexOf(
                                scent
                            )
                        );

                        return;
                    }

                    add(scent);
                }
            );
        }
    );


    /*
     * Desktop:
     * native drag-and-drop.
     */
    products.forEach(
        (button) => {
            button.addEventListener(
                "dragstart",
                (event) => {
                    if (isTouchDevice) {
                        event.preventDefault();

                        return;
                    }

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
        }
    );


    slots.forEach(
        (slot) => {

            slot.addEventListener(
                "dragover",
                (event) => {
                    if (isTouchDevice) {
                        return;
                    }

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
                    if (isTouchDevice) {
                        return;
                    }

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
                            ) ||
                            scent;
                    }

                    add(scent);

                    draggedScent = "";
                }
            );

            /*
             * Click a filled slot = remove.
             */
            slot.addEventListener(
                "click",
                () => {
                    const index =
                        Number(
                            slot.dataset.slot
                        );

                    if (
                        !Number.isInteger(
                            index
                        )
                    ) {
                        return;
                    }

                    if (
                        selection[index]
                    ) {
                        remove(index);
                    }
                }
            );
        }
    );


    clear.addEventListener(
        "click",
        () => {
            selection.length = 0;

            update();
        }
    );


    /*
     * Open Ritual for Discovery Set.
     */
    order.addEventListener(
        "click",
        () => {
            if (
                selection.length !== 3
            ) {
                return;
            }

            const modal =
                $("#ritualModal");

            const product =
                $("#ritualProduct");

            const price =
                $("#ritualPrice");

            const steps =
                $$(".ritual-step", modal);

            const progress =
                $$(".ritual-progress", modal);

            if (
                !modal ||
                !product ||
                !price
            ) {
                return;
            }

            product.textContent =
                selection.join(
                    " · "
                );

            price.textContent =
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

            modal.classList.add(
                "is-active"
            );

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "lock-scroll"
            );
        }
    );

    update();
}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

function initSmoothLinks() {
    const links =
        $$('a[href^="#"]');

    links.forEach(
        (link) => {
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
                            "Invalid target:",
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
        }
    );
}
