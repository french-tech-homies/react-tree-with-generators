import { TreeNode, IsEqual } from './types';

export class Tree<T> {
  root: TreeNode<T>;
  traversalIndex = 0;
  constructor(employee: T, public isEqual: IsEqual<T>) {
    this.root = {
      data: employee,
      children: []
    };
  }

  traverseBFS(callback: (node: TreeNode<T>) => void) {
    const queue: TreeNode<T>[] = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        node.data.index = this.traversalIndex;
        callback(node);
        if (node.children.length > 0) {
          queue.push(...node.children);
        }
        this.traversalIndex++;
      }
    }
  }

  traverseDFS(callback: (node: TreeNode<T>) => void) {
    const stack: TreeNode<T>[] = [];
    stack.push(this.root);
    while (stack.length > 0) {
      const node = stack.pop();
      if (node) {
        callback(node);
        if (node.children) {
          stack.push(...node.children);
        }
      }
    }
  }

  add(employee: T, toEmployee: T) {
    const child: TreeNode<T> = {
      data: employee,
      children: []
    };
    let parent: TreeNode<T> | undefined;
    let count = 0;
    this.traverseBFS(node => {
      count++;
      const { data } = node;
      if (this.isEqual(data, toEmployee)) {
        parent = node;
      }
    });
    if (parent) {
      child.parent = parent;
      parent.children.push(child);
    } else {
      throw new Error('Unable to add node to non existing parent');
    }
  }

  remove(employee: T, fromEmployee: T) {
    let child: TreeNode<T> | undefined;
    this.traverseBFS(node => {
      const { data, parent } = node;
      if (parent && this.isEqual(parent.data, fromEmployee) && this.isEqual(data, employee)) {
        child = node;
      }
    });
    if (child) {
      if (child.parent) {
        const idx = child.parent.children.indexOf(child);
        child.parent.children.splice(idx, 1);
      } else {
        throw new Error('Unable to find parent');
      }
    } else {
      throw new Error('Unable to find node');
    }
  }
}
