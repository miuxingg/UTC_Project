import { ManagerOptions, SocketOptions } from 'socket.io-client';

export type TListenerFunc = (data?: any) => void;
export type TSocketOptions = Partial<ManagerOptions & SocketOptions>;

export enum EventNames {
  JoinRoom = '__join_room__',
  LeaveRoom = '__leave_room__',
  NewReview = 'new_review',
}

export interface ISocketEvent {
  registerListener: (name: EventNames, listener: TListenerFunc) => void;
  unregisterListener: (name: EventNames, listener: TListenerFunc) => void;

  connect: () => void;
  leave: () => void;

  joinRoom: (name: string) => boolean;
  leaveRoom: (name: string) => boolean;

  setSocketUrl: (url: string) => void;
  setOption: (option: TSocketOptions) => void;
  setNamespace: (namespace: string) => void;
}

export interface ISubject {
  add: (listener: TListenerFunc) => void;
  remove: (listener: TListenerFunc) => void;
  count: () => number;
  notifyAll: (data?: any) => void;
}
