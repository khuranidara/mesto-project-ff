import './pages/index.css'; // добавьте импорт главного файла стилей
import './scripts/validation.js';
import './scripts/card.js';
import './scripts/modal.js';
import {
    addCardForm,
    cardNameInput,
    cardLinkInput,
    placesList,
    createNewCard,
    renderCards
} from './scripts/card.js';
import {
    imagePopup,
    popupImage,
    popupCaption,
    closePopup,
    addPopup,
    profilePopup, editButton, openPopup, addButton
} from './scripts/modal.js';

import {enableValidation,clearValidation} from './scripts/validation';
import * as api from './scripts/api.js';

const formElement = document.querySelector('.popup__form[name="edit-profile"]');
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');
const updateAvatarPopup = document.querySelector('.popup_type_edit-avatar');
export let currentUserId;
const newPlacePopup = document.querySelector('.popup_type_new-card');
const newPlacePopupForm = newPlacePopup.querySelector('.popup__form');
const newPlaceSubmitButton = newPlacePopupForm.querySelector('.button');
const editProfilePopupForm=  profilePopup.querySelector('.popup__form');
const editProfileSubmitButton = editProfilePopupForm.querySelector('.button');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleAddCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    newPlaceSubmitButton.textContent = 'Создание...';
    api.addCard(cardName, cardLink)
        .then(newCardData => {
            const newCard = createNewCard(newCardData);
            placesList.prepend(newCard);// Добавляем карточку в начало списка

            closePopup(addPopup);
            addCardForm.reset(); // Очищаем форму
        })
        .catch(error => console.error('Ошибка:', error))
        .finally(() => {
            newPlaceSubmitButton.textContent = 'Создать';
        });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже
    const nameValue = nameInput.value;
    const jobValue = jobInput.value; // Получите значение полей jobInput и nameInput из свойства value
    editProfileSubmitButton.textContent = 'Сохранение...';
    api.editProfile(nameValue, jobValue)
        .then(updatedUserData => {
            avatarElement.style.backgroundImage = `url(${updatedUserData.avatar})`;
            // Обновление данные на странице с использованием полученных данных
            profileName.textContent = updatedUserData.name;
            profileJob.textContent = updatedUserData.about;

            // Закрываем попап редактирования профиля
            closePopup(profilePopup);
        })
        .catch(error => console.error('Ошибка:', error))
        .finally(() => {
            // Возвращение исходного текста кнопки
            editProfileSubmitButton.textContent = 'Сохранить';
        });
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(profilePopup, validationConfig);
    openPopup(profilePopup);
});
addButton.addEventListener('click', () => {
    clearValidation(addPopup, validationConfig);
    openPopup(addPopup);
});
avatarElement.addEventListener('click',() => {
    clearValidation(updateAvatarPopup,validationConfig);
    openPopup(updateAvatarPopup);
})

export function openImagePopup(imageSrc, imageCaption) {
    popupImage.src = imageSrc;
    popupImage.alt = imageCaption;
    popupCaption.textContent = imageCaption;
    openPopup(imagePopup);
};
// Запрос на данные пользователя
const userDataRequest = api.getUserData();

// Запрос на карточки
const cardsRequest = api.getCardsData();

Promise.all([userDataRequest, cardsRequest])
    .then(([userData, cardsData]) => {
        currentUserId = userData._id;
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        avatarElement.style.backgroundImage = `url(${userData.avatar})`;

        renderCards(cardsData);
    })
    .catch(error => console.error('Ошибка:', error));