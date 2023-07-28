const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Get the command-line arguments
const args = process.argv.slice(2);

// Define the directories, optionally reversing movement direction
let sourceDir = './drafts';
let destinationDir = './src/lib/posts';
if (args.includes('--reverse')) {
  [sourceDir, destinationDir] = [destinationDir, sourceDir];
}

// Use glob to find all files matching filePattern
const filePattern = 'draft-*';
glob(filePattern, { cwd: sourceDir }, (err, files) => {
  if (err) {
    console.error('Error reading files:', err);
    return;
  }

  // Move all matched files to the destination directory
  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destinationPath = path.join(destinationDir, path.basename(file));

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`Error moving ${file}:`, err);
      } else {
        console.log(`${file} moved successfully.`);
      }
    });
  });
});
