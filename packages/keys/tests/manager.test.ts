import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HotkeyManager } from '../src/manager'

/**
 * Helper to create a mock KeyboardEvent
 */
function createKeyboardEvent(
  type: 'keydown' | 'keyup',
  key: string,
  options: {
    ctrlKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    metaKey?: boolean
  } = {},
): KeyboardEvent {
  return new KeyboardEvent(type, {
    key,
    ctrlKey: options.ctrlKey ?? false,
    shiftKey: options.shiftKey ?? false,
    altKey: options.altKey ?? false,
    metaKey: options.metaKey ?? false,
    bubbles: true,
  })
}

describe('HotkeyManager', () => {
  beforeEach(() => {
    HotkeyManager.resetInstance()
  })

  afterEach(() => {
    HotkeyManager.resetInstance()
  })

  describe('singleton pattern', () => {
    it('should return the same instance', () => {
      const instance1 = HotkeyManager.getInstance()
      const instance2 = HotkeyManager.getInstance()
      expect(instance1).toBe(instance2)
    })

    it('should reset instance correctly', () => {
      const instance1 = HotkeyManager.getInstance()
      HotkeyManager.resetInstance()
      const instance2 = HotkeyManager.getInstance()
      expect(instance1).not.toBe(instance2)
    })
  })

  describe('registration', () => {
    it('should register a hotkey', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, { platform: 'mac' })

      expect(manager.getRegistrationCount()).toBe(1)
      expect(manager.isRegistered('Mod+S')).toBe(true)
    })

    it('should unregister a hotkey', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      const unregister = manager.register('Mod+S', callback)
      expect(manager.getRegistrationCount()).toBe(1)

      unregister()
      expect(manager.getRegistrationCount()).toBe(0)
      expect(manager.isRegistered('Mod+S')).toBe(false)
    })

    it('should handle multiple registrations', () => {
      const manager = HotkeyManager.getInstance()
      const callback1 = vi.fn()
      const callback2 = vi.fn()

      manager.register('Mod+S', callback1)
      manager.register('Mod+Z', callback2)

      expect(manager.getRegistrationCount()).toBe(2)
    })
  })

  describe('event handling', () => {
    it('should call callback when hotkey is pressed', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, { platform: 'mac' })

      const event = createKeyboardEvent('keydown', 's', { metaKey: true })
      document.dispatchEvent(event)

      expect(callback).toHaveBeenCalledWith(
        event,
        expect.objectContaining({
          hotkey: 'Mod+S',
          parsedHotkey: expect.objectContaining({ key: 'S', meta: true }),
        }),
      )
    })

    it('should not call callback when different hotkey is pressed', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, { platform: 'mac' })

      const event = createKeyboardEvent('keydown', 'z', { metaKey: true })
      document.dispatchEvent(event)

      expect(callback).not.toHaveBeenCalled()
    })

    it('should not call callback when disabled', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, { platform: 'mac', enabled: false })

      const event = createKeyboardEvent('keydown', 's', { metaKey: true })
      document.dispatchEvent(event)

      expect(callback).not.toHaveBeenCalled()
    })

    it('should handle keyup events when configured', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, {
        platform: 'mac',
        eventType: 'keyup',
      })

      // keydown should not trigger
      const keydownEvent = createKeyboardEvent('keydown', 's', {
        metaKey: true,
      })
      document.dispatchEvent(keydownEvent)
      expect(callback).not.toHaveBeenCalled()

      // keyup should trigger
      const keyupEvent = createKeyboardEvent('keyup', 's', { metaKey: true })
      document.dispatchEvent(keyupEvent)
      expect(callback).toHaveBeenCalled()
    })
  })

  describe('requireReset option', () => {
    it('should only fire once when requireReset is true', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, {
        platform: 'mac',
        requireReset: true,
      })

      const event1 = createKeyboardEvent('keydown', 's', { metaKey: true })
      document.dispatchEvent(event1)
      expect(callback).toHaveBeenCalledTimes(1)

      // Second press should not fire (keys still held)
      const event2 = createKeyboardEvent('keydown', 's', { metaKey: true })
      document.dispatchEvent(event2)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should fire again after key is released', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, {
        platform: 'mac',
        requireReset: true,
      })

      // First press
      document.dispatchEvent(
        createKeyboardEvent('keydown', 's', { metaKey: true }),
      )
      expect(callback).toHaveBeenCalledTimes(1)

      // Release the key
      document.dispatchEvent(
        createKeyboardEvent('keyup', 's', { metaKey: true }),
      )

      // Second press should fire
      document.dispatchEvent(
        createKeyboardEvent('keydown', 's', { metaKey: true }),
      )
      expect(callback).toHaveBeenCalledTimes(2)
    })
  })

  describe('preventDefault and stopPropagation', () => {
    it('should call preventDefault when option is set', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, {
        platform: 'mac',
        preventDefault: true,
      })

      const event = createKeyboardEvent('keydown', 's', { metaKey: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      document.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should call stopPropagation when option is set', () => {
      const manager = HotkeyManager.getInstance()
      const callback = vi.fn()

      manager.register('Mod+S', callback, {
        platform: 'mac',
        stopPropagation: true,
      })

      const event = createKeyboardEvent('keydown', 's', { metaKey: true })
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation')

      document.dispatchEvent(event)

      expect(stopPropagationSpy).toHaveBeenCalled()
    })
  })
})
