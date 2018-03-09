import {createAction} from 'redux-actions'

export const types = {
    COMMENTS_REQUEST: 'COMMENTS_REQUEST',
    COMMENTS_RECEIVE: 'COMMENTS_RECEIVE',
    COMMENTS_FAILURE: 'COMMENTS_FAILURE',
}


const requestComments = createAction(types.COMMENTS_REQUEST, postId => ({postId}))
const receiveComments = createAction(types.COMMENTS_RECEIVE, (postId, json) => ({postId, json}))
const failComments = createAction(types.COMMENTS_FAILURE, (postId, error) => ({postId, error}))

export function fetchComments(postId) {
    return dispatch => {
        dispatch(requestComments(postId))

        return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => {
                if (response.ok) {return response.json()}
                throw new Error('Network error')
            })
            .then(json => dispatch(receiveComments(postId, json)))
            .catch(error => dispatch(failComments(postId, error)))
    }
}