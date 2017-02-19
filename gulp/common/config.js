var path = require("path");

module.exports.indexFileDir = 'dist/es2015/',
module.exports.tsFilePaths = [
    'src/*.ts',
    'src/**/*.ts'
];
module.exports.distPath = path.join(process.cwd(), "dist");

module.exports.tsconfigFile = "src/tsconfig.json";

