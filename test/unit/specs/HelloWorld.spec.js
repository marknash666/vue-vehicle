import Vue from 'vue'
import Badge from './Badge'

describe('Badge', () => {
  // 检查原始组件选项
  it('has a created hook', () => {
    expect(typeof Badge.created).toBe('function')
  })
})
