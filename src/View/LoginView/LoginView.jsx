import { useState } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "redux/auth";
import s from "../../components/Forms/Forms.module.css";

export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className={s.inputContainer}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className={s.inputContainer}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={s.input}
            />
            <label name="mail" className={s.label}>
              Login:
            </label>
          </div>
          <div className={s.inputContainer}>
            <input
              tipe="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={s.input}
            />
            <label name="password" className={s.label}>
              Password
            </label>
          </div>
          <button type="submit" className={s.borderButton}>
            Welcome
          </button>
        </form>
      </div>
    </>
  );
}
