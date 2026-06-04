import React from 'react'
import { Button, Space, Divider, Tooltip, Radio } from 'antd'
import {
  SearchOutlined,
  DownloadOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons'

/**
 * Button 按钮组件演示
 * 展示：类型(type)、大小(size)、图标、禁用、加载、危险按钮
 */
const ButtonDemo: React.FC = () => {
  return (
    <div>
      <h2>Button 按钮组件</h2>

      {/* 1. 按钮类型 */}
      <Divider orientation="left">按钮类型 (type)</Divider>
      <Space wrap>
        <Button type="primary">Primary 主按钮</Button>
        <Button type="default">Default 默认</Button>
        <Button type="dashed">Dashed 虚线</Button>
        <Button type="text">Text 文本</Button>
        <Button type="link">Link 链接</Button>
      </Space>

      {/* 2. 按钮大小 */}
      <Divider orientation="left">按钮大小 (size)</Divider>
      <Space align="center" wrap>
        <Button type="primary" size="large">Large 大</Button>
        <Button type="primary" size="middle">Middle 中</Button>
        <Button type="primary" size="small">Small 小</Button>
      </Space>

      {/* 3. 带图标的按钮 */}
      <Divider orientation="left">图标按钮</Divider>
      <Space wrap>
        <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
        <Button icon={<DownloadOutlined />}>下载</Button>
        <Button type="primary" icon={<PlusOutlined />}>新建</Button>
        <Button icon={<EditOutlined />}>编辑</Button>
        <Tooltip title="删除操作">
          <Button danger icon={<DeleteOutlined />}>删除</Button>
        </Tooltip>
      </Space>

      {/* 4. 按钮状态 */}
      <Divider orientation="left">按钮状态</Divider>
      <Space wrap>
        <Button type="primary" loading>加载中</Button>
        <Button type="primary" disabled>已禁用</Button>
        <Button danger>危险按钮</Button>
        <Button type="primary" ghost>幽灵按钮</Button>
      </Space>

      {/* 5. 按钮组合 */}
      <Divider orientation="left">按钮组 (Radio.Group)</Divider>
      <Radio.Group defaultValue="day" buttonStyle="solid">
        <Radio.Button value="day">按日</Radio.Button>
        <Radio.Button value="week">按周</Radio.Button>
        <Radio.Button value="month">按月</Radio.Button>
        <Radio.Button value="year">按年</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default ButtonDemo
