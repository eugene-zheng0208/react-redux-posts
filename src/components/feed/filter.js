import React from 'react'
import {connect} from 'react-redux'

import {Segment, Header, Icon, Label, Input, Dropdown} from 'semantic-ui-react'

import {getAllUsers} from '../../reducers/users/reducers'
import {filterPostsInFeed} from '../../reducers/posts/actions'

import './feed.css'


class Filter extends React.Component {
    static propTypes = {}

    constructor() {
        super()

        this.state = {
            author: null,
            text: null,
        }
    }

    usersToDropdownOptions(users) {
        return [{
            key: -1,
            value: 'ANY',
            text: 'Any user'
        }]
            .concat(
                users
                    .filter(item => !item.isFetching)
                    .map(item => ({
                        key: item.id,
                        value: item.id,
                        text: item.name,
                    }))
            )
    }

    filter() {
        this.props.filterPosts(this.state.author, this.state.text)
    }

    render() {
        return (
            <div className="filter">
                <Segment>
                    <Header>Filter</Header>
                    <Label corner={'right'}><Icon name={'search'}/></Label>

                    <div>
                        <Label pointing='below'><Icon name={'user'}/>User</Label>
                        <Dropdown
                            placeholder='User' size={'tiny'} labeled fluid search selection
                            defaultValue={'ANY'}
                            options={this.usersToDropdownOptions(this.props.users)}
                            onChange={(e, data) => {
                                this.setState({author: data.value === 'ANY' ? null : data.value}, () => this.filter())
                            }}
                        />
                        <br/>
                        <Label pointing='below'><Icon name={'write'}/>Text</Label>
                        <Input
                            placeholder='Text' size={'tiny'} fluid
                            onChange={(e, data) => {
                                this.setState({text: data.value ? data.value : null}, () => this.filter())
                            }}
                        />
                    </div>
                </Segment>
            </div>
        )
    }
}

export const FilterContainer = connect(
    (state) => ({
        users: getAllUsers(state),
    }),
    (dispatch) => ({
        filterPosts: (author, text) => dispatch(filterPostsInFeed(author, text)),
    })
)(Filter)