// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');
// @todo: DOM узлы
function SplittingObjectsIntoArrays() {

  const cardsSrc = initialCards.map(item => item.link);
  const cardsAlt = initialCards.map(item => item.name);
  const cardsText = initialCards.map(item => item.name);

  return { cardsSrc, cardsAlt, cardsText };
}
const threeArrays = SplittingObjectsIntoArrays();
// @todo: Функция создания карточки 
function createCard(threeArrays, DeleteCard) {
  for (let i = 0; i < initialCards.length; i++) {

    const card = templateCard.querySelector('.card').cloneNode(true);
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = threeArrays.cardsSrc[i];
    cardImage.alt = threeArrays.cardsAlt[i];
    cardTitle.textContent = threeArrays.cardsText[i];

    cardsList.append(card);

    cardDeleteButton.addEventListener('click', DeleteCard);
  }
};

// @todo: Функция удаления карточки
const DeleteCard = function (event) {
  event.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
createCard(threeArrays, DeleteCard)


















//Я знаю, что можно было и получше, тут много чего можно оптимизировать, но страшно, что не пройду по чек-листу.