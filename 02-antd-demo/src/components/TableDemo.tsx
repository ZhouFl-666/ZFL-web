import React, { useState } from 'react'
import { Table, Tag, Space, Button, Input, Divider } from 'antd'
import type { ColumnsType } from 'antd/es/table'

/**
 * Table 表格组件演示
 * 展示：基本表格、排序、筛选、分页、搜索
 */

// -------- 类型定义 --------
interface DataItem {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
  status: 'active' | 'inactive'
}

// -------- 模拟数据 --------
const mockData: DataItem[] = [
  { key: '1', name: '张三', age: 28, address: '北京市朝阳区', tags: ['前端', 'React'], status: 'active' },
  { key: '2', name: '李四', age: 32, address: '上海市浦东新区', tags: ['后端', 'Java'], status: 'active' },
  { key: '3', name: '王五', age: 25, address: '广州市天河区', tags: ['设计师'], status: 'inactive' },
  { key: '4', name: '赵六', age: 30, address: '深圳市南山区', tags: ['前端', 'Vue'], status: 'active' },
  { key: '5', name: '钱七', age: 27, address: '杭州市西湖区', tags: ['全栈'], status: 'inactive' },
  { key: '6', name: '孙八', age: 35, address: '成都市高新区', tags: ['后端', 'Go'], status: 'active' },
]

const TableDemo: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  // 搜索过滤
  const filteredData = mockData.filter(
    (item) =>
      item.name.includes(searchText) || item.address.includes(searchText)
  )

  const columns: ColumnsType<DataItem> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      defaultSortOrder: 'ascend',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space size={[0, 4]} wrap>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '启用', value: 'active' },
        { text: '禁用', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) =>
        status === 'active' ? (
          <Tag color="green">启用</Tag>
        ) : (
          <Tag color="red">禁用</Tag>
        ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: DataItem) => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <h2>Table 表格组件</h2>

      <Divider orientation="left">搜索过滤</Divider>
      <Input.Search
        placeholder="搜索姓名或地址..."
        allowClear
        style={{ width: 300, marginBottom: 16 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Divider orientation="left">数据表格</Divider>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 4,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        bordered
      />
    </div>
  )
}

export default TableDemo
