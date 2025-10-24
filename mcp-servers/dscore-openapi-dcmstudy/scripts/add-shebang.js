const fs = require('fs');
const path = require('path');

// Add shebang to CLI file and copy to bin directory
const cliPath = path.join(__dirname, '../dist/cli.js');
const binPath = path.join(__dirname, '../bin/cli.js');

// Make sure bin directory exists
const binDir = path.dirname(binPath);
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

// Add shebang to CLI file
if (fs.existsSync(cliPath)) {
  const content = fs.readFileSync(cliPath, 'utf8');
  if (!content.startsWith('#!/usr/bin/env node')) {
    fs.writeFileSync(cliPath, '#!/usr/bin/env node\n' + content);
  }
  
  // Copy to bin directory
  fs.copyFileSync(cliPath, binPath);
  console.log('Added shebang to CLI file and copied to bin directory');
} else {
  console.log('CLI file not found, skipping shebang addition');
}