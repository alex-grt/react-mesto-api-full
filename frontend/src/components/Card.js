import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(like => like === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="place">
      <button
        className={`place__button-delete${
          isOwn ? '' : ' place__button-delete_hidden'
        }`}
        type="button"
        aria-label="кнопка Удалить"
        onClick={handleDeleteClick}
      ></button>
      <div className="place__image-cover">
        <img
          className="place__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
      </div>
      <div className="place__caption">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__cover-like">
          <button
            className={`place__button-like${
              isLiked ? ' place__button-like_active' : ''
            }`}
            type="button"
            aria-label="кнопка Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="place__counter-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
