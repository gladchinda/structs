import LinkedListNode from "../../nodes/LinkedListNode";
import SinglyLinkedList from "../list/SinglyLinkedList";
import { IStack, ILinkedListNode } from "../../types/lists";

class Stack<T> implements IStack<T> {
  size: number;
  free: number;
  list: SinglyLinkedList<T, ILinkedListNode<T>>;

  constructor(size: number) {
    const list = new SinglyLinkedList<T, ILinkedListNode<T>>();

    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    let free = size;
    const _pop = this.pop.bind(this);
    const _push = this.push.bind(this);

    Object.defineProperties(this, {
      list: { value: list },
      size: { value: size },

      free: {
        get() { return free }
      },

      pop: {
        value() {
          const removed = _pop();
          if (removed) free++;
          return removed;
        }
      },

      push: {
        value(data: T) {
          if (free === 0) {
            throw new Error('Maximum stack size exceeded.');
          }

          _push(data);
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

  pop() {
    return this.empty ? null : this.list.removeBeginning();
  }

  push(data: T) {
    this.list.insertBeginning(new LinkedListNode<T, ILinkedListNode<T>>(data));
    return this;
  }
}

export default Stack;
