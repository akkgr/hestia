import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { withAuthorization, withEmailVerification } from '../Session'
import * as ROUTES from '../../constants/routes'
import Buildings from './Buildings'
import BuildingEdit from './BuildingEdit'

const BuildingsPage = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.BUILDING_DETAILS} component={BuildingEdit} />
      <Route exact path={ROUTES.BUILDINGS} component={Buildings} />
    </Switch>
  )
}

const condition = authUser => !!authUser

export default withEmailVerification(
  withAuthorization(condition)(BuildingsPage)
)
