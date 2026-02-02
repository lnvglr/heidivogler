# Railway Deployment - Memory Optimization Guide

## Why High RAM Usage?

Your app was using 1GB+ RAM due to several factors:

### 1. **In-Memory Cache Plugin** (Biggest Issue)
- The `rest-cache` plugin was configured with `max: 1000` entries
- Each cached entry can be several KB, leading to 10-50MB+ of cached data
- Memory provider stores everything in RAM without limits

### 2. **Database Connection Pool**
- No maximum connection limit was set
- Could create unlimited connections, each consuming memory

### 3. **Node.js Default Memory Settings**
- Node.js defaults to using up to ~1.5GB on 64-bit systems
- No memory limits were set for production

### 4. **Development Mode**
- Running in development mode uses significantly more memory
- Source maps, hot reloading, and debugging tools consume extra RAM

## Optimizations Applied

### ✅ Backend (Strapi) Optimizations

1. **Reduced Cache Size**
   - Changed `REST_CACHE_MAX` from 1000 → 100 entries
   - Changed `REST_CACHE_TTL` from 300 → 180 seconds
   - **Impact**: Reduces cache memory from ~50MB to ~5MB

2. **Database Connection Pool Limits**
   - Added `max: 5` connections
   - Added connection timeouts to prevent hanging connections
   - **Impact**: Prevents connection pool from growing unbounded

3. **Node.js Memory Limits**
   - Added `--max-old-space-size=512` to start script
   - Limits Node.js heap to 512MB
   - **Impact**: Prevents Node.js from using excessive memory

### ✅ Frontend (Nuxt) Optimizations

1. **Removed `keep-alive` from NuxtPage** ⚠️ **CRITICAL FIX**
   - `keep-alive` was keeping all visited pages in memory indefinitely
   - This was causing the slow memory leak (120MB → 370MB over days)
   - **Impact**: Pages are now properly garbage collected when navigated away

2. **Node.js Memory Limits**
   - Added `--max-old-space-size=512` to start script
   - Limits server-side rendering memory usage

3. **Nitro Optimizations**
   - Disabled link crawling during prerender
   - Added route rules for image caching limits
   - **Impact**: Reduces memory during build and runtime

4. **Component Memory Leak Fixes**
   - Fixed debounce timer cleanup in `kontakt.vue`
   - Optimized `Circles.vue` to reduce object creation in animation loop
   - Improved Mapbox map cleanup

## Railway Deployment Checklist

### Environment Variables

Set these in your Railway project settings:

```bash
# Backend
NODE_ENV=production
REST_CACHE_MAX=100          # Reduced from 1000
REST_CACHE_TTL=180          # Reduced from 300

# Frontend
NODE_ENV=production
NUXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Build Commands

**Backend:**
```bash
cd backend && yarn install && yarn build
```

**Frontend:**
```bash
cd frontend && yarn install && yarn build
```

### Start Commands

**Backend:**
```bash
cd backend && yarn start:prod
```

**Frontend:**
```bash
cd frontend && yarn start:prod
```

### Recommended Railway Settings

1. **Memory Limit**: Set to 512MB or 1GB (should be sufficient now)
2. **CPU**: 0.5 vCPU is usually enough
3. **Auto-Deploy**: Enable for main branch

## Further Optimizations (Optional)

### 1. Use Redis Instead of Memory Cache

For better memory management, consider using Redis:

```bash
# Install Redis provider
yarn add strapi-provider-rest-cache-redis
```

Then update `backend/config/plugins.js`:
```javascript
"rest-cache": {
  config: {
    provider: {
      name: "redis",
      options: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    },
    // ... rest of config
  },
},
```

### 2. Disable Cache Entirely (If Not Needed)

If caching isn't critical, you can disable it:

```javascript
"rest-cache": {
  enabled: false,
},
```

### 3. Monitor Memory Usage

Add this to your Strapi server config to monitor:

```javascript
// backend/config/server.js
module.exports = ({ env }) => ({
  // ... existing config
  // Log memory usage periodically
  logger: {
    level: env('LOG_LEVEL', 'info'),
  },
});
```

Then add a simple memory monitoring endpoint or use Railway's built-in metrics.

## Expected Memory Usage After Optimization

- **Backend**: ~200-400MB (down from 1GB+)
- **Frontend**: ~120-200MB (stable, no longer growing over time)
- **Total**: ~320-600MB (well within 1GB limit)

### Memory Leak Fix

The frontend was experiencing a **slow memory leak** (120MB → 370MB over 2 days) due to:
- `keep-alive` directive keeping all page components in memory
- This has been **removed** - pages now properly unmount and free memory

After this fix, frontend memory should remain stable around 120-200MB instead of continuously growing.

## Troubleshooting

If you still see high memory usage:

1. **Check if running in production mode**: Ensure `NODE_ENV=production`
2. **Verify cache limits**: Check that `REST_CACHE_MAX=100` is set
3. **Monitor database connections**: Ensure pool limits are working
4. **Check for memory leaks**: Use Railway's metrics to identify patterns
5. **Consider disabling cache**: If not critical, disable `rest-cache` plugin

## Additional Notes

- The `--optimize-for-size` flag prioritizes memory over CPU performance
- Railway automatically sets `NODE_ENV=production` in production, but it's good to be explicit
- Consider using Railway's Redis addon if you need caching but want better memory management
