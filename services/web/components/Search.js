import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { fadeInUp } from '../styles/animations';
import { lighten, darken, rgba } from 'polished';
import Loader from './Loader';
import Link from 'next/link';
import Highlighter from "react-highlight-words";

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
    -webkit-appearance: none;
    flex: 1;

    ${props => props.isOpen && css`
        z-index: 3;
    `}

    &:focus {
        outline: none;
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        &:focus {
            background-color: #fff;
        }
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

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            padding: 0;
            padding-top: 10px;
            position: relative;
            border-radius: 0;
        }
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            position: absolute;
        }
    }
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
                display: flex;
                flex-direction: column;
                overflow-y: scroll;

                ${SearchBox} {
                    z-index: 2;
                }
            `}
        }
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            flex-grow: 1;
            width: auto;
            order: 2;
            margin: 0 120px;
        }
    }
`

const CancelButton = styled.button`
    font-size: 17px;
    padding: 0;
    -webkit-appearance: none;
    margin-left: 15px;
    background-color: transparent;
    border: none;
    height: 100%;

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            display:none;
        }
    }
`

const Label = styled.span`
    display: block;
    width: 100%;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8em;
    color: ${lighten(0.6, '#000')};
`

const SearchList = styled.ul`
    list-style: none;
    margin-bottom: 20px;
`

const SearchItem = styled.li`
    padding: 15px 0;
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:last-child {
        border-bottom-color: transparent;
    }
`

const GradesList = styled(SearchList)`
    list-style: none;
    margin-bottom: 20px;
`

const GradeItem = styled(SearchItem)`
    flex: 1;

    p {
        width: 100%;
        flex: 1;
    }
`

const Grade = styled.span`
    font-weight: 600;
    font-size: 1.1em;
    flex: 0;
    margin: 0 10px;
`

const GradeIcon = styled.div`
    content: url('${props => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="${rgba(darken(0.55, props.theme.colors.green), 1)}" d="M15 9a3 3 0 0 0 3-3h2a5 5 0 0 1-5.1 5 5 5 0 0 1-3.9 3.9V17l5 2v1H4v-1l5-2v-2.1A5 5 0 0 1 5.1 11H5a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3V4H2v2H0V2h5V0h10v2h5v4h-2V4h-3v5z"/></svg>`}');
    width: 25px;
    padding: 6px;
    border-radius: 100%;
    background-color: ${props => props.theme.colors.green};
    box-sizing: border-box;
    margin-right: 10px;
`

const Chevron = styled.span`
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" ><path fill="rgba(0, 0, 0, .2)" d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>');
    width: 25px;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    z-index: 3;
    margin-top: 10px;
    width: 100%;
    align-items: center;
`

export default function Search({ isLoading, results, ...props}) {
    const [isOpen, setIsOpen] = useState(props.isOpen)
    const input = useRef(null)

    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc)
        document.addEventListener('keydown', openOnSlash)
        return () => {
            document.removeEventListener('keydown', closeOnEsc);
            document.removeEventListener('keydown', openOnSlash);
        }
    })

    const ESCAPE_KEY = 27
    function closeOnEsc(e) {
        if (e.keyCode === ESCAPE_KEY) {
            setIsOpen(false)
            input.current.blur()
        }
    }

    const SLASH_KEY = 191
    function openOnSlash(e) {
        if (e.keyCode === SLASH_KEY) {
            if (!isOpen) {
                e.preventDefault()
            }
            setIsOpen(true)
            input.current.focus()
        }
    }

    return <Container isOpen={isOpen} onClick={() => {
        if (!isOpen) {
            setIsOpen(true)
        }
    }}>
        <Row>
            <SearchBox
                ref={input}
                type="search"
                onFocus={() => setIsOpen(true)}
                isOpen={isOpen}
                {...props}
            />
            {isOpen && <CancelButton onClick={() => setIsOpen(false)}>Cancel</CancelButton>}
        </Row>
        <SearchResults isOpen={isOpen}>
            {isLoading
                ? <Loader />
                : (
                    <>
                        {results && results.courses &&
                            <>
                                <Label>Courses</Label>
                                <SearchList>
                                {results.courses.slice(0, 5).map((item, i) => (
                                    <Link href={`/courses/[id]`} as={`/courses/${item._id}`} key={i}>
                                        <SearchItem onClick={() => setIsOpen(false)}>
                                            <Highlighter
                                                highlightStyle={{
                                                    backgroundColor: 'transparent',
                                                    fontWeight: 600
                                                }}
                                                searchWords={props.value.split(' ')}
                                                textToHighlight={item.name}
                                            />
                                            <Chevron />
                                        </SearchItem>
                                    </Link>
                                ))}
                                </SearchList>
                            </>
                        }
                        {results && results.grades &&
                            <>
                                <Label>Grades</Label>
                                <GradesList>
                                    {results.grades.map((grade, i) => (
                                        <GradeItem key={i}>
                                            <GradeIcon />
                                            <p>
                                            <Highlighter
                                                    highlightStyle={{
                                                        backgroundColor: 'transparent',
                                                        fontWeight: 600
                                                    }}
                                                    searchWords={props.value.split(' ')}
                                                    textToHighlight={grade.course.name}
                                                />
                                            </p>
                                            <Grade>{grade.grade}</Grade>
                                            <Chevron />
                                        </GradeItem>
                                    ))}
                                </GradesList>
                            </>
                        }
                        {/* TODO: Implement placeholder results */}
                        {!results || !props.value &&
                            <>
                            <Label>Recently viewed courses</Label>
                                <SearchList>
                                    <SearchItem>
                                        <Highlighter
                                            highlightStyle={{
                                                backgroundColor: 'transparent',
                                                fontWeight: 600
                                            }}
                                            searchWords={props.value.split(' ')}
                                            textToHighlight={'The Office Redux'}
                                        />
                                        <Chevron />
                                    </SearchItem>
                                </SearchList>
                                <Label>Latest grades</Label>
                                <GradesList>
                                    <GradeItem>
                                        <GradeIcon />
                                        <p>
                                        <Highlighter
                                                highlightStyle={{
                                                    backgroundColor: 'transparent',
                                                    fontWeight: 600
                                                }}
                                                searchWords={props.value.split(' ')}
                                                textToHighlight={'Microservices 101'}
                                            />
                                        </p>
                                        <Grade>7.8</Grade>
                                        <Chevron />
                                    </GradeItem>
                                </GradesList>
                            </>
                        }
                    </>
                )
            }
        </SearchResults>
        <Overlay isOpen={isOpen} onClick={() => {
            setIsOpen(false)
        }} />
    </Container>
}
