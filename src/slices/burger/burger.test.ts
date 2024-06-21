import { TBurgerConstructor } from '@utils-types';
import { TNewOrderResponse } from '../../utils/burger-api';

export const testConstructorBurger: string[] = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa0942',
  '643d69a5c3f7b9001cfa093c'
];

export const testOrder: TNewOrderResponse = {
  success: true,
  name: 'Краторный spicy био-марсианский бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '666c31a397ede0001d0709a3',
    status: 'done',
    name: 'Краторный spicy био-марсианский бургер',
    createdAt: '2024-06-20T11:13:47.124Z',
    updatedAt: '2024-06-20T11:13:49.196Z',
    number: 42366
  }
};

export const testOrderResponse: TBurgerConstructor = {
  orderModalData: testOrder.order,
  error: '',
  isLoading: false,
  bun: null,
  ingredients: []
};

export const testIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 90,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-02-large.png',
    __v: 0
  }
];

import { expect, test, describe } from '@jest/globals';
import constructorBurgerReducer, {
  initialState,
  setBun,
  removeIngredient,
  upIngredient,
  downIngredient,
  orderBurger,
  addIngredient
} from './burger';

describe('[constructor] - редактирование', () => {
  test('обработка экшена установки булки', () => {
    const beginState = Object.assign({}, initialState);
    const newState = constructorBurgerReducer(
      beginState,
      setBun(testIngredients[0])
    );
    const { bun } = newState;
    expect(bun).toEqual(testIngredients[0]);
  });

  test('обработка экшена добавления и удаления ингредиента', () => {
    const beginState = Object.assign({}, initialState);
    const newState = constructorBurgerReducer(
      beginState,
      addIngredient(testIngredients[1])
    );
    const { ingredients } = newState;
    expect(ingredients.length).toBe(1);
    expect(ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
    const newStateForDel = constructorBurgerReducer(
      newState,
      removeIngredient(ingredients[0].id)
    );
    expect(newStateForDel.ingredients.length).toBe(0);
  });

  test('обработка экшена изменения порядка ингредиентов в начинке;', () => {
    const beginState = Object.assign({}, initialState);
    let newState = constructorBurgerReducer(
      beginState,
      addIngredient(testIngredients[1])
    );
    newState = constructorBurgerReducer(
      newState,
      addIngredient(testIngredients[2])
    );
    newState = constructorBurgerReducer(
      newState,
      addIngredient(testIngredients[3])
    );
    expect(newState.ingredients.length).toBe(3);
    const newStateForOrder = constructorBurgerReducer(
      newState,
      upIngredient(newState.ingredients[1].id)
    );
    expect(newStateForOrder.ingredients[0]._id).toEqual(testIngredients[2]._id);
    expect(newStateForOrder.ingredients[1]._id).toEqual(testIngredients[1]._id);
    expect(newStateForOrder.ingredients[2]._id).toEqual(testIngredients[3]._id);
  });

  test('обработка экшена изменения порядка ингредиентов вниз;', () => {
    const beginState = Object.assign({}, initialState);
    let newState = constructorBurgerReducer(
      beginState,
      addIngredient(testIngredients[1])
    );
    newState = constructorBurgerReducer(
      newState,
      addIngredient(testIngredients[2])
    );
    newState = constructorBurgerReducer(
      newState,
      addIngredient(testIngredients[3])
    );
    expect(newState.ingredients.length).toBe(3);
    const newStateForOrder = constructorBurgerReducer(
      newState,
      downIngredient(newState.ingredients[0].id)
    );
    expect(newStateForOrder.ingredients[0]._id).toEqual(testIngredients[2]._id);
    expect(newStateForOrder.ingredients[1]._id).toEqual(testIngredients[0]._id);
    expect(newStateForOrder.ingredients[2]._id).toEqual(testIngredients[3]._id);
  });
});

describe('[constructor] - отправка заказа', () => {
  test('Вызов редьюсера orderBurger - отображение процесса загрузки', () => {
    const currentState = constructorBurgerReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      orderBurger.pending('', testConstructorBurger)
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера orderBurger - завершение загрузки и сохранение данных', () => {
    const currentState = constructorBurgerReducer(
      { ...initialState, isLoading: true },
      orderBurger.fulfilled(testOrder, '', testConstructorBurger)
    );
    expect(currentState).toEqual(testOrderResponse);
  });

  test('Вызов редьюсера orderBurger - обработка ошибки', () => {
    const errorText = 'Ошибка';
    const currentState = constructorBurgerReducer(
      { ...initialState, isLoading: true },
      orderBurger.rejected(
        new Error(errorText),
        '',
        testOrder.order.ingredients
      )
    );
    expect(currentState).toEqual({
      ...initialState,
      error: errorText,
      isLoading: false
    });
  });
});
