import React from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import { AuthUserContext } from '../Session'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

const NavigationBase = ({ firebase, history }) => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth
          authUser={authUser}
          firebase={firebase}
          history={history}
        />
      ) : (
        <NavigationNonAuth history={history} />
      )
    }
  </AuthUserContext.Consumer>
)

const NavigationAuth = ({ authUser, firebase, history }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    selectedKeys={[history.location.pathname]}
    style={{ lineHeight: '64px' }}
  >
    <Menu.Item key={ROUTES.LANDING}>
      <Link to={ROUTES.LANDING}>ΕΣΤΙΑ</Link>
    </Menu.Item>
    <Menu.Item key={ROUTES.HOME}>
      <Link to={ROUTES.HOME}>Home</Link>
    </Menu.Item>
    <Menu.Item key={ROUTES.ACCOUNT}>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </Menu.Item>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <Menu.Item key={ROUTES.ADMIN}>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </Menu.Item>
    )}
    <Menu.Item
      key={ROUTES.SIGN_OUT}
      onClick={firebase.doSignOut}
      style={{ float: 'right' }}
    >
      Sign out
    </Menu.Item>
  </Menu>
)

const NavigationNonAuth = ({ history }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    selectedKeys={[history.location.pathname]}
    style={{ lineHeight: '64px' }}
  >
    <Menu.Item key={ROUTES.LANDING}>
      <Link to={ROUTES.LANDING}>ΕΣΤΙΑ</Link>
    </Menu.Item>
    <Menu.Item key={ROUTES.SIGN_IN} style={{ float: 'right' }}>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Menu.Item>
  </Menu>
)

const Navigation = compose(
  withRouter,
  withFirebase
)(NavigationBase)

export default withFirebase(Navigation)
