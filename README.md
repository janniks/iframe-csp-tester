# iframe-tester

`npx serve main` (Main Site/Extension) http://localhost:3000

`npx nodemon server.js` (API/Server) http://localhost:3001

## Goals

- stop cross frame communication
- stop arbitrary network requests (only recursive requests to the same domain)
- stop top level navigation (changing main url)
- stop clickjacking?
- allow scripts (for animation)
- allow stylesheets
- allow nesting

## Measures

- API CSP:
  - `"default-src 'unsafe-inline' data: blob: http://api.hiro.so;"`, which only inline content or recursive API calls
    - Note: Is `data:` unsafe for our use-case?
    - Ideally the hostname would be specific enough to not cover other products.
- iframe props:
  ```
  sandbox="allow-scripts"
  referrerpolicy="no-referrer"
  credentialless
  ```
  - `sandbox` disables most dangerous features, but we explicitly allow scripts
  - `referrerpolicy` prevents the iframe from sending the referrer header (unclear if needed in combination with CSP)
  - `credentialless` runs the iframe in an ephemeral frame (experimental feature with little support)
