import React from "react";

interface ObstacleProps {
  x: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ x }) => {
  return (
    <div
      className="obstacle"
      style={{
        left: `${x}px`,
        transition: "left 0.1s",
      }}
    >
      ⬛
    </div>
  );
};

export default Obstacle;
