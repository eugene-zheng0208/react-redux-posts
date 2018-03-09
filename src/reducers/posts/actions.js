import {createAction} from 'redux-actions'

import {fetchUserIfNeeded} from '../users/actions'
import {fetchComments} from '../comments/actions'

export const types = {
    POSTS_REQUEST: 'POSTS_REQUEST',
    POSTS_RECEIVE: 'POSTS_RECEIVE',
    POSTS_FAILURE: 'POSTS_FAILURE',
    POSTS_REMOVE: 'POSTS_REMOVE',
    POSTS_FILTER_CHANGED: 'POSTS_FILTER_CHANGED',
}


const requestPosts = createAction(types.POSTS_REQUEST)
const receivePosts = createAction(types.POSTS_RECEIVE, json => ({json}))
const failPosts = createAction(types.POSTS_FAILURE, error => ({error}))
const removePost = createAction(types.POSTS_REMOVE, id => ({id}))
const filterPosts = createAction(types.POSTS_FILTER_CHANGED, (userId, text) => ({userId, text}))

export function fetchPosts() {
    return dispatch => {
        dispatch(requestPosts())

        return fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (response.ok) {return response.json()}
                throw new Error('Network error')
            })
            .then(json => {
                for (let item of json) {
                    dispatch(fetchUserIfNeeded(item.userId))
                    dispatch(fetchComments(item.id))
                }
                dispatch(receivePosts(json))
            })
            .catch(error => {
                dispatch(failPosts(error))
            })
    }
}

export function removePostFromFeed(postId) {
    return dispatch => dispatch(removePost(postId))
}

export function filterPostsInFeed(userId, text) {
    return dispatch => dispatch(filterPosts(userId, text))
}
