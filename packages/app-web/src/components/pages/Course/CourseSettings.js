import React from 'react'

const CourseSettings = ({ course }) => course.settings && course.settings.length ? null : (
    <div>
        <p>No settings</p>
    </div>
)

CourseSettings.defaultProps = {
    course: {
        name: 'Course'
    }
}

export default CourseSettings
