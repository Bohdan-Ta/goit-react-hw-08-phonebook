import { useSelector, useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';

import { actions, selectors } from 'redux/phonebook';

import s from './Filter.module.css';

export default function Filter() {
  const value = useSelector(selectors.getFilter);
  const dispatch = useDispatch();

  const onChange = e => dispatch(actions.changeFilter(e.target.value));

  return (
    <div className={s.form}>
      <label className={s.label}>
        Find contact by name
        <DebounceInput
          type="text"
          autoComplete="off"
          minLength={2}
          debounceTimeout={300}
          placeholder="search contact by name.."
          value={value}
          onChange={onChange}
          className={s.input}
        />
      </label>
    </div>
  );
}
