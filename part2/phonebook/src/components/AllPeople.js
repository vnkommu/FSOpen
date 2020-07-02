import React from 'react'

const AllPeople = ({persons, deletePerson}) => {
    return (
        <>
            {persons.map(person => 
            <p key={person.name}>
                {person.name} {person.number} 
                <button onClick = {()=>deletePerson(person.id)}> delete </button>
            </p>
            )}
        </>
    )
}

export default AllPeople