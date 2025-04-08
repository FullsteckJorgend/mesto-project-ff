//@import

import { createCard, deleteCard, likeTheCard } from '../components/card.js';

//@DOM
const popup = document.querySelectorAll('.popup');
const buttonPopupClose = document.querySelectorAll('.popup__close');

// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Списки карточек
const placesList = document.querySelector('.places__list');
const cardsList = document.querySelector('.places__list');

// Попапы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupContentImage = popupTypeImage.querySelector('.popup__content');

// Элементы попапа изображения
const popupImgSrc = popupContentImage.querySelector('.popup__image');
const popupText = popupContentImage.querySelector('.popup__caption');

// Формы
const editForm = editPopup.querySelector('.popup__form');
const addForm = newCardPopup.querySelector('.popup__form');

// Инпуты
const popupInputName = editPopup.querySelector('.popup__input_type_name');
const popupInputDescription = editPopup.querySelector('.popup__input_type_description');
const popupInputCardName = newCardPopup.querySelector('.popup__input_type_card-name');
const popupInputCardUrl = newCardPopup.querySelector('.popup__input_type_url');


//@OPEN POPUP
function openPopup(popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
}

function openImgPopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupImgSrc.src = evt.target.src;
    popupImgSrc.alt = evt.target.alt;
    popupText.textContent = evt.target.alt;
    popupTypeImage.classList.remove('popup_is-animated');
    popupTypeImage.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
  }
}


//@CLOSE POPUP
function closePopup() {
  const popupOpened = document.querySelector('.popup_is-opened');
  if (popupOpened) {
    popupOpened.classList.add('popup_is-animated');
    popupOpened.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
  }
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}


//@EDIT PROFILE
function editPopap(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
}


//@ADD NEW CARD
function addCard(evt) {
  evt.preventDefault();
  const dataNewCard = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value,
  };
  cardsList.prepend(createCard(dataNewCard, deleteCard, likeTheCard));
  addForm.reset();
  closePopup();
}
export {
  addCard,
  editPopap,
  closePopupOverlay,
  closePopup,
  openImgPopup,
  openPopup,
  addForm,
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
  popupInputName,
  cardsList
};