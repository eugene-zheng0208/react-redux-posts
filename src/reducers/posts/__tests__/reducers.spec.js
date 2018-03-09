import {Reducer} from 'redux-testkit'

import reducer from '../reducers'
import {types} from '../actions'


const initialState = {
    isFetching: false,
    items: {},
    error: null,
    filter: {
        userId: null,
        text: null,
    },
}

describe('posts reducer', () => {
    it('should handle requesting', () => {
        const action = {
            type: types.POSTS_REQUEST,
        }
        Reducer(reducer).expect(action).toReturnState({
            ...initialState,
            isFetching: true,
            error: null,
        })
    })

    it('should handle receiving', () => {
        const action = {
            type: types.POSTS_RECEIVE,
            payload: {
                json: [
                    {"id": 1, "title": "some title 1"},
                    {"id": 2, "title": "some title 2"},
                ],
            }
        }
        const changes = {
            isFetching: false,
            error: null,
            items: {
                1: {"id": 1, "title": "some title 1"},
                2: {"id": 2, "title": "some title 2"},
            },
        }
        Reducer(reducer).expect(action).toChangeInState(changes)
    })

    it('should handle receiving and override existing items', () => {
        const action = {
            type: types.POSTS_RECEIVE,
            payload: {
                json: [
                    {"id": 1, "title": "some title 1"},
                    {"id": 2, "title": "some title 2"},
                ],
            }
        }
        const existingState = {
            ...initialState,
            items: {
                1: {"id": 1, "title": "some title 1"},
                2: {"id": 2, "title": "some title 2"},
            },
        }
        const changes = {
            items: {
                1: {"id": 1, "title": "some title 1"},
                2: {"id": 2, "title": "some title 2"},
            },
        }
        Reducer(reducer).withState(existingState).expect(action).toChangeInState(changes)
    })

    it('should handle failure', () => {
        const errorMessage = 'some error during posts updating'
        const action = {
            type: types.POSTS_FAILURE,
            payload: {
                error: new Error(errorMessage),
            },
        }
        const existingState = {
            ...initialState,
            isFetching: false,
            error: null,
            items: {
                1: {"id": 1, "title": "some title 1"},
                2: {"id": 2, "title": "some title 2"},
            },
        }
        const changes = {
            isFetching: false,
            error: new Error(errorMessage),
        }
        Reducer(reducer).withState(existingState).expect(action).toChangeInState(changes)
    })

    it('should handle removal', () => {
        const action = {
            type: types.POSTS_REMOVE,
            payload: {
                id: 2,
            },
        }
        const existingState = {
            ...initialState,
            items: {
                1: {"id": 1, "title": "some title 1"},
                2: {"id": 2, "title": "some title 2"},
                3: {"id": 3, "title": "some title 3"},
            },
        }
        const newState = {
            ...existingState,
            items: {
                1: {"id": 1, "title": "some title 1"},
                3: {"id": 3, "title": "some title 3"},
            },
        }
        Reducer(reducer).withState(existingState).expect(action).toReturnState(newState)
    })

    it('should handle filter changes', () => {
        const action = {
            type: types.POSTS_FILTER_CHANGED,
            payload: {
                userId: 2,
                text: 'some text',
            },
        }
        const existingState = {
            ...initialState,
            filter: {
                userId: 1,
                text: null,
            },
        }
        const newState = {
            ...initialState,
            filter: {
                userId: 2,
                text: 'some text',
            },
        }
        Reducer(reducer).withState(existingState).expect(action).toReturnState(newState)
    })
})