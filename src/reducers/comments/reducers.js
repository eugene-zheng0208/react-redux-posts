import {handleActions} from 'redux-actions'
import createCachedSelector from 're-reselect'

import {types} from './actions'


// Comments by post id
export default handleActions({
        [types.COMMENTS_REQUEST]: (state, action) => ({
            ...state,
            [action.payload.postId]: {
                isFetching: true,
                error: null,
                items: [],
            }
        }),
        [types.COMMENTS_RECEIVE]: (state, action) => ({
            ...state,
            [action.payload.postId]: {
                isFetching: false,
                error: null,
                items: action.payload.json,
            },
        }),
        [types.COMMENTS_FAILURE]: (state, action) => ({
            ...state,
            [action.payload.postId]: {
                isFetching: false,
                items: [],
                error: action.payload.error,
            },
        })
    },
    {}
)

const getComments = (state, postId) => {
    return state.comments[postId]
}

export const getCommentsByPostId = createCachedSelector(
    [getComments],
    comments => comments
)(
    (state, postId) => postId
)
