import keyBy from 'lodash/keyBy'
import size from 'lodash/size'

let notifications = {}

function shouldFetchNotifications() {
    return size(notifications) <= 0
}

const fakeCall = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 300))

export async function fetchNotifications() {
    if (shouldFetchNotifications()) {
        const res = await fakeCall([
            {
                _id: '123-abc-123',
                title: 'Nieuwe stof',
                body: 'Volgende week maandag behandelen we de extra stof, deze stof heb je nodig op het tentamen.',
                type: 'announcement',
                meta: {
                    user: {
                        _id: '456-abc-456',
                        name: 'Bobby',
                        email: 'daan+avocado@digitalefactuur.nl',
                    },
                    course: {
                        _id: '5d3375619bc9f000462da3ab',
                        name: `Let's get queueing`,
                    }
                },
                createdAt: "2019-08-10T12:27:22.528Z",
                updatedAt: "2019-08-10T12:27:22.528Z",
                readAt: null
            }
        ])

        const _notifications = keyBy(res, '_id')
        notifications = {
            ...notifications,
            ..._notifications
        }

        console.log('fetched notifications')
    }

    return notifications
}
