import type { FC } from 'react'
import { useEffect } from 'react'
import { Card, Checkbox, Form, Space, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { AppButton } from '@/components/AppButton/AppButton'
import { FormTextField } from '@/components/FormTextField/FormTextField'

import styles from './LoginPage.module.scss'

interface LoginPageProps {
  _?: never
}

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export const LoginPage: FC<LoginPageProps> = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token')
    if (authToken) {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  const handleFinish = (values: LoginFormValues) => {
    localStorage.setItem('auth_token', 'demo_token')
    message.success(`Welcome back, ${values.email}`)
    form.resetFields(['password'])
    navigate('/admin', { replace: true })
  }

  return (
    <Card className={styles['login-page__card']}>
      <Space className={styles['login-page__stack']} orientation="vertical" size="middle">
        <Typography.Title className={styles['login-page__title']} level={3}>
          Login
        </Typography.Title>
        <Typography.Text type="secondary">
          Sign in to continue to your dashboard.
        </Typography.Text>

        <Form<LoginFormValues>
          form={form}
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={handleFinish}
        >
          <FormTextField
            autoComplete="email"
            label="Email"
            name="email"
            placeholder="you@example.com"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email format' },
              { whitespace: true, message: 'Email cannot be empty spaces' },
            ]}
          />

          <FormTextField
            autoComplete="current-password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { whitespace: true, message: 'Password cannot be empty spaces' },
            ]}
            variant="password"
          />

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <AppButton appearance="primary" block htmlType="submit">
              Sign In
            </AppButton>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  )
}
