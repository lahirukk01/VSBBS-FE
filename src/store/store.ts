import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/store/AuthSlice';
import { authApi } from '~/store/AuthApiSlice';
import { usersApi } from '~/store/UsersApiSlice.ts';
import {accountsApi} from '~/store/AccountsApiSlice.ts';
import {beneficiariesApi} from '~/store/BeneficiariesApiSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [beneficiariesApi.reducerPath]: beneficiariesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, usersApi.middleware, accountsApi.middleware,
      beneficiariesApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
