import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Item, Dimmer, Loader, Message} from 'semantic-ui-react'

import {PostContainer} from '../post/post'

import {fetchPosts} from '../../reducers/posts/actions'
import {getPostsFiltered} from '../../reducers/posts/reducers'


class Feed extends React.Component {
    static propTypes = {
        posts: PropTypes.shape({
            isFetching: PropTypes.bool.isRequired,
            items: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                userId: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                body: PropTypes.string.isRequired,
            })).isRequired,
            error: PropTypes.any,
        }),
    }

    componentWillMount() {
        this.props.loadPosts()
    }

    render() {
        const posts = this.props.posts

        return (
            <div>
                <Dimmer active={this.props.posts.isFetching} inverted>
                    <Loader/>
                </Dimmer>

                <Item.Group style={{marginTop: 0}}>
                    {this.props.posts.items.length ?
                        posts.items.map(item => (
                            <PostContainer
                                key={item.id}
                                id={item.id}
                                userId={item.userId}
                                title={item.title}
                                body={item.body}
                            />
                        ))
                        : null}
                </Item.Group>

                {
                    this.props.posts.error ?
                        <Message negative>
                            <Message.Header>Network error</Message.Header>
                            <p>An error occurred during loading posts</p>
                        </Message>
                        : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: getPostsFiltered(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPosts: () => dispatch(fetchPosts()),
    }
}

export const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Feed)
