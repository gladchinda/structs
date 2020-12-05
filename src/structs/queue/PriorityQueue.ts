import BinaryHeap, { IBinaryHeapNode } from "../heap/BinaryHeap";

class PriorityQueue {
  size: number;
  free: number;
  empty: boolean;
  peek: () => IBinaryHeapNode;
  dequeue: () => IBinaryHeapNode;
  enqueue: (node: IBinaryHeapNode) => void;

  constructor(priorityFn?: Function, size?: number)
  constructor(size?: number, priorityFn?: Function)
  constructor(...args) {
    let [ size, priorityFn ] = args;

    if (arguments.length >= 1 && typeof size === 'function') {
      [size, priorityFn] = [priorityFn, size];
    }

    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    let free = size;
    const heap = new BinaryHeap<IBinaryHeapNode>(typeof priorityFn === 'function' ? priorityFn : true);

    Object.defineProperties(this, {
      size: { value: size },
      peek: { value: heap.peek.bind(heap) },

      free: {
        get() { return free }
      },

      empty: {
        get() { return this.peek() === null }
      },

      dequeue: {
        value() {
          const removed = heap.remove();
          if (removed) free++;
          return removed;
        }
      },

      enqueue: {
        value(node: IBinaryHeapNode) {
          if (free === 0) {
            throw new Error('Maximum queue size exceeded.');
          }

          heap.insert(node);
          free--;
          return this;
        }
      }
    });
  }
}

export default PriorityQueue;
