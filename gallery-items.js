import images from "./images.js";

const galleryContainer = document.querySelector(".js-gallery");
const closeModal = document.querySelector(".lightbox__button");
const modalWindow = document.querySelector(".js-lightbox");
const overlay = document.querySelector(".lightbox__overlay");
const modalImg = document.querySelector(".lightbox__image");

const imagesMarkup = creatImagesMarkup(images);

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

galleryContainer.addEventListener("click", onOpenModal);
closeModal.addEventListener("click", onCloseModal);

function creatImagesMarkup(img) {
  return img
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
      `;
    })
    .join("");
}

function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  document.addEventListener("keydown", onCloseEscPress);
  overlay.addEventListener("click", onCloseClickOverlay);

  modalWindow.classList.add("is-open");

  modalImg.src = evt.target.dataset.source;
  modalImg.alt = evt.target.alt;
}

function onCloseModal() {
  document.removeEventListener("keydown", onCloseEscPress);
  overlay.removeEventListener("click", onCloseClickOverlay);

  modalWindow.classList.remove("is-open");
  modalImg.src = "";
}

function onCloseEscPress(evt) {
  if (evt.code === "Escape") {
    onCloseModal();
  }
}

function onCloseClickOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}
