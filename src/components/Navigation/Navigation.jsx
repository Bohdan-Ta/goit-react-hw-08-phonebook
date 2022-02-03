import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

import s from './Navigation.module.css';

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <nav className={s.navigation}>
      <div>
        <NavLink
          to="/"
          className={s.link}
          style={({ isActive }) => ({
            color: isActive ? '#2196f3' : '#2a363b',
          })}
        >
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink
            to="/contacts"
            className={s.link}
            style={({ isActive }) => ({
              color: isActive ? '#2196f3' : '#2a363b',
            })}
          >
            Contacts
          </NavLink>
        )}
      </div>
    </nav>
  );
}
