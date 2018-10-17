import React from 'react'

const Course = (props) => (
    <div>
        <h1>{props.course.name}</h1>
    </div>
)

Course.defaultProps = {
    course: {
        name: 'IPSENH'
    }
}

export default Course
