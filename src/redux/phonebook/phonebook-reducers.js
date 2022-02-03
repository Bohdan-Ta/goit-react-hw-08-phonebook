import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from './phonebook-operations';
import { changeFilter } from './phonebook-actions';

const items = createReducer([], {
  [fetchContacts.fulfilled]: (_state, { payload }) => {
    return payload;
  },

  [addContact.fulfilled]: (state, { payload }) => {
    const searchDublicate = state.find(
      contact => contact.name === payload.name,
    );
    if (searchDublicate) {
      toast.warning(`${payload.name} is already in contacts`);
    } else return [payload, ...state];
  },

  [deleteContact.fulfilled]: (state, { payload }) => {
    state.filter(({ id }) => id !== payload);
  },
});

const filter = createReducer('', {
  [changeFilter]: (_state, { payload }) => payload,
});

const loading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
});
const deleting = createReducer(false, {
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.rejected]: (_state, { payload }) => payload,
  [addContact.rejected]: (_state, { payload }) => payload,
  [deleteContact.rejected]: (_state, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  loading,
  deleting,
  error,
});
