import React, { FC, useState } from 'react';
import { HierarchyPointNode } from 'd3';
import { Button, Box, Typography } from '@material-ui/core';
import { TreeViz } from '../components/TreeViz';
import { TreeNode } from '../components/Tree';
import { treeWithGenerators } from '../components/seeder';

export const Home: FC = () => {
  const [selectedNode, setSelectedNode] = useState<TreeNode>();
  const [root, setRootNode] = useState<TreeNode>(treeWithGenerators.root);
  const [d3Tree, setD3Tree] = useState<HierarchyPointNode<TreeNode>>();
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
              Number of nodes: {treeWithGenerators.size}
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
                  treeWithGenerators.add({ name: 'yann', age: 30, role: 'Senior Software Engineer' }, selectedNode.data);
                  setRootNode({ ...treeWithGenerators.root });
                }
              }}
            >
              Add node
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
