// scripts/add-shebang.js
const fs = require('fs');
const path = require('path');

// Read the compiled cli.js file
const cliPath = path.join(__dirname, '../dist/cli.js');

// Check if file exists before trying to read it
if (fs.existsSync(cliPath)) {
    let cliContent = fs.readFileSync(cliPath, 'utf8');

    // Check if shebang already exists
    if (!cliContent.startsWith('#!/usr/bin/env node\n')) {
        // Add shebang at the beginning
        const contentWithShebang = '#!/usr/bin/env node\n' + cliContent;
        // Write back to dist/cli.js
        fs.writeFileSync(cliPath, contentWithShebang);
        console.log('Added shebang to CLI file');
    } else {
        console.log('Shebang already exists in CLI file');
    }
} else {
    console.error('CLI file not found:', cliPath);
    process.exit(1);
}

// Also copy to bin directory for the bin entry
const binDir = path.join(__dirname, '../bin');
if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
}

// Read the final content with shebang
const finalContent = fs.readFileSync(cliPath, 'utf8');
fs.writeFileSync(path.join(binDir, 'cli.js'), finalContent);

console.log('Added shebang to CLI file and copied to bin directory');