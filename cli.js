#!/usr/bin/env node

/**
 * CODEAWAKE
 * Wake up inside any codebase.
 * 
 * Usage: npx codeawake [directory]
 */

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { scanProject } = require('./lib/scanner');
const { detectLanguage } = require('./lib/detector');
const { buildContext } = require('./lib/context');
const { generateBriefing } = require('./lib/briefing');

const VERSION = '1.0.0';

program
  .name('codeawake')
  .description('Wake up inside any codebase')
  .version(VERSION)
  .argument('[directory]', 'Project directory to analyze', '.')
  .option('-o, --output <file>', 'Save briefing to file')
  .option('-v, --verbose', 'Show detailed scanning info')
  .action(async (directory, options) => {
    try {
      const targetDir = path.resolve(directory);
      
      // Verify directory exists
      if (!fs.existsSync(targetDir)) {
        console.error(`❌ Directory not found: ${targetDir}`);
        process.exit(1);
      }

      console.log(`\n🔍 Scanning ${path.basename(targetDir)}...\n`);

      // Scan project structure
      const files = await scanProject(targetDir, options.verbose);
      
      // Detect language/framework
      const language = detectLanguage(files);
      if (options.verbose) {
        console.log(`Detected: ${language.type}\n`);
      }

      // Build context for AI
      const context = buildContext(files, language, targetDir);
      
      // Generate briefing
      console.log('🧠 Generating briefing...\n');
      const briefing = await generateBriefing(context);

      // Output
      console.log('━'.repeat(60));
      console.log(briefing);
      console.log('━'.repeat(60));

      // Save to file if requested
      if (options.output) {
        fs.writeFileSync(options.output, briefing);
        console.log(`\n💾 Saved to ${options.output}`);
      }

    } catch (error) {
      console.error(`\n❌ Error: ${error.message}`);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();
