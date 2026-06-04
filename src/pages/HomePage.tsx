import React from 'react'
import { Layout, Card, Row, Col, Button, Tag, Space, Descriptions, Avatar } from 'antd'
import {
  LogoutOutlined,
  UserOutlined,
  CheckCircleOutlined,
  BookOutlined,
  CodeOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import type { UserInfo } from '../types'
import { clearCurrentUser } from '../utils/storage'
import styles from './HomePage.module.less'

const { Header, Content, Footer } = Layout

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = (location.state as { user?: UserInfo })?.user

  const handleLogout = () => {
    clearCurrentUser()
    navigate('/login', { replace: true })
  }

  // 如果没有用户信息（直接访问 /home），尝试从 localStorage 获取
  const displayUser = user || (() => {
    try {
      const stored = localStorage.getItem('current_user')
      return stored ? JSON.parse(stored) as UserInfo : null
    } catch {
      return null
    }
  })()

  if (!displayUser) {
    navigate('/login', { replace: true })
    return null
  }

  // 用户状态标签颜色（字面量类型缩小）
  const getStatusTag = (status: UserInfo['status']) => {
    switch (status) {
      case 'active': return <Tag color="green">正常</Tag>
      case 'inactive': return <Tag color="orange">未激活</Tag>
      case 'banned': return <Tag color="red">已禁用</Tag>
    }
  }

  // 角色标签
  const getRoleTag = (role: UserInfo['role']) => {
    switch (role) {
      case 'admin': return <Tag color="gold">管理员</Tag>
      case 'user': return <Tag color="blue">普通用户</Tag>
      case 'guest': return <Tag color="default">访客</Tag>
    }
  }

  const learningModules = [
    { title: 'TypeScript', icon: <CodeOutlined />, desc: '字面量类型 · 联合类型 · 类型断言 · 类型别名', color: '#3178c6' },
    { title: 'Ant Design v4', icon: <RocketOutlined />, desc: 'Button · Form · Table · Modal · Layout', color: '#1677ff' },
    { title: 'Less', icon: <BookOutlined />, desc: '变量 · 混入 · 嵌套 · CSS Modules · :global', color: '#1d365d' },
  ]

  return (
    <Layout className={styles.homePage}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.logo}>📚 学习平台</h1>
        </div>
        <div className={styles.headerRight}>
          <Space>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
            <span className={styles.userName}>{displayUser.username}</span>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              退出
            </Button>
          </Space>
        </div>
      </Header>

      <Content className={styles.content}>
        {/* 欢迎卡片 */}
        <Card className={styles.welcomeCard}>
          <Row align="middle" gutter={24}>
            <Col>
              <Avatar size={72} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            </Col>
            <Col flex={1}>
              <h2 className={styles.welcomeTitle}>
                欢迎回来，{displayUser.username}！
                <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: 8 }} />
              </h2>
              <Space style={{ marginTop: 8 }}>
                {getRoleTag(displayUser.role)}
                {getStatusTag(displayUser.status)}
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 用户信息 */}
        <Card title="📋 用户信息" style={{ marginTop: 16 }}>
          <Descriptions bordered column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="用户ID">{displayUser.id}</Descriptions.Item>
            <Descriptions.Item label="用户名">{displayUser.username}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{displayUser.email}</Descriptions.Item>
            <Descriptions.Item label="角色">
              {getRoleTag(displayUser.role)}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {getStatusTag(displayUser.status)}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {new Date(displayUser.createdAt).toLocaleString('zh-CN')}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 本周学习内容 */}
        <Card title="📖 本周已学习模块" style={{ marginTop: 16 }}>
          <Row gutter={[16, 16]}>
            {learningModules.map((mod) => (
              <Col xs={24} sm={12} md={8} key={mod.title}>
                <Card
                  hoverable
                  size="small"
                  style={{ borderTop: `3px solid ${mod.color}` }}
                >
                  <div className={styles.moduleCard}>
                    <span className={styles.moduleIcon} style={{ color: mod.color }}>
                      {mod.icon}
                    </span>
                    <div>
                      <h4>{mod.title}</h4>
                      <p className={styles.moduleDesc}>{mod.desc}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 完成状态 */}
        <Card style={{ marginTop: 16 }}>
          <div className={styles.progressSection}>
            <h3>✅ 综合任务：登录注册页面 — 已完成</h3>
            <Space style={{ marginTop: 8 }}>
              <Tag color="success">TypeScript 类型系统</Tag>
              <Tag color="success">Antd v4 组件</Tag>
              <Tag color="success">Less 模块化样式</Tag>
              <Tag color="success">React Router</Tag>
              <Tag color="success">表单校验</Tag>
              <Tag color="success">localStorage 存储</Tag>
            </Space>
          </div>
        </Card>
      </Content>

      <Footer className={styles.footer}>
        TypeScript + React + Antd v4 + Less 学习项目 © 2024
      </Footer>
    </Layout>
  )
}

export default HomePage
