import React, { useState, useEffect, useContext } from 'react'
import { withAuthorization, withEmailVerification } from '../Session'
import { FirebaseContext } from '../Firebase'
import BuildingList from './BuildingList'

const Buildings = ({ authUser }) => {
  const firebase = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const limit = 5

  useEffect(() => {
    setLoading(true)
    const unsubscribe = firebase
      .buildings(authUser.uid)
      .orderBy('title', 'asc')
      .limit(limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let items = []
          snapshot.forEach(doc => items.push({ ...doc.data(), uid: doc.id }))
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

  return <BuildingList loading={loading} items={items} />
}

const condition = authUser => !!authUser

export default withEmailVerification(withAuthorization(condition)(Buildings))
