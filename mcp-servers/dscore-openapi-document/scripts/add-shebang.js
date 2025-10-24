const fs = require('fs');
const path = require('path');

// Add shebang to CLI file and copy to bin directory
const cliPath = path.join(__dirname, '../dist/cli.js');
if (fs.existsSync(cliPath)) {
  const content = fs.readFileSync(cliPath, 'utf8');
  if (!content.startsWith('#!/usr/bin/env node')) {
    fs.writeFileSync(cliPath, '#!/usr/bin/env node\n' + content);
    console.log('Added shebang to CLI file and copied to bin directory');
  }
} else {
  console.log('CLI file not found, creating it...');
  // Create the CLI file with shebang
  const cliContent = `#!/usr/bin/env node
require('./index.js');
`;
  fs.writeFileSync(cliPath, cliContent);
  console.log('Created CLI file with shebang');
}