import React from 'react'

const Course = ({ course }) => (
    <div>
        <h1>{course.name || ''}</h1>
    </div>
)

Course.defaultProps = {
    course: {
        name: 'IPSENH'
    }
}

export default Course
