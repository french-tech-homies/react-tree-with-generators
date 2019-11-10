import { IsEqual, Employee } from './types';
import { Tree } from './Tree';
import { TreeWithGenerators } from './TreeWithGenerators';
import uuid from 'uuid/v4';

const ceo = { id: uuid(), name: 'Julia', role: 'CEO' };
const cto = { id: uuid(), name: 'Ruben', role: 'CTO' };
const isEqual: IsEqual<Employee> = (a, b) => a.id === b.id;
export const simpleTree = new Tree(ceo, isEqual);
export const treeWithGenerators = new TreeWithGenerators(ceo, isEqual);

simpleTree.add({ id: uuid(), name: 'Rachel', role: 'CFO' }, ceo);
treeWithGenerators.add({ id: uuid(), name: 'Rachel', role: 'CFO' }, ceo);

simpleTree.add(cto, ceo);
treeWithGenerators.add(cto, ceo);

simpleTree.add({ id: uuid(), name: 'Julien', role: 'COO' }, ceo);
treeWithGenerators.add({ id: uuid(), name: 'Julien', role: 'COO' }, ceo);

simpleTree.add({ id: uuid(), name: 'Amelie', role: 'CIO' }, ceo);
treeWithGenerators.add({ id: uuid(), name: 'Amelie', role: 'CIO' }, ceo);

simpleTree.add({ id: uuid(), name: 'Alex', role: 'Team lead' }, cto);
treeWithGenerators.add({ id: uuid(), name: 'Alex', role: 'Team lead' }, cto);

simpleTree.add({ id: uuid(), name: 'Emily', role: 'Team lead' }, cto);
treeWithGenerators.add({ id: uuid(), name: 'Emily', role: 'Team lead' }, cto);

simpleTree.add({ id: uuid(), name: 'Sami', role: 'Team lead' }, cto);
treeWithGenerators.add({ id: uuid(), name: 'Sami', role: 'Team lead' }, cto);

// tree.remove(cto, ceo);

// simpleTree.traverseBFS(node => {
//   console.log(node.data.role, node.data.name);
// });
// console.log('-----------');
// simpleTree.traverseDFS(node => {
//   console.log(node.data.role, node.data.name);
// });
