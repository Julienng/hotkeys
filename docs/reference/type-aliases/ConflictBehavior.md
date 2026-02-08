---
id: ConflictBehavior
title: ConflictBehavior
---

# Type Alias: ConflictBehavior

```ts
type ConflictBehavior = "warn" | "error" | "replace" | "allow";
```

Defined in: [hotkey-manager.ts:19](https://github.com/TanStack/keys/blob/main/packages/keys/src/hotkey-manager.ts#L19)

Behavior when registering a hotkey that conflicts with an existing registration.

- `'warn'` - Log a warning to the console but allow both registrations (default)
- `'error'` - Throw an error and prevent the new registration
- `'replace'` - Unregister the existing hotkey and register the new one
- `'allow'` - Allow multiple registrations of the same hotkey without warning
