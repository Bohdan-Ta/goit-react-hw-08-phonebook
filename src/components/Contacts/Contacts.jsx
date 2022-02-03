import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

import { operations, selectors } from 'redux/phonebook';
import { GrAddCircle } from 'react-icons/gr';

import s from './Contacts.module.css';

export default function Contacts() {
  const history = useNavigate();

  const isLoading = useSelector(selectors.getLoading);
  const deleting = useSelector(selectors.getDeleting);
  const contacts = useSelector(selectors.getSensitiveSearch);
  const dispatch = useDispatch();

  const addContact = () => {
    history('/form');
  };

  const sortContacts = contacts.sort(function (a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  useEffect(() => {
    dispatch(operations.fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => dispatch(operations.deleteContact(id));

  return (
    <>
      {isLoading && <Spinner />}
      <button type="button" onClick={addContact} className={s.addContact}>
        <GrAddCircle style={{ width: '60', fill: 'gren', height: '60' }} />
      </button>
      <ul className={s.box_contacts}>
        {sortContacts.map(({ id, name, number }) => (
          <li key={id} className={s.list}>
            <div className={s.datas}>
              <p className={s.name}>{name}</p>
              <p className={s.number}>{number}</p>
            </div>
            <button
              onClick={() => onDeleteContact(id)}
              className={s.slidingButton}
              disabled={deleting}
            >
              {deleting ? '...deleting' : 'delete'}
            </button>
          </li>
        ))}
      </ul>
      <p className={s.totalContact}>find contacts: {contacts.length}</p>
    </>
  );
}
