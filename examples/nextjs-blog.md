# Example: Next.js Blog Starter

**Repo:** https://github.com/vercel/next.js/tree/canary/examples/blog-starter  
**Command:** `codeawake`  
**Mode:** Local analysis (no API key)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Node.js project
MAIN PURPOSE:     Web application (Next.js detected)
ENTRY POINT:      Not detected

HOW TO RUN:       npm install && npm start

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (likely important):

  tailwind.config.ts        Configuration file
  postcss.config.js         Configuration file

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT (low risk):

  components/
  public/
  assets/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  RISKY FILES (edit carefully):

  config/                   Configuration affects entire app
  auth/                     Security-critical code
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
- Correctly identified Next.js framework (Web application)
- Found Tailwind and PostCSS config as key files
- Identified components/, public/, assets/ as safe to edit
- Flagged config/, auth/, package.json as risky
