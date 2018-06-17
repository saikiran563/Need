import React from 'react'
import styled from 'styled-components'

const InputWrap = styled.input`
    ${props => props.valid === false && `border-bottom: 2px solid red !important;`};
    ${props => props.valid === true && `border-bottom: 2px solid green !important;`};
    ${props => props.touched === false && `border-bottom: 2px solid black !important;`};
`;

const InputField = (props) => {
    return (
        <InputWrap {...props}
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e) => props.handleOnChange(e)} />
    )
}


export default InputField
