const { NotImplementedError } = require('../lib/errors');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
  const solutions = {
    removeKFromListAvoidOriginMutation,
    removeKFromListAvoidOriginMutationRecursive,
    removeKFromListMutateOrigin,
    removeKFromListMutateOriginRecursive,
  };

  return solutions.removeKFromListAvoidOriginMutation(l, k);
}

function removeKFromListMutateOrigin(l, k) {
  while (l.value === k && l) {
    l = l.next;
  }

  let current = l;

  while (current && current.next) {
    if (current.next.value === k) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return l;
}

function removeKFromListMutateOriginRecursive(l, k) {
  if (!l) return null;

  l.next = removeKFromListMutateOriginRecursive(l.next, k);

  if (l.value === k) {
    if (!l.next) return null;

    l.value = l.next.value;
    l.next = l.next.next;
  }

  return l;
}

function removeKFromListAvoidOriginMutationRecursive(l, k) {
  if (!l) return null;
  let { value, next } = l;
  next = removeKFromList(next, k);
  return value === k ? next : { value, next };
}

function removeKFromListAvoidOriginMutation(l, k) {
  let head = null;
  let tail = null;

  let current = l;

  while (current) {
    const { value, next } = current;

    if (value !== k) {
      const node = { ...new ListNode(value) };

      if (!head) head = node;
      else tail.next = node;

      tail = node;
    }

    current = next;
  }

  return head;
}

module.exports = {
  removeKFromList,
};
