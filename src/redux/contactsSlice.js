import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null
    },
    filter: '',
  },
  reducers: {
    // addContact(state, action) {
    //   state.contacts.push(action.payload);
    // },
    // deleteContact(state, action) {
    //   state.contacts = state.contacts.filter(
    //     contact => contact.id !== action.payload
    //   );
    // },
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending,(state)=>{
      state.contacts.isLoading =true;
    })
    .addCase(fetchContacts.fulfilled,(state,action)=> {
      state.contacts.isLoading =false;
      state.contacts.error= null;
      state.contacts.items = action.payload
    })
    .addCase(fetchContacts.rejected,(state,action) => {
      state.contacts.isLoading=false;
      state.contacts.error = action.payload;
    })

  },
});



export const contactsReducer = contactsSlice.reducer;

export const { filterContacts } =
  contactsSlice.actions;

  // export const { addContact, deleteContact, filterContacts } =
  // contactsSlice.actions;
