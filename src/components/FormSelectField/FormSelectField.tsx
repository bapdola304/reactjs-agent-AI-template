import type { FC } from 'react'
import { Form, Select } from 'antd'
import type { SelectProps } from 'antd'
import type { Rule } from 'antd/es/form'
import type { NamePath } from 'antd/es/form/interface'

import styles from '@/components/FormSelectField/FormSelectField.module.scss'

interface FormSelectFieldProps
  extends Omit<SelectProps, 'className' | 'size' | 'variant'> {
  name: NamePath
  label: string
  rules: Rule[]
}

export const FormSelectField: FC<FormSelectFieldProps> = ({
  name,
  label,
  rules,
  ...selectProps
}) => {
  const controlClassName = styles['form-select-field__control']

  return (
    <Form.Item className={styles['form-select-field']} label={label} name={name} rules={rules}>
      <Select {...selectProps} className={controlClassName} />
    </Form.Item>
  )
}
