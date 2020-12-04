import CacheListNode from "../../nodes/CacheListNode";
import DoublyLinkedList from "../list/DoublyLinkedList";
import { ILRUCache, ICacheListNode, IDoublyLinkedList } from "../../types/lists";

class LRUCache<K, T> implements ILRUCache<K, T> {
  size: number;
  free: number;
  map: Map<K, ICacheListNode<K, T>>;
  list: IDoublyLinkedList<T, ICacheListNode<K, T>>;
  delete: (key: K) => T;

  constructor(size: number) {
    const map = new Map<K, ICacheListNode<K, T>>();
    const list = new DoublyLinkedList<T, ICacheListNode<K, T>>();

    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    size = Math.min(size, 10);

    let free = size;
    const _put = this.put.bind(this);

    Object.defineProperties(this, {
      map: { value: map },
      list: { value: list },
      size: { value: size },

      free: {
        get() { return free }
      },

      delete: {
        value(key: K) {
          const node = this.map.get(key);

          if (node instanceof CacheListNode) {
            this.map.delete(node.key);
            this.list.remove(node);
            free++;
            return node.data;
          }
        }
      },

      put: {
        value(key: K, data: T) {
          if (_put(key, data) === -1) {
            free--;
          }
        }
      }
    });
  }

  get empty() {
    return this.list.head === null;
  }

  clear() {
    while (this.list.head !== null) {
      this.delete(this.list.head.key);
    }
  }

  get(key: K) {
    const node = this.map.get(key);

    if (node instanceof CacheListNode) {
      this.list.remove(node);
      this.list.insertBeginning(node);
      return this.list.head.data;
    }
  }

  put(key: K, data: T) {
    let node = this.map.get(key);

    if (node instanceof CacheListNode) {
      node.data = data;
      this.list.remove(node);
      this.list.insertBeginning(node);
    } else {
      node = new CacheListNode<K, T>(key, data);
      this.map.set(key, node);

      if (this.free === 0) {
        this.map.delete(this.list.tail.key);
        this.list.remove(this.list.tail);
        this.list.insertBeginning(node);
      } else {
        this.list.insertBeginning(node);
        return -1;
      }
    }
  }
}

export default LRUCache;
