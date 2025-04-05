const templateCard = document.querySelector('#card-template').content;

function createCard(dataCard, deleteCard) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  cardDeleteButton.addEventListener('click', deleteCard);
  return card;
};

const deleteCard = function (event) {
  event.target.closest('.card').remove();
};

export {createCard, deleteCard};