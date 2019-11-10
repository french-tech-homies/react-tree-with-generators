import { TreeNode, IsEqual } from './types';

export class TreeWithGenerators<T> {
  root: TreeNode<T>;
  traversalIndex = 0;
  constructor(employee: T, public isEqual: IsEqual<T>) {
    this.root = {
      data: employee,
      children: []
    };
  }

  *traverseBFS() {
    this.traversalIndex = 0;
    const queue: TreeNode<T>[] = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        yield node;
        node.data.index = this.traversalIndex;
        this.traversalIndex++;
        if (node.children.length > 0) {
          queue.push(...node.children);
        }
      }
    }
  }

  *traverseDFS() {
    this.traversalIndex = 0;
    const stack: TreeNode<T>[] = [];
    stack.push(this.root);
    while (stack.length > 0) {
      const node = stack.pop();
      if (node) {
        node.data.index = this.traversalIndex;
        yield node;
        this.traversalIndex++;
        if (node.children) {
          for (let i = node.children.length - 1; i >= 0; i--) {
            const child = node.children[i];
            stack.push(child);
          }
        }
      }
    }
  }

  add(employee: T, toEmployee: T) {
    const child: TreeNode<T> = {
      data: employee,
      children: []
    };
    const iterator = this.traverseBFS();
    let current = iterator.next();
    let found = false;
    let parent: TreeNode<T> | undefined;

    while (!found && !current.done) {
      if (current.value) {
        if (this.isEqual(current.value.data, toEmployee)) {
          parent = current.value;
          found = true;
        }
      }
      current = iterator.next();
    }
    if (parent) {
      child.parent = parent;
      parent.children.push(child);
    } else {
      throw new Error('Unable to add node to non existing parent');
    }
  }

  remove(employee: T, fromEmployee: T) {
    const child = [...this.traverseBFS()].find(
      ({ data, parent }) => parent && this.isEqual(parent.data, fromEmployee) && this.isEqual(data, employee)
    );

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

  cleanIndexes() {
    const iterator = this.traverseBFS();
    let current = iterator.next();
    while (!current.done) {
      current.value.data.index = undefined;
      current = iterator.next();
    }
  }
}
