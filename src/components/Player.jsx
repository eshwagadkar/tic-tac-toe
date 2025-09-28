import { useState } from 'react'

export default function Player({ name, symbol, isActive }) {
    
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(name)
    
    return (
        <li className={isActive ? 'active' : undefined }>
            <span className="player">
              { isEditing ? 
                 <input type='text' value={playerName} onChange={() => setPlayerName(event.target.value)} required /> 
                 : <span className="player-name">{playerName}</span>}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => setIsEditing(editing => !editing)}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}