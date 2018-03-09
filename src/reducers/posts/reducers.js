import {handleActions} from 'redux-actions'
import {createSelector} from 'reselect'

import {types} from './actions'


// Posts by id
export default handleActions(
    {
        [types.POSTS_REQUEST]: (state, action) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [types.POSTS_RECEIVE]: (state, action) => ({
            ...state,
            isFetching: false,
            error: null,
            // Transforming an array of objects with ids to an object with ids as keys
            items: action.payload.json.reduce((result, current) => {
                result[current.id] = current
                return result
            }, {}),
        }),
        [types.POSTS_FAILURE]: (state, action) => ({
            ...state,
            isFetching: false,
            error: action.payload.error,
        }),
        [types.POSTS_REMOVE]: (state, action) => ({
            ...state,
            items: Object.keys(state.items)
                .filter(key => parseInt(key, 10) !== parseInt(action.payload.id, 10))
                .reduce((result, current) => {
                    result[current] = state.items[current]
                    return result
                }, {}),
        }),
        [types.POSTS_FILTER_CHANGED]: (state, action) => ({
            ...state,
            filter: {
                ...state.filter,
                userId: action.payload.userId,
                text: action.payload.text,
            },
        }),
    },
    {
        isFetching: false,
        items: {},
        error: null,
        filter: {
            userId: null,
            text: null,
        },
    }
)

const postsData = (state) => state.posts
const postsFilter = (state) => state.posts.filter

export const getPostsFiltered = createSelector(
    [postsData, postsFilter],
    (postsData, filter) => ({
        ...postsData,
        items: Object.values(postsData.items)
            .filter(item => {
                return (
                    filter.userId ? item.userId === filter.userId : true
                )
            })
            .filter(item => {
                return (
                    filter.text ? item.title.includes(filter.text) || item.body.includes(filter.text) : true
                )
            }),
    })
)


