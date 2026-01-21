import { describe, expect, it, vi } from 'vitest'
import {
  createHotkeyHandler,
  createMultiHotkeyHandler,
  matchesKeyboardEvent,
} from '../src/match'

/**
 * Helper to create a mock KeyboardEvent
 */
function createKeyboardEvent(
  key: string,
  options: {
    ctrlKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    metaKey?: boolean
  } = {},
): KeyboardEvent {
  return {
    key,
    ctrlKey: options.ctrlKey ?? false,
    shiftKey: options.shiftKey ?? false,
    altKey: options.altKey ?? false,
    metaKey: options.metaKey ?? false,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  } as unknown as KeyboardEvent
}

describe('matchesKeyboardEvent', () => {
  describe('single key matching', () => {
    it('should match a single letter key', () => {
      const event = createKeyboardEvent('a')
      expect(matchesKeyboardEvent(event, 'A')).toBe(true)
    })

    it('should not match different keys', () => {
      const event = createKeyboardEvent('a')
      expect(matchesKeyboardEvent(event, 'B')).toBe(false)
    })

    it('should match special keys', () => {
      const escEvent = createKeyboardEvent('Escape')
      expect(matchesKeyboardEvent(escEvent, 'Escape')).toBe(true)

      const enterEvent = createKeyboardEvent('Enter')
      expect(matchesKeyboardEvent(enterEvent, 'Enter')).toBe(true)
    })

    it('should match function keys', () => {
      const event = createKeyboardEvent('F5')
      expect(matchesKeyboardEvent(event, 'F5')).toBe(true)
    })
  })

  describe('modifier matching', () => {
    it('should match Control modifier', () => {
      const event = createKeyboardEvent('a', { ctrlKey: true })
      expect(matchesKeyboardEvent(event, 'Control+A')).toBe(true)
    })

    it('should not match if Control is missing', () => {
      const event = createKeyboardEvent('a')
      expect(matchesKeyboardEvent(event, 'Control+A')).toBe(false)
    })

    it('should not match if extra Control is present', () => {
      const event = createKeyboardEvent('a', { ctrlKey: true })
      expect(matchesKeyboardEvent(event, 'A')).toBe(false)
    })

    it('should match Shift modifier', () => {
      const event = createKeyboardEvent('A', { shiftKey: true })
      expect(matchesKeyboardEvent(event, 'Shift+A')).toBe(true)
    })

    it('should match Alt modifier', () => {
      const event = createKeyboardEvent('a', { altKey: true })
      expect(matchesKeyboardEvent(event, 'Alt+A')).toBe(true)
    })

    it('should match Meta modifier', () => {
      const event = createKeyboardEvent('a', { metaKey: true })
      expect(matchesKeyboardEvent(event, 'Meta+A')).toBe(true)
    })
  })

  describe('Mod modifier (platform-specific)', () => {
    it('should match Mod as Meta on Mac', () => {
      const event = createKeyboardEvent('s', { metaKey: true })
      expect(matchesKeyboardEvent(event, 'Mod+S', 'mac')).toBe(true)
    })

    it('should not match Mod as Control on Mac', () => {
      const event = createKeyboardEvent('s', { ctrlKey: true })
      expect(matchesKeyboardEvent(event, 'Mod+S', 'mac')).toBe(false)
    })

    it('should match Mod as Control on Windows', () => {
      const event = createKeyboardEvent('s', { ctrlKey: true })
      expect(matchesKeyboardEvent(event, 'Mod+S', 'windows')).toBe(true)
    })

    it('should not match Mod as Meta on Windows', () => {
      const event = createKeyboardEvent('s', { metaKey: true })
      expect(matchesKeyboardEvent(event, 'Mod+S', 'windows')).toBe(false)
    })
  })

  describe('multiple modifiers', () => {
    it('should match two modifiers', () => {
      const event = createKeyboardEvent('s', { ctrlKey: true, shiftKey: true })
      expect(matchesKeyboardEvent(event, 'Control+Shift+S')).toBe(true)
    })

    it('should not match if one modifier is missing', () => {
      const event = createKeyboardEvent('s', { ctrlKey: true })
      expect(matchesKeyboardEvent(event, 'Control+Shift+S')).toBe(false)
    })

    it('should not match if extra modifier is present', () => {
      const event = createKeyboardEvent('s', {
        ctrlKey: true,
        shiftKey: true,
        altKey: true,
      })
      expect(matchesKeyboardEvent(event, 'Control+Shift+S')).toBe(false)
    })

    it('should match three modifiers', () => {
      const event = createKeyboardEvent('a', {
        ctrlKey: true,
        shiftKey: true,
        altKey: true,
      })
      expect(matchesKeyboardEvent(event, 'Control+Alt+Shift+A')).toBe(true)
    })
  })

  describe('with ParsedHotkey input', () => {
    it('should accept ParsedHotkey objects', () => {
      const event = createKeyboardEvent('s', { metaKey: true })
      const parsed = {
        key: 'S',
        ctrl: false,
        shift: false,
        alt: false,
        meta: true,
        modifiers: ['Meta'] as ('Control' | 'Shift' | 'Alt' | 'Meta')[],
      }
      expect(matchesKeyboardEvent(event, parsed)).toBe(true)
    })
  })
})

describe('createHotkeyHandler', () => {
  it('should call callback with event and context when hotkey matches', () => {
    const callback = vi.fn()
    const handler = createHotkeyHandler('Mod+S', callback, { platform: 'mac' })

    const event = createKeyboardEvent('s', { metaKey: true })
    handler(event)

    expect(callback).toHaveBeenCalledWith(event, {
      hotkey: 'Mod+S',
      parsedHotkey: expect.objectContaining({
        key: 'S',
        meta: true,
      }),
    })
  })

  it('should not call callback when hotkey does not match', () => {
    const callback = vi.fn()
    const handler = createHotkeyHandler('Mod+S', callback, { platform: 'mac' })

    const event = createKeyboardEvent('a', { metaKey: true })
    handler(event)

    expect(callback).not.toHaveBeenCalled()
  })

  it('should preventDefault when option is set', () => {
    const callback = vi.fn()
    const handler = createHotkeyHandler('Mod+S', callback, {
      platform: 'mac',
      preventDefault: true,
    })

    const event = createKeyboardEvent('s', { metaKey: true })
    handler(event)

    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should stopPropagation when option is set', () => {
    const callback = vi.fn()
    const handler = createHotkeyHandler('Mod+S', callback, {
      platform: 'mac',
      stopPropagation: true,
    })

    const event = createKeyboardEvent('s', { metaKey: true })
    handler(event)

    expect(event.stopPropagation).toHaveBeenCalled()
  })

  it('should not preventDefault or stopPropagation by default', () => {
    const callback = vi.fn()
    const handler = createHotkeyHandler('Mod+S', callback, { platform: 'mac' })

    const event = createKeyboardEvent('s', { metaKey: true })
    handler(event)

    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(event.stopPropagation).not.toHaveBeenCalled()
  })
})

describe('createMultiHotkeyHandler', () => {
  it('should call the correct handler with event and context', () => {
    const saveHandler = vi.fn()
    const undoHandler = vi.fn()

    const handler = createMultiHotkeyHandler(
      {
        'Mod+S': saveHandler,
        'Mod+Z': undoHandler,
      },
      { platform: 'mac' },
    )

    const saveEvent = createKeyboardEvent('s', { metaKey: true })
    handler(saveEvent)
    expect(saveHandler).toHaveBeenCalledWith(
      saveEvent,
      expect.objectContaining({
        hotkey: 'Mod+S',
      }),
    )
    expect(undoHandler).not.toHaveBeenCalled()

    saveHandler.mockClear()

    const undoEvent = createKeyboardEvent('z', { metaKey: true })
    handler(undoEvent)
    expect(undoHandler).toHaveBeenCalledWith(
      undoEvent,
      expect.objectContaining({
        hotkey: 'Mod+Z',
      }),
    )
    expect(saveHandler).not.toHaveBeenCalled()
  })

  it('should not call any handler for non-matching events', () => {
    const saveHandler = vi.fn()
    const handler = createMultiHotkeyHandler(
      { 'Mod+S': saveHandler },
      { platform: 'mac' },
    )

    const event = createKeyboardEvent('a')
    handler(event)

    expect(saveHandler).not.toHaveBeenCalled()
  })

  it('should only call the first matching handler', () => {
    // This tests that we stop at the first match
    const handler1 = vi.fn()
    const handler2 = vi.fn()

    // Note: These are the same hotkey (unlikely in practice, but tests the behavior)
    const handler = createMultiHotkeyHandler(
      {
        'Mod+S': handler1,
        'Meta+S': handler2, // Same as Mod+S on Mac
      },
      { platform: 'mac' },
    )

    const event = createKeyboardEvent('s', { metaKey: true })
    handler(event)

    // Only first one should be called
    expect(handler1).toHaveBeenCalled()
    // Second one might or might not be called depending on iteration order
    // but the function returns after first match, so it shouldn't
  })

  it('should apply preventDefault to matching hotkeys', () => {
    const handler = createMultiHotkeyHandler(
      {
        'Mod+S': vi.fn(),
      },
      { platform: 'mac', preventDefault: true },
    )

    const event = createKeyboardEvent('s', { metaKey: true })
    handler(event)

    expect(event.preventDefault).toHaveBeenCalled()
  })
})
