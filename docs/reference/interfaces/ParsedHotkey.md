---
id: ParsedHotkey
title: ParsedHotkey
---

# Interface: ParsedHotkey

Defined in: [types.ts:265](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L265)

A parsed representation of a hotkey string.

This interface provides a flexible fallback when the `Hotkey` type doesn't
fit your use case. You can pass a `ParsedHotkey` directly to hotkey functions
instead of a hotkey string, allowing for more dynamic or complex scenarios
that aren't covered by the type-safe `Hotkey` union.

## Example

```ts
// Type-safe hotkey string
useHotkey('Mod+S', handler)

// Fallback: parsed hotkey for dynamic scenarios
const parsed = parseHotkey(userInput)
useHotkey(parsed, handler) // Works even if userInput isn't in Hotkey type
```

## Properties

### alt

```ts
alt: boolean;
```

Defined in: [types.ts:273](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L273)

Whether the Alt key is required

***

### ctrl

```ts
ctrl: boolean;
```

Defined in: [types.ts:269](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L269)

Whether the Control key is required

***

### key

```ts
key: Key | string & object;
```

Defined in: [types.ts:267](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L267)

The non-modifier key (e.g., 'S', 'Escape', 'F1', '/', '['). Can be any string for flexibility.

***

### meta

```ts
meta: boolean;
```

Defined in: [types.ts:275](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L275)

Whether the Meta (Command) key is required

***

### modifiers

```ts
modifiers: CanonicalModifier[];
```

Defined in: [types.ts:277](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L277)

List of canonical modifier names that are required, in canonical order

***

### shift

```ts
shift: boolean;
```

Defined in: [types.ts:271](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L271)

Whether the Shift key is required
