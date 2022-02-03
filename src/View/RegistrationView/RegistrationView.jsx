import { useDispatch } from "react-redux";
import { useState } from "react";
import { authOperations } from "redux/auth";
import s from "../../components/Forms/Forms.module.css";

export default function RegistrationView() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "name":
        return setName(value);
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
    dispatch(authOperations.register({ name, email, password }));
    setName("");
    setEmail("");
    setPassword("");
  };
  console.log(handleSubmit);
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
            <label name="name" className={s.label}>
              Name:
            </label>
          </div>
          <div className={s.inputContainer}>
            <input
              type="email"
              name="email"
              className={s.input}
              value={email}
              onChange={handleChange}
            />
            <label name="email" className={s.label}>
              Login:
            </label>
          </div>
          <div className={s.inputContainer}>
            <input
              tipe="password"
              name="password"
              className={s.input}
              value={password}
              onChange={handleChange}
            />
            <label name="password" className={s.label}>
              Password
            </label>
          </div>
          <button type="submit" className={s.borderButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
