import { useState, useEffect } from 'react'
import dataService from './services/server-communication'
import './index.css'
import { PersonForm } from './components/PersonForm'
import { SuccessNotification, ErrorNotification } from './components/Notifications'
import { Persons } from './components/PhoneLines'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    dataService
      .getAll()
      .then(allPhones => {
        setPersons(allPhones)
        setFilteredPersons(allPhones)
      })
  }, [])

  useEffect(() => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))
  }, [persons, filterName])

  const addNameNumber = (event) => {
    event.preventDefault()
    const personWithANewName = persons.filter(person => person.name === newName)
    if (personWithANewName.length === 0) {
      const newPersonObject = {
        name: newName, 
        number: newNumber
      }
      dataService.create(newPersonObject)
        .then(() => {
          setPersons(persons.concat(newPersonObject))
          setSuccessMessage(`${newPersonObject.name} has been successfully added.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      if (window.confirm(`${newName} has already been added to the phonebook. Replace the old number with the new one?`)) {
        const oldPersonObject = personWithANewName[0]
        const newPersonObject = { ...oldPersonObject, number: newNumber }
        dataService.update(oldPersonObject.id, newPersonObject)
          .then(() => {
            setPersons(persons.map(person => person.id === oldPersonObject.id ? newPersonObject : person))
            setSuccessMessage(`${oldPersonObject.name}'s number has been successfully updated.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setErrorMessage(`${oldPersonObject.name} has already been deleted.`)
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

  const handleFilterChange = (event) =>
    setFilterName(event.target.value)

  const deletePerson = person => () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        dataService.deleteData(person.id)
        setPersons(persons.filter(p => p.id !== person.id))
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterName={filterName}
        handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <SuccessNotification message={successMessage} />
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