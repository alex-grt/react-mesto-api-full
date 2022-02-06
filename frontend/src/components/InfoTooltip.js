import accepted from '../images/reg-accepted.svg';
import rejected from '../images/reg-rejected.svg';

function InfoTooltip(props) {
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
        <img
          className="form__image"
          src={props.name === 'accepted' ? accepted : rejected}
          alt={props.name}
        />
        <h2 className="form__title form__title_type_notice">{
          props.name === 'accepted'
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
