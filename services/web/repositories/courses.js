import { http$ } from '../services/http';
import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import unionBy from 'lodash/unionBy'
import ws from '../services/ws'

const CourseRepository = new BehaviorSubject([])

ws.on('course.created', course => {
    CourseRepository.next(
        unionBy([course], CourseRepository.getValue(), '_id')
    )
})

ws.on('course.updated', course => {
    CourseRepository.next(
        unionBy([course], CourseRepository.getValue(), '_id')
    )
})

function find() {
    return http$(`api/courses`)
        .pipe(
            flatMap(courses => {
                CourseRepository.next(
                    unionBy(
                        courses,
                        CourseRepository.getValue(),
                        '_id'
                    )
                )

                return CourseRepository
            }),
        )
}

function useCourses(courses = []) {
    const [$courses, setCourses] = useState(courses)

    useEffect(
        () => {
            CourseRepository.next(courses)
            const subscription = CourseRepository.subscribe(courses => setCourses(courses))
            return () => subscription.unsubscribe()
        },
        [courses]
    )

    return $courses
}

export { find, useCourses }
