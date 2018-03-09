import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
    Item, Icon, Segment, Button, Popup, Label, Comment as SemComment, Header, Dimmer, Loader
} from 'semantic-ui-react'

import './post.css'

import {getCommentsByPostId} from '../../reducers/comments/reducers'
import {getUserById} from '../../reducers/users/reducers'
import {removePostFromFeed} from '../../reducers/posts/actions'


class Post extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            commentsAreExpanded: false,
        }
    }

    render() {
        const removeBtn = (
            <Button size={'tiny'} icon circular floated='right'
                    onClick={this.props.removePostFromFeedById}>
                <Icon name={'delete'}/>
            </Button>
        )

        return (
            <Item>
                <Item.Content>

                    <Segment attached={'top'} color={'blue'} clearing>
                        <Popup
                            trigger={removeBtn}
                            content={'Remove it'}
                            on={'hover'}
                        />
                        <Header floated={'left'} size={'large'}>
                            {this.props.title}
                        </Header>
                    </Segment>

                    <Segment attached>

                        <Label ribbon color={'grey'}>
                            <Icon name={'user circle'}/>
                            {
                                this.props.author && !this.props.author.isFetching ?
                                    this.props.author.name
                                    : null
                            }
                            <Dimmer active={!this.props.author || this.props.author.isFetching} inverted>
                                <Loader size={'mini'}/>
                            </Dimmer>
                        </Label>

                        <Item.Description>
                            {this.props.body}
                        </Item.Description>

                    </Segment>

                    {
                        this.props.comments.isFetching ? (
                            <Segment attached={'bottom'}>
                                <Dimmer active={this.props.comments.isFetching} inverted>
                                    <Loader size={'mini'}/>
                                </Dimmer>
                            </Segment>
                        ) : (
                            <CommentsBlock
                                comments={this.props.comments.items}
                                commentsAreExpanded={this.state.commentsAreExpanded}
                            />
                        )
                    }

                </Item.Content>
            </Item>
        )
    }
}

export const PostContainer = connect(
    (state, props) => ({
        author: getUserById(state, props.userId),
        comments: getCommentsByPostId(state, props.id),
    }),
    (dispatch, props) => ({
        removePostFromFeedById: () => dispatch(removePostFromFeed(props.id)),
    })
)(Post)


class CommentsBlock extends React.Component {
    static propTypes = {
        commentsAreExpanded: PropTypes.bool.isRequired,
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            postId: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        })).isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            commentsAreExpanded: this.props.commentsAreExpanded || false,
        }
    }

    render() {
        const commentsLabel = (
            this.props.comments.length
                ? `${this.props.comments.length} comment${this.props.comments.length === 1 ? '' : 's'}`
                : 'Be first to comment'
        )
        const commentsContainer = (
            this.state.commentsAreExpanded ?
                <Segment attached secondary>
                    <SemComment.Group collapsed={!this.state.commentsAreExpanded}>
                        {this.props.comments.map((item) => {
                            return <Comment key={item.id} email={item.email} text={item.body}/>
                        })}
                    </SemComment.Group>
                </Segment>
                : null
        )

        return (
            <div>
                {commentsContainer}

                {/*TODO: check if an attached button accessibility issue has been resolved*/}
                {/*https://github.com/Semantic-Org/Semantic-UI-React/issues/1797*/}
                <Button
                    disabled={!this.props.comments.length} animated={'fade'} attached={'bottom'}
                    onClick={() => {
                        this.setState({ commentsAreExpanded: !this.state.commentsAreExpanded })
                    }}
                >
                    <Button.Content visible>
                        <Icon name={'comments'}/>
                        <span>{commentsLabel}</span>
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name={`chevron ${this.state.commentsAreExpanded ? 'up' : 'down'}`}/>
                        <span>{this.state.commentsAreExpanded ? 'Hide' : 'Show'} {commentsLabel}</span>
                    </Button.Content>
                </Button>
            </div>
        )
    }
}


function Comment(props) {
    return (
        <SemComment>
            <SemComment.Avatar src={`https://api.adorable.io/avatars/128/${props.email}.png`}/>
            <SemComment.Content>
                <SemComment.Author>
                    {props.email}
                </SemComment.Author>
                <SemComment.Text>
                    {props.text}
                </SemComment.Text>
            </SemComment.Content>
        </SemComment>
    )
}

Comment.propTypes = {
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}
