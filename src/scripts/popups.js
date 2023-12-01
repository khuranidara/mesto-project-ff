// Выбор элементов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
export const popup1 = document.querySelector('.popup_type_new-card');
const popup2 = document.querySelector('.popup_type_edit');
const popup = document.querySelectorAll('.popup');

//Функции для открытия и закрытия
function esc(evt) {
    evt.code === 'Escape' && closePopup(document.querySelector('.popup_is-opened'));
}

popup.forEach( function(b) {
    b.addEventListener('mouseup', (evt) => {
        evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened') ? closePopup(b) : null;
    } )
});

function openPopup(a) {
    a.classList.add('popup_is-opened');
    document.addEventListener('keydown', esc);
};
  
export function closePopup(a) {
    a.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', esc);
};

//Обработчики

editButton.addEventListener('click', function() {
    openPopup(popup2);
});

addButton.addEventListener('click', () => { 
    openPopup(popup1);
});

function openImagePopup(imageSrc, imageCaption) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = imageSrc;
    popupImage.alt = imageCaption;
    popupCaption.textContent = imageCaption;

    openPopup(imagePopup);
};

export { openImagePopup };