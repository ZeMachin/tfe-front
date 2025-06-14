// credit: https://www.weiguanghe.com/post/2023-07-08-how-to-wait-for-emit-to-finish-in-angular

import { EventEmitter } from '@angular/core';

export class ThenableEventEmitter<T> extends EventEmitter {
  constructor(isAsync?: boolean) {
    super(isAsync);
  }

  override emit(value?: T) {
    let next: (value: unknown) => void = () => {};
    const promise = new Promise((resolve) => {
      next = resolve;
    });

    console.log('emit()')
    super.emit({ value, next });

    return promise;
  }
}