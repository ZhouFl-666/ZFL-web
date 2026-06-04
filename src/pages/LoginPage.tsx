import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Card, message, Tabs } from 'antd'
import { UserOutlined, LockOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { LoginFormData } from '../types'
import { mockLogin } from '../utils/storage'
import styles from './LoginPage.module.less'

const LoginPage: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: LoginFormData) => {
    setLoading(true)
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = mockLogin(values.username, values.password)
    setLoading(false)

    if (user) {
      if (values.remember) {
        localStorage.setItem('remembered_user', values.username)
      }
      message.success(`欢迎回来，${user.username}！`)
      navigate('/home', { state: { user } })
    } else {
      message.error('用户名或密码错误！')
    }
  }

  const goToRegister = () => navigate('/register')

  return (
    <div className={styles.loginPage}>
      {/* 左侧品牌区 */}
      <div className={styles.brandSection}>
        <div className={styles.brandContent}>
          <h1 className={styles.brandTitle}>📚 学习平台</h1>
          <p className={styles.brandDesc}>
            TypeScript · React · Antd · Less
          </p>
          <div className={styles.brandFeatures}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>✅</span>
              <span>字面量类型 & 联合类型</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>✅</span>
              <span>类型断言 & 类型别名</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>✅</span>
              <span>Less 变量 & CSS Modules</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>✅</span>
              <span>Antd v4 组件库</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录区 */}
      <div className={styles.formSection}>
        <Card className={styles.formCard} bordered={false}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>用户登录</h2>
            <p className={styles.formSubtitle}>
              还没有账号？
              <a onClick={goToRegister} className={styles.link}>
                立即注册
              </a>
            </p>
          </div>

          <Tabs
            centered
            items={[
              {
                key: 'account',
                label: '账号密码登录',
                children: null,
              },
            ]}
          />

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{
              username: localStorage.getItem('remembered_user') || '',
              remember: true,
            }}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="用户名 (admin)"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码 (123456)"
              />
            </Form.Item>

            <Form.Item>
              <div className={styles.formRow}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住用户名</Checkbox>
                </Form.Item>
                <a className={styles.link}>忘记密码？</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                登 录
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>其他登录方式</span>
          </div>

          <div className={styles.socialLogin}>
            <Button shape="circle" icon={<GithubOutlined />} size="large" title="GitHub" />
            <Button shape="circle" icon={<WechatOutlined />} size="large" title="微信" />
          </div>

          <div className={styles.formFooter}>
            <p>提示：admin / 123456（管理员账号）</p>
            <p>注册后也可使用注册账号登录（密码默认123456）</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
