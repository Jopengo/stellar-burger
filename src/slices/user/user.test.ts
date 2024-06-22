import { TLoginData, TRegisterData } from '../../utils/burger-api';

export const testLogin = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGVmYjA5OTdlZGUwMDAxZDA2YmU1NyIsImlhdCI6MTcxODMwMDUxNSwiZXhwIjoxNzE4MzAxNzE1fQ.9DEpsrNnjAekthPUWQX1ud2okh5FORNwnzRx-CYZ_ME',
  refreshToken:
    '63051a8187426b0d6855a300dabd0c2d926f970e18a8873bb526b4ddf217c2b74542a622f141a56f',
  user: {
    email: 'Isaiddin@ya.ru',
    name: 'Jopengo'
  }
};

export const testUpdate = {
  success: true,
  user: {
    email: 'Isaiddin@ya.ru',
    name: 'Jopengo'
  }
};

export const testGet = {
  success: true,
  user: {
    email: 'Isaiddin@ya,ru',
    name: 'Jopengo'
  }
};

const password = 'qwerty123';

export const login: TLoginData = {
  email: testLogin.user.email,
  password
};

export const register: TRegisterData = {
  email: testLogin.user.email,
  name: testLogin.user.name,
  password
};

export const update: TRegisterData = {
  email: testLogin.user.email,
  name: testLogin.user.name + '1',
  password
};

export const errorText = 'Ошибка';
export const errorOldText = 'Какая-то ошибка';

import { expect, test, describe } from '@jest/globals';

import userSliceReducer, {
  loginUser,
  registerUser,
  updateUser,
  getUser,
  initialState
} from './user';

describe('[loginUser] ', () => {
  test('Вызов редьюсера loginUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, loginError: errorOldText },
      loginUser.pending('', login)
    );
    expect(currentState).toEqual({
      ...initialState,
      loginError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера loginUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      loginUser.fulfilled(testLogin, '', login)
    );
    expect(currentState).toEqual({
      user: testLogin.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера loginUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      loginUser.rejected(new Error(errorText), '', login)
    );
    expect(currentState).toEqual({
      loginError: errorText,
      isLoading: false,
      otherError: '',
      user: null
    });
  });
});

describe('[registerUser] ', () => {
  test('Вызов редьюсера registerUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, otherError: errorOldText },
      registerUser.pending('', register)
    );
    expect(currentState).toEqual({
      ...initialState,
      otherError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера registerUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      registerUser.fulfilled(testLogin, '', register)
    );
    expect(currentState).toEqual({
      user: testLogin.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера registerUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      registerUser.rejected(new Error(errorText), '', register)
    );
    expect(currentState).toEqual({
      otherError: errorText,
      isLoading: false,
      user: null,
      loginError: ''
    });
  });
});

describe('[updateUser] ', () => {
  test('Вызов редьюсера updateUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, otherError: errorOldText },
      updateUser.pending('', update)
    );
    expect(currentState).toEqual({
      ...initialState,
      otherError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера updateUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      updateUser.fulfilled(testUpdate, '', update)
    );
    expect(currentState).toEqual({
      user: testUpdate.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера updateUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      updateUser.rejected(new Error(errorText), '', update)
    );
    expect(currentState).toEqual({
      otherError: errorText,
      isLoading: false,
      user: initialState.user,
      loginError: ''
    });
  });
});

describe('[getUser] ', () => {
  test('Вызов редьюсера getUser - отображение процесса загрузки', () => {
    const currentState = userSliceReducer(
      { ...initialState, otherError: errorOldText },
      getUser.pending('')
    );
    expect(currentState).toEqual({
      ...initialState,
      otherError: '',
      isLoading: true
    });
  });

  test('Вызов редьюсера getUser - завершение загрузки и сохранение данных', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      getUser.fulfilled(testGet, '')
    );
    expect(currentState).toEqual({
      user: testGet.user,
      isLoading: false,
      loginError: '',
      otherError: ''
    });
  });

  test('Вызов редьюсера getUser - обработка ошибки', () => {
    const currentState = userSliceReducer(
      { ...initialState, isLoading: true },
      getUser.rejected(new Error(errorText), '')
    );
    expect(currentState).toEqual({
      otherError: errorText,
      isLoading: false,
      user: initialState.user,
      loginError: ''
    });
  });
});