function PopupWithForm(props) {
  function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_background_medium${
        props.isOpen ? ' popup_opened' : ''
      }`}
      onClick={handlePopupClose}
    >
      <div className="form">
        <button
          className="popup__button-close"
          type="button"
          aria-label="кнопка Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className={`form__title${props.titleModifier}`}>{props.title}</h2>
        <form
          className={`form__${props.name} form-area`}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`form__button-submit${
              props.buttonState ? '' : ' form__button-submit_inactive'
            }`}
            type="submit"
            aria-label={`кнопка ${props.buttonTitle}`}
            disabled={!props.buttonState}
          >
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
