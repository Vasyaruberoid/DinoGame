import { useState, useEffect, useRef } from "react";
import dino from "../assets/dinosaur.png";
import dinoJump from "../assets/Jump.png";
import cactusImg from "../assets/cactus.png";

type GameProps = {
  score: number;
  maxScore: number;
  onGameOver: (finalScore: number) => void;
};

export const Game = ({ score, maxScore, onGameOver }: GameProps) => {
  const [dinoY, setDinoY] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(3);
  const [cacti, setCacti] = useState<Array<number>>([]);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(score);

  const gameAreaRef = useRef<HTMLDivElement>(null);

  //
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" && !isJumping) {
      setIsJumping(true);
      setDinoY(30);

      setTimeout(() => {
        setDinoY(0);
        setIsJumping(false);
      }, 300);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameOver) {
        clearInterval(gameLoop);
        onGameOver(currentScore);
        return;
      }

      setCacti((prev) => {
        const newCacti = prev.map((x) => x - speed); 
        return newCacti.filter((x) => x > -50); 
      });

      if (currentScore > 0 && currentScore % 100 === 0) {
        setSpeed((prev) => prev + 0.2); 
      }

 
      if (
        dinoY === 0 &&
        cacti.some((cactusPosition) => {
  
          const dinoLeft = 30;
          const dinoRight = dinoLeft; 


          const cactusLeft = cactusPosition;
          const cactusRight = cactusLeft + 30;


          const isHorizontalCollision =
            dinoRight > cactusLeft && dinoLeft < cactusRight;

          
          const isVerticalCollision = dinoY === 0; 

          return isHorizontalCollision && isVerticalCollision;
        })
      ) {
        setGameOver(true); 
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [currentScore, speed, cacti, gameOver, dinoY]);


  useEffect(() => {
    const cactusInterval = setInterval(() => {
      if (!gameOver) {
        setCacti((prev) => [...prev, 200]);
      }
    }, 2000);

    return () => clearInterval(cactusInterval);
  }, [gameOver]);


  useEffect(() => {
    const scoreInterval = setInterval(() => {
      if (!isJumping && !gameOver) {
        setCurrentScore((prevScore) => prevScore + 1);
      }
    }, 1000); 

    return () => clearInterval(scoreInterval);
  }, [isJumping, gameOver]);

  return (
    <div
      ref={gameAreaRef}
      style={{
        width: "600px",
        height: "200px",
        backgroundColor: "lightgray",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundImage: `url(${isJumping ? dinoJump : dino})`,
          backgroundSize: "contain",
          position: "absolute",
          bottom: `${dinoY}px`,
          left: "30px",
          transition: "bottom 0.3s",
        }}
      />
      {cacti.map((cactus, index) => (
        <div
          key={index}
          style={{
            width: "30px",
            height: "50px",
            backgroundImage: `url(${cactusImg})`, // Иконка кактуса
            backgroundSize: "contain",
            position: "absolute",
            bottom: "0",
            left: `${cactus}%`,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "black",
          fontSize: "20px",
        }}
      >
        <div>Очки: 000{currentScore}</div>
        <div>Макс. очки: 000{maxScore}</div>
      </div>
    </div>
  );
};
