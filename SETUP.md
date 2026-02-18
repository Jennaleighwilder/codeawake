# CODEAWAKE - LOCAL SETUP & TEST

## STEP 1: Setup the project

```bash
cd ~/Desktop/codeawake
npm install
chmod +x cli.js
```

## STEP 2: Set your API key

```bash
export ANTHROPIC_API_KEY=your-api-key-here
```

Or add to your `~/.zshrc`:
```bash
echo 'export ANTHROPIC_API_KEY=your-key-here' >> ~/.zshrc
source ~/.zshrc
```

## STEP 3: Make it a global command

```bash
npm link
```

This installs `codeawake` globally on your Mac.

## STEP 4: Test it

Test on codeawake itself:
```bash
codeawake
```

Test on another project:
```bash
cd ~/some-other-project
codeawake
```

## STEP 5: Push to GitHub

```bash
cd ~/Desktop/codeawake
git init
git add .
git commit -m "Initial commit: intelligence briefing tool for inherited codebases"

# Create repo on GitHub
gh repo create codeawake --public --source=. --push
```

If you don't have `gh` CLI:
```bash
# Manual method:
# 1. Go to github.com/new
# 2. Create repo named "codeawake"
# 3. Don't initialize with README
# 4. Then run:

git remote add origin https://github.com/jennaleighwilder/codeawake.git
git branch -M main
git push -u origin main
```

## STEP 6: Publish to npm (optional)

```bash
npm login
npm publish
```

Now anyone can run: `npx codeawake`

---

## THE BRIEFING FORMAT

Codeawake now produces **structured intelligence reports**, not AI prose:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING

PROJECT TYPE:     [detected framework]
MAIN PURPOSE:     [one sentence]
HOW TO RUN:       [command]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES:       [files to read first]
SAFE TO EDIT:     [low-risk areas]
⚠️  DANGEROUS:     [files that break everything]
DATA FLOW:        [how information moves]
WHERE TO START:   [step-by-step orientation]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

This mimics how a **senior developer briefs a junior** - structured, skimmable, actionable.

---

## WHAT MAKES THIS DIFFERENT

**Not a README generator** - doesn't create documentation  
**Not an AI assistant** - doesn't chat with you  
**Not a code analyzer** - doesn't find bugs  

**It's an orientation officer** - tells you what you're looking at before you touch anything.

The first time a developer inherits a messy codebase and runs `codeawake`, they understand it instantly.

That's when adoption happens.

---

## NEXT STEPS

1. Test locally with `npm link`
2. Run on 3-5 different repos (Node, Python, etc.)
3. Push to GitHub
4. Post in r/programming or Show HN
5. Watch the forks

One stranger runs your code = you become visible.
