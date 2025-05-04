// === импорты ===
import { checkResponse } from "./utils/APIUtils.js";

// === 📌 Константы ===
const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-37";
const HEADERS = {
  authorization: "ff9da2f2-3d14-4bf6-b7b2-c2cdca1e46ca",
  "Content-Type": "application/json",
};

// === 👤 Профиль ===

function APIProfileEdits(profileTitle, profileDescription) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({
      name: profileTitle.textContent,
      about: profileDescription.textContent,
    }),
  }).then(checkResponse);
}

// === 👤 Аватар ===

function APIAvatarEdit(avatarLink) {
  return fetch(`${BASE_URL}/users/me/avatar `, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      console.log(res);
      return res;
    });
}

// === 🧩 Карточки ===

function APIAddCard(name, link) {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ name, link }),
  })
    .then(checkResponse)
    .then((res) => {
      console.log(res);
      return res;
    });
}

function APIDeleteCard(id) {
  return fetch(`${BASE_URL}/cards/${id}`, {
    method: "DELETE",
    headers: HEADERS,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
}

// === ❤️ Лайки ===

function APIAddlike(id) {
  return fetch(`${BASE_URL}/cards/likes/${id}`, {
    method: "PUT",
    headers: HEADERS,
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

function APIRemovelike(id) {
  return fetch(`${BASE_URL}/cards/likes/${id}`, {
    method: "DELETE",
    headers: HEADERS,
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

// === 📦 Начальные данные ===

const personPromis = fetch(`${BASE_URL}/users/me`, { headers: HEADERS }).then(
  checkResponse
);

const cardPromis = fetch(`${BASE_URL}/cards`, { headers: HEADERS }).then(
  checkResponse
);

// === 🔁 Синхронизация ===

function APIDataSynchronization() {
  return Promise.all([personPromis, cardPromis])
    .catch((err) => {
      console.log(err);
    });
}

// === ⬇️ Экспортируем всё что надо ===

export {
  APIDeleteCard,
  APIProfileEdits,
  APIAddCard,
  APIAddlike,
  APIRemovelike,
  APIDataSynchronization,
  APIAvatarEdit,
};
