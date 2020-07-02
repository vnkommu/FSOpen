import React from 'react'

const SuccessNotif = ({msg}) => {
    if (msg === null) {return null }

    const notifStyle = {
        color: 'green',
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

export default SuccessNotif