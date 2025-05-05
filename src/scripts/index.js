// ─── CSS ──────────────────────────────────────────────
import "../pages/index.css";

// ─── JS: Данные ───────────────────────────────────────
import { initialCards } from "./cards.js";

// ─── JS: Компоненты ───────────────────────────────────
import { createCard, deleteCard, likeTheCard } from "../components/card.js";
import {
  closePopupOverlay,
  closePopup,
  openPopup,
} from "../components/popup.js";
import { clearValidation, enableValidation } from "../components/validation.js";
import {
  APIProfileEdits,
  APIAddCard,
  APIDataSynchronization,
  APIAvatarEdit,
} from "../components/API.js";

// ─── DOM ──────────────────────────────────────────────
const popup = document.querySelectorAll(".popup");

// Профиль
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Карточки
export const cardsList = document.querySelector(".places__list");

// Попапы
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Формы
const editForm = editPopup.querySelector(".popup__form");
const addForm = newCardPopup.querySelector(".popup__form");

// Инпуты
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputDescription = document.querySelector(
  ".popup__input_type_description"
);
const popupInputCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputCardUrl = document.querySelector(".popup__input_type_url");

// Кнопки закрытия
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const addPopupCloseButton = newCardPopup.querySelector(".popup__close");
const imagePopupCloseButton = popupTypeImage.querySelector(".popup__close");

// Элементы попапа с изображением
const popupImgSrc = document.querySelector(".popup__image");
const popupText = document.querySelector(".popup__caption");

const popupAvatar = document.querySelector(".popup_type_edit-avatar");
const formAvatar = popupAvatar.querySelector(".popup__form");
const avatarButton = document.querySelector(".profile__image");
const editAvatarPopupCloseButton = popupAvatar.querySelector(".popup__close");
const inputAvatar = popupAvatar.querySelector(".popup__input");

// кнопка сохранение
const saveEdit = editPopup.querySelector(".popup__button");
const saveAddCard = newCardPopup.querySelector(".popup__button");
const saveAvatar = popupAvatar.querySelector(".popup__button");

// ─── Обработчики ──────────────────────────────────────
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_disabled",
  errorClass: "input-error-non-active",
  errorSuffix: "-error",
};

// Открытие попапа изображения
function openImgPopup(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupImgSrc.src = evt.target.src;
    popupImgSrc.alt = evt.target.alt;
    popupText.textContent = evt.target.alt;
    openPopup(popupTypeImage);
  }
}

// Изменение профиля
function editsPopup(evt) {
  evt.preventDefault();
  APIProfileEdits(profileTitle, profileDescription)
    .then((res) => {
      profileTitle.textContent = popupInputName.value;
      profileDescription.textContent = popupInputDescription.value;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((saveEdit.textContent = "Сохранить"));
}

// Добавление карточки
function addCard(evt) {
  evt.preventDefault();
  const dataNewCard = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value,
    likes: [],
  };
  APIAddCard(dataNewCard.name, dataNewCard.link)
    .then((resFromServer) => {
      const cardElement = createCard(
        resFromServer,
        deleteCard,
        likeTheCard,
        openImgPopup
      );
      cardsList.prepend(cardElement);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveEdit.textContent = "Сохранить";
      addForm.reset();
    });
}

// изменение аватара
function avatarEdit(evt) {
  evt.preventDefault();
  const avatar = inputAvatar.value;

  APIAvatarEdit(avatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((saveEdit.textContent = "Сохранить"));
}

// ─── Анимация всех попапов при загрузке ───────────────
popup.forEach((item) => item.classList.add("popup_is-animated"));

// ─── Обработчики событий ─────────────────────────────

// Открытие формы редактирования профиля
editButton.addEventListener("click", () => {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(editPopup);
});

// Открытие формы добавления карточки
addButton.addEventListener("click", () => {
  clearValidation(addForm, validationConfig);
  openPopup(newCardPopup);
});

// Открытие формы редактирования аватара\
avatarButton.addEventListener("click", () => {
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

// Закрытие попапов по клику на оверлей
editPopup.addEventListener("click", (evt) => closePopupOverlay(evt, editPopup));
popupAvatar.addEventListener("click", (evt) =>
  closePopupOverlay(evt, popupAvatar)
);
newCardPopup.addEventListener("click", (evt) =>
  closePopupOverlay(evt, newCardPopup)
);
popupTypeImage.addEventListener("click", (evt) =>
  closePopupOverlay(evt, popupTypeImage)
);

// Закрытие попапов по кнопке "крестик"
editPopupCloseButton.addEventListener("click", () => closePopup(editPopup));
addPopupCloseButton.addEventListener("click", () => closePopup(newCardPopup));
editAvatarPopupCloseButton.addEventListener("click", () =>
  closePopup(popupAvatar)
);
imagePopupCloseButton.addEventListener("click", () =>
  closePopup(popupTypeImage)
);

// Сабмит формы редактирования профиля
editForm.addEventListener("submit", (evt) => {
  saveEdit.textContent = "Сохранение...";
  editsPopup(evt);
});

// Сабмит формы добавления карточки
addForm.addEventListener("submit", (evt) => {
  saveAddCard.textContent = "Сохранение...";
  addCard(evt);
});

// Сабмит формы добавления карточки
formAvatar.addEventListener("submit", (evt) => {
  saveAvatar.textContent = "Сохранение...";
  avatarEdit(evt);
});

// Валидация форм
enableValidation(validationConfig);

// Синхронизация с API
APIDataSynchronization()
  .then(([userData, cardsData]) => {
    // Обновляем UI профиля
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    // Создаём карточки
    cardsData.forEach((cardData) => {
      cardsList.append(
        createCard(cardData, deleteCard, likeTheCard, openImgPopup, userData)
      );
    });

    return [userData, cardsData];
  })
  .catch((err) => {
    console.log(err);
  });
