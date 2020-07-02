import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import AllPeople from './components/AllPeople'
import personServ from './services/persons'
import SuccessNotif from './components/SuccessNotif'
import ErrorNotif from './components/ErrorNotif'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  const [sucMsg, setSucMsg] = useState(null) 
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    personServ
      .getAll()
      .then(curPersons => {
        setPersons(curPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNum
    }

    if (!persons.some(p => p.name === newName)) {
      personServ 
        .create(personObj)
        .then(retPerson => {
          setPersons(persons.concat(retPerson))
          setSucMsg(`Added ${newName}`)
          setTimeout(() => {
            setSucMsg(null)
          }, 5000)
          setNewName('')
          setNewNum('')
        })
    }
    else {
      const msg = `${newName} is already included in the phonebook. Replace the old number with a new one?`
      const pers = persons.find(p => p.name === newName)
      if (window.confirm(msg)) {
        personServ
          .updateNum(pers.id, personObj)
          .then(retPerson => {
            setPersons(persons.map(p => p.id !== pers.id ? p : retPerson))
            setSucMsg(`Changed the phone number of ${newName}`)
            setTimeout(() => {
            setSucMsg(null)
          }, 5000)
          })
          .catch(error => {
            setErrMsg(`${newName} has already been removed from phonebook`)
            setTimeout(() => {
              setErrMsg(null)
            }, 5000)
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
      setNewName('')
      setNewNum('')
    }
  }

  const deletePerson = id => {
    const pers = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${pers.name}?`)) { 
      personServ
        .deleteObj(id)
        .then(retPerson => {
          setPersons(persons.filter(person => person.id !== retPerson.id))
          setSucMsg(`Removed ${pers.name} from phonebook`)
            setTimeout(() => {
            setSucMsg(null)
          }, 5000)
        })
    }
  }

  const handleNumChange = event => setNewNum(event.target.value)

  const handleSearchChange = event => setSearch(event.target.value)


  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter value={search} onChange={handleSearchChange} persons={persons}/>
      <SuccessNotif msg={sucMsg} />
      <ErrorNotif msg = {errMsg} />
      <h2>Add New Person</h2>
      <AddPerson addPerson={addPerson} newName={newName} newNum={newNum}
      handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>
      <h2>All Numbers</h2>
      <AllPeople persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
