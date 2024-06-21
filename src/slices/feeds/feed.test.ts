import { expect, test, describe } from '@jest/globals';
import feedsReducer, {
  initialState,
  fetchFeeds,
  selectFeeds,
  selectIsDataLoading,
  FeedsState
} from './feed';
import { TOrder } from '../../utils/types';

const testOrders: TOrder[] = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '666c31a397ede0001d0709a3',
    status: 'done',
    name: 'Краторный spicy био-марсианский бургер',
    createdAt: '2024-06-20T14:23:17.124Z',
    updatedAt: '2024-06-20T14:23:19.196Z',
    number: 42366
  },
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '666c31a397ede0001d0709a4',
    status: 'done',
    name: 'Марсианский био-бургер',
    createdAt: '2024-06-20T15:37:47.124Z',
    updatedAt: '2024-06-20T15:37:49.196Z',
    number: 42367
  }
];

const mockFetchFeedsResponse = {
  success: true,
  orders: testOrders,
  total: 2,
  totalToday: 1
};

interface RootState {
  feeds: FeedsState;
}

describe('[feeds] - fetch feeds', () => {
  test('Вызов редьюсера fetchFeeds - отображение процесса загрузки', () => {
    const currentState = feedsReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      fetchFeeds.pending('', undefined)
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера fetchFeeds - завершение загрузки и сохранение данных', () => {
    const currentState = feedsReducer(
      { ...initialState, isLoading: true },
      fetchFeeds.fulfilled(mockFetchFeedsResponse, '', undefined)
    );
    expect(currentState).toEqual({
      ...initialState,
      feeds: testOrders,
      isLoading: false,
      error: ''
    });
  });

  test('Вызов редьюсера fetchFeeds - обработка ошибки', () => {
    const errorText = 'Ошибка';
    const currentState = feedsReducer(
      { ...initialState, isLoading: true },
      fetchFeeds.rejected(
        new Error(errorText),
        '',
        undefined
      )
    );
    expect(currentState).toEqual({
      ...initialState,
      error: errorText,
      isLoading: false
    });
  });
});

describe('[feeds] - selectors', () => {
  test('selectFeeds - получение списка заказов', () => {
    const state: RootState = { feeds: { ...initialState, feeds: testOrders } };
    const selectedFeeds = selectFeeds(state);
    expect(selectedFeeds).toEqual(testOrders);
  });

  test('selectIsDataLoading - проверка состояния загрузки', () => {
    const state: RootState = { feeds: { ...initialState, isLoading: true } };
    const isLoading = selectIsDataLoading(state);
    expect(isLoading).toBe(true);
  });
});
