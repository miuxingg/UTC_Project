import { ISubject, TListenerFunc } from "./types";

export class Subject implements ISubject {
  private listeners: TListenerFunc[] = [];

  add = (listener: TListenerFunc): void => {
    this.listeners.push(listener);
  };

  remove = (listener: TListenerFunc): void => {
    this.listeners = this.listeners.filter(
      (_listener) => _listener !== listener
    );
  };

  count = (): number => this.listeners.length;

  notifyAll = (data?: any): void => {
    this.listeners.forEach((listener) => listener(data));
  };
}
