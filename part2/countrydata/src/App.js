import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Show = ({country}) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      {country.languages.map(lang => <p key={country.name}>{lang.name}</p>)}
      <img src={country.flag} alt="Country flag" width="200" height="200"/>       
    </>
  )
} // end



const SearchResults = ({data, search, setView}) => {


  const handleShow = (e) => {
    e.preventDefault()
    setView(e.target.value)
  }

  if (data.length > 10) {
    setView('')
    return (
      <p>Too many matches, specify another filter.</p>
    )
  }
  else if (data.length <= 10 && data.length > 1) {
    return (
      <>
        {data.map(d => 
        <p key={d.name}>
          {d.name} <button onClick={handleShow} value={d.name}>show</button>
        </p>
        )}
      </>
    )
  }
  else if (data.length === 1) {
    setView(data[0].name)
    return null
  }
  else
    setView('')
    return null
} // end



const ShowResult = ({view, data}) => {
  if (view !== '') {
    const country = data.find(d=>d.name===view)
    return <Show country={country}/>
  }
  else
    return null
} // end




const App = () => {
  const [search, setSearch] = useState('')
  const handleSearchChange = event => setSearch(event.target.value)
  const [data, setData] = useState([])
  const [view, setView] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData((response.data).filter(country =>
          country.name.toLowerCase().includes(search.toLowerCase())
        ))
      })
  }, [search])

  return (
    <div>
      <h4>Find Countries</h4>
      <input value={search} onChange={handleSearchChange}/>
      <SearchResults data={data} search={search} setView={setView}/>
      <ShowResult view={view} data={data}/>
    </div>
  )
} // end

export default App