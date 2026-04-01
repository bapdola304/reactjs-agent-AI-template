import type { FC } from 'react'
import { Button } from 'antd'
import type { ButtonProps } from 'antd'

import styles from '@/components/AppButton/AppButton.module.scss'

export type AppButtonAppearance = 'primary' | 'secondary'

interface AppButtonProps extends Omit<ButtonProps, 'size' | 'type' | 'variant'> {
  /** Primary (filled) or secondary (outlined/default). Ant Design v6 uses `variant` internally — we use `appearance` to avoid clashes. */
  appearance?: AppButtonAppearance
}

const appearanceClassMap: Record<AppButtonAppearance, string> = {
  primary: styles['app-button--primary'],
  secondary: styles['app-button--secondary'],
}

const appearanceToAntdType: Record<AppButtonAppearance, ButtonProps['type']> = {
  primary: 'primary',
  secondary: 'default',
}

export const AppButton: FC<AppButtonProps> = ({
  appearance = 'primary',
  className,
  ...rest
}) => {
  const mergedClassName = [
    styles['app-button'],
    appearanceClassMap[appearance],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Button
      className={mergedClassName}
      type={appearanceToAntdType[appearance]}
      {...rest}
    />
  )
}
