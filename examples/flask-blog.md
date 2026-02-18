
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Flask web service
MAIN PURPOSE:     Web service
ENTRY POINT:      app/__init__.py

HOW TO RUN:       pip install -r requirements.txt && flask run

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (likely important):

  app/__init__.py           Main entry point
  app/models.py             Important source file
  tests/test_api.py         External service integration
  config.py                 Configuration file

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT (low risk):

  static/
  tests/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RISKY FILES (edit carefully):

  config/                   Configuration affects entire app
  auth/                     Security-critical code
  requirements.txt          Python dependencies
  app/__init__.py           Main entry point - breaks everything if misconfigured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA FLOW (estimated):

  HTTP request → routes/views → models → database

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHERE TO START:

  1. Read app/__init__.py to understand initialization
  2. Look at folder structure to understand organization
  3. Check configuration files for environment setup
  4. Start with safe areas (components, styles) for small changes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 This is a quick structural analysis.
   For a full senior-engineer briefing, set ANTHROPIC_API_KEY:

   export ANTHROPIC_API_KEY=your-key-here
   Get your key at: https://console.anthropic.com/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
