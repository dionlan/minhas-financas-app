import React, { useContext } from 'react'
import { UserContext } from './UserContext'

const Form = () => {
    const user = useContext(UserContext)

    return(
        <div className='form-group'>
            <label className='form-label mt-4'> Update Name: </label>
                <input className='form-control' onChange={e => user.setName(e.target.value)} placeholder='Name...' />

            <div className='form-group'>
                <label className='form-label mt-4'> Update Location: </label> 
                    <input className='form-control' onChange={e => user.setLocation(e.target.value )} placeholder='Location...' />
            </div>
        </div>
    )
}

export default Form