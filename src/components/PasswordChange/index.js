import React, { useState, useContext } from 'react'
import { Form, Input, Button } from 'antd'
import { FirebaseContext } from '../Firebase'

const PasswordChangeForm = () => {
  const firebase = useContext(FirebaseContext)
  const [passwordOne, setpasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState(null)

  const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

  const onSubmit = event => {
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setpasswordOne('')
        setPasswordTwo('')
        setError(null)
      })
      .catch(error => {
        setError(error)
      })
  }

  return (
    <Form layout="inline">
      <Form.Item>
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={e => setpasswordOne(e.target.value)}
          type="password"
          placeholder="New Password"
        />
      </Form.Item>
      <Form.Item>
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={e => setPasswordTwo(e.target.value)}
          type="password"
          placeholder="Confirm New Password"
        />
      </Form.Item>
      <Form.Item>
        <Button disabled={isInvalid} onClick={onSubmit}>
          Reset My Password
        </Button>
      </Form.Item>
      {error && <p>{error.message}</p>}
    </Form>
  )
}

export default PasswordChangeForm
