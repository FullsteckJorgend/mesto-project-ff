const templateCard = document.querySelector('#card-template').content;

function createCard(dataCard, deleteCard, likeTheCard, openImgPopup) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like-button')

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeTheCard);
  cardImage.addEventListener('click', openImgPopup);
  return card;
};

const deleteCard = function (event) {
  event.target.closest('.card').remove();
};

function likeTheCard(event) {
    event.target.classList.toggle('card__like-button_is-active')
}

export {createCard, deleteCard, likeTheCard};