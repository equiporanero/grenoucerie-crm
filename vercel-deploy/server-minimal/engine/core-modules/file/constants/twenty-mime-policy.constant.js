// Extensions where Twenty intentionally deviates from the IANA-standard mime
// mapping returned by mrmime. Twenty's storage layer persists these values
// instead of mrmime's output (or instead of throwing in the case of `.ts`).
//
// Why each entry exists:
//   - ts/tsx:    IANA registers `.ts` as `video/mp2t` (MPEG-2 Transport Stream),
//                which predates TypeScript. `.tsx` is unregistered. Twenty uses
//                the developer-tooling convention `application/typescript`.
//
// Only add an entry when (1) mrmime returns the wrong mime (collision) or no
// mime AND (2) Twenty actually writes that extension via FileStorageService AND
// (3) there is a clear developer-tooling convention for the right mime. For
// everything else — media, archives, documents, `.js`, `.mjs`, `.cjs`, etc. —
// trust mrmime. This policy is reactive: extend it the day we observe a real
// wrong-mime persisted by an exercised code path, not in anticipation.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TWENTY_MIME_POLICY", {
    enumerable: true,
    get: function() {
        return TWENTY_MIME_POLICY;
    }
});
const TWENTY_MIME_POLICY = {
    ts: 'application/typescript',
    tsx: 'application/typescript'
};

//# sourceMappingURL=twenty-mime-policy.constant.js.map