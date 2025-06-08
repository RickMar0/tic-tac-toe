const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export default function GameBoard({ onPlayerChange, turns }) {

  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player
  }

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
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onPlayerChange(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>  
  )
}