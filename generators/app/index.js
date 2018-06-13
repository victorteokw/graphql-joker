const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the grand ${chalk.red('generator-amur')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the project name?',
        default: path.parse(this.destinationPath()).name
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {

    // Main directory

    // package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );
    // readme
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.name
      }
    );
    // eslintrc
    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
    // git
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    // nonula
    this.fs.copy(
      this.templatePath('.nonularc'),
      this.destinationPath('.nonularc')
    );
    // nodemon
    this.fs.copy(
      this.templatePath('nodemon.json'),
      this.destinationPath('nodemon.json')
    );
    // main app file
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('app.js')
    );

    // Config directory

    this.fs.copyTpl(
      this.templatePath('config/_dev.json'),
      this.destinationPath('config/dev.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('config/_prod.json'),
      this.destinationPath('config/prod.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('config/_test.json'),
      this.destinationPath('config/test.json'),
      {
        name: this.props.name
      }
    );

    // Middlewares directory

    this.fs.copy(
      this.templatePath('middlewares/config.js'),
      this.destinationPath('middlewares/config.js')
    );
    this.fs.copy(
      this.templatePath('middlewares/router.js'),
      this.destinationPath('middlewares/router.js')
    );

    // Scripts directory

    this.fs.copy(
      this.templatePath('scripts/console.js'),
      this.destinationPath('scripts/console.js')
    );

    // Schema definition

    this.fs.copy(
      this.templatePath('schemas/schema.js'),
      this.destinationPath('schemas/schema.js')
    );

    // Make directories

    fs.mkdirSync(this.destinationPath('data'));
    fs.mkdirSync(this.destinationPath('models'));
    fs.mkdirSync(this.destinationPath('resolvers'));
    fs.mkdirSync(this.destinationPath('tests'));
    fs.mkdirSync(this.destinationPath('tests/fixtures'));
    fs.mkdirSync(this.destinationPath('tests/models'));
    fs.mkdirSync(this.destinationPath('tests/resolvers'));
  }

  install() {
    this.npmInstall([
      'koa', 'mongoose', 'graphql',
      'koa-body', 'koa-logger', 'koa-router', 'koa2-mongoose', '@koa/cors',
      'graphql-tools', 'merge-graphql-schemas', 'apollo-server-koa',
      'noenv', 'lodash', 'glob'
    ], { 'save': true });
    this.npmInstall([
      'eslint', 'nodemon', 'nonula', 'jest', 'jest-cli'
    ], { 'save-dev': true });
  }
};
