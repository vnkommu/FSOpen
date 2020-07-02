import React from 'react'

const ErrorNotif = ({msg}) => {
    if (msg === null) {return null }

    const notifStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    return (
        <div style={notifStyle}>
            {msg}
        </div>
    )    
}

export default ErrorNotif