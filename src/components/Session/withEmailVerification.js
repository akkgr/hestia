import React, { useContext, useState } from 'react'
import { Button } from 'antd'
import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password')

const withEmailVerification = Component => {
  const WithEmailVerification = props => {
    const authUser = useContext(AuthUserContext)
    const firebase = useContext(FirebaseContext)
    const [isSent, setIsSent] = useState(false)

    const onSendEmailVerification = () => {
      firebase.doSendEmailVerification().then(() => setIsSent(true))
    }

    return needsEmailVerification(authUser) ? (
      <div>
        {isSent ? (
          <p>
            E-Mail confirmation sent: Check you E-Mails (Spam folder included)
            for a confirmation E-Mail. Refresh this page once you confirmed your
            E-Mail.
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
      <Component {...props} />
    )
  }
  return WithEmailVerification
}

export default withEmailVerification
