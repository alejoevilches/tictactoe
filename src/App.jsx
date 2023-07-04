import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const turns={
  X:"X",
  O:"O"
};

const Square=({children, isSelected, updateBoard, index})=>{
  const className=`square ${isSelected ? "is-selected" : ""}`
  const handleClick=()=>{
    updateBoard(index);
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const checkWinner=(boardToCheck)=>{
  for (const combos of WINNER_COMBOS){
    const [a,b,c]=combos;
    if (boardToCheck[a] && boardToCheck[a]==boardToCheck[b] && boardToCheck[a]==boardToCheck[c]){
      return boardToCheck[a];
    }
  }
  return null
}

function App() {
  const [board, setBoard]=useState(Array(9).fill(null));
  const [turn, setTurn]=useState(turns.X)
  const [winner, setWinner] = useState(null);
  const updateBoard=(index)=>{
    if (board[index] || winner) return;
    const newTurn = turn == turns.O ? turns.X : turns.O; 
    setTurn(newTurn);
    let newBoard=[...board];
    newBoard[index]=turn;
    setBoard(newBoard);
    const newWinner=checkWinner(newBoard);
    if (newWinner){
      setWinner(newWinner);
      alert(`El ganador es ${turn}`)
    }
  }
  const resetGame=()=>{
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {board.map((cell,index)=>{
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}>
                {cell}
            </Square>
          )
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn==turns.X}>{turns.X}</Square>
        <Square isSelected={turn==turns.O}>{turns.O}</Square>
      </section>
      {
        winner!=null && (
          <section className='winner'>
            <div className="text">
              <h2>{winner == false ? "Empate" : `El ganador es:`}</h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
            </div>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </section>
        )
      }
    </main>
  );
}

export default App
