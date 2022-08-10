import React from "react";
import {
  Clear,
  QuestionMark,
  RemoveRedEye,
  Shuffle,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import { SimpleNode } from "./Node";

function Actions({
  generateRandomBoard,
  cleanGrid,
  visualizeBFS,
  isAnimating,
  handleOnClickOpen,
}) {
  return (
    <div className="actions">
      <div className="buttons">
        <Button
          variant="contained"
          size="large"
          color="buttons"
          onClick={handleOnClickOpen}
          endIcon={<QuestionMark />}
        >
          What is BFS algorithm?
        </Button>
        <Button
          variant="contained"
          size="large"
          color="buttons"
          onClick={generateRandomBoard}
          endIcon={<Shuffle />}
        >
          Random board
        </Button>
        <Button
          variant="contained"
          size="large"
          color="buttons"
          onClick={cleanGrid}
          endIcon={<Clear />}
        >
          Clear board
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={visualizeBFS}
          endIcon={<RemoveRedEye />}
          disabled={isAnimating}
        >
          Visualize BFS Algorithm
        </Button>
      </div>
      <div className="simbology">
        <div className="node-description">
          <SimpleNode
            isWall={true}
            wasVisited={false}
            belongsToShortestP={false}
          />
          <Button variant="contained" size="large" color="buttons">
            Wall
          </Button>
        </div>
        <div className="node-description">
          <SimpleNode
            isWall={false}
            wasVisited={false}
            belongsToShortestP={true}
          />
          <Button variant="contained" size="large" color="buttons">
            Shortest Path
          </Button>
        </div>
        <div className="node-description">
          <SimpleNode
            isWall={false}
            wasVisited={true}
            belongsToShortestP={false}
          />
          <Button variant="contained" size="large" color="buttons">
            Visited
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Actions;
