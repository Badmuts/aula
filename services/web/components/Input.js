import styled from 'styled-components'

const Input = styled.input`
    background-color: rgba(0,0,0,0.06) !important;
    border: none;
    color: #000;
    display: inline-block;
    font-size: 17px !important;
    font-weight: 600;
    height: 48px;
    letter-spacing: -0.008em;
    line-height: 18px;
    padding: 0 18px;
    border-radius: 12px;
    transition: all 150ms ease-in-out;
    outline: none;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: rgba(0,0,0,0.1) !important;
    }
`

export default Input
