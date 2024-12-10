import React, { useState, useEffect } from "react";
import { Dino } from "./Dino";
import Obstacle from "./Obstacle";

const Game: React.FC = () => {
  const [dinoY, setDinoY] = useState(100); // Начальная позиция динозаврика по Y
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const jumpHandler = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isJumping) {
        setIsJumping(true);
        setDinoY(50); // Высота прыжка
        setTimeout(() => {
          setIsJumping(false);
          setDinoY(100); // Вернуться на землю
        }, 300);
      }
    };

    const gameLoop = setInterval(() => {
      setObstacles((prev) => {
        return prev
          .map((obstacle) => obstacle - 5)
          .filter((obstacle) => obstacle > -50); // Обновляем позицию препятствий
      });

      setScore((prev) => prev + 1); // Увеличиваем счет

      // Проверка на столкновение с препятствием
      obstacles.forEach((obstacle) => {
        if (obstacle < 50 && obstacle > 0 && dinoY === 100) {
          alert(`Game Over! Your score: ${score}`);
          clearInterval(gameLoop);
        }
      });
    }, 100);

    window.addEventListener("keydown", jumpHandler);

    return () => {
      window.removeEventListener("keydown", jumpHandler);
      clearInterval(gameLoop);
    };
  }, [isJumping, dinoY, obstacles, score]);

  useEffect(() => {
    const obstacleGenerator = setInterval(() => {
      setObstacles((prev) => [...prev, 300]);
    }, 2000); // Генерация новых препятствий

    return () => clearInterval(obstacleGenerator);
  }, []);

  return (
    <div className="game-container">
      <div className="sky">
        <Dino y={dinoY} isJumping={isJumping} />
        {obstacles.map((obstacle, index) => (
          <Obstacle key={index} x={obstacle} />
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Game;
