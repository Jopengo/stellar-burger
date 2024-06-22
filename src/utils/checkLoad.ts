export type LoadingType =
  | 'fetchIngredients'
  | 'fetchFeeds'
  | 'fetchOrders'
  | 'fetchOrder'
  | 'orderBurger'
  | 'registerUser'
  | 'updateUser'
  | 'loginUser'
  | 'getUser'
  | 'logoutUser';
export type Loadings = LoadingType[] | null;
export function activateLoadingType(
  loadings: Loadings,
  loadingType: LoadingType
): Loadings {
  if (!loadings) loadings = [];
  if (loadings.indexOf(loadingType) === -1) loadings.push(loadingType);
  return loadings;
}

export function deactivateLoadingType(
  loadings: Loadings,
  loadingType: LoadingType
): Loadings {
  if (!loadings) return null;
  if (loadings.indexOf(loadingType) != -1)
    loadings = loadings.filter((el) => el != loadingType);
  if (loadings.length === 0) loadings = null;
  return loadings;
}

export function isLoadingType(
  loadings: Loadings,
  loadingType: LoadingType
): boolean {
  if (!loadings) return false;
  return loadings.indexOf(loadingType) != -1;
}
