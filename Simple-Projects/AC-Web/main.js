// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize animations
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Handle active navigation links
const handleActiveNavLinks = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // Update active link based on scroll position
  const updateActiveLink = () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Handle case when scrolled to top
    if (scrollY < 100) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#home") {
          link.classList.add("active");
        }
      });
    }
  };

  // Update active link on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Update active link on click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    });
  });
};

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

  // Form validation functions
  const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const errorMessage = formGroup.querySelector(".error-message");
    errorMessage.textContent = message;
  };

  const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
  };

  const validateEmail = (email) => {
    if (email.value.trim() === "") return true; // Email is optional
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email.value.trim()).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^03\d{9}$/;
    return re.test(String(phone.value.trim()));
  };

  const validateName = (name) => {
    const re = /^[A-Za-z .]{3,50}$/;
    return re.test(String(name.value.trim()));
  };

  // Form submission
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    const validateForm = () => {
      let isValid = true;

      // Validate Name
      const name = document.getElementById("name");
      if (name.value.trim() === "") {
        showError(name, "Name is required");
        isValid = false;
      } else if (!validateName(name)) {
        showError(
          name,
          "Please enter a valid name (3-50 characters, letters only)"
        );
        isValid = false;
      } else {
        showSuccess(name);
      }

      // Validate Phone
      const phone = document.getElementById("phone");
      if (phone.value.trim() === "") {
        showError(phone, "Phone number is required");
        isValid = false;
      } else if (!validatePhone(phone)) {
        showError(
          phone,
          "Please enter a valid Pakistani mobile number (03XXXXXXXXX)"
        );
        isValid = false;
      } else {
        showSuccess(phone);
      }

      // Validate Email (optional)
      const email = document.getElementById("email");
      if (email.value.trim() !== "" && !validateEmail(email)) {
        showError(email, "Please enter a valid email address");
        isValid = false;
      } else {
        showSuccess(email);
      }

      // Validate Service
      const service = document.getElementById("service");
      if (service.value === "") {
        showError(service, "Please select a service");
        isValid = false;
      } else {
        showSuccess(service);
      }

      // Validate Urgency
      const urgency = document.getElementById("urgency");
      if (urgency.value === "") {
        showError(urgency, "Please select urgency level");
        isValid = false;
      } else {
        showSuccess(urgency);
      }

      return isValid;
    };

    // Real-time validation
    const inputs = bookingForm.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        switch (input.id) {
          case "name":
            if (input.value.trim() === "") {
              showError(input, "Name is required");
            } else if (!validateName(input)) {
              showError(
                input,
                "Please enter a valid name (3-50 characters, letters only)"
              );
            } else {
              showSuccess(input);
            }
            break;
          case "phone":
            if (input.value.trim() === "") {
              showError(input, "Phone number is required");
            } else if (!validatePhone(input)) {
              showError(
                input,
                "Please enter a valid Pakistani mobile number (03XXXXXXXXX)"
              );
            } else {
              showSuccess(input);
            }
            break;
          case "email":
            if (input.value.trim() !== "" && !validateEmail(input)) {
              showError(input, "Please enter a valid email address");
            } else {
              showSuccess(input);
            }
            break;
          case "service":
          case "urgency":
            if (input.value === "") {
              showError(input, `Please select ${input.id}`);
            } else {
              showSuccess(input);
            }
            break;
        }
      });
    });

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form before submission
      if (!validateForm()) {
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Prepare the template parameters
      const templateParams = {
        to_email: "alihamza8637273@gmail.com",
        from_name: document.getElementById("name").value.trim(),
        from_email:
          document.getElementById("email").value.trim() || "No email provided",
        phone: document.getElementById("phone").value.trim(),
        service: document.getElementById("service").value,
        urgency: document.getElementById("urgency").value,
        brand: document.getElementById("brand").value.trim() || "Not specified",
      };

      // Send the email using EmailJS
      emailjs
        .send("service_58vvejh", "template_wvq5swp", templateParams)
        .then(
          () => {
            // Hide the booking modal
            document.getElementById("booking-modal").classList.remove("show");
            document.getElementById("overlay").classList.remove("show");

            // Show success modal
            document.getElementById("success-modal").classList.add("show");
            document.getElementById("overlay").classList.add("show");

            // Reset the form and validation states
            this.reset();
            inputs.forEach((input) => {
              const formGroup = input.parentElement;
              formGroup.className = "form-group";
            });
          },
          (error) => {
            alert(
              "Failed to send message. Please try again or contact us directly."
            );
            console.error("EmailJS error:", error);
          }
        )
        .finally(() => {
          // Reset button state
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        });
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
      document.body.classList.toggle("nav-active");
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
        document.body.classList.remove("nav-active");
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

// Initialize EmailJS
(function () {
  emailjs.init("4JvEHTw1DNzgw74T5"); // Replace with your EmailJS public key
})();

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  initTestimonialSlider();
  setupModals();
  setupFAQ();
  setupStatsObserver();
  setupMobileMenu();
  setupMobileMenuLinks();
  setupScrollToTop();
  handleActiveNavLinks();
});
