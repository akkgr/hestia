import React, { useState, useContext, useEffect } from 'react'
import { Button } from 'antd'
import { FirebaseContext } from '../Firebase'

const UserItem = ({ match }) => {
  const firebase = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
      return
    }

    setLoading(true)

    const unsubscribe = firebase.user(match.params.id).onSnapshot(snapshot => {
      setUser(snapshot.data())
      setLoading(false)
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  const onSendPasswordResetEmail = () => {
    firebase.doPasswordReset(user.email)
  }

  return (
    <div>
      <h2>User ({match.params.id})</h2>
      {loading && <div>Loading ...</div>}

      {user && (
        <div>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
          <span>
            <Button type="button" onClick={onSendPasswordResetEmail}>
              Send Password Reset
            </Button>
          </span>
        </div>
      )}
    </div>
  )
}

export default UserItem
