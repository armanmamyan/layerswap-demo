# Module Resolution Error: `ethers/lib/utils`

## Problem Identification

The error occurs because of a version incompatibility between `ethers` and `@uniswap/v4-sdk`:

- **Your project uses**: `ethers` v6.16.0
- **@uniswap/v4-sdk expects**: `ethers` v5 (it imports from `ethers/lib/utils`)

### Root Cause

In **ethers v5**, utilities were located at:
```javascript
import { isAddress, defaultAbiCoder } from 'ethers/lib/utils';
```

In **ethers v6**, the module structure changed significantly:
- `isAddress` moved to `ethers` (main export)
- `defaultAbiCoder` was replaced with `AbiCoder` from `ethers`
- The `lib/utils` path no longer exists

The `@uniswap/v4-sdk@1.25.4` package (pulled in as a dependency, likely through `@layerswap/widget` or `@layerswap/wallets`) still uses the old ethers v5 import paths.

## Solutions

### Solution 1: Webpack Alias (Recommended for Next.js)

Configure Next.js to alias `ethers/lib/utils` to the appropriate ethers v6 exports. This allows you to keep ethers v6 while making the old imports work.

**Update `next.config.ts`:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'ethers/lib/utils': 'ethers',
      };
    }
    return config;
  },
};

export default nextConfig;
```

**Note**: This is a partial fix. You may need additional aliases if other ethers v5 paths are used. A more complete solution would be:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'ethers/lib/utils': 'ethers',
        'ethers/lib/contract': 'ethers',
        'ethers/lib/providers': 'ethers',
      };
      // Handle fallbacks for Node.js modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
```

### Solution 2: Install ethers v5 as a Peer Dependency

Install `ethers` v5 alongside v6. This allows packages expecting v5 to use it while your code uses v6.

```bash
pnpm add ethers@^5.7.2
```

**Pros**: 
- Works immediately without configuration
- Both versions can coexist

**Cons**: 
- Increases bundle size
- Potential confusion between v5 and v6 APIs
- May cause type conflicts

### Solution 3: Use Package Aliases (pnpm/yarn)

Use pnpm's package aliasing feature to install ethers v5 under a different name:

```bash
pnpm add ethers-v5@npm:ethers@^5.7.2
```

Then configure webpack to resolve `ethers` to `ethers-v5` for the problematic packages:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'ethers/lib/utils': 'ethers-v5/lib/utils',
      };
    }
    return config;
  },
};

export default nextConfig;
```

### Solution 4: Downgrade to ethers v5 (Not Recommended)

If you're not using ethers v6 features, you could downgrade:

```bash
pnpm remove ethers
pnpm add ethers@^5.7.2
```

**Warning**: This may break other dependencies that expect ethers v6 (like `wagmi` v3 which uses viem, but some packages may still need ethers v6).

## Recommended Approach

**Use Solution 1 (Webpack Alias)** as it:
- ✅ Keeps your ethers v6 dependency
- ✅ Minimal configuration
- ✅ Works with Next.js bundling
- ✅ No duplicate dependencies

However, you may encounter additional compatibility issues with `@uniswap/v4-sdk` since it may use other ethers v5 APIs. In that case, consider **Solution 2** as a fallback.

## Additional Notes

- The `@uniswap/v4-sdk` package may need updates to support ethers v6
- Check if `@layerswap/widget` or `@layerswap/wallets` have updates that resolve this
- Consider opening an issue with the LayerSwap team about ethers v6 compatibility

## Verification

After applying the fix, verify the build works:

```bash
pnpm build
```

If you still encounter errors, check the console for other ethers v5 import paths that need aliasing.
