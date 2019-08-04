import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Modal from '../components/Modals/Modal'
import Title from '../components/Title'
import Layout from '../components/Layout'
import {Nav, UserMenu, Menu} from '../components/Nav'
import Brand from '../components/Brand'
import SearchBox from '../components/SearchBox'
import Box from '../components/Box'
import CardHero from '../components/CardHero'
import CardFooter from '../components/CardFooter'
import AvatarStack from '../components/AvatarStack'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import ButtonGroup from '../components/ButtonGroup'
import Disclaimer from '../components/Disclaimer'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import Spacer from '../components/Spacer'
import Gravatar from '../components/Gravatar'
import * as CourseRepository from '../repositories/courses'
import * as UserRepository from '../repositories/users'
import { take } from 'rxjs/operators';
import { logout } from '../services/auth';
import NotificationCenter from '../components/NotificationCenter';

function Home({ user, ...props }) {
    const [isJoiningModalOpen, setJoiningModal] = useState(false)
    const [isSigninModalOpen, setSigninModal] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isNotificationCenterOpen, setNotificationCenterOpen] = useState(false)
    const courses = CourseRepository.useCourses(props.courses)
    const cardHeroColors = ['green', 'pink', 'blue']

    return (
        <>
            <Head>
                <title>Aula</title>
            </Head>
            <Layout>
                <Nav>
                    <Brand>
                        <Link href="/"><Logo src="/static/images/logo.svg" alt="Aula" /></Link>
                    </Brand>
                    <SearchBox type="search" placeholder="Search Aula" />
                    {!user && <a className="sign-in" onClick={() => setSigninModal(true)}>Sign in</a>}
                    {!user && <a className="join" onClick={() => setJoiningModal(true)}><strong>Join</strong></a>}
                    {user && <NotificationCenter
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
                {user && (
                    <>
                        <Box>
                            <Title>Jump back in</Title>
                        </Box>
                        <Box>
                            {courses.slice(0, 3).map((course, index) => (
                                <CardHero key={course._id} color={cardHeroColors[index]}>
                                    <Title>{course.name}</Title>
                                    <CardFooter>
                                        <AvatarStack>
                                            <Avatar src="https://avatars2.githubusercontent.com/u/1849831?s=460&v=4" />
                                        </AvatarStack>
                                        <span>Daan Rosbergen</span>
                                    </CardFooter>
                                </CardHero>
                            ))}
                        </Box>
                        <Box>
                            <Title>Feed</Title>
                            {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
                            {props.error && <pre>{JSON.stringify(props.error, null, 2)}</pre>}
                        </Box>
                        <Box>
                            <Footer>
                                <p>Aula &copy; 2019</p>
                            </Footer>
                        </Box>
                    </>
                )}

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
                    isOpen={isSigninModalOpen}
                    contentLabel="Sign in"
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
            </Layout>
        </>
    )
}

Home.getInitialProps = async () => {
    try {
        const courses = await CourseRepository.find()
            .pipe(take(1))
            .toPromise()

        const me = await UserRepository.me()
            .pipe(take(1))
            .toPromise()

        return { courses, user: me }
    } catch (err) {
        console.error(err)
        if (err.response && err.response.status === 401) {
            return {
                courses: [],
                error: {
                    message: 'Unauthorized',
                    status: 401
                }
            }
        }
    }

    return {
        courses: []
    }
}

export default Home
