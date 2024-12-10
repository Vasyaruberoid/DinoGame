import { Button } from "@mui/material";

type GameOverProps = {
  onRestart: () => void;
};

const GameOver = ({ onRestart }: GameOverProps) => {
  return (
    <div>
      <h2>Игра окончена!</h2>
      <Button variant="contained" color="primary" onClick={onRestart}>
        Начать заново
      </Button>
    </div>
  );
};

export default GameOver;
