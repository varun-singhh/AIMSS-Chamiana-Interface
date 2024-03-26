import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localstorage"; // Assuming you have defined these functions

// Load persisted state from localStorage
const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState, // Provide the preloaded state to configureStore
});

// Subscribe to store changes and save the state to localStorage
store.subscribe(() => {
  // saveState(store.getState()); // Save the entire Redux state
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
