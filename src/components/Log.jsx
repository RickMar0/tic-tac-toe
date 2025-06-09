export default function Log({ turns }) {
  if (!turns || turns.length === 0) {
    return <p>No previous turns yet.</p>;
  }

  const lastTurn = turns[turns.length - 2]; // previous turn (not current)
  if (!lastTurn) {
    return <p>No previous turns yet.</p>;
  }

  const { player, row, col } = lastTurn;
  const playerid = player === "X" ? "player1" : "player2";

  return (
    <ul>
      <li>Player: {playerid}</li>
      <li>Row: {row}</li>
      <li>Column: {col}</li>
    </ul>
  );
}