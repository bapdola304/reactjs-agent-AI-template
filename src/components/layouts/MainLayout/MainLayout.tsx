import type { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import styles from './MainLayout.module.scss'

interface MainLayoutProps {
  _?: never
}

export const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <Layout className={styles['main-layout']}>
      <Layout.Content className={styles['main-layout__content']}>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
