// @imports css

import "../pages/index.css";

// @imports js

import { initialCards } from "./cards.js";

import { createCard, deleteCard } from "../components/card.js";

import {
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
} from "../components/popup.js";

// @todo: Темплейт карточки

const cardsList = document.querySelector(".places__list");

// @todo: DOM узлы
// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  cardsList.append(createCard(card, deleteCard));
});

editButton.addEventListener("click", () => {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => openPopup(newCardPopup));

placesList.addEventListener("click", openImgPopup);

popup.forEach((item) => item.addEventListener("click", closePopupOverlay));

buttonPopupClose.forEach((item) => item.addEventListener("click", closePopup));

editForm.addEventListener("submit", editPopap);

