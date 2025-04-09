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
  openPopup,
  popupTypeImage,
  addForm,
  editForm,
  popup,
  editButton,
  newCardPopup,
  addButton,
  editPopup,
  profileDescription,
  profileTitle,
  popupInputDescription,
  popupInputName,
  cardsList
} from "../components/popup.js";

// ─── DOM ──────────────────────────
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
