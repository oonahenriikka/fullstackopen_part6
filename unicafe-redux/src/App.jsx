import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const good = useSelector(state => state.good)
  const ok = useSelector(state => state.ok)
  const bad = useSelector(state => state.bad)


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>Good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>Ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>Reset stats</button>

      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Ok: {ok}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default App
