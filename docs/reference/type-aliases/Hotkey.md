---
id: Hotkey
title: Hotkey
---

# Type Alias: Hotkey

```ts
type Hotkey = 
  | Key
  | SingleModifierHotkey
  | TwoModifierHotkey
  | ThreeModifierHotkey;
```

Defined in: [types.ts:241](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L241)

A type-safe hotkey string.

Provides autocomplete for:
- All single keys (letters, numbers, function keys, navigation, editing, punctuation)
- Single modifier + common key (Control+S, Mod+A, Mod+/, etc.)
- Two modifiers + common key (Mod+Shift+S, Control+Alt+A, etc.)
- Three modifiers + common key (Control+Alt+Shift+A, etc.)

Use canonical modifier names:
- `Control` (not Ctrl)
- `Alt` (not Option)
- `Meta` (not Command/Cmd)
- `Mod` for cross-platform (Command on Mac, Control elsewhere)

## Example

```ts
const save: Hotkey = 'Mod+S'           // ✓ Cross-platform save
const saveAs: Hotkey = 'Mod+Shift+S'   // ✓ Cross-platform save as
const macOnly: Hotkey = 'Meta+S'       // ✓ Command+S on Mac only
const comment: Hotkey = 'Mod+/'       // ✓ Toggle comment
const indent: Hotkey = 'Mod+]'        // ✓ Indent
```
