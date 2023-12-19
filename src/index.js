import './pages/index.css'; // добавьте импорт главного файла стилей
import './scripts/validation.js';
import './scripts/card.js';
import './scripts/modal.js';

import {
  addCardForm,
  cardNameInput,
  cardLinkInput,
  placesList,
  createNewCard
} from './scripts/card.js';

import {
    closePopup,
    addPopup,
    profilePopup, editButton, openPopup, addButton
} from './scripts/modal.js';

const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
export const nameInput = editProfileForm.querySelector('.popup__input_type_name');
export const jobInput = editProfileForm.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');
import { renderCards } from './scripts/card.js';
export const cohortId = "wff-cohort-2";
export const token = "f607a7d2-acc8-4a4e-8521-3c1435e4561a";
export let currentUserId;
import {
    updateAvatarPopup,
    editProfileSubmitButton,
    newPlaceSubmitButton,
    clearValidationErrors, toggleButtonState, updateAvatarPopupForm
} from './scripts/validation.js';
const updateAvatarPopupInput = updateAvatarPopup.querySelector('.popup__input_type_avatar-link');

import * as api from './scripts/api.js';
const avatarImage = document.querySelector('.profile__image');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarSubmitButton = editAvatarPopup.querySelector('.popup__button');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

export function openAddPopup() {
    openPopup(addPopup);

    // Находим форму внутри попапа
    const formElement = addPopup.querySelector('.popup__form');

    // Если форма найдена, добавляем класс, чтобы временно убрать стили :invalid
    if (formElement) {
        formElement.classList.add('popup_disable-invalid-styles');
        clearValidationErrors(formElement);

        // Используем метод reset() для очистки формы
        formElement.reset();

        const submitButton = formElement.querySelector('.button');
        toggleButtonState(formElement, submitButton);
    }
};
export function openUpdateAvatarPopup() {
    openPopup(updateAvatarPopup);

    if (updateAvatarPopupForm) {
        updateAvatarPopupForm.classList.add('popup_disable-invalid-styles');
        clearValidationErrors(updateAvatarPopupForm);

        // Clear input value and disable button
        if (updateAvatarPopupInput) {
            updateAvatarPopupInput.value = ''; // Clear the input value
            toggleButtonState(updateAvatarPopupForm, editAvatarSubmitButton); // Disable the button
        }
    }
};
export function handlePopupClose(popupElement) {
    // Находим форму внутри попапа
    const formElement = popupElement.querySelector('.popup__form');

    // Если форма найдена, вызываем clearValidationErrors
    if (formElement) {
        clearValidationErrors(formElement);

        // Очищаем значение инпута в форме "Обновить аватар"
        const avatarLinkInput = formElement.querySelector('.popup__input_type_avatar-link');
        if (avatarLinkInput) {
            avatarLinkInput.value = '';
        }
    }
    closePopup(popupElement);
};
editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidationErrors(editProfileForm);
    toggleButtonState(profilePopup,editProfileSubmitButton);
    openPopup(profilePopup);
});

addButton.addEventListener('click', () => {
    openAddPopup();
});

export function openImagePopup(imageSrc, imageCaption) {

    popupImage.src = imageSrc;
    popupImage.alt = imageCaption;
    popupCaption.textContent = imageCaption;

    openPopup(imagePopup);
};
avatarImage.addEventListener('click', () => {
    openUpdateAvatarPopup();
});

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

function handleEditProfileFormSubmit(evt) {

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const nameValue = nameInput.value;
    const jobValue = jobInput.value; // Получаем значение полей jobInput и nameInput из свойства value

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue; // Выбераем элементы, куда должны быть вставлены значения полей
    // Вставляем новые значения с помощью textContent

    // Изменение текста кнопки на "Сохранение..."
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
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

updateAvatarPopup.addEventListener('submit', (event) => {
    event.preventDefault();

    const newAvatarLink = updateAvatarPopupInput.value;

    editAvatarSubmitButton.textContent = 'Сохранение...';

    api.updateAvatar(newAvatarLink)
        .then(updatedUserData => {
            // Обновление изображения аватара на странице
            avatarElement.style.backgroundImage = `url(${updatedUserData.avatar})`;

            // Закрытие формы после успешного обновления
            handlePopupClose(updateAvatarPopup);
        })
        .catch(error => console.error('Ошибка:', error))
        .finally(() => {
            // Возвращение исходного текста кнопки
            editAvatarSubmitButton.textContent = 'Сохранить';
        });
});

// Запрос на данные пользователя
const userDataRequest = api.getUserData();

// Запрос на карточки
const cardsRequest = api.getCardsData();

Promise.all([userDataRequest, cardsRequest])
    .then(([userData, cardsData]) => {
        console.log(userData);
        console.log(cardsData);
        currentUserId = userData._id;
        cardsData.forEach(card => {
            console.log(card._id);
        });
        console.log(currentUserId);

        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        avatarElement.style.backgroundImage = `url(${userData.avatar})`;

        renderCards(cardsData);
    })
    .catch(error => console.error('Ошибка:', error));