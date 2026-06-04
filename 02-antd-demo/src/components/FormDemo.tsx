import React from 'react'
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Radio,
  Checkbox,
  Button,
  Divider,
  message,
  Space,
} from 'antd'

const { TextArea } = Input
const { Option } = Select

/**
 * Form 表单组件演示
 * 展示：基本表单、校验规则、各种表单项、表单提交
 */
const FormDemo: React.FC = () => {
  const [form] = Form.useForm()

  // 表单提交处理
  const onFinish = (values: unknown) => {
    console.log('表单数据:', values)
    message.success('表单提交成功！')
  }

  const onReset = () => {
    form.resetFields()
    message.info('表单已重置')
  }

  return (
    <div>
      <h2>Form 表单组件</h2>

      <Form
        form={form}
        name="demo-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 700 }}
        initialValues={{
          username: '',
          gender: 'male',
          agree: true,
          status: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Divider orientation="left">基础表单项</Divider>

        {/* 文本输入 */}
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' },
            { max: 20, message: '用户名最多20个字符' },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        {/* 密码 */}
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6位' },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        {/* 数字输入 */}
        <Form.Item
          label="年龄"
          name="age"
          rules={[
            { type: 'number', min: 1, max: 120, message: '请输入有效年龄' },
          ]}
        >
          <InputNumber min={1} max={120} placeholder="请输入年龄" style={{ width: '100%' }} />
        </Form.Item>

        {/* 下拉选择 */}
        <Form.Item
          label="所在城市"
          name="city"
          rules={[{ required: true, message: '请选择城市' }]}
        >
          <Select placeholder="请选择城市">
            <Option value="beijing">北京</Option>
            <Option value="shanghai">上海</Option>
            <Option value="guangzhou">广州</Option>
            <Option value="shenzhen">深圳</Option>
            <Option value="hangzhou">杭州</Option>
          </Select>
        </Form.Item>

        {/* 日期选择 */}
        <Form.Item label="出生日期" name="birthday">
          <DatePicker style={{ width: '100%' }} placeholder="请选择日期" />
        </Form.Item>

        <Divider orientation="left">单选 / 多选 / 开关</Divider>

        {/* 单选框 */}
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>

        {/* 多选框 */}
        <Form.Item label="兴趣" name="hobbies">
          <Checkbox.Group
            options={[
              { label: '编程', value: 'coding' },
              { label: '阅读', value: 'reading' },
              { label: '运动', value: 'sports' },
              { label: '音乐', value: 'music' },
            ]}
          />
        </Form.Item>

        {/* 开关 */}
        <Form.Item label="启用状态" name="status" valuePropName="checked">
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>

        {/* 文本域 */}
        <Form.Item label="个人简介" name="bio">
          <TextArea rows={3} placeholder="请输入个人简介" maxLength={200} showCount />
        </Form.Item>

        {/* 协议勾选 */}
        <Form.Item
          name="agree"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 16 }}
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请阅读并同意协议')),
            },
          ]}
        >
          <Checkbox>我已阅读并同意《用户协议》</Checkbox>
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormDemo
