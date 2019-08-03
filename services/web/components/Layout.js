import styled from 'styled-components'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            max-width: 1382px;
        }
    }
`

export default Layout
