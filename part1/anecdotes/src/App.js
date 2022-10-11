import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))
  const [winner, setWinner] = useState(0)

  const randomState = () => setSelected(Math.floor(Math.random() * 7))
  
  const castVote = () => {
    const copy = [...points]
    copy[selected] += 1
    if (copy[selected] > points[winner]) setWinner(selected)
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      
      {anecdotes[selected]} <br />
      has {points[selected]} votes <br />

      <button onClick={castVote}>vote</button>
      <button onClick={randomState}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[winner]} <br />
      has {points[winner]} votes
    </div>
  )
}

export default App