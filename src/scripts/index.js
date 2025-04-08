// ─── CSS ──────────────────────────────────────────────
import "../pages/index.css";

// ─── JS: Данные ───────────────────────────────────────
import { initialCards } from "./cards.js";

// ─── JS: Компоненты ───────────────────────────────────
import { createCard, deleteCard, likeTheCard } from "../components/card.js";

import {
  addButton,
  addCard,
  addForm,
  buttonPopupClose,
  cardsList,
  closePopup,
  closePopupOverlay,
  editButton,
  editForm,
  editPopap,
  editPopup,
  newCardPopup,
  openImgPopup,
  openPopup,
  popup,
  popupInputDescription,
  popupInputName,
  profileDescription,
  profileTitle,
} from "../components/popup.js";

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
popup.forEach((item) => item.addEventListener("click", closePopupOverlay));

// Закрытие попапов по кнопке "крестик"
buttonPopupClose.forEach((item) => item.addEventListener("click", closePopup));

// Сабмит формы редактирования профиля
editForm.addEventListener("submit", editPopap);

// Сабмит формы добавления карточки
addForm.addEventListener("submit", addCard);
