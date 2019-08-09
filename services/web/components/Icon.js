import styled from 'styled-components'

const Icon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 48px;
    text-align: center;
    background-color: ${props => props.theme.colors[props.color] || props.theme.colors.green};
    padding: 22px;
    align-self: center;
    /* position: relative; */

    img {
        width: 100%;
    }
`

export default Icon
