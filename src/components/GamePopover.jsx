import * as React from "react";
import Popover from "@mui/material/Popover";

export default function GamePopover({ isOpened, game }) {
  return (
    <Popover
      anchorReference={"none"}
      open={isOpened}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ height: "75Vmin", width: "75Vmin" }}>{game}</div>
    </Popover>
  );
}
