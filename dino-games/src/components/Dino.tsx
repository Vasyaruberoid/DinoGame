// Определим интерфейс для пропсов
export type DinoProps = {
  y: number;
  isJumping: boolean;
};

export const Dino = ({ y, isJumping }: DinoProps) => {
  return (
    <div
      className="dino"
      style={{
        bottom: `${y}px`,
        transition: "bottom 0.1s",
      }}
    >
      {isJumping ? "🦖" : "🦕"}
    </div>
  );
};

