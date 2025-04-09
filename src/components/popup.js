//@import

//@DOM
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
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => closePopupEsc(evt, popup));
}

function openImgPopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupImgSrc.src = evt.target.src;
    popupImgSrc.alt = evt.target.alt;
    popupText.textContent = evt.target.alt;
    openPopup(popupTypeImage)
  }
}

//@CLOSE POPUP

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closePopupOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}


//@EDIT PROFILE
function editsPopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(editPopup);
}


//@ADD NEW CARD
function addCard( evt, createCard, deleteCard, likeTheCard, openImgPopup) {
  evt.preventDefault();
  const dataNewCard = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value,
  };
  cardsList.prepend(createCard(dataNewCard, deleteCard, likeTheCard, openImgPopup));
  addForm.reset();
  closePopup(newCardPopup);
}

export {
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
  };