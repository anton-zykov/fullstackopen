import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/Filter'
import { CountryList } from './components/CountryList'
import { CountryData } from './components/CountryData'

const App = () => {
  const [data, setDataOnStart] = useState() 
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setDataOnStart(response.data)
    })
  }, [])

  const [filterName, setFilterName] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [primaryCountry, setPrimaryCountry] = useState('')

  useEffect(() => {
    if (filterName === '') {
      setFilteredCountries([])
      setPrimaryCountry('')
    }
    else setFilteredCountries(data.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase())))
  }, [data, filterName])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setPrimaryCountry(filteredCountries[0])
    }
  }, [filteredCountries])

  const handleFilterChange = (event) =>
    setFilterName(event.target.value)

  return (
    <div>
      <Filter 
        filterName={filterName} 
        handleFilterChange={handleFilterChange} />
      <CountryList 
        filteredCountries={filteredCountries} 
        setPrimaryCountry={setPrimaryCountry} />
      <CountryData
        primaryCountry={primaryCountry} />
    </div>
  )
}

export default App
