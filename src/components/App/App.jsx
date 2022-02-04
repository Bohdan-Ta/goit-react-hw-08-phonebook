import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { authOperations, authSelectors } from 'redux/auth';

import Sections from '../Section';
import Spinner from 'components/Spinner/Spinner';
import PrivateRoute from '../Routes/PrivateRoute';
import PublicRoute from '../Routes/PublicRoute';
import AppBar from 'components/AppBar/AppBar';

import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

const Forms = lazy(() => import('../Forms/Forms'));
const Contacts = lazy(() => import('../Contacts'));
const Filter = lazy(() => import('../Filter/Filter'));
const HomeView = lazy(() => import('View/HomeVeiw/HomeView'));
const LoginView = lazy(() => import('View/LoginView'));
const RegistrationView = lazy(() =>
  import('View/RegistrationView/RegistrationView'),
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
    <Spinner />
  ) : (
    <div className={s.container}>
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Sections>
                  <HomeView />
                </Sections>
              </PublicRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <PublicRoute restricted navigateTo="/contacts">
                <Sections>
                  <LoginView />
                </Sections>
              </PublicRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <PublicRoute restricted navigateTo="/contacts">
                <Sections>
                  <RegistrationView />
                </Sections>
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
              <Sections title="information about contact">
                <Forms />
              </Sections>
            }
          />
        </Routes>
      </Suspense>

      <ToastContainer />
    </div>
  );
}
