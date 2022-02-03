import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sections from "../Section";
import Forms from "../Forms/Forms";
import Contacts from "../Contacts";
import Filter from "../Filter/Filter";
import AppBar from "components/AppBar/AppBar";
import HomeView from "View/HomeVeiw/HomeView";
import LoginView from "../../View/LoginView";
import { authOperations } from "redux/auth";

import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.css";
import RegistrationView from "View/RegistrationView/RegistrationView";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    <div className={s.container}>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={
            <Sections>
              <HomeView />
            </Sections>
          }
        />
        <Route
          path="/registration"
          element={
            <Sections>
              <RegistrationView />
            </Sections>
          }
        />
        <Route
          path="/form"
          element={
            <Sections title="Phonebook">
              <Forms />
            </Sections>
          }
        />
        <Route
          path="/contacts"
          element={
            <Sections title="Contacts">
              <Filter />
              <Contacts />
            </Sections>
          }
        />
        <Route
          path="/auth"
          element={
            <Sections>
              <LoginView />
            </Sections>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}
