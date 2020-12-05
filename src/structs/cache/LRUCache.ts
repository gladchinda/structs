import CacheListNode from "../../nodes/CacheListNode";
import DoublyLinkedList from "../list/DoublyLinkedList";
import { ILRUCache, ICacheListNode } from "../../types/lists";

class LRUCache<K, T> implements ILRUCache<K, T> {
  size: number;
  free: number;
  empty: boolean;
  clear: () => void;
  delete: (key: K) => T;
  get: (key: K) => T;
  put: (key: K, data: T) => void;

  constructor(size: number) {
    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    size = Math.min(size, 10);

    let free = size;
    const map = new Map<K, ICacheListNode<K, T>>();
    const list = new DoublyLinkedList<T, ICacheListNode<K, T>>();

    Object.defineProperties(this, {
      size: { value: size },

      free: {
        get() { return free }
      },

      empty: {
        get() { return list.head === null }
      },

      clear: {
        value() {
          while (list.head !== null) {
            this.delete(list.head.key);
          }
        }
      },

      delete: {
        value(key: K) {
          const node = map.get(key);

          if (node instanceof CacheListNode) {
            map.delete(node.key);
            list.remove(node);
            free++;
            return node.data;
          }
        }
      },

      get: {
        value(key: K) {
          const node = map.get(key);

          if (node instanceof CacheListNode) {
            list.remove(node);
            list.insertBeginning(node);
            return list.head.data;
          }
        }
      },

      put: {
        value(key: K, data: T) {
          let node = map.get(key);

          if (node instanceof CacheListNode) {
            node.data = data;
            list.remove(node);
            list.insertBeginning(node);
          } else {
            node = new CacheListNode<K, T>(key, data);
            map.set(key, node);

            if (free === 0) {
              map.delete(list.tail.key);
              list.remove(list.tail);
              list.insertBeginning(node);
            } else {
              list.insertBeginning(node);
              free--;
            }
          }
        }
      }
    });
  }
}

export default LRUCache;
