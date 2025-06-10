export default function GameBoard({ onPlayerChange, board }) {

  // const [gameboard, setGameBoard] = useState(initialGameBoard);

  // function handleClick(rowIndex, colIndex) {
  //   setGameBoard((prevGB)=>{
  //     const updatedGB = [...prevGB.map(innerArray => [...innerArray])];
  //     updatedGB[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedGB;
  //   });

  //   onPlayerChange();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onPlayerChange(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>  
  )
}