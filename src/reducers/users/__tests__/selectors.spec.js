import {Selector} from 'redux-testkit'

import {getAllUsers, getUserById} from '../reducers'


const initialUser = {
    isFetching: false,
    error: null,
}
const usersMock = {
    1: {...initialUser, id: 1, name: 'some name 1'},
    2: {...initialUser, id: 2, name: 'some name 2'},
    3: {...initialUser, id: 3, name: 'some name 3'},
    4: {...initialUser, id: 4, name: 'some name 4'},
    5: {...initialUser, id: 5, name: 'some name 5'},
}

describe('users selectors', () => {
    it('should get all users', () => {
        const state = {
            users: {...usersMock},
        }
        const result = Object.values({
            ...state.users,
        })

        Selector(getAllUsers).expect(state).toReturn(result)
    })

    it('should get user by id', () => {
        const state = {
            users: {...usersMock},
        }
        const id = 3
        const result = state.users[id]

        Selector(getUserById).expect(state, id).toReturn(result)
    })
})