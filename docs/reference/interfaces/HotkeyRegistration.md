---
id: HotkeyRegistration
title: HotkeyRegistration
---

# Interface: HotkeyRegistration

Defined in: [types.ts:386](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L386)

A registered hotkey handler in the HotkeyManager.

## Properties

### callback

```ts
callback: HotkeyCallback;
```

Defined in: [types.ts:394](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L394)

The callback to invoke

***

### hasFired

```ts
hasFired: boolean;
```

Defined in: [types.ts:398](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L398)

Whether this registration has fired and needs reset (for requireReset)

***

### hotkey

```ts
hotkey: Hotkey;
```

Defined in: [types.ts:390](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L390)

The original hotkey string

***

### id

```ts
id: string;
```

Defined in: [types.ts:388](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L388)

Unique identifier for this registration

***

### options

```ts
options: HotkeyOptions;
```

Defined in: [types.ts:396](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L396)

Options for this registration

***

### parsedHotkey

```ts
parsedHotkey: ParsedHotkey;
```

Defined in: [types.ts:392](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L392)

The parsed hotkey
