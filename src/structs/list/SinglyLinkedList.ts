import LinkedListNode from "../../nodes/LinkedListNode";
import { ILinkedListNode, ISinglyLinkedList, ITailedLinkedList } from "../../types/lists";

class SinglyLinkedList<T, TNode extends ILinkedListNode<T>> implements ISinglyLinkedList<T, TNode> {
  head: TNode;

  constructor() {
    let head: TNode = null;

    Object.defineProperties(this, {
      head: {
        get() { return head },

        set(node: TNode) {
          if (node === null || node instanceof LinkedListNode) {
            head = node;
          }
        }
      }
    });
  }

  insertAfter(node: TNode, newNode: TNode) {
    newNode.next = node.next;
    node.next = newNode;
  }

  insertBeginning(newNode: TNode) {
    newNode.next = this.head;
    this.head = newNode;
  }

  removeAfter(node: TNode) {
    const removedNode = node.next;

    if (removedNode instanceof LinkedListNode) {
      node.next = removedNode.next;
      removedNode.next = null;
      return removedNode as TNode;
    }
  }

  removeBeginning() {
    const removedNode = this.head;

    if (removedNode instanceof LinkedListNode) {
      this.head = this.head.next as TNode;
      removedNode.next = null;
      return removedNode as TNode;
    }
  }

  *traverseForward(node: TNode) {
    do {
      if (node instanceof LinkedListNode) {
        yield node;
        node = node.next as TNode;
      } else break;
    } while (true);
  }

  traverseFromBeginning() {
    return this.traverseForward(this.head);
  }
}

export class TailedSinglyLinkedList<T, TNode extends ILinkedListNode<T>> extends SinglyLinkedList<T, TNode> implements ITailedLinkedList<T, TNode> {
  tail: TNode;

  constructor() {
    super();
    let tail: TNode = null;

    Object.defineProperties(this, {
      tail: {
        get() { return tail },

        set(node: TNode) {
          if (node === null || node instanceof LinkedListNode) {
            tail = node;
          }
        }
      }
    });
  }

  insertAfter(node: TNode, newNode: TNode) {
    super.insertAfter(node, newNode);

    if (this.tail === node) {
      this.tail = newNode;
    }
  }

  insertBeginning(newNode: TNode) {
    super.insertBeginning(newNode);

    if (this.tail === null) {
      this.tail = newNode;
    }
  }

  insertEnd(newNode: TNode) {
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    newNode.next = null;
  }

  removeAfter(node: TNode) {
    if (node.next instanceof LinkedListNode) {
      if (this.tail === node.next) {
        this.tail = node;
      }

      return super.removeAfter(node);
    }
  }

  removeBeginning() {
    if (this.head instanceof LinkedListNode) {
      if (this.tail === this.head) {
        this.tail = null;
      }

      return super.removeBeginning();
    }
  }
}

export default SinglyLinkedList;
