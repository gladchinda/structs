import BinaryHeap, { IBinaryHeapNode } from "./BinaryHeap";

class MaxHeap<HeapNode extends IBinaryHeapNode> extends BinaryHeap<HeapNode> {
  constructor() {
    super(true);
  }
}

export default MaxHeap;
