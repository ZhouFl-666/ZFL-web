import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  Steps,
  message,
  Result,
} from 'antd'
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { RegisterFormData } from '../types'
import { saveUser } from '../utils/storage'
import styles from './RegisterPage.module.less'

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [registeredUser, setRegisteredUser] = useState<string>('')
  const navigate = useNavigate()

  const onFinish = async (values: RegisterFormData) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    saveUser({
      username: values.username,
      email: values.email,
      role: 'user',
      status: 'active',
    })

    setRegisteredUser(values.username)
    setCurrentStep(2)
    setLoading(false)
  }

  const goToLogin = () => navigate('/login')

  // 步骤1：填写账户信息
  const renderAccountStep = () => (
    <>
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名至少3个字符' },
          { max: 20, message: '用户名最多20个字符' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="用户名（字母、数字、下划线）"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱地址" />
      </Form.Item>
    </>
  )

  // 步骤2：设置密码
  const renderPasswordStep = () => (
    <>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6位' },
          { max: 20, message: '密码最多20位' },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="请输入密码"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次输入的密码不一致'))
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="请确认密码"
        />
      </Form.Item>
    </>
  )

  // 步骤3：注册成功
  if (currentStep === 2) {
    return (
      <div className={styles.registerPage}>
        <div className={styles.resultSection}>
          <Result
            status="success"
            title={`注册成功！欢迎 ${registeredUser}`}
            subTitle="您现在可以使用注册的账号登录系统"
            extra={[
              <Button
                type="primary"
                key="login"
                onClick={goToLogin}
                size="large"
              >
                前往登录
              </Button>,
            ]}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.registerPage}>
      <div className={styles.brandSection}>
        <div className={styles.brandContent}>
          <h1 className={styles.brandTitle}>🚀 加入我们</h1>
          <p className={styles.brandDesc}>
            创建账号，开始你的学习之旅
          </p>
          <div className={styles.stepPreview}>
            <div className={styles.previewItem}>
              <span className={styles.previewNum}>01</span>
              <span>填写基本信息</span>
            </div>
            <div className={styles.previewItem}>
              <span className={styles.previewNum}>02</span>
              <span>设置安全密码</span>
            </div>
            <div className={styles.previewItem}>
              <span className={styles.previewNum}>03</span>
              <span>完成注册</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <Card className={styles.formCard} bordered={false}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>用户注册</h2>
            <p className={styles.formSubtitle}>
              已有账号？
              <a onClick={goToLogin} className={styles.link}>
                立即登录
              </a>
            </p>
          </div>

          {/* 步骤条 */}
          <Steps
            current={currentStep}
            size="small"
            style={{ marginBottom: 32 }}
            items={[
              { title: '账户信息', icon: <UserOutlined /> },
              { title: '设置密码', icon: <LockOutlined /> },
              { title: '完成', icon: <CheckCircleOutlined /> },
            ]}
          />

          <Form
            form={form}
            name="register"
            onFinish={(values) => {
              if (currentStep === 0) {
                setCurrentStep(1)
              } else {
                onFinish(values)
              }
            }}
            size="large"
            scrollToFirstError
          >
            {/* 根据当前步骤显示不同的表单内容 */}
            <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
              {renderAccountStep()}
            </div>
            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
              {renderPasswordStep()}
            </div>

            <Form.Item>
              <div style={{ display: 'flex', gap: 12 }}>
                {currentStep > 0 && (
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    style={{ flex: 1 }}
                  >
                    上一步
                  </Button>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading && currentStep === 1}
                  block={currentStep === 0}
                  style={{ flex: currentStep > 0 ? 1 : undefined }}
                >
                  {currentStep === 0 ? '下一步' : '提交注册'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
