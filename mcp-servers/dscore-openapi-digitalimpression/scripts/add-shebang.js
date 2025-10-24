const fs = require('fs');
const path = require('path');

// Add shebang to cli.js
const cliPath = path.join(__dirname, '../dist/cli.js');
if (fs.existsSync(cliPath)) {
  const content = fs.readFileSync(cliPath, 'utf8');
  if (!content.startsWith('#!/usr/bin/env node')) {
    fs.writeFileSync(cliPath, '#!/usr/bin/env node\n' + content);
  }
}