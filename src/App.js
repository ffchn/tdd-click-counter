import { useState } from 'react'
import './App.css'

const App = () => {
  const [counter, setCounter] = useState(0)
  const [error, setError] = useState(false)
  const incrementCounter = () => {
    setCounter(counter + 1)
    setError(false)
  }

  const decrementCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1)
      return
    }

    setError(true)
  }

  return (
    <div className='App' data-test='app-component'>
      <h1>Counter App!</h1>
      <h2 data-test='counter-display'>{counter}</h2>
      {!!error && (
        <p data-test='error-message'>Impossible to decrement below zero!</p>
      )}
      <button data-test='decrement-button' onClick={decrementCounter}>
        Decrement
      </button>
      <button data-test='increment-button' onClick={incrementCounter}>
        Increment
      </button>
    </div>
  )
}

export default App
