import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsSliceReducer from '../slices/ingredients/ingredients';
import constructorSliceReducer from '../slices/burger/burger';
import userSliceReducer from '../slices/user/user';
import feedsSliceReducer from '../slices/feeds/feed';
import ordersSliceReducer from '../slices/order/order';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  user: userSliceReducer,
  feeds: feedsSliceReducer,
  burgerConstructor: constructorSliceReducer,
  orders: ordersSliceReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export default store;
