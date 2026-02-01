---
id: NUMBER_KEYS
title: NUMBER_KEYS
---

# Variable: NUMBER\_KEYS

```ts
const NUMBER_KEYS: Set<NumberKey>;
```

Defined in: [constants.ts:179](https://github.com/TanStack/keys/blob/main/packages/keys/src/constants.ts#L179)

Set of all valid number keys (0-9).

Note: Number keys are affected by Shift (Shift+1 → '!' on US layout),
so they're excluded from Shift-based hotkey combinations to avoid
layout-dependent behavior.
