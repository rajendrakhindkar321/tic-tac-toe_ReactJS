import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const isBoardFull = board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {winner || isBoardFull ? (
        <div className="message">
          {winner ? `Winner: ${winner}` : "It's a draw!"}<br/>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        <>
          <div className="board">
            {board.map((value, index) => (
              <div
                key={index}
                className={`square ${value}`}
                onClick={() => handleClick(index)}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="info">Next Player: {isXNext ? "X" : "O"}</div>
        </>
      )}
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
