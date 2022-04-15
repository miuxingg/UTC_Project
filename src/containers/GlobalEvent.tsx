import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { insertNewReview } from '../redux/review';
import socket, { EventNames } from '../socket-sdk';

export const GlobalEvent: React.FC = ({ children }) => {
  const dispatch = useDispatch();
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
  useEffect(() => {
    socket.connect();
    socket.registerListener(EventNames.NewReview, handleNewReview);
    return () => {
      socket.unregisterListener(EventNames.NewReview, handleNewReview);
    };
  }, [handleNewReview]);
  return <>{children}</>;
};

export default GlobalEvent;
