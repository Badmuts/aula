import styled from 'styled-components'

const Brand = styled.div`
    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            order: 1;
        }
    }
`

export default Brand
