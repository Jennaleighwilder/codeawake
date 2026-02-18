const path = require('path');

/**
 * Detect project language and framework
 * Uses priority tiers: Tier 1 (runtime authority) overrides Tier 3 (tooling)
 */
function detectLanguage(files) {
  const filenames = files.map(f => f.filename);
  const filepaths = files.map(f => f.path);
  const extensions = files.map(f => f.ext);

  // ─── TIER 1: Runtime authority (highest priority, overrides package.json) ───
  // If any exist, classification is final. Node tooling inside these repos is ignored.

  if (filenames.includes('Cargo.toml')) {
    return { type: 'Rust project', language: 'Rust', entryPoints: ['src/main.rs', 'src/lib.rs', 'src/bin'] };
  }
  if (files.some(f => f.path.includes('manage.py'))) {
    const manageFile = files.find(f => f.path.endsWith('manage.py'));
    return { type: 'Django application', language: 'Python', entryPoints: [manageFile?.path || 'manage.py', 'wsgi.py', 'asgi.py'] };
  }
  if (filenames.includes('pyproject.toml')) {
    return detectPythonFramework(files, filenames);
  }
  if (filenames.includes('go.mod')) {
    return { type: 'Go project', language: 'Go', entryPoints: ['main.go', 'cmd/main.go'] };
  }

  // ─── TIER 2: Application manifests ───
  if (filenames.includes('requirements.txt') || filenames.includes('Pipfile') || filenames.includes('setup.py')) {
    return detectPythonFramework(files, filenames);
  }

  // ─── TIER 3: Node/tooling manifests ───
  if (filenames.includes('package.json')) {
    return detectNodeFramework(files, filenames);
  }

  // Ruby
  if (filenames.includes('Gemfile')) {
    return { type: 'Ruby project', language: 'Ruby', entryPoints: ['config.ru', 'app.rb'] };
  }

  // Data science / Jupyter: .ipynb present, no clear app entrypoint
  if (extensions.includes('.ipynb') && !hasClearAppEntrypoint(files, filenames)) {
    return { type: 'Research / analysis environment', language: 'Python/Jupyter', entryPoints: [] };
  }

  // Generic/Unknown
  const mostCommonExt = getMostCommonExtension(extensions);
  return {
    type: 'Unknown project',
    language: mostCommonExt ? `Files with ${mostCommonExt} extension` : 'Mixed',
    entryPoints: []
  };
}

/**
 * Python framework detection (Django, Flask, FastAPI, generic)
 */
function detectPythonFramework(files, filenames) {
  // Django: manage.py already handled in Tier 1, but double-check
  if (files.some(f => f.path.includes('manage.py'))) {
    const manageFile = files.find(f => f.path.endsWith('manage.py'));
    return { type: 'Django application', language: 'Python', entryPoints: [manageFile?.path || 'manage.py', 'wsgi.py', 'asgi.py'] };
  }

  // Flask: app.py, application.py, or app/__init__.py with routes
  if (filenames.includes('app.py') || filenames.includes('application.py')) {
    return { type: 'Flask application', language: 'Python', entryPoints: ['app.py', 'application.py', 'wsgi.py', 'asgi.py'] };
  }
  if (hasFlaskModuleLayout(files)) {
    const appInit = files.find(f => f.path.includes('app/__init__.py') || f.path.includes('app\\__init__.py'));
    return { type: 'Flask web service', language: 'Python', entryPoints: ['wsgi.py', 'asgi.py', appInit?.path || 'app/__init__.py'] };
  }
  if (filenames.includes('main.py')) {
    return { type: 'FastAPI application', language: 'Python', entryPoints: ['main.py', 'wsgi.py', 'asgi.py'] };
  }

  return { type: 'Python project', language: 'Python', entryPoints: ['main.py', 'app.py', '__main__.py', 'wsgi.py', 'asgi.py'] };
}

/**
 * Check for Flask module layout: app/__init__.py + routes/controllers/api
 */
function hasFlaskModuleLayout(files) {
  const hasAppInit = files.some(f => f.path.includes('__init__.py') && (f.path.includes('app/') || f.path.includes('app\\')));
  if (!hasAppInit) return false;
  const routeIndicators = ['routes', 'controllers', 'api', 'views', 'blueprints'];
  return files.some(f => {
    const lower = f.path.toLowerCase();
    return routeIndicators.some(r => lower.includes(r));
  });
}

/**
 * No clear app entrypoint (for notebook detection)
 */
function hasClearAppEntrypoint(files, filenames) {
  const appSignals = ['manage.py', 'app.py', 'main.py', 'application.py', 'package.json', 'Cargo.toml', 'go.mod'];
  return files.some(f => appSignals.some(s => f.path.includes(s)));
}

/**
 * Node/JS framework detection with expanded entrypoints
 */
function detectNodeFramework(files, filenames) {
  const entryPoints = [
    'app/page.tsx', 'app/page.js', 'app/layout.tsx', 'app/layout.js',  // Next.js app router
    'pages/index.js', 'pages/index.tsx', 'src/pages/index.js',
    'src/main.ts', 'src/main.js', 'src/index.ts', 'src/index.js',
    'index.js', 'server.js', 'app.js', 'src/index.js'
  ];

  if (filenames.includes('next.config.js') || filenames.includes('next.config.mjs')) {
    return { type: 'Next.js application', language: 'JavaScript/TypeScript', entryPoints };
  }
  if (filenames.some(f => f.includes('vite.config'))) {
    return { type: 'Vite application', language: 'JavaScript/TypeScript', entryPoints: ['src/main.js', 'src/main.tsx', 'src/main.ts', 'index.html', ...entryPoints] };
  }
  if (filenames.includes('gatsby-config.js')) {
    return { type: 'Gatsby site', language: 'JavaScript/TypeScript', entryPoints: ['gatsby-config.js', 'src/pages/index.js', ...entryPoints] };
  }

  return { type: 'Node.js project', language: 'JavaScript/TypeScript', entryPoints };
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
