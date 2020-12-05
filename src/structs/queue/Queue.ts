import LinkedListNode from "../../nodes/LinkedListNode";
import { IQueue, ILinkedListNode } from "../../types/lists";
import { TailedSinglyLinkedList } from "../list/SinglyLinkedList";

class Queue<T> implements IQueue<T> {
  size: number;
  free: number;
  empty: boolean;
  peek: () => ILinkedListNode<T>;
  dequeue: () => ILinkedListNode<T>;
  enqueue: (data: T) => IQueue<T>;

  constructor(size: number) {
    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    let free = size;
    const list = new TailedSinglyLinkedList<T, ILinkedListNode<T>>();

    Object.defineProperties(this, {
      size: { value: size },

      free: {
        get() { return free }
      },

      empty: {
        get() { return list.head === null }
      },

      peek: {
        value() { return list.head }
      },

      dequeue: {
        value() {
          const removed = this.empty ? null : list.removeBeginning();
          if (removed) free++;
          return removed;
        }
      },

      enqueue: {
        value(data: T) {
          if (free === 0) {
            throw new Error('Maximum queue size exceeded.');
          }

          list.insertEnd(new LinkedListNode<T, ILinkedListNode<T>>(data));
          free--;
          return this;
        }
      }
    });
  }
}

export default Queue;
