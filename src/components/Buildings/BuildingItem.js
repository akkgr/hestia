import React, { Component } from 'react'
import { List, Icon } from 'antd'

class BuildingItem extends Component {
  render() {
    const { item } = this.props
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )

    return (
      <List.Item
        key={item.uid}
        actions={[
          <IconText type="star-o" text="156" />,
          <IconText type="like-o" text="156" />,
          <IconText type="message" text="2" />
        ]}
      >
        <List.Item.Meta title={item.title} description={item.description} />
      </List.Item>
    )
  }
}

export default BuildingItem
