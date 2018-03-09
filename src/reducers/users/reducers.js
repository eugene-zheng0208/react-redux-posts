import {handleActions} from 'redux-actions'
import createCachedSelector from 're-reselect'

import {types} from './actions'


// Users by id
export default handleActions(
    {
        [types.USER_REQUEST]: (state, action) => ({
            ...state,
            [action.payload.id]: {
                isFetching: true,
                error: null,
            },
        }),
        [types.USER_RECEIVE]: (state, action) => ({
            ...state,
            [action.payload.id]: {
                isFetching: false,
                error: null,
                ...action.payload.json,
            },
        }),
        [types.USER_FAILURE]: (state, action) => ({
            ...state,
            [action.payload.id]: {
                isFetching: false,
                error: action.payload.error,
            },
        }),
    },
    {}
)

const userById = (state, id) => Object.values(state.users).find(
    item => item.id === id
)
export const getAllUsers = (state) => Object.values(state.users)

export const getUserById = createCachedSelector(
    [userById],
    user => user
)(
    (state, id) => id
)
