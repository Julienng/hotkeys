---
id: HotkeyOptions
title: HotkeyOptions
---

# Interface: HotkeyOptions

Defined in: [hotkey-manager.ts:24](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L24)

Options for registering a hotkey.

## Extended by

- [`SequenceOptions`](SequenceOptions.md)

## Properties

### conflictBehavior?

```ts
optional conflictBehavior: ConflictBehavior;
```

Defined in: [hotkey-manager.ts:42](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L42)

Behavior when this hotkey conflicts with an existing registration on the same target. Defaults to 'warn'

***

### enabled?

```ts
optional enabled: boolean;
```

Defined in: [hotkey-manager.ts:26](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L26)

Whether the hotkey is enabled. Defaults to true

***

### eventType?

```ts
optional eventType: "keydown" | "keyup";
```

Defined in: [hotkey-manager.ts:28](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L28)

The event type to listen for. Defaults to 'keydown'

***

### ignoreInputs?

```ts
optional ignoreInputs: boolean;
```

Defined in: [hotkey-manager.ts:30](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L30)

Whether to ignore hotkeys when keyboard events originate from input-like elements (input, textarea, select, contenteditable). Defaults to true

***

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [hotkey-manager.ts:32](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L32)

The target platform for resolving 'Mod'

***

### preventDefault?

```ts
optional preventDefault: boolean;
```

Defined in: [hotkey-manager.ts:34](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L34)

Prevent the default browser action when the hotkey matches

***

### requireReset?

```ts
optional requireReset: boolean;
```

Defined in: [hotkey-manager.ts:36](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L36)

If true, only trigger once until all keys are released. Default: false

***

### stopPropagation?

```ts
optional stopPropagation: boolean;
```

Defined in: [hotkey-manager.ts:38](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L38)

Stop event propagation when the hotkey matches

***

### target?

```ts
optional target: Document | Window | HTMLElement | null;
```

Defined in: [hotkey-manager.ts:40](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L40)

The DOM element to attach the event listener to. Defaults to document.
