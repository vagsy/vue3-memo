import { defineStore } from 'pinia'
import type { CatalogType, MemoType } from './types'
import { geneId, localGetItem, localSetItem } from '@/utils'
const indexStore = defineStore('index', {
  state: () => ({
    catalogs: [] as CatalogType[], // 当前文件夹 ID
    memos: [] as MemoType[], // 备忘录列表
    active_cataid: null as number | null, // 当前文件夹 ID
    active_memoid: null as number | null // 当前备忘录 ID
  }),
  actions: {
    // 获取目录列表
    getCatalogs() {
      const data = localGetItem('catalogs')
      if (data) {
        this.catalogs = data
      }
    },
    // 创建目录
    createCata(val: Pick<CatalogType, 'user_id' | 'cata_name'>) {
      const curcata = Object.assign({}, val, {
        cata_id: geneId()
      })
      this.catalogs.push(curcata)
      localSetItem('catalogs', this.catalogs)
    },
    // 修改目录
    updateCata(id: number, name: string) {
      const index = this.catalogs.findIndex((item) => item.cata_id === id)
      if (index !== -1) {
        this.catalogs[index].cata_name = name
        localSetItem('catalogs', this.catalogs)
      }
    },
    // 删除目录
    removeCata(id: number) {
      const index = this.catalogs.findIndex((item) => item.cata_id === id)
      if (index !== -1) {
        this.catalogs.splice(index, 1)
        localSetItem('catalogs', this.catalogs)
      }
    },
    setCateId(id: number | null) {
      this.active_cataid = id
      localSetItem('active_cataid', id)
      if (this.activeMemos.length == 0) {
        this.setMemoId(null)
      } else {
        this.setMemoId(this.activeMemos[0].memo_id)
      }
    },
    // 获取备忘录列表
    getMemos() {
      const data = localGetItem('memos')
      if (data) {
        this.memos = data
      }
    },
    createMemo(val: Pick<MemoType, 'title' | 'cata_id' | 'content'>) {
      const memo = Object.assign({}, val, {
        memo_id: geneId(),
        update_at: new Date().valueOf()
      })
      this.memos.push(memo)
      localSetItem('memos', this.memos)
    },
    // 修改备忘录
    updateMemo(id: number, data: Partial<MemoType>) {
      const index = this.memos.findIndex((r) => r.memo_id == id)
      if (index >= 0) {
        this.memos[index] = { ...this.memos[index], ...data }
        localSetItem('memos', this.memos)
      }
    },
    // 删除备忘录
    removeMemo(id: number) {
      const index = this.memos.findIndex((r) => r.memo_id == id)
      if (index >= 0) {
        this.memos.splice(index, 1)
        localSetItem('memos', this.memos)
      }
    },
    // 设置备忘录 ID
    setMemoId(id: number | null) {
      this.active_memoid = id
      localSetItem('active_memoid', id)
    },
    getActiveId() {
      this.active_cataid = localGetItem('active_cataid')
      this.active_memoid = localGetItem('active_memoid')
    }
  },
  getters: {
    activeMemos: (state) => {
      return state.memos.filter((item) => item.cata_id === state.active_cataid)
    }, // 当前备忘录列表
    activeMemo(state): MemoType | undefined {
      return this.activeMemos.find((r) => r.memo_id === state.active_memoid)
    } // 当前的单条备忘录
  }
})

export default indexStore
