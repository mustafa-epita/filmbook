import React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button<{color: string, minimal: boolean}>`
  display: inline-flex;
  border: solid 1px transparent;
  outline: none !important;
  user-select: none;
  cursor: pointer;
  padding: 12px 20px;
  ${({minimal, color}) => minimal 
    ? css`
      border-color: #989AAD;
      background: transparent;
      color: ${color ? color : "#989AAD"};
    ` 
    : css`
      background: ${color ? color : "#989AAD"};
      color: white;
    `}
  font-size: 14px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:disabled {
    opacity: .5;
  }
`
interface ButtonProps extends React.ButtonHTMLAttributes<ButtonProps> {
  color?: string, 
  minimal?: boolean
}

const Button: React.FunctionComponent<ButtonProps> = ({children, color, minimal, ...props}: any) => {
  return (
    <StyledButton color={color} minimal={minimal} {...props}>{children}</StyledButton>
  )
}

export default Button