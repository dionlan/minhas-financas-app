import React from 'react'
/*
ArrowFunction
*/
const selectMenu = (props) => {
    console.log(props.lista)
    const options = props.lista.map((option, index) => {
        return( 
            <option key={index} value={option.value}> {option.label} </option>
        )
    })
 
    return(
        <select className='form-label mt-4' {...props}>
            {options}
        </select>
    )
}
export default selectMenu