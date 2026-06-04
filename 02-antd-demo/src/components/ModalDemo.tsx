import React, { useState } from 'react'
import { Modal, Button, Space, Divider, message, Form, Input } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

/**
 * Modal 对话框组件演示
 * 展示：基本弹窗、确认框、表单弹窗、信息提示
 */
const ModalDemo: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [form] = Form.useForm()

  // 基本弹窗
  const showModal = () => setVisible(true)
  const handleOk = () => {
    setVisible(false)
    message.success('已确认')
  }
  const handleCancel = () => setVisible(false)

  // 确认框
  const showConfirm = () => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除这条记录吗？此操作不可恢复。',
      okText: '确定删除',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        message.success('删除成功')
      },
    })
  }

  // 信息提示框
  const showInfo = () => {
    Modal.info({
      title: '操作提示',
      content: '这是一条信息提示。',
    })
  }

  const showSuccess = () => {
    Modal.success({
      title: '操作成功',
      content: '数据已保存。',
    })
  }

  // 表单弹窗
  const showFormModal = () => setFormVisible(true)
  const handleFormOk = () => {
    form.validateFields().then((values) => {
      console.log('表单数据:', values)
      setFormVisible(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  return (
    <div>
      <h2>Modal 对话框组件</h2>

      <Divider orientation="left">基本弹窗</Divider>
      <Space wrap>
        <Button type="primary" onClick={showModal}>
          打开弹窗
        </Button>
        <Modal
          title="基本弹窗"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <p>这是一个基本的 Modal 对话框。</p>
          <p>点击遮罩层或取消按钮可以关闭。</p>
        </Modal>
      </Space>

      <Divider orientation="left">确认框</Divider>
      <Space wrap>
        <Button danger onClick={showConfirm}>
          删除确认框
        </Button>
        <Button onClick={showInfo}>信息提示框</Button>
        <Button type="primary" onClick={showSuccess}>
          成功提示框
        </Button>
      </Space>

      <Divider orientation="left">表单弹窗</Divider>
      <Button type="primary" onClick={showFormModal}>
        打开表单弹窗
      </Button>
      <Modal
        title="新增用户"
        visible={formVisible}
        onOk={handleFormOk}
        onCancel={() => setFormVisible(false)}
        okText="确认添加"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效邮箱' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalDemo
