export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const addPopup = document.querySelector('.popup_type_new-card');
export const profilePopup = document.querySelector('.popup_type_edit');
export const popups = document.querySelectorAll('.popup');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
import { nameInput, jobInput, profileJob, profileName } from "../index.js";
import {clearValidationErrors, toggleButtonState} from "./validation.js";
export function esc(evt) {
    evt.code === 'Escape' && closePopup(document.querySelector('.popup_is-opened'));
}

popups.forEach( function(b) {
    b.addEventListener('mouseup', (evt) => {
        evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened') ? closePopup(b) : null;
    } )
});

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', esc);
};

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', esc);
};