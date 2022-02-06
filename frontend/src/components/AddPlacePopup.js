import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [inputValues, setInputValues] = React.useState({name: '', link: ''});
  const [inputValid, setInputValid] = React.useState({name: false, link: false});
  const [errorMessage, setErrorMessage] = React.useState({name: '', link: ''});

  React.useEffect(() => {
    if (props.isOpen) {
      setInputValues({name: '', link: ''});
      setInputValid({name: false, link: false});
      setErrorMessage({name: '', link: ''});
    }
  }, [props.isOpen])

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

    props.onAddPlace({
      name: inputValues.name,
      link: inputValues.link,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      titleModifier=""
      buttonTitle={props.buttonTitle}
      buttonState={inputValid.name && inputValid.link}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <div className="form__cover-input">
        <input
          className="form__input form__input_asgmt_name-place"
          name="name"
          id="input-name-place"
          type="text"
          value={inputValues.name}
          onChange={checkValid}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className="form__error form__error_visible"
          id="input-name-place-error"
        >
          {inputValid.name ? '' : errorMessage.name}
        </span>
      </div>
      <div className="form__cover-input">
        <input
          className="form__input form__input_asgmt_link"
          name="link"
          id="input-link"
          type="url"
          value={inputValues.link}
          onChange={checkValid}
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className="form__error form__error_visible"
          id="input-link-error"
        >
          {inputValid.link ? '' : errorMessage.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
