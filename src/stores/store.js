import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice';
import projectSlice from '../features/projectSlice';
import searchSlice from '../features/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    project: projectSlice,
    searchTerm: searchSlice
  },
})

export default store