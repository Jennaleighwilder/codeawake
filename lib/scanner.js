const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

/**
 * Scan project directory and return file list with metadata
 */
async function scanProject(targetDir, verbose = false) {
  const files = [];
  
  // Ignore patterns
  const ignorePatterns = [
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/coverage/**',
    '**/__pycache__/**',
    '**/venv/**',
    '**/env/**',
    '**/*.pyc',
    '**/.DS_Store'
  ];

  // Scan for all files
  const allFiles = await glob('**/*', {
    cwd: targetDir,
    ignore: ignorePatterns,
    nodir: true,
    dot: false
  });

  for (const file of allFiles) {
    const fullPath = path.join(targetDir, file);
    const stats = fs.statSync(fullPath);
    
    // Skip large files (>1MB)
    if (stats.size > 1024 * 1024) continue;

    const ext = path.extname(file);
    const filename = path.basename(file);

    files.push({
      path: file,
      fullPath,
      filename,
      ext,
      size: stats.size,
      dir: path.dirname(file)
    });
  }

  if (verbose) {
    console.log(`Found ${files.length} files`);
  }

  return files;
}

module.exports = { scanProject };
