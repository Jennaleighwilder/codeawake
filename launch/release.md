# codeawake v0.1.0

## What it does

Scans a repository and produces a structured orientation briefing: project type, entry point, core files, safe vs dangerous areas, data flow, and where to start editing. Designed for developers who inherit code they didn't write—from AI, teammates, or clones.

## How it works

1. Scans project structure (ignores node_modules, .git, etc.)
2. Detects language and framework via manifest priority (Cargo.toml, manage.py, package.json, etc.)
3. Identifies entry points and key files
4. Generates a briefing from heuristics (local mode) or from Claude API (AI mode)

## Supported ecosystems

- **Node/JS:** Next.js, Vite, Gatsby, Express, React, Vue
- **Python:** Django, Flask, FastAPI
- **Rust:** Cargo-based projects
- **Go:** go.mod projects
- **Research:** Jupyter notebooks and Python scripts

## Local mode vs AI mode

**Local mode (default):** No API key required. Uses structural analysis—file patterns, manifests, directory layout—to produce a briefing. Runs immediately.

**AI mode:** Set `ANTHROPIC_API_KEY` for semantic analysis. Reads code samples and produces more accurate purpose, data flow, and risk assessment.

## Real-world test coverage

Tested on 10 public repos: vercel/commerce, node-express-realworld, flasky, create-react-app, djangoproject.com, create-vue, data-science-ipython-notebooks, gatsby-starter-blog, rustlings, backbone.

Automated demo runs on every push: see [DEMO.md](https://github.com/Jennaleighwilder/codeawake/blob/main/DEMO.md).
