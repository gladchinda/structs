import { IBinaryHeapNode } from "../heap/BinaryHeap";
import BinaryTree, { IBinaryTreeNode, BinaryTreeNode } from "./BinaryTree";

class BinarySearchTree<T, TreeNode extends IBinaryTreeNode<T> & IBinaryHeapNode> extends BinaryTree<T, TreeNode> {
  insert(node: TreeNode) {
    if (this.root instanceof BinaryTreeNode) {
      let root = this.root as TreeNode;

      while (true) {
        if (root.rank > node.rank) {
          if (root.left instanceof BinaryTreeNode) {
            root = root.left as TreeNode;
          } else {
            root.left = node;
            break;
          }
        }
        
        else {
          if (root.right instanceof BinaryTreeNode) {
            root = root.right as TreeNode;
          } else {
            root.right = node;
            break;
          }
        }
      }
    } else {
      this.root = node;
    }
  }
}

export default BinarySearchTree;
