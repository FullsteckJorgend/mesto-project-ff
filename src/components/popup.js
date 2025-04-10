//@OPEN POPUP
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
}

function openImgPopup(evt) {
  if (evt.target.classList.contains('card__image')) {

    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImgSrc = document.querySelector('.popup__image');
    const popupText = document.querySelector('.popup__caption');

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

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpen = document.querySelector('.popup_is-opened')
    closePopup(popupIsOpen);
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
  const popupInputName = document.querySelector('.popup__input_type_name');
  const popupInputDescription = document.querySelector('.popup__input_type_description');
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const editPopup = document.querySelector('.popup_type_edit');
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup(editPopup);
}


//@ADD NEW CARD
function addCard(evt, createCard, deleteCard, likeTheCard, openImgPopup) {
  evt.preventDefault();

  const newCardPopup = document.querySelector('.popup_type_new-card');
  const cardsList = document.querySelector('.places__list');
  const popupInputCardName = document.querySelector('.popup__input_type_card-name');
  const popupInputCardUrl = document.querySelector('.popup__input_type_url');
  const addForm = newCardPopup.querySelector('.popup__form');

  const dataNewCard = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value,
  };
  addForm.reset();
  cardsList.prepend(createCard(dataNewCard, deleteCard, likeTheCard, openImgPopup));
  closePopup(newCardPopup);
}

export {
  addCard,
  editsPopup,
  closePopupOverlay,
  closePopup,
  openImgPopup,
  openPopup,
};





























//Я старался полностью убрать DOM из файла, увы, у меня изначально было всё завязано на присутствие DOM в функции.
//Слушатели полностью работают, как и снятие слушателя.