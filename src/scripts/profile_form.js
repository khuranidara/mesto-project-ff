// Находим форму в DOM
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

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

export { handleFormSubmit };