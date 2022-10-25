const CountryLine = ({ country, setPrimaryCountry }) => 
  <p>{country.name.common} <button type="button" onClick={() => setPrimaryCountry(country)}>show</button></p>


const TooManyCountriesSubstite = () =>
  <p>Too many matches, please specify your request</p>

const NoCountriesSubstite = () =>
  <p>No countries found</p>

const CountryList = ({ filteredCountries, setPrimaryCountry }) => {
  if (filteredCountries.length > 10) return <TooManyCountriesSubstite />
  else if (filteredCountries.length === 0) return <NoCountriesSubstite />
  else if (filteredCountries.length === 1) {}
  else {
    return filteredCountries.map(country => <CountryLine key={country.name.common} country={country} setPrimaryCountry={setPrimaryCountry} />)
  }
}

export { CountryList }