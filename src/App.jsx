import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import confetti from 'canvas-confetti'
import './App.css'
import { Square } from './components/Square.jsx'
import { turns, WINNER_COMBOS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board'

function App() {
  const [board, setBoard]=useState(()=>{
    const boardFromStorage=window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn]=useState(turns.X)
  const [winner, setWinner] = useState(null);

  const updateBoard=(index)=>{
    if (board[index] || winner) return;
    const newTurn = turn == turns.O ? turns.X : turns.O; 
    setTurn(newTurn);
    let newBoard=[...board];
    newBoard[index]=turn;
    setBoard(newBoard);
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(turn));
    const newWinner=checkWinner(newBoard);
    if (newWinner){
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)){
      setWinner(false);
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
      <button onClick={resetGame}>Reiniciar juego</button>
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
