import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "player 1",
  O: "player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = function (gameTurns) {
  let currentPLayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPLayer = "O";
  }

  return currentPLayer;
};

const deriveWinner = function (gameBoard, player) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const seconedSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === seconedSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
};

const deriveGameBoard = function (gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

function App() {
  const [player, setPlayer] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const Winner = deriveWinner(gameBoard, player);
  const Draw = gameTurns.length === 9 && !Winner;

  const handleSelectedSquare = function (rowIndex, colIndex) {
    // setSelectedPlayer((ActivePlayer) => (ActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPLayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPLayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRematch = function () {
    setGameTurns([]);
  };

  const handlePlayerChange = function (symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerChange}
          />
          <Player
            name={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerChange}
          />
        </ol>
        {(Winner || Draw) && (
          <GameOver winner={Winner} onRematch={handleRematch} />
        )}
        <GameBoard
          onSelect={handleSelectedSquare}
          board={gameBoard}
          // isActiveSymbol={selectedPlayer}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
