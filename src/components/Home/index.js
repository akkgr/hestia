import React, { useContext, useState, useEffect } from 'react'

import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'
import Messages from '../Messages'

const HomePage = ({ authUser }) => {
  const firebase = useContext(FirebaseContext)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.users().onSnapshot(snapshot => {
      let users = {}
      snapshot.forEach(doc => (users[doc.id] = doc.data()))
      setUsers(users)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>

      <Messages users={users} authUser={authUser} />
    </div>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition, true)(HomePage)
