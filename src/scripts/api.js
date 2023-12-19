const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
        authorization: 'f607a7d2-acc8-4a4e-8521-3c1435e4561a',
        'Content-Type': 'application/json'
    }
};

function getResponseData(response) {
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
}

export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    })
        .then(getResponseData);
}
export function editProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        }),
    })
        .then(getResponseData);
}
export function updateAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink, // замените newAvatarLink на avatarLink
        }),
    })
        .then(getResponseData);
}
export function getUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
        .then(getResponseData);
}

export function getCardsData() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
        .then(getResponseData);
}

export function likeCard(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';

    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method,
        headers: config.headers,
    })
        .then(getResponseData);
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(getResponseData);
}