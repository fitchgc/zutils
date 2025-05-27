# ZUTILS

Integrates some commonly used utility classes for convenient development.

## 1. Usage

***Important:: TypeScript version must be higher than 4.7!!***
```bash
git submodule add --force git@github.com:fitchgc/zutils.git ./packages/zutils
yarn add file:packages/zutils
# or
yarn add link:packages/zutils
```

```typescript
import { SyncLocker, ZRedisClient } from 'zutils'
import { isTrue } from 'zutils/utils/string.util'

```