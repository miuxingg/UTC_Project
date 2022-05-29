import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../redux/auth/selectors';
import { updateOrderStatus } from '../redux/order';
import { insertNewReview } from '../redux/review';
import { addVoucher, removeVoucher } from '../redux/voucher';
import socket, { EventNames } from '../socket-sdk';

export const GlobalEvent = React.memo(function GlobalEvent({ children }) {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const handleNewReview = useCallback(
    (data: any) => {
      dispatch(
        insertNewReview({
          id: data.id,
          comment: data.comment,
          rating: data.rating,
          user: {
            avatar: data.user.avatar,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
          },
        }),
      );
    },
    [dispatch],
  );

  const handleUpdateOrderStatus = useCallback(
    (data: any) => {
      dispatch(updateOrderStatus({ id: data.id, status: data.status }));
    },
    [dispatch],
  );

  const handleUpdateVoucherReady = useCallback(
    (data: any) => {
      dispatch(addVoucher(data?.data));
    },
    [dispatch],
  );

  const handleUpdateVoucherExpire = useCallback(
    (data: any) => {
      dispatch(removeVoucher(data?.data));
    },
    [dispatch],
  );

  useEffect(() => {
    socket.connect();
    socket.joinRoom(profile?.id ?? '');
    socket.registerListener(EventNames.NewReview, handleNewReview);
    socket.registerListener(
      EventNames.UpdateOrderStatus,
      handleUpdateOrderStatus,
    );
    socket.registerListener(
      EventNames.UpdateVoucherReady,
      handleUpdateVoucherReady,
    );
    socket.registerListener(
      EventNames.UpdateVoucherExpire,
      handleUpdateVoucherExpire,
    );
    return () => {
      socket.unregisterListener(EventNames.NewReview, handleNewReview);

      socket.unregisterListener(
        EventNames.UpdateOrderStatus,
        handleUpdateOrderStatus,
      );

      socket.unregisterListener(
        EventNames.UpdateVoucherReady,
        handleUpdateVoucherReady,
      );

      socket.unregisterListener(
        EventNames.UpdateVoucherExpire,
        handleUpdateVoucherExpire,
      );
      socket.leaveRoom(profile?.id ?? '');
    };
  }, [profile?.id, handleNewReview, handleUpdateOrderStatus, handleUpdateVoucherReady, handleUpdateVoucherExpire]);
  return <>{children}</>;
});
