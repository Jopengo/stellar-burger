import { expect, test, describe } from '@jest/globals';

const testMyOrders = [
  {
    _id: '664f130897ede0001d06be86',
    ingredients: [
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Астероидный space флюоресцентный spicy бургер',
    createdAt: '2024-05-23T12:41:41.761Z',
    updatedAt: '2024-05-23T12:41:43.139Z',
    number: 40698
  },
  {
    _id: '664f134397ede0001d06be88',
    ingredients: [
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный минеральный фалленианский бургер',
    createdAt: '2024-05-23T12:41:41.887Z',
    updatedAt: '2024-05-23T12:41:43.286Z',
    number: 40699
  },
  {
    _id: '664f138597ede0001d06be8d',
    ingredients: [
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный бессмертный метеоритный бургер',
    createdAt: '2024-05-23T12:54:23.020Z',
    updatedAt: '2024-05-23T12:54:24.376Z',
    number: 40700
  }
];

import ordersSliceReducer, { fetchOrders, initialState } from './order';

describe('[fetchOrders] загрузка ленты своих заказов', () => {
  test('Вызов редьюсера ordersSlice - отображение процесса загрузки', () => {
    const currentState = ordersSliceReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      fetchOrders.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера ordersSlice - завершение загрузки и сохранение данных', () => {
    const currentState = ordersSliceReducer(
      { ...initialState, isLoading: true },
      fetchOrders.fulfilled(testMyOrders, '')
    );
    expect(currentState).toEqual({
      orders: testMyOrders,
      error: '',
      isLoading: false,
      currentOrder: null
    });
  });

  test('Вызов редьюсера ordersSlice - обработка ошибки', async () => {
    const errorText = 'Ошибка';
    const currentState = ordersSliceReducer(
      { ...initialState, isLoading: true },
      fetchOrders.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      orders: initialState.orders,
      error: errorText,
      isLoading: false,
      currentOrder: null
    });
  });
});
