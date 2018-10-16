import React from 'react';
import Sidebar from '../components/Sidebar';
import * as CourseService from '../services/CourseService';

class SidebarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        CourseService.find()
            .then(courses => this.setState({ courses }))
    }

    render() {
        return <Sidebar courses={this.state.courses} />
    }
}

export default SidebarContainer
