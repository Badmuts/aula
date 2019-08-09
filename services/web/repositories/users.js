import http, { http$ } from '../services/http';
import { BehaviorSubject } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import unionBy from 'lodash/unionBy'
import { getTokenPair } from '../services/auth';
import atob from 'atob';

const UserRepository = new BehaviorSubject([])
const repo = {}

async function me() {
    const { accessToken } = getTokenPair()
    const payload = JSON.parse(
        atob(
            accessToken.split('.')[1]
        )
    )

    let me = repo[payload.sub]

    if (me) {
        return Promise.resolve(me)
    }

    const user = await http.get(`api/users/${payload.sub}`).json()

    repo[user._id] = {
        ...repo[user._id],
        ...user
    }

    return repo[user._id]

    // return http$.get(`api/users/${payload.sub}`)
    //     .pipe(
    //         flatMap(user => {
    //             UserRepository.next(
    //                 unionBy(
    //                     [user],
    //                     UserRepository.getValue(),
    //                     '_id'
    //                 )
    //             )

    //             return UserRepository
    //         }),
    //         map(users => users.filter(user => user._id === payload.sub).pop()),
    //     )
}

export { me }
