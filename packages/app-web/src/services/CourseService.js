import http, { handleError, http$ } from './../utils/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap, distinct, distinctUntilKeyChanged } from 'rxjs/operators';

const CourseCollection = new BehaviorSubject([])

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
            CourseCollection.next(CourseCollection.getValue().concat(courses))
            return CourseCollection
        })
    )
