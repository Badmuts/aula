import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import cookies from 'next-cookies'
import * as AuthService from '../services/auth'

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
`;

export default class MyApp extends App {
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
                <ThemeProvider theme={theme}>
                    <>
                        <GlobalStyle />
                        <Component {...pageProps} />
                    </>
                </ThemeProvider>
            </Container>
        );
    }
}
