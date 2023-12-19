const profilePopup = document.querySelector('.popup_type_edit');
const editProfilePopupForm=  profilePopup.querySelector('.popup__form');
export const editProfileSubmitButton = editProfilePopupForm.querySelector('.button');
const newPlacePopup = document.querySelector('.popup_type_new-card');
const newPlacePopupForm = newPlacePopup.querySelector('.popup__form');
export const newPlaceSubmitButton = newPlacePopupForm.querySelector('.button');
export const updateAvatarPopup = document.querySelector('.popup_type_edit-avatar');
export const updateAvatarPopupForm =updateAvatarPopup.querySelector('.popup__form');
export const updateAvatarSubmitButton = updateAvatarPopupForm.querySelector('.button');
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

// Для формы "Редактировать профиль"
editProfilePopupForm.addEventListener('input', function (e) {
    editProfilePopupForm.classList.remove('popup_disable-invalid-styles');
    const inputElement = e.target;
    const errorElement = editProfilePopupForm.querySelector(`.error_${inputElement.name}`);
    validateInput(inputElement, errorElement);
    toggleButtonState(editProfilePopupForm, editProfileSubmitButton);
});

// Для формы "Новое место"
// Для поля "Название"
const placeNameInput = newPlacePopupForm.querySelector('[name="place-name"]');
placeNameInput.addEventListener('input', function (e) {
    const inputElement = e.target;
    const errorElement = newPlacePopupForm.querySelector('.error_place-name');
    validateInput(placeNameInput, errorElement);
    toggleButtonState(newPlacePopupForm, newPlaceSubmitButton);
});

// Для поля "Ссылка на картинку"
const linkInput = newPlacePopupForm.querySelector('[name="link"]');
linkInput.addEventListener('input', function (e) {
    const inputElement = e.target;
    const errorElement = newPlacePopupForm.querySelector('.error_link');
    validateInput(linkInput, errorElement);
    toggleButtonState(newPlacePopupForm, newPlaceSubmitButton);
})

//Для формы "Обновить аватар"
updateAvatarPopupForm.addEventListener('input', function (e) {
    updateAvatarPopupForm.classList.remove('popup_disable-invalid-styles');
    const inputElement = e.target;
    const errorElement = updateAvatarPopupForm.querySelector(`.error_${inputElement.name}`);
    validateInput(inputElement, errorElement);
    toggleButtonState(updateAvatarPopupForm, updateAvatarSubmitButton);
});