import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  border: solid 1px white;
  border-radius: 16px;
  padding: 12px 20px;
  outline: none;
  width: 100%;
  color: white;
  background: transparent;

  &::placeholder {
    color: #989AAD;
  }
`

const Input: any = React.forwardRef<HTMLInputElement, any>(
    (props, ref) => {
    return (
      <StyledInput {...props} ref={ref}/>
    )
  }
);
export default Input