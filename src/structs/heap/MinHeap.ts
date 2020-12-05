import BinaryHeap, { IBinaryHeapNode } from "./BinaryHeap";

class MinHeap<HeapNode extends IBinaryHeapNode> extends BinaryHeap<HeapNode> {
  constructor() {
    super(false);
  }
}

export default MinHeap;
