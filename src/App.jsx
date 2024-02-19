import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { winning_combinations } from "./components/winning_combinations.js";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function DeriveActiveplayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function DerivegameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function Derivewinner(gameBoard, Players) {
  let winner;
  for (const combination of winning_combinations) {
    const firstsquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondsquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdsquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstsquareSymbol &&
      firstsquareSymbol === secondsquareSymbol &&
      firstsquareSymbol === thirdsquareSymbol
    ) {
      winner = Players[firstsquareSymbol];
    }
  }
  return winner;
}
function App() {
  //const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [Players, setPlayers] = useState(PLAYERS);

  const activePlayer = DeriveActiveplayer(gameTurns);
  // let gameBoard = [...initialGameBoard.map(arrays => [...arrays])];

  const gameBoard = DerivegameBoard(gameTurns);
  const winner = Derivewinner(gameBoard, Players);
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      const currentPlayer = DeriveActiveplayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayers(symbol, newPlayer) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newPlayer,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayerChange={handlePlayers}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayerChange={handlePlayers}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
