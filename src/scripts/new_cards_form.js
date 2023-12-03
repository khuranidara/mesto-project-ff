import { initialCards } from './cards.js';
import { closePopup, popup1, openImagePopup } from './popups.js';


function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function createCard(data, handleLike) {
    // Шаг 1: Клонирование шаблона
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.cloneNode(true);
    
    // Шаг 2: Установка значений вложенных элементов
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
  
    // Шаг 3: Добавление обработчика для иконки удаления
    const deleteIcon = cardElement.querySelector(".card__delete-button");
    deleteIcon.addEventListener("click", evt => {
        const cardElement = evt.target.closest(".card");
        cardElement.remove();
    });
  
    // Добавление обработчика для картинки
    cardImage.addEventListener('click', () => {
      openImagePopup(data.link, data.name);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLike);
  
    return cardElement;
}
  
const placesList = document.querySelector(".places__list");

function renderCards() {
    initialCards.forEach(cardData => {
        const cardElement = createCard(cardData, handleLikeClick);
        placesList.append(cardElement);
    });
}

renderCards();


// Находим форму в DOM
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
// Находим поля формы в DOM
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

// Функция создания карточки
function createNewCard(name, link) {
   return createCard({ name, link }, handleLikeClick);
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleAddCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value; // Получите значение полей jobInput и nameInput из свойства value

    const newCard = createNewCard(cardName, cardLink);
    placesList.prepend(newCard); // Добавляем карточку в начало списка

    closePopup(popup1); // Закрываем попап
    addCardForm.reset(); // Очищаем форму
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

export { createCard, renderCards, handleAddCardFormSubmit };