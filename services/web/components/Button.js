import styled, { css } from 'styled-components'
import { darken } from 'polished'

const Button = styled.button`
    background-color: rgba(0,0,0,0.06) !important;
    border: none;
    color: #000;
    display: inline-block;
    font-size: 16px !important;
    font-weight: 600;
    height: 48px;
    letter-spacing: -0.008em;
    line-height: 18px;
    padding: 11px 16px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: all 150ms ease-in-out;
    border-radius: 10px;
    outline: none;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: rgba(0,0,0,0.1) !important;
    }

    ${props => props.brand === 'google' && css`
        background-color: #6ABFF8 !important;
        color: #fff;

        &:hover:not(:disabled) {
            background-color: ${darken(0.2, '#6ABFF8')} !important;
        }
    `}

    ${props => props.brand === 'office365' && css`
        background-color: #E54910 !important;
        color: #fff;

        &:hover:not(:disabled) {
            background-color: ${darken(0.1, '#E54910')} !important;
        }
    `}

    ${props => props.primary && css`
        background-color: ${props => darken(0.45, props.theme.colors.green)} !important;
        color: #fff;

        &:hover:not(:disabled) {
            background-color: ${props => darken(0.5, props.theme.colors.green)}  !important;
        }
    `}
`

export default Button
