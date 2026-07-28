const assert = require('assert');
const crypto = require('crypto');
const os = require('os');

console.log("=== RUNNING GAME UNIT TESTS ===");

// 1. Verify Dynamic Key Generation (Consistent, deterministic, platform-specific)
const username = os.userInfo().username || 'Operator';
const dynamicKey = crypto.createHash('sha256')
  .update(username + '_SECTOR_7_IN_THE_SHELL')
  .digest('hex')
  .substring(0, 10)
  .toUpperCase();

console.log(`[TEST] Generated key for current user '${username}': KEY-${dynamicKey}`);
assert.strictEqual(dynamicKey.length, 10, "Dynamic key must be exactly 10 characters long");
assert.ok(/^[0-9A-F]{10}$/.test(dynamicKey), "Dynamic key must contain only valid hexadecimal characters");

// 2. Verify Cookie Parsing Utility
const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  return cookies;
};

const parsed1 = parseCookies('role=admin; user=john; session_id=123456');
console.log("[TEST] Parsed cookie header output:", parsed1);
assert.strictEqual(parsed1.role, 'admin', "Parsed role should be admin");
assert.strictEqual(parsed1.user, 'john', "Parsed user should be john");
assert.strictEqual(parsed1.session_id, '123456', "Parsed session_id should be 123456");

const parsedEmpty = parseCookies(undefined);
assert.deepStrictEqual(parsedEmpty, {}, "Undefined cookie header should yield an empty object");

const parsedMalformed = parseCookies('malformedCookieStringNoEquals');
assert.deepStrictEqual(parsedMalformed, {}, "Malformed cookie without equals should yield empty");

console.log("\x1b[32m[SUCCESS] All unit tests completed successfully!\x1b[0m");
