import React, { useState } from 'react'
import { Input, Button } from 'antd'

const MessageItem = props => {
  const [editMode, setEditMode] = useState(false)
  const [editText, setEditText] = useState(props.message.text)
  const { message, onRemoveMessage } = props

  const onToggleEditMode = () => {
    setEditMode(!editMode)
    setEditText(props.message.text)
  }

  const onChangeEditText = event => {
    setEditText(event.target.value)
  }

  const onSaveEditText = () => {
    props.onEditMessage(props.message, editText)
    setEditMode(false)
  }

  return (
    <li>
      {editMode ? (
        <Input value={editText} onChange={onChangeEditText} />
      ) : (
        <span>
          <strong>{message.user.username || message.user.userId}</strong>{' '}
          {message.text} {message.editedAt && <span>(Edited)</span>}
        </span>
      )}

      {editMode ? (
        <span>
          <Button onClick={onSaveEditText}>Save</Button>
          <Button onClick={onToggleEditMode}>Reset</Button>
        </span>
      ) : (
        <Button onClick={onToggleEditMode}>Edit</Button>
      )}

      {!editMode && (
        <Button type="button" onClick={() => onRemoveMessage(message.uid)}>
          Delete
        </Button>
      )}
    </li>
  )
}

export default MessageItem
