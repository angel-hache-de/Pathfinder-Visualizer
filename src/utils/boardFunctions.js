export const START_NODE_ROW = 10;
export const START_NODE_COL = 15;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 35;
export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 50;

/**
 * Used to clean the visited/path nodes
 */
export const cleanVisitedAndShortestNodes = (grid) => {
  const newGrid = grid.slice();
  for (const row of newGrid) {
    for (const node of row) {
      node.wasVisited = false;
      node.belongsToShortestP = false;
    }
  }

  return newGrid;
};

export const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_WIDTH; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_HEIGHT; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  grid[START_NODE_ROW][START_NODE_COL].isStart = true;
  grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;
  return grid;
};

export const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    id: `${col}-${row}`,
    wasVisited: false,
    belongsToShortestP: false,
  };
};

/**
 * Returns the grid with the start/end icon
 * placed/deleted
 * @param {*} param0
 * @returns
 */
export const getNewGridWithIconMoved = ({
  grid,
  row,
  col,
  startIconMoved,
  placed,
}) => {
  const newGrid = grid.slice();

  const newNode = newGrid[row][col];

  newGrid[row][col] = {
    ...newNode,
    isStart: startIconMoved && placed ? true : false,
    isFinish: !startIconMoved && placed ? true : false,
  };

  return newGrid;
};

export const compareCoords = (node1, node2) => {
  return node1.col === node2.col && node1.row === node2.row;
};

export const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

/**
 * TO DO
 */
export const getBoardWithRandomState = () => {
  const grid = getInitialGrid();
  grid[START_NODE_ROW][START_NODE_COL].isStart = false;
  grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = false;

  // Determine the number of walls
  const numberOfWalls = Math.floor(
    Math.random() * ((GRID_HEIGHT * GRID_WIDTH) / 3)
  );
  for (let i = 0; i < numberOfWalls; i++) {
    const { row, col } = generateRandomCoords();
    grid[row][col].isWall = true;
  }

  const randomStart = generateRandomCoords();
  grid[randomStart.row][randomStart.col].isWall = false;
  grid[randomStart.row][randomStart.col].isStart = true;

  //Avoids that the start node will be the same as end node
  let randomEnd = generateRandomCoords();
  while (compareCoords(randomEnd, randomStart))
    randomEnd = generateRandomCoords();

  grid[randomEnd.row][randomEnd.col].isWall = false;
  grid[randomEnd.row][randomEnd.col].isFinish = true;

  return { grid, startNode: randomStart, endNode: randomEnd };
};

export const generateRandomCoords = () => {
  const randomRow = Math.floor(Math.random() * (GRID_WIDTH - 1));
  const randomCol = Math.floor(Math.random() * (GRID_HEIGHT - 1));

  return { row: randomRow, col: randomCol };
};
