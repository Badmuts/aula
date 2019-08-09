import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
import SearchBox from './SearchBox'
import Brand from './Brand'
import Avatar from './Avatar';
import Gravatar from './Gravatar';
import Icon from './Icon';
import Title from './Title';
import { slideInLeft, fadeInUp } from '../styles/animations';

export const Menu = styled.div`
    display: none;
    visibility: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.background};
    box-sizing: border-box;
    padding: 15px 20px;
    flex-direction: column;

    & ${Gravatar} {
        width: 128px !important;
        height: 128px !important;
        border-radius: 128px;
        margin-bottom: 20px;
        order: unset !important;
        align-self: center;
    }

    & label {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.5);
    }

    & ul {
        list-style: none;
        margin: 0;
    }

    & li {
        padding: 15px 10px;
        border-bottom: 1px solid #dedede;
    }

    & li:last-child {
        border-bottom-color: transparent;
    }

    & ul ${Icon} {
        display: inline-block;
        width: 17px;
        height: 17px;
        margin-right: 20px;
    }

    ${Title} {
        text-align: center;
        margin: 0;
        margin-bottom: 20px;
        line-height: 1;
    }

    .close {
        width: 30px;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        font-size: 23px;
        text-align: center;
        line-height: 28px;
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
        & {
            right: 0;
            width: 380px;
        }
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        & {
            width: 100%;
            left: 0;
            right: 0;
            position: fixed;
        }
    }
`

const StyledUserMenu = styled.div`
    cursor: pointer;

    ${props => props.isOpen && css`
        ${Menu} {
            display: flex;
            visibility: visible;
            z-index: 10;
            animation: 300ms ${slideInLeft} cubic-bezier(0.19, 1, 0.22, 1);
        }

        @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
            ${Menu} {
                animation: 300ms ${fadeInUp} cubic-bezier(0.19, 1, 0.22, 1);
            }
        }
    `}
`

const Overlay = styled.div`
    background-color: black;
    transition: opacity 75ms ease-in-out;
    opacity: 0;

    ${props => props.isOpen && css`
        & {
            opacity: 0.2;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 1;
        }
    `}
`

export const UserMenu = ({ onClose, ...props }) => {
    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc)
        return () => document.removeEventListener('keydown', closeOnEsc);
    })

    const ESCAPE_KEY = 27
    function closeOnEsc(e) {
        if (e.keyCode === ESCAPE_KEY) {
            onClose()
        }
    }

    const overlay = useRef(null)

    return (
        <>
            <Overlay ref={overlay} isOpen={props.isOpen} onClick={e => {
                if (e.target === overlay.current) {
                    onClose()
                }
            }} />
            <StyledUserMenu {...props} />
        </>
    )
}

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    /* min-height: 68px; */
    margin: 8px 20px;

    a {
        text-decoration: none;
        font-size: 17px;
        color: ${props => props.theme.colors.text};
        letter-spacing: -0.004em;
        cursor: pointer;
    }

    ${Avatar}, ${Gravatar} {
        width: 28px;
        height: 28px;
    }

    ${Icon} {
        background-color: transparent;
        width: 24px;
        display: flex;
        padding: 0;
        margin: auto;
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        /* justify-content: space-between; */
        .sign-in {
            margin-right: 20px;
            font-weight: 600;
            order: 3;
        }
        .join {
            order: 4;
            background-color: ${props => darken(0.45, props.theme.colors.green)};
            border-radius: 20px;
            padding: 12px 18px;
            color: white;
            transition: all 150ms ease-in-out;

            &:hover {
                background-color: ${props => darken(0.5, props.theme.colors.green)};
            }
        }

        ${Icon} {
            order: 5;
        }

        ${StyledUserMenu} {
            order: 6;
        }

        ${Avatar}, ${Gravatar} {
            margin-left: 20px;
            width: 38px;
            height: 38px;
        }

    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        .sign-in {
            flex: 1;
            order: -1;
        }
        .join {
            flex: 1;
            order: 3;
            text-align: right;
        }

        ${Brand} {
            text-align: center;
            order: 2;
            flex: 1;
        }

        & { justify-content: space-evenly; }

        ${Avatar}, ${Gravatar}, ${StyledUserMenu}, ${StyledUserMenu} { order: -2; }
        ${Icon} { order: 3; }
    }
`

export default Nav
