const fs = require('fs');
const path = require('path');

/**
 * Generate local briefing using heuristics only (no API call)
 * This is the "zero-trust first run" that proves value before asking for setup
 */
function generateLocalBriefing(context) {
  const briefing = {
    projectType: context.projectType,
    language: context.language,
    purpose: guessPurpose(context),
    entryPoint: context.entryPoint || 'Not detected',
    howToRun: guessRunCommand(context),
    coreFiles: identifyCoreFiles(context),
    safeFiles: identifySafeAreas(context),
    dangerousFiles: identifyDangerousFiles(context),
    dataFlow: guessDataFlow(context),
    startEditing: generateStartSteps(context)
  };

  return formatLocalBriefing(briefing);
}

/**
 * Guess project purpose from dependencies and structure
 */
function guessPurpose(context) {
  const deps = context.dependencies?.toLowerCase() || '';
  const type = context.projectType.toLowerCase();

  // Check dependencies for clues
  if (deps.includes('express')) return 'REST API server (Express detected)';
  if (deps.includes('next')) return 'Web application (Next.js detected)';
  if (deps.includes('react')) return 'Frontend application (React detected)';
  if (deps.includes('vue')) return 'Frontend application (Vue detected)';
  if (deps.includes('flask')) return 'Web service (Flask detected)';
  if (deps.includes('django')) return 'Web application (Django detected)';
  if (deps.includes('fastapi')) return 'API service (FastAPI detected)';
  
  // Check project type
  if (type.includes('next.js')) return 'Web application';
  if (type.includes('flask')) return 'Web service';
  if (type.includes('django')) return 'Web application';
  if (type.includes('research') || type.includes('analysis')) return 'Jupyter notebooks and Python scripts';
  if (type.includes('rust')) return 'Rust application';
  if (type.includes('node')) return 'Node.js application';
  if (type.includes('python')) return 'Python application';

  return 'Application (specific purpose unclear from structure)';
}

/**
 * Guess how to run the project
 */
function guessRunCommand(context) {
  const type = context.projectType.toLowerCase();
  
  if (type.includes('next.js')) return 'npm install && npm run dev';
  if (type.includes('vite')) return 'npm install && npm run dev';
  if (type.includes('gatsby')) return 'npm install && npm run develop';
  if (type.includes('node')) return 'npm install && npm start';
  if (type.includes('flask')) return 'pip install -r requirements.txt && flask run';
  if (type.includes('django')) return 'pip install -r requirements.txt && python manage.py runserver';
  if (type.includes('fastapi')) return 'pip install -r requirements.txt && uvicorn main:app';
  if (type.includes('research') || type.includes('analysis')) return 'Open notebooks with Jupyter (jupyter notebook)';
  if (type.includes('rust')) return 'cargo build && cargo run';
  if (type.includes('python')) return 'pip install -r requirements.txt && python main.py';
  
  return 'Check README or package.json for run command';
}

/**
 * Identify core files from structure and entry points
 */
function identifyCoreFiles(context) {
  const files = [];
  
  // Entry point is always core
  if (context.entryPoint) {
    files.push({
      file: context.entryPoint,
      why: 'Main entry point'
    });
  }

  // Add key files based on patterns
  for (const keyFile of context.keyFiles || []) {
    const filename = keyFile.path.toLowerCase();
    
    if (filename.includes('config') || filename.includes('settings')) {
      files.push({ file: keyFile.path, why: 'Configuration file' });
    } else if (filename.includes('route') || filename.includes('controller')) {
      files.push({ file: keyFile.path, why: 'Request routing' });
    } else if (filename.includes('api') || filename.includes('service')) {
      files.push({ file: keyFile.path, why: 'External service integration' });
    } else if (files.length < 3) {
      files.push({ file: keyFile.path, why: 'Important source file' });
    }
  }

  return files.slice(0, 5);
}

/**
 * Identify safe areas (low risk of breaking things)
 */
function identifySafeAreas(context) {
  const safe = [];
  const structure = context.structure?.toLowerCase() || '';
  
  // Common safe directories
  const safeDirs = [
    'components/', 'styles/', 'css/', 'public/', 'static/', 
    'assets/', 'images/', 'fonts/', 'docs/', 'tests/', 
    '__tests__/', 'spec/', 'examples/'
  ];

  for (const dir of safeDirs) {
    if (structure.includes(dir)) {
      safe.push(dir);
    }
  }

  return safe.slice(0, 5);
}

/**
 * Identify dangerous files (high risk)
 */
function identifyDangerousFiles(context) {
  const dangerous = [];
  const structure = context.structure?.toLowerCase() || '';
  
  // Common dangerous patterns
  const dangerousPatterns = [
    { pattern: 'config', reason: 'Configuration affects entire app' },
    { pattern: 'database', reason: 'Data layer changes break features' },
    { pattern: 'auth', reason: 'Security-critical code' },
    { pattern: 'middleware', reason: 'Affects all requests' },
    { pattern: 'settings', reason: 'Global application settings' },
    { pattern: '.env', reason: 'Environment variables' },
    { pattern: 'package.json', reason: 'Dependencies' },
    { pattern: 'requirements.txt', reason: 'Python dependencies' }
  ];

  for (const item of dangerousPatterns) {
    if (structure.includes(item.pattern) && dangerous.length < 4) {
      dangerous.push({
        file: item.pattern + (item.pattern.includes('.') ? '' : '/'),
        why: item.reason
      });
    }
  }

  // Add entry point as dangerous if not already listed
  if (context.entryPoint && !dangerous.some(d => d.file.includes(context.entryPoint))) {
    dangerous.push({
      file: context.entryPoint,
      why: 'Main entry point - breaks everything if misconfigured'
    });
  }

  return dangerous;
}

/**
 * Guess data flow
 */
function guessDataFlow(context) {
  const type = context.projectType.toLowerCase();
  
  if (type.includes('next.js')) {
    return 'Browser → pages/ → components/ → API routes → external services';
  }
  if (type.includes('express') || type.includes('node')) {
    return 'HTTP request → routes/ → controllers/ → services/ → database';
  }
  if (type.includes('flask') || type.includes('django')) {
    return 'HTTP request → routes/views → models → database';
  }
  if (type.includes('react') || type.includes('vue')) {
    return 'User interaction → components → state → API calls';
  }
  if (type.includes('research') || type.includes('analysis')) {
    return 'Notebooks and scripts; run cells or execute scripts';
  }
  if (type.includes('rust')) {
    return 'main.rs or lib.rs → modules → dependencies';
  }
  
  return 'Check entry point and follow imports to understand flow';
}

/**
 * Generate starting steps
 */
function generateStartSteps(context) {
  const steps = [];
  
  if (context.entryPoint) {
    steps.push(`Read ${context.entryPoint} to understand initialization`);
  } else {
    steps.push('Find the entry point (check package.json or main file)');
  }
  
  steps.push('Look at folder structure to understand organization');
  steps.push('Check configuration files for environment setup');
  
  const type = context.projectType.toLowerCase();
  if (type.includes('api') || type.includes('server')) {
    steps.push('Review routes/endpoints to understand API surface');
  } else {
    steps.push('Start with safe areas (components, styles) for small changes');
  }

  return steps;
}

/**
 * Format local briefing
 */
function formatLocalBriefing(data) {
  const width = 60;
  const line = '━'.repeat(width);
  
  let report = '\n' + line + '\n';
  report += 'CODEAWAKE BRIEFING (Local Analysis)\n\n';
  report += `PROJECT TYPE:     ${data.projectType}\n`;
  report += `MAIN PURPOSE:     ${data.purpose}\n`;
  report += `ENTRY POINT:      ${data.entryPoint}\n\n`;
  report += `HOW TO RUN:       ${data.howToRun}\n`;
  
  if (data.coreFiles.length > 0) {
    report += '\n' + line + '\n';
    report += 'CORE FILES (likely important):\n\n';
    for (const item of data.coreFiles) {
      report += `  ${item.file.padEnd(25)} ${item.why}\n`;
    }
  }
  
  if (data.safeFiles.length > 0) {
    report += '\n' + line + '\n';
    report += 'SAFE TO EDIT (low risk):\n\n';
    for (const file of data.safeFiles) {
      report += `  ${file}\n`;
    }
  }
  
  if (data.dangerousFiles.length > 0) {
    report += '\n' + line + '\n';
    report += '⚠️  RISKY FILES (edit carefully):\n\n';
    for (const item of data.dangerousFiles) {
      report += `  ${item.file.padEnd(25)} ${item.why}\n`;
    }
  }
  
  report += '\n' + line + '\n';
  report += 'DATA FLOW (estimated):\n\n';
  report += `  ${data.dataFlow}\n`;
  
  report += '\n' + line + '\n';
  report += 'WHERE TO START:\n\n';
  for (let i = 0; i < data.startEditing.length; i++) {
    report += `  ${i + 1}. ${data.startEditing[i]}\n`;
  }
  
  report += '\n' + line + '\n';
  report += '💡 This is a quick structural analysis.\n';
  report += '   For a full senior-engineer briefing, set ANTHROPIC_API_KEY:\n\n';
  report += '   export ANTHROPIC_API_KEY=your-key-here\n';
  report += '   Get your key at: https://console.anthropic.com/\n';
  report += '\n' + line + '\n';
  
  return report;
}

module.exports = { generateLocalBriefing };
