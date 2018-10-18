import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Tabbar from '../components/ui/Tabbar';
import Header from '../components/ui/Header';
import Course from '../components/pages/Course';
import Loader from '../components/ui/Loader';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'

import * as CourseService from '../services/CourseService';
import CourseVideo from '../components/pages/Course/CourseVideo';
import Badge from '../components/ui/Badge';
import { map } from 'rxjs/operators';

export default class CourseDetailScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            course: {}
        }
    }

    componentDidMount() {
        this.setState({ isFetching: true })
        CourseService.find$()
            .pipe(map(courses => courses.filter(c => c._id === this.props.match.params.id).pop()))
            .subscribe(course => this.setState({ course }), null, () => this.setState({ isFetching: false }))
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
                                        <div style={{marginLeft: 'auto'}}>
                                            <button style={{marginLeft: 'auto'}}>Enroll</button>
                                            <button style={{marginLeft: 'auto'}}>Watch</button>
                                        </div>
                                    </div>

                                    <Tabbar>
                                        <NavLink to={`${this.props.match.url}/module`}>Module</NavLink>
                                        <NavLink to="#">Content</NavLink>
                                        <NavLink to="#">Announcements</NavLink>
                                        <NavLink to={`${this.props.match.url}/videos`}>Videos {(this.state.course.videos && this.state.course.videos.length > 0) && <Badge>{this.state.course.videos.length}</Badge>} </NavLink>
                                        <NavLink to="#">Settings</NavLink>
                                    </Tabbar>
                                </div>
                            </div>
                        </Header>
                        <div className="container">
                            <div style={styles.courseContainer}>
                            <Switch>
                                <Route path={`${this.props.match.url}/module`} render={props => <Course course={this.state.course} {...props} />} />
                                <Route path={`${this.props.match.url}/videos`} render={props => <CourseVideo videos={this.state.course.videos || []} />} />
                                <Redirect to={`${this.props.match.url}/module`} />
                            </Switch>
                                {/* {this.state.course && <Course course={this.state.course} />} */}
                                {/* <pre>{JSON.stringify(this.state.course, null, 2)}</pre> */}
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
