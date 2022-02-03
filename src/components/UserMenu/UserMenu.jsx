import { useDispatch, useSelector } from "react-redux";
import { authSelectors, authOperations } from "../../redux/auth";
import Avatar from "../../image/avatar.png";
import s from "../UserMenu/UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  const avatar = Avatar;

  return (
    <div className={s.container}>
      <img src={avatar} alt="" width="50" className={s.avatar} />
      <span className={s.name}>Welcome,{name} </span>
      <button
        type="button"
        className={s.button}
        onClick={() => dispatch(authOperations.logOut())}
      >
        Out
      </button>
    </div>
  );
}
