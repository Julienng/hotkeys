// =============================================================================
// Types
// =============================================================================

export type {
  // Modifier types
  Modifier,
  CanonicalModifier,
  // Key types
  LetterKey,
  NumberKey,
  FunctionKey,
  NavigationKey,
  EditingKey,
  Key,
  // Hotkey types
  Hotkey,
  ParsedHotkey,
  // Option types
  FormatDisplayOptions,
  ValidationResult,
} from './types'

// =============================================================================
// Constants
// =============================================================================

export {
  // Platform detection
  detectPlatform,
  // Key sets
  LETTER_KEYS,
  NUMBER_KEYS,
  FUNCTION_KEYS,
  NAVIGATION_KEYS,
  EDITING_KEYS,
  ALL_KEYS,
  // Display constants
  MAC_MODIFIER_SYMBOLS,
  STANDARD_MODIFIER_LABELS,
  KEY_DISPLAY_SYMBOLS,
  MODIFIER_ORDER,
} from './constants'

// =============================================================================
// Parsing
// =============================================================================

export { parseHotkey, normalizeHotkey, isModifier } from './parse'

// =============================================================================
// Formatting
// =============================================================================

export { formatHotkey, formatForDisplay, formatWithLabels } from './format'

// =============================================================================
// Matching
// =============================================================================

export {
  matchesKeyboardEvent,
  createHotkeyHandler,
  createMultiHotkeyHandler,
} from './match'

// =============================================================================
// Validation
// =============================================================================

export { validateHotkey, assertValidHotkey, checkHotkey } from './validate'
