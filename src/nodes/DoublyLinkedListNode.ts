import LinkedListNode from "./LinkedListNode";
import { IDoublyLinkedListNode } from "../types/lists";

class DoublyLinkedListNode<T, ListNode extends IDoublyLinkedListNode<T>> extends LinkedListNode<T, ListNode> implements IDoublyLinkedListNode<T> {
  prev: ListNode;

  constructor(data: T) {
    super(data);
    let prev: ListNode = null;

    Object.defineProperties(this, {
      prev: {
        get() { return prev },

        set(node: ListNode) {
          if (node === null || node instanceof this.constructor) {
            prev = node;
          }
        }
      }
    });
  }
}

export default DoublyLinkedListNode;
