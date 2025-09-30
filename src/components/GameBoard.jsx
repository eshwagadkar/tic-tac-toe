// import { useState } from 'react'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

// export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
export default function GameBoard({ onSelectSquare, turns}) {

    const gameboard = initialGameBoard
    
    for(const turn of turns) {
        const { square, player } = turn
        const { row, col } = square

        gameboard[row][col] = player
    }


    // const [gameboard, setGameBoard] = useState(initialGameBoard)

    // Responsible to select which row and column index is selected in the game board and return the current updated state of the board, 
    // when used clicked any one of squares
    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard(prevBoard => {
    //         // Since the board is just a 2D array of primitives ['X', 'O',], the below current solution is already safe and efficient — it avoids mutating the old state.
    //         const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])] // not a true deep copy but a 2 level shallow copy 
    //         // const updatedBoard = structuredClone(prevBoard) // a true deep copy; use structuredClone / recursive copy if deeper nesting is requiredin the future.
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedBoard
    //     })

    //     onSelectSquare() // FROM PROPS, lifting the state up to app.js
    // }

    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>{ row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                   </ol>
                </li>
            ))}
        </ol>
    )
}