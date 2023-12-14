const profilePopup = document.querySelector('.popup_type_edit');
const editProfilePopupForm=  profilePopup.querySelector('.popup__form');
const editProfileSubmitButton = editProfilePopupForm.querySelector('.button');
const newPlacePopup = document.querySelector('.popup_type_new-card');
const newPlacePopupForm = newPlacePopup.querySelector('.popup__form');
const newPlaceSubmitButton = newPlacePopupForm.querySelector('.button');
function validateInput(inputElement, errorElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.');
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        errorElement.textContent = inputElement.validationMessage;
    } else {
        errorElement.textContent = "";
    }
}

export function toggleButtonState(formElement, submitButton) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const hasInvalidInputs = inputList.some((inputElement) => !inputElement.validity.valid);
    submitButton.disabled = hasInvalidInputs;
}

// Для формы "Редактировать профиль"
editProfilePopupForm.addEventListener('input', function (e) {
    editProfilePopupForm.classList.remove('disable-invalid-styles');
    const inputElement = e.target;
    const errorElement = editProfilePopupForm.querySelector(`.error_${inputElement.name}`);
    validateInput(inputElement, errorElement);
    toggleButtonState(editProfilePopupForm, editProfileSubmitButton);
});

// Для формы "Новое место"
newPlacePopupForm.addEventListener('input', function (e) {
    // Удаляем класс, чтобы включить стили :invalid после первого взаимодействия
    newPlacePopupForm.classList.remove('disable-invalid-styles');
    const inputElement = e.target;
    const errorElement = newPlacePopupForm.querySelector(`.error_${inputElement.name}`);
    validateInput(inputElement, errorElement);
    toggleButtonState(newPlacePopupForm, newPlaceSubmitButton);
});

export function clearValidationErrors(formElement) {
    const inputList = formElement.querySelectorAll('.popup__input');
    const errorList = formElement.querySelectorAll('.error');

    inputList.forEach(input => {
        input.setCustomValidity(''); // Сброс кастомных сообщений валидации
    });

    errorList.forEach(error => {
        error.textContent = ''; // Очистка текста ошибок
    });
}
