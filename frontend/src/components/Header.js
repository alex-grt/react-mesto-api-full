import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="логотип сайта Место" />
      <div className="header__cover">
        {props.loggedIn ?
          <>
            <p className="header__user">{props.email}</p>
            <Link
              to="/signin"
              className="header__action header__action_shaded"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </>
        :
          <Link to={props.path} className="header__action">
            {props.actionName}
          </Link>
        }
      </div>
    </header>
  );
}

export default Header;
