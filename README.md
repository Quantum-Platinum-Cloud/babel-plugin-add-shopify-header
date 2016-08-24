# babel-plugin-add-shopify-header

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This plugin will add a standardized Shopify comment header to transpiled files. Since transpiling via Babel is becoming one of the last steps of the build process it's handy to add some tooling around this final step.

A standard Shopify Comment Header contains:
- The license of the repo
- Current version number derived from git tag or from `package.json` version and last git commit

This plugin is built ontop of [babel-plugin-add-header-comment](https://github.com/shopify/babel-plugin-add-header-comment).

## Usage

[![NPM](https://nodei.co/npm/babel-plugin-add-shopify-header.png)](https://www.npmjs.com/package/babel-plugin-add-shopify-header)

## Example

- [Simple Example](simple-example)
- [Header Per File](header-per-file)
- [Adding To Default Header](adding-to-default-header)
- [Adding To Header From Contents Of File](adding-to-default-header-from-the-contents-of-another-file)
- [Adding To Header From Script Execution](Adding To Default Header From A Script Execution)

### Simple Example
The following is an example `.babelrc` file using this plugin:
```javascript
{
  "plugins": [
    "add-shopify-header"
  ]
}
```
The above is useful when you just simply want to bundle one file and want to add the default Shopify header comment to that file.

### Header Per File
If you are transpiling an entire folder and only want to add the comment header to one file (for instance `src/shopify.js`) do the following:
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "files": [ "src/shopify.js" ]
    }]
  ]
}
```

### Adding To Default Header
If you'd like to add to the default header you can do the following:
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "header": [ "This will be added under the default Shopify header" ]
    }]
  ]
}
```

### Adding To Default Header Per File
The following will add to the default header on a per file basis
```javascript
{
  "plugins": [
    "files":
    ["add-shopify-header", {
      "files": {
        "src/shopify.js": {
          "header": [
            "This is added below the default header only for src/shopify.js"
          ]
        }
      }
    }]
  ]
}
```

### Adding To Default Header From The Contents Of Another File
The following will show how to include the contents of the file `readFromThisFile.txt` under the default header. The `?` charachter denotes that the path following should be read in and added to the header.
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "header": [ "?readFromThisFile.txt" ]
    }]
  ]
}
```

### Adding To Default Header From A Script Execution
Lets say you had a Node script `getAdditionalContent.js` that produces output you'd like to add to the header you can do the following. The `!` denotes that the following script should be executed:
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "header": [ "!node getAdditionalContent.js" ]
    }]
  ]
}
```

## Options

The following are options you can pass this Babel plugin. All options are optional:
- `cwd` - A String which is a path to the directory that contains a __LICENSE.md__ file and a __package.json__ file for your project. By default `process.cwd()` will be used.
- `header` - An Array of strings which get appended to the standard header. This array can also contain strings starting with `'!'` or `'?'` which mean the string will not be appended but instead the string will be executed as a shell command (eg `'!node someScript.js'`) or the path will be read in (`?readInThisFile.md`)
- `files` - An Array or Object that defines which files will receive the comment header. If the header does not need to be customized just pass in array of paths (eg. `"files": ["src/index.js", "src/index.polyfilled.js"]`) or if you need to customize the header per file pass in an Object which defines customized headers (eg. `"files": { "src/index.js": { 'A LINE ADDED TO HEADER'}}`)
- `version` - A String that will override the current version number.
- `commit` - A String that will override the current commit hash if you want to override the current git commit hash (probably never should do this).

Since this plugin is built on top of [babel-plugin-add-header-comment](https://github.com/shopify/babel-plugin-add-header-comment) there are a few of options which can also be used here:
- `newLineChar`- This is the newline char that should be used by the plugin. Default value: `'\n'`
- `cache` - This is a string which represents what type of operations should be cached. For instance if you wanted to cache both read and command executions you could pass in `?!`. It should be noted in specific for this module the __LICENSE.md__ and __package.json__ file are already cached. Default value: `'?'`
- `commentStart`- This is a string which describes how the comment is started/opened. For instance if you'd like you're comment to start with `/*COMMENT START` pass in `'COMMENT START'`. Default value: `'*\n'`
- `commentEnd`- This is a string which describes how the comment is ended/closed. For example if you'd like your comment to end with `COMMENT END*/` pass in `'COMMENT END'`. Default value: `'\n*'`
- `commentLineStart`- A string which is the leading charachter before a comment. Default value: `'* '`

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/babel-plugin-add-shopify-header/blob/master/LICENSE.md) for details.
