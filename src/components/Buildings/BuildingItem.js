import React from 'react'
import { Link } from 'react-router-dom'
import { List, Icon } from 'antd'

import * as ROUTES from '../../constants/routes'

const BuildingItem = props => {
  const { item } = props
  const IconText = ({ type, text, link }) => (
    <Link to={link}>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </Link>
  )

  return (
    <List.Item
      key={item.uid}
      actions={[
        <IconText
          type="star-o"
          text="156"
          link={`${ROUTES.BUILDINGS}/${item.uid}`}
        />,
        <IconText
          type="like-o"
          text="156"
          link={`${ROUTES.BUILDINGS}/${item.uid}`}
        />,
        <IconText
          type="message"
          text="2"
          link={`${ROUTES.BUILDINGS}/${item.uid}`}
        />
      ]}
    >
      <List.Item.Meta title={item.title} description={item.description} />
    </List.Item>
  )
}

export default BuildingItem
