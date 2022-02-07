import { BallTriangle } from 'react-loader-spinner';

import s from './Spinner.module.css';

export default function Spinner() {
  return (
    <BallTriangle
      wrapperClass={s.loader}
      heigth="80"
      width="80"
      color="grey"
      ariaLabel="loading-indicator"
    />
  );
}
