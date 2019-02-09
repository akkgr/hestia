import React from 'react'

import { withAuthorization, withEmailVerification } from '../Session'
import { FirebaseContext } from '../Firebase'

const BuildingEdit = props => {
  return <div />
}

const condition = authUser => !!authUser

export default withEmailVerification(withAuthorization(condition)(BuildingEdit))
