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
    const newBoard=[...board]
    newBoard[index]=turn; 
    setBoard(newBoard);
    updateBoard(index); 
  }
  return (
    <div onClick={handleClick } className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard]=useState(Array(9).fill(null));
  const [turn, setTurn]=useState(turns.X)
  const updateBoard=()=>{
    const newTurn = turn == turns.O ? turns.X : turns.O; 
    setTurn(newTurn);
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
            </Square>
          )
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn==turns.X}>{turns.X}</Square>
        <Square isSelected={turn==turns.O}>{turns.O}</Square>
      </section>
    </main>
  );
}

export default App
