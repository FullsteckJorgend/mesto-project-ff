import { APIDeleteCard, APIAddlike, APIRemovelike } from "../components/API";

const templateCard = document.querySelector("#card-template").content;

function createCard(dataCard, deleteCard, likeTheCard, openImgPopup, dataUser) {
  const card = templateCard.querySelector(".card").cloneNode(true);
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const numberLikeThe = card.querySelector(".number-of-likes");
  const isLikedByUser = dataCard.likes.some(
    (user) => user._id === dataUser._id
  );

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  numberLikeThe.textContent = dataCard.likes.length;

  if (dataUser && dataCard && dataCard.owner._id !== dataUser._id) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      APIDeleteCard(dataCard._id);
    });
  }
  if (isLikedByUser) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardDeleteButton.addEventListener("click", (evt) => {
    APIDeleteCard(dataCard._id)
      .then(deleteCard(evt))
      .catch((err) => {
        console.log(err);
      });
  });
  cardLikeButton.addEventListener("click", (evt) => {
    likeTheCard(evt, dataCard._id, numberLikeThe);
  });
  cardImage.addEventListener("click", openImgPopup);

  return card;
}

function deleteCard(event) {
  const card = event.target.closest(".card");
  if (card) card.remove();
}

function likeTheCard(event, id, numberLikeThe) {
  const isActive = event.target.classList.contains(
    "card__like-button_is-active"
  );
  const updateLikes = (res) => {
    numberLikeThe.textContent = res.likes.length;
  };

  if (isActive) {
    APIRemovelike(id).then(updateLikes);
    event.target.classList.remove("card__like-button_is-active");
  } else {
    APIAddlike(id).then(updateLikes);
    event.target.classList.add("card__like-button_is-active");
  }
}

export { createCard, deleteCard, likeTheCard };
