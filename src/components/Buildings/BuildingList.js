import React from 'react'
import { List } from 'antd'
import BuildingItem from './BuildingItem'

const BuildingList = ({ items }) => (
  <List
    itemLayout="vertical"
    pagination={{
      pageSize: 2
    }}
    dataSource={items}
    renderItem={item => <BuildingItem item={item} />}
  />
)

export default BuildingList
