import React, { useEffect } from 'react';
import { TreeNode } from './Tree';
import * as d3 from 'd3';
// import './treeViz.css';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainGroup: {
      transform: 'translate(0px, 30px)',
      fontFamily: 'Roboto'
    },
    link: {
      fill: 'none',
      stroke: '#ccc',
      strokeWidth: 2
    },
    node: {
      '& circle': {
        fill: '#fff',
        stroke: 'steelblue',
        strokeWidth: 3,
        cursor: 'pointer'
      }
    }
  })
);
interface TreeVizProps {
  rootNode: TreeNode;
  onNodeClick?: (node: TreeNode) => void;
  onTreeLoaded?: (tree: d3.HierarchyPointNode<TreeNode>) => void;
}
export const TreeViz: React.FC<TreeVizProps> = ({ rootNode, onNodeClick, onTreeLoaded }) => {
  const classes = useStyles();
  const tree = d3.tree<TreeNode>().size([800, 600]);
  console.log(rootNode);

  const hierarchy = d3.hierarchy(rootNode);
  console.log(hierarchy);

  const root = tree(hierarchy);
  console.log(root);
  // useEffect(() => {
  //   if (onTreeLoaded) onTreeLoaded(root);
  // });
  // console.log('treenode', root);
  return (
    <svg width={800} height={800}>
      <g className={classes.mainGroup}>
        {root
          .descendants()
          .splice(1)
          .map((node, idx) => {
            return (
              <path
                key={idx}
                className={classes.link}
                d={
                  'M' +
                  node.x +
                  ',' +
                  node.y +
                  'C' +
                  node.x +
                  ',' +
                  (node.y + (node.parent ? node.parent.y : 0)) / 2 +
                  ' ' +
                  (node.parent ? node.parent.x : 0) +
                  ',' +
                  (node.y + (node.parent ? node.parent.y : 0)) / 2 +
                  ' ' +
                  (node.parent ? node.parent.x : 0) +
                  ',' +
                  (node.parent ? node.parent.y : 0)
                }
              ></path>
            );
          })}
        {root.descendants().map((node, idx) => {
          return (
            <g key={idx} className={classes.node}>
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                onClick={() => {
                  if (onNodeClick) onNodeClick(node.data);
                }}
              ></circle>
              <text
                x={node.x}
                y={node.y + 40}
                style={{ textAnchor: 'middle', fontSize: 11 }}
              >{`${node.data.data.role}: ${node.data.data.name}`}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};
