// ─── CSS ──────────────────────────────────────────────
import "../pages/index.css";

// ─── JS: Данные ───────────────────────────────────────
import { initialCards } from "./cards.js";

// ─── JS: Компоненты ───────────────────────────────────
import { createCard, deleteCard, likeTheCard } from "../components/card.js";
import {
  closePopupOverlay,
  closePopup,
  openPopup
} from "../components/popup.js";

// ─── DOM ──────────────────────────────────────────────
const popup = document.querySelectorAll('.popup');

// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Карточки
const cardsList = document.querySelector('.places__list');

// Попапы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

// Формы
const editForm = editPopup.querySelector('.popup__form');
const addForm = newCardPopup.querySelector('.popup__form');

// Инпуты
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const popupInputCardName = document.querySelector('.popup__input_type_card-name');
const popupInputCardUrl = document.querySelector('.popup__input_type_url');

// Кнопки закрытия
const editPopupCloseButton = editPopup.querySelector('.popup__close');
const addPopupCloseButton = newCardPopup.querySelector('.popup__close');
const imagePopupCloseButton = popupTypeImage.querySelector('.popup__close');

// Элементы попапа с изображением
const popupImgSrc = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__caption');

// ─── Обработчики ──────────────────────────────────────

// Открытие попапа изображения
function openImgPopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupImgSrc.src = evt.target.src;
    popupImgSrc.alt = evt.target.alt;
    popupText.textContent = evt.target.alt;
    openPopup(popupTypeImage);
  }
}

// Изменение профиля
function editsPopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(editPopup);
}

// Добавление карточки
function addCard(evt) {
  evt.preventDefault();
  const dataNewCard = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value,
  };
  addForm.reset();
  cardsList.prepend(createCard(dataNewCard, deleteCard, likeTheCard, openImgPopup));
  closePopup(newCardPopup);
}

// ─── Инициализация карточек ──────────────────────────
initialCards.forEach((card) => {
  cardsList.append(createCard(card, deleteCard, likeTheCard, openImgPopup));
});

// ─── Анимация всех попапов при загрузке ───────────────
popup.forEach((item) => item.classList.add("popup_is-animated"));

// ─── Обработчики событий ─────────────────────────────

// Открытие формы редактирования профиля
editButton.addEventListener("click", () => {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openPopup(editPopup);
});

// Открытие формы добавления карточки
addButton.addEventListener("click", () => openPopup(newCardPopup));

// Закрытие попапов по клику на оверлей
editPopup.addEventListener("click", (evt) => closePopupOverlay(evt, editPopup));
newCardPopup.addEventListener("click", (evt) => closePopupOverlay(evt, newCardPopup));
popupTypeImage.addEventListener("click", (evt) => closePopupOverlay(evt, popupTypeImage));

// Закрытие попапов по кнопке "крестик"
editPopupCloseButton.addEventListener("click", () => closePopup(editPopup));
addPopupCloseButton.addEventListener("click", () => closePopup(newCardPopup));
imagePopupCloseButton.addEventListener("click", () => closePopup(popupTypeImage));

// Сабмит формы редактирования профиля
editForm.addEventListener("submit", editsPopup);

// Сабмит формы добавления карточки
addForm.addEventListener("submit", addCard);
