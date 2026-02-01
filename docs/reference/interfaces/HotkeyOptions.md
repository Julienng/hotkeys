---
id: HotkeyOptions
title: HotkeyOptions
---

# Interface: HotkeyOptions

Defined in: [types.ts:340](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L340)

Options for registering a hotkey.

## Extended by

- [`SequenceOptions`](SequenceOptions.md)

## Properties

### enabled?

```ts
optional enabled: boolean;
```

Defined in: [types.ts:352](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L352)

Whether the hotkey is enabled. Defaults to true

***

### eventType?

```ts
optional eventType: "keydown" | "keyup";
```

Defined in: [types.ts:348](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L348)

The event type to listen for. Defaults to 'keydown'

***

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [types.ts:346](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L346)

The target platform for resolving 'Mod'

***

### preventDefault?

```ts
optional preventDefault: boolean;
```

Defined in: [types.ts:342](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L342)

Prevent the default browser action when the hotkey matches

***

### requireReset?

```ts
optional requireReset: boolean;
```

Defined in: [types.ts:350](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L350)

If true, only trigger once until all keys are released. Default: false

***

### stopPropagation?

```ts
optional stopPropagation: boolean;
```

Defined in: [types.ts:344](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L344)

Stop event propagation when the hotkey matches
