import { expect, test, describe } from '@jest/globals';
import ingredientsReducer, {
  initialState,
  fetchIngredients,
  IngredientsState,
  getBuns,
  getMains,
  getSauces
} from './ingredients';
import { TIngredient } from '../../utils/types';

const testIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

const mockFetchIngredientsResponse = testIngredients;

interface RootState {
  ingredients: IngredientsState;
}

describe('[ingredients] - fetch ingredients', () => {
  test('Вызов редьюсера fetchIngredients - отображение процесса загрузки', () => {
    const currentState = ingredientsReducer(
      { ...initialState, error: 'Какая-то ошибка' },
      fetchIngredients.pending('', undefined)
    );
    expect(currentState).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера fetchIngredients - завершение загрузки и сохранение данных', () => {
    const currentState = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.fulfilled(mockFetchIngredientsResponse, '', undefined)
    );
    expect(currentState).toEqual({
      ...initialState,
      ingredients: testIngredients,
      buns: getBuns(testIngredients),
      mains: getMains(testIngredients),
      sauces: getSauces(testIngredients),
      isLoading: false,
      error: ''
    });
  });

  test('Вызов редьюсера fetchIngredients - обработка ошибки', () => {
    const errorText = 'Ошибка';
    const currentState = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.rejected(
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

describe('[ingredients] - selectors', () => {
  test('selectIngrediens - получение всех ингредиентов', () => {
    const state: RootState = { ingredients: { ...initialState, ingredients: testIngredients } };
    const selectedIngredients = state.ingredients.ingredients;
    expect(selectedIngredients).toEqual(testIngredients);
  });

  test('selectBuns - получение булок', () => {
    const state: RootState = { ingredients: { ...initialState, buns: getBuns(testIngredients) } };
    const selectedBuns = state.ingredients.buns;
    expect(selectedBuns).toEqual(getBuns(testIngredients));
  });

  test('selectMain - получение основных ингредиентов', () => {
    const state: RootState = { ingredients: { ...initialState, mains: getMains(testIngredients) } };
    const selectedMains = state.ingredients.mains;
    expect(selectedMains).toEqual(getMains(testIngredients));
  });

  test('selectSauce - получение соусов', () => {
    const state: RootState = { ingredients: { ...initialState, sauces: getSauces(testIngredients) } };
    const selectedSauces = state.ingredients.sauces;
    expect(selectedSauces).toEqual(getSauces(testIngredients));
  });

  test('selectIsDataLoading - проверка состояния загрузки', () => {
    const state: RootState = { ingredients: { ...initialState, isLoading: true } };
    const isLoading = state.ingredients.isLoading;
    expect(isLoading).toBe(true);
  });
});
