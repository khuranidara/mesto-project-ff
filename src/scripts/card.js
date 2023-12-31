import { openImagePopup, currentUserId } from '../index';
import * as api from './api';
// Константы для работы с DOM-элементами
export const addCardForm = document.querySelector('.popup__form[name="new-place"]');
export const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
export const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
export const placesList = document.querySelector(".places__list"); // Список для отрисовки карточек
export const cardTemplate = document.querySelector("#card-template").content; // Шаблон карточки

// Функция для лайка карточки
function handleLikeClick(evt, cardId, likeCount) {
    if (!cardId) {
        console.error('Ошибка: не указан cardId');
        return;
    }
    const isLiked = evt.target.classList.contains('card__like-button_is-active');
    api.likeCard(cardId, isLiked)
        .then(updatedCardData => {
            evt.target.classList.toggle('card__like-button_is-active');
            likeCount.textContent = updatedCardData.likes.length;
        })
        .catch(error => console.error('Ошибка:', error));
}

function handleDeleteCard(evt, cardId) {
    api.deleteCard(cardId)
        .then(() => {
            evt.target.closest(".card").remove();
            console.log(`Карточка с ID ${cardId} удалена успешно.`);
        })
        .catch(error => console.error('Ошибка при удалении карточки:', error));
}

function handleCardClick(imageSrc, imageName) {
    openImagePopup(imageSrc, imageName);
}
// Функция для создания карточки
export function createCard(data, handleLike, handleDeleteCard, handleCardClick) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteIcon = cardElement.querySelector(".card__delete-button");
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    likeCount.textContent = data.likes ? data.likes.length : 0; // Устанавливаем начальное количество лайков

    // Добавляем проверку на принадлежность карточки текущему пользователю
    if (data.owner._id !== currentUserId) {
        deleteIcon.remove();
    } else {
        deleteIcon.addEventListener("click", (evt) => handleDeleteCard(evt, data._id));
    }
    cardImage.addEventListener('click', () => handleCardClick(data.link, data.name));
    likeButton.addEventListener('click', (evt) => handleLikeClick(evt, data._id, likeCount));

    return cardElement;
}

// Функция для отрисовки начальных карточек
export function renderCards(cards) {
    cards.forEach(cardData => {
        const cardElement = createCard(cardData, handleLikeClick, handleDeleteCard, handleCardClick);
        placesList.append(cardElement);
    });
}
// Функция для создания новой карточки
export function createNewCard(cardData) {
    return createCard(cardData, handleLikeClick, handleDeleteCard, handleCardClick);
}