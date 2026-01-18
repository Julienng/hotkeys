import type { Hotkey, ParsedHotkey } from './types'
import { detectPlatform, normalizeKeyName } from './constants'
import { parseHotkey } from './parse'

/**
 * Checks if a KeyboardEvent matches a hotkey.
 *
 * Uses the `key` property from KeyboardEvent for matching (not `code`).
 * Letter keys are matched case-insensitively.
 *
 * @param event - The KeyboardEvent to check
 * @param hotkey - The hotkey string or ParsedHotkey to match against
 * @param platform - The target platform for resolving 'Mod' (defaults to auto-detection)
 * @returns True if the event matches the hotkey
 *
 * @example
 * ```ts
 * document.addEventListener('keydown', (event) => {
 *   if (matchesKeyboardEvent(event, 'Mod+S')) {
 *     event.preventDefault()
 *     handleSave()
 *   }
 * })
 * ```
 */
export function matchesKeyboardEvent(
  event: KeyboardEvent,
  hotkey: Hotkey | ParsedHotkey,
  platform: 'mac' | 'windows' | 'linux' = detectPlatform(),
): boolean {
  const parsed =
    typeof hotkey === 'string' ? parseHotkey(hotkey, platform) : hotkey

  // Check modifiers
  if (event.ctrlKey !== parsed.ctrl) {
    return false
  }
  if (event.shiftKey !== parsed.shift) {
    return false
  }
  if (event.altKey !== parsed.alt) {
    return false
  }
  if (event.metaKey !== parsed.meta) {
    return false
  }

  // Check key (case-insensitive for letters)
  const eventKey = normalizeKeyName(event.key)
  const hotkeyKey = parsed.key

  // For single letters, compare case-insensitively
  if (eventKey.length === 1 && hotkeyKey.length === 1) {
    return eventKey.toUpperCase() === hotkeyKey.toUpperCase()
  }

  // For special keys, compare exactly (after normalization)
  return eventKey === hotkeyKey
}

/**
 * Creates a keyboard event handler that calls the callback when the hotkey matches.
 *
 * @param hotkey - The hotkey string or ParsedHotkey to match
 * @param callback - The function to call when the hotkey matches
 * @param options - Options for matching and handling
 * @returns A function that can be used as an event handler
 *
 * @example
 * ```ts
 * const handler = createHotkeyHandler('Mod+S', (event) => {
 *   handleSave()
 * }, { preventDefault: true })
 *
 * document.addEventListener('keydown', handler)
 * ```
 */
export function createHotkeyHandler(
  hotkey: Hotkey | ParsedHotkey,
  callback: (event: KeyboardEvent) => void,
  options: {
    /** Prevent the default browser action when the hotkey matches */
    preventDefault?: boolean
    /** Stop event propagation when the hotkey matches */
    stopPropagation?: boolean
    /** The target platform for resolving 'Mod' */
    platform?: 'mac' | 'windows' | 'linux'
  } = {},
): (event: KeyboardEvent) => void {
  const { preventDefault = false, stopPropagation = false, platform } = options
  const parsed =
    typeof hotkey === 'string'
      ? parseHotkey(hotkey, platform ?? detectPlatform())
      : hotkey

  return (event: KeyboardEvent) => {
    if (matchesKeyboardEvent(event, parsed, platform)) {
      if (preventDefault) {
        event.preventDefault()
      }
      if (stopPropagation) {
        event.stopPropagation()
      }
      callback(event)
    }
  }
}

/**
 * Creates a handler that matches multiple hotkeys.
 *
 * @param handlers - A map of hotkey strings to their handlers
 * @param options - Options for matching and handling
 * @returns A function that can be used as an event handler
 *
 * @example
 * ```ts
 * const handler = createMultiHotkeyHandler({
 *   'Mod+S': () => handleSave(),
 *   'Mod+Z': () => handleUndo(),
 *   'Mod+Shift+Z': () => handleRedo(),
 * })
 *
 * document.addEventListener('keydown', handler)
 * ```
 */
export function createMultiHotkeyHandler(
  handlers: { [K in Hotkey]?: (event: KeyboardEvent) => void },
  options: {
    /** Prevent the default browser action when any hotkey matches */
    preventDefault?: boolean
    /** Stop event propagation when any hotkey matches */
    stopPropagation?: boolean
    /** The target platform for resolving 'Mod' */
    platform?: 'mac' | 'windows' | 'linux'
  } = {},
): (event: KeyboardEvent) => void {
  const { preventDefault = false, stopPropagation = false, platform } = options
  const resolvedPlatform = platform ?? detectPlatform()

  // Pre-parse all hotkeys for efficiency
  const parsedHandlers = Object.entries(handlers)
    .filter((entry): entry is [string, (event: KeyboardEvent) => void] => entry[1] !== undefined)
    .map(([hotkey, handler]) => ({
      parsed: parseHotkey(hotkey as Hotkey, resolvedPlatform),
      handler,
    }))

  return (event: KeyboardEvent) => {
    for (const { parsed, handler } of parsedHandlers) {
      if (matchesKeyboardEvent(event, parsed, resolvedPlatform)) {
        if (preventDefault) {
          event.preventDefault()
        }
        if (stopPropagation) {
          event.stopPropagation()
        }
        handler(event)
        return // Only handle the first match
      }
    }
  }
}
