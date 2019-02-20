import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'
import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null
  },
  {
    id: 'google.com',
    provider: 'googleProvider'
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider'
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider'
  }
]

const AccountPage = ({ authUser }) => {
  return (
    <div>
      <h1>Account: {authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
      <LoginManagement authUser={authUser} />
    </div>
  )
}

const LoginManagement = ({ authUser }) => {
  const firebase = useContext(FirebaseContext)
  const [activeSignInMethods, setActiveSignInMethods] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSignInMethods()
  }, [])

  const fetchSignInMethods = () => {
    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then(activeSignInMethods => {
        setError(null)
        setActiveSignInMethods(activeSignInMethods)
      })
      .catch(error => setError(error))
  }

  const onSocialLoginLink = provider => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(fetchSignInMethods)
      .catch(error => setError(error))
  }

  const onDefaultLoginLink = password => {
    const credential = firebase.emailAuthProvider.credential(
      authUser.email,
      password
    )

    firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(fetchSignInMethods)
      .catch(error => setError(error))
  }

  const onUnlink = providerId => {
    firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignInMethods)
      .catch(error => setError(error))
  }

  return (
    <div>
      Sign In Methods:
      <ul>
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1
          const isEnabled = activeSignInMethods.includes(signInMethod.id)

          return (
            <li key={signInMethod.id}>
              {signInMethod.id === 'password' ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onDefaultLoginLink}
                  onUnlink={onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onSocialLoginLink}
                  onUnlink={onUnlink}
                />
              )}
            </li>
          )
        })}
      </ul>
      {error && error.message}
    </div>
  )
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) =>
  isEnabled ? (
    <Button onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Button onClick={() => onLink(signInMethod.provider)}>
      Link {signInMethod.id}
    </Button>
  )

const DefaultLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onUnlink,
  onLink
}) => {
  const [passwordOne, setpasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

  const onSubmit = event => {
    event.preventDefault()
    onLink(this.state.passwordOne)
    setpasswordOne('')
    setPasswordTwo('')
  }

  return isEnabled ? (
    <Button onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        <Input.Password
          name="passwordOne"
          value={passwordOne}
          onChange={e => setpasswordOne(e.target.value)}
          placeholder="New Password"
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          name="passwordTwo"
          value={passwordTwo}
          onChange={e => setPasswordTwo(e.target.value)}
          placeholder="Confirm New Password"
        />
      </Form.Item>
      <Form.Item>
        <Button disabled={isInvalid}>Link {signInMethod.id}</Button>
      </Form.Item>
    </Form>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition, true)(AccountPage)
