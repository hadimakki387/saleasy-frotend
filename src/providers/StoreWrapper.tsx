"use client";

import { configureStore } from "@reduxjs/toolkit";
import reducers from "../components/core/features";
import { mainApi } from "../components/core/rtk-query";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(mainApi.middleware) as any,
});

setupListeners(store.dispatch);

export { store };

function StoreWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreWrapper;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// for using thunks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
