import Link from 'next/link'
import flowRight from 'lodash/flowRight'
import { withRouter } from 'next/router';
import { withAuthSync } from '../../../services/auth';
import Title from '../../../components/Title'
import Box from '../../../components/Box'
import * as UserRepository from '../../../repositories/users';
import * as CourseRepository from '../../../repositories/courses';
import { take } from 'rxjs/operators';

import styled, { css } from 'styled-components'
import { darken } from 'polished';
import Page from '../../../components/Page';

const NavHorizontal = styled.div`
    display: flex;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    margin: 0 auto;

    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    width: 100%;

    &::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            order: 2;
            margin-bottom: 20px;
        }
    }
`

const Item = styled.div`
    flex: 0 0 auto;
    margin-left: 20px;
    padding: 10px 5px 10px;
    font-size: 0.9em;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    /* &:last-child {
        padding-right: 20px !important;
    } */

    span {
        margin-right: 2px;
    }

    ${props => props.active && css`
        border-bottom-color: ${darken(0.3, props.theme.colors.green)};
        font-weight: 600;
    `}
`

const Counter = styled.span`
    background-color: rgba(0, 0, 0, .1);
    border-radius: 20px;
    color: #000;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    padding: 2px 5px;
`

const CourseHeader = styled.div`
    display: flex;
    flex-direction: column;
`

const CourseTitle = styled(Title)`
    margin: 30px 20px;

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            margin: 5px 20px;
         }
    }
`

function CourseDetail({ user, course }) {
    return (
        <Page user={user}>
            <CourseHeader>
                <NavHorizontal>
                    <Link href="/courses/[id]" as={`/courses/${course._id}`}><Item><span role="img">📚</span>Course</Item></Link>
                    <Link href="/courses/[id]/content" as={`/courses/${course._id}/content`}><Item active><span role="img">📓</span>Content</Item></Link>
                    <Item><span role="img">📣</span>Announcements <Counter>2</Counter></Item>
                    <Item><span role="img">🎥</span>Videos</Item>
                    <Item><span role="img">⚒</span>Settings</Item>
                </NavHorizontal>
                <CourseTitle>{course.name}</CourseTitle>
            </CourseHeader>
            {<pre>{JSON.stringify(course, null, 2)}</pre>}
        </Page>
    )
}

CourseDetail.getInitialProps = async (ctx) => {
    const user = await UserRepository.me()
    const courses = await CourseRepository.find()
        .pipe(take(1))
        .toPromise()

    const course = courses.filter(course => course._id === ctx.query.id).pop()

    return {
        user,
        course
    }
}

export default flowRight([withRouter, withAuthSync])(CourseDetail)
