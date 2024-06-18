import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrders,
  fetchOrders,
  selectIsDataLoading
} from '../../slices/burger';
import { Preloader } from '@ui';
import { isLoadingType } from '../../utils/checkLoad';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrders);
  const isDataLoading = useSelector(selectIsDataLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (isLoadingType(isDataLoading, 'fetchOrders')) return <Preloader />;
  else return <ProfileOrdersUI orders={orders} />;
};
