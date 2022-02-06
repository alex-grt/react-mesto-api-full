import React from 'react';

function Login(props) {
  const [inputValues, setInputValues] = React.useState({email: '', pswd: ''});
  const [inputValid, setInputValid] = React.useState({email: false, pswd: false});
  const [errorMessage, setErrorMessage] = React.useState({email: '', pswd: ''});

  React.useEffect(() => {
    setInputValues({email: '', pswd: ''});
    setInputValid({email: false, pswd: false});
    setErrorMessage({email: '', pswd: ''});
  }, [])

  function checkValid(evt) {
    setInputValues({
      ...inputValues,
      [evt.target.name]: evt.target.value
    });

    setInputValid({
      ...inputValid,
      [evt.target.name]: evt.target.validity.valid
    });

    setErrorMessage({
      ...errorMessage,
      [evt.target.name]: evt.target.validationMessage
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onLogin({
      email: inputValues.email,
      password: inputValues.pswd,
    });
  }

  return (
    <div className="login-area">
      <div className="login-form">
        <h2 className="login-form__title">Вход</h2>
        <form
          className="login-form__login form-area"
          name="login"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="login-form__cover-input">
            <input
              className="login-form__input"
              name="email"
              id="input-email-login"
              type="email"
              value={inputValues.email}
              onChange={checkValid}
              placeholder="Email"
              required
            />
            <span
              className="login-form__error login-form__error_visible"
              id="input-email-login-error"
            >
              {inputValid.email ? '' : errorMessage.email}
            </span>
          </div>
          <div className="login-form__cover-input">
            <input
              className="login-form__input"
              name="pswd"
              id="input-pswd-login"
              type="password"
              value={inputValues.pswd}
              onChange={checkValid}
              placeholder="Пароль"
              minLength="6"
              maxLength="20"
              required
            />
            <span
              className="login-form__error login-form__error_visible"
              id="input-pswd-login-error"
            >
              {inputValid.pswd ? '' : errorMessage.pswd}
            </span>
          </div>
          <button
            className={`login-form__button-submit${
              inputValid.email && inputValid.pswd
                ? ''
                : ' login-form__button-submit_inactive'
            }`}
            type="submit"
            aria-label="кнопка Войти"
            disabled={!(inputValid.email && inputValid.pswd)}
          >
            Войти
          </button>
        </form>
        <p className="login-form__text"></p>
      </div>
    </div>
  );
}

export default Login;
