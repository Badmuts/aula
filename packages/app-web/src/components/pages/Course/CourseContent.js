import React from 'react'

const CourseContent = ({ course }) => course.content && course.content.length ? null : (
    <div>
        <p>No content</p>
    </div>
)

CourseContent.defaultProps = {
    course: {
        name: 'Course',
        content: []
    }
}

export default CourseContent
