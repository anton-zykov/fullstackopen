const NamePhoneLine = ({ person, deletePerson }) =>
  <p>{person.name} {person.number} <button type="button" onClick={deletePerson(person)}>delete</button></p>

const Persons = ({ filteredPersons, deletePerson }) => 
  filteredPersons.map(person => <NamePhoneLine key={person.name} person={person} deletePerson={deletePerson} />)

export { Persons }