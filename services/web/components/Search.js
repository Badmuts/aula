import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { fadeInUp } from '../styles/animations';

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
    z-index: 2;
    position: relative;

    &:focus {
        background-color: #fff;
        outline: none;
    }
`

const SearchResults = styled.div`
    background-color: ${props => props.theme.colors.background};
    border-radius: 10px;
    min-height: 420px;
    width: 100%;
    position: absolute;
    z-index: 2;
    margin-top: 10px;
    visibility: visible;
    animation: 600ms ${fadeInUp} cubic-bezier(0.19, 1, 0.22, 1);
    padding: 15px;
    box-sizing: border-box;

    ${props => !props.isOpen && css`
        display: none;
        visibility: hidden;
    `}
`

const Overlay = styled.div`
    background-color: rgb(0, 0, 0);
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: opacity 600ms ease-in-out;

    ${props => !props.isOpen && css`
        display: none;
        visibility: hidden;
        opacity: 0;
    `}

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            background-color: ${props => props.theme.colors.background};
            opacity: 1;
        }
    }
`

const Container = styled.div`
    position: relative;

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            flex-grow: 1;
            flex-basis: 100%;
            order: 4;

            ${props => props.isOpen === true && css`
                animation: 600ms ${fadeInUp} cubic-bezier(0.19, 1, 0.22, 1);
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                box-sizing: border-box;
                margin: 5px 20px;
            `}
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

const CancelButton = styled.button`
    float: right;
    font-size: 17px;
    padding: 0;
    -webkit-appearance: none;
    margin: 0;
    background-color: transparent;
    border: none;
`

export default function Search(props) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc)
        return () => document.removeEventListener('keydown', closeOnEsc);
    })

    const ESCAPE_KEY = 27
    function closeOnEsc(e) {
        if (e.keyCode === ESCAPE_KEY) {
            setIsOpen(false)
        }
    }

    return <Container isOpen={isOpen} onClick={() => {
        if (!isOpen) {
            setIsOpen(true)
        }
    }}>
        <SearchBox {...props} type="search" />
        <SearchResults isOpen={isOpen} {...props} />
        <Overlay isOpen={isOpen} onClick={() => {
            setIsOpen(false)
        }} />
    </Container>
}
