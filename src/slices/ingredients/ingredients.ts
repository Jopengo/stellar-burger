import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

export interface IngredientsState {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: string;
}

export const initialState: IngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false,
  error: ''
};

export function getBuns(ingredients: TIngredient[]): TIngredient[] {
  return ingredients.filter((el) => el.type === 'bun');
}

export function getMains(ingredients: TIngredient[]): TIngredient[] {
  return ingredients.filter((el) => el.type === 'main');
}

export function getSauces(ingredients: TIngredient[]): TIngredient[] {
  return ingredients.filter((el) => el.type === 'sauce');
}

export const fetchIngredients = createAsyncThunk(
  'fetchIngredients',
  getIngredientsApi
);

const burgerSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngrediens: (sliceState) => sliceState.ingredients,
    selectBuns: (sliceState) => sliceState.buns,
    selectMain: (sliceState) => sliceState.mains,
    selectSauce: (sliceState) => sliceState.sauces,
    selectIsDataLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.buns = getBuns(action.payload);
        state.mains = getMains(action.payload);
        state.sauces = getSauces(action.payload);
        state.error = '';
      });
  }
});

export const {
  selectIsDataLoading,
  selectIngrediens,
  selectBuns,
  selectMain,
  selectSauce
} = burgerSlice.selectors;
export default burgerSlice.reducer;
