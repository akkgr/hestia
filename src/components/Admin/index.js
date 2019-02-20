import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { withAuthorization } from '../Session'
import { UserList, UserItem } from '../Users'
import * as ROLES from '../../constants/roles'
import * as ROUTES from '../../constants/routes'

const AdminPage = () => {
  return (
    <div>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>

      <Switch>
        <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={UserList} />
      </Switch>
    </div>
  )
}

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN)

export default withAuthorization(condition, true)(AdminPage)
