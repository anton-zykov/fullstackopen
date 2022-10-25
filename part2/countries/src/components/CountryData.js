const CountryData = ({ primaryCountry }) => {
  if (primaryCountry === '') return <></>
  else {
    return (
      <div>
        <h2>{primaryCountry.name.common}</h2>
        <p>Capital: {primaryCountry.capital}</p>
        <p>Area: {primaryCountry.area} sq. km.</p>

        <h3>Languages:</h3>
        {Object.values(primaryCountry.languages).map(lang => <li key={lang}>{lang}</li>)}

        <img src={primaryCountry.flags.png} alt={`${primaryCountry.name.common} flag`} />
      </div>
    )
  }
}

export { CountryData }