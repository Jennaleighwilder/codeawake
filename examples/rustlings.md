
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

  main.rs or lib.rs → modules → dependencies

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHERE TO START:

  1. Read src/main.rs to understand initialization
  2. Look at folder structure to understand organization
  3. Check configuration files for environment setup
  4. Start with safe areas (components, styles) for small changes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 This is a quick structural analysis.
   For a full senior-engineer briefing, set ANTHROPIC_API_KEY:

   export ANTHROPIC_API_KEY=your-key-here
   Get your key at: https://console.anthropic.com/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
