export interface Employee {
  id: string;
  name: string;
  role: string;
}

interface TreeNodeData {
  index?: number;
}

export interface TreeNode<T> {
  data: T & TreeNodeData;
  parent?: TreeNode<T>;
  children: TreeNode<T>[];
}

export type IsEqual<T> = (a: T, b: T) => boolean;
