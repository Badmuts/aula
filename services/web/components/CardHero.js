import styled from 'styled-components'
import Title from './Title'

const CardHero = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: 16px;
    background-color: ${props => props.theme.colors[props.color] || props.theme.colors.blue};
    background-image: url(${props => props.src});
    background-size: 120%;
    background-position: bottom;
    background-repeat: no-repeat;
    height: 182px;
    padding: 16px 20px;
    margin-bottom: 12px;
    transition: transform 125ms ease-in-out;
    cursor: pointer;

    ${Title} {
        margin-top: 0;
        line-height: 1.4em;
        font-size: 1.6em;
    }


    &:hover {
        transform: scale(1.025);
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            height: 148px;
        }
    }
`

export default CardHero
