import React, { useEffect, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const withAuthorization = (condition, emailVerified) => Component => {
  const WithAuthorization = ({ history, ...props }) => {
    const firebase = useContext(FirebaseContext)
    const authUser = useContext(AuthUserContext)
    const [isSent, setIsSent] = useState(false)

    const onSendEmailVerification = () => {
      firebase.doSendEmailVerification().then(() => setIsSent(true))
    }
    const needsEmailVerification = authUser =>
      authUser &&
      !authUser.emailVerified &&
      authUser.providerData
        .map(provider => provider.providerId)
        .includes('password')

    useEffect(() => {
      const listener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN)
          }
        },
        () => history.push(ROUTES.SIGN_IN)
      )
      return () => {
        listener()
      }
    }, [])

    return condition(authUser) ? (
      needsEmailVerification(authUser) ? (
        <div>
          {isSent ? (
            <p>
              E-Mail confirmation sent: Check you E-Mails (Spam folder included)
              for a confirmation E-Mail. Refresh this page once you confirmed
              your E-Mail.
            </p>
          ) : (
            <p>
              Verify your E-Mail: Check you E-Mails (Spam folder included) for a
              confirmation E-Mail or send another confirmation E-Mail.
            </p>
          )}

          <Button onClick={onSendEmailVerification} disabled={isSent}>
            Send confirmation E-Mail
          </Button>
        </div>
      ) : (
        <Component {...props} authUser={authUser} />
      )
    ) : null
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
