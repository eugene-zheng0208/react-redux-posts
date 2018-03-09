import {Reducer} from 'redux-testkit'

import reducer from '../reducers'
import {types} from '../actions'


const initialState = {}
const initialComments = {
    isFetching: true,
    error: null,
    items: [],
}


describe('comments reducer', () => {
    it('should handle requesting', () => {
        const action = {
            type: types.COMMENTS_REQUEST,
            payload: {
                postId: 3,
            },
        }
        Reducer(reducer).expect(action).toReturnState({
            ...initialState,
            "3": {
                ...initialComments,
            },
        })
    })

    it('should handle receiving', () => {
        const action = {
            type: types.COMMENTS_RECEIVE,
            payload: {
                postId: 2,
                json: [
                    {"id": 1, "body": "some body 1"},
                    {"id": 2, "body": "some body 2"},
                    {"id": 3, "body": "some body 3"},
                ],
            }
        }
        const newState = {
            ...initialState,
            2: {...initialComments, isFetching: false, items: [
                {"id": 1, "body": "some body 1"},
                {"id": 2, "body": "some body 2"},
                {"id": 3, "body": "some body 3"},
            ]},
        }
        Reducer(reducer).expect(action).toReturnState(newState)
    })

    it('should handle failure', () => {
        const errorMessage = 'some error during user updating'
        const action = {
            type: types.COMMENTS_FAILURE,
            payload: {
                postId: 2,
                error: new Error(errorMessage),
            },
        }
        const existingState = {
            ...initialState,
            2: {...initialComments},
        }
        const newState = {
            ...existingState,
            2: {...initialComments, isFetching: false, error: new Error(errorMessage),},
        }
        Reducer(reducer).withState(existingState).expect(action).toReturnState(newState)
    })
})