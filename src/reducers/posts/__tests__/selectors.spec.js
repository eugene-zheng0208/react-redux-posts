import {Selector} from 'redux-testkit'

import {getPostsFiltered} from '../reducers'


const initialState = {
    isFetching: false,
    items: {},
    error: null,
    filter: {
        userId: null,
        text: null,
    },
}
const postsMock = {
    1: {userId: 1, title: 'some title 1', body: 'some text 1'},
    2: {userId: 1, title: 'some title 2', body: 'some text 2'},
    3: {userId: 2, title: 'some title 3', body: 'some text 3'},
    4: {userId: 2, title: 'some title 4', body: 'some text 4'},
    5: {userId: 3, title: 'some title 5', body: 'some text 5'},
}

describe('posts selectors', () => {
    it('should get posts filtered by user id', () => {
        const state = {
            posts: {
                ...initialState,
                isFetching: false,
                items: {...postsMock},
                filter: {
                    userId: 2,
                    text: null,
                },
            },
        }
        const result = {
            ...state.posts,
            items: [
                postsMock['3'],
                postsMock['4'],
            ],
        }

        Selector(getPostsFiltered).expect(state).toReturn(result)
    })

    it('should get posts filtered by text', () => {
        const state = {
            posts: {
                ...initialState,
                isFetching: false,
                items: {...postsMock},
                filter: {
                    userId: null,
                    text: 'text 4',
                },
            },
        }
        const result = {
            ...state.posts,
            items: [
                postsMock['4'],
            ],
        }

        Selector(getPostsFiltered).expect(state).toReturn(result)
    })

    it('should get posts filtered by both userId and text', () => {
        const state = {
            posts: {
                ...initialState,
                isFetching: false,
                items: {...postsMock},
                filter: {
                    userId: 1,
                    text: 'text 1',
                },
            },
        }
        const result = {
            ...state.posts,
            items: [
                postsMock['1'],
            ],
        }

        Selector(getPostsFiltered).expect(state).toReturn(result)
    })
})