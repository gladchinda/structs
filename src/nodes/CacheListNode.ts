import { ICacheListNode } from "../types/lists";
import DoublyLinkedListNode from "./DoublyLinkedListNode";

class CacheListNode<K, T> extends DoublyLinkedListNode<T, ICacheListNode<K, T>> implements ICacheListNode<K, T> {
  key: K;

  constructor(key: K, data: T) {
    super(data);

    Object.defineProperties(this, {
      key: { value: key }
    });
  }
}

export default CacheListNode;
