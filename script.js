const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const themeToggle = document.querySelector(".theme-toggle");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀" : "☼";
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀";
}

// Active navigation link while scrolling
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === `#${entry.target.id}`
      ));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => navObserver.observe(section));

// Soft reveal animations
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Portfolio filtering
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    projects.forEach(project => {
      const visible = category === "all" || project.dataset.category === category;
      project.style.display = visible ? "" : "none";
    });
  });
});

// Project modal
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalArt = document.querySelector("#modal-art");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", event => {
    const card = event.currentTarget.closest(".project-card");
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
    modalArt.className = "modal-art";
    modalArt.innerHTML = `<img src="${card.dataset.image}" alt="${card.dataset.title}">`;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  });
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose?.addEventListener("click", closeModal);
document.querySelector(".modal-backdrop")?.addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
});

// Tiny cursor glow on desktop
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  if (window.innerWidth > 900) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
