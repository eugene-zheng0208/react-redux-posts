import React from 'react'
import {} from 'semantic-ui-react'

import './page.css'


export default class PageBase extends React.Component {
    render() {
        return (
            <div className='page'>
                {this.props.children}
            </div>
        )
    }
}

PageBase.propTypes = {}