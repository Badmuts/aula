import http, { handleError, http$ } from './../utils/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import unionBy from 'lodash/unionBy';
import socket from '../utils/io';

const CourseCollection = new BehaviorSubject([])

socket.on('course.created', (course) => {
    CourseCollection.next(
        unionBy([course], CourseCollection.getValue(), '_id')
    )
})

socket.on('course.updated', (course) => {
    CourseCollection.next(
        unionBy([course], CourseCollection.getValue(), '_id')
    )
})

export const find = () => http('/api/courses')
    .then(handleError)
    .then(res => res.json())

export const findOne = id => http(`/api/courses/${id}`)
    .then(handleError)
    .then(res => res.json())

export const find$ = () => http$({
    url: `/api/courses`,
    method: 'GET'
})
    .pipe(
        switchMap(courses => {
            CourseCollection.next(
                unionBy(courses, CourseCollection.getValue(), '_id')
            )
            return CourseCollection
        })
    )
