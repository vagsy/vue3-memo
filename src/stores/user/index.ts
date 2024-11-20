import { defineStore } from 'pinia'
import type { UserType } from './types'
import { ImitateHttp, localSetItem, localGetItem } from '@/utils'

const userStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserType | null
  }),
  actions: {
    login(form: UserType) {
      const user: UserType | null = JSON.parse(localStorage.getItem('regis_user') || 'null')
      return ImitateHttp((s, f) => {
        if (user) {
          if (user.phone === form.phone && user.password === form.password) {
            this.setUser(user)
            s('登录成功')
          } else {
            s('手机号或密码错误')
          }
        } else {
          f('用户未注册')
        }
      })
    },
    register(form: UserType) {
      return ImitateHttp((s) => {
        form.user_id = parseInt(form.phone.slice(-4))
        localSetItem('regis_user', form)
        s('ok')
      })
    },
    setUser(user: UserType) {
      this.userInfo = user
      localSetItem('login_user', user)
    },
    getUser() {
      const data = localGetItem('login_user')
      if (data) {
        this.userInfo = data
      }
    },
    logout() {
      localStorage.removeItem('login_user')
      this.userInfo = null
    }
  }
})

export default userStore
