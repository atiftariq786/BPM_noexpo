import { configureStore} from '@reduxjs/toolkit';
import gameSlice from './gameState';

export default store = configureStore({
    reducer:{
        bpmGame: gameSlice.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})