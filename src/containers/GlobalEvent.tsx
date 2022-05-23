import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../redux/auth/selectors';
import { updateOrderStatus } from '../redux/order';
import { insertNewReview } from '../redux/review';
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
  useEffect(() => {
    socket.connect();

    socket.joinRoom(profile?.id ?? '');
    socket.registerListener(EventNames.NewReview, handleNewReview);
    socket.registerListener(
      EventNames.UpdateOrderStatus,
      handleUpdateOrderStatus,
    );
    return () => {
      socket.unregisterListener(EventNames.NewReview, handleNewReview);

      socket.unregisterListener(
        EventNames.UpdateOrderStatus,
        handleUpdateOrderStatus,
      );
      socket.leaveRoom(profile?.id ?? '');
    };
  }, [profile?.id, handleNewReview, handleUpdateOrderStatus]);
  return <>{children}</>;
});
