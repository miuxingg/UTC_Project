import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import { Subject } from './subject';
import {
  EventNames,
  ISocketEvent,
  ISubject,
  TListenerFunc,
  TSocketOptions,
} from './types';

let DEFAULT_SOCKET_URL = '';
const DEFAULT_NAMESPACE = '';

if (process && process.env.NODE_ENV === 'production') {
  DEFAULT_SOCKET_URL = '';
} else {
  DEFAULT_SOCKET_URL = 'http://localhost:8081';
}
export class SocketEvent implements ISocketEvent {
  private socket: Socket | null = null;
  private socketUrl: string = '';
  private namespace: string = '';
  private subjects: Map<string, ISubject> = new Map<string, ISubject>();
  private options: TSocketOptions = {};

  getSocketUrl(): string {
    return this.socketUrl || DEFAULT_SOCKET_URL;
  }
  setSocketUrl = (url: string): void => {
    this.socketUrl = url;
  };

  setNamespace = (namespace: string): void => {
    this.namespace = namespace;
  };
  getNamespace(): string {
    return this.namespace || DEFAULT_NAMESPACE;
  }

  setOption = (option: TSocketOptions): void => {
    this.options = option;
  };

  get socketServer(): string {
    return `${this.getSocketUrl()}/${this.getNamespace()}`;
  }

  connect = () => {
    this.release();
    console.log({ sercer: this.socketServer });

    this.socket = io(this.socketServer, {
      ...this.options,
    });
  };

  registerListener = (name: EventNames, listener: TListenerFunc): void => {
    if (!name || !listener || typeof listener !== 'function') return;
    if (!this.socket) console.debug(`Still not join any rooms yet`);

    const subject = this.subjects.get(name) || this.createSubject(name);
    subject.add(listener);
  };
  unregisterListener = (name: EventNames, listener: TListenerFunc): void => {
    const subject = this.subjects.get(name);
    if (!subject || !this.socket) return;

    subject.remove(listener);
    if (subject.count() === 0) this.removeSubject(name, subject);
  };

  joinRoom = (name: string): boolean => {
    if (!this.socket) return false;
    this.socket.emit(EventNames.JoinRoom, { name });
    return true;
  };
  leaveRoom = (name: string): boolean => {
    if (!this.socket) return false;
    this.socket.emit(EventNames.LeaveRoom, { name });
    return true;
  };

  leave = () => {
    this.release();
  };

  private createSubject(name: string): ISubject {
    const subject = new Subject();
    this.socket?.on(name, subject.notifyAll);
    this.subjects.set(name, subject);
    return subject;
  }
  private removeSubject(name: string, subject: ISubject): void {
    this.socket?.off(name, subject.notifyAll);
    this.subjects.delete(name);
  }
  private release = (): void => {
    this.subjects.clear();
    if (!this.socket) return;

    this.socket.disconnect();
    this.socket.close();
    this.socket = null;
  };
}
