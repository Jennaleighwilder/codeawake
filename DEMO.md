## Repository: Vercel Commerce

GitHub: https://github.com/vercel/commerce

### Problem

A developer opening this repo has no orientation.

### Codeawake Briefing (excerpt)

```

🔍 Scanning commerce...

🧠 Generating briefing...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Node.js project
MAIN PURPOSE:     Web application (Next.js detected)
ENTRY POINT:      app/page.tsx

HOW TO RUN:       npm install && npm start

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (likely important):

  app/page.tsx              Main entry point
  lib/utils.ts              Important source file
  components/carousel.tsx   Important source file

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT (low risk):

  components/
  fonts/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RISKY FILES (edit carefully):

  config/                   Configuration affects entire app
  package.json              Dependencies
  app/page.tsx              Main entry point - breaks everything if misconfigured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA FLOW (estimated):

  HTTP request → routes/ → controllers/ → services/ → database
```

### What This Means

- Project type detected: Node.js project
- Entry point found: app/page.tsx
- Safe files: components/, fonts/
- Dangerous files: config/, package.json, app/page.tsx

## Repository: Flask

GitHub: https://github.com/pallets/flask

### Problem

A developer opening this repo has no orientation.

### Codeawake Briefing (excerpt)

```

🔍 Scanning flask...

🧠 Generating briefing...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Flask application
MAIN PURPOSE:     Web service (Flask detected)
ENTRY POINT:      src/flask/app.py

HOW TO RUN:       pip install -r requirements.txt && flask run

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (likely important):

  src/flask/app.py          Main entry point
  tests/test_basic.py       Important source file
  tests/test_blueprints.py  Important source file

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT (low risk):

  css/
  static/
  docs/
  tests/
  examples/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RISKY FILES (edit carefully):

  config/                   Configuration affects entire app
  database/                 Data layer changes break features
  auth/                     Security-critical code
  requirements.txt          Python dependencies
  src/flask/app.py          Main entry point - breaks everything if misconfigured
```

### What This Means

- Project type detected: Flask application
- Entry point found: src/flask/app.py
- Safe files: css/, static/, docs/, tests/, examples/
- Dangerous files: config/, database/, auth/, requirements.txt, src/flask/app.py

## Repository: Rustlings

GitHub: https://github.com/rust-lang/rustlings

### Problem

A developer opening this repo has no orientation.

### Codeawake Briefing (excerpt)

```

🔍 Scanning rustlings...

🧠 Generating briefing...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Rust project
MAIN PURPOSE:     Rust application
ENTRY POINT:      src/main.rs

HOW TO RUN:       cargo build && cargo run

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (likely important):

  src/main.rs               Main entry point
  src/app_state.rs          Important source file
  src/term.rs               Important source file

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT (low risk):

  static/
  images/
  tests/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RISKY FILES (edit carefully):

  config/                   Configuration affects entire app
  package.json              Dependencies
  src/main.rs               Main entry point - breaks everything if misconfigured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA FLOW (estimated):

```

### What This Means

- Project type detected: Rust project
- Entry point found: src/main.rs
- Safe files: static/, images/, tests/
- Dangerous files: config/, package.json, src/main.rs

