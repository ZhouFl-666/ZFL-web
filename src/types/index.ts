/**
 * ============================================
 * 项目类型定义（综合运用 TypeScript）
 * ============================================
 * 使用：字面量类型、联合类型、类型别名、接口
 */

// -------- 字面量类型 --------
export type LoginMode = 'login' | 'register'

// -------- 联合类型 - 表单类型 --------
export type FormType = 'login' | 'register' | 'forgotPassword'

// -------- 类型别名 - 用户信息 --------
export type UserRole = 'admin' | 'user' | 'guest'
export type UserStatus = 'active' | 'inactive' | 'banned'

// -------- 数据接口 --------
export interface LoginFormData {
  username: string
  password: string
  remember: boolean
}

export interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

// -------- API 响应类型（可辨识联合） --------
export type ApiResult<T> =
  | { code: 200; data: T; message: 'success' }
  | { code: 400; data: null; message: string }
  | { code: 401 | 403; data: null; message: string }
  | { code: 500; data: null; message: '服务器错误' }

// -------- 表单校验规则类型 --------
export type ValidationRule = {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  message: string
}
