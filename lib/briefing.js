const Anthropic = require('@anthropic-ai/sdk');
const { generateLocalBriefing } = require('./local-briefing');

/**
 * Generate briefing using Claude API (or local fallback if no key)
 * Returns structured intelligence report, not prose
 */
async function generateBriefing(context) {
  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  // ZERO-TRUST FIRST RUN: If no API key, use local heuristics
  if (!apiKey) {
    return generateLocalBriefing(context);
  }

  const client = new Anthropic({ apiKey });

  // Build prompt for structured data extraction
  const prompt = buildPrompt(context);

  // Call Claude
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  // Parse JSON response
  const data = JSON.parse(message.content[0].text);
  
  // Format as intelligence report
  return formatBriefing(data, context);
}

/**
 * Build prompt that returns JSON, not prose
 */
function buildPrompt(context) {
  return `You are analyzing a codebase to help a developer who just inherited it.

PROJECT TYPE: ${context.projectType}
LANGUAGE: ${context.language}
TOTAL FILES: ${context.totalFiles}

PROJECT STRUCTURE:
${context.structure}

${context.entryPoint ? `ENTRY POINT: ${context.entryPoint}
\`\`\`
${context.entryContent}
\`\`\`
` : ''}

${context.dependencies ? `DEPENDENCIES:
\`\`\`
${context.dependencies}
\`\`\`
` : ''}

${context.keyFiles.length > 0 ? `KEY FILES:
${context.keyFiles.map(f => `${f.path}:\n${f.preview}`).join('\n\n')}
` : ''}

Return ONLY valid JSON with this exact structure (no markdown, no explanation):

{
  "purpose": "One sentence describing what this project does",
  "how_to_run": "Command to run the project",
  "core_files": [
    {"file": "path/to/file.js", "why": "Brief explanation of importance"}
  ],
  "safe_files": ["dir/", "file.ext"],
  "dangerous_files": [
    {"file": "path/to/file.js", "why": "Why editing this is risky"}
  ],
  "data_flow": "Brief description of how data flows through the system",
  "start_editing": ["Step 1", "Step 2", "Step 3"]
}

Focus on actual file paths from the project structure above.`;
}

/**
 * Format JSON data as readable intelligence report
 */
function formatBriefing(data, context) {
  const width = 60;
  const line = '━'.repeat(width);
  
  let report = '\n' + line + '\n';
  report += 'CODEAWAKE BRIEFING\n\n';
  report += `PROJECT TYPE:     ${context.projectType}\n`;
  report += `MAIN PURPOSE:     ${data.purpose}\n\n`;
  report += `HOW TO RUN:       ${data.how_to_run}\n`;
  
  report += '\n' + line + '\n';
  report += 'CORE FILES (start here):\n\n';
  for (const item of data.core_files) {
    report += `  ${item.file.padEnd(20)} ${item.why}\n`;
  }
  
  if (data.safe_files && data.safe_files.length > 0) {
    report += '\n' + line + '\n';
    report += 'SAFE TO EDIT:\n\n';
    for (const file of data.safe_files) {
      report += `  ${file}\n`;
    }
  }
  
  report += '\n' + line + '\n';
  report += '⚠️  DANGEROUS (break these = break everything):\n\n';
  for (const item of data.dangerous_files) {
    report += `  ${item.file.padEnd(20)} ${item.why}\n`;
  }
  
  report += '\n' + line + '\n';
  report += 'DATA FLOW:\n\n';
  report += `  ${data.data_flow}\n`;
  
  report += '\n' + line + '\n';
  report += 'WHERE TO START EDITING:\n\n';
  for (let i = 0; i < data.start_editing.length; i++) {
    report += `  ${i + 1}. ${data.start_editing[i]}\n`;
  }
  
  report += '\n' + line + '\n';
  
  return report;
}

module.exports = { generateBriefing };
