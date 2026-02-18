#!/usr/bin/env node

/**
 * Reads demo outputs and generates DEMO.md report.
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');
const DEMO_MD = path.join(__dirname, '..', 'DEMO.md');

const REPOS = [
  { output: 'vercel-commerce.txt', name: 'Vercel Commerce', link: 'https://github.com/vercel/commerce' },
  { output: 'flask.txt', name: 'Flask', link: 'https://github.com/pallets/flask' },
  { output: 'rustlings.txt', name: 'Rustlings', link: 'https://github.com/rust-lang/rustlings' }
];

function parseOutput(content) {
  const lines = content.split('\n');
  let projectType = '';
  let entryPoint = '';
  let safeFiles = [];
  let dangerousFiles = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('PROJECT TYPE:')) {
      projectType = line.replace('PROJECT TYPE:', '').trim();
    } else if (line.startsWith('ENTRY POINT:')) {
      entryPoint = line.replace('ENTRY POINT:', '').trim();
    } else if (line.includes('SAFE TO EDIT') || line.includes('SAFE TO EDIT (low risk)')) {
      let j = i + 2;
      while (j < lines.length && lines[j].trim() && !lines[j].startsWith('━')) {
        safeFiles.push(lines[j].trim().split(/\s{2,}/)[0].trim());
        j++;
      }
    } else if (line.includes('RISKY FILES') || line.includes('DANGEROUS')) {
      let j = i + 2;
      while (j < lines.length && lines[j].trim() && !lines[j].startsWith('━')) {
        const trimmed = lines[j].trim();
        dangerousFiles.push(trimmed.split(/\s{2,}/)[0].trim());
        j++;
      }
    }
  }

  return { projectType, entryPoint, safeFiles, dangerousFiles };
}

function main() {
  let md = '';

  for (const repo of REPOS) {
    const outputPath = path.join(OUTPUT_DIR, repo.output);
    if (!fs.existsSync(outputPath)) {
      md += `## Repository: ${repo.name}\n\n`;
      md += `GitHub: ${repo.link}\n\n`;
      md += `*Output file not found. Run \`npm run demo\` first.*\n\n`;
      continue;
    }

    const content = fs.readFileSync(outputPath, 'utf-8');
    const lines = content.split('\n');
    const excerpt = lines.slice(0, 40).join('\n');
    const parsed = parseOutput(content);

    md += `## Repository: ${repo.name}\n\n`;
    md += `GitHub: ${repo.link}\n\n`;
    md += `### Problem\n\n`;
    md += `A developer opening this repo has no orientation.\n\n`;
    md += `### Codeawake Briefing (excerpt)\n\n`;
    md += '```\n' + excerpt + '\n```\n\n';
    md += `### What This Means\n\n`;
    md += `- Project type detected: ${parsed.projectType || 'N/A'}\n`;
    md += `- Entry point found: ${parsed.entryPoint || 'N/A'}\n`;
    md += `- Safe files: ${parsed.safeFiles.slice(0, 5).join(', ') || 'N/A'}\n`;
    md += `- Dangerous files: ${parsed.dangerousFiles.slice(0, 5).join(', ') || 'N/A'}\n\n`;
  }

  fs.writeFileSync(DEMO_MD, md);
  console.log(`Generated ${DEMO_MD}`);
}

main();
