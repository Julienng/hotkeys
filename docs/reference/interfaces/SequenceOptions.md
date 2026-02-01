---
id: SequenceOptions
title: SequenceOptions
---

# Interface: SequenceOptions

Defined in: [types.ts:374](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L374)

Options for hotkey sequence matching.

## Extends

- [`HotkeyOptions`](HotkeyOptions.md)

## Properties

### enabled?

```ts
optional enabled: boolean;
```

Defined in: [types.ts:352](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L352)

Whether the hotkey is enabled. Defaults to true

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`enabled`](HotkeyOptions.md#enabled)

***

### eventType?

```ts
optional eventType: "keydown" | "keyup";
```

Defined in: [types.ts:348](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L348)

The event type to listen for. Defaults to 'keydown'

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`eventType`](HotkeyOptions.md#eventtype)

***

### platform?

```ts
optional platform: "mac" | "windows" | "linux";
```

Defined in: [types.ts:346](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L346)

The target platform for resolving 'Mod'

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`platform`](HotkeyOptions.md#platform)

***

### preventDefault?

```ts
optional preventDefault: boolean;
```

Defined in: [types.ts:342](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L342)

Prevent the default browser action when the hotkey matches

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`preventDefault`](HotkeyOptions.md#preventdefault)

***

### requireReset?

```ts
optional requireReset: boolean;
```

Defined in: [types.ts:350](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L350)

If true, only trigger once until all keys are released. Default: false

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`requireReset`](HotkeyOptions.md#requirereset)

***

### stopPropagation?

```ts
optional stopPropagation: boolean;
```

Defined in: [types.ts:344](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L344)

Stop event propagation when the hotkey matches

#### Inherited from

[`HotkeyOptions`](HotkeyOptions.md).[`stopPropagation`](HotkeyOptions.md#stoppropagation)

***

### timeout?

```ts
optional timeout: number;
```

Defined in: [types.ts:376](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L376)

Timeout between keys in milliseconds. Default: 1000
