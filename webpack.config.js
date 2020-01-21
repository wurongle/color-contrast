const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        library: 'ColorContrast',
        libraryTarget: 'window',
        path: path.resolve(__dirname, 'dist'),
        filename: 'colorContrast.js'
    }
    // ....
}