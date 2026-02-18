const fs = require('fs');
const path = require('path');

/**
 * Build context object for AI briefing
 */
function buildContext(files, language, targetDir) {
  const context = {
    projectType: language.type,
    language: language.language,
    entryPoint: null,
    entryContent: null,
    structure: buildStructure(files),
    keyFiles: [],
    dependencies: null,
    totalFiles: files.length
  };

  // Find entry point
  for (const entryName of language.entryPoints) {
    const entryFile = files.find(f => f.path === entryName || f.path.endsWith(entryName));
    if (entryFile) {
      context.entryPoint = entryFile.path;
      context.entryContent = readFilePreview(entryFile.fullPath, 50);
      break;
    }
  }

  // Find key configuration files
  const configFiles = files.filter(f => 
    ['package.json', 'requirements.txt', 'Cargo.toml', 'go.mod', 'Gemfile', 'setup.py', 'pyproject.toml'].includes(f.filename)
  );

  for (const configFile of configFiles) {
    context.dependencies = readFilePreview(configFile.fullPath, 30);
    break;
  }

  // Find important files (not in subdirs, source code)
  const rootFiles = files.filter(f => {
    const parts = f.path.split(path.sep);
    return parts.length <= 2 && ['.js', '.py', '.ts', '.tsx', '.jsx', '.go', '.rs'].includes(f.ext);
  });

  // Take top 5 by size (likely most important)
  const topFiles = rootFiles
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);

  for (const file of topFiles) {
    context.keyFiles.push({
      path: file.path,
      preview: readFilePreview(file.fullPath, 10)
    });
  }

  return context;
}

/**
 * Build directory tree structure
 */
function buildStructure(files) {
  const tree = {};
  
  for (const file of files) {
    const parts = file.path.split(path.sep);
    let current = tree;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        // File
        if (!current._files) current._files = [];
        current._files.push(part);
      } else {
        // Directory
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    }
  }

  return formatTree(tree);
}

function formatTree(tree, indent = '') {
  let output = '';
  const dirs = Object.keys(tree).filter(k => k !== '_files');
  const files = tree._files || [];

  for (const dir of dirs) {
    output += `${indent}📁 ${dir}/\n`;
    output += formatTree(tree[dir], indent + '  ');
  }

  for (const file of files.slice(0, 50)) { // Limit files shown
    output += `${indent}📄 ${file}\n`;
  }

  return output;
}

/**
 * Read first N lines of a file
 */
function readFilePreview(filePath, lines = 10) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const allLines = content.split('\n');
    return allLines.slice(0, lines).join('\n');
  } catch (error) {
    return '[Unable to read file]';
  }
}

module.exports = { buildContext };
