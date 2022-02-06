/* класс выполнения запросов авторизации */
class Auth {
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

  /* запрос на регистрацию пользователя */
  registrationUser({email, password}) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      headers: {"content-type": "application/json"},
      body: JSON.stringify({email, password})
    })
    .then(this._handleRequest);
  }

  /* запрос на авторизацию пользователя */
  authorizationUser({email, password}) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      headers: {"content-type": "application/json"},
      body: JSON.stringify({email, password})
    })
    .then(this._handleRequest);
  }

  /* запрос данных пользователя */
  getUserData(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
    .then(this._handleRequest);
  }
}

const auth = new Auth({
  baseUrl: 'http://api.mesto.alex-grt.nomoredomains.xyz/'
});

export default auth;
