export interface UserType {
  user_id?: number
  user_name: string
  phone: string
  password?: string
  login_at?: number
} // 设置为非必传的方法是在参数名后加一个 ? 号
