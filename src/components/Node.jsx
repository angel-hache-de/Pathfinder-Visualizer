import React from "react";
import { AddLocation, PlayCircleFilled } from "@mui/icons-material";

import "./Node.css";

function Node({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  wasVisited,
  belongsToShortestP,
  row,
  onClick,
  onMouseLeave,
}) {
  const extraClassName = isWall
    ? "node-wall"
    : belongsToShortestP
    ? "node-shortest-path"
    : wasVisited
    ? "node-visited"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
      // onClick={() => onClick(row, col)}
      onMouseLeave={() => onMouseLeave(row, col)}
    >
      {isStart ? (
        <PlayCircleFilled color="icons" />
      ) : isFinish ? (
        <AddLocation color="icons" />
      ) : (
        <></>
      )}
    </div>
  );
}

export const SimpleNode = ({isWall, wasVisited, belongsToShortestP}) => {
  const extraClassName = isWall
    ? "node-wall"
    : belongsToShortestP
    ? "node-shortest-path"
    : wasVisited
    ? "node-visited"
    : "";

  return (
    <div
      className={`node ${extraClassName}`}
      style={{
        margin: "0px 10px",
      }}
    />
  );
};

export default Node;
