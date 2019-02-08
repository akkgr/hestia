import React, { useState, useEffect, useContext } from 'react'

import { Form, Input, Button } from 'antd'
import { FirebaseContext } from '../Firebase'
import MessageList from './MessageList'

const Messages = ({ users, authUser }) => {
  const firebase = useContext(FirebaseContext)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [limit, setLimit] = useState(5)

  useEffect(() => {
    setLoading(true)

    const unsubscribe = firebase
      .messages()
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let messages = []
          snapshot.forEach(doc => messages.push({ ...doc.data(), uid: doc.id }))
          setMessages(messages.reverse())
          setLoading(false)
        } else {
          setMessages(null)
          setLoading(false)
        }
      })
    return () => {
      unsubscribe()
    }
  }, [limit])

  const onChangeText = event => {
    setText(event.target.value)
  }

  const onCreateMessage = () => {
    firebase.messages().add({
      text: text,
      userId: authUser.uid,
      createdAt: firebase.fieldValue.serverTimestamp()
    })

    setText('')
  }

  const onEditMessage = (message, text) => {
    firebase.message(message.uid).update({
      ...message,
      text,
      editedAt: firebase.fieldValue.serverTimestamp()
    })
  }

  const onRemoveMessage = uid => {
    firebase.message(uid).delete()
  }

  const onNextPage = () => {
    setLimit(limit + 5)
  }

  return (
    <div>
      {!loading && messages && <Button onClick={onNextPage}>More</Button>}

      {loading && <div>Loading ...</div>}

      {messages && (
        <MessageList
          messages={messages.map(message => ({
            ...message,
            user: users ? users[message.userId] : { userId: message.userId }
          }))}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      )}

      {!messages && <div>There are no messages ...</div>}

      <Form layout="inline">
        <Form.Item label="New message">
          <Input value={text} onChange={onChangeText} />
        </Form.Item>
        <Form.Item>
          <Button onClick={onCreateMessage}>Send</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Messages
