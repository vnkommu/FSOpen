import React from 'react';

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    let tot = course.parts.reduce((tot, part) => tot + part.exercises, 0)
    return(
      <h4>Number of exercises {tot}</h4>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Course = ({ courses }) => {
    return (
      <>
        {courses.map(course => {
          return (
          <div key={course.id}>
            <Header name={course.name}/>
            {course.parts.map(part => <Part key={part.id} part={part}/> )}
            <Total course={course}/>
          </div>
          )
        })}
      </>
    )
  }

  export default Course