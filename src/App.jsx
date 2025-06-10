import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/Gameboard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './components/winning-combinations.js';
import GameOver from './components/GameOver.jsx';

function deriveActivePlayer(gameturns) {
  let currPlayer = "X";

  if(gameturns.length > 0 && gameturns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
};

function App() {

  const [gameturns, setGameTurns] = useState([]);
  
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameturns);

  const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
  

  let gameBoard = initialGameBoard;

  for (const turn of gameturns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].col];

    if (
      firstSquareSymbol 
      && firstSquareSymbol === secondSquareSymbol 
      && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
      
  };

  function handlePlayerChange(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      
      let currPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: 
          {
            row: rowIndex, 
            col: colIndex
          },
          player: currPlayer 
        },
        ...prevTurns
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        {winner && <GameOver winner={winner} />}
        <GameBoard 
          onPlayerChange={handlePlayerChange} board={gameBoard} turns={gameturns}
        />
      </div>

      <Log turns={gameturns}/>
      
    </main>
  )
}

export default App
