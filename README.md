# codeawake

**Wake up inside any codebase.**

AI-powered comprehension for inherited code. Get oriented in seconds, not hours.

## The Problem

You open a repo. Maybe you pasted code from AI. Maybe you inherited it from a teammate who left. Maybe you cloned it at 11 PM and just need to know where to start.

You don't need documentation. You need **orientation**.

## What codeawake Does

```bash
npx codeawake
```

**Works immediately - no setup required.**

First run uses local structural analysis to give you an instant briefing.  
Add an API key for full AI-powered analysis.

It scans your project and gives you an **intelligence briefing** in structured format:

**PROJECT TYPE** → What you're looking at  
**CORE FILES** → Where to start reading  
**SAFE TO EDIT** → Low-risk areas  
**DANGEROUS** → Files that break everything if touched  
**DATA FLOW** → How information moves through the system  
**WHERE TO START** → Step-by-step orientation  

Not a README generator. Not AI prose.  
**A field instrument for situational awareness.**

## Real World Tested

Codeawake has been tested across multiple ecosystems: Next.js, React, Vue, Express, Flask, Django, Rust, and messy legacy repos.

## Proof It Works

Real examples on actual codebases:

- **[Next.js Commerce](examples/nextjs-commerce.md)** - vercel/commerce
- **[Express API](examples/express-api.md)** - node-express-realworld
- **[Flask Blog](examples/flask-blog.md)** - miguelgrinberg/flasky
- **[Create React App](examples/react-app.md)** - facebook/create-react-app
- **[Django](examples/django.md)** - django/djangoproject.com
- **[Vue](examples/vue-app.md)** - vuejs/create-vue
- **[Data Science](examples/datascience.md)** - data-science-ipython-notebooks
- **[Gatsby Blog](examples/gatsby-blog.md)** - gatsby-starter-blog
- **[Rustlings](examples/rustlings.md)** - rust-lang/rustlings
- **[Messy Repo](examples/messy-repo.md)** - jashkenas/backbone

All examples use local mode (no API key required).

## Installation

### Zero-setup mode (works immediately)

```bash
npx codeawake
```

**No API key needed.** Uses local structural analysis to generate a briefing.

### Full AI mode (enhanced analysis)

1. Get an API key: https://console.anthropic.com/
2. Set environment variable:

```bash
export ANTHROPIC_API_KEY=your-key-here
```

3. Run again:

```bash
npx codeawake
```

Now you get AI-powered analysis that understands code semantics, not just structure.

### Install globally (optional)

```bash
npm install -g codeawake
```

### Install locally for development

```bash
git clone https://github.com/jennaleighwilder/codeawake
cd codeawake
npm install
npm link
```

Now `codeawake` works as a global command from any directory.

## Two Modes

**Local Mode (default, no API key):**
- Instant structural analysis
- Framework detection
- Entry point identification
- Risk assessment based on patterns
- Good enough to get oriented

**AI Mode (with API key):**
- Reads actual code
- Understands data flow semantics
- Identifies specific risks
- More accurate purpose detection
- Senior-engineer level briefing

## Usage

### Basic usage (current directory)

```bash
codeawake
```

### Analyze a specific directory

```bash
codeawake /path/to/project
```

### Save briefing to file

```bash
codeawake --output BRIEFING.md
```

### Verbose mode (see what's happening)

```bash
codeawake --verbose
```

## Setup

You'll need an Anthropic API key:

1. Get your key: https://console.anthropic.com/
2. Set environment variable:

```bash
export ANTHROPIC_API_KEY=your-key-here
```

Or add to your `~/.zshrc` or `~/.bashrc`:

```bash
echo 'export ANTHROPIC_API_KEY=your-key-here' >> ~/.zshrc
```

## Supported Languages

- JavaScript/TypeScript (Node, Next.js, Vite, Gatsby)
- Python (Django, Flask, FastAPI)
- Go
- Rust
- Ruby

More coming soon.

## Examples

### Analyze a Next.js project

```bash
codeawake ~/projects/my-nextjs-app
```

Output:
```
🔍 Scanning my-nextjs-app...
🧠 Generating briefing...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODEAWAKE BRIEFING

PROJECT TYPE:     Next.js application
MAIN PURPOSE:     Marketing site with dynamic blog content

HOW TO RUN:       npm install && npm run dev
                  Visit: http://localhost:3000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE FILES (start here):

  pages/index.js       Homepage, shows routing pattern
  lib/api.js           Fetches blog posts from CMS
  next.config.js       Environment and build configuration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE TO EDIT:

  components/
  styles/
  public/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  DANGEROUS (break these = break everything):

  lib/api.js           All external data flows through here
  next.config.js       Build breaks if misconfigured
  pages/_app.js        Global wrapper, affects all routes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA FLOW:

  User visits → pages/ → components/ → lib/api.js → External CMS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHERE TO START EDITING:

  1. Look at pages/index.js to understand routing
  2. Check lib/api.js to see how data is fetched
  3. Modify components/ for UI changes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Analyze a Python Flask app

```bash
codeawake ~/code/flask-api --output README.md
```

Saves briefing to README.md.

## How It Works

1. **Scans** project structure
2. **Detects** language and framework
3. **Identifies** entry points and key files
4. **Reads** first 10-50 lines of important files
5. **Sends** structured context to Claude API
6. **Returns** a human briefing in plain English

## Why This Exists

After the AI boom, developers inherit code they didn't write constantly. The code *almost* works, but understanding it takes hours.

IDEs show syntax. Linters show style. Documentation is manual labor.

Nothing answers: **"Explain this codebase like I just woke up inside it."**

That's codeawake.

## Privacy

- Runs locally (only sends project structure + code samples to Claude API)
- No tracking, no analytics, no bullshit
- Your code stays yours

## Contributing

Found a bug? Want to add language support?

1. Fork this repo
2. Make your changes
3. Submit a PR

Language detection lives in `lib/detector.js` - easy to extend.

## Author

Built by [Jennifer Leigh West](https://github.com/jennaleighwilder)

Creator of Mirror Protocol™ and AI consciousness modification frameworks.

## License

MIT - do whatever you want with it.

---

**Get oriented. Ship faster.**
