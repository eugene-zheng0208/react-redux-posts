import React from 'react'

import {Grid} from 'semantic-ui-react'

import Page from '../base/page'
import {FeedContainer, FilterContainer} from '../../../components/feed'


export class FeedPage extends React.Component {
    render() {
        return (
            <Page>
                <Grid centered columns={2}>
                    <Grid.Column width="10">
                        <FeedContainer/>
                    </Grid.Column>
                    <Grid.Column width="4">
                        <FilterContainer/>
                    </Grid.Column>
                </Grid>
            </Page>
        )
    }
}
