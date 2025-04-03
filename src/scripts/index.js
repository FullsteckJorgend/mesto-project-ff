// @imports css

import '../pages/index.css';

// @imports js

import {initialCards} from './cards.js';

// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');
// @todo: DOM узлы
// @todo: Функция создания карточки 

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

// @todo: Функция удаления карточки

const deleteCard = function (event) {
  event.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((card, index) => {
  cardsList.append(createCard(card, deleteCard))
});

















//мне очень стыдно за то что я не слышал ваши коментарии(. надеюсь я исправился