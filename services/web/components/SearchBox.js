import styled from 'styled-components'

const SearchBox = styled.input`
    width: 100%;
    padding: 9px 11px;
    padding-left: calc(11px + 22px);
    background-color: ${props => props.theme.colors.gray};
    background-image: url('/static/icons/search.svg');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position-y: 10px;
    background-position-x: 10px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    margin-top: 10px;
    -webkit-appearance: none;

    &:focus {
        background-color: #fff;
        outline: none;
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            flex-grow: 1;
            flex-basis: 100%;
        }
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            flex-grow: 1;
            width: auto;
            order: 2;
            margin: 0 240px;
        }
    }
`

export default SearchBox
