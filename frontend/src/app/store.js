import { configureStore } from '@reduxjs/toolkit';
import { authReducer, noteReducer, ticketReducer } from '../features';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});
