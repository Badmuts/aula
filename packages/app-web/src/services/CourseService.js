import http, { handleError } from './../utils/http';
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import AuthService from './AuthService';


export const find = () => http('/api/courses')
    .then(handleError)
    .then(res => res.json())

export const findOne = id => http(`/api/courses/${id}`)
    .then(handleError)
    .then(res => res.json())

export const find$ = () => ajax({
    url: `/api/courses`,
    method: 'GET',
    headers: { 'Authorization': `Bearer ${AuthService.tokenPair.accessToken}` }
}).pipe(
    map(res => res.response)
)
