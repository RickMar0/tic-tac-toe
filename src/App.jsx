import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/Gameboard.jsx';
import Log from './components/Log.jsx';

function App() {

  const [gameturns, setGameTurns] = useState([]);
  
  const [activePlayer, setActivePlayer] = useState('X');

  function handlePlayerChange(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {

      let currPlayer = "X";

      if(prevTurns.length >0 && prevTurns[0].player === "X") {
        currPlayer = "O";
      }

      const updatedTurns = [
        { square: 
          {
            row: rowIndex, 
            col: colIndex
          }, player: currPlayer 
        }, ...prevTurns
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

        <GameBoard 
          onPlayerChange={handlePlayerChange} 
          activePlayerSymbol={activePlayer}
          turns={gameturns}
          prevTurns={gameturns}
        />
      </div>

      <Log turns={gameturns}/>
      
    </main>
  )
}

export default App
