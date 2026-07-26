/**
 * @deprecated Kept for backward compatibility with existing route imports.
 * The real implementation now lives in sessionMiddleware.ts and uses
 * header-based server-side sessions (no cookies, no JWT) instead of JWT
 * verification. Import from "./sessionMiddleware.js" directly in new code.
 */
export { requireAuth } from "./sessionMiddleware.js";
