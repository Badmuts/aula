import React from 'react'

const CourseAnnouncements = ({ course }) => course.annoucements && course.annoucements.length ? null : (
    <div>
        <p>No announcements</p>
    </div>
)

CourseAnnouncements.defaultProps = {
    course: {
        name: 'Course'
    }
}

export default CourseAnnouncements
