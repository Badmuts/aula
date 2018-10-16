import React from 'react'
import Nav from '../Nav'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default (props) => (
    <div className="sidebar">
        <Nav title="Courses">
            {props.courses && props.courses.map(course => <Link key={course._id} to={`/courses/${course._id}`}>{course.name}</Link>)}
        </Nav>
    </div>
)
