import React from 'react'

const AuthUserContext = React.createContext(null)

export const withAuthUser = Component => props => (
  <AuthUserContext.Consumer>
    {authUser => <Component {...props} user={authUser} />}
  </AuthUserContext.Consumer>
)

export default AuthUserContext
