import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Tabbar from '../components/ui/Tabbar';
import Header from '../components/ui/Header';
import CourseModule from '../components/pages/Course/CourseModule';
import CourseContent from '../components/pages/Course/CourseContent';
import CourseVideo from '../components/pages/Course/CourseVideo';
import CourseAnnouncements from '../components/pages/Course/CourseAnnoucements';
import Loader from '../components/ui/Loader';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'

import * as CourseService from '../services/CourseService';
import Badge from '../components/ui/Badge';
import { map } from 'rxjs/operators';
import CourseSettings from '../components/pages/Course/CourseSettings';

export default class CourseDetailScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            course: {}
        }
        this.stream = null
    }

    componentDidMount() {
        this.findCourse()
    }

    findCourse() {
        this.setState({ isFetching: true })
        this.stream = CourseService.find$()
            .pipe(
                map(courses => courses.filter(c => c._id === this.props.match.params.id).pop())
            )
            .subscribe(
                course => this.setState({ course, isFetching: false }, () => console.log('updated', course)),
                () => this.setState({ isFetching: false })
            )
    }

    componentWillUnmount() {
        this.stream.unsubscribe()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.findCourse()
        }
    }

    render() {
        return (
            <div>
                <NavbarContainer {...this.props} />
                {this.state.isFetching
                    ? <Loader />
                    : <div>
                        <Header>
                            <div className="container">
                                <div style={styles.courseContainer}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Breadcrumbs style={{width: '80%'}}>
                                            <li><a href="/">Courses</a></li>
                                            <li className="active">{this.state.course && this.state.course.name}</li>
                                        </Breadcrumbs>
                                        <div className="btn-group" style={{marginLeft: 'auto'}}>
                                            <button className="btn" style={{marginLeft: 'auto'}}>🎓 Enroll</button>
                                            <button className="btn active" style={{marginLeft: 'auto'}}>👁 Watch</button>
                                        </div>
                                    </div>

                                    <Tabbar>
                                        <NavLink to={`${this.props.match.url}/module`}>📚 Module</NavLink>
                                        <NavLink to={`${this.props.match.url}/content`}>📓 Content</NavLink>
                                        <NavLink to={`${this.props.match.url}/announcements`}>📣 Announcements</NavLink>
                                        <NavLink to={`${this.props.match.url}/videos`}>🎥 Videos {(this.state.course.videos && this.state.course.videos.length > 0) && <Badge>{this.state.course.videos.length}</Badge>} </NavLink>
                                        <NavLink to={`${this.props.match.url}/settings`}>🛠 Settings</NavLink>
                                    </Tabbar>
                                </div>
                            </div>
                        </Header>
                        <div className="container">
                            <div style={styles.courseContainer}>
                            <Switch>
                                <Route path={`${this.props.match.url}/module`} render={props => <CourseModule course={this.state.course} {...props} />} />
                                <Route path={`${this.props.match.url}/content`} render={props => <CourseContent {...this.state} {...props} />} />
                                <Route path={`${this.props.match.url}/announcements`} render={props => <CourseAnnouncements {...this.state} {...props} />} />
                                <Route path={`${this.props.match.url}/videos`} render={props => <CourseVideo videos={this.state.course.videos || []} {...props} />} />
                                <Route path={`${this.props.match.url}/settings`} render={props => <CourseSettings {...this.state} {...props} />} />
                                <Redirect to={`${this.props.match.url}/module`} />
                            </Switch>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

const styles = {
    courseContainer: {
        gridColumn: 'span 10 / -2 '
    }
}
