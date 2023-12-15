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
    editAvatarSubmitButton,
    closePopup,
    addPopup,
    profilePopup,
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
import {updateAvatarPopup, editProfileSubmitButton, newPlaceSubmitButton} from './scripts/validation.js';
const updateAvatarPopupInput = updateAvatarPopup.querySelector('.popup__input_type_avatar-link');

import * as api from './scripts/api.js';



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleAddCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;

    newPlaceSubmitButton.textContent = 'Сохранение...';

    api.addCard(cardName, cardLink)
        .then(newCardData => {
            const newCard = createNewCard(newCardData);
            placesList.prepend(newCard);// Добавляем карточку в начало списка

            closePopup(addPopup);
            addCardForm.reset(); // Очищаем форму
        })
        .catch(error => console.error('Ошибка:', error))
        .finally(() => {
            newPlaceSubmitButton.textContent = 'Сохранить';
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
            closePopup(updateAvatarPopup);
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