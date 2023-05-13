#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

function setDropboxIgnore(directory, file) {
  const filePath = path.join(directory, file);
  exec(`Set-Content -Path '${filePath}' -Stream com.dropbox.ignored -Value 1`, (err) => {
    if (err) {
      console.error('Error setting Dropbox to ignore file:', err);
    } else {
      console.log(`Dropbox has been set to ignore ${file}`);
    }
  });
}

function unsetDropboxIgnore(directory, file) {
  const filePath = path.join(directory, file);
  exec(`Clear-Content -Path '${filePath}' -Stream com.dropbox.ignored`, (err) => {
    if (err) {
      console.error('Error setting Dropbox to unignore file:', err);
    } else {
      console.log(`Dropbox has been set to unignore ${file}`);
    }
  });
}

function processDropboxIgnoreFile(directory, unignore) {
  const dropboxIgnoreFilePath = path.join(directory, '.dropboxignore');

  fs.access(dropboxIgnoreFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      // .dropboxignore file does not exist, so create it
      fs.writeFileSync(dropboxIgnoreFilePath, 'node_modules\n');
    }

    const files = fs.readFileSync(dropboxIgnoreFilePath, 'utf-8').split('\n');
    files.forEach(file => {
      if (file) {
        if (unignore) {
          unsetDropboxIgnore(directory, file);
        } else {
          setDropboxIgnore(directory, file);
        }
      }
    });
  });
}

const currentDirectory = process.cwd();
const unignore = process.argv.includes('-u');
processDropboxIgnoreFile(currentDirectory, unignore);
