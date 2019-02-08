import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
import { AuthUserContext } from '../Session'
import { withRouter } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

const NavigationBase = ({ history }) => {
  const authUser = useContext(AuthUserContext)
  let el
  if (authUser) {
    el = <NavigationAuth history={history} authUser={authUser} />
  } else {
    el = <NavigationNonAuth history={history} />
  }
  return el
}

const NavigationAuth = ({ history, authUser }) => {
  const firebase = useContext(FirebaseContext)
  return (
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
        <Link to={ROUTES.HOME}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key={ROUTES.BUILDINGS}>
        <Link to={ROUTES.BUILDINGS}>Buildings</Link>
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
}

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

const Navigation = withRouter(NavigationBase)

export default Navigation
