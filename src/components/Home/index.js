import React, { Component } from 'react'
import { compose } from 'recompose'

import { withAuthorization, withEmailVerification } from '../Session'
import { withFirebase } from '../Firebase'
import Buildings from '../Buildings'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: null
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
      let users = {}
      snapshot.forEach(doc => (users[doc.id] = doc.data()))

      this.setState({
        users
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return <Buildings items={this.state.items} />
  }
}

const condition = authUser => !!authUser

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(HomePage)
