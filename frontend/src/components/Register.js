import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
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

    props.onRegister({
      email: inputValues.email,
      password: inputValues.pswd,
    });
  }

  return (
    <div className="login-area">
      <div className="login-form">
        <h2 className="login-form__title">Регистрация</h2>
        <form
          className="login-form__login form-area"
          name="reg"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="login-form__cover-input">
            <input
              className="login-form__input"
              name="email"
              id="input-email-reg"
              type="email"
              value={inputValues.email}
              onChange={checkValid}
              placeholder="Email"
              required
            />
            <span
              className="login-form__error login-form__error_visible"
              id="input-email-reg-error"
            >
              {inputValid.email ? '' : errorMessage.email}
            </span>
          </div>
          <div className="login-form__cover-input">
            <input
              className="login-form__input"
              name="pswd"
              id="input-pswd-reg"
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
              id="input-pswd-reg-error"
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
            aria-label="кнопка Зарегистрироваться"
            disabled={!(inputValid.email && inputValid.pswd)}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="login-form__text">Уже зарегистрированы?&nbsp;
          <Link
            to="/signin"
            className="login-form__text login-form__link"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
