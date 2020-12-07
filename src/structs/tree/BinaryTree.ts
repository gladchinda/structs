import Queue from "../queue/Queue";

export interface IBinaryTreeNode<T> {
  data: T;
  left?: IBinaryTreeNode<T>;
  right?: IBinaryTreeNode<T>;
}

export interface IBinaryTree<T, TreeNode extends IBinaryTreeNode<T>> {
  root: TreeNode;
  insert(node: TreeNode): void;
  traverseBreadthOrder(): Generator<TreeNode, void, unknown>;
  traverseInOrder(): Generator<TreeNode, void, unknown>;
  traversePreOrder(): Generator<TreeNode, void, unknown>;
  traversePostOrder(): Generator<TreeNode, void, unknown>;
}

function* _traverseBreadthOrder<T, TreeNode extends IBinaryTreeNode<T>>(root: TreeNode) {
  if (root instanceof BinaryTreeNode) {
    const queue = new Queue<TreeNode>();
    queue.enqueue(root);

    while (!queue.empty) {
      root = queue.dequeue();

      if (root.left instanceof BinaryTreeNode) {
        queue.enqueue(root.left as TreeNode);
      }

      if (root.right instanceof BinaryTreeNode) {
        queue.enqueue(root.right as TreeNode);
      }

      yield root;
    }
  }
}

function* _traverseInOrder<T, TreeNode extends IBinaryTreeNode<T>>(root: TreeNode) {
  if (root instanceof BinaryTreeNode) {
    yield* _traverseInOrder<T, TreeNode>(root.left as TreeNode);
    yield root;
    yield* _traverseInOrder<T, TreeNode>(root.right as TreeNode);
  }
}

function* _traversePreOrder<T, TreeNode extends IBinaryTreeNode<T>>(root: TreeNode) {
  if (root instanceof BinaryTreeNode) {
    yield root;
    yield* _traversePreOrder<T, TreeNode>(root.left as TreeNode);
    yield* _traversePreOrder<T, TreeNode>(root.right as TreeNode);
  }
}

function* _traversePostOrder<T, TreeNode extends IBinaryTreeNode<T>>(root: TreeNode) {
  if (root instanceof BinaryTreeNode) {
    yield* _traversePostOrder<T, TreeNode>(root.left as TreeNode);
    yield* _traversePostOrder<T, TreeNode>(root.right as TreeNode);
    yield root;
  }
}

export class BinaryTreeNode<T> implements IBinaryTreeNode<T> {
  data: T;
  left: IBinaryTreeNode<T>;
  right: IBinaryTreeNode<T>;

  constructor(data: T) {
    let left: IBinaryTreeNode<T> = null;
    let right: IBinaryTreeNode<T> = null;

    Object.defineProperties(this, {
      data: {
        get() { return data },

        set(newData: T) {
          if (data !== newData) {
            data = newData;
          }
        }
      },

      left: {
        get() { return left },

        set(node: IBinaryTreeNode<T>) {
          if (node === null || node instanceof BinaryTreeNode) {
            left = node;
          }
        }
      },

      right: {
        get() { return right },

        set(node: IBinaryTreeNode<T>) {
          if (node === null || node instanceof BinaryTreeNode) {
            right = node;
          }
        }
      }
    });
  }
}

class BinaryTree<T, TreeNode extends IBinaryTreeNode<T>> implements IBinaryTree<T, TreeNode> {
  root: TreeNode;

  constructor() {
    let root: TreeNode = null;

    Object.defineProperties(this, {
      root: {
        get() { return root },

        set(node: TreeNode) {
          if (node === null || node instanceof BinaryTreeNode) {
            root = node;
          }
        }
      }
    });
  }

  insert(node: TreeNode) {
    if (this.root instanceof BinaryTreeNode) {
      const queue = new Queue<TreeNode>();
      queue.enqueue(this.root);

      while (!queue.empty) {
        const root = queue.dequeue();

        if (root.left instanceof BinaryTreeNode) {
          queue.enqueue(root.left as TreeNode);
        } else {
          root.left = node;
          break;
        }

        if (root.right instanceof BinaryTreeNode) {
          queue.enqueue(root.right as TreeNode);
        } else {
          root.right = node;
          break;
        }
      }
    } else {
      this.root = node;
    }
  }

  traverseBreadthOrder() {
    return _traverseBreadthOrder<T, TreeNode>(this.root);
  }

  traverseInOrder() {
    return _traverseInOrder<T, TreeNode>(this.root);
  }

  traversePreOrder() {
    return _traversePreOrder<T, TreeNode>(this.root);
  }

  traversePostOrder() {
    return _traversePostOrder<T, TreeNode>(this.root);
  }
}

export default BinaryTree;
