import { openImagePopup } from './modal.js';

export const addCardForm = document.querySelector('.popup__form[name="new-place"]');
export const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
export const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
export const placesList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
}

function handleCardClick(imageSrc, imageName) {
    openImagePopup(imageSrc, imageName);
}

export function createCard(data, handleLike, handleDeleteCard, handleCardClick) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteIcon = cardElement.querySelector(".card__delete-button");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    deleteIcon.addEventListener("click", handleDeleteCard);
    cardImage.addEventListener('click', () => handleCardClick(data.link, data.name));
    likeButton.addEventListener('click', handleLike);

    return cardElement;
}

export function renderCards(cards) {
    cards.forEach(cardData => {
        const cardElement = createCard(cardData, handleLikeClick, handleDeleteCard, handleCardClick);
        placesList.append(cardElement);
    });
}

export function createNewCard(name, link) {
    return createCard({ name, link }, handleLikeClick, handleDeleteCard, handleCardClick);
}