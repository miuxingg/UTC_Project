import { SocketEvent } from './SocketEvent';
import { ISocketEvent } from './types';

export * from './SocketEvent';
export * from './types';

const socket: ISocketEvent = new SocketEvent();
export default socket;
