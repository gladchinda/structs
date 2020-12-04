import DoublyLinkedListNode from "../../nodes/DoublyLinkedListNode";
import { IDoublyLinkedListNode, IDoublyLinkedList } from "../../types/lists";

class DoublyLinkedList<T, TNode extends IDoublyLinkedListNode<T>> implements IDoublyLinkedList<T, TNode> {
  head: TNode;
  tail: TNode;

  constructor() {
    let head: TNode = null;
    let tail: TNode = null;

    Object.defineProperties(this, {
      head: {
        get() { return head },

        set(node: TNode) {
          if (node === null || node instanceof DoublyLinkedListNode) {
            head = node;
          }
        }
      },

      tail: {
        get() { return tail },

        set(node: TNode) {
          if (node === null || node instanceof DoublyLinkedListNode) {
            tail = node;
          }
        }
      }
    });
  }

  insertAfter(node: TNode, newNode: TNode) {
    newNode.prev = node;

    if (node.next instanceof DoublyLinkedListNode) {
      newNode.next = node.next;
      node.next.prev = newNode;
    } else {
      newNode.next = null;
      this.tail = newNode;
    }

    node.next = newNode;
  }

  insertBefore(node: TNode, newNode: TNode) {
    newNode.next = node;

    if (node.prev instanceof DoublyLinkedListNode) {
      newNode.prev = node.prev;
      node.prev.next = newNode;
    } else {
      newNode.prev = null;
      this.head = newNode;
    }

    node.prev = newNode;
  }

  insertBeginning(newNode: TNode) {
    if (this.head === null) {
      this.head = this.tail = newNode;
      newNode.prev = null;
      newNode.next = null;
    } else {
      this.insertBefore(this.head, newNode);
    }
  }

  insertEnd(newNode: TNode) {
    if (this.tail === null) {
      this.insertBeginning(newNode);
    } else {
      this.insertAfter(this.tail, newNode);
    }
  }

  remove(node: TNode) {
    if (node.prev === null) {
      this.head = node.next as TNode;
    } else {
      node.prev.next = node.next;
    }

    if (node.next === null) {
      this.tail = node.prev as TNode;
    } else {
      node.next.prev = node.prev;
    }

    node.prev = null;
    node.next = null;

    return node;
  }

  *traverseBackward(node: TNode) {
    do {
      if (node instanceof DoublyLinkedListNode) {
        yield node;
        node = node.prev as TNode;
      } else break;
    } while (true);
  }

  *traverseForward(node: TNode) {
    do {
      if (node instanceof DoublyLinkedListNode) {
        yield node;
        node = node.next as TNode;
      } else break;
    } while (true);
  }

  traverseFromBeginning() {
    return this.traverseForward(this.head);
  }

  traverseFromEnd() {
    return this.traverseBackward(this.tail);
  }
}

export default DoublyLinkedList;
