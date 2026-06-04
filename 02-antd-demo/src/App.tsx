import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  AppstoreOutlined,
  FormOutlined,
  TableOutlined,
  BorderOutlined,
  LayoutOutlined,
} from '@ant-design/icons'
import ButtonDemo from './components/ButtonDemo'
import FormDemo from './components/FormDemo'
import TableDemo from './components/TableDemo'
import ModalDemo from './components/ModalDemo'
import LayoutDemo from './components/LayoutDemo'

const { Content, Sider } = Layout

type DemoKey = 'button' | 'form' | 'table' | 'modal' | 'layout'

const menuItems = [
  { key: 'button', icon: <AppstoreOutlined />, label: 'Button 按钮' },
  { key: 'form', icon: <FormOutlined />, label: 'Form 表单' },
  { key: 'table', icon: <TableOutlined />, label: 'Table 表格' },
  { key: 'modal', icon: <BorderOutlined />, label: 'Modal 对话框' },
  { key: 'layout', icon: <LayoutOutlined />, label: 'Layout 布局' },
]

const App: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<DemoKey>('button')

  const renderDemo = () => {
    switch (selectedDemo) {
      case 'button': return <ButtonDemo />
      case 'form': return <FormDemo />
      case 'table': return <TableDemo />
      case 'modal': return <ModalDemo />
      case 'layout': return <LayoutDemo />
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} style={{ background: '#fff' }}>
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{ margin: 0, color: '#1890ff', fontSize: 18 }}>
            Antd v4 组件学习
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedDemo]}
          items={menuItems}
          onClick={({ key }) => setSelectedDemo(key as DemoKey)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: 24, background: '#f0f2f5' }}>
          <div className="demo-card">
            {renderDemo()}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
