// Выбор элементов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popup = document.querySelector('.popup');

//Функции для отрытия и закрытия
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}
  
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

// Оработчики
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);