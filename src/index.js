import './pages/index.css'; // добавьте импорт главного файла стилей
import {
  createCard,
  addCardForm,
  renderCards,
  cardNameInput,
  cardLinkInput,
  placesList,
  createNewCard
} from './scripts/card.js';

import {
  openPopup,
  closePopup,
  esc,
  editButton,
  addButton,
  addPopup,
  profilePopup
} from './scripts/modal.js';

const formElement = document.querySelector('.popup__form[name="edit-profile"]');
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleAddCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;

    const newCard = createNewCard(cardName, cardLink);
    placesList.prepend(newCard); // Добавляем карточку в начало списка

    closePopup(addPopup); // Закрываем попап
    addCardForm.reset(); // Очищаем форму
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const nameValue = nameInput.value;
    const jobValue = jobInput.value; // Получите значение полей jobInput и nameInput из свойства value

    profileName.textContent = nameValue;
    profileJob.textContent = jobValue; // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);