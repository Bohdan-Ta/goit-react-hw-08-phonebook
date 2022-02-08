import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import Contact from './ContactItem.jsx/Contact';

import { operations, selectors } from 'redux/phonebook';
import { AiOutlineUserAdd } from 'react-icons/ai';

import s from './Contacts.module.css';

export default function Contacts() {
  const navigateTo = useNavigate();

  const isLoading = useSelector(selectors.getLoading);
  const contacts = useSelector(selectors.getSensitiveSearch);
  const dispatch = useDispatch();

  const addContact = () => {
    navigateTo('/form');
  };

  const sortContacts = contacts.sort(function (a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  useEffect(() => {
    dispatch(operations.fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      <button type="button" onClick={addContact} className={s.addContact}>
        <AiOutlineUserAdd className={s.icon} />
      </button>
      <ul className={s.box_contacts}>
        {sortContacts.map(({ id, name, number }) => (
          <Contact key={id} id={id} name={name} number={number} />
        ))}
      </ul>
      <p className={s.totalContact}>find contacts: {contacts.length}</p>
    </>
  );
}
