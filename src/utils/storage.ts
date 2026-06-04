/**
 * localStorage 工具函数
 * 模拟后端数据存储
 */

import type { UserInfo } from '../types'

const USERS_KEY = 'registered_users'
const CURRENT_USER_KEY = 'current_user'

// 获取已注册用户列表
export function getRegisteredUsers(): UserInfo[] {
  try {
    const data = localStorage.getItem(USERS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// 保存注册用户
export function saveUser(user: Omit<UserInfo, 'id' | 'createdAt'>): UserInfo {
  const users = getRegisteredUsers()
  const newUser: UserInfo = {
    ...user,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return newUser
}

// 根据用户名查找用户
export function findUserByUsername(username: string): UserInfo | undefined {
  return getRegisteredUsers().find((u) => u.username === username)
}

// 保存当前登录用户
export function setCurrentUser(user: UserInfo): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

// 获取当前登录用户
export function getCurrentUser(): UserInfo | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

// 清除当前登录用户（退出登录）
export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// 模拟登录验证
export function mockLogin(username: string, password: string): UserInfo | null {
  const user = findUserByUsername(username)
  // 简单演示：默认管理员账户
  if (username === 'admin' && password === '123456') {
    const adminUser: UserInfo = {
      id: 0,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
    }
    setCurrentUser(adminUser)
    return adminUser
  }
  // 已注册用户验证
  if (user && password === '123456') {
    setCurrentUser(user)
    return user
  }
  return null
}
