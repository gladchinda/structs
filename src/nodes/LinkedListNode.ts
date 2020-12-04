import { ILinkedListNode } from "../types/lists";

class LinkedListNode<T, ListNode extends ILinkedListNode<T>> implements ILinkedListNode<T> {
  data: T;
  next: ListNode;

  constructor(data: T) {
    let next: ListNode = null;

    Object.defineProperties(this, {
      data: {
        get() { return data },

        set(newData: T) {
          if (data !== newData) {
            data = newData;
          }
        }
      },

      next: {
        get() { return next },

        set(node: ListNode) {
          if (node === null || node instanceof this.constructor) {
            next = node;
          }
        }
      }
    });
  }
}

export default LinkedListNode;
