import React from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';
import { TreeNode, Employee } from './types';

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
  rootNode: TreeNode<Employee>;
  onNodeClick?: (node: TreeNode<Employee>) => void;
  onTreeLoaded?: (tree: d3.HierarchyPointNode<TreeNode<Employee>>) => void;
}
export const TreeViz: React.FC<TreeVizProps> = ({ rootNode, onNodeClick, onTreeLoaded }) => {
  const classes = useStyles();
  const tree = d3.tree<TreeNode<Employee>>().size([800, 600]);
  const hierarchy = d3.hierarchy(rootNode);
  const root = tree(hierarchy);

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
              <text x={node.x} y={node.y} style={{ textAnchor: 'middle', fontSize: 11 }}>
                {node.data.data.index}
              </text>
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
