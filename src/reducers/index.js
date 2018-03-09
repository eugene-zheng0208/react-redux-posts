import {combineReducers} from 'redux'

import postsReducer from './posts/reducers'
import commentsReducer from './comments/reducers'
import userReducer from './users/reducers'

export default combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    users: userReducer,
})