import { useState } from 'react'

import Player from './components/Player'
import GameBoard from './components/GameBoard'
import GameOver from './components/GameOver'
import Log from './components/Log'

import { deriveActivePlayer, deriveGameBoard, deriveWinner } from './utils/helperFunctions'
import { PLAYERS } from './utils/helperConstants'

function App() {

  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner

  // Receives the row index and column index and update the state based on previous state of the Game board.
  function handleSelectSquare(rowIndex, colIndex) {

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

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
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
          <Player 
            initialName={PLAYERS.X} 
            symbol='X' 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange} />
          <Player 
            initialName={PLAYERS.O} 
            symbol='O'
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange}/>
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        {/* Game Board */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  </>
}

export default App
