import CacheListNode from "../../nodes/CacheListNode";
import DoublyLinkedList from "../list/DoublyLinkedList";
import DoublyLinkedListNode from "../../nodes/DoublyLinkedListNode";
import { ICache, ICacheListNode, IDoublyLinkedList, IDoublyLinkedListNode } from "../../types/lists";

interface IFrequencyNode {
  frequency: number;
}

interface ICacheFrequencyListNode<K, T> extends ICacheListNode<K, T>, IFrequencyNode {}

interface ICacheFrequenciesList<K, T> extends IDoublyLinkedList<T, ICacheFrequencyListNode<K, T>> {}

interface ICacheFrequenciesListNode<K, T> extends IDoublyLinkedListNode<ICacheFrequenciesList<K, T>>, IFrequencyNode {}

class LFUCache<K, T> implements ICache<K, T> {
  size: number;
  free: number;
  empty: boolean;
  get: (key: K) => T;
  put: (key: K, data: T) => void;

  constructor(size?: number) {
    if (!(Number.isInteger(size) && size > 0)) {
      size = Infinity;
    }

    // size = Math.min(size, 10);

    let free = size;
    const cacheMap = new Map<K, ICacheFrequencyListNode<K, T>>();
    const frequenciesMap = new Map<number, ICacheFrequenciesListNode<K, T>>();
    const frequenciesList = new DoublyLinkedList() as IDoublyLinkedList<ICacheFrequenciesList<K, T>, ICacheFrequenciesListNode<K, T>>;

    function _removeFrequencyListIfNecessary(frequency: ICacheFrequenciesListNode<K, T>) {
      if (frequency.data.head === null) {
        frequenciesMap.delete(frequency.frequency);
        frequenciesList.remove(frequency);
      }
    }

    function _createFrequencyList(frequency: number) {
      const _frequency = new DoublyLinkedListNode(
        new DoublyLinkedList() as IDoublyLinkedList<T, ICacheFrequencyListNode<K, T>>
      ) as ICacheFrequenciesListNode<K, T>;

      frequenciesMap.set(_frequency.frequency = frequency, _frequency);

      return _frequency;
    }

    function _insertFreshNode(node: ICacheFrequencyListNode<K, T>) {
      let frequency = frequenciesMap.get(node.frequency = 1);

      if (!frequency) {
        frequency = _createFrequencyList(1);
        frequenciesList.insertBeginning(frequency);
      }

      frequency.data.insertBeginning(node);
    }

    function _updateNodeFrequencyList(node: ICacheFrequencyListNode<K, T>) {
      const freq = node.frequency;
      let frequency = frequenciesMap.get(freq);

      if (frequency) {
        let nextFrequency = frequenciesMap.get(++node.frequency);

        if (!nextFrequency) {
          nextFrequency = _createFrequencyList(node.frequency);
          frequenciesList.insertAfter(frequency, nextFrequency);
        }

        frequency.data.remove(node);
        nextFrequency.data.insertBeginning(node);
        _removeFrequencyListIfNecessary(frequency);
      } else {
        _insertFreshNode(node);
      }
    }

    function _removeLeastFrequentNode() {
      const leastFrequency = frequenciesList.head;

      if (leastFrequency) {
        cacheMap.delete(leastFrequency.data.tail.key);
        leastFrequency.data.remove(leastFrequency.data.tail);
        _removeFrequencyListIfNecessary(leastFrequency);
      }
    }

    Object.defineProperties(this, {
      size: { value: size },

      free: {
        get() { return free }
      },

      empty: {
        get() { return frequenciesList.head === null }
      },

      get: {
        value(key: K) {
          const node = cacheMap.get(key);

          if (node instanceof CacheListNode) {
            _updateNodeFrequencyList(node);
            return node.data;
          }
        }
      },

      put: {
        value(key: K, data: T) {
          let node = cacheMap.get(key);

          if (node instanceof CacheListNode) {
            node.data = data;
            _updateNodeFrequencyList(node);
          } else {
            node = new CacheListNode<K, T>(key, data) as ICacheFrequencyListNode<K, T>;
            cacheMap.set(key, node);

            if (free === 0) {
              _removeLeastFrequentNode();
              _updateNodeFrequencyList(node);
            } else {
              _updateNodeFrequencyList(node);
              free--;
            }
          }
        }
      }
    });
  }
}

export default LFUCache;
