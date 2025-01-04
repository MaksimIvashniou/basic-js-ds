const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(data) {
    this.head = addRecursive(this.head);

    function addRecursive(node) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (node.data > data) {
        node.left = addRecursive(node.left);
      } else {
        node.right = addRecursive(node.right);
      }
      return node;
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return findRecursive(this.head);

    function findRecursive(node) {
      if (!node) return null;
      if (node.data === data) return node;
      return node.data > data
        ? findRecursive(node.left)
        : findRecursive(node.right);
    }
  }

  remove(data) {
    const getMinRecursive = (node) => {
      if (!node) return null;
      return node.left ? getMinRecursive(node.left) : node.data;
    };

    this.head = removeRecursive(this.head, data);

    function removeRecursive(node, data) {
      if (!node) return null;

      if (node.data > data) {
        node.left = removeRecursive(node.left, data);
      } else if (node.data < data) {
        node.right = removeRecursive(node.right, data);
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        const min = getMinRecursive(node.right);
        node.data = min;
        node.right = removeRecursive(node.right, min);
      }

      return node;
    }
  }

  min() {
    return getMinRecursive(this.head);

    function getMinRecursive(node) {
      if (!node) return null;
      return node.left ? getMinRecursive(node.left) : node.data;
    }
  }

  max() {
    return getMaxRecursive(this.head);

    function getMaxRecursive(node) {
      if (!node) return null;
      return node.right ? getMaxRecursive(node.right) : node.data;
    }
  }
}

module.exports = {
  BinarySearchTree
};