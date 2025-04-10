// ─── CSS ──────────────────────────────────────────────
import "../pages/index.css";

// ─── JS: Данные ───────────────────────────────────────
import { initialCards } from "./cards.js";

// ─── JS: Компоненты ───────────────────────────────────
import { createCard, deleteCard, likeTheCard } from "../components/card.js";

import {
  addCard,
  editsPopup,
  closePopupOverlay,
  closePopup,
  openImgPopup,
  openPopup
} from "../components/popup.js";

// ─── DOM ──────────────────────────
const popup = document.querySelectorAll('.popup');

// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Списки карточек
const cardsList = document.querySelector('.places__list');

// Попапы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

// Формы
const editForm = editPopup.querySelector('.popup__form');
const addForm = newCardPopup.querySelector('.popup__form');

// Инпуты
const popupInputName = editPopup.querySelector('.popup__input_type_name');
const popupInputDescription = editPopup.querySelector('.popup__input_type_description');

const editPopupCloseButton = editPopup.querySelector('.popup__close')
const addPopupCloseButton = newCardPopup.querySelector('.popup__close')
const ImegePopupCloseButton = popupTypeImage.querySelector('.popup__close')




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
ImegePopupCloseButton.addEventListener("click", () => closePopup(popupTypeImage));

// Сабмит формы редактирования профиля
editForm.addEventListener("submit", editsPopup);

// Сабмит формы добавления карточки
addForm.addEventListener("submit", (evt) => addCard(evt, createCard, deleteCard, likeTheCard, openImgPopup));
