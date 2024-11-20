import dayjs from 'dayjs'

export const FormatTime = (date: Date | number) => {
  return dayjs(date).format('YYYY/MM/DD hh:mm')
}

export const ImitateHttp = (fun: (s: Function, f: Function) => void, timer = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => fun(resolve, reject), timer)
  })
}

// 生成随机 ID
export const geneId = (): number => {
  return Math.floor(Math.random() * 939874)
}

// 获取 localStorage
export const localGetItem = (key: string): any => {
  const data_str = localStorage.getItem(key)
  if (data_str) {
    return JSON.parse(data_str)
  }
  return null
}

// 设置 localStorage
export const localSetItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

// 防抖函数
export const debounce = (fn: Function, delay = 1600) => {
  // 定时器
  let timer: number | null = null

  // 将debounce处理结果当作函数返回
  return (...args: any[]) => {
    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn(...args)
    }, delay)
  }
}
