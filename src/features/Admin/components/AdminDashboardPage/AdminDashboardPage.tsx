import type { FC } from 'react'
import { useMemo } from 'react'
import { Area, Column, Line, Pie } from '@ant-design/plots'
import { Card, Col, Row, Space, Statistic, Typography } from 'antd'

import {
  MOCK_DAILY_ACTIVE_USERS,
  MOCK_RETENTION_BY_WEEK,
  MOCK_SUMMARY_STATS,
  MOCK_USER_SIGNUPS_BY_DAY,
  MOCK_USERS_BY_REGION,
  MOCK_USERS_BY_ROLE,
} from '@/features/Admin/mocks/userAnalytics.mock'

interface AdminDashboardPageProps {
  _?: never
}

const chartContainerStyle = { height: 300 }

export const AdminDashboardPage: FC<AdminDashboardPageProps> = () => {
  const signupsLineConfig = useMemo(
    () => ({
      data: MOCK_USER_SIGNUPS_BY_DAY,
      xField: 'date',
      yField: 'newUsers',
      autoFit: true,
      containerStyle: chartContainerStyle,
      axis: {
        x: { labelAutoRotate: true },
      },
    }),
    [],
  )

  const regionColumnConfig = useMemo(
    () => ({
      data: MOCK_USERS_BY_REGION,
      xField: 'region',
      yField: 'users',
      autoFit: true,
      containerStyle: chartContainerStyle,
      axis: {
        x: { labelAutoRotate: true },
      },
    }),
    [],
  )

  const rolePieConfig = useMemo(
    () => ({
      data: MOCK_USERS_BY_ROLE,
      angleField: 'value',
      colorField: 'role',
      autoFit: true,
      containerStyle: chartContainerStyle,
      legend: { position: 'bottom' as const },
    }),
    [],
  )

  const dauAreaConfig = useMemo(
    () => ({
      data: MOCK_DAILY_ACTIVE_USERS,
      xField: 'date',
      yField: 'dau',
      autoFit: true,
      containerStyle: chartContainerStyle,
      style: { fillOpacity: 0.35 },
    }),
    [],
  )

  const retentionLineConfig = useMemo(
    () => ({
      data: MOCK_RETENTION_BY_WEEK,
      xField: 'week',
      yField: 'retainedPercent',
      autoFit: true,
      containerStyle: { height: 280 },
      axis: {
        y: { labelFormatter: (v: string) => `${v}%` },
      },
    }),
    [],
  )

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={4} style={{ margin: 0 }}>
          User analytics
        </Typography.Title>
        <Typography.Text type="secondary">
          Mock data for dashboards — replace with API integration when ready.
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Total users" value={MOCK_SUMMARY_STATS.totalUsers} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="New users (7d)" value={MOCK_SUMMARY_STATS.newUsersThisWeek} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Active today (DAU)" value={MOCK_SUMMARY_STATS.activeToday} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              precision={1}
              suffix="min"
              title="Avg. session"
              value={MOCK_SUMMARY_STATS.avgSessionMinutes}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="New sign-ups (last 14 days)">
            <Line {...signupsLineConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Users by region">
            <Column {...regionColumnConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Users by role">
            <Pie {...rolePieConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Daily active users (DAU)">
            <Area {...dauAreaConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Cohort retention (week-over-week, mock)">
            <Line {...retentionLineConfig} />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
