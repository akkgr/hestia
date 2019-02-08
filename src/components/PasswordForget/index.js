import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
)

const PasswordForgetForm = () => {
  const firebase = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const isInvalid = email === ''

  const onSubmit = event => {
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('')
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
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
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

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage

export { PasswordForgetForm, PasswordForgetLink }
