import React from 'react'

const Filter = ({value, onChange, persons}) => {
    return (
        <>
            <input value={value} onChange={onChange}/>
            {persons.map(person => 
                <p key={person.name}> {person.name.toLowerCase().includes(value.toLowerCase()) && value !== '' ? 
                        `${person.name} ${person.number}`:''}
                </p>
            )}
        </>
    )
}

export default Filter