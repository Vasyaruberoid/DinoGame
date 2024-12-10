import  { useState } from "react";
import { Container, CssBaseline, Box, Button, Typography } from "@mui/material";
import { Game } from "./components/Game";
import ScoreBoard from "./components/ScoreBoard";

const App = () => {
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(
    parseInt(localStorage.getItem("maxScore") || "0", 10)
  );

  // Функция для начала новой игры
  const startNewGame = () => {
    setScore(0); // Сброс текущих очков
    setIsGameActive(true); // Начало игры
  };

  // Функция для завершения игры
  const endGame = (finalScore: number) => {
    setIsGameActive(false); // Завершаем игру
    setScore(finalScore); // Отображаем финальные очки
    // Если текущий счет больше максимального, обновляем максимальный счет
    if (finalScore > maxScore) {
      setMaxScore(finalScore);
      localStorage.setItem("maxScore", finalScore.toString()); // Сохраняем новый максимальный счет
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          T-Rex Game
        </Typography>
        {/* Если игра активна, показываем компонент Game, иначе - компонент ScoreBoard */}
        {isGameActive ? (
          <Game score={score} maxScore={maxScore} onGameOver={endGame} />
        ) : (
          <ScoreBoard score={score} maxScore={maxScore} />
        )}
        {/* Кнопка для начала новой игры */}
        {!isGameActive && (
          <Button variant="contained" color="primary" onClick={startNewGame}>
            Начать заново
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default App;
