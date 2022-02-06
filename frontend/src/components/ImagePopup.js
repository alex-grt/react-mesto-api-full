function ImagePopup(props) {
  function handlePopupClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_background_deep${
        props.isOpen ? ' popup_opened' : ''
      }`}
      onClick={handlePopupClose}
    >
      <div className="illustration">
        <button
          className="popup__button-close"
          type="button"
          aria-label="кнопка Закрыть"
          onClick={props.onClose}
        ></button>
        <figure className="illustration__illustration page__reset-alignment">
          <img
            className="illustration__image"
            src={props?.card?.link || ''}
            alt={props?.card?.name || ''}
          />
          <figcaption className="illustration__caption">
            {props?.card?.name || ''}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
