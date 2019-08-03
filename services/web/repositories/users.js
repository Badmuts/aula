import { http$ } from '../services/http';
import { BehaviorSubject } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import unionBy from 'lodash/unionBy'
import { getTokenPair } from '../services/auth';
import atob from 'atob';

const UserRepository = new BehaviorSubject([])

function me() {
    const { accessToken } = getTokenPair()
    const payload = JSON.parse(
        atob(
            accessToken.split('.')[1]
        )
    )

    return http$.get(`api/users/${payload.sub}`)
        .pipe(
            flatMap(user => {
                UserRepository.next(
                    unionBy(
                        [user],
                        UserRepository.getValue(),
                        '_id'
                    )
                )

                return UserRepository
            }),
            map(users => users.filter(user => user._id === payload.sub).pop()),
        )
}

export { me }
