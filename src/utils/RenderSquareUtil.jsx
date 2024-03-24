import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

function getSquareRender(value) {
  const box = (
    <Box component="section" />
  );

  return value === "o" ? (
    <PanoramaFishEyeIcon style={{height: 'auto', width: '-webkit-fill-available'}} />
  ) : value === "x" ? (
    <CloseIcon style={{height: 'auto', width: '-webkit-fill-available'}}/>
  ) : (
    box
  );
}

export default getSquareRender;
