import type { FC } from 'react'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Switch, Tooltip } from 'antd'

import { useThemeMode } from '@/theme/useThemeMode'

import styles from './ThemeToggle.module.scss'

interface ThemeToggleProps {
  size?: 'small' | 'default'
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ size = 'default' }) => {
  const { mode, toggleMode } = useThemeMode()

  return (
    <Tooltip title={mode === 'dark' ? 'Dark theme' : 'Light theme'}>
      <span className={styles['theme-toggle']}>
        <Switch
          checked={mode === 'dark'}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          onChange={toggleMode}
          size={size}
        />
      </span>
    </Tooltip>
  )
}

