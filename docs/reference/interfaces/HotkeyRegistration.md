---
id: HotkeyRegistration
title: HotkeyRegistration
---

# Interface: HotkeyRegistration

Defined in: [hotkey-manager.ts:48](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L48)

A registered hotkey handler in the HotkeyManager.

## Properties

### callback

```ts
callback: HotkeyCallback;
```

Defined in: [hotkey-manager.ts:56](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L56)

The callback to invoke

***

### hasFired

```ts
hasFired: boolean;
```

Defined in: [hotkey-manager.ts:60](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L60)

Whether this registration has fired and needs reset (for requireReset)

***

### hotkey

```ts
hotkey: Hotkey;
```

Defined in: [hotkey-manager.ts:52](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L52)

The original hotkey string

***

### id

```ts
id: string;
```

Defined in: [hotkey-manager.ts:50](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L50)

Unique identifier for this registration

***

### options

```ts
options: HotkeyOptions;
```

Defined in: [hotkey-manager.ts:58](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L58)

Options for this registration

***

### parsedHotkey

```ts
parsedHotkey: ParsedHotkey;
```

Defined in: [hotkey-manager.ts:54](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L54)

The parsed hotkey

***

### target

```ts
target: Document | Window | HTMLElement;
```

Defined in: [hotkey-manager.ts:62](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L62)

The resolved target element for this registration
