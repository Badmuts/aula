import React from 'react';
import NavbarContainer from '../containers/NavbarContainer';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Tabbar from '../components/ui/Tabbar';
import Header from '../components/ui/Header';
import Course from '../components/pages/Course';

import * as CourseService from '../services/CourseService';
import Loader from '../components/ui/Loader';

export default class CourseDetailScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            course: null
        }
    }

    componentDidMount() {
        this.setState({ isFetching: true })
        CourseService.find()
            .then(courses => courses.filter(c => c._id === this.props.match.params.id).pop())
            .then(course => this.setState({ course }))
            .finally(() => this.setState({ isFetching: false }))
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
                                    <Breadcrumbs>
                                        <li><a href="/">Courses</a></li>
                                        <li className="active">{this.state.course && this.state.course.name}</li>
                                    </Breadcrumbs>
                                    <Tabbar>
                                        <span className="active"><a href="#">Module</a></span>
                                        <span><a href="#">Content</a></span>
                                        <span><a href="#">Files</a></span>
                                        <span><a href="#">Videos</a></span>
                                        <span><a href="#">Settings</a></span>
                                    </Tabbar>
                                </div>
                            </div>
                        </Header>
                        <div className="container">
                            <div style={styles.courseContainer}>
                                {this.state.course && <Course course={this.state.course} />}
                                <pre>{JSON.stringify(this.state.course, null, 2)}</pre>
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
