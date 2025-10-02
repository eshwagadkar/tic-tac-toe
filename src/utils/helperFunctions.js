import { WINNING_COMBINATIONS } from '../WINNIG_COMBINATIONS'

import { INITIAL_GAME_BOARD } from './helperConstants'

export function deriveActivePlayer(turns) { // BELOW CODE makes sure THAT WE ARE NOT MERGING DIFFERENT STATES.
   let currentPlayer = 'X' 
    
   if(turns.length > 0 && turns[0].player === 'X') {
      currentPlayer = 'O'
    }

    return currentPlayer 
}

export function deriveGameBoard(gameTurns) {
  // Creating a copy of the initial game board and then edit the copy for immutable array update
  const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]
    
  for(const turn of gameTurns) {
      const { square, player } = turn
      const { row, col } = square
      gameBoard[row][col] = player
  }

  return gameBoard
}

export function deriveWinner(gameBoard, players) {
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
