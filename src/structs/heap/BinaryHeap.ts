export interface IBinaryHeapNode {
  rank: number;
}

function swap(arr: any[], idx1: number, idx2: number) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Argument(1) must be an array.');
  }

  if ([idx1, idx2].every(n => Number.isInteger(n) && n >= 0 && n < arr.length)) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  } else {
    throw new TypeError('Non-swappable array indexes.');
  }
}

function compareNodes(node1: IBinaryHeapNode, node2: IBinaryHeapNode, useMaximum: boolean = false) {
  return useMaximum === true
    ? node1.rank > node2.rank
    : node1.rank < node2.rank;
}

class BinaryHeap<HeapNode extends IBinaryHeapNode> {
  empty: boolean;
  peek: () => HeapNode;
  remove: () => HeapNode;
  insert: (node: HeapNode) => void;
  compare: (node1, node2) => boolean;

  constructor(compareFn?: Function)
  constructor(useMaximum?: boolean)
  constructor(compare?: Function | boolean) {
    const list: HeapNode[] = [];

    if (typeof compare === 'function') {
      compare = function _compareFn(node1, node2) {
        const compareResult = +((compare as Function)(node1, node2));
        return compareResult && compareResult > 0 || false;
      };
    } else {
      const useMaximum = compare === true;

      compare = function _compareFn(node1: HeapNode, node2: HeapNode) {
        return compareNodes(node1, node2, useMaximum);
      };
    }

    Object.defineProperties(this, {
      compare: { value: compare },

      empty: {
        get() { return list.length <= 0 }
      },

      peek: {
        value() { return this.empty ? null : list[0] }
      },

      insert: {
        value(node: HeapNode) {
          let i = list.length + 1;

          while (i > 1) {
            const parentIndex = Math.floor(i / 2);
            const parent = list[parentIndex - 1];

            if (this.compare(node, parent)) {
              list[i - 1] = parent;
              i = parentIndex;
            } else break;
          }

          list[i - 1] = node;
        }
      },

      remove: {
        value() {
          if (this.empty) return null;

          let i = list.length - 1;

          // Swap first and last nodes in the list
          swap(list, 0, i);

          const removedNode = list.pop();

          while (i > 1) {
            const parentIndex = Math.floor(i / 2);

            // Set i to be index of left child
            i = 2 * parentIndex;

            // If right child, and right child is greater than left child,
            // Set i to be index of right child
            if (list[i] && this.compare(list[i], list[i - 1])) {
              i = i + 1;
            }

            // If child node is greater than parent node,
            // Swap child and parent nodes in the list
            if (this.compare(list[i - 1], list[parentIndex - 1])) {
              swap(list, i - 1, parentIndex - 1);
            }

            i = parentIndex;
          }

          return removedNode;
        }
      }
    });
  }
}

export default BinaryHeap;
