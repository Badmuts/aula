import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import * as CourseService from '../services/CourseService';

class SidebarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        this.stream = CourseService.find$()
            .subscribe(
                courses => this.setState({ courses })
            )
    }

    componentWillUnmount() {
        this.stream.unsubscribe()
    }

    render() {
        return <Sidebar courses={this.state.courses} />
    }
}

export default SidebarContainer
