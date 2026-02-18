# Example: Backbone.js (Legacy/Messy Repo)

**Repo:** https://github.com/jashkenas/backbone  
**Command:** `codeawake`  
**Mode:** Local analysis (no API key)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Node.js project
MAIN PURPOSE:     Node.js application
ENTRY POINT:      Not detected

HOW TO RUN:       npm install && npm start

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (likely important):

  backbone.js               Important source file
  test/collection.js        Important source file
  test/model.js             Important source file
  test/router.js            Request routing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT (low risk):

  public/
  images/
  fonts/
  docs/
  examples/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RISKY FILES (edit carefully):

  package.json              Dependencies

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA FLOW (estimated):

  HTTP request → routes/ → controllers/ → services/ → database

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHERE TO START:

  1. Find the entry point (check package.json or main file)
  2. Look at folder structure to understand organization
  3. Check configuration files for environment setup
  4. Start with safe areas (components, styles) for small changes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 This is a quick structural analysis.
   For a full senior-engineer briefing, set ANTHROPIC_API_KEY:

   export ANTHROPIC_API_KEY=your-key-here
   Get your key at: https://console.anthropic.com/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

**What this demonstrates:**
- Oriented in a classic 2010s-era JavaScript library
- Identified backbone.js as core, test/ files for structure
- Found public/, examples/, docs/ as safe areas
- Handles older project structure without modern framework signals