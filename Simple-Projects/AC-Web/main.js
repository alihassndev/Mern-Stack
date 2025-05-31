// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize animations
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Initialize testimonial slider
const initTestimonialSlider = () => {
  const testimonialSlider = new Swiper(".testimonial-slider", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

// Modal functionality
const setupModals = () => {
  const modalTriggers = document.querySelectorAll("[data-open-modal]");
  const modals = document.querySelectorAll(".modal");
  const overlay = document.getElementById("overlay");

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      overlay.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModals = () => {
    modals.forEach((modal) => modal.classList.remove("show"));
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.openModal;
      openModal(modalId);
    });
  });

  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      closeModals();
    });
  });

  overlay.addEventListener("click", closeModals);

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModals();
    }
  });

  // Form submission
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;
      const urgency = document.getElementById("urgency").value;

      if (!name || !phone || !service || !urgency) {
        alert("Please fill all required fields");
        return;
      }

      // Close booking modal and show success modal
      closeModals();
      setTimeout(() => {
        openModal("success-modal");
      }, 300);

      // Reset form
      this.reset();
    });
  }
};

// FAQ accordion
const setupFAQ = () => {
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentNode;
      const answer = item.querySelector(".faq-answer");

      item.classList.toggle("active");
      answer.style.maxHeight = item.classList.contains("active")
        ? answer.scrollHeight + "px"
        : "0";
    });
  });
};

// Animate stats counters
const animateStats = () => {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = +stat.dataset.count;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      current += step;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };

    updateCount();
  });
};

// Only animate when stats are in view
const setupStatsObserver = () => {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-item").forEach((item) => {
    statsObserver.observe(item);
  });
};

// Mobile menu toggle
const setupMobileMenu = () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      nav.classList.toggle("active");
      document.body.style.overflow = nav.classList.contains("active")
        ? "hidden"
        : "";
    });
  }
};

// Close mobile menu when clicking on nav links
const setupMobileMenuLinks = () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const nav = document.querySelector(".nav");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
};

// Scroll to top button functionality
const setupScrollToTop = () => {
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  if (!scrollToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.remove("hidden");
    } else {
      scrollToTopBtn.classList.add("hidden");
    }
  });

  scrollToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initTestimonialSlider();
  setupModals();
  setupFAQ();
  setupStatsObserver();
  setupMobileMenu();
  setupMobileMenuLinks();
  setupScrollToTop();
});
