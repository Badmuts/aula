import Link from 'next/link'
import Head from 'next/head'
import Title from '../components/Title'
import Box from '../components/Box'
import CardHero from '../components/CardHero'
import CardFooter from '../components/CardFooter'
import AvatarStack from '../components/AvatarStack'
import Avatar from '../components/Avatar'
import * as CourseRepository from '../repositories/courses'
import * as UserRepository from '../repositories/users'
import { take } from 'rxjs/operators';
import Page from '../components/Page';

import flowRight from 'lodash/flowRight'
import { withRouter } from 'next/router';
import { withAuthSync } from '../services/auth';

function Home({ user, ...props }) {
    const courses = CourseRepository.useCourses(props.courses)
    const cardHeroColors = ['green', 'pink', 'blue']

    return (
        <Page user={user}>
            <Head>
                <title>Aula</title>
            </Head>
            {user && (
                <>
                    <Box>
                        <Title>Jump back in</Title>
                    </Box>
                    <Box>
                        {courses.slice(0, 3).map((course, index) => (
                            <Link href={`/courses/[id]`} as={`/courses/${course._id}`} key={course._id}>
                                <CardHero color={cardHeroColors[index]}>
                                    <Title>{course.name}</Title>
                                    <CardFooter>
                                        <AvatarStack>
                                            <Avatar src="https://avatars2.githubusercontent.com/u/1849831?s=460&v=4" />
                                        </AvatarStack>
                                        <span>Daan Rosbergen</span>
                                    </CardFooter>
                                </CardHero>
                            </Link>
                        ))}
                    </Box>
                    <Box>
                        <Title>Feed</Title>
                        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
                        {props.error && <pre>{JSON.stringify(props.error, null, 2)}</pre>}
                    </Box>
                </>
            )}
        </Page>
    )
}

Home.getInitialProps = async () => {
    try {
        const courses = await CourseRepository.find()
            .pipe(take(1))
            .toPromise()

        const user = await UserRepository.me()

        return { courses, user }
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

export default flowRight([withRouter, withAuthSync])(Home)
