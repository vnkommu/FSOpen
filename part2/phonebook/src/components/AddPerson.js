import React from 'react'

const AddPerson = ({addPerson, newName, newNum, handleNameChange, handleNumChange}) => {
    return (
        <>
            <form onSubmit={addPerson}>
                <div>
                Name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                Number: <input value={newNum} onChange={handleNumChange}/>
                </div>
                <div>
                <button type="Submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddPerson