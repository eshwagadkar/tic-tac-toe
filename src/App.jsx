import { useState } from 'react'

import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'

// Helper class created outside the App component so that it doesnot gets recreated everytime.
function deriveActivePlayer(turns) { // BELOW CODE makes sure THAT WE ARE NOT MERGING DIFFERENT STATES.
   let currentPlayer = 'X' 
    
   if(turns.length > 0 && turns[0].player === 'X') {
      currentPlayer = 'O'
    }

    return currentPlayer 
}

function App() {

  // const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  // Receives the row index and column index and update the state based on previous state of the Game board.
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer(currentActivePlayer => currentActivePlayer === 'X' ? 'O' : 'X')

    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns)
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
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
