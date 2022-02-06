import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      {/* <!-- секция Profile --> */}
      <section className="profile content__profile">
        <div className="profile-card">
          <div
            className="profile-card__avatar-cover"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile-card__avatar"
              src={currentUser.avatar}
              alt="аватар пользователя"
            />
            <div className="profile-card__avatar-edit"></div>
          </div>
          <div className="profile-card__info">
            <div className="profile-card__title-cover">
              <h1 className="profile-card__title">{currentUser.name}</h1>
              <button
                className="button-open profile-card__button-edit"
                type="button"
                aria-label="кнопка Редактировать"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile-card__text">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button-open profile__button-add"
          type="button"
          aria-label="кнопка Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      {/* <!-- секция Places --> */}
      <section className="places content__places" aria-label="Куда поехать?">
        <ul className="places-grid undecorated-list page__reset-alignment">
          {props.cards
            .sort((a, b) => {
              if (a.createdAt > b.createdAt) return -1;
              if (a.createdAt < b.createdAt) return 1;
              return 0;
            })
            .map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
