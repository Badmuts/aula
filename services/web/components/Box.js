import styled, { css } from 'styled-components'

const Box = styled.div`
    display: flex;
    margin: auto 20px;
    margin-bottom: 10px;
    flex-direction: column;

    ${props => props.center && css`
        align-items: center;
    `}

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            /* margin: auto 360px; */
            margin: auto auto;
            width: 640px;
        }
    }
`

export default Box
