
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Django application
MAIN PURPOSE:     Web application
ENTRY POINT:      manage.py

HOW TO RUN:       pip install -r requirements.txt && python manage.py runserver

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (likely important):

  manage.py                 Main entry point
  svntogit/mapping.py       Important source file
  releases/tests.py         Important source file

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT (low risk):

  css/
  static/
  docs/
  tests/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RISKY FILES (edit carefully):

  config/                   Configuration affects entire app
  auth/                     Security-critical code
  middleware/               Affects all requests
  settings/                 Global application settings
  manage.py                 Main entry point - breaks everything if misconfigured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA FLOW (estimated):

  HTTP request → routes/views → models → database

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHERE TO START:

  1. Read manage.py to understand initialization
  2. Look at folder structure to understand organization
  3. Check configuration files for environment setup
  4. Start with safe areas (components, styles) for small changes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 This is a quick structural analysis.
   For a full senior-engineer briefing, set ANTHROPIC_API_KEY:

   export ANTHROPIC_API_KEY=your-key-here
   Get your key at: https://console.anthropic.com/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
