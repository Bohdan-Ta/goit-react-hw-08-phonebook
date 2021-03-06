import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { authOperations } from 'redux/auth';
import s from '../../Forms/Forms.module.css';

export default function RegistrationView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className={s.inputContainer}>
        <form onSubmit={handleSubmit}>
          <div className={s.inputContainer}>
            <input
              type="text"
              name="name"
              className={s.input}
              value={name}
              onChange={handleChange}
            />
            <label className={s.label}>Name:</label>
          </div>
          <div className={s.inputContainer}>
            <input
              type="email"
              name="email"
              className={s.input}
              value={email}
              onChange={handleChange}
              placeholder="mail@mail.com"
            />
            <label className={s.label}>Login:</label>
          </div>
          <div className={s.inputContainer}>
            <input
              type="password"
              name="password"
              className={s.input}
              value={password}
              onChange={handleChange}
            />
            <label className={s.label}>Password</label>
          </div>
          <button type="submit" className={s.borderButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
