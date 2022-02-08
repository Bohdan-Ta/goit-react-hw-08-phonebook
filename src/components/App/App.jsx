import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { authOperations, authSelectors } from 'redux/auth';

import Sections from '../Section';
import Spinner from 'components/Spinner/Spinner';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import AppBar from 'components/AppBar/AppBar';

import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

const Forms = lazy(() => import('../Forms/Forms'));
const Contacts = lazy(() => import('../Contacts'));
const Filter = lazy(() => import('../Filter/Filter'));
const HomeView = lazy(() => import('components/views/HomeVeiw/HomeView'));
const LoginView = lazy(() => import('components/views/LoginView'));
const RegistrationView = lazy(() =>
  import('components/views/RegistrationView/RegistrationView'),
);

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser,
  );

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return isFetchingCurrentUser ? (
    Spinner
  ) : (
    <div className={s.container}>
      <AppBar />
      <Sections>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <HomeView />
                </PublicRoute>
              }
            />
            <Route
              path="/auth"
              element={
                <PublicRoute restricted navigateTo="/contacts">
                  <LoginView />
                </PublicRoute>
              }
            />
            <Route
              path="/registration"
              element={
                <PublicRoute restricted navigateTo="/contacts">
                  <RegistrationView />
                </PublicRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute navigateTo="/auth">
                  <Sections title="Contacts">
                    <Filter />
                    <Contacts />
                  </Sections>
                </PrivateRoute>
              }
            />
            <Route
              path="/form"
              element={
                <PrivateRoute navigateTo="/auth">
                  <Sections title="add information about contact">
                    <Forms />
                  </Sections>
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Sections>

      <ToastContainer />
    </div>
  );
}
