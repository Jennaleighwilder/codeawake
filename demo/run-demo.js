#!/usr/bin/env node

/**
 * Automated demo runner for codeawake.
 * Clones real public repos, runs codeawake on each, saves output.
 * Uses local mode (no API key required).
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEMO_DIR = path.join(__dirname);
const TMP_DIR = path.join(DEMO_DIR, 'tmp');
const OUTPUT_DIR = path.join(DEMO_DIR, 'output');
const PROJECT_ROOT = path.join(__dirname, '..');

const REPOS = [
  { url: 'https://github.com/vercel/commerce', dir: 'commerce', output: 'vercel-commerce.txt' },
  { url: 'https://github.com/pallets/flask', dir: 'flask', output: 'flask.txt' },
  { url: 'https://github.com/rust-lang/rustlings', dir: 'rustlings', output: 'rustlings.txt' }
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  ensureDir(TMP_DIR);
  ensureDir(OUTPUT_DIR);

  for (const repo of REPOS) {
    const clonePath = path.join(TMP_DIR, repo.dir);
    console.log(`Cloning ${repo.url}...`);

    const cloneResult = spawnSync('git', ['clone', '--depth', '1', repo.url, clonePath], {
      encoding: 'utf-8',
      cwd: TMP_DIR,
      env: { ...process.env, GIT_TEMPLATE_DIR: '', ANTHROPIC_API_KEY: '' }
    });
    if (cloneResult.status !== 0) {
      throw new Error(`git clone failed: ${cloneResult.stderr || cloneResult.stdout}`);
    }

    console.log(`Running codeawake on ${repo.dir}...`);
    const runResult = spawnSync('node', ['cli.js', clonePath], {
      encoding: 'utf-8',
      cwd: PROJECT_ROOT,
      env: { ...process.env, ANTHROPIC_API_KEY: '' }
    });
    if (runResult.status !== 0) {
      throw new Error(`codeawake failed: ${runResult.stderr || runResult.stdout}`);
    }
    const output = runResult.stdout;

    const outputPath = path.join(OUTPUT_DIR, repo.output);
    fs.writeFileSync(outputPath, output);

    console.log(`Saved to ${outputPath}`);

    fs.rmSync(clonePath, { recursive: true, force: true });
  }

  console.log('Demo complete.');
}

main();
