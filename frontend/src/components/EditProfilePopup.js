import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [inputValid, setInputValid] = React.useState({name: true, about: true});
  const [errorMessage, setErrorMessage] = React.useState({name: '', about: ''});

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setInputValid({name: true, about: true});
      setErrorMessage({name: '', about: ''});
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);

    setInputValid({
      ...inputValid,
      [evt.target.name]: evt.target.validity.valid
    });

    setErrorMessage({
      ...errorMessage,
      [evt.target.name]: evt.target.validationMessage
    });
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);

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

    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      titleModifier=""
      buttonTitle={props.buttonTitle}
      buttonState={inputValid.name && inputValid.about}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <div className="form__cover-input">
        <input
          className="form__input form__input_asgmt_name"
          name="name"
          id="input-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          className="form__error form__error_visible"
          id="input-name-error"
        >
          {inputValid.name ? '' : errorMessage.name}
        </span>
      </div>
      <div className="form__cover-input">
        <input
          className="form__input form__input_asgmt_about"
          name="about"
          id="input-about"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Профессиональная деятельность"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className="form__error form__error_visible"
          id="input-about-error"
        >
          {inputValid.about ? '' : errorMessage.about}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
