import Link from 'next/link'
import flowRight from 'lodash/flowRight'
import { withRouter } from 'next/router';
import { take } from 'rxjs/operators';
import styled, { css } from 'styled-components'
import { darken } from 'polished';

import { withAuthSync } from '../../../services/auth';
import { me } from '../../../repositories/users';

import Title from '../../../components/Title'
import * as CourseRepository from '../../../repositories/courses';
import Page from '../../../components/Page';
import Avatar from '../../../components/Avatar'
import AvatarStack from '../../../components/AvatarStack'

const NavHorizontal = styled.div`
    display: flex;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    margin: 0 auto;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    width: 100%;
    background-color: ${props => props.theme.colors.background};

    &::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            order: 4;
            margin-bottom: 20px;
        }
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            order: -1;
        }
    }
`

const Item = styled.div`
    flex: 0 0 auto;
    margin-left: 20px;
    padding: 13px 5px 10px;
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
    flex-wrap: wrap;
    box-sizing: border-box;

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            flex-direction: row;
        }
    }
`

const CourseTitle = styled(Title)`
    margin: 20px;
    flex: 1;

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            margin: 5px 20px;
         }
    }
`

const CourseActions = styled.div`
    margin: auto 20px;
    margin-bottom: 20px;
    display: flex;

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            margin-bottom: auto;
        }
    }

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            margin: 5px 20px;
            order: -1;
        }
    }
`

const ActionButton = styled.button`
    font-weight: 600;
    font-size: 0.8em;
    white-space: nowrap;
    word-break: keep-all;
    cursor: pointer;
    letter-spacing: -0.004em;
    position: relative;
    text-align: center;
    line-height: 1;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 2px;
    color: rgb(33, 35, 37);
    background-color: rgb(255, 255, 255);
    background-image: linear-gradient(rgb(255, 255, 255), rgb(246, 247, 248));
    flex: 1;
    border-radius: 4px;
    padding: 14px 20px;
    border: 1px solid rgb(214, 220, 231);
    border-image: initial;
    transition: border 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0s, background-image 0.2s ease-in-out 0s;

    &:hover {
        color: rgb(0, 0, 0);
        transition: border 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0s, background-image 0.2s ease-in-out 0s;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    }

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            padding: 10px 14px;
        }
    }

    &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-right-color: rgb(214, 220, 231);
    }
`

const InfoBar = styled.div`
    border: 1px solid rgba(0,0,0, .1);
    border-radius: 4px;
    padding: 14px 16px;
    display: flex;
    align-items: stretch;
    margin: 0 20px;
    margin-bottom: 20px;
    background: white;

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            flex-direction: column;
            padding: 10px 20px;
        }
    }
`

const CourseInfo = styled.div`
    border: 1px solid rgba(0,0,0, .1);
    border-radius: 4px;
    padding: 14px 16px;
    margin: 0 20px;
    margin-bottom: 20px;
    background: white;
    display: flex;
    flex-direction: column;
    font-size: 0.9em;

    @media only screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            padding: 34px 56px;
        }
    }

    ${Title} {
        margin: 0;
    }

    p {
        line-height: 22px;
        font-size: 15px;
        margin-bottom: 15px;
        letter-spacing: -0.004em;
        color: #111;
    }
`

const InfoBarItem = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: ${props => props.theme.breakpoints.desktop}) {
        & {
            justify-content: flex-start;
            padding: 10px 0;
        }

        &:last-child {
            align-self: center;
            order: -1;
        }
    }

    img:not(${Avatar}) {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        opacity: .4;
    }
`

function CourseDetail({ user, course }) {
    return (
        <Page user={user}>
            <CourseHeader>
                <NavHorizontal>
                    <Link href="/courses/[id]" as={`/courses/${course._id}`}><Item active><span role="img">📚</span>Course</Item></Link>
                    <Link href="/courses/[id]/content" as={`/courses/${course._id}/content`}><Item><span role="img">📓</span>Content</Item></Link>
                    <Item><span role="img">📣</span>Announcements <Counter>2</Counter></Item>
                    <Item><span role="img">🎥</span>Videos</Item>
                    <Item><span role="img">⚒</span>Settings</Item>
                </NavHorizontal>
                <CourseTitle>{course.name}</CourseTitle>
                <CourseActions>
                    <ActionButton><span role="img">🎓</span> Unenroll</ActionButton>
                    <ActionButton><span role="img">👀</span> Watch</ActionButton>
                </CourseActions>
            </CourseHeader>
            <InfoBar>
                <InfoBarItem>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAy%0D%0ANCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBjbGFzcz0iaGVyb2ljb24tdWkiIGQ9Ik0x%0D%0AMSAyMHYtMi4wOGE2IDYgMCAwIDEtNC4yNC0zQTQuMDIgNC4wMiAwIDAgMSAyIDExVjZjMC0xLjEu%0D%0AOS0yIDItMmgyYzAtMS4xLjktMiAyLTJoOGEyIDIgMCAwIDEgMiAyaDJhMiAyIDAgMCAxIDIgMnY1%0D%0AYTQgNCAwIDAgMS00Ljc2IDMuOTNBNiA2IDAgMCAxIDEzIDE3LjkyVjIwaDRhMSAxIDAgMCAxIDAg%0D%0AMkg3YTEgMSAwIDAgMSAwLTJoNHptNi45Mi03SDE4YTIgMiAwIDAgMCAyLTJWNmgtMnY2YzAgLjM0%0D%0ALS4wMy42Ny0uMDggMXpNNi4wOCAxM0E2LjA0IDYuMDQgMCAwIDEgNiAxMlY2SDR2NWEyIDIgMCAw%0D%0AIDAgMi4wOCAyek04IDR2OGE0IDQgMCAxIDAgOCAwVjRIOHoiLz48L3N2Zz4=" alt="ECTS"/>
                    <span><strong>{course.ects || 0}</strong> ECTS</span>
                </InfoBarItem>
                <InfoBarItem>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAy%0D%0ANCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBjbGFzcz0iaGVyb2ljb24tdWkiIGQ9Ik05%0D%0AIDEyQTUgNSAwIDEgMSA5IDJhNSA1IDAgMCAxIDAgMTB6bTAtMmEzIDMgMCAxIDAgMC02IDMgMyAw%0D%0AIDAgMCAwIDZ6bTcgMTFhMSAxIDAgMCAxLTIgMHYtMmEzIDMgMCAwIDAtMy0zSDdhMyAzIDAgMCAw%0D%0ALTMgM3YyYTEgMSAwIDAgMS0yIDB2LTJhNSA1IDAgMCAxIDUtNWg0YTUgNSAwIDAgMSA1IDV2Mnpt%0D%0AMS01YTEgMSAwIDAgMSAwLTIgNSA1IDAgMCAxIDUgNXYyYTEgMSAwIDAgMS0yIDB2LTJhMyAzIDAg%0D%0AMCAwLTMtM3ptLTItNGExIDEgMCAwIDEgMC0yIDMgMyAwIDAgMCAwLTYgMSAxIDAgMCAxIDAtMiA1%0D%0AIDUgMCAwIDEgMCAxMHoiLz48L3N2Zz4=" alt="Students"/>
                    <span><strong>26</strong> students</span>
                </InfoBarItem>
                <InfoBarItem>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAy%0D%0ANCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBjbGFzcz0iaGVyb2ljb24tdWkiIGQ9Ik0x%0D%0AMiAyMmExMCAxMCAwIDEgMSAwLTIwIDEwIDEwIDAgMCAxIDAgMjB6bTAtMmE4IDggMCAxIDAgMC0x%0D%0ANiA4IDggMCAwIDAgMCAxNnptMS04LjQxbDIuNTQgMi41M2ExIDEgMCAwIDEtMS40MiAxLjQyTDEx%0D%0ALjMgMTIuN0ExIDEgMCAwIDEgMTEgMTJWOGExIDEgMCAwIDEgMiAwdjMuNTl6Ii8+PC9zdmc+" />
                    {course.duration}
                </InfoBarItem>
                <InfoBarItem>
                    <AvatarStack>
                        <Avatar src="https://media.tenor.com/images/c9348fa5d2b05fe956f5c32a84a7c182/tenor.gif" />
                        <Avatar src="https://avatarfiles.alphacoders.com/125/thumb-125254.png" />
                        <Avatar src="https://avatars2.githubusercontent.com/u/1849831?s=460&v=4" />
                    </AvatarStack>
                    3 Teachers
                </InfoBarItem>
            </InfoBar>
            <CourseInfo>
                <Title>{course.name}</Title>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe necessitatibus placeat nesciunt reprehenderit provident quis ut ex et, pariatur iure perspiciatis, temporibus dolor quibusdam consequatur minus inventore minima? Id magnam minima voluptatum consectetur repudiandae nam pariatur consequatur, aperiam, nihil eum, esse praesentium autem rerum possimus et voluptates aliquam! Natus dolorem rerum molestiae quam laudantium soluta temporibus magni, veniam consequuntur nobis voluptatum atque cum, voluptates fugit at accusamus sit reprehenderit distinctio vero.</p>
                <p>A minus, molestias voluptatem fugiat reprehenderit magnam aliquam harum ducimus quasi voluptas distinctio quos possimus voluptates vel laborum ex impedit explicabo nihil placeat optio minima beatae velit id odio? Sunt ullam culpa minima reiciendis omnis labore ad fugit dolorum soluta unde amet similique distinctio saepe animi, laboriosam, incidunt illum porro numquam facere nisi voluptatem. Est officia illo, dolorum voluptas magni ex assumenda in, exercitationem doloremque, possimus eius excepturi necessitatibus reiciendis soluta omnis neque maiores. Id iusto quaerat error sequi!</p>
            </CourseInfo>
        </Page>
    )
}

CourseDetail.getInitialProps = async (ctx) => {
    const user = await me()
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
