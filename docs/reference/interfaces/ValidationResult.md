---
id: ValidationResult
title: ValidationResult
---

# Interface: ValidationResult

Defined in: [types.ts:291](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L291)

Result of validating a hotkey string.

## Properties

### errors

```ts
errors: string[];
```

Defined in: [types.ts:297](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L297)

Error messages about invalid syntax

***

### valid

```ts
valid: boolean;
```

Defined in: [types.ts:293](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L293)

Whether the hotkey is valid (can still have warnings)

***

### warnings

```ts
warnings: string[];
```

Defined in: [types.ts:295](https://github.com/TanStack/keys/blob/main/packages/keys/src/types.ts#L295)

Warning messages about potential issues
