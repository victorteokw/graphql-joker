const { createFile, installDependency } = require('scaffold-kit/executor');
const generateUploader = require('./generators/generateUploader');

const knownBaseUploaders = {
  'alioss': {
    'require': 'mongoose-uploader-ali-oss',
    'import': 'createAliOSSUploader',
    'placeholders': {
      'bucket': '<put your bucket name here>',
      'region': '<put your region here>',
      'accessKeyId': '<put your access key id here>',
      'accessKeySecret': '<put your access key secret here>'
    }
  },
  'amazons3': {
    'require': 'mongoose-uploader-amazon-s3',
    'import': 'createAmazonS3Uploader',
    'placeholders': {}
  }
};

module.exports = ({ args, options }) => {
  // joker uploader AvatarUploader < AmazonS3Uploader bucket=victorz
  if (args.length < 3) {
    throw "Wrong number of args passed to 'uploader' generator.";
  }
  // like Avatar or AvatarUploader
  const uploaderName = args.shift().replace(/Uploader$/, '');
  if (args.shift() !== 'extends') {
    throw 'Unknown base uploader.';
  }
  // like AliOSS or S3
  const baseUploader = args.shift().replace(/Uploader$/, '').toLowerCase();

  // parsing fields
  const fields = {};
  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    fields[key] = value;
  });

  if (!knownBaseUploaders[baseUploader]) {
    throw `Unknown base uploader '${baseUploader}'.`;
  }

  const dependency = knownBaseUploaders[baseUploader].require;

  createFile({
    content: generateUploader(uploaderName, baseUploader, fields, knownBaseUploaders),
    at: `${options.uploaderDir}/${uploaderName}Uploader.js`
  });
  installDependency({
    package: dependency,
    version: 'latest',
    dev: false
  });
};
