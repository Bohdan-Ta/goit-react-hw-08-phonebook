import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { operations, selectors } from 'redux/phonebook';

import s from './Contacts.module.css';

export default function Contact({ id, name, number }) {
  const deleting = useSelector(selectors.getDeleting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => dispatch(operations.deleteContact(id));

  return (
    <li className={s.list}>
      <div className={s.datas}>
        <p className={s.name}>{name}</p>
        <p className={s.number}>{number}</p>
      </div>
      <button
        onClick={() => onDeleteContact(id)}
        className={s.slidingButton}
        disabled={deleting}
      >
        {deleting ? 'deleting' : 'delete'}
      </button>
    </li>
  );
}
