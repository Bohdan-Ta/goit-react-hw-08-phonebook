import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const fetchContactsApi = () => axios.get('contacts');
export const addContactApi = contact => axios.post('contacts', contact);
export const deleteContactApi = id => axios.delete(`contacts/${id}`);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_args, { rejectWithValue }) => {
    try {
      const { data } = await fetchContactsApi();
      return data;
    } catch (error) {
      toast.error(
        `Sorry. Something went wrong. Try loading the page agein... `,
      );
      return rejectWithValue(error);
    }
  },
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const { data } = await addContactApi({ name, number });
      return data;
    } catch (error) {
      toast.dark(`Sorry. Something went wrong. Try to add a contact again... `);
      return rejectWithValue(error);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await deleteContactApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
