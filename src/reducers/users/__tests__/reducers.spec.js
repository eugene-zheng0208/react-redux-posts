import {Reducer} from 'redux-testkit'

import reducer from '../reducers'
import {types} from '../actions'


const initialState = {}
const initialUser = {
    isFetching: true,
    error: null,
}


describe('users reducer', () => {
    it('should handle requesting', () => {
        const action = {
            type: types.USER_REQUEST,
            payload: {
                id: 3,
            },
        }
        Reducer(reducer).expect(action).toReturnState({
            ...initialState,
            "3": {
                ...initialUser,
            },
        })
    })

    it('should handle receiving', () => {
        const action = {
            type: types.USER_RECEIVE,
            payload: {
                id: 2,
                json: {"id": 2, "name": "some name 2"},
            }
        }
        const existingState = {
            ...initialState,
            1: {...initialUser, "id": 1, "name": "some name 1", isFetching: false},
            3: {...initialUser, "id": 3, "name": "some name 3", isFetching: false},
        }
        const newState = {
            ...existingState,
            2: {...initialUser, "id": 2, "name": "some name 2", isFetching: false},
        }
        Reducer(reducer).withState(existingState).expect(action).toReturnState(newState)
    })

    it('should handle receiving and override existing items', () => {
        const action = {
            type: types.USER_RECEIVE,
            payload: {
                id: 2,
                json: {"id": 2, "name": "updated one"},
            }
        }
        const existingState = {
            ...initialState,
            1: {...initialUser, "id": 1, "name": "some name 1", isFetching: false},
            2: {...initialUser, "id": 2, "name": "some name 2", isFetching: false},
            3: {...initialUser, "id": 3, "name": "some name 3", isFetching: false},
        }
        const newState = {
            ...existingState,
            2: {...initialUser, "id": 2, "name": "updated one", isFetching: false},
        }
        Reducer(reducer).withState(existingState).expect(action).toReturnState(newState)
    })

    it('should handle failure', () => {
        const errorMessage = 'some error during user updating'
        const action = {
            type: types.USER_FAILURE,
            payload: {
                id: 2,
                error: new Error(errorMessage),
            },
        }
        const existingState = {
            ...initialState,
            items: {
                1: {"id": 1, "name": "some name 1", isFetching: false, error: null},
            },
        }
        const newState = {
            ...existingState,
            2: {isFetching: false, error: new Error(errorMessage),},
        }
        Reducer(reducer).withState(existingState).expect(action).toReturnState(newState)
    })
})