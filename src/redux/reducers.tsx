import { combineReducers, createStore } from 'redux';

const exampleReducer = (state = {}, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer, // Ensure this is a valid reducer function
});

const store = createStore(rootReducer);

 export default rootReducer;
