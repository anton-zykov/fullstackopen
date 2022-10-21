import React from 'react'

const Header = ({ course }) => 
  <h1>{course.name}</h1>

const Total = ({ parts }) =>  
  <p>
    <b>total of {parts.reduce((sum, currentPart) => sum + currentPart.exercises, 0)} exercises</b>
  </p>

const Part = ({ part }) => 
  <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
    <Total parts={parts} />
  </div>

const Course = ({ course }) =>
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
  </div>

export default Course