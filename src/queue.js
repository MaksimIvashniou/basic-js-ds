const { NotImplementedError } = require('../lib/errors');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */

class SerializableListNode extends ListNode {
  toObject() {
    const tree = { value: this.value, next: null };

    let tail = tree;
    let { next: current } = this;

    while (current) {
      tail.next = { value: current.value, next: null };

      current = current.next;
      tail = tail.next;
    }

    return tree;
  }
}

class Queue {
  #head = null;
  #tail = null;

  getUnderlyingList() {
    return this.#head;
  }

  enqueue(value) {
    const node = { ...new ListNode(value) };

    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
      return;
    }

    this.#tail.next = node;
    this.#tail = this.#tail.next;
  }

  dequeue() {
    if (!this.#head) return;

    const { value } = this.#head;
    this.#head = this.#head.next;
    return value;
  }
}

module.exports = {
  Queue,
};
