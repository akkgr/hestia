import React, { useContext, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'
// import * as ROLES from '../../constants/roles'

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
)

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use'

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`

const SignUpFormBase = ({ history }) => {
  const firebase = useContext(FirebaseContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [passwordOne, setpasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  // const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState(null)

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === ''

  const onSubmit = event => {
    // const roles = []

    // if (isAdmin) {
    //   roles.push(ROLES.ADMIN)
    // }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return firebase.user(authUser.user.uid).set(
          {
            username,
            email
            // roles
          },
          { merge: true }
        )
      })
      .then(() => {
        return firebase.doSendEmailVerification()
      })
      .then(() => {
        setUsername('')
        setEmail('')
        setpasswordOne('')
        setPasswordTwo('')
        setError(null)
        // setIsAdmin(false)
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }

        setError(error)
      })

    event.preventDefault()
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        <Input
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Full Name"
        />
      </Form.Item>
      <Form.Item>
        <Input
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          name="passwordOne"
          value={passwordOne}
          onChange={e => setpasswordOne(e.target.value)}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          name="passwordTwo"
          value={passwordTwo}
          onChange={e => setPasswordTwo(e.target.value)}
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button disabled={isInvalid}>Sign Up</Button>
      </Form.Item>
      {error && <p>{error.message}</p>}
    </Form>
  )
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)
const SignUpForm = withRouter(SignUpFormBase)
export default SignUpPage
export { SignUpForm, SignUpLink }
