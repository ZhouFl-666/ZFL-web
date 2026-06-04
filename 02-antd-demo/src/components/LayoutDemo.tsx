import React from 'react'
import { Layout, Menu, Breadcrumb, Card, Row, Col, Divider } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

/**
 * Layout 布局组件演示
 * 展示：上左右布局、侧边栏布局、栅格布局
 */
const LayoutDemo: React.FC = () => {
  return (
    <div>
      <h2>Layout 布局组件</h2>

      <Divider orientation="left">经典布局 (Header-Sider-Content)</Divider>

      {/* 经典的管理后台布局 */}
      <Layout style={{ minHeight: 400, border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden' }}>
        {/* 顶部 header */}
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 40 }}>
            🏠 管理系统
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              { key: '1', label: '首页' },
              { key: '2', label: '用户管理' },
              { key: '3', label: '系统设置' },
            ]}
          />
        </Header>

        <Layout>
          {/* 侧边栏 */}
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['users']}
              style={{ height: '100%', borderRight: 0 }}
              items={[
                { key: 'users', icon: <UserOutlined />, label: '用户列表' },
                { key: 'videos', icon: <VideoCameraOutlined />, label: '视频管理' },
                { key: 'upload', icon: <UploadOutlined />, label: '文件上传' },
              ]}
            />
          </Sider>

          {/* 主内容区 */}
          <Layout style={{ padding: 16 }}>
            <Breadcrumb style={{ marginBottom: 16 }}>
              <Breadcrumb.Item><HomeOutlined /> 首页</Breadcrumb.Item>
              <Breadcrumb.Item>用户管理</Breadcrumb.Item>
              <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              padding: 24,
              background: '#fff',
              borderRadius: 4,
              minHeight: 200,
            }}>
              <p>这里是主内容区域</p>
              <p>通常放置表格、表单等业务内容</p>
            </Content>
          </Layout>
        </Layout>
      </Layout>

      <Divider orientation="left">栅格布局 (Row/Col)</Divider>

      {/* Grid 栅格系统 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card title="卡片 1" bordered>
            <p>响应式列：xs=24 sm=12 md=8</p>
            <p>不同屏幕尺寸自动调整宽度</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="卡片 2" bordered>
            <p>gutter 控制间距</p>
            <p>水平间距: 16px, 垂直间距: 16px</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="卡片 3" bordered>
            <p>共24等分的栅格系统</p>
            <p>三列各占 8/24 = 33.3%</p>
          </Card>
        </Col>
      </Row>

      {/* 不等分栅格 */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <div style={{ background: '#e6f7ff', padding: 24, textAlign: 'center', borderRadius: 4 }}>
            span=8
          </div>
        </Col>
        <Col span={16}>
          <div style={{ background: '#f6ffed', padding: 24, textAlign: 'center', borderRadius: 4 }}>
            span=16
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default LayoutDemo
