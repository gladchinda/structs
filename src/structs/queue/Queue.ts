import LinkedListNode from "../../nodes/LinkedListNode";
import { IQueue, ILinkedListNode } from "../../types/lists";
import { TailedSinglyLinkedList } from "../list/SinglyLinkedList";

class Queue<T> implements IQueue<T> {
  size: number;
  free: number;
  list: TailedSinglyLinkedList<T, ILinkedListNode<T>>;

  constructor(size: number) {
    const list = new TailedSinglyLinkedList<T, ILinkedListNode<T>>();

    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    let free = size;
    const _dequeue = this.dequeue.bind(this);
    const _enqueue = this.enqueue.bind(this);

    Object.defineProperties(this, {
      list: { value: list },
      size: { value: size },

      free: {
        get() { return free }
      },

      dequeue: {
        value() {
          const removed = _dequeue();
          if (removed) free++;
          return removed;
        }
      },

      enqueue: {
        value(data: T) {
          if (free === 0) {
            throw new Error('Maximum queue size exceeded.');
          }

          _enqueue(data);
          free--;
          return this;
        }
      }
    });
  }

  get empty() {
    return this.list.head === null;
  }

  peek() {
    return this.list.head;
  }

  dequeue() {
    return this.empty ? null : this.list.removeBeginning();
  }

  enqueue(data: T) {
    this.list.insertEnd(new LinkedListNode<T, ILinkedListNode<T>>(data));
    return this;
  }
}

export default Queue;
