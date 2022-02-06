import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatar = React.useRef('');
  const [inputValid, setInputValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      avatar.current.value = '';
      setInputValid(false);
      setErrorMessage('');
    }
  }, [props.isOpen])

  function checkInputValid() {
    setInputValid(avatar.current.validity.valid);
    setErrorMessage(avatar.current.validationMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      titleModifier=""
      buttonTitle={props.buttonTitle}
      buttonState={inputValid}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <div className="form__cover-input">
        <input
          className="form__input form__input_asgmt_link"
          name="avatar"
          id="input-link-avatar"
          type="url"
          ref={avatar}
          onChange={checkInputValid}
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className="form__error form__error_visible"
          id="input-link-avatar-error"
        >
          {inputValid ? '' : errorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
