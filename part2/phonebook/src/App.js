import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) =>
  <p>filter shown with <input value={props.filterName} onChange={props.handleFilterChange} /></p>

const PersonForm = (props) => (
  <form onSubmit={props.addNameNumber}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const NamePhoneLine = ({ name, number }) =>
  <p>{name} {number}</p>

const Persons = ({ filteredPersons }) => 
  filteredPersons.map((person) => <NamePhoneLine key={person.name} name={person.name} number={person.number} />)

const App = () => {
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addNameNumber = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length === 0) {
      const newPersonObject = {
        name: newName, 
        number: newNumber
      }
      const copyPersons = persons.concat(newPersonObject)
      setPersons(copyPersons)
      setFilteredPersons(copyPersons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => 
    setNewName(event.target.value)

  const handleNumberChange = (event) => 
    setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    const v = event.target.value
    setFilterName(v)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(v.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterName={filterName}
        handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addNameNumber={addNameNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App