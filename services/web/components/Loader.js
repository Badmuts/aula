import React from 'react'
import styled, { keyframes } from 'styled-components'

const loader = keyframes`
    0%, 40%, 100% {
        transform: scaleY(0.4);
    }  20% {
        transform: scaleY(1.0);
    }
`

const Loader = styled.div`
    margin: 100px auto;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;

    & > div {
        box-sizing: border-box;
        background-color: #dbefe2;
        height: 100%;
        width: 6px;
        margin-right: 2px;
        display: inline-block;
        animation: ${loader} 1.2s infinite ease-in-out;
    }

    & .rect2 {
        animation-delay: -1.1s;
    }

    & .rect3 {
        animation-delay: -1.0s;
    }

    & .rect4 {
        animation-delay: -0.9s;
    }

    & .rect5 {
        animation-delay: -0.8s;
    }
`

export default () => {
    return (
        <Loader className="loader">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </Loader>
    )
}
