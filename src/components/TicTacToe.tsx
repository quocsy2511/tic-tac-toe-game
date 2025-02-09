import { useEffect, useState } from "react";
import overLogo from "../assets/game-over-toast.svg";

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square = ({ onClick, value }: SquareProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold text-4xl float-left w-full h-28  cursor-pointer bg-[#2B0040] rounded-xl hover:bg-[#2b00407b]
        ${value === "X" ? "text-[#48D2FE]" : "text-[#E2BE00]"}`}
    >
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>("");
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);

  const checkWinner = (squares: string[]): string => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6], // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return "";
  };

  const handleSquareClick = (currentNumber: number) => {
    const currentSquares = [...squares];

    if (checkWinner(currentSquares) || currentSquares[currentNumber]) return;
    currentSquares[currentNumber] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(currentSquares);

    const winner = checkWinner(currentSquares);
    if (winner) {
      setWinner(`Winner is ${winner}`);
      if (winner === "X") {
        setScoreX(scoreX + 1);
      } else {
        setScoreO(scoreO + 1);
      }
    }
  };

  useEffect(() => {
    if (!checkWinner(squares) && squares.every((square) => square !== "")) {
      setWinner("This is a draw!!");
      setDraws(draws + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares, isXTurn]);

  return (
    <div className=" relative flex flex-col w-full  items-center sm:p-[80px]  px-[30px] py-[50px]">
      <div className="flex flex-row justify-between items-center  w-full mb-6 gap-x-2">
        <div className=" flex flex-col justify-center items-center bg-[#48D2FE] md:p-[30px] p-4 rounded-2xl uppercase">
          <p className="text-xl font-medium text-black">Player X</p>
          <h2 className="text-3xl font-bold text-black">{scoreX}</h2>
        </div>
        <div className=" flex flex-col justify-center items-center bg-[#BCDBF9] md:p-[30px] p-4 rounded-2xl uppercase">
          <p className="text-xl font-medium text-black">DRAW</p>
          <h2 className="text-3xl font-bold text-black">{draws}</h2>
        </div>
        <div className=" flex flex-col justify-center items-center bg-[#E2BE00] md:p-[30px] p-4 rounded-2xl uppercase">
          <p className="text-xl font-medium text-black">Player O</p>
          <h2 className="text-3xl font-bold text-black">{scoreO}</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 md:gap-5 gap-2 w-full mb-5">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>

      {winner ? (
        <div className="w-full ">
          <div className="w-full relative mb-7">
            <img
              src={overLogo}
              alt="over"
              className="w-full max-w-[300px] h-auto mx-auto"
            />
            <p className="absolute top-0 text-center text-2xl font-bold text-white sm:pt-1 w-full">
              {winner}
            </p>
          </div>

          <button
            onClick={() => {
              setSquares(Array(9).fill(""));
              setIsXTurn(true);
              setWinner("");
            }}
            className=" w-full py-5 bg-[#BCDBF9] text-black rounded-[10px] text-2xl font-bold cursor-pointer hover:bg-[#84baf0]"
          >
            restart
          </button>
        </div>
      ) : (
        <div
          className={`w-full text-center py-6 rounded-[10px] ${
            isXTurn ? "bg-[#48D2FE]" : "bg-[#E2BE00]"
          }`}
        >
          <p className="text-2xl font-bold text-black mx-auto">
            {isXTurn ? "X" : "O"} turn
          </p>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
