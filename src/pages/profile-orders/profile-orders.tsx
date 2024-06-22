import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrders,
  fetchOrders,
  selectIsLoading
} from '../../slices/order/order';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (isLoading) return <Preloader />;
  else return <ProfileOrdersUI orders={orders} />;
};
