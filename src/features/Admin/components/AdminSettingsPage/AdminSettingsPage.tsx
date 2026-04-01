import type { FC } from 'react'
import { Card, Form, Space, Switch, Typography, message } from 'antd'

import { AppButton } from '@/components/AppButton/AppButton'
import { FormTextField } from '@/components/FormTextField/FormTextField'

import styles from './AdminSettingsPage.module.scss'

interface AdminSettingsPageProps {
  _?: never
}

interface SettingsFormValues {
  siteName: string
  notifyByEmail: boolean
}

export const AdminSettingsPage: FC<AdminSettingsPageProps> = () => {
  const [form] = Form.useForm<SettingsFormValues>()

  const handleFinish = (values: SettingsFormValues) => {
    message.success(`Saved settings for ${values.siteName}`)
  }

  return (
    <Card className={styles.adminSettingsPage__card}>
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Settings
        </Typography.Title>
        <Form<SettingsFormValues>
          form={form}
          initialValues={{ siteName: 'Agent Admin', notifyByEmail: true }}
          layout="vertical"
          onFinish={handleFinish}
        >
          <FormTextField
            label="Site Name"
            name="siteName"
            placeholder="Site name"
            rules={[{ required: true, message: 'Please enter site name' }]}
          />

          <Form.Item
            label="Email Notifications"
            name="notifyByEmail"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <AppButton appearance="primary" htmlType="submit">
              Save Changes
            </AppButton>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  )
}
