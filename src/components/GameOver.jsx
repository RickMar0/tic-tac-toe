export default function GameOver({winner}) {
  return(
    <div id="game-over">
      <h2>GAME OVER</h2>
      <p>{winner} WON!</p>
      <button>Rematch</button>
    </div>
  )
} 