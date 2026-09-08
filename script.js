/* ==================================================
   AURÉLIS — PRODUCTS
================================================== */

const womenProducts = [
  {
    image: "01.jpg",
    name: "Gucci Bloom",
    description:
      "Насыщенный цветочный аромат с ощущением свежего цветущего сада.",
    price: 850
  },
  {
    image: "02.jpg",
    name: "Givenchy L'Interdit",
    description:
      "Элегантный и насыщенный аромат с выразительным цветочным характером.",
    price: 900
  },
  {
    image: "03.jpg",
    name: "Parfums de Marly Delina",
    description:
      "Изысканный женственный аромат с ярким цветочным и фруктовым характером.",
    price: 2400
  },
  {
    image: "04.jpg",
    name: "Marc Jacobs Daisy",
    description:
      "Лёгкий женственный аромат с ягодными, цветочными и мягкими нотами.",
    price: 600
  },
  {
    image: "05.jpg",
    name: "Byredo Bal d'Afrique",
    description:
      "Современный аромат с лёгким, элегантным и необычным характером.",
    price: 1500
  },
  {
    image: "06.jpg",
    name: "Versace Bright Crystal",
    description:
      "Свежий и женственный аромат с лёгким и сияющим характером.",
    price: 650
  },
  {
    image: "07.jpg",
    name: "Tom Ford Lost Cherry",
    description:
      "Сладкий и насыщенный аромат с выразительным фруктовым характером.",
    price: 2500
  },
  {
    image: "08.jpg",
    name: "Giorgio Armani Sì Passione",
    description:
      "Женственный и выразительный аромат с ярким современным характером.",
    price: 900
  },
  {
    image: "09.jpg",
    name: "Парфюм ручной работы по мотивам",
    description:
      "Аромат ручной работы, созданный по мотивам популярной парфюмерной композиции.",
    price: 350
  },
  {
    image: "10.jpg",
    name: "Lancôme La Vie Est Belle",
    description:
      "Сладкий и элегантный женский аромат с мягким выразительным характером.",
    price: 800
  },
  {
    image: "11.jpg",
    name: "Dior J'adore",
    description:
      "Изысканный цветочный букет с элегантным женственным характером.",
    price: 1100
  },
  {
    image: "12.jpg",
    name: "Chanel Coco Mademoiselle",
    description:
      "Свежий и элегантный аромат с цитрусовыми, цветочными и древесными нотами.",
    price: 1300
  }
];


const menProducts = [
  {
    image: "01.jpg",
    name: "Dolce&Gabbana The One Pour Homme",
    description:
      "Тёплый и пряный мужской аромат с элегантным и утончённым характером.",
    price: 850
  },
  {
    image: "02.jpg",
    name: "Versace Eros",
    description:
      "Свежий и выразительный аромат с характерным современным мужским звучанием.",
    price: 600
  },
  {
    image: "03.jpg",
    name: "Chanel Bleu de Chanel L'Exclusif",
    description:
      "Глубокий древесно-ароматический аромат с элегантным уверенным характером.",
    price: 2800
  },
  {
    image: "04.jpg",
    name: "Bvlgari Man in Black",
    description:
      "Тёмный и выразительный аромат с тёплым характером и атмосферой огня.",
    price: 900
  },
  {
    image: "05.jpg",
    name: "Armani Acqua di Giò Profondo",
    description:
      "Свежий морской аромат с современным и чистым характером.",
    price: 1000
  },
  {
    image: "06.jpg",
    name: "Dior Sauvage Parfum",
    description:
      "Насыщенный аромат с цитрусовой свежестью и тёплым ванильным аккордом.",
    price: 1600
  },
  {
    image: "07.jpg",
    name: "Rabanne 1 Million",
    description:
      "Яркий и узнаваемый аромат с тёплым сладко-пряным характером.",
    price: 900
  },
  {
    image: "08.jpg",
    name: "Tom Ford Oud Wood",
    description:
      "Изысканный древесный аромат с удом и тёплыми древесными оттенками.",
    price: 2500
  },
  {
    image: "09.jpg",
    name: "Yves Saint Laurent Y Elixir",
    description:
      "Интенсивный аромат с лавандой и тёмными древесными нотами.",
    price: 1800
  },
  {
    image: "10.jpg",
    name: "Citrus & Earthy Men's Fragrance",
    description:
      "Свежий цитрусово-древесный аромат с естественным современным характером.",
    price: 750
  },
  {
    image: "11.jpg",
    name: "Armani Code Eau de Toilette",
    description:
      "Элегантный мужской аромат с мягким привлекательным звучанием.",
    price: 850
  },
  {
    image: "12.jpg",
    name: "Creed Aventus",
    description:
      "Харизматичный фруктово-древесный аромат с выразительным характером.",
    price: 3500
  }
];


/* ==================================================
   FORMAT PRICE
================================================== */

function formatPrice(price) {
  return (
    new Intl.NumberFormat("ru-RU").format(price) +
    " сомони"
  );
}


/* ==================================================
   CREATE PRODUCT CARD
================================================== */

function createProductCard(product, category) {

  const card =
    document.createElement("article");

  card.className =
    "product-card";

  card.innerHTML = `
    <div class="product-image">
      <img
        src="./${category}/${product.image}"
        alt="${product.name}"
        loading="lazy"
      >
    </div>

    <div class="product-info">

      <h3 class="product-name">
        ${product.name}
      </h3>

      <p class="product-description">
        ${product.description}
      </p>

      <div class="product-bottom">

        <span class="product-price">
          ${formatPrice(product.price)}
        </span>

        <button
          class="order-btn"
          type="button"
          data-product="${product.name}"
          data-price="${product.price}"
        >
          Заказать
        </button>

      </div>

    </div>
  `;

  return card;
}


/* ==================================================
   RENDER PRODUCTS
================================================== */

function renderProducts() {

  const womenGrid =
    document.querySelector(
      "#women-products"
    );

  const menGrid =
    document.querySelector(
      "#men-products"
    );


  /* =========================
     WOMEN PRODUCTS
  ========================== */

  if (womenGrid) {

    womenProducts.forEach(product => {

      womenGrid.appendChild(
        createProductCard(
          product,
          "women"
        )
      );

    });

  }


  /* =========================
     MEN PRODUCTS
  ========================== */

  if (menGrid) {

    menProducts.forEach(product => {

      menGrid.appendChild(
        createProductCard(
          product,
          "men"
        )
      );

    });

  }

}


/* ==================================================
   PRODUCT SCROLL REVEAL
================================================== */

function setupProductAnimations() {

  const cards =
    document.querySelectorAll(
      ".product-card"
    );

  if (!cards.length) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {

    cards.forEach(card => {
      card.classList.add("show");
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "show"
            );

            observer.unobserve(
              entry.target
            );
          }

        });

      },
      {
        threshold: 0.08
      }
    );

  cards.forEach(card => {
    observer.observe(card);
  });
}


/* ==================================================
   WHATSAPP ORDER
================================================== */

function setupOrders() {

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".order-btn"
        );

      if (!button) {
        return;
      }

      const product =
        button.dataset.product;

      const price =
        button.dataset.price;

      const message =
        `Здравствуйте! Я хочу заказать парфюм: ${product}. Цена: ${formatPrice(Number(price))}.`;

      const whatsappUrl =
        `https://wa.me/992974008118?text=${encodeURIComponent(message)}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  );
}


/* ==================================================
   CONTACT SCROLL REVEAL
================================================== */

function setupContactAnimation() {

  const contacts =
    document.querySelector(
      ".contacts"
    );

  if (!contacts) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {

    contacts.classList.add(
      "contact-visible"
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            contacts.classList.add(
              "contact-visible"
            );

            observer.unobserve(
              contacts
            );
          }

        });

      },
      {
        threshold: 0.2
      }
    );

  observer.observe(contacts);
}


/* ==================================================
   ADDRESS SCROLL REVEAL
================================================== */

function setupAddressAnimation() {

  const address =
    document.querySelector(
      ".address"
    );

  if (!address) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {

    address.classList.add(
      "address-visible"
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            address.classList.add(
              "address-visible"
            );

            observer.unobserve(
              address
            );
          }

        });

      },
      {
        threshold: 0.2
      }
    );

  observer.observe(address);
}


/* ==================================================
   FOOTER CONTACT TOGGLE
================================================== */

function setupFooterContact() {

  const button =
    document.querySelector(
      "#footer-contact-toggle"
    );

  const social =
    document.querySelector(
      "#footer-social"
    );

  if (!button || !social) {
    return;
  }

  button.addEventListener(
    "click",
    () => {

      const isOpen =
        social.classList.toggle(
          "show"
        );

      button.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );
}


/* ==================================================
   MOBILE MENU
================================================== */

function setupMobileMenu() {

  const button =
    document.querySelector(
      "#mobile-menu-button"
    );

  const navigation =
    document.querySelector(
      "#mobile-navigation"
    );

  if (!button || !navigation) {
    return;
  }


  /* OPEN / CLOSE */

  button.addEventListener(
    "click",
    () => {

      const isOpen =
        navigation.classList.toggle(
          "active"
        );

      button.classList.toggle(
        "active",
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

    }
  );


  /* CLOSE AFTER CLICK */

  const links =
    navigation.querySelectorAll(
      "a"
    );

  links.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        navigation.classList.remove(
          "active"
        );

        button.classList.remove(
          "active"
        );

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        button.setAttribute(
          "aria-label",
          "Открыть меню"
        );

      }
    );

  });


  /* CLOSE ON DESKTOP */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 700
      ) {

        navigation.classList.remove(
          "active"
        );

        button.classList.remove(
          "active"
        );

        button.setAttribute(
          "aria-expanded",
          "false"
        );

        button.setAttribute(
          "aria-label",
          "Открыть меню"
        );

      }

    }
  );
}

/* ==================================================
   PREMIUM HERO ANIMATION — GSAP
================================================== */

function setupPremiumHeroAnimation() {

  if (typeof gsap === "undefined") {
    return;
  }

  const hero = document.querySelector(".hero");

  if (!hero) {
    return;
  }

  const label = hero.querySelector(".hero-label");
  const title = hero.querySelector("h1");
  const description = hero.querySelector(".hero-description");
  const buttons = hero.querySelectorAll(".category-button");

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  if (label) {
    timeline.fromTo(
      label,
      {
        opacity: 0,
        y: 25
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8
      }
    );
  }

  if (title) {
    timeline.fromTo(
      title,
      {
        opacity: 0,
        y: 40,
        scale: 0.96
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1
      },
      "-=0.45"
    );
  }

  if (description) {
    timeline.fromTo(
      description,
      {
        opacity: 0,
        y: 25
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8
      },
      "-=0.55"
    );
  }

  if (buttons.length) {
    timeline.fromTo(
      buttons,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12
      },
      "-=0.45"
    );
  }
}

/* ==================================================
   INITIALIZE
================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderProducts();

    setupProductAnimations();

    setupContactAnimation();

    setupAddressAnimation();

    setupFooterContact();

    setupMobileMenu();

    setupOrders();

   setupPremiumHeroAnimation();
     
  }
);
