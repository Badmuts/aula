import http, { handleError } from './../utils/http';

export const find = () => http('/api/courses')
    .then(handleError)
    .then(res => res.json())

export const findOne = id => http(`/api/courses/${id}`)
    .then(handleError)
    .then(res => res.json())
