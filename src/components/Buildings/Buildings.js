import React, { useState, useEffect, useContext } from 'react'
import { withAuthorization } from '../Session'
import { FirebaseContext } from '../Firebase'
import BuildingList from './BuildingList'

const Buildings = ({ authUser }) => {
  const firebase = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    setLoading(true)
    const unsubscribe = firebase
      .buildings(authUser.uid)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let items = []
          snapshot.forEach(doc => items.push({ ...doc.data(), id: doc.id }))
          setItems(items.reverse())
          setLoading(false)
        } else {
          setItems([])
          setLoading(false)
        }
      })
    return () => {
      unsubscribe()
    }
  }, [])

  return <BuildingList loading={loading} data={items} />
}

const condition = authUser => !!authUser

export default withAuthorization(condition, true)(Buildings)
