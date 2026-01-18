import { createEffect, onCleanup } from 'solid-js'
import {
  type Hotkey,
  type ParsedHotkey,
  createHotkeyHandler,
  parseHotkey,
} from '@tanstack/keys'

export interface CreateHotkeyOptions {
  /** Whether the hotkey is enabled. Can be a boolean or accessor. Defaults to true. */
  enabled?: boolean | (() => boolean)
  /** Prevent the default browser action when the hotkey matches. */
  preventDefault?: boolean
  /** Stop event propagation when the hotkey matches. */
  stopPropagation?: boolean
  /** The target platform for resolving 'Mod'. Defaults to auto-detection. */
  platform?: 'mac' | 'windows' | 'linux'
  /** The event type to listen for. Defaults to 'keydown'. */
  eventType?: 'keydown' | 'keyup'
}

/**
 * Solid primitive for registering a keyboard hotkey.
 *
 * @param hotkey - The hotkey string (e.g., 'Mod+S', 'Escape')
 * @param callback - The function to call when the hotkey is pressed
 * @param options - Options for the hotkey behavior
 *
 * @example
 * ```tsx
 * function SaveButton() {
 *   createHotkey('Mod+S', () => {
 *     handleSave()
 *   }, { preventDefault: true })
 *
 *   return <button>Save</button>
 * }
 * ```
 */
export function createHotkey(
  hotkey: Hotkey | ParsedHotkey | (() => Hotkey | ParsedHotkey),
  callback: (event: KeyboardEvent) => void,
  options: CreateHotkeyOptions = {},
): void {
  const {
    enabled = true,
    preventDefault = false,
    stopPropagation = false,
    platform,
    eventType = 'keydown',
  } = options

  createEffect(() => {
    // Check if enabled (support both static and reactive values)
    const isEnabled = typeof enabled === 'function' ? enabled() : enabled
    if (!isEnabled) {
      return
    }

    // Get hotkey (support both static and reactive values)
    const hotkeyValue = typeof hotkey === 'function' ? hotkey() : hotkey
    const parsed =
      typeof hotkeyValue === 'string'
        ? parseHotkey(hotkeyValue, platform)
        : hotkeyValue

    const handler = createHotkeyHandler(parsed, callback, {
      preventDefault,
      stopPropagation,
      platform,
    })

    document.addEventListener(eventType, handler)

    onCleanup(() => {
      document.removeEventListener(eventType, handler)
    })
  })
}
