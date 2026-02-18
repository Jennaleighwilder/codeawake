# CURSOR INSTRUCTIONS FOR CODEAWAKE PROJECT

## OVERVIEW
You're setting up and testing `codeawake` - a CLI tool that generates orientation briefings for unfamiliar codebases.

**Project path:** Use the current workspace root (where this file lives).

## STEP 1: VERIFY PROJECT STRUCTURE

The project is already organized. Verify structure:

```
[workspace root]/
├── package.json
├── cli.js
├── README.md
├── SETUP.md
├── MUTATION.md
├── .gitignore
├── .env.example
├── CURSOR-INSTRUCTIONS.md
└── lib/
    ├── scanner.js
    ├── detector.js
    ├── context.js
    ├── briefing.js
    └── local-briefing.js
```

**Make sure:**
- `cli.js` is executable: `chmod +x cli.js`

## STEP 2: INSTALL DEPENDENCIES

```bash
cd .
npm install
```

This installs:
- anthropic (Claude API)
- glob (file scanning)
- commander (CLI framework)

## STEP 3: LINK FOR GLOBAL USE

```bash
npm link
```

Now `codeawake` works as a command from any directory.

## STEP 4: TEST LOCAL MODE (NO API KEY)

**IMPORTANT:** Make sure NO API key is set (testing local mode):

```bash
unset ANTHROPIC_API_KEY
```

Test on the codeawake project itself:

```bash
codeawake
```

**Expected output:**
```
🔍 Scanning codeawake...
🧠 Generating briefing...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING (Local Analysis)

PROJECT TYPE:     Node.js project
MAIN PURPOSE:     [something about CLI tool]
...
💡 This is a quick structural analysis.
   For a full senior-engineer briefing, set ANTHROPIC_API_KEY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If you see this, **LOCAL MODE WORKS** ✅

## STEP 5: CREATE REAL-WORLD EXAMPLES

**Now the important part - proving it works on real repos.**

Create examples directory in the project root:

```bash
mkdir -p examples
```

**For each of these 5 repos, do this:**

Run from project root. Use `codeawake /path/to/repo -o examples/filename.md` to analyze and save.

### Repo 1: Next.js Blog
```bash
cd /tmp
git clone --depth 1 https://github.com/vercel/next.js

unset ANTHROPIC_API_KEY

# From project root, analyze the cloned repo and save
codeawake /tmp/next.js/examples/blog-starter -o examples/nextjs-blog.md
```

Then edit `examples/nextjs-blog.md` to add this at the TOP:

```markdown
# Example: Next.js Blog Starter

**Repo:** https://github.com/vercel/next.js/tree/canary/examples/blog-starter
**Command:** `codeawake`
**Mode:** Local analysis (no API key)

---

[the codeawake output is already here]

---

**What this demonstrates:**
- Correctly identified Next.js framework
- Found pages/ directory structure
- Detected blog-specific setup
- Flagged important configuration files
```

### Repo 2: Express Hello World
```bash
cd /tmp
git clone --depth 1 https://github.com/expressjs/express

unset ANTHROPIC_API_KEY
codeawake /tmp/express/examples/hello-world -o examples/express-hello.md
```

Add header:
```markdown
# Example: Express Hello World

**Repo:** https://github.com/expressjs/express/tree/master/examples/hello-world
**Command:** `codeawake`
**Mode:** Local analysis (no API key)

---

[output]

---

**What this demonstrates:**
- Identified Express framework
- Found index.js entry point
- Detected simple API structure
```

### Repo 3: Flask Tutorial
```bash
cd /tmp
git clone --depth 1 https://github.com/pallets/flask

unset ANTHROPIC_API_KEY
codeawake /tmp/flask/examples/tutorial -o examples/flask-tutorial.md
```

Add header:
```markdown
# Example: Flask Tutorial App

**Repo:** https://github.com/pallets/flask/tree/main/examples/tutorial
**Command:** `codeawake`
**Mode:** Local analysis (no API key)

---

[output]

---

**What this demonstrates:**
- Detected Flask framework
- Identified Python project structure
- Found setup.py and requirements
- Mapped typical Flask patterns
```

### Repo 4: Create React App
```bash
cd /tmp
npx create-react-app test-app --yes

unset ANTHROPIC_API_KEY
codeawake /tmp/test-app -o examples/react-app.md
```

Add header:
```markdown
# Example: Create React App

**Repo:** Fresh Create React App
**Command:** `codeawake`
**Mode:** Local analysis (no API key)

---

[output]

---

**What this demonstrates:**
- Identified React framework
- Found src/ structure
- Detected development setup
- Flagged package.json
```

### Repo 5: Real Messy Repo

Find an abandoned or messy repo on GitHub. Something with:
- Mixed languages
- No clear structure
- Old dependencies
- Confusing organization

Example repos to try:
- Old student projects
- Abandoned startups
- Hackathon projects

```bash
cd /tmp
git clone [some messy repo] messy-repo

unset ANTHROPIC_API_KEY
codeawake /tmp/messy-repo -o examples/messy-repo.md
```

Add header showing what codeawake figured out despite the mess.

## STEP 6: UPDATE MAIN README

Add this section to `README.md` RIGHT BEFORE the "## Installation" section:

```markdown
## Proof It Works

See it analyze real codebases:

- **[Next.js blog starter](examples/nextjs-blog.md)** - Framework detection, routing patterns
- **[Express hello-world](examples/express-hello.md)** - Simple API structure
- **[Flask tutorial](examples/flask-tutorial.md)** - Python web app organization
- **[Create React App](examples/react-app.md)** - Frontend build setup
- **[Messy inherited repo](examples/messy-repo.md)** - Real-world chaos handled

All examples use local mode (no API key required).
```

## STEP 7: CLEANUP

Delete temporary repos:

```bash
rm -rf /tmp/next.js /tmp/express /tmp/flask /tmp/test-app /tmp/[messy-repo]
```

## STEP 8: VERIFY EVERYTHING

Check your file structure:

```bash
tree -L 2
```

Should show:
```
codeawake/
├── package.json
├── cli.js
├── README.md
├── SETUP.md
├── MUTATION.md
├── .gitignore
├── .env.example
├── node_modules/
├── lib/
│   ├── scanner.js
│   ├── detector.js
│   ├── context.js
│   ├── briefing.js
│   └── local-briefing.js
└── examples/
    ├── nextjs-blog.md
    ├── express-hello.md
    ├── flask-tutorial.md
    ├── react-app.md
    └── messy-repo.md
```

## STEP 9: DONE

Verify:
- ✅ All files in place
- ✅ npm install worked
- ✅ npm link worked  
- ✅ Local mode tested (no API key)
- ✅ 5 examples generated
- ✅ README updated

Then ship:
```bash
git init
git add .
git commit -m "Initial commit: codeawake with real-world examples"
gh repo create codeawake --public --source=. --push
```

---

## TROUBLESHOOTING

**If npm install fails:**
- Check Node version: `node --version` (need 18+)
- Try: `npm cache clean --force && npm install`

**If codeawake command not found:**
- Run: `npm link` again
- Check: `which codeawake`

**If examples are empty:**
- Make sure you're IN the cloned repo directory when running codeawake
- Check: `ls` to see if there are files in the directory

**If output looks wrong:**
- Verify no API key is set: `echo $ANTHROPIC_API_KEY` (should be empty)
- Try running manually: `node cli.js`

---

## THAT'S IT

When done, you have a complete, tested, proven codeawake project ready to ship.
