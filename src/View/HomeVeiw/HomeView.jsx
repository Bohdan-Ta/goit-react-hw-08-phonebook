import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import s from '../HomeVeiw/HomeView.module.css';

export default function Home() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <div className={s.box}>
      <h1 className={s.header}>
        {isLoggedIn
          ? 'We are very glad to see you again'
          : 'Welcome to Phonebook'}
      </h1>
      {!isLoggedIn && (
        <p className={s.text}>You need to login to use the application</p>
      )}
    </div>
  );
}
