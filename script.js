document.addEventListener("DOMContentLoaded", function () {
  // Menú hamburguesa para dispositivos móviles
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic en cualquier enlace
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Inicializar animaciones AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }

  // Animación de contadores numéricos en la sección de estadísticas
  const statsSection = document.getElementById("estadisticas");
  let animated = false;

  function runCounters() {
    const statNumbers = document.querySelectorAll(".stat-number");
    
    statNumbers.forEach(num => {
      const target = +num.getAttribute("data-target");
      let current = 0;
      const increment = target / 50; // Velocidad de conteo

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          num.innerText = Math.ceil(current);
          setTimeout(updateCounter, 30);
        } else {
          num.innerText = target;
        }
      };

      updateCounter();
    });
  }

  if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          runCounters();
          animated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }
});