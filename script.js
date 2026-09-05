document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     MENÚ HAMBURGUESA
  ========================================================= */

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
      });

    });

  }


  /* =========================================================
     AOS
  ========================================================= */

  if (typeof AOS !== "undefined") {

    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

  }


  /* =========================================================
     CONTADORES
  ========================================================= */

  const statsSection =
    document.getElementById("estadisticas");

  let countersAnimated = false;


  function runCounters() {

    const statNumbers =
      document.querySelectorAll(".stat-number");


    statNumbers.forEach(function (number) {

      const target =
        parseInt(
          number.getAttribute("data-target"),
          10
        );


      if (isNaN(target)) return;


      let current = 0;

      const increment = target / 50;


      function updateCounter() {

        current += increment;


        if (current < target) {

          number.textContent =
            Math.ceil(current);

          setTimeout(
            updateCounter,
            30
          );

        } else {

          number.textContent =
            target;

        }

      }


      updateCounter();

    });

  }


  if (
    statsSection &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (
              entry.isIntersecting &&
              !countersAnimated
            ) {

              runCounters();

              countersAnimated = true;

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.5
        }
      );


    observer.observe(statsSection);

  }


  /* =========================================================
     FILTROS DE GALERÍA
  ========================================================= */

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const projectCards =
    document.querySelectorAll(".project-card");


  filterButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const filter =
          this.getAttribute("data-filter");


        filterButtons.forEach(
          function (btn) {

            btn.classList.remove(
              "active"
            );

          }
        );


        this.classList.add("active");


        projectCards.forEach(
          function (card) {

            const categories =
              card.getAttribute(
                "data-category"
              ) || "";


            const categoryList =
              categories
                .toLowerCase()
                .split(" ");


            if (
              filter === "all" ||
              categoryList.includes(
                filter.toLowerCase()
              )
            ) {

              card.classList.remove(
                "hidden"
              );

            } else {

              card.classList.add(
                "hidden"
              );

            }

          }
        );

      }
    );

  });


  /* =========================================================
     ELEMENTOS DEL LIGHTBOX
  ========================================================= */

  const lightbox =
    document.getElementById(
      "projectLightbox"
    );

  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );

  const lightboxTitle =
    document.getElementById(
      "lightboxTitle"
    );

  const lightboxLocation =
    document.getElementById(
      "lightboxLocation"
    );

  const lightboxDescription =
    document.getElementById(
      "lightboxDescription"
    );

  const lightboxWhatsapp =
    document.getElementById(
      "lightboxWhatsapp"
    );

  const lightboxClose =
    document.getElementById(
      "lightboxClose"
    );

  const lightboxPrev =
    document.getElementById(
      "lightboxPrev"
    );

  const lightboxNext =
    document.getElementById(
      "lightboxNext"
    );

  const lightboxCounter =
    document.getElementById(
      "lightboxCounter"
    );


  const projectButtons =
    document.querySelectorAll(
      ".view-project"
    );


  let currentProject = 0;


  /* =========================================================
     PROYECTOS VISIBLES
  ========================================================= */

  function getVisibleProjects() {

    return Array.from(
      document.querySelectorAll(
        ".project-card"
      )
    ).filter(function (card) {

      return !card.classList.contains(
        "hidden"
      );

    });

  }


  /* =========================================================
     CONTADOR
  ========================================================= */

  function updateCounter() {

    if (!lightboxCounter) return;


    const projects =
      getVisibleProjects();


    if (!projects.length) {

      lightboxCounter.textContent =
        "";

      return;

    }


    lightboxCounter.textContent =
      (currentProject + 1) +
      " / " +
      projects.length;

  }


  /* =========================================================
     ABRIR LIGHTBOX
  ========================================================= */

  function openProject(button) {

    if (!lightbox) {

      console.error(
        "No existe #projectLightbox en el HTML."
      );

      return;

    }


    const card =
      button.closest(
        ".project-card"
      );


    if (!card) return;


    const image =
      button.getAttribute(
        "data-image"
      ) || "";


    const title =
      button.getAttribute(
        "data-title"
      ) || "Proyecto";


    const location =
      button.getAttribute(
        "data-location"
      ) || "";


    const description =
      button.getAttribute(
        "data-description"
      ) || "";


    const whatsappMessage =
      button.getAttribute(
        "data-whatsapp"
      ) || "Hola, me interesa conocer más sobre sus proyectos";


    /* Imagen */

    if (lightboxImage) {

      lightboxImage.src = image;

      lightboxImage.alt = title;

    }


    /* Título */

    if (lightboxTitle) {

      lightboxTitle.textContent =
        title;

    }


    /* Ubicación */

    if (lightboxLocation) {

      lightboxLocation.textContent =
        "📍 " + location;

    }


    /* Descripción */

    if (lightboxDescription) {

      lightboxDescription.textContent =
        description;

    }


    /* WhatsApp */

    if (lightboxWhatsapp) {

      lightboxWhatsapp.href =
        "https://wa.me/595981704655?text=" +
        encodeURIComponent(
          whatsappMessage
        );

    }


    /* Posición */

    const projects =
      getVisibleProjects();


    const position =
      projects.indexOf(card);


    if (position !== -1) {

      currentProject = position;

    }


    /* Mostrar */

    lightbox.classList.add(
      "active"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";


    updateCounter();

  }


  /* =========================================================
     CERRAR LIGHTBOX
  ========================================================= */

  function closeProject() {

    if (!lightbox) return;


    lightbox.classList.remove(
      "active"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    setTimeout(function () {

      if (lightboxImage) {

        lightboxImage.src = "";

      }

    }, 300);

  }


  /* =========================================================
     BOTONES VER PROYECTO
  ========================================================= */

  projectButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

          event.stopPropagation();

          openProject(this);

        }
      );

    }
  );


  /* =========================================================
     CERRAR
  ========================================================= */

  if (lightboxClose) {

    lightboxClose.addEventListener(
      "click",
      function () {

        closeProject();

      }
    );

  }


  /* =========================================================
     CLIC FUERA
  ========================================================= */

  if (lightbox) {

    lightbox.addEventListener(
      "click",
      function (event) {

        if (
          event.target === lightbox
        ) {

          closeProject();

        }

      }
    );

  }


  /* =========================================================
     PROYECTO ANTERIOR
  ========================================================= */

  if (lightboxPrev) {

    lightboxPrev.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();


        const projects =
          getVisibleProjects();


        if (!projects.length) return;


        currentProject--;


        if (currentProject < 0) {

          currentProject =
            projects.length - 1;

        }


        const button =
          projects[currentProject]
            .querySelector(
              ".view-project"
            );


        if (button) {

          openProject(button);

        }

      }
    );

  }


  /* =========================================================
     PROYECTO SIGUIENTE
  ========================================================= */

  if (lightboxNext) {

    lightboxNext.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();


        const projects =
          getVisibleProjects();


        if (!projects.length) return;


        currentProject++;


        if (
          currentProject >=
          projects.length
        ) {

          currentProject = 0;

        }


        const button =
          projects[currentProject]
            .querySelector(
              ".view-project"
            );


        if (button) {

          openProject(button);

        }

      }
    );

  }


  /* =========================================================
     TECLADO
  ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        !lightbox ||
        !lightbox.classList.contains(
          "active"
        )
      ) {

        return;

      }


      /* ESC */

      if (event.key === "Escape") {

        closeProject();

      }


      /* IZQUIERDA */

      if (
        event.key === "ArrowLeft" &&
        lightboxPrev
      ) {

        lightboxPrev.click();

      }


      /* DERECHA */

      if (
        event.key === "ArrowRight" &&
        lightboxNext
      ) {

        lightboxNext.click();

      }

    }
  );


  /* =========================================================
     VIDEOS DE LA GALERÍA
  ========================================================= */

  const galleryVideos =
    document.querySelectorAll(
      ".project-image video"
    );


  galleryVideos.forEach(
    function (video) {

      /*
         El video comienza solamente
         cuando entra en pantalla.
      */

      if (
        "IntersectionObserver" in window
      ) {

        const videoObserver =
          new IntersectionObserver(
            function (entries) {

              entries.forEach(
                function (entry) {

                  if (
                    entry.isIntersecting
                  ) {

                    video.play().catch(
                      function () {}
                    );

                  } else {

                    video.pause();

                  }

                }
              );

            },
            {
              threshold: 0.5
            }
          );


        videoObserver.observe(video);

      }

    }
  );

});
