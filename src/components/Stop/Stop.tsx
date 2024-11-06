type StopProps = {
  disabled?: boolean;
  stop: () => void;
};

export default function Stop({ disabled, stop }: StopProps) {
  return (
    <button className="stop" disabled={disabled} onClick={stop}>
      End
    </button>
  );
}
