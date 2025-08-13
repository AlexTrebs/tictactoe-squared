import { configureStore } from '@reduxjs/toolkit'
import gameStateReducer from './gameStateReducer';

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
  }
});

export default store;
