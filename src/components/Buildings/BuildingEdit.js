import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'

import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'

const BuildingEdit = props => {
  const firebase = useContext(FirebaseContext)
  const [item, setItem] = useState({})
  const [id, setId] = useState('new')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.match.params.id === 'new') {
      setId('new')
    } else {
      setLoading(true)
      const unsubscribe = firebase.building(props.match.params.id).onSnapshot(
        snapshot => {
          setItem({ ...snapshot.data() })
          setId(snapshot.id)
          setLoading(false)
        },
        error => {
          setId('new')
          setLoading(false)
          message.error(error)
        }
      )

      return () => {
        unsubscribe && unsubscribe()
      }
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        onEdit(values)
      }
    })
  }

  const onEdit = values => {
    setLoading(true)
    if (id === 'new') {
      values.userId = props.authUser.uid
      firebase
        .newBuilding()
        .add({
          ...values,
          editedAt: firebase.fieldValue.serverTimestamp()
        })
        .then(function(docRef) {
          setLoading(false)
          setItem({ ...values })
          setId(docRef.id)
          message.success('Επιτυχής Καταχώρηση.')
        })
        .catch(function(error) {
          setLoading(false)
          message.error(error)
        })
    } else {
      firebase
        .building(id)
        .update({
          ...values,
          editedAt: firebase.fieldValue.serverTimestamp()
        })
        .then(function(docRef) {
          setLoading(false)
          setItem({ ...values })
          message.success('Επιτυχής Καταχώρηση.')
        })
        .catch(function(error) {
          setLoading(false)
          message.error(error)
        })
    }
  }

  const onDel = () => {
    setLoading(true)
    firebase
      .building(id)
      .delete()
      .then(function() {
        setLoading(false)
        message.success('Επιτυχής Διαγραφή.')
        setId('new')
      })
      .catch(function(error) {
        setLoading(false)
        message.error(error)
      })
  }

  const { getFieldDecorator } = props.form

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Οδός">
        {getFieldDecorator('street', {
          initialValue: item.street,
          rules: [{ required: true, message: 'Πρέπει να συμπληρωθεί!' }]
        })(<Input placeholder="Οδός" />)}
      </Form.Item>
      <Form.Item label="Αριθμός">
        {getFieldDecorator('streetNumber', {
          initialValue: item.streetNumber,
          rules: [{ required: true, message: 'Πρέπει να συμπληρωθεί!' }]
        })(<Input placeholder="Αριθμός" />)}
      </Form.Item>
      <Form.Item label="Περιοχή">
        {getFieldDecorator('area', {
          initialValue: item.area,
          rules: [{ required: true, message: 'Πρέπει να συμπληρωθεί!' }]
        })(<Input placeholder="Περιοχή" />)}
      </Form.Item>
      <Form.Item label="Τ.Κ.">
        {getFieldDecorator('postalCode', {
          initialValue: item.postalCode,
          rules: [{ required: true, message: 'Πρέπει να συμπληρωθεί!' }]
        })(<Input placeholder="Τ.Κ." />)}
      </Form.Item>
      {id !== 'new' && (
        <Button loading={loading} icon="delete" type="danger" onClick={onDel}>
          Διαγραφή
        </Button>
      )}
      <Button
        icon="save"
        type="primary"
        htmlType="submit"
        loading={loading}
        style={{ float: 'right' }}
      >
        Αποθήκευση
      </Button>
    </Form>
  )
}

const BuildingEditForm = Form.create({ name: 'buildingEdit' })(BuildingEdit)

const condition = authUser => !!authUser

export default withAuthorization(condition, true)(BuildingEditForm)
