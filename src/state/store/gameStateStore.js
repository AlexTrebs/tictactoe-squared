import { configureStore } from '@reduxjs/toolkit'
import gameStateReducer from '../reducer/gameStateReducer';

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
  }
});

export default store;