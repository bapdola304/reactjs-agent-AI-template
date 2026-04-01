import type { FC } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Form, Row, Space, Typography, message } from 'antd'

import { useNavigate } from 'react-router-dom'

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
import { addUser } from '@/store/thunks/usersThunks'

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
  const dispatch = useAppDispatch()
  const isSubmitting = useAppSelector(selectUsersSubmitting)

  const handleBackToList = () => {
    navigate('/admin/users')
  }

  const handleFinish = async (values: AddUserFormValues) => {
    try {
      const payload = mapAddUserFormToPayload(values)
      await dispatch(addUser(payload)).unwrap()
      message.success(`User "${values.name}" saved.`)
      form.resetFields()
      navigate('/admin/users')
    } catch (err) {
      message.error(
        typeof err === 'string'
          ? err
          : 'Could not save user. Please try again.',
      )
    }
  }

  return (
    <div className={styles['admin-add-user']}>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <div className={styles['admin-add-user__header']}>
          <AppButton
            appearance="secondary"
            aria-label="Back to users"
            disabled={isSubmitting}
            ghost
            icon={<ArrowLeftOutlined />}
            onClick={handleBackToList}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            Add user
          </Typography.Title>
        </div>

        <Form<AddUserFormValues>
          className={styles['admin-add-user__form']}
          disabled={isSubmitting}
          form={form}
          initialValues={{
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            address: {
              street: 'Kulas Light',
              suite: 'Apt. 556',
              city: 'Gwenborough',
              zipcode: '92998-3874',
            },
            company: {
              name: 'Romaguera-Crona',
              catchPhrase: 'Multi-layered client-server neural-net',
              bs: 'harness real-time e-markets',
            },
            role: 'Viewer',
          }}
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
                disabled={isSubmitting}
                onClick={handleBackToList}
              >
                Cancel
              </AppButton>
              <AppButton appearance="primary" htmlType="submit" loading={isSubmitting}>
                Save user
              </AppButton>
            </Flex>
          </Form.Item>
        </Form>
      </Space>
    </div>
  )
}
