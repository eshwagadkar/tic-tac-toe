import { useState } from 'react'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {

    const [gameboard, setGameBoard] = useState(initialGameBoard)

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard(prevBoard => {
            // Since the board is just a 2D array of primitives ['X', 'O',], the below current solution is already safe and efficient — it avoids mutating the old state.
            const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])] // not a true deep copy but a 2 level shallow copy 
            // const updatedBoard = structuredClone(prevBoard) // a true deep copy; use structuredClone / recursive copy if deeper nesting is requiredin the future.
            updatedBoard[rowIndex][colIndex] = 'X'
            return updatedBoard
        });
    }

    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>{ row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                   </ol>
                </li>
            ))}
        </ol>
    )
}