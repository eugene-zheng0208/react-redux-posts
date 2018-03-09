import {createAction} from 'redux-actions'

export const types = {
    USER_REQUEST: 'USER_REQUEST',
    USER_RECEIVE: 'USER_RECEIVE',
    USER_FAILURE: 'USER_FAILURE',
}


const requestUser = createAction(types.USER_REQUEST, id => ({id}))
const receiveUser = createAction(types.USER_RECEIVE, (id, json) => ({id, json}))
const failUser = createAction(types.USER_FAILURE, (id, error) => ({id, error}))

export function fetchUserIfNeeded(userId) {
    return (dispatch, getState) => {
        const user = getState().users[userId]
        if (!user || !user.isFetching) {
            dispatch(requestUser(userId))

            return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then(response => {
                    if (response.ok) {return response.json()}
                    throw new Error('Network error')
                })
                .then(json => {
                    dispatch(receiveUser(userId, json))
                })
                .catch(error => {
                    dispatch(failUser(userId, error))
                })
        } else {
            return Promise.resolve()
        }
    }
}
