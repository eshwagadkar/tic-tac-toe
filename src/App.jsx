import { useState } from 'react'

import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './WINNIG_COMBINATIONS'
import GameOver from './components/GameOver'
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

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

  const gameBoard = initialGameBoard
    
  for(const turn of gameTurns) {
      const { square, player } = turn
      const { row, col } = square
      gameBoard[row][col] = player
  }

  let winner; 

  for(const combination of WINNING_COMBINATIONS) {

    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
         winner = firstSquareSymbol
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

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
  
  return <>
     <header>
      <img src="game-logo.png" alt="logo-image" />
      <h1>Tic-Tac-Toe</h1>
    </header>
    <main>
      <div id="game-container">
        {/* Players Board  */}
        <ol id="players" className='highlight-player'>
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} />}
        {/* Game Board */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  </>
}

export default App
