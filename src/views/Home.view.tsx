import React, { FC, useState, useEffect } from 'react';
import { HierarchyPointNode } from 'd3';
import { Button, Box, Typography } from '@material-ui/core';
import { TreeViz } from '../components/TreeViz';
import { treeWithGenerators } from '../components/seeder';
import { TreeNode, Employee } from '../components/types';
import uuid from 'uuid/v4';

export const Home: FC = () => {
  const [selectedNode, setSelectedNode] = useState<TreeNode<Employee>>();
  const [root, setRootNode] = useState<TreeNode<Employee>>(treeWithGenerators.root);
  const [d3Tree, setD3Tree] = useState<HierarchyPointNode<TreeNode<Employee>>>();
  return (
    <Box display="flex">
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        <TreeViz rootNode={root} onNodeClick={node => setSelectedNode(node)} />
      </Box>

      <Box display="flex" justifyContent="center" flexDirection="column" p={4}>
        <Box display="flex" flexDirection="column" p={4} boxShadow={3}>
          {/* Tree informations */}
          <Box display="flex" flexDirection="column">
            <Typography component="h2" color="primary">
              Tree informations
            </Typography>
            <Typography component="span" color="textPrimary">
              {/* Number of nodes: {treeWithGenerators.size} */}
            </Typography>
            <Typography component="span" color="textPrimary">
              Tree height: {d3Tree ? d3Tree.height : null}
            </Typography>
          </Box>

          {/* Selected node */}
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography component="h3" color="primary">
              Selected node
            </Typography>
            <Box>
              <Typography component="span" color="textPrimary">
                Id:
              </Typography>
              {selectedNode ? selectedNode.data.id : null}
            </Box>
            <Box>
              <Typography component="span" color="textPrimary">
                Role:
              </Typography>
              {selectedNode ? selectedNode.data.role : null}
            </Box>
            <Box>
              <Typography component="span" color="textPrimary">
                Name:
              </Typography>
              {selectedNode ? selectedNode.data.name : null}
            </Box>
          </Box>

          {/* Actions */}
          <Box display="flex" flexDirection="column">
            <Typography component="h3" color="primary">
              Actions
            </Typography>
            <Button
              onClick={() => {
                if (selectedNode) {
                  treeWithGenerators.add({ id: uuid(), name: 'yann', role: 'Senior Software Engineer' }, selectedNode.data);
                  setRootNode({ ...treeWithGenerators.root });
                }
              }}
            >
              Add node
            </Button>
            <Button
              onClick={() => {
                treeWithGenerators.cleanIndexes();
                setRootNode({ ...treeWithGenerators.root });
              }}
            >
              Reset indexes
            </Button>

            <Button
              onClick={() => {
                Array.from(treeWithGenerators.traverseBFS()).forEach(node => {
                  console.log(`Visited ${node.data.index}. ${node.data.name}`);
                });

                setRootNode({ ...treeWithGenerators.root });
              }}
            >
              Breadth first search
            </Button>

            <Button
              onClick={() => {
                Array.from(treeWithGenerators.traverseDFS()).forEach(node => {
                  console.log(`Visited ${node.data.index}. ${node.data.name}`);
                });
                setRootNode({ ...treeWithGenerators.root });
              }}
            >
              Depth first search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
