import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import * as CourseService from '../services/CourseService';
import io from 'socket.io-client';

class SidebarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        const socket = io();
        socket.on('course.created', (course) => {
            this.setState({
                courses: this.state.courses.concat([course])
            })
        });
        CourseService.find()
            .then(courses => this.setState({ courses }))
    }

    render() {
        return <Sidebar courses={this.state.courses} />
    }
}

export default SidebarContainer
