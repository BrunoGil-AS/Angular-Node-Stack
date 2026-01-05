import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count = signal(0);
  timeOut = signal(3000);

  constructor() {
    // effect to automatically decrement until 0

    effect(() => {
      if (this.count() > 0) {
        if (this.message() !== 'No') {
          console.log('Counter is at a multiple of 10, slowing down decrement.');
          this.timeOut.set(10000);
        }
        setTimeout(() => {
          this.count.update((c) => c - 1);
        }, this.timeOut());
      } else {
        console.log('Counter reached zero.');
        if (this.count() < 0) {
          setTimeout(() => {
            this.count.update((c) => c + 1);
          }, this.timeOut());
        }
      }
    });
  }

  decrement() {
    this.count.update((c) => c - 1);
  }
  increment() {
    this.count.update((c) => c + 1);
  }

  tenMultiply = computed(() => {
    if (this.count() % 10 === 0 && this.count() >= 0) {
      console.log('Counter multiplied by 10:', this.count());
      return this.count() / 10;
    }
    if (this.count() % 10 === 0 && this.count() < 0) {
      console.log('Counter multiplied by 10:', this.count());
      return this.count() / 10;
    }
    console.log('Current count:', this.count());
    return 0;
  });

  message() {
    let val = this.tenMultiply();
    if (val !== 0) {
      return `The count is a multiple of 10 by ${val} times`;
    } else {
      return 'No';
    }
  }
}
