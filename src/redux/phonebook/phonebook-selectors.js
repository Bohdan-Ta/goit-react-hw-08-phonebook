import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
export const getLoading = state => state.contacts.loading;
export const getDeleting = state => state.contacts.deleting;

export const getSensitiveSearch = createSelector(
  getContacts,
  getFilter,
  (contacts, filter) => {
    const lowerCaseLetters = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseLetters),
    );
  },
);
