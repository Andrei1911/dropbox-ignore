# Dropbox Ignore

Dropbox Ignore is a Node.js module that allows you to automatically ignore files in Dropbox, similar to how `.gitignore` works. It can be especially useful for Node.js projects, as it can automatically ignore your `node_modules` directory, which can otherwise take up a significant amount of Dropbox sync space and time.

## Installation

To install Dropbox Ignore, you can use npm:

```bash
npm install dropbox-ignore
```

## Usage

Once installed, Dropbox Ignore will automatically create a `.dropboxignore` file in your project directory. If a `node_modules` directory is present in your project, it will be automatically added to the `.dropboxignore` file. 

The module will also listen for changes to the `.dropboxignore` file, and automatically apply the Dropbox ignore command to any files or directories listed in the file.

To use Dropbox Ignore in your code, simply require it at the top of your main script:

```javascript
require('dropbox-ignore');
```

## License

MIT License

## Author

Andrei Popa

Please note that Dropbox Ignore is not affiliated with Dropbox Inc. Use this module at your own risk. Always back up your data.

# Usage

After installing, you can run the `dropbox-ignore` command in your terminal:

```bash
dropbox-ignore
