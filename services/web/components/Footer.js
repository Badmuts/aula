import styled from 'styled-components'
import { darken } from 'polished';

const Footer = styled.div`
    padding: 16px 0;
    border-top: 1px solid ${props => props.theme.colors.darkgray};

    p {
        display: inline-block;
    }

    nav {
        display: inline-block;
        float: right;

        a {
            font-weight: 600;
            color: #000;
            text-decoration: none;
            transition: color 175ms ease-in-out;

            &:hover {
                color: ${darken(0.35, '#94F87E')};
            }
        }
    }
`

export default Footer