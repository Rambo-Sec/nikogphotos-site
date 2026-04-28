document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");

  if (!galleryImages.length) {
    return;
  }

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close image">×</button>
    <img class="lightbox-image" src="" alt="">
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");

  function openLightbox(image) {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => openLightbox(image));
    image.setAttribute("tabindex", "0");

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});
