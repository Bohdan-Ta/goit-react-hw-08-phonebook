import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { operations } from 'redux/phonebook';
import { getContacts } from 'redux/phonebook/phonebook-selectors';

import s from './Forms.module.css';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  number: Yup.string()
    .matches(phoneRegExp, 'invalid number')
    .required('Required'),
});

export default function Forms() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },

    validationSchema: RegistrationSchema,

    onSubmit: (values, { resetForm }) => {
      const searchDublicate = contacts.find(
        contact => contact.name === values.name,
      );
      if (searchDublicate) {
        toast.warning(`${values.name} is already in contacts`);
        return;
      }
      dispatch(operations.addContact(values));
      resetForm();
      history('/contacts');
    },
  });
  return (
    <div className={s.inputContainer}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.inputContainer}>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className={s.input}
            autoComplete="off"
          />
          {formik.errors.name}
          <label htmlFor="name" className={s.label}>
            Name:
          </label>
        </div>
        <div className={s.inputContainer}>
          <input
            type="tel"
            name="number"
            onChange={formik.handleChange}
            value={formik.values.number}
            className={s.input}
          />
          {formik.errors.number}
          <label className={s.label}>Number:</label>
        </div>
        <button type="submit" className={s.borderButton}>
          add contact
        </button>
      </form>
    </div>
  );
}
