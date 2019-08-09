import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import cookies from 'next-cookies'
import * as AuthService from '../services/auth'
import Head from "next/head";
import Router from "next/router";
import NProgress from 'nprogress'
import NotificationCenterContext from "../components/NotificationCenter/NotificationCenterContext";

let timer = null
NProgress.configure({ showSpinner: false });

const routeChangeStart = () => {
    clearTimeout(timer);
    timer = setTimeout(NProgress.start, 300);
}

const routeChangeEnd = () => {
    clearTimeout(timer);
    NProgress.done();
}

Router.events.on('routeChangeStart', routeChangeStart);
Router.events.on('routeChangeComplete', routeChangeEnd);
Router.events.on('routeChangeError', routeChangeEnd);

const colors = {
    blue: "#0070f3"
};

const theme = {
    colors: {
        primary: colors.blue,
        background: "rgb(250, 250, 250)",
        text: "rgb(0, 0, 0)",

        gray: "rgba(0, 0, 0, 0.06)",
        darkgray: "rgba(0, 0, 0, 0.12)",
        blue: '#DEF1EF',
        pink: '#F4E3EC',
        green: '#DFF8DE',
    },
    breakpoints: {
        mobile: '480px',
        tablet: '1024px',
        desktop: '1280px'
    },
    fonts: {
        system: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol"
        ],
        serif: ["Georgia", "serif"]
    }
};

const GlobalStyle = createGlobalStyle`
    @import url('https://rsms.me/inter/inter.css');
    ${reset}

    html {
        font-family: ${props => props.theme.fonts.system.join(', ')};
    }

    @supports (font-variation-settings: normal) {
        html {
            font-family: ${props => ['Inter var', ...props.theme.fonts.system].join(', ')};
        }
    }

    body {
        background-color: ${props => props.theme.colors.background};
        letter-spacing: -0.004em;
        font-weight: 400;
        margin: 0;
    }

    strong {
        font-weight: 600;
    }

    pre {
        border: 1px solid #dedede;
        font-family: monospace;
        font-size: 14px;
        background-color: #fdfdfd;
        padding: 15px;
        border-radius: 6px;
        line-height: 1.2;
        margin-bottom: 10px;
        white-space: pre-wrap;
    }

    ::selection {
        background: #FFE433;
        color: #000;
        text-shadow: none;
    }

    /* Make clicks pass-through */
    #nprogress {
        pointer-events: none;
    }

    #nprogress .bar {
        background: #29d;

        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;

        width: 100%;
        height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #29d, 0 0 5px #29d;
        opacity: 1;

        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
    }

    #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: #29d;
        border-left-color: #29d;
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
        position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes nprogress-spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const { accessToken, refreshToken } = cookies(ctx)
        AuthService.setTokenPair({ accessToken, refreshToken })

        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Head>
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <title>Aula</title>
                    <meta name="viewport" content="width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                    <NotificationCenterContext.Provider>
                        <>
                            <GlobalStyle />
                            <Component {...pageProps} />
                        </>
                    </NotificationCenterContext.Provider>
                </ThemeProvider>
            </Container>
        );
    }
}

export default MyApp
