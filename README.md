# Dropbox Ignore Node Package

Dropbox Ignore is a command-line utility that allows you to easily set Dropbox to ignore specific files or directories, similar to how `.gitignore` works for Git.

## Installation

To use this package, make sure you have Node.js installed on your machine. Then, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to your project directory.
3. Run the following command to install the package:

```bash
npm install dropbox-ignore
```

## Usage

### Command-Line Interface (CLI)

You can use the package via the command-line interface (CLI) by running the `dropbox-ignore` command.

#### Ignore Files or Directories

To add files or directories to the Dropbox ignore list, run the following command:

```bash
dropbox-ignore
```

This will create a `.dropboxignore` file in the current directory and automatically add the `node_modules` directory if it exists. Any additional files or directories can be specified in the `.dropboxignore` file.

#### Remove Files or Directories from Ignore List

To remove a file or directory from the Dropbox ignore list, run the following command:

```bash
dropbox-ignore -u <file_or_directory_path>
```

Replace `<file_or_directory_path>` with the path to the file or directory you want to remove from the ignore list.

#### Clear Ignore List

To clear the entire Dropbox ignore list, removing all files and directories, run the following command. Note that this will not modify your `.dropboxignore` file, so if you re-run `dropbox-ignore`, you can undo this command.

```bash
dropbox-ignore clear
```
#### <u>Important Note for PowerShell Users</u>

If you're using PowerShell, you might encounter an error about running scripts being disabled on your system. This is due to PowerShell's execution policy.

To enable scripts, you can run the following command in PowerShell as an administrator:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Please note that changing the execution policy can potentially expose you to security risks. Only proceed if you understand the implications.

Alternatively, you can use a different command prompt, like Git Bash or the standard Windows Command Prompt, which do not enforce such policies.

### JavaScript API

You can also use the package programmatically in your Node.js applications.

#### Importing the Package

To import the package into your JavaScript file, use the following code:

```javascript
const dropboxIgnore = require('dropbox-ignore');
```

#### Adding Files or Directories to Ignore List

To add files or directories to the Dropbox ignore list, use the following code:

```javascript
dropboxIgnore.createDropboxIgnoreFile(directory);
```

Replace `directory` with the path to the directory where you want to create the `.dropboxignore` file. This will create the file and automatically add the `node_modules` directory if it exists. You can modify the `.dropboxignore` file to add more files or directories.

#### Removing Files or Directories from Ignore List

To remove a file or directory from the Dropbox ignore list, use the following code:

```javascript
dropboxIgnore.unignoreFile(directory, file);
```

Replace `directory` with the path to the directory containing the `.dropboxignore` file, and replace `file` with the path to the file or directory you want to remove from the ignore list.

#### Clearing Ignore List

To clear the entire Dropbox ignore list, removing all files and directories, use the following code:

```javascript
dropboxIgnore.createDropboxIgnoreFile(directory, true);
```

Replace `directory` with the path to the directory containing the `.dropboxignore` file.

## Notes

- This package uses PowerShell commands (`Set-Content` and `Clear-Content`) to interact with the Dropbox ignore settings on Windows. Make sure you have PowerShell installed on your machine.
- The package assumes that the current working directory is the root directory of your project. Make sure to run the commands from the appropriate directory.
- Make sure you can get your files from other sources(similar to how `node install` does). Adding a file to `.dropboxignore` list will make it disappear on every other machine connected to your Dropbox account, as if it was deleted.
- In order to use this command in PowerShell, you need to change it's execution policy using `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`.
- This has been built using the help of chatGPT4.

## License

This package is released under the [MIT License](https://opensource.org/licenses/MIT).