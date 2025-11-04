const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #head = null;

  root() {
    return this.#head;
  }

  add(data) {
    const node = new Node(data);

    if (!this.#head) {
      this.#head = node;
      return;
    }

    let current = this.#head;

    while (current) {
      if (data === current.data) {
        return;
      }

      const direction = data > current.data ? 'right' : 'left';

      if (!current[direction]) {
        current[direction] = node;
        return;
      }

      current = current[direction];
    }
  }

  find(data) {
    let node = this.#head;

    while (node) {
      if (data === node.data) return node;
      node = data > node.data ? node.right : node.left;
    }

    return null;
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    let parent = null;
    let node = this.#head;

    while (data !== node.data) {
      if (!node) return;
      parent = node;
      node = data > node.data ? node.right : node.left;
    }

    const replaceChild = (newChild) => {
      if (!parent) {
        this.#head = null;
      } else if (parent.left === node) {
        parent.left = newChild;
      } else {
        parent.right = newChild;
      }
    };

    if (!node.left && !node.right) {
      replaceChild(null);
    } else if (!node.left || !node.right) {
      replaceChild(node.left || node.right);
    } else {
      let successorParent = node;
      let successor = node.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      node.data = successor.data;

      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }
  }

  min() {
    let node = this.#head;

    if (!node) return null;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.#head;

    if (!node) return null;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
