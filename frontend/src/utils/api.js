/* класс выполнения запросов */
class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
  }

  /* обработка запроса */
  _handleRequest(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  /* консолидация запросов на получение информации */
  getPageInfo(token) {
    this._token = token;

    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  /* запрос на получение информации о пользователе */
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this._token}`
      }
    })
    .then(this._handleRequest);
  }

  /* запрос на изменение информации о пользователе */
  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this._token}`
      },
      body: JSON.stringify(data)
    })
    .then(this._handleRequest);
  }

  /* запрос на изменение аватара пользователя */
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this._token}`
      },
      body: JSON.stringify(data)
    })
    .then(this._handleRequest);
  }

  /* запрос на получение массива карточек */
  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this._token}`
      }
    })
    .then(this._handleRequest);
  }

  /* запрос на добавление карточки */
  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this._token}`
      },
      body: JSON.stringify(data)
    })
    .then(this._handleRequest);
  }

  /* запрос на удаление карточки */
  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${this._token}`
      }
    })
    .then(this._handleRequest);
  }

  /* запросы переключения лайка карточки */
  toggleLike(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${this._token}`
        }
      })
      .then(this._handleRequest);
    } else {
      return fetch(`${this._baseUrl}cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${this._token}`
        }
      })
      .then(this._handleRequest);
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.alex-grt.nomoredomains.xyz/'
});

export default api;
