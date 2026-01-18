import { describe, expect, it } from 'vitest'

describe('createHotkey', () => {
  it('should be importable', async () => {
    const { createHotkey } = await import('../src/createHotkey')
    expect(createHotkey).toBeDefined()
    expect(typeof createHotkey).toBe('function')
  })
})
