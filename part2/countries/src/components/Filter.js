const Filter = ({ filterName, handleFilterChange}) =>
  <p>Find countries <input value={filterName} onChange={handleFilterChange} /></p>

export { Filter }