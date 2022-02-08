import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

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
    return [payload, ...state];
  },

  [deleteContact.fulfilled]: (state, { payload }) => {
    return state.filter(({ id }) => id !== payload);
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
