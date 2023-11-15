// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(data) {
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
  
    return cardElement;
  }
  
  const placesList = document.querySelector(".places__list");
  
  function renderCards() {
    initialCards.forEach(cardElement => placesList.append(createCard(cardElement)));
  }
  
  renderCards();