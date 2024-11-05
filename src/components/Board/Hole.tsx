type HoleProps = {
  index: number;
};

export default function Hole({ index }: HoleProps) {
  return (
    <div
      className={`hole ${
        (index + 1) % 2 === 1 ? "hole-active" : "hole-inactive"
      }`}
    />
  );
}
