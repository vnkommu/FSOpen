import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const fetchRdm = (val, func) => {
  let rdm = Math.floor((Math.random() * 6));
  if (!(val===rdm)) {
    return () => func(rdm)
  }
  return fetchRdm(val, func); 
}

const incrVotes = (vals, idx, func) => {
  const copy = [...vals]
  copy[idx] += 1
  return (
    () => func(copy)
  )
}

const MostVoted = ({anecdotes, votes}) => {
  let maxVal = votes[0]; 
  let maxIdx = 0;
  for (var i = 1; i < votes.length; i++) {
    if (votes[i] > maxVal) {
      maxVal = votes[i]
      maxIdx = i
    }
  }
  return (
    <>
      <p>{anecdotes[maxIdx]}</p>
      <p>{votes[maxIdx]} votes</p>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0)); 

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p> {anecdotes[selected]}</p>
      <p>{votes[selected]} votes</p>
      <Button text="Vote" handleClick={incrVotes(votes, selected, setVotes)}/>
      <Button text="Next Anecdote" handleClick={fetchRdm(selected, setSelected)}/>
      <h2>Anecdote with Most Votes</h2>
      <MostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)