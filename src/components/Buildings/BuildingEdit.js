import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'

import { withAuthorization, withEmailVerification } from '../Session'
import { FirebaseContext } from '../Firebase'

const BuildingEdit = props => {
  const firebase = useContext(FirebaseContext)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = firebase
      .building(props.match.params.id)
      .onSnapshot(snapshot => {
        setItem({ ...snapshot.data(), id: snapshot.id })
        setLoading(false)
      })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  const onEdit = item => {
    firebase.building(item.id).update({
      ...item,
      editedAt: firebase.fieldValue.serverTimestamp()
    })
  }

  return (
    <>
      {loading && <div>Loading ...</div>}
      {item && (
        <Form>
          <Form.Item>
            <Input
              value={item.title}
              onChange={e => setItem({ ...item, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => onEdit(item)}>Save</Button>
          </Form.Item>
        </Form>
      )}
      {error && error.message}
    </>
  )
}

const condition = authUser => !!authUser

export default withEmailVerification(withAuthorization(condition)(BuildingEdit))
