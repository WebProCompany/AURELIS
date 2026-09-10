"use strict";

/* ==================================================
   AURÉLIS — PREMIUM INTERACTIONS
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    try {
        initializePreloader();
        initializeHeader();
        initializeMobileMenu();
        initializeScrollReveal();
        initializeOrderModal();
        initializeSmoothLinks();
    } catch (error) {
        console.error("AURÉLIS initialization error:", error);
    }
});


/* ==================================================
   PRELOADER
================================================== */

function initializePreloader() {
    const preloader = document.getElementById("preloader");

    if (!preloader) {
        return;
    }

    window.addEventListener("load", () => {
        window.setTimeout(() => {
            preloader.classList.add("is-hidden");
        }, 1500);
    });
}


/* ==================================================
   HEADER
================================================== */

function initializeHeader() {
    const header = document.getElementById("header");

    if (!header) {
        return;
    }

    const updateHeader = () => {
        if (window.scrollY > 40) {
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
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuButton || !mobileMenu) {
        return;
    }

    const menuLinks = mobileMenu.querySelectorAll("a");

    const openMenu = () => {
        menuButton.classList.add("active");
        mobileMenu.classList.add("open");
        document.body.classList.add("menu-open");

        menuButton.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        menuButton.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}


/* ==================================================
   SCROLL REVEAL
================================================== */

function initializeScrollReveal() {
    const elements = document.querySelectorAll(
        ".intro__content, .section-heading, .product-card, " +
        ".story__visual, .story__content, .review-card, .cta__inner"
    );

    if (!elements.length) {
        return;
    }

    elements.forEach((element) => {
        element.classList.add("reveal");
    });

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}


/* ==================================================
   ORDER MODAL
================================================== */

function initializeOrderModal() {
    const modal = document.getElementById("orderModal");
    const modalClose = document.getElementById("modalClose");
    const modalProduct = document.getElementById("modalProduct");
    const orderForm = document.getElementById("orderForm");
    const backdrop = modal?.querySelector(".modal__backdrop");

    const orderButtons = document.querySelectorAll(".order-button");

    if (
        !modal ||
        !modalClose ||
        !modalProduct ||
        !orderForm ||
        !orderButtons.length
    ) {
        return;
    }

    let selectedProduct = "";

    const openModal = (productName) => {
        if (
            typeof productName !== "string" ||
            productName.trim().length < 2
        ) {
            console.error("Invalid product name.");
            return;
        }

        selectedProduct = productName.trim();

        modalProduct.textContent = selectedProduct;

        modal.classList.add("open");
        document.body.classList.add("modal-open");

        const nameInput = document.getElementById("customerName");

        if (nameInput) {
            window.setTimeout(() => {
                nameInput.focus();
            }, 400);
        }
    };

    const closeModal = () => {
        modal.classList.remove("open");
        document.body.classList.remove("modal-open");
    };

    orderButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const product = button.dataset.product;

            if (!product) {
                console.error("Product data is missing.");
                return;
            }

            openModal(product);
        });
    });

    modalClose.addEventListener("click", closeModal);

    if (backdrop) {
        backdrop.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {
            closeModal();
        }
    });

    orderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        try {
            const nameInput = document.getElementById("customerName");
            const phoneInput = document.getElementById("customerPhone");

            if (!nameInput || !phoneInput) {
                throw new Error("Form fields are missing.");
            }

            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();

            if (name.length < 2) {
                alert("Пожалуйста, введите корректное имя.");
                nameInput.focus();
                return;
            }

            if (phone.length < 7) {
                alert("Пожалуйста, введите корректный номер телефона.");
                phoneInput.focus();
                return;
            }

            /*
             * Здесь позже подключим настоящий WhatsApp/Telegram
             * номер бренда.
             *
             * Сейчас намеренно используется alert,
             * чтобы не вставлять неизвестный номер.
             */

            alert(
                `Спасибо, ${name}!\n\n` +
                `Ваш выбор: ${selectedProduct}\n` +
                `Телефон: ${phone}\n\n` +
                "Мы свяжемся с вами для подтверждения заказа."
            );

            orderForm.reset();
            closeModal();

        } catch (error) {
            console.error("Order form error:", error);
            alert(
                "Не удалось обработать заявку. " +
                "Попробуйте ещё раз."
            );
        }
    });
}


/* ==================================================
   SMOOTH ANCHOR LINKS
================================================== */

function initializeSmoothLinks() {
    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}
