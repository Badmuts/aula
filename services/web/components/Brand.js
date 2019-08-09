import styled from 'styled-components'

const Brand = styled.div`
    cursor: pointer;
    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            order: 1;
        }
    }
`

export default Brand
