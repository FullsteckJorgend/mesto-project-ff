//@OPEN POPUP
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
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

//@EXPORT
export {
  closePopupOverlay,
  closePopup,
  openPopup,
};





























//я сделал так как понял! не бейте сильна 