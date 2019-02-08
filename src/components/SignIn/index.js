import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
)

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential'

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`

const SignInFormBase = ({ history }) => {
  const firebase = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const isInvalid = password === '' || email === ''

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('')
        setPassword('')
        setError('')
        history.push(ROUTES.HOME)
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
        <Input
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button disabled={isInvalid} onClick={onSubmit}>
          Sign In
        </Button>
      </Form.Item>
      {error && <p>{error.message}</p>}
    </Form>
  )
}

const SignInGoogleBase = ({ history }) => {
  const [error, setError] = useState(null)
  const firebase = useContext(FirebaseContext)

  const onSubmit = event => {
    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: []
          },
          { merge: true }
        )
      })
      .then(() => {
        setError(null)
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }

        setError(error)
      })
  }

  return (
    <>
      <Button onClick={onSubmit}>Sign In with Google</Button>

      {error && <p>{error.message}</p>}
    </>
  )
}

const SignInFacebookBase = ({ history }) => {
  const [error, setError] = useState('')
  const firebase = useContext(FirebaseContext)

  const onSubmit = event => {
    firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        return firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: []
          },
          { merge: true }
        )
      })
      .then(() => {
        setError(null)
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        setError(error)
      })
  }

  return (
    <>
      <Button onClick={onSubmit}>Sign In with Facebook</Button>

      {error && <p>{error.message}</p>}
    </>
  )
}

const SignInTwitterBase = ({ history }) => {
  const [error, setError] = useState('')
  const firebase = useContext(FirebaseContext)

  const onSubmit = event => {
    firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        return firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: []
          },
          { merge: true }
        )
      })
      .then(() => {
        setError(null)
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }

        setError(error)
      })
  }

  return (
    <>
      <Button onClick={onSubmit}>Sign In with Twitter</Button>

      {error && <p>{error.message}</p>}
    </>
  )
}

const SignInForm = withRouter(SignInFormBase)

const SignInGoogle = withRouter(SignInGoogleBase)

const SignInFacebook = withRouter(SignInFacebookBase)

const SignInTwitter = withRouter(SignInTwitterBase)

export default SignInPage

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter }
