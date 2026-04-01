import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Flex,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

import { AppButton } from '@/components/AppButton/AppButton'
import type { AdminUserRole } from '@/features/Admin/mocks/adminUsers.mock'
import {
  collectColumnKeys,
  formatColumnTitle,
  formatTableCellDisplay,
  mergeUsersToTableRows,
  type UserTableRow,
} from '@/features/Admin/utils/userTableHelpers'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectFetchedUsersList,
  selectUsers,
  selectUsersListError,
  selectUsersListStatus,
} from '@/store/slices/usersSlice'
import { deleteUserByRowKey, fetchUsers } from '@/store/thunks/usersThunks'

import styles from './AdminUsersPage.module.scss'

interface AdminUsersPageProps {
  _?: never
}

const roleTagColor: Record<AdminUserRole, string> = {
  Admin: 'blue',
  Editor: 'green',
  Viewer: 'default',
  Support: 'orange',
}

const ADMIN_ROLES: AdminUserRole[] = ['Admin', 'Editor', 'Viewer', 'Support']

function isAdminUserRole(value: unknown): value is AdminUserRole {
  return typeof value === 'string' && ADMIN_ROLES.includes(value as AdminUserRole)
}

export const AdminUsersPage: FC<AdminUsersPageProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  const items = useAppSelector(selectUsers)
  const fetchedList = useAppSelector(selectFetchedUsersList)
  const listStatus = useAppSelector(selectUsersListStatus)
  const listError = useAppSelector(selectUsersListError)

  useEffect(() => {
    void dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (listStatus === 'failed' && listError) {
      message.error(listError)
    }
  }, [listStatus, listError])

  const tableRows = useMemo(
    () => mergeUsersToTableRows(items, fetchedList),
    [items, fetchedList],
  )

  const columnKeys = useMemo(() => collectColumnKeys(tableRows), [tableRows])

  const handleEdit = useCallback(() => {
    message.info('Edit user is not available yet.')
  }, [])

  const handleDelete = useCallback(
    (record: UserTableRow) => {
      Modal.confirm({
        title: 'Delete this user?',
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: async () => {
          try {
            await dispatch(deleteUserByRowKey(record.__rowKey)).unwrap()
            message.success('User deleted.')
          } catch (err) {
            message.error(
              typeof err === 'string' ? err : 'Could not delete user.',
            )
          }
        },
      })
    },
    [dispatch],
  )

  const userColumns: ColumnsType<UserTableRow> = useMemo(() => {
    const dataColumns = columnKeys.map((key) => {
      const isMultilineCell = key === 'address' || key === 'company'
      return {
        title: formatColumnTitle(key),
        dataIndex: key,
        key,
        ellipsis: !isMultilineCell,
        ...(isMultilineCell && {
          width: 240,
          onCell: () => ({ style: { verticalAlign: 'top' as const } }),
        }),
        render: (_: unknown, record: UserTableRow) => {
          const value = record[key]
          if (key === 'role' && isAdminUserRole(value)) {
            return <Tag color={roleTagColor[value]}>{value}</Tag>
          }
          const text = formatTableCellDisplay(key, value)
          if (isMultilineCell) {
            return (
              <span className={styles.adminUsersPage__cellWrap}>{text}</span>
            )
          }
          return text
        },
      }
    })

    const actionsColumn: ColumnsType<UserTableRow>[number] = {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 148,
      align: 'center',
      render: (_: unknown, record: UserTableRow) => (
        <Space
          size="small"
          className={styles.adminUsersPage__actionsCell}
        >
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              handleEdit()
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(record)
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    }

    return [...dataColumns, actionsColumn]
  }, [columnKeys, handleDelete, handleEdit])

  const filteredUsers = useMemo(() => {
    const q = searchText.trim().toLowerCase()
    if (!q) {
      return tableRows
    }
    return tableRows.filter((row) =>
      Object.entries(row).some(
        ([k, v]) =>
          k !== '__rowKey' &&
          formatTableCellDisplay(k, v).toLowerCase().includes(q),
      ),
    )
  }, [searchText, tableRows])

  const handleAddUser = useCallback(() => {
    navigate('/admin/users/new')
  }, [navigate])

  return (
    <Card>
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Users
        </Typography.Title>

        <Flex align="center" gap="middle" justify="space-between" wrap="wrap">
          <Input.Search
            allowClear
            placeholder="Search across all columns"
            style={{ flex: '1 1 280px', maxWidth: 420 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <AppButton appearance="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
            Add user
          </AppButton>
        </Flex>

        <Table<UserTableRow>
          className={styles.adminUsersPage__table}
          columns={userColumns}
          dataSource={filteredUsers}
          loading={listStatus === 'loading'}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          rowKey="__rowKey"
          scroll={{ x: 'max-content' }}
        />
      </Space>
    </Card>
  )
}
