import { Typography } from "@mui/material";

type ScoreBoardProps = {
  score: number;
  maxScore: number;
}

const ScoreBoard  = ({ score, maxScore }:ScoreBoardProps) => {
  return (
    <div>
      <Typography variant="h6">Очки: 000{score}</Typography>
      <Typography variant="h6">Максимальные очки: 000{maxScore}</Typography>
    </div>
  );
};

export default ScoreBoard;
