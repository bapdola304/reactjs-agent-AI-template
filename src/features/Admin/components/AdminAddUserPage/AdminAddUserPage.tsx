import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Form, Row, Space, Spin, Typography, message } from 'antd'

import { useNavigate, useParams } from 'react-router-dom'

import { AppButton } from '@/components/AppButton/AppButton'
import { FormSelectField } from '@/components/FormSelectField/FormSelectField'
import { FormTextField } from '@/components/FormTextField/FormTextField'
import type { AdminUserRole } from '@/features/Admin/mocks/adminUsers.mock'
import {
  mapAddUserFormToPayload,
  type AddUserFormValues,
} from '@/features/Admin/utils/mapAddUserFormToPayload'
import { formatColumnTitle } from '@/features/Admin/utils/userTableHelpers'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectUsersSubmitting } from '@/store/slices/usersSlice'
import { addUser, loadUserForEdit, updateUser } from '@/store/thunks/usersThunks'

import styles from './AdminAddUserPage.module.scss'

interface AdminAddUserPageProps {
  _?: never
}

const roleOptions: { label: string; value: AdminUserRole }[] = [
  { label: 'Viewer', value: 'Viewer' },
  { label: 'Editor', value: 'Editor' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Support', value: 'Support' },
]

export const AdminAddUserPage: FC<AdminAddUserPageProps> = () => {
  const [form] = Form.useForm<AddUserFormValues>()
  const navigate = useNavigate()
  const { rowKey: rowKeyParam } = useParams<{ rowKey: string }>()
  const rowKey = rowKeyParam ? decodeURIComponent(rowKeyParam) : undefined
  const isEditMode = Boolean(rowKey)

  const dispatch = useAppDispatch()
  const isSubmitting = useAppSelector(selectUsersSubmitting)
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const handleBackToList = useCallback(() => {
    navigate('/admin/users')
  }, [navigate])

  useEffect(() => {
    if (!rowKey) {
      return
    }
    let cancelled = false
    void (async () => {
      setIsLoadingUser(true)
      try {
        const res = await dispatch(loadUserForEdit(rowKey)).unwrap()
        if (!cancelled) {
          form.setFieldsValue(res.formValues)
        }
      } catch (err: unknown) {
        if (!cancelled) {
          message.error(
            typeof err === 'string' ? err : 'Could not load user.',
          )
          navigate('/admin/users')
        }
      } finally {
        if (!cancelled) {
          setIsLoadingUser(false)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [rowKey, dispatch, form, navigate])

  const handleFinish = async (values: AddUserFormValues) => {
    try {
      const payload = mapAddUserFormToPayload(values)
      if (isEditMode && rowKey) {
        await dispatch(updateUser({ rowKey, payload })).unwrap()
        message.success(`User "${values.name}" updated.`)
      } else {
        await dispatch(addUser(payload)).unwrap()
        message.success(`User "${values.name}" saved.`)
        form.resetFields()
      }
      navigate('/admin/users')
    } catch (err) {
      message.error(
        typeof err === 'string'
          ? err
          : isEditMode
            ? 'Could not update user. Please try again.'
            : 'Could not save user. Please try again.',
      )
    }
  }

  const formDisabled = isSubmitting || (isEditMode && isLoadingUser)

  return (
    <div className={styles['admin-add-user']}>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <div className={styles['admin-add-user__header']}>
          <AppButton
            appearance="secondary"
            aria-label="Back to users"
            disabled={formDisabled}
            ghost
            icon={<ArrowLeftOutlined />}
            onClick={handleBackToList}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            {isEditMode ? 'Edit user' : 'Add user'}
          </Typography.Title>
        </div>

        <div
          className={
            isEditMode && isLoadingUser
              ? `${styles['admin-add-user__form-spin']} ${styles['admin-add-user__form-spin--loading']}`
              : styles['admin-add-user__form-spin']
          }
        >
          <Spin
            delay={200}
            size="large"
            spinning={Boolean(isEditMode && isLoadingUser)}
            tip="Loading user…"
          >
        <Form<AddUserFormValues>
          className={styles['admin-add-user__form']}
          disabled={formDisabled}
          form={form}
          initialValues={
            isEditMode
              ? undefined
              : {
                  role: 'Viewer',
                }
          }
          layout="vertical"
          onFinish={handleFinish}
        >
          <Card className={styles['admin-add-user__section']} title="User profile">
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('name')}
                  name="name"
                  placeholder="Full name"
                  rules={[{ required: true, message: 'Please enter name' }]}
                />
              </Col>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('username')}
                  name="username"
                  placeholder="Username"
                  rules={[{ required: true, message: 'Please enter username' }]}
                />
              </Col>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('email')}
                  name="email"
                  placeholder="Email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Invalid email' },
                  ]}
                />
              </Col>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('phone')}
                  name="phone"
                  placeholder="Phone"
                  rules={[]}
                />
              </Col>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('website')}
                  name="website"
                  placeholder="Website"
                  rules={[]}
                />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles['admin-add-user__section']}
            title={formatColumnTitle('address')}
          >
            <Row gutter={[16, 16]}>
              <Col lg={6} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('street')}
                  name={['address', 'street']}
                  placeholder="Street"
                  rules={[]}
                />
              </Col>
              <Col lg={6} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('suite')}
                  name={['address', 'suite']}
                  placeholder="Suite"
                  rules={[]}
                />
              </Col>
              <Col lg={6} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('city')}
                  name={['address', 'city']}
                  placeholder="City"
                  rules={[]}
                />
              </Col>
              <Col lg={6} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('zipcode')}
                  name={['address', 'zipcode']}
                  placeholder="Zipcode"
                  rules={[]}
                />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles['admin-add-user__section']}
            title={formatColumnTitle('company')}
          >
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('name')}
                  name={['company', 'name']}
                  placeholder="Company name"
                  rules={[]}
                />
              </Col>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('catchPhrase')}
                  name={['company', 'catchPhrase']}
                  placeholder="Catch phrase"
                  rules={[]}
                />
              </Col>
              <Col lg={8} md={12} xs={24}>
                <FormTextField
                  label={formatColumnTitle('bs')}
                  name={['company', 'bs']}
                  placeholder="BS"
                  rules={[]}
                />
              </Col>
            </Row>
          </Card>

          <Card className={styles['admin-add-user__section']} title="Application access">
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} xs={24}>
                <FormSelectField
                  label={formatColumnTitle('role')}
                  name="role"
                  options={roleOptions}
                  placeholder="Select role"
                  rules={[{ required: true, message: 'Please select a role' }]}
                />
              </Col>
            </Row>
          </Card>

          <Form.Item className={styles['admin-add-user__actions']}>
            <Flex gap="small" justify="flex-end" wrap="wrap">
              <AppButton
                appearance="secondary"
                disabled={formDisabled}
                onClick={handleBackToList}
              >
                Cancel
              </AppButton>
              <AppButton appearance="primary" htmlType="submit" loading={isSubmitting}>
                {isEditMode ? 'Save changes' : 'Save user'}
              </AppButton>
            </Flex>
          </Form.Item>
        </Form>
          </Spin>
        </div>
      </Space>
    </div>
  )
}
