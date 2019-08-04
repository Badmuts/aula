import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Icon from './Icon'
import { fadeInUp } from '../styles/animations';

const Center = styled.div`
    background-color: ${props => props.theme.colors.background};

    @media only screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
        & {
            width: 360px;
            border-radius: 10px;
            box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.15);
            position: absolute;
            top: 100%;
            right: 0;
            animation: 600ms ${fadeInUp} cubic-bezier(0.19, 1, 0.22, 1);
            z-index: 1;
            border: 1px solid rgba(0 ,0, 0, 0.1);
            padding-bottom: 20px;
        }
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        & {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: ${props => props.theme.colors.background};
            box-sizing: border-box;
            flex-direction: column;
            animation: 300ms ${fadeInUp} cubic-bezier(0.19, 1, 0.22, 1);
        }
    }
`

const HEADER_HEIGHT = `52px`;

const Header = styled.div`
    border-bottom: 2px solid ${props => props.theme.colors.gray};
    height: ${HEADER_HEIGHT};
    position: relative;
    margin: auto 20px;
`

const Title = styled.h1`
    display: block;
    font-weight: 600;
    position: absolute;
    text-align: center;
    width: 100%;
    line-height: ${HEADER_HEIGHT};
    z-index: 1;
`

const Button = styled.button`
    float: right;
    font-size: 16px;
    padding: 0;
    -webkit-appearance: none;
    margin: 0;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    line-height: ${HEADER_HEIGHT};
    color: ${props => props.theme.colors.primary};
    position: relative;
    z-index: 2;
`

const Wrapper = styled.div`
    position: relative;
    visibility: hidden;
    display: none;

    ${props => props.isOpen === true && css`
        visibility: visible;
        display: block;
    `}

    @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
        & {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10;
            width: 100%;
            height: 100%;
        }
    }
`

const Body = styled.div`

`

const EmptyState = styled.div`
    margin-bottom: 20px;

    ${Icon} {
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 15px;
        border-radius: 100%;
        width: 60px;
        height: 60px;
        background-color: ${props => props.theme.colors.blue};
        padding: 30px;
    }

    p {
        color: rgba(0, 0, 0, .5);
    }
`

const List = styled.div``
const Item = styled.div``

export default function NotificationCenter({ isOpen, onClose, onOpen, ...props }) {
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

    const icon = useRef(null)

    return (
        <Icon>
            <img src="/static/icons/notification.svg" alt="Notification bell" ref={icon} onClick={(e) => {
                if (e.target === icon.current) {
                    onOpen()
                }
            }}/>
            <Wrapper isOpen={isOpen}>
                <Center>
                    <Header>
                        <Title>Notifications</Title>
                        <Button onClick={onClose}>Done</Button>
                    </Header>
                    <Body>
                        <EmptyState>
                            <Icon><img src="/static/icons/notification.svg" alt="Notification bell"/></Icon>
                            <p>No new notifications</p>
                        </EmptyState>
                    </Body>
                </Center>
            </Wrapper>
        </Icon>
    )
}
