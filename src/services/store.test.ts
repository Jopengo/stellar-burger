import { expect, test, describe } from '@jest/globals';
import { store, rootReducer } from './store';
import ingredientsSliceReducer, {
  initialState as ingredientsInitialState
} from '../slices/ingredients/ingredients';
import constructorSliceReducer, {
  initialState as constructorInitialState
} from '../slices/burger/burger';
import userSliceReducer, {
  initialState as userInitialState
} from '../slices/user/user';
import feedsSliceReducer, {
  initialState as feedsInitialState
} from '../slices/feeds/feed';
import ordersSliceReducer, {
  initialState as ordersInitialState
} from '../slices/order/order';

describe('тесты rootReducer', () => {
  test('проверить корректную инициализацию структуру rootReducer', () => {
    const init = { type: '@@redux/INIT' };
    const state = rootReducer(undefined, init);
    expect(state).toEqual({
      ingredients: ingredientsSliceReducer(undefined, init),
      user: userSliceReducer(undefined, init),
      feeds: feedsSliceReducer(undefined, init),
      burgerConstructor: constructorSliceReducer(undefined, init),
      orders: ordersSliceReducer(undefined, init)
    });
  });
  test('проверить корректную инициализацию структуру rootReducer необрабатываемым экшном', () => {
    const init = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, init);
    expect(state).toEqual({
      ingredients: ingredientsSliceReducer(undefined, init),
      user: userSliceReducer(undefined, init),
      feeds: feedsSliceReducer(undefined, init),
      burgerConstructor: constructorSliceReducer(undefined, init),
      orders: ordersSliceReducer(undefined, init)
    });
  });
  test('проверить корректную инициализацию rootReducer начальными состояниями', () => {
    expect(store.getState().ingredients).toEqual(ingredientsInitialState);
    expect(store.getState().user).toEqual(userInitialState);
    expect(store.getState().burgerConstructor).toEqual(constructorInitialState);
    expect(store.getState().feeds).toEqual(feedsInitialState);
    expect(store.getState().orders).toEqual(ordersInitialState);
  });
});
