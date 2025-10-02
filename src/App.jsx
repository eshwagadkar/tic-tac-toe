import { useState } from 'react'

import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './WINNIG_COMBINATIONS'
import GameOver from './components/GameOver'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2' 
}

const INITIAL_GAME_BOARD = [
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

function deriveGameBoard(gameTurns) {
  // Creating a copy of the initial game board and then edit the copy for immutable array update
  const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]
    
  for(const turn of gameTurns) {
      const { square, player } = turn
      const { row, col } = square
      gameBoard[row][col] = player
  }

  return gameBoard
}

function deriveWinner(gameBoard, players) {
  let winner; 

  for(const combination of WINNING_COMBINATIONS) {

    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
         winner = players[firstSquareSymbol]
    }
  }

  return winner

}

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
