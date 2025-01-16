import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './reducers';

const store = configureStore({
  reducer: {
    example: exampleReducer, // Ensure this is a valid slice reducer
  },
});

export default store;