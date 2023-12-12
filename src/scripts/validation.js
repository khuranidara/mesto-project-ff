const popupName = document.querySelector('.popup__input_type_name');
const popupDesc = document.querySelector('.popup__input_type_description');
const profilePopup = document.querySelector('.popup_type_edit');
const editProfilePopupForm=  profilePopup.querySelector('.popup__form');
const inputList = Array.from(editProfilePopupForm.querySelectorAll('.popup__input'));
const editProfilePopupSpanName =  editProfilePopupForm.querySelector('.error_name');
const editProfilePopupSpanDesc =  editProfilePopupForm.querySelector('.error_description');
const saveButton = editProfilePopupForm.querySelector('.button');
const errorList = Array.from(editProfilePopupForm.querySelectorAll('.error'));


popupName.addEventListener('input', checkPopupName);
function checkPopupName(e) {
    if(e.target.validity.patternMismatch){
        e.target.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.');
    }
    else {
        e.target.setCustomValidity("");
    }

    if(!popupName.validity.valid){
        editProfilePopupSpanName.innerHTML = popupName.validationMessage;
    }else {
        editProfilePopupSpanName.innerHTML = "";
    }
    toggleButtonState(); // Обновить состояние кнопки
}

popupDesc.addEventListener('input', checkPopupDesc);
function checkPopupDesc(e) {
    if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.');
    } else {
        e.target.setCustomValidity("");
    }

    if (!popupDesc.validity.valid) {
        editProfilePopupSpanDesc.innerHTML = popupDesc.validationMessage;
    } else {
        editProfilePopupSpanDesc.innerHTML = "";
    }
    toggleButtonState(); // Обновить состояние кнопки
}

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = () => {
    if (hasInvalidInput(inputList)) {
        saveButton.setAttribute('disabled', 'disabled');
    } else {
        saveButton.removeAttribute('disabled');
    }
};

export function clearValidationError() {
    errorList.forEach((errorElement) => errorElement.innerHTML = "");
    saveButton.removeAttribute('disabled');
}
