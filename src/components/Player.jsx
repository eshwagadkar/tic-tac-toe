import { useState } from 'react'

export default function Player({ name, symbol, isActive, onChangeName }) {
    
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(name)

    function handleEditClick() {
        setIsEditing(editing => !editing)

        if(isEditing){ // Execute onChange() after editing is stopped
            onChangeName(symbol, playerName)
        }
    }
    
    return (
        <li className={isActive ? 'active' : undefined }>
            <span className="player">
              { isEditing ? 
                 <input type='text' value={playerName} onChange={() => setPlayerName(event.target.value)} required /> 
                 : <span className="player-name">{playerName}</span>}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}