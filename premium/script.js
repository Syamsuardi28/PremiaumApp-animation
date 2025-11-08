// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active Navigation Link
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  });
});

// Counter Animation
const counters = document.querySelectorAll(".counter");
const speed = 200;

const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const count = +counter.innerText;
  const increment = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => runCounter(counter), 10);
  } else {
    counter.innerText = target + (target === 99 ? "%" : "+");
  }
};

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        runCounter(counter);
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// AOS Animation (Animate on Scroll)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll("[data-aos]").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Contact Form Handler
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const pesan = document.getElementById("pesan").value;

  // WhatsApp message format
  const whatsappNumber = "6281234567890";
  const message = `*Pesan dari Website PremioApp*%0A%0A*Nama:* ${nama}%0A*Email:* ${email}%0A*Pesan:* ${pesan}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Open WhatsApp
  window.open(whatsappUrl, "_blank");

  // Reset form
  contactForm.reset();

  // Show success message (optional)
  alert("Terima kasih! Pesan Anda akan dikirim via WhatsApp.");
});

// Product "Beli Sekarang" Button Handler
document.querySelectorAll(".beli-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".card");
    const productName = card.querySelector("h3").textContent;
    const price = card.querySelector(".price").textContent;

    const whatsappNumber = "6281234567890";
    const message = `Halo, saya tertarik untuk membeli *${productName}* dengan harga ${price}. Mohon info lebih lanjut.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  });
});

// Newsletter Form Handler
const newsletterForm = document.querySelector(".newsletter");
const newsletterInput = newsletterForm.querySelector('input[type="email"]');
const newsletterBtn = newsletterForm.querySelector("button");

newsletterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = newsletterInput.value;

  if (email) {
    const whatsappNumber = "6281234567890";
    const message = `Saya ingin berlangganan newsletter PremioApp dengan email: ${email}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    newsletterInput.value = "";
    alert("Terima kasih! Anda akan segera menerima update dari kami.");
  }
});

// Lazy Loading Images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Parallax Effect for Hero
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - scrolled / 800;
  }
});

// Prevent right-click (optional security)
// document.addEventListener('contextmenu', (e) => e.preventDefault());

console.log("🎉 PremioApp loaded successfully!");
