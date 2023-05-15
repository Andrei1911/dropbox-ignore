#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

function setDropboxIgnore(file) {
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File or directory ${file} does not exist. Skipping.`);
      return;
    }
    exec(`Set-Content -Path '${file}' -Stream com.dropbox.ignored -Value 1`, { shell: 'powershell.exe' }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error setting Dropbox to ignore ${file}:`, err);
      } else {
        console.log(`Dropbox has been set to ignore ${file}`);
      }
    });
  });
}

function clearDropboxIgnore(file) {
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File or directory ${file} does not exist. Skipping.`);
      return;
    }
    exec(`Clear-Content -Path '${file}' -Stream com.dropbox.ignored`, { shell: 'powershell.exe' }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error clearing Dropbox ignore for ${file}:`, err);
      } else {
        console.log(`Dropbox ignore has been cleared for ${file}`);
      }
    });
  });
}

function processDropboxIgnoreFile(directory, dropboxIgnoreFilePath, clear = false) {
  fs.readFile(dropboxIgnoreFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading .dropboxignore file:', err);
      return;
    }
    const lines = data.split('\n');
    for (let line of lines) {
      line = line.trim();
      if (line) {
        if (clear) {
          clearDropboxIgnore(path.join(directory, line));
        } else {
          setDropboxIgnore(path.join(directory, line));
        }
      }
    }
  });
}

function createDropboxIgnoreFile(directory, clear = false) {
  try {
    const dropboxIgnoreFilePath = path.join(directory, '.dropboxignore');

    fs.access(dropboxIgnoreFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        // .dropboxignore file does not exist, so create it
        let content = '';
        const nodeModulesPath = path.join(directory, 'node_modules');

        fs.access(nodeModulesPath, fs.constants.F_OK, (err) => {
          if (!err) {
            // node_modules directory exists
            content = 'node_modules\n';
          }

          fs.writeFile(dropboxIgnoreFilePath, content, (err) => {
            if (err) {
              console.error('Error writing .dropboxignore file:', err);
            } else {
              console.log('.dropboxignore file has been created');
              processDropboxIgnoreFile(directory, dropboxIgnoreFilePath, clear);
            }
          });
        });
      } else {
        console.log('.dropboxignore file already exists');
        processDropboxIgnoreFile(directory, dropboxIgnoreFilePath, clear);
      }
    });
  } catch (error) {
    console.error("Error in dropbox-ignore-cli script:\n", error)
  }
}

function removeFromDropboxIgnoreFile(directory, file) {
  const dropboxIgnoreFilePath = path.join(directory, '.dropboxignore');
  fs.readFile(dropboxIgnoreFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading .dropboxignore file:', err);
      return;
    }
    let lines = data.split('\n');
    const index = lines.indexOf(file);
    if (index > -1) {
      lines.splice(index, 1);
      fs.writeFile(dropboxIgnoreFilePath, lines.join('\n'), (err) => {
        if (err) {
          console.error('Error writing .dropboxignore file:', err);
        } else {
          console.log(`File ${file} has been removed from .dropboxignore`);
        }
      });
    } else {
      console.log(`File ${file} does not exist in .dropboxignore`);
    }
  });
}

function unignoreFile(directory, file) {
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File or directory ${file} does not exist. Skipping.`);
      return;
    }
    clearDropboxIgnore(file);
    removeFromDropboxIgnoreFile(directory, file);
  });
}

// Call the function directly, passing in the current directory
if (process.argv[2] === '-u') {
  unignoreFile(process.cwd(), process.argv[3]);
} else if (process.argv[2] === 'clear') {
  createDropboxIgnoreFile(process.cwd(), true);
} else {
  createDropboxIgnoreFile(process.cwd());
}