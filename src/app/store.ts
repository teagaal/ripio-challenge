import type { ThunkAction, Action } from "@reduxjs/toolkit";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "../features/dashboard/dashboardSlice";
import modalSlice from "../common/Modal/modalSlice";

const rootReducer = combineReducers({
  dashboard: dashboardSlice,
  modal: modalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware();
    },
    preloadedState,
  });

  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action<string>
>;
