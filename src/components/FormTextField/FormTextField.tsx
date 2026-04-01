import type { FC } from 'react'
import { Form, Input } from 'antd'
import type { Rule } from 'antd/es/form'
import type { NamePath } from 'antd/es/form/interface'

import styles from '@/components/FormTextField/FormTextField.module.scss'

interface FormTextFieldProps {
  name: NamePath
  label: string
  rules: Rule[]
  placeholder?: string
  autoComplete?: string
  /** Use password input (same height / error styling). */
  variant?: 'text' | 'password'
}

export const FormTextField: FC<FormTextFieldProps> = ({
  name,
  label,
  rules,
  placeholder,
  autoComplete,
  variant = 'text',
}) => {
  const controlClassName = styles['form-text-field__control']

  return (
    <Form.Item className={styles['form-text-field']} label={label} name={name} rules={rules}>
      {variant === 'password' ? (
        <Input.Password
          autoComplete={autoComplete}
          className={controlClassName}
          placeholder={placeholder}
        />
      ) : (
        <Input
          autoComplete={autoComplete}
          className={controlClassName}
          placeholder={placeholder}
        />
      )}
    </Form.Item>
  )
}
