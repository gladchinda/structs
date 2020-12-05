import LinkedListNode from "../../nodes/LinkedListNode";
import SinglyLinkedList from "../list/SinglyLinkedList";
import { IStack, ILinkedListNode } from "../../types/lists";

class Stack<T> implements IStack<T> {
  size: number;
  free: number;
  empty: boolean;
  peek: () => ILinkedListNode<T>;
  pop: () => ILinkedListNode<T>;
  push: (data: T) => IStack<T>;

  constructor(size: number) {
    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    let free = size;
    const list = new SinglyLinkedList<T, ILinkedListNode<T>>();

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

      pop: {
        value() {
          const removed = this.empty ? null : list.removeBeginning();
          if (removed) free++;
          return removed;
        }
      },

      push: {
        value(data: T) {
          if (free === 0) {
            throw new Error('Maximum stack size exceeded.');
          }

          list.insertBeginning(new LinkedListNode<T, ILinkedListNode<T>>(data));
          free--;
          return this;
        }
      }
    });
  }
}

export default Stack;
