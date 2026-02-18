const path = require('path');

/**
 * Detect project language and framework
 */
function detectLanguage(files) {
  const filenames = files.map(f => f.filename);
  const extensions = files.map(f => f.ext);

  // Node.js detection
  if (filenames.includes('package.json')) {
    const jsCount = extensions.filter(e => ['.js', '.jsx', '.ts', '.tsx'].includes(e)).length;
    
    // Check for specific frameworks
    if (filenames.includes('next.config.js') || filenames.includes('next.config.mjs')) {
      return { type: 'Next.js application', language: 'JavaScript/TypeScript', entryPoints: ['pages/index.js', 'app/page.js', 'src/pages/index.js'] };
    }
    if (filenames.some(f => f.includes('vite.config'))) {
      return { type: 'Vite application', language: 'JavaScript/TypeScript', entryPoints: ['src/main.js', 'src/main.tsx', 'index.html'] };
    }
    if (filenames.includes('gatsby-config.js')) {
      return { type: 'Gatsby site', language: 'JavaScript/TypeScript', entryPoints: ['gatsby-config.js', 'src/pages/index.js'] };
    }
    
    return { type: 'Node.js project', language: 'JavaScript/TypeScript', entryPoints: ['index.js', 'server.js', 'app.js', 'src/index.js'] };
  }

  // Python detection
  if (filenames.includes('requirements.txt') || filenames.includes('setup.py') || filenames.includes('pyproject.toml')) {
    const pyCount = extensions.filter(e => e === '.py').length;
    
    // Check for specific frameworks
    if (files.some(f => f.path.includes('manage.py'))) {
      return { type: 'Django application', language: 'Python', entryPoints: ['manage.py', 'wsgi.py'] };
    }
    if (files.some(f => f.filename === 'app.py' || f.filename === 'application.py')) {
      return { type: 'Flask application', language: 'Python', entryPoints: ['app.py', 'application.py', 'wsgi.py'] };
    }
    if (filenames.includes('main.py')) {
      return { type: 'FastAPI application', language: 'Python', entryPoints: ['main.py'] };
    }
    
    return { type: 'Python project', language: 'Python', entryPoints: ['main.py', 'app.py', '__main__.py'] };
  }

  // Ruby
  if (filenames.includes('Gemfile')) {
    return { type: 'Ruby project', language: 'Ruby', entryPoints: ['config.ru', 'app.rb'] };
  }

  // Go
  if (filenames.includes('go.mod')) {
    return { type: 'Go project', language: 'Go', entryPoints: ['main.go', 'cmd/main.go'] };
  }

  // Rust
  if (filenames.includes('Cargo.toml')) {
    return { type: 'Rust project', language: 'Rust', entryPoints: ['src/main.rs', 'src/lib.rs'] };
  }

  // Generic/Unknown
  const mostCommonExt = getMostCommonExtension(extensions);
  return { 
    type: 'Unknown project', 
    language: mostCommonExt ? `Files with ${mostCommonExt} extension` : 'Mixed',
    entryPoints: []
  };
}

function getMostCommonExtension(extensions) {
  const counts = {};
  let max = 0;
  let mostCommon = null;

  for (const ext of extensions) {
    if (!ext || ext === '') continue;
    counts[ext] = (counts[ext] || 0) + 1;
    if (counts[ext] > max) {
      max = counts[ext];
      mostCommon = ext;
    }
  }

  return mostCommon;
}

module.exports = { detectLanguage };
