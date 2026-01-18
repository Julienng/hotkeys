import { useEffect, useRef } from 'react'
import {
  type Hotkey,
  type ParsedHotkey,
  createHotkeyHandler,
  parseHotkey,
} from '@tanstack/keys'

export interface UseHotkeyOptions {
  /** Whether the hotkey is enabled. Defaults to true. */
  enabled?: boolean
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
 * React hook for registering a keyboard hotkey.
 *
 * @param hotkey - The hotkey string (e.g., 'Mod+S', 'Escape')
 * @param callback - The function to call when the hotkey is pressed
 * @param options - Options for the hotkey behavior
 * @returns A ref to attach to an element for scoped hotkeys, or undefined for global hotkeys
 *
 * @example
 * ```tsx
 * function SaveButton() {
 *   // Global hotkey
 *   useHotkey('Mod+S', () => {
 *     handleSave()
 *   }, { preventDefault: true })
 *
 *   return <button>Save</button>
 * }
 * ```
 *
 * @example
 * ```tsx
 * function Modal() {
 *   // Scoped hotkey - only active when element is focused
 *   const ref = useHotkey('Escape', () => {
 *     closeModal()
 *   }, { scope: 'local' })
 *
 *   return <div ref={ref}>...</div>
 * }
 * ```
 */
export function useHotkey(
  hotkey: Hotkey | ParsedHotkey,
  callback: (event: KeyboardEvent) => void,
  options: UseHotkeyOptions = {},
): void {
  const {
    enabled = true,
    preventDefault = false,
    stopPropagation = false,
    platform,
    eventType = 'keydown',
  } = options

  // Use refs to avoid recreating the handler on every render
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const parsedRef = useRef<ParsedHotkey | null>(null)
  if (typeof hotkey === 'string') {
    parsedRef.current = parseHotkey(hotkey, platform)
  } else {
    parsedRef.current = hotkey
  }

  useEffect(() => {
    if (!enabled) {
      return
    }

    const handler = createHotkeyHandler(
      parsedRef.current!,
      (event) => callbackRef.current(event),
      { preventDefault, stopPropagation, platform },
    )

    document.addEventListener(eventType, handler)

    return () => {
      document.removeEventListener(eventType, handler)
    }
  }, [enabled, preventDefault, stopPropagation, platform, eventType])
}
