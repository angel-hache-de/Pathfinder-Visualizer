import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";

function AccordionInfo({ open, handleOnClose }) {
  return (
    <Dialog open={open} onClose={handleOnClose}>
      <DialogTitle>Breadth First Search algorithm</DialogTitle>
      <DialogContent>
        <Typography>
          Algorithm that find the shortest path from a source vertix in the
          graph to all vertices left in the graph. To Learn More:{" "}
          <Link
            href="https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
            rel="noreferrer"
            target="_blank"
            color="links.main"
            underline="hover"
          >
            BFS algorithm
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default AccordionInfo;
