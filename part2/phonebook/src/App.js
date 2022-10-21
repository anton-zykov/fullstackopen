import { useState, useEffect } from 'react'
import dataService from './services/server-communication'
import './index.css'

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

const NamePhoneLine = ({ person, deletePerson }) =>
  <p>
    {person.name} {person.number} <button type="button" onClick={deletePerson(person)}>delete</button>
  </p>

const Persons = ({ filteredPersons, deletePerson }) => 
  filteredPersons.map(person => <NamePhoneLine key={person.name} person={person} deletePerson={deletePerson} />)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  useEffect(() => {
    dataService
      .getAll()
      .then(allPhones => {
        setPersons(allPhones)
        setFilteredPersons(allPhones)
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const addNameNumber = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length === 0) {
      const newPersonObject = {
        name: newName, 
        number: newNumber
      }
      dataService.create(newPersonObject)
        .then(() => dataService.getAll())
        .then(allPhones => {
          setPersons(allPhones)
          setFilteredPersons(allPhones.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))
          setSuccessMessage(`${newPersonObject.name} has been successfully added.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    else {
      if (window.confirm(`${newName} has already been added to the phonebook. Replace the old number with the new one?`)) {
        const oldPerson = persons.filter(person => person.name === newName)[0]
        dataService.update(oldPerson.id, { ...oldPerson, number: newNumber })
          .then(() => dataService.getAll())
          .then(allPhones => {
            setPersons(allPhones)
            setFilteredPersons(allPhones.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))
            setSuccessMessage(`${oldPerson.name}'s number has been successfully updated.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(`${oldPerson.name} has already been deleted.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
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

  const deletePerson = person => () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        dataService.deleteData(person.id)
        const copyPersons = persons.filter(p => p.id !== person.id)
        setPersons(copyPersons)
        setFilteredPersons(copyPersons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase())))
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterName={filterName}
        handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <PersonForm 
        addNameNumber={addNameNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons 
        filteredPersons={filteredPersons} 
        deletePerson={deletePerson} />
    </div>
  )
}

export default App