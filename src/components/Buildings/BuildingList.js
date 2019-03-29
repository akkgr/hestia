import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon, Tooltip } from 'antd'
import * as ROUTES from '../../constants/routes'

const BuildingList = ({ data, loading }) => {
  const title = () => (
    <Tooltip title="Νέα Καταχώρηση">
      <Link to={`${ROUTES.BUILDINGS}/new`}>
        <Icon type="plus-circle" />
      </Link>
    </Tooltip>
  )

  const tableProps = {
    bordered: false,
    loading: loading,
    pagination: { position: 'bottom' },
    size: 'small',
    title: () => <h3>Λίστα Κτιρίων</h3>,
    showHeader: true,
    footer: () => `Σύνολο εγγραφών: ${data.length}`,
    hasData: true,
    rowKey: 'id'
  }

  const columns = [
    {
      title: 'Περιοχή',
      dataIndex: 'area',
      key: 'area',
      sorter: (a, b) => a.area.localeCompare(b.area)
    },
    {
      title: 'Οδός',
      dataIndex: 'street',
      key: 'street',
      sorter: (a, b) => a.street.localeCompare(b.street)
    },
    {
      title: 'Αριθμός',
      dataIndex: 'streetNumber',
      key: 'streetNumber',
      sorter: (a, b) => a.streetNumber.localeCompare(b.streetNumber)
    },
    {
      title: 'T.K.',
      dataIndex: 'postalCode',
      key: 'postalCode',
      sorter: (a, b) => a.postalCode.localeCompare(b.postalCode)
    },
    {
      title: title,
      dataIndex: 'id',
      key: 'edit',
      render: text => (
        <Tooltip title="Καρτέλα Κτιρίου">
          <Link to={`${ROUTES.BUILDINGS}/${text}`}>
            <Icon type="form" />
          </Link>
        </Tooltip>
      )
    }
  ]

  return <Table {...tableProps} columns={columns} dataSource={data} />
}

export default BuildingList
