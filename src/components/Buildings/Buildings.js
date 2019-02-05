import React, { Component } from 'react'
import { compose } from 'recompose'

import { withAuthUser } from '../Session'
import { withFirebase } from '../Firebase'
import BuildingList from './BuildingList'

class Buildings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      items: [],
      limit: 5
    }
  }

  componentDidMount() {
    this.onListenForMessages()
  }

  onListenForMessages = () => {
    this.setState({ loading: true })

    this.unsubscribe = this.props.firebase
      .buildings(this.props.user.uid)
      .orderBy('title', 'asc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let items = []
          snapshot.forEach(doc => items.push({ ...doc.data(), uid: doc.id }))

          this.setState({
            items: items.reverse(),
            loading: false
          })
        } else {
          this.setState({ items: [], loading: false })
        }
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages
    )
  }

  render() {
    const { items, loading } = this.state

    return <BuildingList loading={loading} items={items} />
  }
}

export default compose(
  withFirebase,
  withAuthUser
)(Buildings)
