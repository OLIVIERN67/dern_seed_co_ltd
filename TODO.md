# Admin Authorization & Data Loading Fix Plan

## Root Cause Analysis

After thorough codebase review, I identified the following issues:

### Critical Bugs Found

1. **`requireAdmin.ts` - Silent request hang bug**: After `requireAuth` passes, if `req.user` is somehow null/undefined, the middleware silently returns without calling `next()` or sending a response, causing the request to hang indefinitely.
   - **FIXED**: Now sends a proper 401 response with descriptive message.

2. **`requireStaff.ts` - Same bug**: Same silent hang issue as requireAdmin.
   - **FIXED**: Now sends a proper 401 response with descriptive message.

3. **`requireAuth.ts` - Generic error message**: Returns "Unauthorized" without context, making debugging difficult.
   - **FIXED**: Now returns a more descriptive message explaining authentication is required.

4. **`authSessionMiddleware.ts` - Limited debugging**: No logging when authentication fails, making it hard to diagnose cookie/session issues.
   - **FIXED**: Added detailed logging for authenticated user, inactive user, and invalid session cases.

5. **`OrderController.ts` - Missing ZodError handling**: Unlike other controllers, the order controller doesn't catch Zod validation errors, which can cause 500 errors instead of 400.
   - **FIXED**: Added proper try/catch with ZodError formatting.

### Potential Cross-Origin Cookie Issue

If `VITE_API_BASE_URL` in the frontend is set to `http://localhost:8000`, the frontend makes direct cross-origin requests. With `sameSite: "strict"` cookies set during proxy-routed login (localhost:3000), the browser won't send the cookie to localhost:8000.

**Check needed**: Verify the client `.env` file has `VITE_API_BASE_URL` empty or undefined so the Vite proxy handles requests (same origin).

### Fix Steps

- [x] Fix `requireAdmin.ts` - Add proper null guard and response
- [x] Fix `requireStaff.ts` - Add proper null guard and response
- [x] Fix `requireAuth.ts` - Add more descriptive error messages
- [x] Fix `authSessionMiddleware.ts` - Add detailed auth logging
- [x] Fix `OrderController.ts` - Add proper error handling and ZodError formatting
- [x] Create comprehensive test script `testFullAdminFlow.cjs`
- [ ] Test all admin endpoints and verify fixes (run `node backend-node/scripts/testFullAdminFlow.cjs` with backend running)

