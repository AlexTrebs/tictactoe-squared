import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

function getSquareRender(value) {
  const box = (
    <Box component="section" />
  );

  return value === "o" ? (
    <PanoramaFishEyeIcon style={{height: '100%', width: '100%'}} />
  ) : value === "x" ? (
    <CloseIcon style={{height: '100%', width: '100%'}}/>
  ) : (
    box
  );
}

export default getSquareRender;
