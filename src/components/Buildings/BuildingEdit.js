import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'

import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'

const BuildingEdit = props => {
  const firebase = useContext(FirebaseContext)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)

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
        <Form layout="inline">
          <Form.Item label="Street">
            <Input
              value={item.street}
              onChange={e => setItem({ ...item, street: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Street Number">
            <Input
              value={item.streetNumber}
              onChange={e => setItem({ ...item, streetNumber: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Area">
            <Input
              value={item.area}
              onChange={e => setItem({ ...item, area: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Postal Code">
            <Input
              value={item.postalCode}
              onChange={e => setItem({ ...item, postalCode: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => onEdit(item)}>Save</Button>
          </Form.Item>
        </Form>
      )}
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition, true)(BuildingEdit)
