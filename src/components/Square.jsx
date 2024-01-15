import { Button } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CloseIcon from '@mui/icons-material/Close';

function Square({ value, squareCoord, onPlay }) {

    function onSquareClick() {
        onPlay(squareCoord);
    };

    return (
        <Button className="square" onClick={onSquareClick} >
            {value === 'o' ? <PanoramaFishEyeIcon /> : (value === 'x' ? <CloseIcon /> : squareCoord)}
        </Button>
    );
};

export default Square;