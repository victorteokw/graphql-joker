const concatBlocks = require('../utils/string/concatBlocks');

const topLine = (baseUploader, knownBaseUploaders) =>
  `const { ${knownBaseUploaders[baseUploader].import} } = require('${knownBaseUploaders[baseUploader].require}');`;

const bodyFields = (fields) =>
  Object.keys(fields).map((k) => `  ${k}: '${fields[k]}'`).join(',\n');

module.exports = (uploaderName, baseUploader, fields, knownBaseUploaders) =>
  concatBlocks([
    topLine(baseUploader, knownBaseUploaders),
    '\n',
    `const ${uploaderName}Uploader = ${knownBaseUploaders[baseUploader].import}({`,
    bodyFields(fields),
    '});',
    '\n',
    `module.exports = ${uploaderName}Uploader;`
  ]);
