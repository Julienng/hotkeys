import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useHotkey } from '../src/useHotkey'

describe('useHotkey', () => {
  it('should register a hotkey handler', () => {
    const callback = vi.fn()
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    renderHook(() => useHotkey('Mod+S', callback, { platform: 'mac' }))

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    )

    addEventListenerSpy.mockRestore()
  })

  it('should remove handler on unmount', () => {
    const callback = vi.fn()
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = renderHook(() =>
      useHotkey('Mod+S', callback, { platform: 'mac' }),
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    )

    removeEventListenerSpy.mockRestore()
  })

  it('should not register handler when disabled', () => {
    const callback = vi.fn()
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    renderHook(() =>
      useHotkey('Mod+S', callback, { platform: 'mac', enabled: false }),
    )

    expect(addEventListenerSpy).not.toHaveBeenCalled()

    addEventListenerSpy.mockRestore()
  })

  it('should call callback when hotkey matches', () => {
    const callback = vi.fn()

    renderHook(() => useHotkey('Mod+S', callback, { platform: 'mac' }))

    // Simulate keydown event
    const event = new KeyboardEvent('keydown', {
      key: 's',
      metaKey: true,
    })
    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalled()
  })

  it('should not call callback when hotkey does not match', () => {
    const callback = vi.fn()

    renderHook(() => useHotkey('Mod+S', callback, { platform: 'mac' }))

    // Simulate different keydown event
    const event = new KeyboardEvent('keydown', {
      key: 'a',
      metaKey: true,
    })
    document.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })

  it('should use keyup event when specified', () => {
    const callback = vi.fn()
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    renderHook(() =>
      useHotkey('Escape', callback, { eventType: 'keyup' }),
    )

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function),
    )

    addEventListenerSpy.mockRestore()
  })
})
