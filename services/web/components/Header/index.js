import React, { useState } from 'react'
import Link from 'next/link'
import { map } from 'rxjs/operators';

import Modal from '../Modals/Modal'
import Title from '../Title'
import {Nav, UserMenu, Menu} from '../Nav'
import Brand from '../Brand'
import Search from '../Search'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Disclaimer from '../Disclaimer'
import Logo from '../Logo'
import Icon from '../Icon'
import Spacer from '../Spacer'
import Gravatar from '../Gravatar'
import NotificationCenter from '../NotificationCenter';

import { logout } from '../../services/auth';
import { http$ } from '../../services/http';

function Header({ user }) {
    const [isJoiningModalOpen, setJoiningModal] = useState(false)
    const [isSigninModalOpen, setSigninModal] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isNotificationCenterOpen, setNotificationCenterOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState({})

    function onSearch(query) {
        setSearchQuery(query)

        if (query) {
            if (!isSearching) {
                setIsSearching(true)
            }
            http$.get(`api/search?q=*${query}*`)
                .pipe(map(results => results.reduce((acc, item) => {
                    if (item._type === 'course') {
                        acc.courses = acc.courses || []
                        item._source._id = item._id
                        acc.courses.push(item._source)
                    }

                    if (item._type === 'grade') {
                        acc.grades = acc.grades || []
                        acc.grades.push(item._source)
                    }

                    return acc
                }, {})))
                .subscribe(setSearchResults, (err) => setIsSearching(false), () => setIsSearching(false))
        } else {
            setSearchQuery('')
            setSearchResults({})
        }
    }

    return (
        <>
            <Nav>
                <Brand>
                    <Link href="/"><Logo src="/static/images/logo.svg" alt="Aula" /></Link>
                </Brand>
                <Search type="search" placeholder="Search Aula" onChange={e => onSearch(e.target.value)} value={searchQuery} results={searchResults} isLoading={isSearching} />
                {!user && <a className="sign-in" onClick={() => setSigninModal(true)}>Sign in</a>}
                {!user && <a className="join" onClick={() => setJoiningModal(true)}><strong>Join</strong></a>}
                {user && <NotificationCenter
                        hasUnread
                        isOpen={isNotificationCenterOpen}
                        onClose={() => setNotificationCenterOpen(false)}
                        onOpen={() => setNotificationCenterOpen(!isNotificationCenterOpen)}
                    />
                }
                {user && (
                    <UserMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)}>
                        <Gravatar email={user.email} default="https://pbs.twimg.com/profile_images/706895404386918401/o08d8BFG_400x400.jpg" onClick={() => setMenuOpen(!isMenuOpen)} />
                        <Menu>
                            <span className="close" onClick={() => setMenuOpen(false)}>&times;</span>
                            <Gravatar email={user.email} size={128}/>
                            <Title>{user.name}</Title>
                            <Spacer />
                            <label>Account</label>
                            <ul>
                                <li>
                                    <Icon>⚒</Icon> Settings
                                </li>
                                <li onClick={() => logout()}>
                                    <Icon>👋</Icon> Logout
                                </li>
                            </ul>
                        </Menu>
                    </UserMenu>
                )}
            </Nav>

            <Modal
                isOpen={isJoiningModalOpen}
                contentLabel="Join Aula"
                onRequestClose={() => setJoiningModal(false)}
            >
                <button onClick={() => setJoiningModal(false)}>Cancel</button>
                <Icon color="blue" style={{ margin: '0 auto', marginTop: '60px' }}>
                    <img src="/static/icons/link.svg" alt=""/>
                </Icon>
                <Title>Join Aula</Title>
                <p>Aula gives your students one place to share knowledge.</p>
                <Spacer />
                <ButtonGroup>
                    <Link href="/auth/join"><Button>Sign up with email</Button></Link>
                    <Button disabled={true} brand="google">Sign up with Google</Button>
                    <Button disabled={true} brand="office365">Sign up with Office 365</Button>
                </ButtonGroup>

                <Disclaimer>
                    <img src="/static/icons/lock.svg" alt=""/>
                    <strong>We value your data</strong>
                    <p>We only use social login to gather your name, email and profile photo.</p>
                </Disclaimer>
            </Modal>

            <Modal
                isOpen={isSigninModalOpen}contentLabel="Sign in"
                onRequestClose={() => setSigninModal(false)}
            >
                <button onClick={() => setSigninModal(false)}>Cancel</button>
                <Icon color="pink" style={{ margin: '0 auto', marginTop: '60px' }}>
                    <img src="/static/icons/user-group.svg" alt=""/>
                </Icon>
                <Title>Sign in</Title>
                <p>Aula gives your students one place to share knowledge.</p>
                <Spacer />
                <ButtonGroup>
                    <Link href="/auth/sign-in"><Button>Sign in with email</Button></Link>
                    <Button disabled={true} brand="google">Sign in with Google</Button>
                    <Button disabled={true} brand="office365">Sign in with Office 365</Button>
                </ButtonGroup>

                <Disclaimer>
                    <img src="/static/icons/lock.svg" alt=""/>
                    <strong>We value your data</strong>
                    <p>We only use social login to gather your name, email and profile photo.</p>
                </Disclaimer>
            </Modal>
        </>
    )
}

export default Header
