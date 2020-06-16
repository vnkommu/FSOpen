import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({text, values}) => {
  if ((text==="NoFeedback") && (values.good+values.bad+values.neutral===0)) {
    return (
      <>
        <p>No feedback given yet.</p>
      </>
    )
  }
  if (values.good+values.bad+values.neutral===0) {
    return (
      <>
      </>
    )
  }
  if (text === "good") {
    return (
      <>
        <tr>
          <td>Good</td>
          <td>{values.good}</td>
        </tr>
      </>
    )
  }
  if (text === "bad") {
    return (
      <>
        <tr>
          <td>Bad</td>
          <td>{values.bad}</td>
        </tr>
      </>
    )
  }
  if (text === "neutral") {
    return (
      <>
        <tr>
          <td>Neutral</td>
          <td>{values.neutral}</td>
        </tr>
      </>
    )
  }
  if (text === "total") {
    return (
      <>
        <tr>
          <td>Total</td>
          <td>{values.neutral+values.bad+values.good}</td>
        </tr>
      </>
    )
  }
  if (text === "average") {
    return (
      <>
        <tr>
          <td>Average</td>
          <td>{(-1*values.bad+values.good)/(values.neutral+values.bad+values.good)}</td>
        </tr>
      </>
    )
  }
  if (text === "positive") {
    return (
      <>
        <tr>
          <td>Positive</td>
          <td>{((values.good)/(values.neutral+values.bad+values.good))*100}</td>
        </tr>
      </>
    )
  }
  return (
    <>
    </>
  )
}

const incrementVal = (val, func) => () => {
  func(val+1); 
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const values = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h2> Give Feedback </h2>
      <Button handleClick ={incrementVal(good, setGood)} text = "Good"/>
      <Button handleClick = {incrementVal(neutral, setNeutral)} text = "Neutral"/>
      <Button handleClick={incrementVal(bad, setBad)} text = "Bad"/>
      <h2> Statistics </h2>
      <table>
        <tbody>
          <Statistics text = "good" values = {values}/>
          <Statistics text = "neutral" values = {values}/>
          <Statistics text = "bad" values = {values}/>
          <Statistics text = "total" values = {values}/>
          <Statistics text = "average" values = {values}/>
          <Statistics text = "positive" values = {values}/>
        </tbody>
      </table>
      <Statistics text = "NoFeedback" values={values}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
