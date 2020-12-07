export interface ILinkedListNode<T> {
  data: T;
  next: ILinkedListNode<T>;
}

export interface IDoublyLinkedListNode<T> extends ILinkedListNode<T> {
  prev: IDoublyLinkedListNode<T>;
  next: IDoublyLinkedListNode<T>;
}

export interface ICacheListNode<K, T> extends IDoublyLinkedListNode<T> {
  readonly key: K;
  prev: ICacheListNode<K, T>;
  next: ICacheListNode<K, T>;
}

export interface ILinkedList<T, ListNode extends ILinkedListNode<T>> {
  head: ListNode;
  insertAfter(node: ListNode, newNode: ListNode): void;
  insertBeginning(newNode: ListNode): void;
}

export interface ITailedLinkedList<T, ListNode extends ILinkedListNode<T>> extends ILinkedList<T, ListNode> {
  tail: ListNode;
  insertEnd(newNode: ListNode): void;
}

export interface ISinglyLinkedList<T, ListNode extends ILinkedListNode<T>> extends ILinkedList<T, ListNode> {
  removeAfter(node: ListNode): ListNode;
  removeBeginning(): ListNode;
  traverseForward(node: ListNode): Generator<ListNode, void, unknown>;
  traverseFromBeginning(): Generator<ListNode, void, unknown>;
}

export interface IDoublyLinkedList<T, ListNode extends IDoublyLinkedListNode<T>> extends ITailedLinkedList<T, ListNode> {
  insertBefore(node: ListNode, newNode: ListNode): void;
  remove(node: ListNode): ListNode;
  traverseBackward(node: ListNode): Generator<ListNode, void, unknown>;
  traverseFromEnd(): Generator<ListNode, void, unknown>;
}

interface IFixedSizeList {
  readonly size: number;
  readonly free: number;
  readonly empty: boolean;
}

interface IPeekableList<T> {
  peek(): T;
}

export interface IStack<T> extends IFixedSizeList, IPeekableList<T> {
  pop(): T;
  push(data: T): IStack<T>;
}

export interface IQueue<T> extends IFixedSizeList, IPeekableList<T> {
  dequeue(): T;
  enqueue(data: T): IQueue<T>;
}

export interface ICache<K, T> extends IFixedSizeList {
  get(key: K): T;
  put(key: K, data: T): void;
}

export interface ILRUCache<K, T> extends ICache<K, T> {
  clear(): void;
  delete(key: K): T;
}
