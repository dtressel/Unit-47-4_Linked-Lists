/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length < 2) {
      return this.RemoveLastNode();
    }
    const popped = this.tail;
    let currentNode = this.head;
    while (currentNode.next.next) {
      currentNode = currentNode.next;
    }
    this.tail = currentNode;
    this.length--;
    return popped.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length < 2) {
      return this.RemoveLastNode();
    }
    const removed = this.head;
    this.head = this.head.next;
    this.length--;
    return removed.val;
  }

  /** Removes final Node and handles empty list for pop, shift and removeAt */
  
  RemoveLastNode() {
    if (this.length <= 0) {
      throw new Error("can't use on an empty list");
    }
    const lastNode = this.head;
    this.head = null;
    this.tail = null;
    this.length--;
    return lastNode.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length) {
      throw new Error("invalid index");
    }
    let currentNode = this.head;
    for (let i = idx; i > 0; i--) {
      currentNode = currentNode.next;
    }
    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length) {
      throw new Error("invalid index");
    }
    let currentNode = this.head;
    for (let i = idx; i > 0; i--) {
      currentNode = currentNode.next;
    }
    currentNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) {
      this.unshift(val);
      return;
    }
    if (idx >= this.length) {
      if (idx === this.length) {
        this.push(val);
        return;
      }
      if (idx > this.length) {
        throw new Error("invalid index");
      }
    }
    const newNode = new Node(val);
    let nodeBeforeAdd = this.head;
    for (let i = idx - 1; i > 0; i--) {
      nodeBeforeAdd = nodeBeforeAdd.next;
    }
    newNode.next = nodeBeforeAdd.next;
    nodeBeforeAdd.next = newNode;
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx === 0) {
      return this.shift();
    } 
    if (idx >= this.length - 1) {
      if (idx === this.length - 1) {
        return this.pop();
      }
      if (idx > this.length - 1) {
        throw new Error("invalid index");
      }
    }
    let nodeBeforeRemoved = this.head;
    for (let i = idx - 1; i > 0; i--) {
      nodeBeforeRemoved = nodeBeforeRemoved.next;
    }
    const removedNode = nodeBeforeRemoved.next;
    nodeBeforeRemoved.next = nodeBeforeRemoved.next.next;
    return removedNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let currentNode = this.head;
    let sum = 0;
    let length = 0;
    while (currentNode) {
      if (isNaN(currentNode.val)) {
        throw new Error("cannot average NaN");
      }
      sum += currentNode.val;
      length++;
      currentNode = currentNode.next;
    }
    if (length === 0) {
      return 0;
    }
    return sum / length;
  }
}

module.exports = LinkedList;
