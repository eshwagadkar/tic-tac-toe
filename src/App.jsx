import { useState } from 'react'

import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'

function App() {

  const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer(currentActivePlayer => currentActivePlayer === 'X' ? 'O' : 'X')
    
    setGameTurns(prevTurns => {

      // BELOW CODE makes sure THAT WE ARE NOT MERGING DIFFERENT STATES.
      let currentPlayer = 'X' 
      if(prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O'
      }

      // Below array will return an aray of turns and the the current player who played the turn
      const updatedTurns = [
        { square : { row: rowIndex, col: colIndex }, player: currentPlayer  },
        ...prevTurns 
      ]

      return updatedTurns

    })
  }
  
  return (
    <main>
      <div id="game-container">
        {/* Players Board  */}
        <ol id="players" className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {/* Game Board */}
        <GameBoard onSelectSquare={handleSelectSquare} />
      </div>
    </main>
  )
}

export default App
