import React from 'react'

function FormGroup(props){
    return(
        <div className="form-group">
            <label className="form-label mt-2" htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>          
    )
}
export default FormGroup