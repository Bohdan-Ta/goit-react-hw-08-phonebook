import React from "react";
import { NavLink } from "react-router-dom";
import s from "../AuthNav/AuthNav.module.css";

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/auth"
        className={s.link}
        style={({ isActive }) => ({
          color: isActive ? "#2196f3" : "#2a363b",
        })}
      >
        LogIn
      </NavLink>
      <NavLink
        to="/registration"
        className={s.link}
        style={({ isActive }) => ({
          color: isActive ? "#2196f3" : "#2a363b",
        })}
      >
        Register
      </NavLink>
    </div>
  );
}
