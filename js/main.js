document.addEventListener("DOMContentLoaded", () => {
  const sidebarOpen = document.getElementById("sidebar-open");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarContent = document.getElementById("sidebar-content");

  // Open sidebar
  sidebarOpen.addEventListener("click", () => {
    sidebarOverlay.classList.remove("opacity-0", "invisible"); // show overlay
    sidebarContent.classList.remove("-translate-x-full"); // slide in sidebar
  });

  // Close sidebar when clicking the X button
  sidebarClose.addEventListener("click", () => {
    sidebarOverlay.classList.add("opacity-0", "invisible"); // hide overlay
    sidebarContent.classList.add("-translate-x-full"); // slide out sidebar
  });

  // Close sidebar when clicking outside content (on overlay only)
  sidebarOverlay.addEventListener("click", (e) => {
    if (e.target === sidebarOverlay) {
      sidebarOverlay.classList.add("opacity-0", "invisible");
      sidebarContent.classList.add("-translate-x-full");
    }
  });

  // tabs logic
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length > 0 && tabContents.length > 0) {
    // أول زرار يبقى Active افتراضي
    tabButtons[0].style.color = "#ef4444";
    tabButtons[0].style.borderBottom = "2px solid #ef4444";

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // reset كل الأزرار
        tabButtons.forEach((b) => {
          b.style.color = "";
          b.style.borderBottom = "2px solid transparent";
        });

        // hide كل المحتوى
        tabContents.forEach((c) => c.classList.add("hidden"));

        // فعل الزرار الحالي
        btn.style.color = "#ef4444";
        btn.style.borderBottom = "2px solid #ef4444";

        // أظهر المحتوى بتاعه
        document.getElementById(btn.dataset.tab).classList.remove("hidden");
      });
    });
  }

  // ================== product details modal ==================
  const productModal = document.getElementById("product-modal");
  const closeProductModal = document.getElementById("close-product-modal");
  const modalContent = document.getElementById("modal-content");

  if (productModal) {
    document.querySelectorAll(".product-detail-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        productModal.classList.remove("hidden");
      });
    });

    if (closeProductModal) {
      closeProductModal.addEventListener("click", () => {
        productModal.classList.add("hidden");
      });
    }

    productModal.addEventListener("click", (e) => {
      if (
        modalContent &&
        !modalContent.contains(e.target) &&
        e.target !== closeProductModal
      ) {
        productModal.classList.add("hidden");
      }
    });
  }

  // ================== product slider ==================
  if (document.querySelector(".productSwiper")) {
    const productSwiper = new Swiper(".productSwiper", {
      slidesPerView: 4,
      spaceBetween: 10,
    });
  }

  // ================== change product image ==================
  const mainImage = document.getElementById("Product-img");
  const thumbs = document.querySelectorAll(".product-thumb");
  if (mainImage && thumbs.length > 0) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
      });
    });
  }
  // search logic
  if (document.getElementById("search-btn")) {
    document.getElementById("search-btn").addEventListener("click", () => {
      document.getElementById("products-layout").classList.toggle("hidden");
      document.getElementById("searchProduct").classList.toggle("hidden");
    });
  }
  // cart animation
  const cartIcon = document.getElementById("cart-icon");
  const addToCartButtons = document.querySelectorAll(".tab-content button");

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Create a small ball element
      const ball = document.createElement("div");
      ball.style.position = "fixed";
      ball.style.zIndex = "9999";
      ball.style.width = "20px";
      ball.style.height = "20px";
      ball.style.borderRadius = "50%";
      ball.style.background = "#ef4444";
      ball.style.transition = "all .7s ease-in-out";

      // Start position (center of the clicked button)
      const btnRect = btn.getBoundingClientRect();
      ball.style.left = btnRect.left + btnRect.width / 2 - 10 + "px";
      ball.style.top = btnRect.top + btnRect.height / 2 - 10 + "px";

      document.body.appendChild(ball);

      // End position (center of the cart icon)
      const cartRect = cartIcon.getBoundingClientRect();

      setTimeout(() => {
        ball.style.left = cartRect.left + cartRect.width / 2 - 10 + "px";
        ball.style.top = cartRect.top + cartRect.height / 2 - 10 + "px";
        ball.style.transform = "scale(0.3)";
        ball.style.opacity = "0.3";
      }, 50);

      // Remove the ball after the animation ends
      ball.addEventListener("transitionend", () => {
        ball.remove();
      });
    });
  });
  // phone input with country code
  const countryBtn = document.getElementById("countryBtn");
  const list = document.getElementById("countryList");
  const selectedFlag = document.getElementById("selectedFlag");
  const selectedCode = document.getElementById("selectedCode");
  if (countryBtn && list && selectedFlag && selectedCode) {
    countryBtn.addEventListener("click", () => {
      list.classList.toggle("hidden");
    });

    document.querySelectorAll("#countryList div").forEach((item) => {
      item.addEventListener("click", () => {
        selectedFlag.src = item.dataset.flag;
        selectedCode.textContent = item.dataset.code;
        list.classList.add("hidden");
      });
    });

    // لو عاوز يقفل القائمة لو ضغط برة
    document.addEventListener("click", (e) => {
      if (!countryBtn.contains(e.target) && !list.contains(e.target)) {
        list.classList.add("hidden");
      }
    });
  }
  // handled reciving way
  const pickupRadio = document.getElementById("receiving-way-1");
  const deliveryRadio = document.getElementById("receiving-way-2");
  const addressInput = document.getElementById("addressInput");

  if (pickupRadio && deliveryRadio) {
    pickupRadio.addEventListener("change", () => {
      if (pickupRadio.checked) {
        addressInput.classList.add("hidden");
      }
    });

    deliveryRadio.addEventListener("change", () => {
      if (deliveryRadio.checked) {
        addressInput.classList.remove("hidden");
      }
    });
  }
  // hero slider
  if (document.querySelector(".mySwiper")) {
    const swiper = new Swiper(".mySwiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      autoplay: { delay: 3000, disableOnInteraction: false },
      speed: 600,
    });
  }
  // ================== category slider ==================
  if (document.querySelector(".categSwiper")) {
    const categSswiper = new Swiper(".categSwiper", {
      loop: true,
      spaceBetween: 24,
      speed: 600,
      slidesPerGroup: 1,
      autoplay: { delay: 3000, disableOnInteraction: false },
      breakpoints: {
        0: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      },
    });
  }

  // coupon logic
  const openBtn = document.getElementById("openCouponBtn");
  const closeBtn = document.getElementById("closeCouponBtn");
  const modal = document.getElementById("couponModal");
  const copyBtn = document.getElementById("copyCouponBtn");

  // فتح المودال
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // قفل المودال بزر ✕
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // قفل المودال لما تدوس على الـ overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // نسخ الكوبون
  copyBtn.addEventListener("click", () => {
    const code = "SAVE10";
    navigator.clipboard.writeText(code);
    alert("Coupon copied: " + code);
  });

});
