import type Observer from "./Observer.js";

export default interface Subject<t> {
  subscribe(observer: Observer<t>): void;
  unsubscribe(observer: Observer<t>): void;
  notify(): void;
}
