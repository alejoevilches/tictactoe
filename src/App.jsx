import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const turns={
  X:"X",
  O:"O"
}

const board=Array(9).fill(null);

function App() {
  return (
  <main className="board">
    <h1>Tic tac toe</h1>
    <section className="game">
      
    </section>
  </main>
  )
}

export default App
