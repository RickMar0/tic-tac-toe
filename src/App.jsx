import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/Gameboard.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = {
  "X": "Player 1",
  "O": "Player 2"}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameturns) {
  let currPlayer = "X";

  if(gameturns.length > 0 && gameturns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
};

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column];

    if (
      firstSquareSymbol 
      && firstSquareSymbol === secondSquareSymbol 
      && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
      
  };
  return winner;
}

function deriveGameBoard(gameturns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameturns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player
  }

  return gameBoard;
}

function App() {

  const [ players, setPLayers] = useState(PLAYERS);

  const [gameturns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameturns);

  const gameBoard = deriveGameBoard(gameturns); 

  const winner = deriveWinner(gameBoard, players);
  
  const hasDraw = gameturns.length === 9 && !winner;

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

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPLayers(previousPlayers => {
      return {
        ...previousPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O} 
            symbol="O" isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard 
          onPlayerChange={handlePlayerChange} board={gameBoard} turns={gameturns}
        />
      </div>

      <Log turns={gameturns}/>
      
    </main>
  )
}

export default App
