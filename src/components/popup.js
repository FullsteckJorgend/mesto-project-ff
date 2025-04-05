const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupContentImage = popupTypeImage.querySelector(".popup__content");
const popupImgSrc = popupContentImage.querySelector(".popup__image");
const popupText = popupContentImage.querySelector(".popup__caption");
const buttonPopupClose = document.querySelectorAll(".popup__close");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.querySelector(".popup_type_edit .popup__form");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputDescription = document.querySelector(".popup__input_type_description");

//@open popup

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

function openImgPopup(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupImgSrc.src = evt.target.src;
    popupImgSrc.alt = evt.target.alt;
    popupText.textContent = evt.target.alt;

    document.addEventListener("keydown", closePopupEsc);
    popupTypeImage.classList.add("popup_is-opened");
  }
}

//@close popup

function closePopup(evt) {
  const popupOpened = document.querySelector(".popup_is-opened");
  popupOpened.classList.remove("popup_is-opened");
}

function closePopupEsc(evt) {
  const popupOpened = document.querySelector(".popup_is-opened");

  if (evt.key === "Escape" && popupOpened !== null) {
    popupOpened.classList.remove("popup_is-opened");
    removeEventListener("keydown", closePopupEsc);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector(".popup_is-opened");
    popupOpened.classList.remove("popup_is-opened");
  }
}

//@edit profil

function editPopap(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup()
}




export {
  editPopap,
  closePopupOverlay,
  closePopup,
  openImgPopup,
  openPopup,
  editForm,
  popup,
  editButton,
  newCardPopup,
  addButton,
  editPopup,
  buttonPopupClose,
  placesList,
  profileDescription,
  profileTitle,
  popupInputDescription,
  popupInputName
};
