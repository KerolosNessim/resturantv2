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
  // cart modal
  
});
