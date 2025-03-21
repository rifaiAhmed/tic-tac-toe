import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => (
  <button onClick={onSquareClick} className="square">
    {value}
  </button>
);

const calculateWinner = (squares: (string | null)[]): string | null => {
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Board: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [playersSet, setPlayersSet] = useState(false);

  useEffect(() => {
    const getPlayerNames = async () => {
      const { value: playerXName } = await Swal.fire({
        title: "Masukkan nama pemain X:",
        input: "text",
        inputPlaceholder: "Pemain X",
        showCancelButton: false,
      });
      const { value: playerOName } = await Swal.fire({
        title: "Masukkan nama pemain O:",
        input: "text",
        inputPlaceholder: "Pemain O",
        showCancelButton: false,
      });

      setPlayerX(playerXName || "Pemain X");
      setPlayerO(playerOName || "Pemain O");
      setPlayersSet(true);
    };

    if (!playersSet) getPlayerNames();
  }, [playersSet]);

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = [...squares];
    nextSquares[i] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const currentPlayer = isXNext ? playerX : playerO;
  const status = winner
    ? `Pemenang: ${winner === "X" ? playerX : playerO}`
    : `Giliran: ${currentPlayer}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, i) => (
          <Square key={i} value={value} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">
        Mulai Ulang
      </button>
    </>
  );
};

export default Board;
