import React, { useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'

import AuthUserContext from './context'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const withAuthorization = condition => Component => {
  const WithAuthorization = ({ history, ...props }) => {
    const firebase = useContext(FirebaseContext)
    const authUser = useContext(AuthUserContext)

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
      <Component {...props} authUser={authUser} />
    ) : null
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
