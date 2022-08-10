import React, { useEffect, useState } from "react";

import Node from "../components/Node";

import {
  bfs,
  getNodesInShortestPathOrder,
} from "../algorithms/algorithms";
import {
  cleanVisitedAndShortestNodes,
  compareCoords,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  getBoardWithRandomState,
  getInitialGrid,
  getNewGridWithIconMoved,
  getNewGridWithWallToggled,
  START_NODE_COL,
  START_NODE_ROW,
} from "../utils/boardFunctions";

import "./Board.css";
import Actions from "./Actions";

function Board({handleOnClickOpen}) {
  const [board, setBoard] = useState({
    grid: [],
    startNode: { col: START_NODE_COL, row: START_NODE_ROW },
    endNode: { col: FINISH_NODE_COL, row: FINISH_NODE_ROW },
  });
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  /** Mouse is pressed in start incon */
  const [selectingStart, setSelectingStart] = useState(false);
  /** Mouse is pressed in finish incon */
  const [selectingEnd, setSelectingEnd] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const grid = getInitialGrid();

    setBoard((board) => ({ ...board, grid }));
  }, []);

  //EVEMTS SECTION
  const handleMouseDown = (row, col) => {
    if (col === board.startNode.col && row === board.startNode.row) {
      setSelectingStart(!selectingStart);
      return;
    }

    if (col === board.endNode.col && row === board.endNode.row) {
      setSelectingEnd(!selectingEnd);
      return;
    }

    const newGrid = getNewGridWithWallToggled(board.grid, row, col);
    setBoard((board) => ({
      ...board,
      grid: newGrid,
    }));
    setMouseIsPressed(true);
  };

  // const handleOnClick = (row, col) => {
  //   if (col === board.startNode.col && row === board.startNode.row) {
  //     setSelectingStart(!selectingStart);
  //     return;
  //   }

  //   if (col === board.endNode.col && row === board.endNode.row) {
  //     setSelectingEnd(!selectingEnd);
  //     return;
  //   }
  // };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed && !selectingStart && !selectingEnd) return;
    console.log("ON ENTER>.....");
    const actualNode = { row, col };

    // Selecting walls
    if (mouseIsPressed) {
      if (
        compareCoords(actualNode, board.startNode) ||
        compareCoords(actualNode, board.endNode)
      )
        return;
      const newGrid = getNewGridWithWallToggled(board.grid, row, col);
      setBoard((board) => ({
        ...board,
        grid: newGrid,
      }));
      return;
    }

    if (selectingStart && compareCoords(actualNode, board.endNode)) return;

    if (selectingEnd && compareCoords(actualNode, board.startNode)) return;

    const newGrid = getNewGridWithIconMoved({
      grid: board.grid,
      col,
      row,
      startIconMoved: selectingStart,
      placed: true,
    });

    const newStartNodeCoords = selectingStart ? { col, row } : board.startNode;
    const newEndNodeCoords = selectingEnd ? { col, row } : board.endNode;

    setBoard({
      grid: newGrid,
      startNode: newStartNodeCoords,
      endNode: newEndNodeCoords,
    });
  };

  const handleMouseLeave = (row, col) => {
    if (!selectingStart && !selectingEnd) return;

    const actualNode = { row, col };
    if (selectingStart && compareCoords(actualNode, board.endNode)) return;

    if (selectingEnd && compareCoords(actualNode, board.startNode)) return;

    const newGrid = getNewGridWithIconMoved({
      grid: board.grid,
      col,
      row,
      startIconMoved: selectingStart,
      placed: false,
    });

    setBoard((board) => ({
      ...board,
      grid: newGrid,
    }));
  };

  const handleMouseUp = (row, col) => {
    const actualNode = { row, col };
    console.log(actualNode);
    if (selectingStart && !compareCoords(actualNode, board.endNode))
      setSelectingStart(false);
    if (selectingEnd && !compareCoords(actualNode, board.startNode))
      setSelectingEnd(false);
    if (mouseIsPressed) setMouseIsPressed(false);
  };

  //GRID FUNCTIONS
  const cleanGrid = () => {
    const newGrid = getInitialGrid();
    setBoard({
      grid: newGrid,
      startNode: { col: START_NODE_COL, row: START_NODE_ROW },
      endNode: { col: FINISH_NODE_COL, row: FINISH_NODE_ROW },
    });
  };

  const generateRandomBoard = () => {
    const { grid, startNode, endNode } = getBoardWithRandomState();
    setBoard({
      grid,
      startNode,
      endNode,
    });
  };

  //ANIMATIONS FUNCTIONS
  const animateBFS = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    setIsAnimating(true);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
          setIsAnimating(false);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = board.grid;
        newGrid[node.row][node.col].wasVisited = true;
        setBoard((board) => ({
          ...board,
          grid: newGrid,
        }));
        // document.getElementById(`node-${node.row}-${node.col}`).className =
        //   "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const { row, col } = nodesInShortestPathOrder[i];
        const newGrid = board.grid;
        /**
         * In the Node component, the "belongsToShortestP"
         * have priority over the "wasVisited" prop
         */
        newGrid[row][col].belongsToShortestP = true;

        setBoard((board) => ({
          ...board,
          grid: newGrid,
        }));

        // document.getElementById(`node-${node.row}-${node.col}`).className =
        //   "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeBFS = () => {
    /**
     * Clean the grid frmo visited nodes helps to re-run the
     * animation to see it again
     */
    const cleanGrid = cleanVisitedAndShortestNodes(board.grid);
    setBoard((board) => ({
      ...board,
      grid: cleanGrid,
    }));

    const { startNode: sn, endNode: en } = board;

    const startNode = cleanGrid[sn.row][sn.col];
    const finishNode = cleanGrid[en.row][en.col];
    const visitedNodesInOrder = bfs(cleanGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <>
      <Actions
        generateRandomBoard={generateRandomBoard}
        cleanGrid={cleanGrid}
        visualizeBFS={visualizeBFS}
        isAnimating={isAnimating}
        handleOnClickOpen={handleOnClickOpen}
      />
      <div className="grid">
        {board.grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {
                  row,
                  col,
                  isFinish,
                  isStart,
                  isWall,
                  wasVisited,
                  belongsToShortestP,
                } = node;
                return (
                  <Node
                    key={node.id}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    row={row}
                    wasVisited={wasVisited}
                    belongsToShortestP={belongsToShortestP}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseLeave={(row, col) => handleMouseLeave(row, col)}
                    // onClick={(row, col) => handleOnClick(row, col)}
                    onMouseUp={(row, col) => handleMouseUp(row, col)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Board;
