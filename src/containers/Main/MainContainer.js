import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'components'
import { loading, loaded } from './styles.scss'

class MainContainer extends Component {

  render () {
    let container = this.props.loading ? loading : loaded
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        {this.props.children}
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(
  (state) => ({
    isAuthed: state.User.isAuthed,
    loading: state.User.loading,
  })
)(MainContainer)
