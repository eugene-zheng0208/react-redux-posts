import {Selector} from 'redux-testkit'

import {getCommentsByPostId} from '../reducers'


describe('comments selectors', () => {
    it('should get comments by post id', () => {
        const state = {
            comments: {
                1: {isFetching: true, items: []},
                2: {isFetching: false, items: [
                    {"id": 1, "body": "some body 1"},
                    {"id": 2, "body": "some body 2"},
                    {"id": 3, "body": "some body 3"},
                ]},
                3: {isFetching: false, items: [
                    {"id": 4, "body": "some body 4"},
                ]},
            },
        }
        const postId = 2
        const result = state.comments[postId]

        Selector(getCommentsByPostId).expect(state, postId).toReturn(result)
    })

    it('should get comments by post id with an empty state', () => {
        const state = {
            comments: {},
        }
        const postId = 2
        const result = undefined

        Selector(getCommentsByPostId).expect(state, postId).toReturn(result)
    })
})