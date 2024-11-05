export default function Board() {
  return (
    <div className="board">
      {Array.from({ length: 25 }).map((_, index) => {
        return (
          <div
            className={`hole ${(index + 1) % 2 === 1 ? "hole-active" : ""}`}
            key={index}
          />
        );
      })}
    </div>
  );
}
