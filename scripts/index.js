// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content; // Шаблон карточки
const cardsList = document.querySelector('.places__list'); // Список карточек
const createCardButton = document.querySelector('.profile__add-button'); // Кнопка создания карточки
// @todo: DOM узлы
// @todo: Функция создания карточки 
let clickList = 0;
function createCard() {
  const card = templateCard.querySelector('.card').cloneNode(true); // Карточка
  const cardImage = card.querySelector('.card__image'); // Изображение карточки
  const cardTitle = card.querySelector('.card__title'); // Заголовок or text карточки
  const deleteCardButton = card.querySelector('.card__delete-button');
  cardImage.src = initialCards[clickList].link;
  cardImage.alt = initialCards[clickList].name;
  cardTitle.textContent = initialCards[clickList].name;
  clickList += 1;
  cardsList.append(card);
  deleteCardButton.addEventListener('click', constDeleteCard);
}
// @todo: Функция удаления карточки
const constDeleteCard = function (event) {
  event.target.closest('.card').remove();
  clickList -= 1;
};
// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
  createCard()
}
createCardButton.addEventListener('click', createCard);