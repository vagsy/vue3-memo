export interface CatalogType {
  cata_id?: number // 文件夹 ID
  user_id: number // 用户 ID
  cata_name: string // 文件夹名称
}

export interface MemoType {
  memo_id: number // 备忘录 ID
  cata_id: number // 文件夹 ID
  title: string // 备忘录标题
  content: string // 备忘录内容
  update_at: number // 更新时间
}
