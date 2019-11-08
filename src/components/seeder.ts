import { Tree, TreeNode } from './Tree';
import { TreeWithGenerators } from './TreeWithGenerators';

const ceo = { age: 20, name: 'Julia', role: 'CEO' };
const cto = { name: 'Ruben', role: 'CTO', age: 22 };

export const simpleTree = new Tree(ceo);
export const treeWithGenerators = new TreeWithGenerators(ceo);

simpleTree.add({ name: 'Rachel', role: 'CFO', age: 45 }, ceo);
treeWithGenerators.add({ name: 'Rachel', role: 'CFO', age: 45 }, ceo);

simpleTree.add(cto, ceo);
treeWithGenerators.add(cto, ceo);

simpleTree.add({ name: 'Julien', role: 'COO', age: 31 }, ceo);
treeWithGenerators.add({ name: 'Julien', role: 'COO', age: 31 }, ceo);

simpleTree.add({ name: 'Amelie', role: 'CIO', age: 34 }, ceo);
treeWithGenerators.add({ name: 'Amelie', role: 'CIO', age: 34 }, ceo);

simpleTree.add({ name: 'Alex', age: 31, role: 'Team lead' }, cto);
treeWithGenerators.add({ name: 'Alex', age: 31, role: 'Team lead' }, cto);

simpleTree.add({ name: 'Emily', age: 24, role: 'Team lead' }, cto);
treeWithGenerators.add({ name: 'Emily', age: 24, role: 'Team lead' }, cto);

simpleTree.add({ name: 'Sami', age: 30, role: 'Team lead' }, cto);
treeWithGenerators.add({ name: 'Sami', age: 30, role: 'Team lead' }, cto);

// tree.remove(cto, ceo);

simpleTree.traverseBFS(node => {
  console.log(node.data.role, node.data.name);
});
console.log('-----------');
simpleTree.traverseDFS(node => {
  console.log(node.data.role, node.data.name);
});
