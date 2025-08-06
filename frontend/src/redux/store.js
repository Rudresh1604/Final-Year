import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

// TypeScript users can add these types
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
