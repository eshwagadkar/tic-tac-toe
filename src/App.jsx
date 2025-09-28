import Player from './components/Player'
import GameBoard from './components/GameBoard'
function App() {
  return (
    <main>
      <div id="game-container">
        {/* Players Board  */}
        <ol id="players">
          <Player name='Player 1' symbol='X' />
          <Player name='Player 2' symbol='O' />
        </ol>
        {/* Game Board */}
        <GameBoard />

      </div>
    </main>
  )
}

export default App
